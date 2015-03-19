var React      = require('react');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');
var Link        = require('react-router').Link;

var CustomerList = React.createClass({
  titles: [
    {
      name: "Name",
      getter(row) {
        let params = {ID: row.ID};
        return (<Link to="customer" params={params}>{row.Name}</Link>);
      }
    },
    {name: "LegacyId"}
  ],
  render() {
    return (
      <div>
        <PageHeader>Customers</PageHeader>
        <GenericList titles={this.titles} storeName="customers" />
      </div>
    )
  }
});

module.exports = CustomerList;