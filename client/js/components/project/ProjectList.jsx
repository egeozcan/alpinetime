"use strict";

import React from "react";
import PageHeader from "react-bootstrap/lib/PageHeader";
import GenericList from "../main/GenericList/GenericList.jsx";
import Titles from "./ProjectList.Titles.jsx";
import TwoCols from "../main/Layout/TwoCols.jsx";

var ProjectList = React.createClass({
    render() {
        let Content = [
            <PageHeader>Projects</PageHeader>,
            <GenericList titles={Titles} storeName="projects" />
        ];
        let Sidebar = [
            /* Filters will come here */
        ];
        return (<TwoCols Content={Content} Sidebar={Sidebar} />);
    }
});

module.exports = ProjectList;