var React = require('react');
var Grid = require('react-bootstrap/lib/Grid');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

function ensureKeys(el) {
	var index = 0;
	if (!Array.isArray(el)) {
		return el;
	}
	return el.map(_el => {
		if(!!_el.key) return _el;
		if (!!_el._isReactElement) return React.cloneElement(_el, { key: index++ });
		return (<div key={index++}>{_el}</div>);
	});
}

export default React.createClass({
	render() {
		return (
			<Grid fluid role="main">
				<Row>
					<Col md={8} className="content">
						{ensureKeys(this.props.Content)}
					</Col>
					<Col md={4} className="content">
						{ensureKeys(this.props.Sidebar)}
					</Col>
				</Row>
			</Grid>
		)
	}
});