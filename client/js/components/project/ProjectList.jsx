var projectsCursor = require("../../stateTree.js")
  .select("stores", "projects");
var StateMixin = require('react-router').State;
var ProjectListItem = require("./ProjectListItem.jsx");
var React = require('react');
var Table = require('react-bootstrap/lib/table');

var ProjectList = React.createClass({
  mixins: [projectsCursor.mixin, StateMixin],
  getInitialState() {
    return {
      page: 1
    }
  },
  getList() {
    var projects = this.state.cursor
      .filter(p => !!p.ID)
      .sort((p1, p2) => p1.ID - p2.ID);
    return projects.map(p => <ProjectListItem key={p.ID} project={p} />)
  },
  componentWillReceiveProps() {
    
  },
  render() {
    return (
      <Table id="Projects">
        <thead>
          <tr>
            <th>Name</th>
            <th>Customer</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.getList()}
        </tbody>
      </Table>
    )
  }
});

module.exports = ProjectList;