var React       = require('react');
var PageHeader  = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');
var Customers   = require("../../stateTree.js").select(["stores", "customers"]);
var Link        = require('react-router').Link;

var ProjectList = React.createClass({
  titles: [
    { 
      name: "Name",
      getter(row) {
        let params = {ID: row.ID};
        return (<Link to="project" params={params}>{row.Name}</Link>);
      }
    },
    {
      name: "Customer",
      getter(row) { 
        let customer = Customers.get(c => c.ID === row.CustomerID) || {};
        let params = {ID: row.CustomerID};
        return (<Link to="customer" params={params}>{customer.Name || "Loading..."}</Link>)
      }
    },
    { name: "Description" }
  ],
  render() {
    return (
      <div>
        <PageHeader>Projects</PageHeader>
        <GenericList titles={this.titles} storeName="projects" />
      </div>
    )
  }
});

module.exports = ProjectList;