"use strict";

import React from "react";
import Navbar from "react-bootstrap/lib/Navbar";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";
import Nav from "react-bootstrap/lib/Nav";
import ReactRouterBootstrap from "react-router-bootstrap";
let NavItemLink = ReactRouterBootstrap.NavItemLink;

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