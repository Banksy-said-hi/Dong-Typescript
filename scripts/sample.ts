import {ethers, network} from "hardhat";

async function main() {

    console.log(`Trying to connect to the ${network.name} network`);

    console.log("=============================================");

    console.log("Retrieving our account!");
    const accounts = await ethers.getSigners();
    const address = accounts[0].address;
    const tx = await accounts[0].getBalance();
    console.log("Done");
    const balance = ethers.utils.formatEther(tx).slice(0, 6);
    console.log(`Our account is ${address} with the balance of ${balance} ETH`);

    console.log("=============================================");

    console.log("Trying to deploy a contract!")
    const Dong = await ethers.getContractFactory("Dong");
    const instance = await Dong.deploy(accounts[0].address, 20, 200, "Kami");
    await instance.deployed();
    console.log("Done");
    const receipt = instance.deployTransaction
    const cost = receipt.gasPrice?.toString();
    console.log(`The smart contract is deployed on ${instance.address} with the cost of ${cost} WEI`);
    const tx1 = await instance.ethPrice();
    const response1 = tx1.toString()
    console.log(`The ETH price is equal to ${response1}`);
    const tx2 = await instance.dong();
    const response2 = tx2.toString()
    console.log(`Dong is ${response2}`);


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