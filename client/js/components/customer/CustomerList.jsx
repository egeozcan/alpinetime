var React           = require('react');
var Router          = require('react-router');
var Table           = require('react-bootstrap/lib/table');
var PageHeader      = require('react-bootstrap/lib/PageHeader');
var Pager           = require('react-bootstrap/lib/Pager');
var PageItem        = require('react-bootstrap/lib/PageItem');
var CustomerListItem = require("./CustomerListItem.jsx");
var Tree            = require("../../stateTree.js");
var CustomerActions  = require("../../actions/customerActions.js");
var StateActions    = require("../../actions/stateActions.js");

const itemsInPage = 20;

var CustomerList = React.createClass({
  mixins: [Tree.mixin, Router.Navigation],
  cursors: { customers: ['stores', 'customers'], query: ['state', 'query'] },
  componentWillMount() {
    CustomerActions.loadList();
  },
  titles: ["Name", "LegacyId"].map((t,i) => (<th key={i}>{t}</th>)),
  getList() {
    var customers = this.cursors.customers.get()
      .filter(p => !!p.ID)
      .slice((this.page() - 1) * itemsInPage, this.page() * itemsInPage);
    return customers.map(p => {
      return (<CustomerListItem key={p.ID} customer={p} />)
    })
  },
  hasNextPage() {
    return this.page() * itemsInPage < this.cursors.customers.get().length;
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
    var header = (<PageHeader>Customers</PageHeader>);
    if (list.length === 0) {
      return (<div>{header}<p>No customers to display.</p></div>)
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

module.exports = CustomerList;