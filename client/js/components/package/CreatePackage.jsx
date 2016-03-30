"use strict";

import React from "react";
import { branch } from "baobab-react/higher-order";
import projectActions from "../../actions/projectActions.js";
import Router from "react-router";
import Tree from "../../stateTree.js";
import TwoCols from "../main/Layout/TwoCols.jsx";
import SidebarActions from "../main/SidebarActions.jsx";
import TaskTitles from "../task/Task.Titles.jsx";
import { Modal, Button, Glyphicon, PageHeader } from "react-bootstrap";
import EntityForm from "../main/EntityForm.jsx";

let CreatePackage = React.createClass({
    mixins: [Tree.mixin],
    contextTypes: {
        router: React.PropTypes.func
    },
    getDefaultState() {
        return {
            dialogPackageCreateActive: false
        };
    },
    render() {
        let Sidebar = [
            <SidebarActions>
                <Button href="#" block onClick={(e) => { e.preventDefault(); this.setState({dialogPackageCreateActive: true}); }}>
                    <Glyphicon glyph="plus"/> Add a package
                </Button>
                {/*<Button href="#" block><Glyphicon glyph="star"/> Add project to favorites</Button>*/}
            </SidebarActions>
        ];
        return (<TwoCols Content={false} Sidebar={Sidebar} />);
    }
});

export default branch(CreatePackage, {
    cursors: {
        projects: ["stores", "projects"],
        customers: ["stores", "customers"],
        tasks: ["stores", "tasks"]
    }
});