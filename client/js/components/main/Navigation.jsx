"use strict";

import React from "react";
import { DropdownButton, MenuItem, Nav, Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default React.createClass({
    render() {
        return (
            <Navbar fluid inverse>
                <Nav>
                    <LinkContainer to={{ pathname: "projects"}}><Button>Projects</Button></LinkContainer>
                    <LinkContainer to={{ pathname: "customers"}}><Button>Customers</Button></LinkContainer>
                    <LinkContainer to={{ pathname: "timeentries"}}><Button>Time Entries</Button></LinkContainer>
                </Nav>
                <Nav right>
                    <DropdownButton title="User">
                        <MenuItem href="/logout">Logout</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
        );
    }
});