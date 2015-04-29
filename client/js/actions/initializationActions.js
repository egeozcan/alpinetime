"use strict";

let stateTree = require("../stateTree.js");
let stateActions = require("./stateActions.js");
let request = require("superagent");
let URI = require("URIjs");
let Router = require("react-router");
window.URL = require("url");

let loadEntity = (entityName) => {
    stateActions.numInProgress.inc();
    request.get("/api/" + entityName)
        .end((err, res) => {
            if (err) {
                console.log(`An error has occured: ${err}`);
                return;
            }
            let store = stateTree.select("stores", entityName);
            store.set(JSON.parse(res.text));
            stateActions.numInProgress.dec();
        });
};

export let loadProjects = loadEntity.bind(null, "projects");
export let loadCustomers = loadEntity.bind(null, "customers");
export let loadTasks = loadEntity.bind(null, "tasks");
export let loadPackages = loadEntity.bind(null, "packages");
export let loadLookups = loadEntity.bind(null, "lookups");

export let loadModelDefinitions = () => {
    request.get("/api/definitions").end((err, res) => {
        if (err) {
            console.log(`An error has occured: ${err}`);
            return;
        }
        stateTree.select("definitions").set(JSON.parse(res.text));
    });
};

/* subscribe to the url change event and
    update state when a significant change occurs */
let lastUri = "";
let sanitize = s => s.replace("?page=1", "");
export let subscribeToQuery = () => {
    let queryCursor = stateTree.select(["state", "query"]);
    let updateQuery = (uri) => {
        if (uri) {
            if (sanitize(uri.path) === sanitize(lastUri)) {
                return;
            }
            lastUri = uri.path;
            console.log("lastUri: ", lastUri);
        } else {
            return;
        }
        var parsedQuery = URI.parseQuery(location.search);
        console.log("parsedQuery: ", parsedQuery);
        queryCursor.set(parsedQuery);
    };
    Router.HistoryLocation.addChangeListener(updateQuery);
    updateQuery();
};