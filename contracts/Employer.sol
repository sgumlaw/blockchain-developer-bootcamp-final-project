// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/access/Ownable.sol";
/// @title A System For Facilitating Unemployment Claim Filings and Payments
/// @author Steve Gumlaw
/// 
contract Employer {

//STATE VARIABLES
  uint private employerCount = 0;
  uint private terminationCount = 0;
  uint private claimCounter = 0;
  uint private claimantCount = 0;
  uint private paymentCount = 0;

//STRUCTS AND ENUMS
  struct Business {
    uint256 businessId;
    string businessName;
    address payable employerAddress;
    uint256 reserveBalance;
    uint256 taxRate;
    string stateId; 
    address[] terminated_employees;
   }
  
  enum Reason {
     LaidOff, 
     Fired,
     Quit
   }

  struct Employee {
    uint256 employeeId;
    string name;
    address payable employeeAddress;
    string weeklyPayAmount;
    string terminationDate;
    Reason reason; 
  }

  struct Claimant {
    uint256 claimantId;
    address payable claimantAddress;
    string name;
    string weeklyPayAmount;
    string businessName;
    address businessAddress;
    Payment[] payments;
  }

  struct Payment {
    uint256 paymentId;
    uint256 paymentAmount;
    address employerAddress;
    uint timestamp;
  }

//MAPPINGS
  mapping(address => uint256) public balances;
  mapping(address => Business) public employers;
  mapping(address => Employee) public employees;
  mapping(address => bool) public registered;
  mapping(address => address []) public employer_terminations;
  mapping(address => mapping(address => bool)) public term_eligibility;
  mapping(address => mapping(uint256 => Payment)) public paymentsToClaimant;
  mapping(address => Claimant) public claimants; 

//EVENTS
  event RegisterNewBusiness(address indexed EmployerAddress, uint256 EmployerCount, string BusinessName, string StateId);
  event RecordTerminatedEmployee(address indexed EmployerAddress, address TerminatedEmployeeAddress, uint256 TerminationCount, Reason reason);
  event LogDepositMade(address indexed EmployerAddress, uint256 DepositAmount, uint256 EmployerReserveBalance);
  event Received(address indexed Sender2Contract, uint ReceivedAmount, string Message);
  event RegisterNewClaimant(address indexed ClaimantAddress, uint256 ClaimantCount);
  event Transfer(address indexed ClaimantAddress, address EmployerAddress, uint256 EmployerBalanceBefore, uint256 ClaimantBalanceBefore, uint256 ClaimPaymentAmount, uint256 EmployerBalanceAfter, uint256 ClaimantBalanceAfter);
  event Withdraw(address indexed SenderAddress, uint256 AccountWalletBalanceBefore, uint256 AccountStateBalanceBefore, uint256 WithdrawAmount, uint256 AccountWalletBalanceAfter, uint256 AccountStateBalanceAfter);

  //MODIFIERS
  modifier isEligible(address businessAddress) {
    _;
    require(isClaimantInList(businessAddress, msg.sender), "Eligibility Denied");
  }
   
  //FUNCTIONS
    //FUNCTIONS TO ENABLE SC TO RECEIVE DEPOSITS
  receive() external payable {
    emit Received(msg.sender, msg.value, "Receive Function was called");
  }

  fallback() external payable {
    emit Received(msg.sender, msg.value, "Fallback was called");
  }

//SETTER FUNCTIONS
  //EMPLOYER REGISTERS WITH SC
  function registerNewBusiness(string memory businessName, string memory stateId) public returns (bool) {
    //Add Modifier to verify that employer has not been added
    address _employerAddress = msg.sender;
    require(registered[_employerAddress] == false);

    employerCount += 1;

    Business storage business = employers[_employerAddress];
    business.businessId = employerCount;
    business.employerAddress = payable(msg.sender);
    business.businessName = businessName;
    business.stateId = stateId;
    
    business.taxRate = 1; //this will be calculated based on employer contributions and claim payouts
    
    registered[_employerAddress] = true; 

    emit RegisterNewBusiness(_employerAddress, employerCount, businessName, stateId);
    return true; 
  }
    //EMPLOYER RECORDS EMPLOYEE TERMINATION
  function addTerminatedEmployee(address payable employeeAddress, string memory employeeName, string memory weeklyPayAmount, string memory terminationDate, uint selection) public returns (bool){
    address _employerAddress = msg.sender;
    terminationCount += 1;
    Business storage business = employers[_employerAddress];

    Employee storage employee = employees[employeeAddress];
    employee.employeeId = terminationCount;
    employee.name = employeeName;
    employee.employeeAddress = employeeAddress;
    employee.weeklyPayAmount = weeklyPayAmount;
    employee.terminationDate = terminationDate;
    employee.reason = Reason(selection);

    business.terminated_employees.push(employeeAddress);
    term_eligibility[_employerAddress][employeeAddress] = true;

    emit RecordTerminatedEmployee(_employerAddress, employeeAddress, terminationCount, employee.reason);
    return true; 
  }
    //EMPLOYER DEPOSITS TAX FUNDS TO SC
  function deposit() public payable returns (uint256) {
    require(registered[msg.sender]);
    require(msg.value > 0, "The deposit amount needs to be greater than 0 in order for the amount to be deposited.");
    
    Business storage business = employers[msg.sender];
    business.reserveBalance += msg.value;

    balances[msg.sender] += msg.value;

    emit LogDepositMade(msg.sender, msg.value, balances[msg.sender]);

    return balances[msg.sender];
  }
    //CLAIMANT REGISTERS WITH SC AND FILES CLAIM IF ELIGIBLE
  function registerNewClaimant(string memory name, string memory weeklyAmount, string memory businessName, address businessAddress) public isEligible(businessAddress) returns(bool) {
    claimantCount += 1;
    address _claimantAddress = msg.sender;

    Claimant storage claimant = claimants[_claimantAddress];
    claimant.claimantId = claimantCount;
    claimant.claimantAddress = payable(_claimantAddress);
    claimant.name = name;
    claimant.weeklyPayAmount = weeklyAmount;
    claimant.businessName = businessName;
    claimant.businessAddress = businessAddress;

    emit RegisterNewClaimant(claimant.claimantAddress, claimantCount);
    return true; 
  }
    //CLAIMANT REQUESTS PAYMENT FROM EMPLOYER'S SC BALANCE
  function payClaim(address employerAddress, uint256 paymentAmount) public {
    uint256 employerBalanceBefore = balances[employerAddress];
    uint256 claimantBalanceBefore = balances[msg.sender];
    
    Business storage business = employers[employerAddress];
    business.reserveBalance -= paymentAmount;

    balances[employerAddress] -= paymentAmount;
    balances[msg.sender] += paymentAmount;

     uint256 employerBalanceAfter = balances[employerAddress];
     uint256 claimantBalanceAfter = balances[msg.sender];
    
    emit Transfer(msg.sender, employerAddress, employerBalanceBefore, claimantBalanceBefore, paymentAmount, employerBalanceAfter, claimantBalanceAfter);
    //return balances[employerAddress];
  }
  // function payClaim(address employerAddress, uint256 paymentAmount) public returns (bool){
  //   uint256 employerBalanceBefore = balances[employerAddress];
  //   uint256 claimantBalanceBefore = balances[msg.sender];
    
  //   Business storage business = employers[employerAddress];
  //   business.reserveBalance -= paymentAmount;
  //   balances[employerAddress] -= paymentAmount;
  //   balances[msg.sender] += paymentAmount;

  //   uint256 employerBalanceAfter = balances[employerAddress];
  //   uint256 claimantBalanceAfter = balances[msg.sender];
    
  //   emit Transfer(msg.sender, employerAddress, employerBalanceBefore, claimantBalanceBefore, paymentAmount, employerBalanceAfter, claimantBalanceAfter);
  //   return true;
  // }
    //CLAIMANT REQUESTS WITHDRAW FROM SC
  function withdraw(address _to, uint256 withdrawAmt) public { 
    uint256 accountWalletBalanceBefore = msg.sender.balance; 
    uint256 accountStateBalanceBefore = balances[msg.sender];

    balances[_to] -= withdrawAmt;
    
    (bool sent, ) = payable(_to).call{value: withdrawAmt}("");
    require(sent, "Withdraw Failed");
    // paymentCount += 1;
    // Payment memory payment;
    // payment.paymentId = paymentCount;
    // payment.paymentAmount = paymentAmount;
    // payment.employerAddress = employer_address;
    // payment.timestamp = block.timestamp;
    // paymentsToClaimant[claimantAddress][paymentCount] = payment;

    // claimant.payments.push(payment);
    uint256 accountWalletBalanceAfter = msg.sender.balance; 
    uint256 accountStateBalanceAfter = balances[msg.sender];

    emit Withdraw(msg.sender, accountWalletBalanceBefore, accountStateBalanceBefore, withdrawAmt, accountWalletBalanceAfter, accountStateBalanceAfter);

  }

  function setRegistered() public {
    registered[msg.sender] = true; 
  }

  function setClaimantInList(address claimantAddress) public {
    term_eligibility[msg.sender][claimantAddress] = true; 
  }

  function setBalance(uint256 amount) public {
    balances[msg.sender] = amount; 
  }

  function setReserveBalance(address employerAddress, uint256 amount) public {
    Business storage business = employers[employerAddress];
    business.reserveBalance = amount; 
  }
  //GETTER/READ FUNCTIONS
  function checkEligibility(address claimantAddress) view public returns(bool) {
    Claimant memory claimant = claimants[claimantAddress];
    address employerPrevEmployer = claimant.businessAddress;

    return isClaimantInList(employerPrevEmployer, claimantAddress);
  }

  function getContractBalance() public view returns (uint) {
    return address(this).balance;
  }
  function getEmployer(address employerAddress) view public returns (uint256, address, string memory, string memory, uint256, uint256, address[] memory) {
    Business storage business = employers[employerAddress];
    return (business.businessId, business.employerAddress, business.businessName, business.stateId, business.reserveBalance, business.taxRate, business.terminated_employees);
  }
  
  function getStateBalance() public view returns (uint256){
    return balances[msg.sender];
  }

  function getUserBalance() public view returns (uint256){
    return msg.sender.balance;
  }

  function getTerminatedEmployee(address _address) view public returns(uint256 , string memory, address, string memory, string memory, Reason) {
    Employee storage employee = employees[_address];
    return (employee.employeeId, employee.name, employee.employeeAddress, employee.weeklyPayAmount, employee.terminationDate, employee.reason);
  }

  function getEmployerTerminations(address employerAddress) view public returns(address[] memory) {
      Business storage business = employers[employerAddress];
    return business.terminated_employees;
  }

  function isClaimantInList(address employerAddress, address claimantAddress) view public returns (bool) {
      return term_eligibility[employerAddress][claimantAddress];
  }

  function getClaimant(address claimantAddress) view public returns (uint256, address, string memory, string memory, address) {
    Claimant storage claimant = claimants[claimantAddress];
    return (claimant.claimantId, claimant.claimantAddress, claimant.name, claimant.weeklyPayAmount, claimant.businessAddress);
  }

  function getRegistered() view public returns (bool) {
    return registered[msg.sender];
  }
}
