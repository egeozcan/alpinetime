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
    var customer = loadCustomer(id).get();
    if (customer !== undefined) {
      if (customer._detailsLoaded || customer._isLoading) {
        return;
      }
    } else {
      customerStore.push({
        ID: id,
        _isLoading: true
      });
      stateTree.commit();
    }
    stateActions.numInProgress.inc();
    request
      .get("/app/customer/" + id)
      .end(function (err, res) {
        stateActions.numInProgress.dec();
        if (!!err) {
          loadCustomer(id).merge({
            _isLoading: false,
            _invalid: true,
            _error: err
          });
          return;
        }
        var customerCursor = loadCustomer(id);
        let loadedCustomer = JSON.parse(res.text); 
        loadedCustomer._isLoading = false;
        loadedCustomer._detailsLoaded = true;
        customerCursor.merge(loadedCustomer);
      });
  },
  loadList(params) {
    let numCustomers = customerStore.get().length;
    if (numCustomers > 1) {
      return;
    }
    stateActions.numInProgress.inc();
    request.get("/app/customers")
      .end(function(err, res) {
        customerStore.edit(JSON.parse(res.text));
        stateActions.numInProgress.dec();
      });
  }
}