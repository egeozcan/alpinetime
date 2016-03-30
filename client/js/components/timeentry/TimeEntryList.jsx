"use strict";

import React from "react";
import PageHeader from "react-bootstrap/lib/PageHeader";
import GenericList from "../main/GenericList/GenericList.jsx";
import TwoCols from "../main/Layout/TwoCols.jsx";
import {branch} from "baobab-react/higher-order";

let TimeEntryList = React.createClass({
    titles() {
        return [
            {Name: "TaskID"},
            {Name: "StartedTime"},
            {Name: "StopTime"},
            {Name: "Description"}
        ];
    },
    render() {
        let Content = [
                <PageHeader>Time Entries</PageHeader>,
                <GenericList titles={this.titles} storeName="timeentries" />
        ];
        return (<TwoCols Content={Content} Sidebar={<p>Hello World</p>} />);
    }
});

export default branch({
    cursors: { timeentries: ["stores", "timeentries"] }
}, TimeEntryList);