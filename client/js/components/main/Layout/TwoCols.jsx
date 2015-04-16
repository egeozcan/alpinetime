var React = require('react');
var Grid = require('react-bootstrap/lib/Grid');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

export default React.createClass({
	render() {
		return (
			<Grid fluid role="main">
				<Row>
					<Col md={8} className="content">
						{this.props.Content}
					</Col>
					<Col md={4} className="content">
						{this.props.Sidebar}
					</Col>
				</Row>
			</Grid>
		)
	}
});