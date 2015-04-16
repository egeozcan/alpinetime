var React = require('react');

var logoStyles = {
  maxHeight: 75,
  minHeight: 50
}

export default React.createClass({
  render() {
    return (
      <img src="/public/logo.png" style={logoStyles} className="logo" alt="Alpinetime"/>
    )
  }
});