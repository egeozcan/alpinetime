var Baobab = require('baobab');

var stateTree = new Baobab({
  stores: {
    projects: [],
    customers: [],
    tasks: [],
    packages: [],
    users: []
  },
  state: {
    query: {},
    numInProgress: 0,
  }
});

module.exports = stateTree;