import {ethers, network} from "hardhat";

async function main() {

    console.log(`Trying to connect to the ${network.name} network`);

    console.log("=============================================");

    console.log("Retrieving our account!");
    const accounts = await ethers.getSigners();
    const address = accounts[0].address;
    const tx = await accounts[0].getBalance();
    console.log("Done");
    const balance = ethers.utils.formatEther(tx);
    console.log(`Our account is ${address} with the balance of ${balance} ETH`);

    console.log("=============================================");

    console.log("Trying to deploy a contract!")
    const Dong = await ethers.getContractFactory("Dong");
    const instance = await Dong.deploy(accounts[0].address, 20, 6, "Kami");
    await instance.deployed();
    console.log("Done");
    const receipt = instance.deployTransaction
    const cost = receipt.gasPrice?.toString();
    console.log(`The smart contract is deployed on ${instance.address} with the cost of ${cost} WEI`);

    console.log("=============================================");

    console.log("Trying to get the price of ETH from Chainlink!");
    const tx1 = await instance.getLatestPrice();
    const response = tx1.toNumber().toFixed(4);
    console.log("Done");
    console.log(`Ethereum price is currently $${response}`)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });