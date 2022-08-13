// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// TODO:

// (1) How to make it possible for the dong local variable to represent amounts less than 1
// Try familiarizing yourself to work with both decimals and price retrieved from Chainlink Oracle

// (2) Integrate the front end to the typescript version of Dong! It may be needed to
// learn and implement some typescript modifications through your code

contract Dong {
    AggregatorV3Interface internal priceFeed;

    int256 public totalMaticTokens;
    int256 public price;

    int256 public totalDollarAmount;
    int256 public contributors;
    int256 public dong;
    int256 public counter;

    string public beneficiaryName;

    address public beneficiary;

    bool public finished;

    mapping(address => int256) public payment;
    mapping(uint256 => string) public names;

    constructor(
        address _beneficiary,
        int256 _totalDollarAmount,
        int256 _contributors,
        string memory _beneficiaryName
    ) {
        priceFeed = AggregatorV3Interface(
            0x7794ee502922e2b723432DDD852B3C30A911F021
        );

        beneficiary = _beneficiary;
        totalDollarAmount = _totalDollarAmount;
        contributors = _contributors;
        beneficiaryName = _beneficiaryName;

        getLatestPrice();
    }

    function getLatestPrice() public {
        (
            ,
            /*uint80 roundID*/
            price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        // *10**18
        totalMaticTokens =
            (110 * ((totalDollarAmount * 100000000) / price)) /
            100;
        // Exactly here we reach zero value for dong local variable
        dong = totalMaticTokens / contributors;
    }

    // function payDong(string calldata _name) public payable {
    //     require(msg.value >= dong, "msg.value must be at least equal to dong");
    //     require(finished == false, "The process has already been finished");

    //     uint256 reversal;
    //     uint256 net;

    //     if (msg.value <= (totalDollarAmount / maticPrice)) {
    //         reversal = msg.value % (dong * maticPrice);
    //         net = msg.value - reversal;
    //     } else {
    //         reversal = msg.value - (totalDollarAmount / maticPrice);
    //         net = totalDollarAmount;
    //     }

    //     totalDollarAmount -= net;
    //     payment[msg.sender] += net;

    //     names[counter] = _name;
    //     counter += 1;

    //     payable(msg.sender).transfer(reversal);

    //     if (totalDollarAmount == 0) {
    //         payable(beneficiary).transfer(address(this).balance);
    //         finished = true;
    //     }
    // }
}
