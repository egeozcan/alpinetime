var URI = require('URIjs');
var Router = require('react-router');
var Baobab = require('baobab');

var stateTree = new Baobab({
  stores: {
    projects: [],
    tasks: [],
    packages: [],
    users: []
  },
  //this is the app state, never the component state
  state: {
    query: {},
    numInProgress: 0,
  }
});

function updateQuery() {
  stateTree.select(["state", "query"]).edit(URI.parseQuery(location.search));
}
Router.HistoryLocation.addChangeListener(updateQuery);
updateQuery();

module.exports = stateTree;