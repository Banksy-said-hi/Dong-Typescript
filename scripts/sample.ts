import {ethers, network} from "hardhat";

async function main() {
    console.log("=============================================");

    console.log("Trying to connect ...");
    console.log(`Vamos! We are on the ${network.name} network!`);

    console.log("=============================================");

    console.log("Retrieving our account!");
    console.log("Working ...");
    const accounts = await ethers.getSigners();
    const address = accounts[0].address;
    const tx = await accounts[0].getBalance();
    console.log("Successful!");
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
    const tx1 = await instance.getLatestPrice();
    console.log(tx1);
    // console.log(receipt1);
    // console.log("Working ...");
    // console.log(`Current Matic price: $${(tx1.toNumber()/100000000).toFixed(4)}`);

    console.log("=============================================");

    // console.log("Trying to read the assigned value");
    // console.log("Working ...");
    // const tx2 = await instance.response();
    // console.log(`The response is ${tx2.toNumber()}`);

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