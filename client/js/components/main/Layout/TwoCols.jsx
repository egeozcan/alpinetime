var React = require('react');

export default React.createClass({
	render() {
		return (
			<div className="container-fluid application" role="main">
				<div className="row">
					<div id="main" className="col-md-8 content">
						{this.props.Content}
					</div>
					<div className="col-md-4 content">
						{this.props.Sidebar}
					</div>
				</div>
			</div>
		)
	}
});