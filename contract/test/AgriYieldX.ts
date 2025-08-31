// test file  
import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { MockUSDT, FarmShares, AgriYieldX } from "../typechain-types";

describe("AgriYield Crowdfunding", function () {
  async function deployFixture() {
    const [deployer, farmer, investor] = await ethers.getSigners();

    // Deploy MockUSDT
    const MockUSDT = await ethers.getContractFactory("MockUSDT");
    const usdt = (await MockUSDT.deploy()) as MockUSDT;
    await usdt.waitForDeployment();

    // Deploy FarmShares
    const FarmShares = await ethers.getContractFactory("FarmShares");
    const farmShares = (await FarmShares.deploy(
    "https://gateway.pinata.cloud/ipfs/bafkreigimje67cwvjx3xrudvd64upwpf7ihde5w7vnctp6w2nupqk2suhyv", // base URI
      deployer.address
    )) as FarmShares;
    await farmShares.waitForDeployment();

    // Deploy AgriYieldX
    const AgriYieldX = await ethers.getContractFactory("AgriYieldX");
    const agriYield = (await AgriYieldX.deploy(
      await farmShares.getAddress(),
      await usdt.getAddress(),
      deployer.address
    )) as AgriYieldX;
    await agriYield.waitForDeployment();

    // Transfer FarmShares ownership to AgriYieldX
    await farmShares.transferOwnership(await agriYield.getAddress());

    return { deployer, farmer, investor, usdt, farmShares, agriYield };
  }

  it("should allow faucet minting", async function () {
    const { investor, usdt } = await loadFixture(deployFixture);

    await usdt.connect(investor).faucet();
    const bal = await usdt.balanceOf(investor.address);
    expect(bal).to.equal(ethers.parseEther("1000"));
  });

  it("farmer should create a farm", async function () {
    const { farmer, agriYield } = await loadFixture(deployFixture);

    const block = await ethers.provider.getBlock("latest");
    const deadline = (block?.timestamp ?? 0) + 61 * 24 * 60 * 60;

    const tx = await agriYield
      .connect(farmer)
      .createFarm("Maize Farm", ethers.parseEther("1000"), deadline, 100);
    await tx.wait();

    const farm = await agriYield.farmInfo(1);
    expect(farm.farmName).to.equal("Maize Farm");
    expect(farm.farmer).to.equal(farmer.address);
    expect(farm.fundingGoal).to.equal(ethers.parseEther("1000"));
  });

  it("investor should invest in a farm", async function () {
    const { farmer, investor, usdt, agriYield, farmShares } =
      await loadFixture(deployFixture);

    const block = await ethers.provider.getBlock("latest");
    const deadline = (block?.timestamp ?? 0) + 61 * 24 * 60 * 60;

    await agriYield
      .connect(farmer)
      .createFarm("Rice Farm", ethers.parseEther("1000"), deadline, 100);

    // Investor faucet and approve
    await usdt.connect(investor).faucet();
    await usdt
      .connect(investor)
      .approve(await agriYield.getAddress(), ethers.parseEther("1000"));

    // Invest
    await expect(
      agriYield.connect(investor).invest(1, ethers.parseEther("100"))
    ).to.emit(agriYield, "Invested");

    const shares = await farmShares.balanceOf(investor.address, 1);
    expect(shares).to.be.gt(0n);
  });

  it("should finalize campaign and allow refund if goal not met", async function () {
    const { farmer, investor, usdt, agriYield, farmShares} = await loadFixture(
      deployFixture
    );

    const block = await ethers.provider.getBlock("latest");
    const deadline = (block?.timestamp ?? 0) + 61 * 24 * 60 * 60;

    await agriYield
      .connect(farmer)
      .createFarm("Tomato Farm", ethers.parseEther("1000"), deadline, 100);

    // Investor invests small amount
    await usdt.connect(investor).faucet();
    await usdt
      .connect(investor)
      .approve(await agriYield.getAddress(), ethers.parseEther("100"));
    await agriYield.connect(investor).invest(1, ethers.parseEther("100"));

    // Advance time beyond deadline
    await ethers.provider.send("evm_increaseTime", [62 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine", []);

    await agriYield.finalizeCampaign(1);
    const farm = await agriYield.farmInfo(1);
    expect(farm.status).to.equal(2); // Failed

    // Refund
    const before = await usdt.balanceOf(investor.address);
    expect(await farmShares.owner()).to.equal(await agriYield.getAddress());

    await expect(agriYield.connect(investor).claimRefund(1)).to.emit(agriYield, "RefundClaimed");
    const after = await usdt.balanceOf(investor.address);

    expect(after).to.be.gt(before);
  });
});