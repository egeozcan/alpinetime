"use strict";

import React from "react";
import {branch} from "baobab-react/higher-order";
import Pager from "react-bootstrap/lib/Pager";
import PageItem from "react-bootstrap/lib/PageItem";
import GenericListPropTypes from "./GenericList.PropTypes.js";
import DefaultContainer from "./DefaultContainer.jsx";
import FlexContainer from "./FlexContainer.jsx";
import ListContainer from "./ListContainer.jsx";

const containers = {
    "flex": FlexContainer,
    "table": DefaultContainer,
    "list": ListContainer
};

var GenericList = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    propTypes: GenericListPropTypes,
    getDefaultProps() {
        return {
            filterUrlPrefix: "",
            itemsInPage: 10,
            pagingActive: true
        };
    },
    componentWillMount() {
        this.location = window.location.toString();
    },
    getQueryPrefix(prop) {
        return (this.props.queryPrefix || "") + prop;
    },
    getData() {
        let data = this.props.data || this.props.stores[this.props.storeName] || [];
        if (this.props.filter) {
            return data.filter(this.props.filter);
        }
        return data;
    },
    getPageData() {
        let allData = this.getData();
        let pageData = allData.slice((this.page() - 1) * this.props.itemsInPage, this.page() * this.props.itemsInPage);
        return { pageData, hasPaging: allData.length > this.props.itemsInPage };
    },
    page() {
        let page = this.props.query[this.getQueryPrefix("page")];
        let res = !page ? 1 : parseInt(page || 1);
        return res;
    },
    incPage(e) {
        e.preventDefault();
        if (this.hasNextPage()) {
            let newQuery = Object.assign(this.props.query, {[this.getQueryPrefix("page")]: this.page() + 1});
            this.context.router.transitionTo(location.pathname, null, newQuery);
        }
    },
    decPage(e) {
        e.preventDefault();
        var page = this.page() - 1;
        if (page <= 0) {
            return;
        }
        let newQuery = Object.assign(this.props.query, {[this.getQueryPrefix("page")]: page});
        this.context.router.transitionTo(location.pathname, null, newQuery);
    },
    hasNextPage() {
        return this.page() * this.props.itemsInPage < this.getData().length;
    },
    render() {
        let Container = containers[this.props.containerElement] || DefaultContainer;
        let data = this.getPageData();
        if (data.pageData.length === 0) {
            return (
                <div>
                    No data available.
                    <p>&nbsp;</p>
                </div>
            );
        }
        let pager = "";
        if (data.hasPaging && this.props.pagingActive) {
            pager = (
                <Pager>
                    <PageItem onClick={this.decPage} disabled={this.page() === 1}>Previous</PageItem>
                    <PageItem onClick={this.incPage} disabled={!this.hasNextPage()}>Next</PageItem>
                </Pager>);
        }
        return (
            <Container
                    data={data.pageData}
                    titles={this.props.titles}
                    removeAllTitles={this.props.removeAllTitles}
                    hidetitles={this.props.hidetitles}
                    preCalculateForPage={this.props.preCalculateForPage}>
                {pager}
            </Container>
        );
    }
});

export default branch(GenericList, {
    cursors: { stores: ["stores"], query: ["state", "query"] }
});