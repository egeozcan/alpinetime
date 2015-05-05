"use strict";

import React from "react";
import {branch} from "baobab-react/higher-order";
import projectActions from "../../actions/projectActions.js";
import Router from "react-router";
import Tree from "../../stateTree.js";
import PageHeader from "react-bootstrap/lib/PageHeader";
import GenericList from "../main/GenericList/GenericList.jsx";
import TwoCols from "../main/Layout/TwoCols.jsx";
import SidebarActions from "../main/SidebarActions.jsx";
import TaskTitles from "../task/Task.Titles.jsx";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Modal from "react-bootstrap/lib/Modal";
import Input from "react-bootstrap/lib/Input";
import Button from "react-bootstrap/lib/Button";

let Project = React.createClass({
    mixins: [Tree.mixin],
    contextTypes: {
        router: React.PropTypes.func
    },
    getDefaultState() {
        return {
            dialogPackageCreateActive: false
        };
    },
    packageTitles(/*data*/) {
        let projectID = this.context.router.getCurrentParams().ID;
        let tasks = this.props.tasks.filter(t => t.ProjectID === projectID);
        return [
            {
                name: "Name",
                getter: row => [
                    <h4 key="pname">{row.Name}</h4>,
                    <p key="pdesc">{row.Description}</p>
                ]
            },
            {
                name: "Tasks",
                getter: row => (
                    <GenericList
                        queryPrefix={"ptlist" + row.ID}
                        titles={TaskTitles}
                        itemsInPage={20}
                        storeName="tasks"
                        data={tasks}
                        filter={p => p.PackageID === row.ID} />
                )
            }
        ];
    },
    componentWillMount() {
        projectActions.load(this.context.router.getCurrentParams().ID);
    },
    componentWillReceiveProps() {
        projectActions.load(this.context.router.getCurrentParams().ID);
    },
    addPackage() {
        let project = this.props.projects.filter(p => p.ID === this.context.router.getCurrentParams().ID)[0];
        let name = this.refs.PackageName.getValue();
        let desc = this.refs.PackageDesc.getValue();
        if (!name) {
            return;
        }
        projectActions.addPackage(project, name, desc);
        this.setState({dialogPackageCreateActive: false});
    },
    render() {
        let project = this.props.projects.filter(p => p.ID === this.context.router.getCurrentParams().ID)[0];
        if (!project || project._isLoading === true) {
            return false;
        }
        let projectID = this.context.router.getCurrentParams().ID;
        let Content = [
            (
                <PageHeader>
                    {project.Name}
                    <small> for <Router.Link to="customer" params={{ID: project.CustomerID}}>{project.Customer ? project.Customer.Name : "-"}</Router.Link></small>
                </PageHeader>
            ),
            <h3>Packages</h3>,
            <GenericList
                titles={this.packageTitles}
                containerElement="list"
                removeAllTitles={true}
                itemsInPage={1000}
                storeName="packages"
                filter={p => p.ProjectID === projectID} />,
            this.state && this.state.dialogPackageCreateActive
                ? (
                    <Modal onRequestHide={() => this.setState({dialogPackageCreateActive: false})}>
                        <div className="modal-body" action="#">
                            <Input ref="PackageName" type="text" label="Name" />
                            <Input ref="PackageDesc" type="textarea" label="Description" />
                        </div>
                        <div className="modal-footer">
                            <Button onClick={this.addPackage} bsStyle="primary">Save</Button>
                        </div>
                    </Modal>
                )
                : false
        ];
        let Sidebar = [
            <SidebarActions>
                <Button href="#" block onClick={(e) => { e.preventDefault(); this.setState({dialogPackageCreateActive: true}); }}>
                    <Glyphicon glyph="plus"/> Add a package
                </Button>
                <Button href="#" block><Glyphicon glyph="star"/> Add project to favorites</Button>
            </SidebarActions>
        ];
        return (<TwoCols Content={Content} Sidebar={Sidebar} />);
    }
});

export default branch(Project, {
    cursors: { projects: ["stores", "projects"], tasks: ["stores", "tasks"] }
});