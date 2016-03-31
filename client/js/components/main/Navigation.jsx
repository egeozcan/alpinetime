"use strict";

import React from "react";
import { NavDropdown, MenuItem, Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default React.createClass({
    render() {
        return (
            <Navbar fluid inverse>
                <Nav>
                    <LinkContainer to={{ pathname: "projects"}}><NavItem>Projects</NavItem></LinkContainer>
                    <LinkContainer to={{ pathname: "customers"}}><NavItem>Customers</NavItem></LinkContainer>
                    <LinkContainer to={{ pathname: "timeentries"}}><NavItem>Time Entries</NavItem></LinkContainer>
                </Nav>
                <Nav right>
                    <NavDropdown title="User">
                        <MenuItem href="/logout">Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
});