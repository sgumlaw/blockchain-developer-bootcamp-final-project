# Design Patterns Considerations
## Inter-Contract Execution

The application functionality will be divided into three contracts to represent the three distinct users of the application. 
- `Employer` 
- `Claimant` 
- `Liquidity Provider` 

## Access Control Design Patterns

- `private` certain state variables are coded as private to protect against unwanted changes to variables whose value is solely determined inside of the contract. 
- `Ownable` design pattern will be implemented once the functionality is divided into the three smart contracts described above. 
- `Roles Based` design patterns will be implemented to restrict access based on business needs. Access controls will be implemented off chain to identify users as employers, claimants or liquidity providers. Once the end user is identified, their access will be restricted to the appropriate smart contract functionality. 
- `Pausable` design pattern will be implemented to enable administrator to pause application functionality 