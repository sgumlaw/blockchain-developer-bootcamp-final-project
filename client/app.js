//HTML Elements 
//EMPLOYERS
	//EMPLOYER REGISTRATION
const mmEnable= document.getElementById('mm-connect');
const mmAccount = document.getElementById('mm-account');
const mmBalance = document.getElementById('mm-balance');
const busName = document.getElementById('business-name');
const busAddress = document.getElementById('business-address');
const busWallet = document.getElementById('business-wallet');
const busStateId = document.getElementById('state-id');
const busRegisterBtn = document.getElementById('sc-employer-button');
	//EMPLOYER RECORDS EMPLOYEE TERMINATION
const employeeName = document.getElementById('employee-name');
const employeeAddress = document.getElementById('employee-address');
const employeeWallet = document.getElementById('employee-wallet');
const employeeWage = document.getElementById('employee-wage');
const termDate = document.getElementById('termination-date');
const displayDate = document.getElementById('display-term-date');
const termReason = document.getElementById('termination-reason');
const terminationBtn = document.getElementById('sc-termination-button');
	//EMPLOYER DEPOSITS TAX PAYMENT TO SMART CONTRACT
const depositAmount = document.getElementById('deposit-amount');
const depositBtn = document.getElementById('sc-deposit-button');
//CLAIMANTS
	//CLAIMANT REGISTRATION
const claimantName = document.getElementById('claimant-name');
const claimantEmployer = document.getElementById('claimant-employer');
const employerWallet = document.getElementById('employer-wallet');
const claimantWage = document.getElementById('claimant-wage');
const eligibilityBtn = document.getElementById('sc-eligibility-button');
	//CLAIMANT REQUESTS PERIODIC PAYMENT
const payeeName = document.getElementById('payee-name');
const payeeEmployer = document.getElementById('payee-employer');
const payorWallet = document.getElementById('payor-wallet');
const weeklyWage = document.getElementById('weekly-wage');
const paymentButton = document.getElementById('sc-payment-button');
	//CLAIMANT WITHDRAWS FROM SC BALANCE
const withdrawName = document.getElementById('withdraw-name');
const withdrawWallet = document.getElementById('withdraw-wallet');
const withdrawValue = document.getElementById('withdraw-amount');
const withdrawButton = document.getElementById('sc-withdraw-button');

//Import Smart Contract Address and ABI from Etherscan
const employerSmartContractAddress = '0x4885FE8fF7cc386cC4F1d219229C9e700bBA2bb7';
const employerSmartContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "employerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "depositAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "employerReserveBalance",
				"type": "uint256"
			}
		],
		"name": "LogDepositMade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "Sender2Contract",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ReceivedAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "Message",
				"type": "string"
			}
		],
		"name": "Received",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "employerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "terminatedEmployeeAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "terminationCount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum Employer.Reason",
				"name": "reason",
				"type": "uint8"
			}
		],
		"name": "RecordTerminatedEmployee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "employerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "employerCount",
				"type": "uint256"
			}
		],
		"name": "RegisterNewBusiness",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "claimantAddresses",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "claimantCount",
				"type": "uint256"
			}
		],
		"name": "RegisterNewClaimant",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "EmployerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "ClaimantAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "EmployerBalanceBefore",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ClaimantBalanceBefore",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ClaimPaymentAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "EmployerBalanceAfter",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ClaimantBalanceAfter",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "PayableAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "SenderAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "AccountWalletBalanceBefore",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "AccountStateBalanceBefore",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "WithdrawAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "AccountWalletBalanceAfter",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "AccountStateBalanceAfter",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "employeeAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "employeeName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "weeklyPayAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "terminationDate",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "selection",
				"type": "uint256"
			}
		],
		"name": "addTerminatedEmployee",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "claimantAddress",
				"type": "address"
			}
		],
		"name": "checkEligibility",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "claimants",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "claimantId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "claimantAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "weeklyPayAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "businessName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "businessAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "employees",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "employeeId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "employeeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "weeklyPayAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "terminationDate",
				"type": "string"
			},
			{
				"internalType": "enum Employer.Reason",
				"name": "reason",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "employer_terminations",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "employers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "businessId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "businessName",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "employerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "reserveBalance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "taxRate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "stateId",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "claimantAddress",
				"type": "address"
			}
		],
		"name": "getClaimant",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employerAddress",
				"type": "address"
			}
		],
		"name": "getEmployer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employerAddress",
				"type": "address"
			}
		],
		"name": "getEmployerTerminations",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStateBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getTerminatedEmployee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "enum Employer.Reason",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employerAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "claimantAddress",
				"type": "address"
			}
		],
		"name": "isClaimantInList",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "paymentAmount",
				"type": "uint256"
			}
		],
		"name": "payClaim",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "paymentsToClaimant",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "paymentId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "paymentAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "employerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "businessName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "stateId",
				"type": "string"
			}
		],
		"name": "registerNewBusiness",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "weeklyAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "businessName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "businessAddress",
				"type": "address"
			}
		],
		"name": "registerNewClaimant",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "registered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "term_eligibility",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

