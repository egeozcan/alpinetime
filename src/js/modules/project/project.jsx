var ProjectSummary = require('./project-summary.jsx');

var Project = React.createClass({
    render() {
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});

