var React = require('react');
var Navbar = require('react-bootstrap/lib/Navbar');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var Nav = require('react-bootstrap/lib/Nav');
var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;
var Router = require('react-router');

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
    )
  }
});