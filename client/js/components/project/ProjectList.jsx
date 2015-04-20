var React       = require('react');
var PageHeader  = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');
var Titles      = require('./ProjectList.Titles.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var TwoCols       = require('../main/Layout/TwoCols.jsx');


var ProjectList = React.createClass({
  mixins: [PureRenderMixin],
  render() {
    let Content = [
      <PageHeader>Projects</PageHeader>,
      <GenericList titles={Titles} storeName="projects" />
    ];
    let Sidebar = [
      /* Filters will come here */
    ]
    return (<TwoCols Content={Content} Sidebar={Sidebar} />)
  }
});

module.exports = ProjectList;