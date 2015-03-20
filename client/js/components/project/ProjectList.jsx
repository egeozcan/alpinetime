var React       = require('react');
var PageHeader  = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');
var Titles      = require('./ProjectList.Titles.jsx');


var ProjectList = React.createClass({
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