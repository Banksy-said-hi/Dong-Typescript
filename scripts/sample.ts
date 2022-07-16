import {ethers} from "hardhat";
import { Dong__factory } from "../typechain-types";

async function main() {

    // Getting all of the accounts of the provider
    const accounts = await ethers.getSigners();
    
    console.log("");
    console.log("--- (1) Getting required accounts ---");
    console.log("");

    const deployer = accounts[0];
    const deployerBalance = await deployer.getBalance();
    console.log(`Deployer is ${deployer.address} with the balance of ${ethers.utils.formatEther(deployerBalance)}`);
    console.log("");

    const beneficiary = accounts[1];
    const beneficiaryBalance = await beneficiary.getBalance();
    console.log(`Beneficiary is ${beneficiary.address} with the balance of ${ethers.utils.formatEther(beneficiaryBalance)}`);
    console.log("");

    console.log("--- (2) Let's deploy the contract now! ---");
    console.log("");

    const Dong:Dong__factory = await ethers.getContractFactory("Dong");
    const instance = await Dong.deploy(beneficiary.address, 20, 6, "Kami");
    await instance.deployed();

    console.log(`A dong contract has successfuly been deployed on ${instance.address}`);
    console.log("");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });