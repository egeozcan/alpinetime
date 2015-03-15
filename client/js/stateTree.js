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
  state: {
    query: {},
    numInProgress: 0,
  }
});

var queryCursor = stateTree.select(["state", "query"]);
function updateQuery(uri) {
  queryCursor.edit(URI.parseQuery(location.search));
}
updateQuery();
Router.HistoryLocation.addChangeListener(updateQuery);

module.exports = stateTree;