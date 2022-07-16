// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

// TODO: Chainlink price data

contract Dong {
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
        creator = msg.sender;
        beneficiary = _beneficiary;
        beneficiaryName = _name;
        remainingAmount = 1 ether * _totalAmount;
        contributors = _contributors;
        dong = remainingAmount / contributors;
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
            payable(beneficiary).transfer((9 * (address(this).balance)) / 10);
            payable(creator).transfer(address(this).balance);
            finished = true;
        }
    }
}
