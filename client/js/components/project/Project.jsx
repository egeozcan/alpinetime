var projectActions = require("../../actions/projectActions.js");
var stateActions = require("../../actions/stateActions.js");
var ReactPivot = require('react-pivot');
var Router = require('react-router');
var Tree = require("../../stateTree.js");
var React = require('react');
var PageHeader = require('react-bootstrap/lib/PageHeader');

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
        var projectCursor = this.cursors.projects.select(p => p.ID === this.getParams().ID);
        var project = projectCursor.get();
        if (!project || project._isLoading === true) {
            return (<span>Loading...</span>);
        };
        var header = (<PageHeader>{project.Name} <small>for {!!project.Customer ? project.Customer.Name : "-"}</small></PageHeader>);
        var tasks = "";
        var dimensions = [
            {value:"Package.Name", title: "Package"}
        ];
        var reduce = (row, memo) => {
            
        }
        if (!!project.Tasks && project.Tasks.length > 0) {
            tasks = "" /*(<ReactPivot rows={project.Tasks} dimensions={dimensions} />)*/
        }
        return (
            <div>
                {header}
                <h3>Tasks</h3>
                {tasks}
            </div>
        );
    }
});
