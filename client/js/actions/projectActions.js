var request = require("superagent"); 
var state = require("../stateTree.js");
var projectStore = state.select("stores", "projects");

function loadProject(id) {
  id = id.toString();
  return projectStore.select(p => p.ID === id);
}

export default {
  add(project) {
    // var id = project.ID;
    // var availableIds = stateTree
    //   .select("models", "projects")
    //   .map(p => p.ID);
    
  },
  load(id) {
    var project = loadProject(id).get();
    if (project !== undefined) {
      return;
    }
    projectStore.push({
      ID: id,
      _isLoading: true
    });
    request
      .get("/app/project/" + id)
      .end(function (err, res) {
        if (!!err) {
          loadProject(id).merge({
            _isLoading: false,
            _invalid: true,
            _error: err
          });
          return;
        }
        var p = loadProject(id);
        p.merge(res)
        p.set("_isLoading", false);
      });
  },
  loadList() {
    request.get("/app/projects", function(res) {
      projectStore.edit(JSON.parse(res.text));
      window.pc = projectStore;
      window.request = request;
    });
  }
}