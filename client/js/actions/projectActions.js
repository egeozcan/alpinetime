var request = require("superagent"); 
var stateTree = require("../stateTree.js");
var projectStore = stateTree.select("stores", "projects");
var packageStore = stateTree.select("stores", "packages");
var stateActions = require("./stateActions.js")


function getBaseEntity () {
  var d = new Date();
  return {
    "ID": "temp" + Date.now(),
    "createdAt": d.toJSON(),
    "updatedAt": d.toJSON(),
    "deletedAt": null,
    "CreateUserID": "0",
    "ModifyUserID": "0",
  }
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
  },
  addPackage(project, name, description) {
    var pkg = getBaseEntity();
    pkg.Name = name;
    pkg.Description = description;
    pkg.ProjectID = project.ID;
    let cursor = packageStore.push(pkg);
    request.post("/api/packages", pkg).end(function(err,res) {
      cursor.edit(JSON.parse(res.text));
    });
  }
}