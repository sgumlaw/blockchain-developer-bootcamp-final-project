# Final Project - Unemployment Insurance Claims Filings and Payments Application
## A Simple Solution to a Multi-Billion dollar problem. 

### Deployed Front-End URL: 
https://serene-ritchie-67cf45.netlify.app/

### Steps to test project using truffle:
- Clone code into local directory
- Run `npm install` to install dependencies
- Run `ganache-cli` to spin up local blockchain
  - Make sure your Metamask localhost network is in port `8545`
- Run `truffle test` to execute 7 tests in the test directory
  
### Steps to test project manually using public (Ropsten) testnet:
- Requirements: two Ropsten wallet accounts
  - First account = employer
  - Second account = claimant
- Open user interface with live server
- Connect to employer wallet (account#1)
- Select `Employer` tab to
  - Register
  - Record employee termination
  - Deposit funds 
- Refresh web page to connect with different account
- Connect to claimant wallet (account#2)
  - Register and check eligibility
  - Request payment
  - Withdraw funds

### Screencast link
https://www.loom.com/share/30cf632b18a548a4aa02aa9833dc5046

### Public Ethereum wallet for certification:
`0x5e045BfA23213808b488207597f40FAb50190D13`
### Project Description

#### Objective
- To provide a win/win/win unemployment filing and payment solution for eligible, terminated employees, employers and government. 
- For employers: to reduce the volume of fraudulant unemployment claims and provide real-time transparency into their unemployment accounts.  
- For eligible claimants: to reduce the time for claimants to receive their unemployment benefits. 
For government: to reduce government waste and expenditures on subsidizing fictitious claims and inefficient processes. 
- For liquidity providers: to provide investment opportunities 
    
#### Problem
According to statistics from the Department of Labor Semiannual Report to Congress, in 2020, unemployment claims payments were estimated at $872 billion with north of $87 billion being improper, the majority of which due to fraud. While this problem was exasaperated by the pandemic, the problem revealed the risk of employing inefficient procedures and technology. In addition to the improper payments, employer businesses lack the transparency into their reserve accounts and to the magnitude of their tax premium increases. And as many businesses were shuttered during the pandemic, the government was left on the hook for negative reserve balances of these closed businesses. And would no longer be able to attribute the tax increases to the responsible party. 

#### Solution
To harness blockchain technology to streamline the process for eligible terminated employees to file and receive unemployment payments. The blockchain provides an immutable environment that enables the recording of a few critical events that dictate the eligibility, calculation and payment of claims. By utilizing this environment, employers and claimants can transact directly in a trustless manner. Employers can eliminate fraud, while gaining transparency into their reserves balances and activity. Claimants can receive their unemployment benefits faster in their period of need. State governments and federal government can reduce losses and expenditures, increase cash flows and provide a more competitive environment for the businesses in their jurisdictions. Eventually, liquidity providers can access investment opportunities to provide liquidity pools for employers to tap when their reserves go negative.

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
2. Update an existing Employer - to be implemented later
3. Add a Terminated Employee
a. Employee name
b. Employee wallet address
c. Employee termination date
d. Employee termination reason
e. Employee weekly pay amount
4. Deposit funds from wallet address to smart contract address

**Claimant Functions:** 
1. Register as new Claimant - verify that claimant address is in employer's termination array and meets the eligibility requirements;
a. Claimant name
b. Claimant id
c. Claimant wallet address
d. Claimant balance
2. Update an existing Claimant - to be implemented later
3. File Claim/Request Payment - Move funds from employer's smart contract balance to claimant's smart contract balance
a. Claimant employer name 
b. Claimant employer wallet address
c. Claimant hire date
d. Claimant termination date
e. Claimant termination reason
f. Claimant weekly pay amount
g. Compare Claimant address to Employer's terminated employee array
h. Push Claimant wallet address to Employer array
4. Withdraw Funds - enable claimants to withdraw funds from their smart contract balance;

**User Interface**
1. MetaMask Connection
2. Employer Tab 
3. Claimant Tab
4. Liquidity Provider Tab - to be implemented later

### TODOS
 1.  Add more checks and balances on functions
 2.  Refactor current contract into two contracts for employer and claimant
 3.  Develop Query/Read tabs for employer/claimant transparency
 4.  Set up Liquidity Provider Smart Contract and build out functionality
 5.  Incorporate imported security features including role based access and pausable from open zepplin
 6.  