var React           = require('react');
var Table           = require('react-bootstrap/lib/table');
var PageHeader      = require('react-bootstrap/lib/PageHeader');
var projectsCursor  = require("../../stateTree.js").select("stores", "projects");
var ProjectListItem = require("./ProjectListItem.jsx");
var ProjectActions  = require("../../actions/projectActions.js");

var ProjectList = React.createClass({
  mixins: [projectsCursor.mixin],
  getInitialState() {
    return {
      page: 1
    }
  },
  componentWillMount() {
    ProjectActions.loadList();
  },
  titles: ["Name", "Customer", "Manager", "Description"].map(t => (<th>{t}</th>)),
  getList() {
    var projects = this.state.cursor
      .filter(p => !!p.ID)
      .sort((p1, p2) => p1.ID - p2.ID);
    return projects.map(p => <ProjectListItem key={p.ID} project={p} />)
  },
  render() {
    var list = this.getList();
    var header = (<PageHeader>Projects</PageHeader>);
    if (list.length === 0) {
      return (<div>{header}<p>Loading...</p></div>)
    }
    return (
      <div>
        {header}
        <Table responsive hover>
          <thead>
            <tr>
              {this.titles}
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </Table>
      </div>
    )
  }
});

module.exports = ProjectList;