// 1. Detect MetaMask
window.addEventListener('load',
	function() {
		busName.value = '';
		busStateId.value = '';
		busAddress.value = '';
		busWallet.value = '';
		employeeName.value = '';
		employeeAddress.value = '';
		employeeWallet.value = '';
		employeeWage.value = '';
		displayDate.value = '';
		termReason.value = 1;
		claimantName.value = '';
		claimantEmployer.value = '';
		employerWallet.value = ''; 
		claimantWage.value = '';
		payeeName.value = '';
		payeeEmployer.value = '';
		payorWallet.value = '';
		weeklyWage.value = '';
		withdrawName.value = '';
		withdrawWallet.value = '';
		withdrawValue.value = '';

		if (typeof window.ethereum !== 'undefined') {
			console.log('MetaMask Detected!');
			let mmDetected = document.getElementById('mm-detected');
			mmDetected.innerHTML = "MetaMask has been detected!"
		}
		else {
			this.alert("There is no Wallet detected!");
			console.log('MetaMask NOT Detected!');
		}
});

window.addEventListener("load", () => {
	picker.attach({
	  target: "display-term-date",
	  container: "termination-date"
	});
  });

mmEnable.onclick = async () => {
    await ethereum.request({
        method: 'eth_requestAccounts'
    });
    let web3 = new Web3(window.ethereum);
	
	const address = ethereum.selectedAddress;

	let amount = await web3.eth.getBalance(address);
	amount = await web3.utils.fromWei(amount, "ether");
	console.log(amount);
	const firstFive = address.slice(0,5);
	console.log(firstFive);
	const lastFive = address.slice(-6, -1);
	console.log(lastFive);
	const shortenAddress = firstFive + "....." + lastFive;
    mmAccount.innerHTML = "Your Wallet Address: " + shortenAddress;
	mmBalance.innerHTML = amount;
}

//instantiate a new Web3 object and wrap your MetaMask Wallet which is represented by window.ethereum
let web3 = new Web3(window.ethereum);
let employerAcct = '';

//use our web3 object to create an instance of our smart contract so that we can call its functions
const employerProcess = new web3.eth.Contract(employerSmartContractABI, employerSmartContractAddress);

busRegisterBtn.onclick = async() => {
	const bizName = busName.value; 
	const stateID = busStateId.value;
	const walletAdd = ethereum.selectedAddress;

	await employerProcess.methods
		.registerNewBusiness(bizName, stateID)
		.send({ from: ethereum.selectedAddress, }); 
}

terminationBtn.onclick = async() => {
	const terminationWallet = employeeWallet.value; 
	const terminationName = employeeName.value;
	const terminationWage = employeeWage.value;
	const terminationDate = displayDate.value;
	const terminationReason = termReason.value;
	
	await employerProcess.methods
		.addTerminatedEmployee(terminationWallet, terminationName, terminationWage, terminationDate, terminationReason)
		.send({from: ethereum.selectedAddress}); 
}

