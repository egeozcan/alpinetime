var React      = require('react');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');
var Link        = require('react-router').Link;
var ProjectStore = require('../../stateTree.js').select(["stores", "projects"]);

var CustomerList = React.createClass({
  titles: [
    {
      name: "Name",
      getter(row) {
        let params = {ID: row.ID};
        return (<Link to="customer" params={params}>{row.Name}</Link>);
      }
    },
    {name: "LegacyId"},
    {
      name: "Number of Projects",
      getter(row, i) {
        return row.ID
      }
    }
  ],
  render() {
    let preCalculateForPage = pageData => {
      let ids = pageData.map(pd => pd.ID);
      return ProjectStore.get().filter(p => ids.indexOf(p.CustomerID) >= 0);
    }
    return (
      <div>
        <PageHeader>Customers</PageHeader>
        <GenericList titles={this.titles} preCalculateForPage={preCalculateForPage} storeName="customers" />
      </div>
    )
  }
});

module.exports = CustomerList;