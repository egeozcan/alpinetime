"use strict";

import React from "react";
import {branch} from "baobab-react/higher-order";
import customerActions from "../../actions/customerActions.js";
import PageHeader from "react-bootstrap/lib/PageHeader";
import GenericList from "../main/GenericList/GenericList.jsx";
import ProjectListTitles from "../project/ProjectList.Titles.jsx";
import TwoCols from "../main/Layout/TwoCols.jsx";

let Customer = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    componentWillMount() {
        customerActions.load(this.context.router.getCurrentParams().ID);
    },
    componentWillReceiveProps() {
        customerActions.load(this.context.router.getCurrentParams().ID);
    },
    render() {
        let customer = this.props.customers.filter(p => p.ID === this.context.router.getCurrentParams().ID)[0];
        if (!customer || customer._isLoading === true) {
            return (<span>Loading...</span>);
        }
        let Content = [
            <PageHeader>{customer.Name}</PageHeader>,
            <GenericList titles={ProjectListTitles} hidetitles={["Customer", "Progress"]} storeName="projects" filter={p => p.CustomerID === customer.ID} />
        ];
        return (<TwoCols Content={Content} />);
    }
});

export default branch({
    cursors: { customers: ["stores", "customers"] }
}, Customer);