depositBtn.onclick = async() => {
	await employerProcess.methods
		.deposit()
		.send({
			from: ethereum.selectedAddress,
			to: employerSmartContractAddress,
			value: depositAmount.value
		})
	let amount = await web3.eth.getBalance(address);
	amount = await web3.utils.fromWei(amount, "ether");
	mmBalance.innerHTML = amount;
}

eligibilityBtn.onclick = async() => {
	const claimName = claimantName.value; 
	const claimWage = claimantWage.value; 
	const employerName = claimantEmployer.value;
	employerAcct = employerWallet.value;
	let amountInEth = await web3.utils.fromWei(amount, "ether");
	payeeName.innerText = claimName;
	payeeEmployer.innerHTML = employerName;
	payorWallet.innerHTML = employerAcct;
	weeklyWage.innerHTML = amountInEth;
	withdrawName.innerHTML = claimName;
	withdrawWallet.innerHTML = ethereum.selectedAddress;

	await employerProcess.methods
		.registerNewClaimant(claimName, claimWage, employerName, employerAcct)
		.send({ from: ethereum.selectedAddress, }); 
}

paymentButton.onclick = async() => {
	await employerProcess.methods
		.payClaim(employerAcct, claimantWage.value)
		.send({ from: ethereum.selectedAddress, });
}

withdrawButton.onclick = async() => {
	
	await employerProcess.methods
		.withdraw(ethereum.selectedAddress, withdrawValue.value)
		.send({ from: ethereum.selectedAddress, });
	
	let amount = await web3.eth.getBalance(address);
	amount = await web3.utils.fromWei(amount, "ether");
	mmBalance.innerHTML = amount;
}

function openInput(select_event, buttonSelect) {
	var i, x, t, e, c, l;
	x = document.getElementsByClassName("inputDisplay");
	t = document.getElementById("processImage");
	e = document.getElementById("employer-page");
	c = document.getElementById("claimant-page");
	l = document.getElementById("lps-page");
	mmEnable.style.display = "none";

	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}                                                                                                                    

	if (buttonSelect == "Employers") {
		t.src = "./client/images/EmployersProcess.png";
		
		console.log("Employer Button: ", e)
		e.style.backgroundColor = "rgb(87, 134, 221)"
		e.style.color = "white"
		c.style.backgroundColor = "#37DD60"
		c.style.color = "rgb(3, 3, 3)"
		l.style.backgroundColor = "#37DD60"
		l.style.color = "rgb(3, 3, 3)"
	}
	else if (buttonSelect == "Claimants") {
		t.src = "./client/images/claimsProcess.png";
		e.style.backgroundColor = "#37DD60"
		e.style.color = "rgb(3, 3, 3)"
		c.style.backgroundColor = "rgb(87, 134, 221)"
		c.style.color = "white"
		l.style.backgroundColor = "#37DD60"
		l.style.color = "rgb(3, 3, 3)"
	}
	else {
		t.src = "./client/images/LiquidityProcess.png";
		e.style.backgroundColor = "#37DD60"
		e.style.color = "rgb(3, 3, 3)"
		c.style.backgroundColor = "#37DD60"
		c.style.color = "rgb(3, 3, 3)"
		l.style.backgroundColor = "rgb(87, 134, 221)"
		l.style.color = "white"
	}

	document.getElementById(buttonSelect).style.display = "grid";
	//document.getElementById('tab-' + buttonSelect).style.display = "flex";
	//document.getElementById('input-' + buttonSelect).style.display = "flex";
	//console.log("Image Event: ", t);
	//select_event.currentTarget.className += " w3-red";

}

function openTab(select_event, tabName) {
	var i, x;
	x = document.getElementsByClassName("tabDisplay");

	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}

	document.getElementById(tabName).style.display = "flex";
}

window.onscroll = function() {scrollingEffect()};
var header = document.getElementById("unemployment-header");
var sticky = header.offsetTop;

function scrollingEffect() {
	if (window.pageYOffset > sticky) {
	  header.classList.add("sticky");
	} else {
	  header.classList.remove("sticky");
	}
  } 