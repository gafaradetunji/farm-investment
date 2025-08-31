
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // 1. Deploy MockUSDT
  const MockUSDT = await ethers.getContractFactory("MockUSDT");
  const usdt = await MockUSDT.deploy();
  await usdt.waitForDeployment();
  console.log("MockUSDT deployed to:", await usdt.getAddress());

  // 2. Deploy FarmShares (ERC1155)
  const FarmShares = await ethers.getContractFactory("FarmShares");
  const farmShares = await FarmShares.deploy(
    "https://gateway.pinata.cloud/ipfs/bafkreigimje67cwvjx3xrudvd64upwpf7ihde5w7vnctp6w2nupqk2suhyv", // base URI
    deployer.address // initialOwner
  );
  await farmShares.waitForDeployment();
  console.log("FarmShares deployed to:", await farmShares.getAddress());

  // 3. Deploy AgriYieldX
  const AgriYieldX = await ethers.getContractFactory("AgriYieldX");
  const agriYield = await AgriYieldX.deploy(
    await farmShares.getAddress(),
    await usdt.getAddress(),
    deployer.address
  );
  await agriYield.waitForDeployment();
  console.log("AgriYieldX deployed to:", await agriYield.getAddress());

  // 4. Transfer ownership of FarmShares to AgriYieldX
  const tx = await farmShares.transferOwnership(await agriYield.getAddress());
  await tx.wait();
  console.log("FarmShares ownership transferred to AgriYieldX");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
