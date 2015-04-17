var React       = require('react');
var PageHeader  = require('react-bootstrap/lib/PageHeader');
var Glyphicon  = require('react-bootstrap/lib/Glyphicon');
var Button  = require('react-bootstrap/lib/Button');
var SidebarActions = require('../main/SidebarActions.jsx');
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
      <SidebarActions>
        <Button href="#" block><Glyphicon glyph='plus'/> Add a package</Button>
        <Button href="#" block><Glyphicon glyph='plus'/> Add a package</Button>
      </SidebarActions>
    ]
    return (<TwoCols Content={Content} Sidebar={Sidebar} />)
  }
});

module.exports = ProjectList;