var React = require('react');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');

export default React.createClass({
  render() {
    return (
      <ButtonToolbar className="sidebar-actions island">
        {this.props.children}
      </ButtonToolbar>
    )
  }
});