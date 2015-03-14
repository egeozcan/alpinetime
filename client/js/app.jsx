require("babelify/polyfill");

var React = require('react');
var Router = require('react-router');

/** Components **/
var ProjectListComponent = require("./components/project/ProjectList.jsx");
var ProjectComponent = require("./components/project/Project.jsx");
var Navigation = require("./components/main/Navigation.jsx");
var LoadingScreen = require("./components/main/LoadingScreen.jsx");

window.stateTree = require("./stateTree.js");
Router.HistoryLocation.addChangeListener(console.log.bind(console))

var App = React.createClass({
  render() {
    return (
      <div>
        <LoadingScreen />
        <Navigation/>
        <Router.RouteHandler/>
      </div>
    )
  }
});

var routes = (
  <Router.Route name="app" path="/app" handler={App}>
    <Router.Route name="projects" path="/app/projects" handler={ProjectListComponent}/>
    <Router.Route name="customers" path="/app/customers" handler={ProjectListComponent}/>
    <Router.Route name="project" path="/app/project/:ID" handler={ProjectComponent}/>
  </Router.Route>
)

Router.run(
  routes,
  Router.HistoryLocation,
  Handler => React.render(<Handler/>, document.getElementById("main"))
);