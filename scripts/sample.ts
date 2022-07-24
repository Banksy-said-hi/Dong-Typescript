import {ethers, network} from "hardhat";

async function main() {

    // Getting all of the accounts of the provider
    const accounts = await ethers.getSigners();
    console.log(accounts);

    console.log(network.name);

    console.log(network.provider);

    console.log(network.config);



    // Dong = await ethers.getContractFactory("Dong");
    // console.log(Dong);



    // instance = await Dong.deploy(beneficiary.address, 20, 6, "Kami");
    // await instance.deployed();

    // console.log(`A dong contract has successfuly been deployed on ${instance.address}`);
    // console.log("");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });