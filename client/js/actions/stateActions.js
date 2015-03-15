var request = require("superagent"); 
var stateTree = require("../stateTree.js");
var appState = stateTree.select("state");
var is = require('is_js');

function changeNumInProgress (level) {
  appState.update({ numInProgress: { $apply(n) { return n + level } } });
}
function changePage (level) {
  let cursor = appState.select(["query"]);
  let page = parseInt((cursor.get().page || 1).toString());
  if (page + level <= 0) {
    return;
  }
  cursor.set("page", page + level);
}

export default {
  numInProgress: {
    inc: changeNumInProgress.bind(null, 1),
    dec: changeNumInProgress.bind(null, -1)
  }
}