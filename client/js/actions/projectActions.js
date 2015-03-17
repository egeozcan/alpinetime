var request = require("superagent"); 
var stateTree = require("../stateTree.js");
var projectStore = stateTree.select("stores", "projects");
var stateActions = require("./stateActions.js")


function loadProject(id) {
  id = id.toString();
  return projectStore.select(p => p.ID === id);
}

const pageSize = 10;

export default {
  add(project) {
    //noop for now
  },
  load() {
    //noop for now
  },
  loadList(params) {
    //noop for now
  }
}