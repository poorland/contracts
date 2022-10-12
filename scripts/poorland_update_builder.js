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

  const factory = await ethers.getContractFactory("PoorLandMaterialNFT");
  const contract = await factory.attach("0x4ED929CB64E49fA5bbf72468a3c921a4b570541a");
  
  // await contract.deployed();

  console.log("contract deployed to:", contract.address);

  console.log("update builder: ", await contract.updateBuilder("0x9FC1dF8cde7d145a67B56784C643474FA27208e8"));


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
