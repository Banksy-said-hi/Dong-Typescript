import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { AddressType } from "typechain";
import { Dong } from "../typechain-types";

describe("Dong", async function () {
  let contract: Dong;

  let beneficiary: SignerWithAddress;
  let deployer: SignerWithAddress;

  let user_1: SignerWithAddress;
  let user_2: SignerWithAddress;
  let user_3: SignerWithAddress;
  let user_4: SignerWithAddress;
  let user_5: SignerWithAddress;
  let user_6: SignerWithAddress;

  
  beforeEach(async() => {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    beneficiary = accounts[1];
    user_1 = accounts[2];
    user_2 = accounts[3];
    user_3 = accounts[4];
    user_4 = accounts[5];
    user_5 = accounts[6];
    user_6 = accounts[7];

  

    const Dong = await ethers.getContractFactory("Dong");
    contract = await Dong.deploy(beneficiary.address, 20, 6, "Kami");
    await contract.deployed();
  })

  describe("Deployment", async function () {

    it("Has been deployed on an address successfully", async function () {
        expect(contract.address === null).to.equal(false);
      })

    describe("Parameters", async () => {
      it("Sets the beneficiary name correctly", async () => {
        const response = await contract.beneficiaryName();
        expect(response).to.equal("Kami");
      })

      it("Sets the number of contributors correctly", async () => {
        const response = await contract.contributors();
        expect(response.toNumber()).to.equal(6);
      })

      it("Sets the total amount correctly to 20", async () => {
        const response = await contract.remainingAmount();
        expect(ethers.utils.formatEther(response).slice(0, 2)).to.equal("20");
      })

      it("Sets the beneficiary's address correctly", async () => {
        const response = await contract.beneficiary();
        expect(response).to.equal(beneficiary.address);
      })
    })

    // TODO: Make it work, write something that ensures DONG is calculated by the contract at any cases
    // describe("calculations", () => {
    //   it("Calculates the dong amount correctly", async () => {
    //     const response0 = await contract.dong();
    //     const response1 = "3.366666666666667".slice(0,20);
    //     expect(ethers.utils.formatEther(response0).slice(0, )).to.equal(response1);
    //   })
    // })
  })

  describe("Interaction", () => {
    describe("Paying Dong", () => {
      it("Does not accept a transaction without payment", async () => {
        await expect(contract.connect(user_1).payDong("kami", { value: 0 })).to.be.revertedWith("msg.value must be at least equal to dong");
      })

      // TODO: Find out where that tiny amount of money goes
      it("Cannot issue a payDong( ) transaction if the contract has been closed already", async () => {
        const response = await contract.dong();

        const tx1 = await contract.connect(user_1).payDong("Roham", {value: response});
        const tx2 = await contract.connect(user_2).payDong("Ali", {value: response});
        const tx3 = await contract.connect(user_3).payDong("Hossein", {value: response});
        const tx4 = await contract.connect(user_4).payDong("Daniel", {value: response});
        const tx5 = await contract.connect(user_5).payDong("Ame", {value: response});
        const tx6 = await contract.connect(user_6).payDong("Konastantin", {value: response});

        Promise.all([tx1, tx2, tx3, tx4, tx5, tx6]);

        const tx7 = await contract.remainingAmount();
        const response2 = ethers.utils.formatEther(tx7);
        console.log(`Remaining amount is ${response2}`);

        const tx8 = await contract.finished();
        console.log(tx8);
      })
    })
  })
})







//     it("Should fail if the unlockTime is not in the future", async function () {
//       // We don't use the fixture here because we want a different deployment
//       const latestTime = await time.latest();
//       const Lock = await ethers.getContractFactory("Lock");
//       await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
//         "Unlock time should be in the future"
//       );
//     });
//   });

//   describe("Withdrawals", function () {
//     describe("Validations", function () {
//       it("Should revert with the right error if called too soon", async function () {
//         const { lock } = await loadFixture(deployOneYearLockFixture);

//         await expect(lock.withdraw()).to.be.revertedWith(
//           "You can't withdraw yet"
//         );
//       });

//       it("Should revert with the right error if called from another account", async function () {
//         const { lock, unlockTime, otherAccount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // We can increase the time in Hardhat Network
//         await time.increaseTo(unlockTime);

//         // We use lock.connect() to send a transaction from another account
//         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
//           "You aren't the owner"
//         );
//       });

//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { lock, unlockTime } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // Transactions are sent using the first signer by default
//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).not.to.be.reverted;
//       });
//     });

//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw())
//           .to.emit(lock, "Withdrawal")
//           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });

//     describe("Transfers", function () {
//       it("Should transfer the funds to the owner", async function () {
//         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).to.changeEtherBalances(
//           [owner, lock],
//           [lockedAmount, -lockedAmount]
//         );
//       });
//     });
//   });
// });

