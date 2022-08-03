// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// TODO:
// Try to fix the Chainlink interaction, it returns "0" as the current MATIC price
// It may be relevant to the MATIC balance of the caller contract or msg.sender
// Ask Chainlink specialists in your Telegram group

contract Dong {
    AggregatorV3Interface internal priceFeed;

    uint256 public maticPrice;

    uint256 public totalDollarAmount;
    uint256 public contributors;
    uint256 public dong;
    uint256 public counter;

    string public beneficiaryName;

    address public beneficiary;

    bool public finished;

    mapping(address => uint256) public payment;
    mapping(uint256 => string) public names;

    constructor(
        address _beneficiary,
        uint256 _totalDollarAmount,
        uint256 _contributors,
        string memory _beneficiaryName
    ) {
        priceFeed = AggregatorV3Interface(
            0x7794ee502922e2b723432DDD852B3C30A911F021
        );
        beneficiary = _beneficiary;
        totalDollarAmount = _totalDollarAmount;
        contributors = _contributors;
        beneficiaryName = _beneficiaryName;
    }

    function getLatestPrice() public returns (int256) {
        (
            ,
            /*uint80 roundID*/
            int256 response, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        return response;
    }

    function calculateETHPrice(int256 _price) private {
        maticPrice = uint256(_price) * 10000000000;
    }

    function calculateDong() public returns (uint256) {
        getLatestPrice();
        dong = totalDollarAmount / maticPrice;
        return dong;
    }

    function payDong(string calldata _name) public payable {
        // updateDong();

        require(msg.value >= dong, "msg.value must be at least equal to dong");
        require(finished == false, "The process has already been finished");

        uint256 reversal;
        uint256 net;

        if (msg.value <= (totalDollarAmount / maticPrice)) {
            reversal = msg.value % (dong * maticPrice);
            net = msg.value - reversal;
        } else {
            reversal = msg.value - (totalDollarAmount / maticPrice);
            net = totalDollarAmount;
        }

        totalDollarAmount -= net;
        payment[msg.sender] += net;

        names[counter] = _name;
        counter += 1;

        payable(msg.sender).transfer(reversal);

        if (totalDollarAmount == 0) {
            payable(beneficiary).transfer(address(this).balance);
            finished = true;
        }
    }
}
