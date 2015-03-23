var React       = require('react');
var PageHeader  = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');
var Titles      = require('./ProjectList.Titles.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;


var ProjectList = React.createClass({
  mixins: [PureRenderMixin],
  render() {
    return (
      <div>
        <PageHeader>Projects</PageHeader>
        <GenericList titles={Titles} storeName="projects" />
      </div>
    )
  }
});

module.exports = ProjectList;