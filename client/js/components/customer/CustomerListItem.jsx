var React = require('react');
var Link = require('react-router').Link;

var CustomerListItem = React.createClass({
  render() {
    var customer = this.props.customer;
    return (
      <tr>
        <td>
          <Link to="customer" params={customer}>
            {customer.Name}
          </Link>
        </td>
        <td>{customer.LegacyId}</td>
      </tr>
    )
  }
});

module.exports = CustomerListItem;