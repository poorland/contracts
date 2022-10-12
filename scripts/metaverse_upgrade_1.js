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
  // preview
  // const contract = await factory.attach("0x9FC1dF8cde7d145a67B56784C643474FA27208e8");
  // eth mainnet
  const contract = await factory.attach("0xB3c13385f23a1E2E16f8C35c74DA94216889e953");
  console.log("metaverse contract deployed to:", contract.address);

  // int32 x1 = -112;
  // int32 y1 = 112;
  // int32 x2 = 112;
  // int32 y2 = -112;
  // bytes memory mapSize = abi.encode(x1,y1,x2,y2);

//   function updateMapIndex(int32 mapIndex_, int32 x1, int32 y1, int32 x2, int32 y2) external onlyOwner {
//     _mapInfo[mapIndex_] = abi.encode(x1,y1,x2,y2);
//  }
// function updateBuildType(uint256 nftType, uint256 fragmentNeeded, int32 w, int32 h) external onlyOwner {
//   _typeExtension[nftType] = abi.encode(fragmentNeeded, w, h);
// }

  // const estimation = await contract.estimateGas.updateMapIndex(1, -112, 112, 337, -112);
  // console.log(estimation);
  
  console.log(await contract.updateMapIndex(1, -112, 112, 337, -112));
  var price = 10000;
  console.log(await contract.updateBuildType(40, price, 50, 50));
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
