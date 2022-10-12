// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const factory = await ethers.getContractFactory("PoorLandMaterialNFT");
  const contract = await factory.deploy();

  // await contract.deployed();

  console.log("contract deployed to:", contract.address);
  /*

    npx hardhat console --network rinkeby

    const factory = await ethers.getContractFactory("MomocoXNFT")

    const ct = await factory.attach("0x6801793327e1fBfBA8AaF4c1Aa4b241CaD56ee8e");

    let signed = "0x09e5b6ec640e30d20e7dfc008d09e96287f9f08d2656fe697172648b8aa2b41d45ae54ba90c5972ed0ef246ea47351388cd8db59b668b1830e52513f8a1ba49d1b"

    var hexSigned = web3.utils.hexToBytes(signed)

    await ct.purchaseWhitelist(2, hexSigned, {from:"0xadC07FfA90E332C190Fd55d9b4Fab9dEdD790e63", value:ethers.utils.parseEther("0.03")});

    // https://creatures-api.opensea.io/api/creature/";

  */

    // Laowang      0x14fb4177e3ba2290e8DBE52254Cfe374f54c14Fd
    // ALAN    0xCD5207C6b17feFa857a49cdFf1704D00424989F3
    // Zhangzheng   0xCD5207C6b17feFa857a49cdFf1704D00424989F3

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
