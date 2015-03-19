var React                 = require('react');
var Router                = require('react-router');
var Pager                 = require('react-bootstrap/lib/Pager');
var PageItem              = require('react-bootstrap/lib/PageItem');
var Tree                  = require("../../../stateTree.js");
var GenericListPropTypes  = require('./DefaultContainer.PropTypes.js');
var DefaultContainer      = require('./DefaultContainer.jsx');

var GenericList = React.createClass({
  mixins: [Tree.mixin, Router.Navigation],
  cursors: { stores: ['stores'], query: ['state', 'query'] },
  propTypes: GenericListPropTypes,
  getDefaultProps() {
    return {
      containerElement: DefaultContainer,
      filterUrlPrefix: "",
      itemsInPage: 20
    }
  },
  getData() {
    let data = this.cursors.stores.select(this.props.storeName).get();
    if (!!this.props.filter) {
      return data.filter(this.props.filter);
    }
    return data;
  },
  getPageData() {
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
    let data = this.props.data || this.getPageData();
    return (
      <Container data={data} titles={titles}>
          <Pager className={data.length > 0 ? "" : "hidden"}>
            <PageItem onClick={this.decPage} disabled={this.page() === 1}>Previous</PageItem>
            <PageItem onClick={this.incPage} disabled={!this.hasNextPage()}>Next</PageItem>
          </Pager>
      </Container>
    );
  }
});

module.exports = GenericList;