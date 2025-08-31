// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @notice ERC1155 Share Tokens
contract FarmShares is ERC1155, Ownable {
    string public name = "AgriYield Shares";
    string public symbol = "AFS";

    constructor(string memory _baseURI, address initialOwner) ERC1155(_baseURI) Ownable(initialOwner) {
        _transferOwnership(initialOwner);
    }
    

    function mint(address to, uint id, uint amount, bytes memory data) external onlyOwner {
        _mint(to, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    // function burn(address from, uint id, uint amount) external {
    //     require(msg.sender == from || isApprovedForAll(from, msg.sender), "not owner nor approved");

    //     _burn(from, id, amount);
    // }

    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }

    function burnShares(address from, uint256 id, uint256 amount) external onlyOwner {
    _burn(from, id, amount);
    }
}

