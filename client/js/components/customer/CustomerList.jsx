var React         = require('react');
var PageHeader    = require('react-bootstrap/lib/PageHeader');
var GenericList   = require('../main/GenericList/GenericList.jsx');
var TwoCols       = require('../main/Layout/TwoCols.jsx');
var Link          = require('react-router').Link;
var ProjectStore  = require('../../stateTree.js').select(["stores", "projects"]);

var CustomerList = React.createClass({
  titles(data) {
    let ids = data.map(pd => pd.ID);
    var projects = ProjectStore.get().filter(p => ids.indexOf(p.CustomerID) >= 0);
    return [
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
          return projects.filter(p => p.CustomerID === row.ID).length;
        }
      }
    ];
  },
  render() {
    let Content = [
        <PageHeader>Customers</PageHeader>,
        <GenericList titles={this.titles} storeName="customers" />
    ]
    return (<TwoCols Content={Content} Sidebar={<p>Hello World</p>} />)
  }
});

module.exports = CustomerList;