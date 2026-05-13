// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Crowdfunding {
    address public creator;
    uint256 public goal;
    uint256 public deadline;
    uint256 public totalFunds;
    bool public isFunded;

    mapping(address => uint256) public contributions;

    event ContributionReceived(address contributor, uint256 amount);
    event GoalReached(uint256 totalFunds);
    event RefundIssued(address contributor, uint256 amount);

    constructor(uint256 _goal, uint256 _durationInDays) {
        creator = msg.sender;
        goal = _goal;
        deadline = block.timestamp + (_durationInDays * 1 days);
    }

    function contribute() public payable {
        require(block.timestamp < deadline, "La campagne est terminee");
        require(!isFunded, "Les fonds ont deja ete retires");
        require(msg.value > 0, "La contribution doit etre superieure a 0");

        contributions[msg.sender] += msg.value;
        totalFunds += msg.value;

        emit ContributionReceived(msg.sender, msg.value);
    }

    function withdrawFunds() public {
        require(msg.sender == creator, "Seul le createur peut retirer");
        require(totalFunds >= goal, "L'objectif n'est pas encore atteint");
        require(!isFunded, "Les fonds ont deja ete retires");

        isFunded = true;
        uint256 amountToWithdraw = totalFunds;

        (bool success, ) = payable(creator).call{value: amountToWithdraw}("");
        require(success, "Le transfert a echoue");

        emit GoalReached(amountToWithdraw);
    }

    function refund() public {
        require(
            block.timestamp >= deadline,
            "La campagne est toujours en cours"
        );
        require(
            totalFunds < goal,
            "L'objectif a ete atteint, pas de remboursement"
        );

        uint256 amountToRefund = contributions[msg.sender];
        require(amountToRefund > 0, "Aucune contribution a rembourser");

        // Prevention des attaques Reentrancy
        contributions[msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{value: amountToRefund}("");
        require(success, "Le remboursement a echoue");

        emit RefundIssued(msg.sender, amountToRefund);
    }
}
