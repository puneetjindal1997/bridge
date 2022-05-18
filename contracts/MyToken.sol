// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// This is the main building block for smart contracts.
contract MyToken {
    // Some string type variables to identify the token.
    // The `public` modifier makes a variable readable from outside the contract.
    string public name = "My Hardhat Token";
    string public symbol = "MHT";

    uint8 public decimals = 10;

    // The fixed amount of tokens stored in an unsigned integer type variable.
    uint256 public totalSupply = 10000000000000000000000000;

    // An address type variable is used to store ethereum accounts.
    address public owner;

    // A mapping is a key/value map. Here we store each account balance.
    mapping(address => uint256) balances;
    event transfer(address from, address to, uint256 amount);
    /**
     * Contract initialization.
     *
     * The `constructor` is executed only once when the contract is created.
     */
    constructor() {
        // The totalSupply is assigned to transaction sender, which is the account
        // that is deploying the contract.
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
     * A function to transfer tokens.
     *
     * The `external` modifier makes a function *only* callable from outside
     * the contract.
     */
    function Transfer(address to, uint256 amount) external payable{
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Transfer the amount.
        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit transfer(msg.sender, to, amount);

    }

    /**
     * Read only function to retrieve the token balance of a given account.
     *
     * The `view` modifier indicates that it doesn't modify the contract's
     * state, which allows us to call it without executing a transaction.
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    /*
     *  Mint the tokens to a given address
     *
     *  return uint256
     */
    function mint(address to, uint256 amount) external{
        // checking the user is owner or not
        require(owner == msg.sender, "not allow to mint");

        // mint tokens to given address
        balances[to] += amount;
    }

    function burn(address to, uint256 amount) external{
        // // checking the user is owner or not
        // require(owner != msg.sender, "not allow to mint");

        // mint tokens to given address
        balances[msg.sender] -= amount;
        emit transfer(msg.sender, to, amount);
    }

    /****/
}