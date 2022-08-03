import {ethers, network} from "hardhat";

async function main() {
    console.log("=============================================");

    console.log(`Trying to connect to the ${network.name} network`);
    console.log("Done Done");

    console.log("=============================================");

    console.log("Retrieving our account!");
    console.log("Working ...");
    const accounts = await ethers.getSigners();
    const address = accounts[0].address;
    const tx = await accounts[0].getBalance();
    console.log("Done! Yohooo");
    const balance = ethers.utils.formatEther(tx).slice(0, 6);
    console.log(`Our account is ${address} with the balance of ${balance} ETH`);

    console.log("=============================================");

    console.log("Trying to deploy a contract!");
    console.log("Working ...");
    const Dong = await ethers.getContractFactory("Dong");
    const instance = await Dong.deploy(accounts[0].address, 20, 200, "Kami");
    await instance.deployed();
    console.log("Done!");
    const receipt = instance.deployTransaction
    const cost = receipt.gasPrice?.toString();
    console.log(`The smart contract is deployed on ${instance.address} with the cost of ${cost} WEI`);

    console.log("=============================================");

    console.log("Trying to get the Matic price from the Chainlink Oracle");
    console.log("Working ...");
    const tx1 = await instance.getLatestPrice();
    console.log(ethers.utils.formatEther(tx1.value));
    // const tx2 = await instance.maticPrice();
    // const response1 = ethers.utils.formatEther(tx2);
    // console.log("Done!");
    // console.log(`The Matic price currently is $${response1}`);

    console.log("=============================================");

    // console.log("Trying to get the dong amount");
    // console.log("Working ...");
    // const tx3 = await instance.calculateDong();
    // const response2 = await tx3.wait();
    // console.log(response2);
    // console.log("Done!");

 
    // console.log("=============================================");

    // console.log("Trying to get the price of the ETH from Chainlink!");
    // const tx1 = await instance.getLatestPrice();
    // const response = tx1.toString().slice(0, 4);
    // console.log("Done");
    // console.log(`Ethereum price is currently $${response}`)

    // console.log("=============================================");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });