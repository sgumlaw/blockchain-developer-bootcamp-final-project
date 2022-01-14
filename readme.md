# Final Project - Unemployment Insurance Claims Filings and Payments Application
## A Simple Solution to a Multi-Billion dollar problem. 

### Deployed Front-End URL: 
https://serene-ritchie-67cf45.netlify.app/

### Steps to run this project locally:
- `truffle test`
- Send ETH to local wallet
- `cd client && npm start`
- Open local ui from `http://localhost:3000`
- Make sure your Metamask localhost network is in port `7545`

### Screencast link


### Public Ethereum wallet for certification:

### Project Description

**Objective**
    To provide a win/win/win unemployment filing and payment solution for eligible, terminated employees, employers and government. 
    For employers: to reduce the volume of fraudulant unemployment claims and provide real-time transparency into their unemployment accounts.  
    For eligible claimants: to reduce the time for claimants to receive their unemployment benefits. 
    For government: to reduce government expenditures on subsidizing fictitious claims and inefficient processes. 
    
**Problem**
    According to statistics from the Department of Labor Semiannual Report to Congress, in 2020, unemployment claims payments were estimated at $872 billion with north of $87 billion being improper, the majority of which due to fraud. While this problem was exasaperated by the pandemic, the problem revealed the risk of employing inefficient procedures and technology. In addition to the improper payments, employer businesses lack the transparency into their reserve accounts and to the magnitude of their tax premium increases. And as many businesses were shuttered during the pandemic, the government was left on the hook for negative reserve balances of these closed businesses. And would no longer be able to attribute the tax increases to the responsible party. 

**Solution** 
    To harness blockchain technology to streamline the process for eligible terminated employees to file and receive unemployment payments. 
    The blockchain provides an immutable environment that enables the recording of a few critical events that dictate the eligibility, calculation and payment of claims.

#### Directory structure
- `client`: Project's HTML/CSS/JS Frontend
- `contracts`: Smart Contract Code
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: JS Tests for smart contracts
- `root`: index.html

#### Smart Contract Structure: 
**Three Contracts**
1. Employer
2. Claimant - to be implemented later
3. Liquidity Provider - to be implemented later
   
**Employer Functions:**
 1. Register a new Employer
     a. Employer name
     b. Employer id
     c. Employer wallet address
     d. Employer reserve balance
     e. Employer tax rate
     f. Employer state id
     g. Employee [] employers
 2. Get an existing Employer -> what is the most effective way to store 
     a. mapping address => Employer employers
 3. Update an existing Employer
 4. Add a Terminated Employee
     a. Employee name
     b. Employee wallet address
     c. Employee termination date
     d. Employee termination reason
     e. Employee weekly pay amount
     f. Employee [] employers
 5. Get list of Terminated Employees by Employer
     a. provide employee wallet address as input to retrieve individual claimant
**Claimant Functions:** 
 1. Register a new Claimant and and Initiate Claim Subject to Eligibility
     *Objective: Verify that claimant address is in employer's termination array and meet eligibility conditions;
     a. Claimant name
     b. Claimant id
     c. Claimant wallet address
     d. Claimant balance
 2. Get an existing Claimant
 3. Update an existing Claimant
 4. Pay a Claim
     *Objective: Move funds from employer's smart contract balance to claimant's smart contract balance;
     a. Claimant employer name 
     b. Claimant employer wallet address
     c. Claimant hire date
     d. Claimant termination date
     e. Claimant termination reason
     f. Claimant weekly pay amount
     g. Compare Claimant address to Employer's terminated employee array
     h. Push Claimant wallet address to Employer array
 5. Withdraw Funds
     *Objective: Enable claimants to withdraw funds from their smart contract balance;
 6. Get list of Claims by Claimant 
     a. mapping Claims to claimants []
 7. Check Eligibility or set up as modifier
     a. Import Employer.sol
     b. Check employer_terminations array to verify whether employee address is present. 
 8. Request Weekly Pay
     a. Payment struct
         i. Payment number
         ii. Payment amount
         iii. Payment date
         iv. Employer wallet address
     b. Push payment to array
 9.  Get list of Weekly Pay
     a. mapping Payment to claimants []


**User Interface**
1. Set up two buttons to decide which contract to interact with
    a. Employer
    b. Claimant
2. Set up Employer page 
    a. Register as a new empployer
    b. Add terminated employee
3. Set up Claimant page
    a. Check Eligibility and Register as new claimant 
        -add modifier to evaluate if msg.sender is in employer term-list 
    b. File a claim
    c. Request weekly payment

### TODOS
 1.  Add more checks and balances on functions
 2.  Set up Liquidity Provider Smart Contract
 3.  Develop Query tabs for employer/claimant transparency
 4.  Incorporate imported security features including role based access
 5.  