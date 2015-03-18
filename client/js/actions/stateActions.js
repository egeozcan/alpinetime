var request = require("superagent"); 
var stateTree = require("../stateTree.js");
var appState = stateTree.select("state");
var is = require('is_js');

var numInProgress = 0;
function changeNumInProgress (level) {
  numInProgress += level;
  appState.set("numInProgress", numInProgress);
}

export default {
  numInProgress: {
    inc: changeNumInProgress.bind(null, 1),
    dec: changeNumInProgress.bind(null, -1)
  }
}