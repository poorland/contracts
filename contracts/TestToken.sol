// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract TestToken is ERC20 {

    event MintEvent(address minter, address target, uint256 amount, uint256 time);
    event BurnEvent(address burner, uint256 amount, uint256 time);

    constructor() ERC20("TEST", "TEST") {

    }

    function burn(uint256 burnAmount) external {
        _burn(msg.sender, burnAmount);
        emit BurnEvent(msg.sender, burnAmount, block.timestamp);
    }

    function mint(address target, uint256 mintAmount) external {

        _mint(target, mintAmount);  

        emit MintEvent(msg.sender, target, mintAmount, block.timestamp);
    }

}