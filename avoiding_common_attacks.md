# Smart Contract Attack Considerations

## SWC-103 (Floating pragma)
- Specific compiler pragma `0.8.0` or above to protect against potential bugs that could be introduced through earlier versions. 

## Modifiers
- `isEligible` modifier is used to verify that the claimant is eligible to receive claim payments from their previous employer's account. When the employer records a termination, the terminated employee's address is stored in a mapping. This functionality will be enhanced to only include terminated employees who meet certain requirements - such as termination reason, employment dates, etc. 

## Checks-Effects-Interactions
- `deposit` and `withdraw` functions change the state inside the contract and outside wallet balances. To protect against known attack strategies, the state balances are modified prior to the external calls.

## Use of Require keyword
- `registerNewBusiness` function requires that a given business only registers once
- `deposit` function requires the business to be registered prior to accepting deposit into the smart contract
- `deposit` function requires the deposit to be greater than zero
- `withdraw` function requires the external call to be successful or the entire transaction reverts