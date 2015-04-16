var projectActions = require("../../actions/projectActions.js");
var stateActions = require("../../actions/stateActions.js");
var Router = require('react-router');
var Tree = require("../../stateTree.js");
var React = require('react');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');
var TwoCols       = require('../main/Layout/TwoCols.jsx');

export default React.createClass({
    mixins: [Tree.mixin],
    contextTypes: {
        router: React.PropTypes.func
    },
    cursors: { projects: ['stores', 'projects'], tasks: ['stores', 'tasks'] },
    taskTitles() {
        return [{name: "ID"}, {name: "Name", title: "Task Name"}, {name: "Description", style: {flexGrow: 4}}];  
    },
    packageTitles(data) {
        let projectID = this.context.router.getCurrentParams().ID;
        let tasks = this.cursors.tasks.get().filter(t => t.ProjectID === projectID);
        return [
            {
                name: "Name",
                getter: row => (
                    <div style={{maxWidth: 600, minWidth: 240, whiteSpace: "normal !important"}}>
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
                        itemsInPage={20}
                        containerElement="flex"
                        storeName="tasks"
                        data={tasks}
                        filter={p => p.PackageID === row.ID} />
                )
            }
        ]
    },
    componentWillMount() {
        projectActions.load(this.context.router.getCurrentParams().ID);
    },
    componentWillReceiveProps() {
        projectActions.load(this.context.router.getCurrentParams().ID);
    },
    render() {
        let projectCursor = this.cursors.projects.select(p => p.ID === this.context.router.getCurrentParams().ID);
        let project = projectCursor.get();
        if (!project || project._isLoading === true) {
            return (<span>Loading...</span>);
        };
        let header = (<PageHeader>{project.Name} <small>for {!!project.Customer ? project.Customer.Name : "-"}</small></PageHeader>);
        let projectID = this.context.router.getCurrentParams().ID;
        let Content = (
            <div>
                {header}
                <h3>Packages</h3>
                <GenericList titles={this.packageTitles} removeAllTitles={true} itemsInPage={1000} storeName="packages" filter={p => p.ProjectID === projectID} />
            </div>
        );
        return (<TwoCols Content={Content} Sidebar={<p>Hello World</p>} />)
    }
});
