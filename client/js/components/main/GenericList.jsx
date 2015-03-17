var React           = require('react');
var Router          = require('react-router');
var Table           = require('react-bootstrap/lib/table');
var PageHeader      = require('react-bootstrap/lib/PageHeader');
var Pager           = require('react-bootstrap/lib/Pager');
var PageItem        = require('react-bootstrap/lib/PageItem');
var Tree            = require("../../stateTree.js");
var StateActions    = require("../../actions/stateActions.js");
var Pager           = require('react-bootstrap/lib/Pager');
var PageItem        = require('react-bootstrap/lib/PageItem');

var DefaultContainer = React.createClass({
  render() {
    let Titles = this.props.titles.map(t => (<td key={t.name}>{t.title || t.name}</td>));
    let Rows = this.props.data.map((datarow, i) => {
      let row = this.props.titles.map(t => (<td key={t.name}>{datarow[t.name]}</td>));
      return (<tr key={i}>{row}</tr>);
    });
    return (
      <div>
        <Table>
          <thead>
            <tr>
              {Titles}
            </tr>
          </thead>
          <tbody>
            {Rows}
          </tbody>
        </Table>
        {this.props.children}
      </div>
    );
  }
});

var GenericList = React.createClass({
  mixins: [Tree.mixin, Router.Navigation],
  cursors: { stores: ['stores'], query: ['state', 'query'] },
  propTypes:{
    titles: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string,
        title: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.element,
        ])
      }).isRequired
    ),
    containerElement: React.PropTypes.element,
    filterUrlPrefix: React.PropTypes.string,
    storeName: React.PropTypes.string,
    itemsInPage: React.PropTypes.number
  },
  getDefaultProps() {
    return {
      containerElement: DefaultContainer,
      filterUrlPrefix: "",
      storeName: "projects",
      itemsInPage: 20
    }
  },
  getData() {
    return this.cursors.stores.select(this.props.storeName).get().filter(d => !!d.ID)
  },
  getListedData() {
    let data = this.getData().slice((this.page() - 1) * this.props.itemsInPage, this.page() * this.props.itemsInPage);
    return data;
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
  hasNextPage() {
    return this.page() * this.props.itemsInPage < this.getData().length;
  },
  render() {
    let Container = this.props.containerElement;
    let titles = this.props.titles;
    return (
      <Container data={this.getListedData()} titles={titles}>
        <Pager>
          <PageItem onClick={this.decPage} disabled={this.page() === 1}>Previous</PageItem>
          <PageItem onClick={this.incPage} disabled={!this.hasNextPage()}>Next</PageItem>
        </Pager>
      </Container>
    );
  }
});

module.exports = GenericList;