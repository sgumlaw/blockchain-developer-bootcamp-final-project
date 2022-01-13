const Employer = artifacts.require("Employer");

module.exports = function(deployer) {
  deployer.deploy(Employer);
}