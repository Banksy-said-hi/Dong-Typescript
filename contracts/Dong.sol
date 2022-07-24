// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// TODO: Chainlink price data

contract Dong {
    AggregatorV3Interface internal priceFeed;

    uint256 public totalFixedAmount;
    uint256 public remainingAmount;
    uint256 public contributors;
    uint256 public dong;
    uint256 public counter;

    string public beneficiaryName;

    address public beneficiary;
    address public creator;

    bool public finished;

    mapping(address => uint256) public payment;
    mapping(uint256 => string) public names;

    constructor(
        address _beneficiary,
        uint256 _totalAmount,
        uint256 _contributors,
        string memory _name
    ) {
        priceFeed = AggregatorV3Interface(
            0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
        );
        creator = msg.sender;
        beneficiary = _beneficiary;
        beneficiaryName = _name;
        totalFixedAmount = 1 ether * _totalAmount;
        remainingAmount = (101 * (totalFixedAmount)) / 100;
        contributors = _contributors;
        dong = remainingAmount / contributors;
    }

    function getLatestPrice() public view returns (int256) {
        (
            ,
            /*uint80 roundID*/
            int256 price,
            ,
            ,

        ) = /*uint startedAt*/
            /*uint timeStamp*/
            /*uint80 answeredInRound*/
            priceFeed.latestRoundData();
        return price;
    }

    function payDong(string calldata _name) public payable {
        require(msg.value >= dong, "msg.value must be at least equal to dong");
        require(finished == false, "The process has already been finished");

        uint256 reversal;
        uint256 net;

        if (msg.value <= remainingAmount) {
            reversal = msg.value % dong;
            net = msg.value - reversal;
        } else {
            reversal = msg.value - remainingAmount;
            net = remainingAmount;
        }

        remainingAmount -= net;
        payment[msg.sender] += net;

        counter += 1;
        names[counter] = _name;

        payable(msg.sender).transfer(reversal);

        if (remainingAmount == 0) {
            payable(beneficiary).transfer(totalFixedAmount);
            payable(creator).transfer(address(this).balance);
            finished = true;
        }
    }
}
