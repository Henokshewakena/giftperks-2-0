import { ethers } from "hardhat";
const hre = require("hardhat");

async function main() {
  try {
    // Deploy the CUSDT contract
    const CUSDT = await ethers.getContractFactory("CUSDT");
    const cusdt = await CUSDT.deploy();
    await cusdt.deployed();
    console.log("CUSDT deployed to:", cusdt.address);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
