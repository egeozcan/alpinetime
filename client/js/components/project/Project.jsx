var projectActions = require("../../actions/projectActions.js");
var ReactPivot = require('react-pivot');

var Project = React.createClass({
    render() {
        var project = this.props.project;
        var tasks;
        var dimensions = {
            {value:"Package.Name", title: "Package"}
        };
        if (project.Tasks.length > 0) {
            tasks = (<ReactPivot rows={project.Tasks} dimensions={dimensions} />
        };
        return (
            <div>
                <h2>{project.Name}</h2>
                <hr />
                <strong>For customer:</strong>
                <span>{project.Customer.Name}</span>
            </div>
        );
    }
});
