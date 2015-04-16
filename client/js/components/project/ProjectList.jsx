var React       = require('react');
var PageHeader  = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');
var Titles      = require('./ProjectList.Titles.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var TwoCols       = require('../main/Layout/TwoCols.jsx');


var ProjectList = React.createClass({
  mixins: [PureRenderMixin],
  render() {
    let Content = (
      <div>
        <PageHeader>Projects</PageHeader>
        <GenericList titles={Titles} storeName="projects" />
      </div>
    )
    return (<TwoCols Content={Content} Sidebar={<p>Hellosss World</p>} />)
  }
});

module.exports = ProjectList;