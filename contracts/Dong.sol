// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// TODO:
// (1) Change the chainlink pricefeed contract to be able to retrieve the Polygon price
// (2) Modify the script to make it calculate the dong correctly

contract Dong {
    AggregatorV3Interface internal priceFeed;

    int256 public response;
    uint8 public decimals;
    uint256 public ethPrice;

    uint256 public totalDollarAmount;
    uint256 public remainingETHAmount;
    uint256 public contributors;
    uint256 public dong;
    uint256 public counter;

    string public beneficiaryName;

    address public beneficiary;
    // address public creator;

    bool public finished;

    mapping(address => uint256) public payment;
    mapping(uint256 => string) public names;

    constructor(
        address _beneficiary,
        uint256 _totalDollarAmount,
        uint256 _contributors,
        string memory _name
    ) {
        priceFeed = AggregatorV3Interface(
            0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
        );

        getLatestPrice();

        // remainingETHAmount = _totalDollarAmount / ethPrice;
        // dong = remainingETHAmount / contributors;

        // creator = msg.sender;
        beneficiary = _beneficiary;
        totalDollarAmount = _totalDollarAmount;
        contributors = _contributors;
        beneficiaryName = _name;
    }

    function getLatestPrice() private returns (int256) {
        (
            ,
            /*uint80 roundID*/
            response, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        calculateETHPrice(response);
        return (response);
    }

    function calculateETHPrice(int256 _price) private {
        ethPrice = uint256(_price) * 10000000000;
    }

    function payDong(string calldata _name) public payable {
        require(msg.value >= dong, "msg.value must be at least equal to dong");
        require(finished == false, "The process has already been finished");

        uint256 reversal;
        uint256 net;

        if (msg.value <= remainingETHAmount) {
            reversal = msg.value % dong;
            net = msg.value - reversal;
        } else {
            reversal = msg.value - remainingETHAmount;
            net = remainingETHAmount;
        }

        remainingETHAmount -= net;
        payment[msg.sender] += net;

        counter += 1;
        names[counter] = _name;

        payable(msg.sender).transfer(reversal);

        if (remainingETHAmount == 0) {
            payable(beneficiary).transfer(address(this).balance);
            finished = true;
        }
    }
}
