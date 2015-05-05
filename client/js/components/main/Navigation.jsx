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
                    <NavItemLink eventKey={1} to="projects">Projects</NavItemLink>
                    <NavItemLink eventKey={1} to="customers">Customers</NavItemLink>
                </Nav>
                <Nav right>
                    <DropdownButton eventKey={3} title="User">
                        <MenuItem eventKey="1" href="/logout">Logout</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
        );
    }
});