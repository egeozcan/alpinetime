require("babelify/polyfill");

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var stateTree = require("./stateTree.js");
window.sa = require('superagent');

window.projectsCursor = stateTree.select("stores", "projects");

sa.get(location.href, function(res) {
  projectsCursor.edit(JSON.parse(res.text));
});

var App = React.createClass({
  render() {
    return (
      <div>
        <RouteHandler/>
      </div>
    )
  }
})

var ProjectList = React.createClass({
  mixins: [projectsCursor.mixin],
  render() {
  	return (
	  	<div>
        {
          this.state.cursor
            .filter(p => !!p.ID)
            .sort((p1, p2) => p1.ID - p2.ID)
            .map(p => <ProjectListItem key={p.ID} project={p} />)
        }
      </div>
  	)
  }
});

var ProjectListItem = React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.project.Name}</h2>
        <p>{this.props.project.Description}</p>
      </div>
    )
  }
});

var routes = (
  <Route name="app" path="/app" handler={App}>
    <Route name="projects" handler={ProjectList}/>
  </Route>
)

Router.run(routes, Router.HistoryLocation, Handler => {
  React.render(<Handler/>, document.getElementById("main"))
});






