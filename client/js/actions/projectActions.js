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
  },
  load(id) {
    var project = loadProject(id).get();
    if (project !== undefined) {
      if (project._detailsLoaded) {
        return;
      }
    } else {
      projectStore.push({
        ID: id,
        _isLoading: true
      });
    }
    stateActions.numInProgress.inc();
    request
      .get("/app/project/" + id)
      .end(function (err, res) {
        stateActions.numInProgress.dec();
        if (!!err) {
          loadProject(id).merge({
            _isLoading: false,
            _invalid: true,
            _error: err
          });
          return;
        }
        var projectCursor = loadProject(id);
        let loadedProject = JSON.parse(res.text); 
        loadedProject._isLoading = false;
        loadedProject._detailsLoaded = true;
        projectCursor.merge(loadedProject);
      });
  },
  loadList(params) {
    let numProjects = projectStore.get().length;
    if (numProjects > 1) {
      return;
    }
    stateActions.numInProgress.inc();
    request.get("/app/projects")
      .end(function(err, res) {
        projectStore.edit(JSON.parse(res.text));
        stateActions.numInProgress.dec();
      });
  }
}