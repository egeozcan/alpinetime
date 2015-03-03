var React = require('react');
var stateTree = require("./stateTree.js");
require("babelify/polyfill");
window.stateTree = stateTree;

var projectsCursor = stateTree.select("stores", "projects");

var ProjectList = React.createClass({
  mixins: [projectsCursor.mixin],
  render() {
  	return (
	  	<div>
        {this.state.cursor
          .filter(p => !!p.ID)
          .map(p => <ProjectListItem key={p.ID} project={p} />)}
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