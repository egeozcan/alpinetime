var projectActions = require("../../actions/projectActions.js");
var stateActions = require("../../actions/stateActions.js");
var Router = require('react-router');
var Tree = require("../../stateTree.js");
var React = require('react');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');
var TwoCols       = require('../main/Layout/TwoCols.jsx');
var Lookup = require('../main/Lookup.jsx');
var Button  = require('react-bootstrap/lib/Button');
var SidebarActions = require('../main/SidebarActions.jsx');
var Glyphicon  = require('react-bootstrap/lib/Glyphicon');
var Modal  = require('react-bootstrap/lib/Modal');
var Input  = require('react-bootstrap/lib/Input');
var Button  = require('react-bootstrap/lib/Button');

export default React.createClass({
    mixins: [Tree.mixin],
    contextTypes: {
        router: React.PropTypes.func
    },
    getDefaultState() {
        return {
            dialogPackageCreateActive: false
        }
    },
    cursors: { projects: ['stores', 'projects'], tasks: ['stores', 'tasks'] },
    taskTitles: [
        {name: "Name"},
        {name: "Status", getter(row) { return (<Lookup lookupID={row.TaskStatusID} />) }},
        {name: "Category", getter(row) { return (<Lookup lookupID={row.TaskCategoryID} />) }},
        {name: "Priority", getter(row) { return (<Lookup lookupID={row.TaskPriorityID} />) }},
        {name: "Description"}
    ],
    packageTitles(data) {
        let projectID = this.context.router.getCurrentParams().ID;
        let tasks = this.cursors.tasks.get().filter(t => t.ProjectID === projectID);
        return [
            {
                name: "Name",
                getter: row => [
                    <h4 key="pname">{row.Name}</h4>,
                    <p key="pdesc">{row.Description}</p>
                ]
            },
            {
                name: "Tasks",
                getter: row => (
                    <GenericList
                        queryPrefix={"ptlist" + row.ID}
                        titles={() => this.taskTitles}
                        itemsInPage={20}
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
    addPackage() {
        let projectCursor = this.cursors.projects.select(p => p.ID === this.context.router.getCurrentParams().ID);
        let project = projectCursor.get();
        let name = this.refs["PackageName"].getValue();
        let desc = this.refs["PackageDesc"].getValue();
        if (!name) {
            return;
        }
        projectActions.addPackage(project, name, desc);
        this.setState({dialogPackageCreateActive: false});
    },
    render() {
        let projectCursor = this.cursors.projects.select(p => p.ID === this.context.router.getCurrentParams().ID);
        let project = projectCursor.get();
        if (!project || project._isLoading === true) {
            return false;
        };
        let projectID = this.context.router.getCurrentParams().ID;
        let Content = [
            (
                <PageHeader>
                    {project.Name}
                    <small> for <Router.Link to="customer" params={{ID: project.CustomerID}}>{!!project.Customer ? project.Customer.Name : "-"}</Router.Link></small>
                </PageHeader>
            ),
            <h3>Packages</h3>,
            <GenericList 
                titles={this.packageTitles}
                containerElement="list"
                removeAllTitles={true}
                itemsInPage={1000}
                storeName="packages"
                filter={p => p.ProjectID === projectID} />,
            this.state.dialogPackageCreateActive
                ? (
                    <Modal onRequestHide={() => this.setState({dialogPackageCreateActive: false})}>
                        <div className="modal-body" action="#">
                            <Input ref="PackageName" type="text" label="Name" />
                            <Input ref="PackageDesc" type="textarea" label="Description" />
                        </div>
                        <div className="modal-footer">
                            <Button onClick={this.addPackage} bsStyle="primary">Save</Button>
                        </div>
                    </Modal>
                )
                : false
        ];
        let Sidebar = [
            <SidebarActions>
                <Button href="#" block onClick={(e) => { e.preventDefault(); this.setState({dialogPackageCreateActive: true})}}>
                    <Glyphicon glyph='plus'/> Add a package
                </Button>
                <Button href="#" block><Glyphicon glyph='star'/> Add project to favorites</Button>
            </SidebarActions>
        ];
        return (<TwoCols Content={Content} Sidebar={Sidebar} />)
    }
});
