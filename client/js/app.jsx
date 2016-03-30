"use strict";

require("babel-polyfill");

import { Router, Route, Link, browserHistory } from "react-router";
import { render } from "react-dom";
import React from "react";
import PropTypes from "baobab-react/prop-types";
/** Components **/
import CustomerListComponent from "./components/customer/CustomerList.jsx";
import TimeEntryListComponent from "./components/timeentry/TimeEntryList.jsx";
import CustomerComponent from "./components/customer/Customer.jsx";
import ProjectListComponent from "./components/project/ProjectList.jsx";
import ProjectComponent from "./components/project/Project.jsx";
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
                {this.props.children}
            </div>
        );
    }
});

var target = document.createElement("div");
document.body.appendChild(target);

render((
    <Router history={browserHistory}>
        <Route name="app" path="/app" component={App}>
            <Route name="customers" path="/app/customers" component={CustomerListComponent}/>
            <Route name="timeentries" path="/app/timeentries" component={TimeEntryListComponent}/>
            <Route name="customer" path="/app/customer/:ID" component={CustomerComponent}/>
            <Route name="projects" path="/app/projects" component={ProjectListComponent}/>
            <Route name="project" path="/app/project/:ID" component={ProjectComponent}/>
        </Route>
    </Router>
), target);