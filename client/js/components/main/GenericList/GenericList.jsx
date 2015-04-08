var React                 = require('react');
var Pager                 = require('react-bootstrap/lib/Pager');
var PageItem              = require('react-bootstrap/lib/PageItem');
var Tree                  = require("../../../stateTree.js");
var GenericListPropTypes  = require('./GenericList.PropTypes.js');
var DefaultContainer      = require('./DefaultContainer.jsx');
var FlexContainer         = require('./FlexContainer.jsx');
var PureRenderMixin       = require('react/addons').addons.PureRenderMixin;

var GenericList = React.createClass({
  mixins: [Tree.mixin, PureRenderMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  cursors: { stores: ['stores'], query: ['state', 'query'] },
  propTypes: GenericListPropTypes,
  getDefaultProps() {
    return {
      filterUrlPrefix: "",
      itemsInPage: 10
    }
  },
  getQueryPrefix(prop) {
    return (this.props.queryPrefix || "") + prop;
  },
  getData() {
    let data = this.props.data || this.cursors.stores.select(this.props.storeName).get();
    if (!!this.props.filter) {
      return data.filter(this.props.filter);
    }
    return data;
  },
  getPageData() {
    let allData = this.getData();
    let pageData = allData.slice((this.page() - 1) * this.props.itemsInPage, this.page() * this.props.itemsInPage);
    return { pageData, hasPaging: allData.length > this.props.itemsInPage };
  },
  page() {
    let page = this.cursors.query.get()[this.getQueryPrefix("page")];
    let res = !page ? 1 : parseInt(page || 1);
    return res;
  },
  incPage(e) {
    e.preventDefault();
    if (this.hasNextPage()) {
      let newQuery = Object.assign(this.cursors.query.get(), {[this.getQueryPrefix("page")]: this.page() + 1});
      this.context.router.transitionTo(location.pathname, null, newQuery);
    }
  },
  decPage(e) {
    e.preventDefault();
    var page = this.page() - 1;
    if (page <= 0) {
      return;
    }
    let newQuery = Object.assign(this.cursors.query.get(), {[this.getQueryPrefix("page")]: page})
    this.context.router.transitionTo(location.pathname, null, newQuery);
  },
  hasNextPage() {
    return this.page() * this.props.itemsInPage < this.getData().length;
  },
  render() {
    let Container = this.props.containerElement == "flex" ? FlexContainer : DefaultContainer;
    let data = this.getPageData();
    let pager = "";
    if (data.hasPaging) {
      pager = (
        <Pager>
          <PageItem onClick={this.decPage} disabled={this.page() === 1}>Previous</PageItem>
          <PageItem onClick={this.incPage} disabled={!this.hasNextPage()}>Next</PageItem>
        </Pager>)
    }
    return (
      <Container 
          data={data.pageData}
          titles={this.props.titles}
          removeAllTitles={this.props.removeAllTitles}
          hidetitles={this.props.hidetitles}
          preCalculateForPage={this.props.preCalculateForPage}>
        {pager}
      </Container>
    );
  }
});

module.exports = GenericList;