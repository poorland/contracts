// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const factory = await ethers.getContractFactory("PoorLandMetaverse");
  const contract = await factory.deploy();
  console.log("metaverse contract deployed to:", contract.address);

  //  console.log("metaverse contract deployed to:", contract.address);
  
  poorlandNFT = "0x4ED929CB64E49fA5bbf72468a3c921a4b570541a";
  const nftFactory = await ethers.getContractFactory("PoorLandMaterialNFT");
  const nftContract = await nftFactory.attach(poorlandNFT);

  await contract.updateMaterialContract(poorlandNFT);
  await nftContract.updateBuilder(contract.address);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
