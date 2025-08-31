// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./FarmShares.sol";

/// @title AgriYieldCrowdFund
/// @notice Farmers raise funds; investors get ERC1155 farm shares
contract AgriYieldX is Ownable, ERC1155Holder {
    FarmShares public sharesContract;
    IERC20 public fundingToken; // fixed = MockUSDT

    uint256 public farmCounter;
    uint256 public nextShareTokenId = 1;

    enum FarmStatus { Active, Successful, Failed, PaidOut }

    struct Farm {
        string farmName;
        address farmer;
        uint256 fundingGoal;
        uint256 raised;
        uint256 deadline;
        uint256 shareTokenId;
        uint256 shareSupply;
        FarmStatus status;
    }

    mapping(uint256 => Farm) public farms;
    mapping(uint256 => mapping(address => uint256)) public invested;
    mapping(uint256 => mapping(address => uint256)) public sharesOf;

    event FarmCreated(
        string indexed farmName,
        uint256 indexed farmId,
        address indexed farmer,
        uint256 goal,
        uint256 deadline,
        uint256 shareTokenId,
        uint256 shareSupply
    );
    event Invested(uint256 indexed farmId, address indexed investor, uint256 amount, uint256 sharesMinted);
    event FundsReleased(uint256 indexed farmId, uint256 amount);
    event RefundClaimed(uint256 indexed farmId, address indexed investor, uint256 amount);
    event ProfitDistributed(uint256 indexed farmId, uint256 totalProfit);

    constructor(address _sharesContract, address _fundingToken, address initialOwner) Ownable(initialOwner) {
        require(_sharesContract != address(0), "invalid shares contract");
        require(_fundingToken != address(0), "invalid funding token");
        sharesContract = FarmShares(_sharesContract);
        fundingToken = IERC20(_fundingToken);
        _transferOwnership(initialOwner);
    }

    /// @notice Farmer creates a campaign
    function createFarm(string memory _farmName, uint256 fundingGoal, uint256 deadline, uint256 shareSupply) external returns (uint256) {
        require(fundingGoal > 0, "goal > 0");
        require(deadline > block.timestamp + 60 days, "deadline too soon");
        require(shareSupply > 0, "shareSupply > 0");

        farmCounter++;
        uint256 farmId = farmCounter;
        uint256 tokenId = nextShareTokenId++;

        farms[farmId] = Farm({
            farmName: _farmName,
            farmer: msg.sender,
            fundingGoal: fundingGoal,
            raised: 0,
            deadline: deadline,
            shareTokenId: tokenId,
            shareSupply: shareSupply,
            status: FarmStatus.Active
        });

        // Mint shares to contract vault
        sharesContract.mint(address(this), tokenId, shareSupply, "");

        emit FarmCreated(_farmName, farmId, msg.sender, fundingGoal, deadline, tokenId, shareSupply);
        return farmId;
    }

    /// @notice Investor deposits MockUSDT to get shares
    function invest(uint256 farmId, uint256 amount) external {
        Farm storage f = farms[farmId];
        require(f.farmer != address(0), "farm does not exist");
        require(f.status == FarmStatus.Active, "not active");
        require(block.timestamp < f.deadline, "ended");
        require(amount > 0, "amount>0");

        require(fundingToken.transferFrom(msg.sender, address(this), amount), "transfer failed");

        uint256 shares = (amount * f.shareSupply) / f.fundingGoal;
        if (shares == 0) shares = 1;

        uint256 contractShares = sharesContract.balanceOf(address(this), f.shareTokenId);
        if (shares > contractShares) shares = contractShares;

        invested[farmId][msg.sender] += amount;
        sharesOf[farmId][msg.sender] += shares;
        f.raised += amount;

        sharesContract.safeTransferFrom(address(this), msg.sender, f.shareTokenId, shares, "");
        emit Invested(farmId, msg.sender, amount, shares);
    }

    function finalizeCampaign(uint256 farmId) public {
        Farm storage f = farms[farmId];
        require(block.timestamp >= f.deadline, "deadline not reached");
        require(f.status == FarmStatus.Active, "already finalized");

        f.status = (f.raised >= f.fundingGoal) ? FarmStatus.Successful : FarmStatus.Failed;
    }

    function releaseFunds(uint256 farmId) external {
        Farm storage f = farms[farmId];
        require(f.status == FarmStatus.Successful, "not successful");
        require(msg.sender == f.farmer, "only farmer");

        uint256 amount = f.raised;
        f.raised = 0;
        f.status = FarmStatus.PaidOut;

        require(fundingToken.transfer(f.farmer, amount), "payout failed");
        emit FundsReleased(farmId, amount);
    }

    function claimRefund(uint256 farmId) external {
        Farm storage f = farms[farmId];
        require(f.status == FarmStatus.Failed || (block.timestamp >= f.deadline && f.raised < f.fundingGoal), "refund not allowed");

        uint256 investedAmount = invested[farmId][msg.sender];
        require(investedAmount > 0, "no funds");

        invested[farmId][msg.sender] = 0;
        uint256 sharesHeld = sharesOf[farmId][msg.sender];
        sharesOf[farmId][msg.sender] = 0;

        if (sharesHeld > 0) {
            sharesContract.burnShares(msg.sender, f.shareTokenId, sharesHeld);
        }

        require(fundingToken.transfer(msg.sender, investedAmount), "refund failed");
        emit RefundClaimed(farmId, msg.sender, investedAmount);
    }

    // --- Profit distribution MVP ---
    mapping(uint256 => uint256) public farmProfits;
    mapping(uint256 => mapping(address => uint256)) public profitClaimed;

    function distributeProfit(uint256 farmId, uint256 totalProfit) external {
        Farm storage f = farms[farmId];
        require(f.status == FarmStatus.PaidOut, "not released");

        require(fundingToken.transferFrom(msg.sender, address(this), totalProfit), "profit transfer failed");

        farmProfits[farmId] += totalProfit;
        emit ProfitDistributed(farmId, totalProfit);
    }

    function claimProfit(uint256 farmId) external {
        Farm storage f = farms[farmId];
        uint256 holderShares = sharesContract.balanceOf(msg.sender, f.shareTokenId);
        require(holderShares > 0, "no shares");

        uint256 totalProfit = farmProfits[farmId];
        require(totalProfit > 0, "no profit");

        uint256 entitled = (totalProfit * holderShares) / f.shareSupply;
        uint256 already = profitClaimed[farmId][msg.sender];
        require(entitled > already, "nothing to claim");

        uint256 amount = entitled - already;
        profitClaimed[farmId][msg.sender] = entitled;

        require(fundingToken.transfer(msg.sender, amount), "transfer failed");
    }

    /// @notice view helper
    function farmInfo(uint256 farmId) external view returns (Farm memory) {
        return farms[farmId];
    }
    function getAllFarms() external view returns (Farm[] memory) {
    Farm[] memory allFarms = new Farm[](farmCounter);

    for (uint256 i = 1; i <= farmCounter; i++) {
        allFarms[i - 1] = farms[i];
    }

    return allFarms;
    }
    function getMyFarms(address farmer) external view returns (Farm[] memory) {
        // Count first
        uint count = 0;
        for (uint i = 1; i <= farmCounter; i++) {
            if (farms[i].farmer == farmer) {
                count++;
            }
        }

        // Fill array
        Farm[] memory result = new Farm[](count);
        uint index = 0;
        for (uint i = 1; i <= farmCounter; i++) {
            if (farms[i].farmer == farmer) {
                result[index] = farms[i];
                index++;
            }
        }

        return result;
    }

    /// @notice Get all farms an investor has invested in
    function getMyInvestments(address investor) external view returns (Farm[] memory) {
        // Count
        uint count = 0;
        for (uint i = 1; i <= farmCounter; i++) {
            if (invested[i][investor] > 0) {
                count++;
            }
        }

        // Fill array
        Farm[] memory result = new Farm[](count);
        uint index = 0;
        for (uint i = 1; i <= farmCounter; i++) {
            if (invested[i][investor] > 0) {
                result[index] = farms[i];
                index++;
            }
        }

        return result;
    }

}
