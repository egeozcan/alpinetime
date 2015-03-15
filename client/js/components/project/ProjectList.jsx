var React           = require('react');
var Router          = require('react-router');
var Table           = require('react-bootstrap/lib/table');
var PageHeader      = require('react-bootstrap/lib/PageHeader');
var Pager           = require('react-bootstrap/lib/Pager');
var PageItem        = require('react-bootstrap/lib/PageItem');
var ProjectListItem = require("./ProjectListItem.jsx");
var Tree            = require("../../stateTree.js");
var ProjectActions  = require("../../actions/projectActions.js");
var StateActions    = require("../../actions/stateActions.js");

const itemsInPage = 20;

var ProjectList = React.createClass({
  mixins: [Tree.mixin, Router.Navigation],
  cursors: { projects: ['stores', 'projects'], query: ['state', 'query'] },
  componentWillMount() {
    ProjectActions.loadList();
  },
  titles: ["Name", "Customer", "Manager", "Description"].map((t,i) => (<th key={i}>{t}</th>)),
  getList() {
    var projects = this.cursors.projects.get()
      .filter(p => !!p.ID)
      .slice((this.page() - 1) * itemsInPage, this.page() * itemsInPage);
    return projects.map(p => {
      return (<ProjectListItem key={p.ID} project={p} />)
    })
  },
  hasNextPage() {
    return this.page() * itemsInPage < this.cursors.projects.get().length;
  },
  page() {
    let res = !this.cursors.query.get().page ? 1 : parseInt(this.cursors.query.get().page || 1);
    return res;
  },
  incPage(e) {
    if (this.hasNextPage()) {
      this.transitionTo(location.pathname, null, {page: this.page() + 1});
    }
    e.preventDefault();
  },
  decPage(e) {
    this.transitionTo(location.pathname, null, {page: Math.max(this.page() - 1, 1)});
    e.preventDefault();
  },
  render() {
    var list = this.getList();
    var header = (<PageHeader>Projects</PageHeader>);
    if (list.length === 0) {
      return (<div>{header}<p>No projects to display.</p></div>)
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
        <Pager>
          <PageItem onClick={this.decPage} disabled={this.page() === 1}>Previous</PageItem>
          <PageItem onClick={this.incPage} disabled={!this.hasNextPage()}>Next</PageItem>
        </Pager>
      </div>
    )
  }
});

module.exports = ProjectList;