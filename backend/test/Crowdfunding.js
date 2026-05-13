import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;
import helpers from "@nomicfoundation/hardhat-network-helpers";
const { time } = helpers;

describe("Crowdfunding", function () {
  let Crowdfunding, crowdfunding, owner, addr1, addr2;
  const goal = ethers.parseEther("10");
  const duration = 7;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    crowdfunding = await Crowdfunding.deploy(goal, duration);
  });

  it("Devrait accepter les contributions", async function () {
    const contributionAmount = ethers.parseEther("1");
    
    await crowdfunding.connect(addr1).contribute({ value: contributionAmount });

    expect(await crowdfunding.totalFunds()).to.equal(contributionAmount);
    expect(await crowdfunding.contributions(addr1.address)).to.equal(contributionAmount);
  });

  it("Devrait permettre le remboursement si l'objectif n'est pas atteint et que le temps est ecoule", async function () {
    const contributionAmount = ethers.parseEther("2");
    
    await crowdfunding.connect(addr1).contribute({ value: contributionAmount });
    await crowdfunding.connect(addr2).contribute({ value: contributionAmount });

    await time.increase(8 * 24 * 60 * 60);

    const balanceBefore = await ethers.provider.getBalance(addr1.address);

    const tx = await crowdfunding.connect(addr1).refund();
    const receipt = await tx.wait();
    
    const gasUsed = receipt.gasUsed * receipt.gasPrice;

    const balanceAfter = await ethers.provider.getBalance(addr1.address);
    expect(balanceAfter).to.equal(balanceBefore + contributionAmount - gasUsed);

    expect(await crowdfunding.contributions(addr1.address)).to.equal(0);
  });
});
