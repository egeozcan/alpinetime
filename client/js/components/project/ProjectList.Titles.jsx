"use strict";

import React from "react";
import {Link} from "react-router";
import stateTree from "../../stateTree.js";
import Progressbar from "react-bootstrap/lib/Progressbar";
import Lookup from "../main/Lookup.jsx";

let Customers = stateTree.select(["stores", "customers"]);
let Tasks = stateTree.select(["stores", "tasks"]);

export default function (data) {
    var ids = data.map(d => d.ID);
    var tasks = Tasks.get().filter(t => ids.indexOf(t.ProjectID) >= 0);
    return [
        {
            name: "Name",
            getter(row) {
                return (<strong><Link to="project" params={{ID: row.ID}}>{row.Name}</Link></strong>);
            }
        },
        {
            name: "Customer",
            getter(row) {
                let customer = Customers.get(c => c.ID === row.CustomerID) || {};
                let params = {ID: row.CustomerID};
                return (<Link to="customer" params={params}>{customer.Name || "Loading..."}</Link>);
            }
        },
        {
            name: "Tasks",
            getter(row) {
                return tasks.filter(t => t.ProjectID === row.ID).length;
            }
        },
        {
            name: "Progress",
            getter() {
                return (<Progressbar now={Math.random() * 100} label="%(percent)s%" />);
            }
        },
        {
            name: "Project Category",
            getter(row) {
                return (<Lookup lookupID={row.ProjectCategoryID} type="ProjectCategoryID" />);
            }
        },
        { name: "Description" }
    ];
}