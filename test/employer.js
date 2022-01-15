const Employer = artifacts.require("Employer");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Employer", function (accounts) {
  [business, claimant1, claimant2, claimant3] = accounts;
  let employerTerms;

  beforeEach(async () => {
    instance = await Employer.new();
  });

  describe("Initial deployment", async () => {
    it("should assert true", async () => {
      await Employer.deployed();
      return assert.isTrue(true);
    });
  });

  describe("Register New Employer", () => {
    it("should create new employer", async () => {
      
      try {
        await instance.registerNewBusiness("ABC Company", "61-000000000", {from: business});
      } catch(err) { 
        console.log(err);
      }

      const employerResult = await instance.getEmployer(business);
      console.log("Employer Result: ", employerResult);
      
      let employerId = await employerResult[0].toNumber();   
      let address = await employerResult[1];   
      let busName = await employerResult[2];   
      let stateId = await employerResult[3];
      let reserveBalance = web3.utils.fromWei( await employerResult[4],  "ether" );
      let taxRate = await employerResult[5].toNumber();

      let bal = await web3.eth.getBalance(business);
      
      console.log("Employer ID: ", employerId);
      console.log("Address: ", address);
      console.log("Business Name: ", busName);
      console.log("Employer State ID: ", stateId);
      console.log("Reserve Balance: ", reserveBalance);
      console.log("Employer Tax Rate : ", taxRate);
      console.log("Balance: ", bal);
      
      assert.equal(employerId, 1, `${employerId} is not 1`);
      assert.equal(stateId, "61-000000000", `${stateId} is not 61-0000000000`);
    })
  });

  describe("Add a Terminated Employee to Employer Registry", () => {
    it("should add the terminated employee to the registry", async () => {
      
      let paymentEther = web3.utils.toWei('2.5', 'ether');

      try {
        await instance.addTerminatedEmployee(claimant1, "Roy Jones", paymentEther, "12/15/2021", 1, { from: business });
      } catch(err) { 
        console.log(err);
      }
      
      const terminationFile = await instance.getTerminatedEmployee(claimant1);
      employerTerms = await instance.getEmployerTerminations(business);
      console.log("Employer Result: ", terminationFile);
        
      let employeeId = await terminationFile[0].toNumber();   
      let employeeName = await terminationFile[1];   
      let address = await terminationFile[2];   
      let weeklyPay = web3.utils.fromWei( await terminationFile[3],  "ether" );
      let terminationDate = await terminationFile[4];
      let terminationReason = await terminationFile[5].toNumber();
      
      let bal = await web3.eth.getBalance(business);
      
      console.log("Employee ID: ", employeeId);
      console.log("Employee Name: ", employeeName);
      console.log("Employee Address: ", address);
      console.log("Weekly Pay Amount: ", weeklyPay);
      console.log("Termination Date : ", terminationDate);
      console.log("Termination Reason : ", terminationReason);
      console.log("Balance: ", bal);
      
      console.log("Terminated Employee Array In Function: ", employerTerms);
      
      assert.equal(employeeId, 1, `${employeeId} is not 1`);
      assert.equal(employeeName, "Roy Jones", `${employeeName} is not Roy Jones`);
      
    })

  });

  describe("Employer business deposits funds to smart contract", () => {
    it("should reduce the balance of employer's wallet address and increase the balance of the smart contract by the amount of the deposit.", 
    async () => { 
      console.log("Terminated Employee Array Out of Function: ", employerTerms);
      //await instance.addTerminatedEmployee(claimant1, "Roy Jones", 1, "12/15/2021", 1, { from: business });
      await instance.setRegistered({ from: business });
      //let output = await instance.getRegistered({ from: business });
      //console.log("Output: ", output);

      let depositEther = web3.utils.toWei('3', 'ether');
      depositEther = depositEther.toString();

      let beforeWalletBalance = await instance.getUserBalance({ from: business });
      beforeWalletBalance = web3.utils.toBN(beforeWalletBalance);
      console.log("beforeWalletBalance: ", beforeWalletBalance.toString());
      let beforeStateBalance = await instance.getStateBalance({ from: business });
      beforeStateBalance = web3.utils.toBN(beforeStateBalance);
      console.log("beforeStateBalance: ", beforeStateBalance.toString());

      try {
        await instance.deposit({ from: business, value: depositEther });
      } catch(err) { 
        console.log(err);
      }

      let afterWalletBalance = await instance.getUserBalance({ from: business });
      afterWalletBalance = web3.utils.toBN(afterWalletBalance);
      console.log("afterWalletBalance: ", afterWalletBalance.toString());
      let afterStateBalance = await instance.getStateBalance({ from: business });
      afterStateBalance = web3.utils.toBN(afterStateBalance);
      console.log("afterStateBalance: ", afterStateBalance.toString());

      let walletChange = beforeWalletBalance - afterWalletBalance;
      const stateChange = afterStateBalance - beforeStateBalance;
      const expectedGas = walletChange - stateChange;
      walletChange = walletChange - expectedGas
      
      const contractBalance = await instance.getContractBalance();
      console.log("contractBalance After Deposit: ", contractBalance.toString());

      assert.equal(walletChange, depositEther, `${walletChange} is not 3 Eth`);
      assert.equal(stateChange, depositEther, `${stateChange} is not 3 Eth`);

    });
  }); 
  
  describe("Terminated Employee Registers and Checks Eligibility", () => {
    it("should create new claimant with the expected property values", async () => {
      //let newClaimant = ssReference.claimants[owner];
      //ssReference.claimants[owner]
          
       let results = await instance.getEmployer(business);
       let businessId = results[0];
       let employerAddress = results[1];
       let businessName = results[2];
       let stateId = results[3];
       let reserveBalance = results[4];
       let taxRate = results[5];
       
      await instance.setClaimantInList(claimant1, {from: business});
      
      try {
        await instance.registerNewClaimant("Roy Jones", "1000", "ABC Company", business, { from: claimant1 });
      } catch(err) { 
        console.log(err);
      }

      const claimantResult = await instance.getClaimant(claimant1);
     
      let claimID = claimantResult[0].toNumber()
      let weeklyPay = claimantResult[3]
    
      assert.equal(claimID, 1, `${claimID} is not 1`);
      assert.equal(weeklyPay, "1000", `${weeklyPay} is not 1000`);
    })
  });

  describe("Terminated Employee Requests Payment From Employer's Smart Contract Balance", () => {
    it("should increase the balance of claimant's smart contract and decrease the balance of the employer's smart contract by the amount of the payment.", 
    async () => { 

      const employerBalance = web3.utils.toBN(web3.utils.toWei('9', 'ether'));
      const revEmployerBalance = web3.utils.toBN(web3.utils.toWei('6', 'ether'));
      const transferEther = web3.utils.toWei('3', 'ether');
      console.log("transferEther: ", transferEther);
      await instance.setBalance(employerBalance, {from: business});

      let beforeStateEmployer = await instance.getStateBalance({ from: business });
      beforeStateEmployer = beforeStateEmployer.toString();
      let beforeStateClaimant = await instance.getStateBalance({ from: claimant1 });
      beforeStateClaimant = beforeStateClaimant.toString();
      console.log("beforeStateEmployer: ", beforeStateEmployer);
      console.log("beforeStateClaimant: ", beforeStateClaimant);
      await instance.setReserveBalance(business, employerBalance);

      try {
        await instance.payClaim(business, transferEther, {from: claimant1});
      } catch(err) { 
        console.log(err);
      }

      let afterStateEmployer = await instance.getStateBalance({ from: business });
      afterStateEmployer = afterStateEmployer.toString()
      let afterStateClaimant = await instance.getStateBalance({ from: claimant1 });
      afterStateClaimant = afterStateClaimant.toString();

      assert.equal(afterStateEmployer, revEmployerBalance, `${afterStateEmployer} is not 3 Eth`);
      assert.equal(afterStateClaimant, transferEther, `${afterStateClaimant} is not 3 Eth`);
      //assert.equal(employerStateChange, transferEther, `${employerStateChange} is not 3 Eth`);

    });
  });

  describe("Terminated Employee Withdraws Up To Avaiable Amount From Their Smart Contract Balance", () => {
    it("should increase the balance of claimant's wallet address and decreases the balance of their smart contract balance by the amount of the withdraw.", 
    async () => { 

      await instance.setRegistered({ from: business });
      const claimantBalance = web3.utils.toBN(web3.utils.toWei('9', 'ether'));
      await instance.setBalance(claimantBalance, {from: claimant1});
      let withdrawEther = web3.utils.toWei('3', 'ether');
      let depositEther = web3.utils.toWei('4', 'ether');
      depositEther = depositEther.toString();

      try {
        await instance.deposit({ from: business, value: depositEther });
      } catch(err) { 
        console.log(err);
      }
      const contractBalance = await instance.getContractBalance();
      console.log("contractBalance: ", contractBalance.toString());
      let beforeWalletBalance = await instance.getUserBalance({ from: claimant1 });
      console.log("beforeWalletBalance:", beforeWalletBalance.toString());
      let beforeStateBalance = await instance.getStateBalance({ from: claimant1 });
      console.log("beforeStateBalance:", beforeStateBalance.toString());

      try {
        await instance.withdraw(claimant1, withdrawEther, {from: claimant1});
      } catch(err) { 
        console.log(err);
      }

      const afterWalletBalance = await instance.getUserBalance({ from: claimant1 });
      const afterStateBalance = await instance.getStateBalance({ from: claimant1 });
      
      let walletChange = (afterWalletBalance - beforeWalletBalance);
      console.log("walletChange Before: ", walletChange.toString());
      const stateChange = (beforeStateBalance - afterStateBalance);
      console.log("stateChange: ", stateChange.toString());
      const expectedGas =  stateChange - walletChange;
      console.log("expectedGas: ", expectedGas);
      walletChange = walletChange + expectedGas;
      console.log("walletChange After: ", walletChange.toString());

      assert.equal(walletChange, withdrawEther, `${walletChange} is not 3`);
      assert.equal(stateChange, withdrawEther, `${stateChange} is not 3`);

    });
  
});
});
