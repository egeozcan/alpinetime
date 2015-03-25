var projectActions = require("../../actions/projectActions.js");
var stateActions = require("../../actions/stateActions.js");
var Router = require('react-router');
var Tree = require("../../stateTree.js");
var React = require('react');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');

export default React.createClass({
    mixins: [Router.Navigation, Router.State, Tree.mixin],
    cursors: { projects: ['stores', 'projects'], tasks: ['stores', 'tasks'] },
    taskTitles() {
        return [{name: "ID"}, {name: "Name"}, {name: "Description"}];  
    },
    packageTitles(data) {
        let projectID = this.getParams().ID;
        let tasks = this.cursors.tasks.get().filter(t => t.ProjectID === projectID);
        return [
            {
                name: "Name",
                getter: row => (
                    <div style={{maxWidth: 300, whiteSpace: "normal !important"}}>
                        <p>{row.Name}</p>
                        <p>{row.Description}</p>
                    </div>
                )
            },
            {
                name: "Tasks",
                getter: row => (
                    <GenericList 
                        queryPrefix={"ptlist" + row.ID}
                        titles={this.taskTitles}
                        noHeader={true}
                        itemsInPage={20}
                        storeName="tasks"
                        data={tasks}
                        filter={p => p.PackageID === row.ID} />
                )
            }
        ]
    },
    componentWillMount() {
        projectActions.load(this.getParams().ID);
    },
    componentWillReceiveProps() {
        projectActions.load(this.getParams().ID);
    },
    render() {
        let projectCursor = this.cursors.projects.select(p => p.ID === this.getParams().ID);
        let project = projectCursor.get();
        if (!project || project._isLoading === true) {
            return (<span>Loading...</span>);
        };
        let header = (<PageHeader>{project.Name} <small>for {!!project.Customer ? project.Customer.Name : "-"}</small></PageHeader>);
        let projectID = this.getParams().ID;
        return (
            <div>
                {header}
                <h3>Tasks</h3>
                <GenericList titles={this.packageTitles} itemsInPage={1000} storeName="packages" filter={p => p.ProjectID === projectID} />
            </div>
        );
    }
});
