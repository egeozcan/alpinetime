var React       = require('react');
var Link = require('react-router').Link;
var Customers   = require("../../stateTree.js").select(["stores", "customers"]);
var Tasks   = require("../../stateTree.js").select(["stores", "tasks"]);
var Progressbar = require('react-bootstrap/lib/Progressbar');

export default function (data) {
  var ids = data.map(d => d.ID);
  var tasks = Tasks.get().filter(t => ids.indexOf(t.ProjectID) >= 0);
  return [
    { 
      name: "Name",
      getter(row) {
        let params = {ID: row.ID};
        return (<strong><Link to="project" params={params}>{row.Name}</Link></strong>);
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
    {
      name: "Tasks",
      getter(row) {
        return tasks.filter(t => t.ProjectID === row.ID).length
      }
    },
    {
      name: "Progress",
      getter() {
        return (<Progressbar now={Math.random() * 100} label="%(percent)s%" />);
      }
    },
    { name: "Description" }
  ];
}