const { expect } = require("chai");
const { ethers } = require("hardhat");
const { int } = require("hardhat/internal/core/params/argumentTypes");
const abi = require('web3-eth-abi');


describe("Poorland Violence", function () {


  let owner, addr1, addr2, addr3, addr4, addrs;
  let factory, xFac;
  let fragment, xIns;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.

    [owner, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners();


    factory = await ethers.getContractFactory("PoorLandMaterialNFT");
    fragment = await factory.deploy();


    console.log("contract address: " + fragment.address);
    console.log("owner address: ", owner.address);


    factory2 = await ethers.getContractFactory("PoorLandMetaverse");
    building = await factory2.deploy();


    // await building.updateMaterialContract(fragment.address);
    await fragment.updateBuilder(building.address);

  });


  it("mint test", async function () {

    await fragment.batchMint(owner.address, 10000);
    // console.log(await instance.mint(10, {value: ethers.utils.parseEther("0.0001")}));
    // await instance.connect(addr1).mint(10, {value: ethers.utils.parseEther("0.0001")});

    // console.log(await instance.mint(10, {value: ethers.utils.parseEther("0.0001")}));
    // await building.setBuildingDisable(1, 21, 0)
    // await building.build(1, 11, -109, 112);
    await building.build(1, 21, -95, 105);
    await building.build(1, 11, -95, 107);
    // await building.build(1, 21, -109, 109);
    // await building.build(1, 11, -101, 112);

    // await building.build(1, 11, 105, 110);
    // await instance2.build(1, 11, 10, 10);

    // await instance2.updateMapIndex(2, 100, 100);
    // await instance2.build(2, 51, 110, 110);

    // console.log(await instance2.listMyNFT(owner.address));

    // console.log(await instance2.getMapSize(1))
    // console.log(await instance2.getMapSize(2))

    // await fragment.batchMint(owner.address, 10000);
    // console.log(await fragment.balanceOf(owner.address, 0))
    // console.log(await fragment.balanceOf(building.address, 0)) 
    // console.log(await fragment.safeTransferFrom(owner.address, building.address, 0, 1000 , web3.utils.hexToBytes("0x0")))
    // console.log("contract balance: ", await fragment.balanceOf(building.address, 0)) 
    // let signed = "0x3f3f735e0ade16ccd1981ab8989dca050ce1daa4a367e6f75e2f77ca474a07e6743d4aa0abd9024ed6e7122572716e48322c2c666d8c82104bb0e2efd8b1cec41b";
    // console.log(await building.claimAirdrops(signed, "1", "188"));

    // console.log("owner balance: ", await fragment.balanceOf(owner.address, 0)) 

   



    
  });
});
