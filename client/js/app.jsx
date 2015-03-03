require("babelify/polyfill");

var React = require('react');
var Router = require('react-router');
var stateTree = require("./stateTree.js");

var projectsCursor = stateTree.select("stores", "projects");

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

React.render(<ProjectList />, document.getElementById("main"));