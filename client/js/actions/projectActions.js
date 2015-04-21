var RESTBase = require("./lib/RESTBase.js");
var stateTree = require("../stateTree.js");
var projectStore = stateTree.select("stores", "projects");
var packageStore = stateTree.select("stores", "packages");
var stateActions = require("./stateActions.js")

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
  },
  addPackage(project, Name, Description) {
    RESTBase.add("package", {Name, Description, ProjectID: project.ID});
  }
}