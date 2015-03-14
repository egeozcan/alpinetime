var React = require('react');
var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;


export default React.createClass({
  render() {
    return (
      <Navbar fixedTop fluid inverse brand="Alpinetime">
        <Nav>
          <NavItemLink eventKey={1} to="projects">Projects</NavItemLink>
          <NavItemLink eventKey={1} query={{showAge: true}} to="customers">Customers</NavItemLink>
        </Nav>
      </Navbar>
    )
  }
});