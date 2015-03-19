var stateTree = require('../stateTree.js');
var stateActions = require("./stateActions.js");
var request = require("superagent"); 
var URI = require('URIjs');
var Router = require('react-router');

var loadEntity = function(entityName) {
  stateActions.numInProgress.inc();
  request.get("/api/" + entityName)
    .end(function(err, res) {
      let store = stateTree.select("stores", entityName);
      store.edit(JSON.parse(res.text));
      stateActions.numInProgress.dec();
    });
}

export var subscribeToQuery = () => {
  let queryCursor = stateTree.select(["state", "query"]);
  let updateQuery = (uri) => queryCursor.edit(URI.parseQuery(location.search));
  Router.HistoryLocation.addChangeListener(updateQuery);
  updateQuery();
}

export var loadProjects = loadEntity.bind(null, "projects");
export var loadCustomers = loadEntity.bind(null, "customers");
export var loadTasks = loadEntity.bind(null, "tasks");