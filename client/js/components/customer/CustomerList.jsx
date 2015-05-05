"use strict";

import React from "react";
import PageHeader from "react-bootstrap/lib/PageHeader";
import GenericList from "../main/GenericList/GenericList.jsx";
import TwoCols from "../main/Layout/TwoCols.jsx";
import {Link} from "react-router";
import stateTree from "../../stateTree.js";
let ProjectStore = stateTree.select(["stores", "projects"]);

let CustomerList = React.createClass({
    titles(data) {
        let ids = data.map(pd => pd.ID);
        let projects = ProjectStore.get().filter(p => ids.indexOf(p.CustomerID) >= 0);
        return [
            {
                name: "Name",
                getter(row) {
                    let params = {ID: row.ID};
                    return (<Link to="customer" params={params}>{row.Name}</Link>);
                }
            },
            {name: "LegacyId"},
            {
                name: "Number of Projects",
                getter(row) {
                    return projects.filter(p => p.CustomerID === row.ID).length;
                }
            }
        ];
    },
    render() {
        let Content = [
                <PageHeader>Customers</PageHeader>,
                <GenericList titles={this.titles} storeName="customers" />
        ];
        return (<TwoCols Content={Content} Sidebar={<p>Hello World</p>} />);
    }
});

module.exports = CustomerList;