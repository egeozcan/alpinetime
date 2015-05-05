"use strict";

import stateTree from "../stateTree.js";
var appState = stateTree.select("state");

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
};