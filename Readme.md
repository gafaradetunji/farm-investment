# AgriYieldX

## Overview

AgriYieldX is a decentralized crowdfunding platform built on Ethereum for agricultural projects. It allows farmers to raise funds by issuing ERC1155-based farm shares to investors, who can later claim profits based on their share ownership. The platform uses a stablecoin (MockUSDT) for transactions, ensuring stability in funding and profit distribution.

## Features

- **Farm Campaign Creation**: Farmers can create funding campaigns by specifying a farm name, funding goal, deadline, and share supply.
- **Investment**: Investors deposit MockUSDT to receive ERC1155 farm shares proportional to their investment.
- **Campaign Finalization**: Campaigns are finalized after the deadline, marked as Successful (if the funding goal is met) or Failed.
- **Fund Release**: Successful campaigns allow farmers to withdraw raised funds.
- **Refunds**: Investors can claim refunds for failed campaigns, returning their MockUSDT and burning their shares.
- **Profit Distribution**: Farmers can deposit profits, which investors can claim based on their share ownership.
- **Transparency**: View functions provide detailed farm and investment information.

## Contract Details

- **Solidity Version**: ^0.8.20
- **License**: MIT
- **Dependencies**:
  - OpenZeppelin's Ownable for access control
  - OpenZeppelin's ERC1155Holder for handling ERC1155 tokens
  - OpenZeppelin's IERC20 for MockUSDT interactions
  - Custom FarmShares contract for ERC1155 share management

### Main Contract: AgriYieldX

## Key Components

### Structs

**Farm**: Stores farm details including name, farmer address, funding goal, raised amount, deadline, share token ID, share supply, and status (Active, Successful, Failed, PaidOut).

### Mappings

- `farms`: Maps farm ID to Farm struct.
- `invested`: Tracks investment amounts per farm and investor.
- `sharesOf`: Tracks shares owned per farm and investor.
- `farmProfits`: Tracks total profits deposited per farm.
- `profitClaimed`: Tracks profits claimed by investors per farm.

### Events

- `FarmCreated`: Emitted when a new farm campaign is created.
- `Invested`: Emitted when an investor deposits MockUSDT and receives shares.
- `FundsReleased`: Emitted when funds are released to the farmer.
- `RefundClaimed`: Emitted when an investor claims a refund.
- `ProfitDistributed`: Emitted when profits are deposited for distribution.

## Core Functions

### createFarm

- **Purpose**: Allows farmers to create a new crowdfunding campaign.
- **Parameters**: Farm name, funding goal, deadline, share supply.
- **Requirements**: Non-zero funding goal, deadline > 60 days from now, non-zero share supply.
- **Action**: Mints ERC1155 shares to the contract vault and emits FarmCreated.

### invest

- **Purpose**: Allows investors to deposit MockUSDT and receive farm shares.
- **Parameters**: Farm ID, investment amount.
- **Requirements**: Active farm, before deadline, non-zero amount.
- **Action**: Transfers MockUSDT, calculates and transfers shares, updates investment records, emits Invested.

### finalizeCampaign

- **Purpose**: Finalizes a campaign after its deadline.
- **Requirements**: Deadline passed, campaign active.
- **Action**: Marks campaign as Successful (if goal met) or Failed.

### releaseFunds

- **Purpose**: Allows farmers to withdraw funds from successful campaigns.
- **Requirements**: Campaign successful, caller is the farmer.
- **Action**: Transfers funds to farmer, marks campaign as PaidOut, emits FundsReleased.

### claimRefund

- **Purpose**: Allows investors to reclaim MockUSDT from failed campaigns.
- **Requirements**: Campaign failed or past deadline without meeting goal, investor has funds.
- **Action**: Burns investor's shares, refunds MockUSDT, emits RefundClaimed.

### distributeProfit

- **Purpose**: Allows farmers to deposit profits for distribution.
- **Parameters**: Farm ID, profit amount.
- **Requirements**: Campaign in PaidOut status.
- **Action**: Transfers MockUSDT to contract, updates profit records, emits ProfitDistributed.

### claimProfit

- **Purpose**: Allows investors to claim profits based on share ownership.
- **Parameters**: Farm ID.
- **Requirements**: Investor holds shares, profits available.
- **Action**: Calculates and transfers entitled profits, updates claim records.

## View Functions

- `farmInfo`: Returns details of a specific farm.
- `getAllFarms`: Returns all farms.
- `getMyFarms`: Returns farms created by a specific farmer.
- `getMyInvestments`: Returns farms an investor has invested in.

## Setup and Deployment

### Install Dependencies

```bash
# Install OpenZeppelin contracts
npm install @openzeppelin/contracts

# Deploy the FarmShares contract (ERC1155-based) separately
# Deploy a MockUSDT contract (ERC20) for testing
```

### Deploy AgriYieldX

Pass the FarmShares contract address, MockUSDT address, and initial owner address to the constructor.

```solidity
AgriYieldX agriYieldX = new AgriYieldX(farmSharesAddress, mockUSDTAddress, initialOwner);
```

### Testing

- Use tools like Hardhat or Foundry to deploy and test on a local blockchain.
- Ensure sufficient MockUSDT is minted and approved for investors.

## Usage Example

### Farmer

1. Call `createFarm("Wheat Farm", 10000e18, block.timestamp + 90 days, 1000)` to create a campaign.
2. After the deadline, call `finalizeCampaign(farmId)` to check status.
3. If successful, call `releaseFunds(farmId)` to receive funds.
4. Later, deposit profits using `distributeProfit(farmId, profitAmount)`.

### Investor

1. Approve MockUSDT for the AgriYieldX contract.
2. Call `invest(farmId, amount)` to invest and receive shares.
3. If the campaign fails, call `claimRefund(farmId)` to retrieve funds.
4. If profits are distributed, call `claimProfit(farmId)` to receive profits.

## Security Considerations

- **Access Control**: Uses OpenZeppelin's Ownable for restricted functions.
- **Token Safety**: Ensures safe transfers for ERC20 and ERC1155 tokens.
- **Input Validation**: Checks for valid funding goals, deadlines, and amounts.
- **Reentrancy**: Uses OpenZeppelin's safe transfer methods to mitigate risks.
- **Profit Distribution**: Ensures only share holders can claim profits, proportional to their shares.

## Future Improvements

- Add support for multiple funding tokens.
- Implement time-based profit vesting schedules.
- Add governance for platform fees or upgrades.
- Enhance refund mechanisms for partial success scenarios.

## License

This project is licensed under the MIT License.
