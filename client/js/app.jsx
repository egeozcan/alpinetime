require("babelify/polyfill");

var React = require('react');
var Router = require('react-router');

/** Components **/
var CustomerListComponent = require("./components/customer/CustomerList.jsx");
var CustomerComponent = require("./components/customer/Customer.jsx");
var ProjectListComponent = require("./components/project/ProjectList.jsx");
var ProjectComponent = require("./components/project/Project.jsx");
var Navigation = require("./components/main/Navigation.jsx");
var LoadingScreen = require("./components/main/LoadingScreen.jsx");

window.stateTree = require("./stateTree.js");

var initializationActions = require("./actions/initializationActions.js");
initializationActions.subscribeToQuery();
initializationActions.loadProjects();
initializationActions.loadCustomers();
initializationActions.loadTasks();
initializationActions.loadPackages();

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
    <Router.Route name="customers" path="/app/customers" handler={CustomerListComponent}/>
    <Router.Route name="customer" path="/app/customer/:ID" handler={CustomerComponent}/>
    <Router.Route name="projects" path="/app/projects" handler={ProjectListComponent}/>
    <Router.Route name="project" path="/app/project/:ID" handler={ProjectComponent}/>
  </Router.Route>
)

Router.run(
  routes,
  Router.HistoryLocation,
  Handler => React.render(<Handler/>, document.getElementById("main"))
);