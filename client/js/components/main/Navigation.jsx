"use strict";

import React from "react";
import { DropdownButton, MenuItem, Nav, Navbar } from "react-bootstrap";
import { NavItemLink } from "react-router-bootstrap";

export default React.createClass({
    render() {
        return (
            <Navbar fluid inverse>
                <Nav>
                    <NavItemLink to="projects">Projects</NavItemLink>
                    <NavItemLink to="customers">Customers</NavItemLink>
                    <NavItemLink to="timeentries">Time Entries</NavItemLink>
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