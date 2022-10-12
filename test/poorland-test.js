const { expect } = require("chai");
const { keccak256 } = require("ethers/lib/utils");
const { ethers, web3 } = require("hardhat");

describe("Poorland Violence", function () {


  let owner, addr1, addr2, addr3, addr4, addrs;
  let factory, xFac;
  let instance, xIns;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.

    [owner, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners();


    // factory = await ethers.getContractFactory("PoorLandMaterialNFT");
    // instance = await factory.deploy();


    // console.log("contract address: " + instance.address);
    // console.log("owner address: ", owner.address);


    // factory2 = await ethers.getContractFactory("PoorLandBuilder");
    // instance2 = await factory2.deploy();

    // instance2.updateMaterialContract(instance.address);

    // instance.updateBuilder(instance2.address);

  });


  it("Should return the new greeting once it's changed", async function () {

    // console.log(await instance.mint(10, {value: ethers.utils.parseEther("0.0001")}));
    // await instance.connect(addr1).mint(10, {value: ethers.utils.parseEther("0.0001")});
    // // await instance.purchaseWhitelist(1, hexSigned, {value: ethers.utils.parseEther("0.1")});
    // // await instance.purchaseNFT(1, {value: ethers.utils.parseEther("0.1")});
    // // await instance.purchaseWhitelist(10, hexSigned, {value: ethers.utils.parseEther("0.01")});
    // // console.log("start list:");
    // console.log(await instance.materialBalance(owner.address));

    // console.log(await instance.totalSupply());
    // console.log(await instance2.build(10));
    // console.log(await instance.materialBalance(owner.address));
    // console.log(await instance.connect(addr1).materialBalance(addr1.address));
    // console.log(await instance.totalSupply());
    // console.log(await instance.totalBurned());

    // console.log("----------")

    // signature = accounts.sign("hello", "7a4d6ea4cfc1eac5e718796950e706f48968757579d4e568a5ba3c2a4d6b2ad2");
    // console.log(signature);
    // 0x0c196fc53f35d4f962a71d45111cbd5e9bb7005c97eb212d578b5f45d4da84315cc7ed41ba5f03e3f7a0f596db96276836d6094f005c78eede3bb278ab07b4c21b
    // console.log("change", keccak256("hello"))

    const aa = web3.keccak256("hello");

    
    console.log(aa)
  });
});
