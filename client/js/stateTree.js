"use strict";

import Baobab from "baobab";

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
    activeTimeEntryID: 0
  },
  definitions: {}
},
{
  shiftReferences: true
});

module.exports = stateTree;