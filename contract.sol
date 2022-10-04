// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}
contract Vaultcontract is Ownable{

    IERC20 public immutable _Token; 
    mapping(address => uint) private Balances ; 
    uint256 private decimals; 

    constructor(address _token , uint _decimals){
        _Token = IERC20(_token); 
        decimals = _decimals; 
    }
    event Tokentransferred(address to , uint amount); 
    // this is the modifier will check the availabel balance of the 
    // mentioned token 
    // if the balance is less than the specified amount 
    // it will revert the transcation 
    modifier isAvailable(uint amount){
        if(Balances[msg.sender] < amount){
            revert("Not enough balance");
        }
        _; 
    } 
    function deposit(uint amount) external {
        _Token.transferFrom(msg.sender,address(this),amount);
        Balances[msg.sender] += amount;  
        emit Tokentransferred(address(this),amount); 
    }
    // this function will allow you to send tokens to other addresses 
    // token can be specified from api or even manual 
    function SendTokenToothers(address spender , uint amount) external isAvailable(amount){ 
        _Token.transfer(spender,amount); 
        Balances[msg.sender] -= amount; 
        emit Tokentransferred(spender, amount);
    }

    // this function will allow owner to withdraw any ERC20 tokens available 
    // inside the contract 
    function WithDraw(uint amount) external isAvailable(amount){
        _Token.transfer(msg.sender,amount); 
        Balances[msg.sender] -= amount; 
        emit Tokentransferred(msg.sender, amount);
    }
    // private function that checks whether the amount of token requested is 
    // avialable or not 
    // function isamountAvailable(uint amount) private view returns(bool){
    //     return (_Token.balanceOf(address(this)) >= amount) ; 
    // }
    // // this function will allow owner to get the available amount of tokens 
    // in the contract 

    function getAvailableTokens()external onlyOwner view returns(uint256){
        return (Balances[msg.sender]); 
    }

}
