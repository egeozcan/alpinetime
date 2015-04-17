require("babel/polyfill");

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

/** Components **/
var CustomerListComponent = require("./components/customer/CustomerList.jsx");
var CustomerComponent = require("./components/customer/Customer.jsx");
var ProjectListComponent = require("./components/project/ProjectList.jsx");
var ProjectComponent = require("./components/project/Project.jsx");
var Navigation = require("./components/main/Navigation.jsx");
var Logo = require("./components/main/Logo.jsx");
var LoadingScreen = require("./components/main/LoadingScreen.jsx");

window.stateTree = require("./stateTree.js");

var initializationActions = require("./actions/initializationActions.js");
initializationActions.subscribeToQuery();
initializationActions.loadProjects();
initializationActions.loadCustomers();
initializationActions.loadTasks();
initializationActions.loadPackages();
initializationActions.loadModelDefinitions();
initializationActions.loadLookups();

var App = React.createClass({
  render() {
    return (
      <div>
        {/*<LoadingScreen />*/}
        <header id="header">
          <Logo/>
          <Navigation/>
        </header>
        <main>
          <Router.RouteHandler/>
        </main>
      </div>
    )
  }
});

var routes = (
  <Route name="app" path="/app" handler={App}>
    <Route name="customers" path="/app/customers" handler={CustomerListComponent}/>
    <Route name="customer" path="/app/customer/:ID" handler={CustomerComponent}/>
    <Route name="projects" path="/app/projects" handler={ProjectListComponent}/>
    <Route name="project" path="/app/project/:ID" handler={ProjectComponent}/>
  </Route>
)

Router.run(
  routes,
  Router.HistoryLocation,
  Handler => React.render(<Handler/>, document.body)
);