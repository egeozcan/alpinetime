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

var DefaultContainer = React.createClass({
  let Titles = this.props.titles
  render() {
    return (
      <Table>
        <thead>
          
        </thead>
      </Table>
    );
  }
});

var DefaultItem = React.createClass({
  render() {
    return <div></div>
  }
});

var GenericList = React.createClass({
  mixins: [Tree.mixin, Router.Navigation],
  cursors: { stores: ['stores'], query: ['state', 'query'] },
  propTypes:{
    titles: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string,
        titleElement: React.PropTypes.element
      })
    ),
    itemElement: React.PropTypes.element,
    containerElement: React.PropTypes.element
  },
  getDefaultProps() {
    return {
      itemElement: DefaultItem,
      containerElement: DefaultContainer
    }
  },
  render() {
    let Container = this.props.containerElement;
    let Item = this.props.itemElement;
    return (
      
    );
  }
});

module.exports = GenericList;