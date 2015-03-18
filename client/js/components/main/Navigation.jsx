var React = require('react');
var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;
var Router = require('react-router');

export default React.createClass({
  render() {
    return (
      <Navbar fluid inverse brand={<Router.Link to="projects" activeClassName="home">Alpinetime</Router.Link>} to="projects">
        <Nav>
          <NavItemLink eventKey={1} to="projects">Projects</NavItemLink>
          <NavItemLink eventKey={1} to="customers">Customers</NavItemLink>
        </Nav>
      </Navbar>
    )
  }
});