var projectActions = require("../../actions/projectActions.js");
var ReactPivot = require('react-pivot');
var Router = require('react-router');
var Tree = require("../../stateTree.js");
var React = require('react');

export default React.createClass({
    mixins: [Router.Navigation, Router.State, Tree.mixin],
    cursors: { projects: ['stores', 'projects'] },
    componentWillMount() {
        projectActions.load(this.getParams().ID);
    },
    componentWillReceiveProps() {
        projectActions.load(this.getParams().ID);
    },
    render() {
        var project = this.cursors.projects.select(p => p.ID === this.getParams().ID).get();
        if (!project) {
            return (<span>Loading...</span>);
        };
        var tasks = "";
        /*var dimensions = {
            {value:"Package.Name", title: "Package"}
        };
        if (project.Tasks.length > 0) {
            tasks = "" (<ReactPivot rows={project.Tasks} dimensions={dimensions} />)
        };*/
        return (
            <div>
                <h2>{project.Name}</h2>
                <hr />
                <strong>For customer:</strong>
                <span>{!!project.Customer ? project.Customer.Name : "-"}</span>
                <hr />
                <h3>Tasks</h3>
                {tasks}
            </div>
        );
    }
});
