var projectActions = require("../../actions/projectActions.js");
var stateActions = require("../../actions/stateActions.js");
var Router = require('react-router');
var Tree = require("../../stateTree.js");
var React = require('react');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');

export default React.createClass({
    mixins: [Router.Navigation, Router.State, Tree.mixin],
    cursors: { projects: ['stores', 'projects'] },
    taskTitles() {
      return [{name: "Name"}, {name: "Description"}];  
    },
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
        return (
            <div>
                {header}
                <h3>Tasks</h3>
                <GenericList titles={this.taskTitles} itemsInPage={1000} storeName="tasks" filter={t => t.ProjectID === this.getParams().ID} />
            </div>
        );
    }
});
