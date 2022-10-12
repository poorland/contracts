// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/utils/Strings.sol';

import "./IBuilderMaterial.sol";


contract PoorLandMaterialNFT is ERC1155, IBuilderMaterial, Ownable {
    /// @dev Library
    using Strings for uint256;

    uint256 public constant STORAGE = 100000000;

    uint256 public constant BATCH_MINT_LIMIT = 10;
    uint256 public constant PER_ADDR_LIMIT = 100;
    uint256 public constant MINT_PRICE = 0.0001 ether;

    //private ////////////////////////////////////////////
    uint256 private _totalSupply = 0;
    uint256 private _totalBurned = 0;
    mapping(address=>uint256) private _minted;

    bool private _sale = true;

    address private SIGNER = 0x974b1C3a61D7Dbf528bD51C0b9dddd3F55904197;

    string private _baseURI = "https://gateway.pinata.cloud/";
    string private _path = "ipfs/QmS6oiLQVaE1BYohDRDceaLgMLrymcnha1kG3NfqkjHSfy/";
    address private _builder;

    // ipfs/QmYDBHXYxfKdVp6evLVKNkbFknLGcKfPy2p7WkbsaJb7Cq
    // token
    uint256 public constant POORLAND_MATERIAL = 0;

    function whitelistValidator(address purchaseUser, bytes memory sign, uint256 amount) private {
        // basic validate
        require(amount >= 1, "at least purchase 1");
        // require((_numberMinted(purchaseUser) + amount) <= MINT_LIMIT, "purchase over limit");
        isEnough(amount);
        string memory originalContent = toAsciiString(purchaseUser);
        address _signer = ecrecovery(originalContent, sign);
        require(SIGNER == _signer, "this sign is not valid");
    }
    

    /// Utils 
    //////////////////////////////////////////////////////////////////////////////////////////
    function toAsciiString(address x) public pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);
        }
        return string(abi.encodePacked("0x",s));
    }

    function char(bytes1 b) public pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    function ecrecovery(string memory cont, bytes memory sig) public pure returns (address) {

        bytes32 r;
        bytes32 s;
        uint8 v;
        if (sig.length != 65) {
            return address(0);
        }
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := and(mload(add(sig, 65)), 255)
        }
        
        if (v < 27) {
            v += 27;
        }
        if (v != 27 && v != 28) {
            return address(0);
        }
        /* prefix might be needed for geth only
        * https://github.com/ethereum/go-ethereum/issues/3731
        */
        bytes memory prefix = "\x19Ethereum Signed Message:\n42";
        bytes32 digest = keccak256(abi.encodePacked(prefix, cont));
        return ecrecover(digest, v, r, s);
    }


    modifier onlyBuilder() {
        require(_builder != address(0) && _builder == _msgSender(), "Builder: caller is not the builder");
        _;
    }


    function uri(uint256 _tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(_baseURI, _path,  _tokenId.toString(), ".json"));
    }

    function totalSupply() public view returns(uint256 supply) {
        supply = _totalSupply;
    }

    function totalBurned() public view returns(uint256) {
        return _totalBurned;
    }

    constructor() ERC1155("") {}

    function mint(uint256 mintAmount) external payable {
    
        validator(msg.sender, mintAmount);
        mintTo(msg.sender, mintAmount);
    }

    function materialBalance(address _owner) public view returns (uint256 _balance) {
        _balance = balanceOf(_owner, POORLAND_MATERIAL);
    }
    
    function validator(address addr, uint256 amount) private {
        // basic validate
        require(_sale == true, "Selling not started");
        require(amount >= 1, "Need to purchase at least one");
        require(amount <= BATCH_MINT_LIMIT, "Can purchase 10 once at most");
        require(_minted[addr] + amount <= PER_ADDR_LIMIT, "Limit 100 per address");
        require(msg.value >= MINT_PRICE, "Insufficient funds sent");
        isEnough(amount);
    }

    function spendMaterialToBuild(address tokenOwner, uint256 spend) external override onlyBuilder {

        require(materialBalance(tokenOwner) >= spend, "Balance is not enough");
        _burn(tokenOwner, POORLAND_MATERIAL, spend);
        _totalBurned += spend;

    }

    function isEnough(uint256 amount) private view returns (bool enough) {
        uint256 solded = totalSupply();
        uint256 afterPurchased = solded + amount;
        enough = true;
        require(afterPurchased <= STORAGE, "Out of stock");
    }

    
    function mintTo(address purchaseUser, uint256 amount) private {
        _mint(purchaseUser, POORLAND_MATERIAL, amount, "");
        _minted[purchaseUser] += amount;
        _totalSupply += amount;
    }


    function updateURI(string memory uri_) external onlyOwner {
        _baseURI = uri_;
    }

    function updatePath(string memory path_) external onlyOwner {
        _path = path_;
    }

    function updateURL(string memory uri_, string memory path_) external onlyOwner {
        _baseURI = uri_;
        _path = path_;
    }


    function toggleSale() external onlyOwner {
        _sale = !_sale;
    } 

    function updateBuilder(address builder_) external onlyOwner {
        _builder = builder_;
    }

    function batchMint(address wallet, uint amount) public onlyOwner {
        isEnough(amount);
        mintTo(wallet, amount);
    }

    function withdrawTo(address targetAddress) external onlyOwner {
        payable(targetAddress).transfer(address(this).balance);
    }

    function withdrawLimit(address targetAddress, uint256 amount) external onlyOwner {
        payable(targetAddress).transfer(amount);
    }
}