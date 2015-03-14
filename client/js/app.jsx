require("babelify/polyfill");

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

/** Components **/
var ProjectListComponent = require("./components/project/ProjectList.jsx");
var ProjectComponent = require("./components/project/Project.jsx");

var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var Grid = require('react-bootstrap/lib/Grid');
var Col = require('react-bootstrap/lib/Col');
var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;

window.stateTree = require("./stateTree.js");
var request = require('superagent');
//Router.HistoryLocation.addChangeListener(console.log.bind(console))

var Navigation = React.createClass({
  render() {
    return (
      <Navbar fixedTop fluid inverse brand="Alpinetime">
        <Nav>
          <NavItemLink eventKey={1} to="projects">Projects</NavItemLink>
          <NavItemLink eventKey={1} to="customers">Customers</NavItemLink>
        </Nav>
      </Navbar>
    )
  }
});

var App = React.createClass({
  render() {
    //var param = { projectID : 2 }
    return (
      <div>
        <Navigation/>
        <RouteHandler/>
      </div>
    )
  }
  /*<Link to="project" params={param}>Projects</Link>*/
});

var routes = (
  <Route name="app" path="/app" handler={App}>
    <Route name="projects" path="/app/projects" handler={ProjectListComponent}/>
    <Route name="customers" path="/app/customers" handler={ProjectListComponent}/>
    <Route name="project" path="/app/project/:ID" handler={ProjectComponent}/>
  </Route>
)

Router.run(routes, Router.HistoryLocation, Handler => {
  React.render(<Handler/>, document.getElementById("main"))
});