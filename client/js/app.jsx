require("babelify/polyfill");

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

/** Components **/
var ProjectListComponent = require("./components/project/ProjectList.jsx");
var ProjectComponent = require("./components/project/Project.jsx");

window.stateTree = require("./stateTree.js");
var request = require('superagent');
var projectsCursor = stateTree.select("stores", "projects");
//Router.HistoryLocation.addChangeListener(console.log.bind(console))

var App = React.createClass({
  render() {
    //var param = { projectID : 2 }
    return (
      <div>
        <RouteHandler/>
      </div>
    )
  }
  /*<Link to="project" params={param}>Projects</Link>*/
});

var routes = (
  <Route name="app" path="/app" handler={App}>
    <Route name="projects" path="/app/projects" handler={ProjectListComponent}/>
    <Route name="project" path="/app/project/:ID" handler={ProjectComponent}/>
  </Route>
)

Router.run(routes, Router.HistoryLocation, Handler => {
  React.render(<Handler/>, document.getElementById("main"))
});