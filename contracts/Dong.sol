// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// TODO:

// Convert the total entered amount in dollar to MATIC tokens

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

        getLatestPrice();

        beneficiary = _beneficiary;
        totalDollarAmount = _totalDollarAmount;
        contributors = _contributors;
        beneficiaryName = _beneficiaryName;
    }

    function getLatestPrice() public {
        (
            ,
            /*uint80 roundID*/
            price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        calculator(price);
    }

    function calculator(int256 _price) public {
        totalMaticTokens = ((totalDollarAmount * 10**8) / _price);
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
