var projectsCursor = require("./stateTree.js")
  .select("stores", "projects");
var StateMixin = require('react-router').State;
var ProjectListItem = require("./ProjectListItem");
var LinkedStateMixin = require('React').addons.LinkedStateMixin;

var ProjectList = React.createClass({
  mixins: [projectsCursor.mixin, StateMixin],
  getInitialState() {
    return {
      page: 1
      
    }
  },
  getList() {
    return this.state.cursor
      .filter(p => !!p.ID)
      .sort((p1, p2) => p1.ID - p2.ID)
      .map(p => <ProjectListItem key={p.ID} project={p} />)
  },
  render() {
    return (
      <div id="ProjectList">
        <
        {this.getList()}
      </div>
    )
  }
});

module.exports = ProjectList;