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
  
  beforeEach(async() => {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    beneficiary = accounts[1];
    user_1 = accounts[2];
    user_2 = accounts[3];

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

    describe("calculations", () => {
      it("Calculates the dong amount correctly", async () => {
        const response0 = await contract.dong();
        const response1 = "3.333333333333333333";
        expect(ethers.utils.formatEther(response0)).to.equal(response1);
      })
    })
  })

  describe("Interaction", () => {
    describe("Paying Dong", () => {
      it("Does not accept a transaction without payment", async () => {
        await expect(contract.connect(user_1).payDong("kami", { value: 0 })).to.be.revertedWith("msg.value must be at least equal to dong");
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

