"use strict";

require("babel/polyfill");

import React from "react";
import Router from "react-router";
import PropTypes from "baobab-react/prop-types";
/** Components **/
import CustomerListComponent from "./components/customer/CustomerList.jsx";
import TimeEntryListComponent from "./components/timeentry/TimeEntryList.jsx";
import CustomerComponent from "./components/customer/Customer.jsx";
import ProjectListComponent from "./components/project/ProjectList.jsx";
import ProjectComponent from "./components/project/Project.jsx";
import TestWidget from "./lib/Form.Widget.jsx";
import Navigation from "./components/main/Navigation.jsx";
import Logo from "./components/main/Logo.jsx";
import LoadingScreen from "./components/main/LoadingScreen.jsx";
/** Actions **/
import {
    subscribeToQuery,
    loadProjects,
    loadCustomers,
    loadTasks,
    loadPackages,
    loadModelDefinitions,
    loadLookups,
    loadTimeEntries
} from "./actions/initializationActions.js";

let Route = Router.Route;
let stateTree = global.stateTree = require("./stateTree.js");

subscribeToQuery();
loadProjects();
loadCustomers();
loadTasks();
loadPackages();
loadModelDefinitions();
loadLookups();
loadTimeEntries();

let App = React.createClass({
    childContextTypes: {
         tree: PropTypes.baobab
    },
    getChildContext() {
        return {
            tree: stateTree
        };
    },
    render() {
        return (
            <div>
                <LoadingScreen />
                <header id="header">
                    <Logo/>
                    <Navigation/>
                </header>
                <Router.RouteHandler/>
            </div>
        );
    }
});

let routes = (
    <Route name="app" path="/app" handler={App}>
        <Route name="customers" path="/app/customers" handler={CustomerListComponent}/>
        <Route name="timeentries" path="/app/timeentries" handler={TimeEntryListComponent}/>
        <Route name="customer" path="/app/customer/:ID" handler={CustomerComponent}/>
        <Route name="projects" path="/app/projects" handler={ProjectListComponent}/>
        <Route name="project" path="/app/project/:ID" handler={ProjectComponent}/>
    </Route>
);

Router.run(
    routes,
    Router.HistoryLocation,
    Handler => {
        React.render(<Handler />, document.body);
    }
);