import {ethers, network} from "hardhat";

async function main() {

    console.log(`Trying to connect to the ${network.name} network`);

    console.log("=============================================");

    console.log("Retrieving our account!");
    const accounts = await ethers.getSigners();
    const address = accounts[0].address;
    const tx = await accounts[0].getBalance();
    const balance = ethers.utils.formatEther(tx);
    console.log(`Our account is ${address} with the balance of ${balance} ETH`);

    console.log("=============================================");

    console.log("Trying to deploy a contract")
    const Dong = await ethers.getContractFactory("Dong");
    const instance = await Dong.deploy(accounts[0].address, 20, 6, "Kami");
    await instance.deployed();
    console.log(`The smart contract is deployed on ${instance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });