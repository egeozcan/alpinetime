var request = require("superagent"); 
var stateTree = require("../stateTree.js");
var customerStore = stateTree.select("stores", "customers");
var stateActions = require("./stateActions.js")


function loadCustomer(id) {
  id = id.toString();
  return customerStore.select(p => p.ID === id);
}

const pageSize = 10;

export default {
  add(customer) {
  },
  load(id) {
  },
  loadList(params) {
  }
}