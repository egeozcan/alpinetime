require("babelify/polyfill");

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var stateTree = require("./stateTree.js");
var request = require('superagent');
var projectsCursor = stateTree.select("stores", "projects");
Router.HistoryLocation.addChangeListener(console.log.bind(console))

request.get(location.href, function(res) {
  projectsCursor.edit(JSON.parse(res.text));
  window.pc = projectsCursor;
  window.request = request;
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
	  	<ul>
        {
          this.state.cursor
            .filter(p => !!p.ID)
            .sort((p1, p2) => p1.ID - p2.ID)
            .map(p => <ProjectListItem key={p.ID} project={p} />)
        }
      </ul>
  	)
  }
});

var ProjectListItem = React.createClass({
  mixins: [Router.State],
  render() {
    return (
      <li>
        <h2>{this.props.project.Name}</h2>
        <p>{this.props.project.Description}</p>
      </li>
    )
  }
});

var routes = (
  <Route name="app" path="/app" handler={App}>
    <Route name="projects" path="/app/projects" handler={ProjectList}/>
    <Route name="project" path="/app/project/:projectID" handler={ProjectList}/>
  </Route>
)

Router.run(routes, Router.HistoryLocation, Handler => {
  React.render(<Handler/>, document.getElementById("main"))
});






