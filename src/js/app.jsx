var React = require('react');

var HelloMessage = React.createClass({
  render() {
  	var styles = {
  		color: this.props.color
  	}
  	return (
	  	<div style={styles}>
	  		Time is {this.props.name}
	  	</div>
  	)
  }
});

setInterval(function () {
	var d = new Date();
	React.render(<HelloMessage color="blue" name={(+d).toString()} />, document.getElementById("main"));
}, 10);