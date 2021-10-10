const OurTodoApp = artifacts.require("OurTodoApp");

module.exports = function (deployer) {
  deployer.deploy(OurTodoApp);
};
