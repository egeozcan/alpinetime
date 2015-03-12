var projectsCursor = require("../../stateTree.js")
  .select("stores", "projects");
var ProjectListItem = require("./ProjectListItem.jsx");
var React = require('react');
var Table = require('react-bootstrap/lib/table');
var projectActions = require("../../actions/projectActions.js");

var ProjectList = React.createClass({
  mixins: [projectsCursor.mixin],
  getInitialState() {
    return {
      page: 1
    }
  },
  componentWillMount() {
    projectActions.loadList();
  },
  getList() {
    var projects = this.state.cursor
      .filter(p => !!p.ID)
      .sort((p1, p2) => p1.ID - p2.ID);
    return projects.map(p => <ProjectListItem key={p.ID} project={p} />)
  },
  render() {
    var list = this.getList();
    if (list.length === 0) {
      return (<div>Nope.</div>)
    }
    return (
      <Table id="Projects">
        <thead>
          <tr>
            <th>Name</th>
            <th>Customer</th>
            <th>Manager</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </Table>
    )
  }
});

module.exports = ProjectList;