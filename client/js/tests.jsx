"use strict";

require("babelify/polyfill");

import React from "react";
import Router from "react-router";

/** Components **/
import Navigation from "./components/main/Navigation.jsx";
import LoadingScreen from "./components/main/LoadingScreen.jsx";
import GenericList from "./components/main/GenericList/GenericList.jsx";

import initializationActions from "./actions/initializationActions.js";
let stateTree = global.stateTree = require("./stateTree.js");
initializationActions.subscribeToQuery();
initializationActions.loadProjects();
initializationActions.loadCustomers();

window.stateTree = require("./stateTree.js");
stateTree.on("update", console.log.bind(console));
stateTree.select(["stores"]).set("tests", []);

var App = React.createClass({
    render() {
        return (
            <div>
                <LoadingScreen />
                <Navigation/>
                <h3>Tests</h3>
                <Router.RouteHandler/>
            </div>
        );
    }
});

var ProjectsList = React.createClass({
    render() {
        return (
            <div>
                <h2>Projects</h2>
                <GenericList titles={[{name: "ID"}, {name: "Name"}]} storeName={"projects"} />
            </div>
        );
    }
});

var CustomersList = React.createClass({
    render() {
        return (
            <div>
                <h2>Projects</h2>
                <GenericList titles={[{name: "ID"}, {name: "Name"}]} storeName={"customers"} />
            </div>
        );
    }
});

var routes = (
    <Router.Route name="app" path="/app" handler={App}>
        <Router.Route path="/test/" handler={ProjectsList}/>
        <Router.Route name="projects" path="/test/Projects" handler={ProjectsList}/>
        <Router.Route name="customers" path="/test/Customers" handler={CustomersList}/>
    </Router.Route>
);

Router.run(
    routes,
    Router.HistoryLocation,
    Handler => React.render(<Handler/>, document.getElementById("main"))
);