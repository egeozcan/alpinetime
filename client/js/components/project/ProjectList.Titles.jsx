var React       = require('react');
var Link = require('react-router').Link;
var Customers   = require("../../stateTree.js").select(["stores", "customers"]);
var Tasks   = require("../../stateTree.js").select(["stores", "tasks"]);
var Progressbar = require('react-bootstrap/lib/Progressbar');

export default function (data) {
  return [
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
    {
      name: "Tasks",
      getter(row) {
        return ""
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