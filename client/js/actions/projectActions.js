"use strict";

import RESTBase from "./lib/RESTBase.js";
/*import stateTree from "../stateTree.js";
var projectStore = stateTree.select("stores", "projects");
var packageStore = stateTree.select("stores", "packages");
import stateActions from "./stateActions.js"*/

/*const pageSize = 10;*/

export default {
    add(/*project*/) {
        //noop for now
    },
    load() {
        //noop for now
    },
    loadList(/*params*/) {
        //noop for now
    },
    addPackage(project, Name, Description) {
        RESTBase.add("package", {Name, Description, ProjectID: project.ID});
    }
};