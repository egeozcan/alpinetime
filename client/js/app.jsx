require("babelify/polyfill");

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

/** Components **/
var ProjectList = require("./components/project/ProjectList.jsx");

window.stateTree = require("./stateTree.js");
var request = require('superagent');
var projectsCursor = stateTree.select("stores", "projects");
Router.HistoryLocation.addChangeListener(console.log.bind(console))

request.get("/app/projects", function(res) {
  projectsCursor.edit(JSON.parse(res.text));
  window.pc = projectsCursor;
  window.request = request;
});

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
    <Route name="projects" path="/app/projects" handler={ProjectList}/>
    <Route name="project" path="/app/project/:ID" handler={ProjectList}/>
  </Route>
)

Router.run(routes, Router.HistoryLocation, Handler => {
  React.render(<Handler/>, document.getElementById("main"))
});