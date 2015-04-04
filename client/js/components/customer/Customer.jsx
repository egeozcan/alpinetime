var customerActions = require("../../actions/customerActions.js");
var stateActions = require("../../actions/stateActions.js");
var Router = require('react-router');
var Tree = require("../../stateTree.js");
var React = require('react');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');
var Link        = require('react-router').Link;
var ProjectListTitles = require('../project/ProjectList.Titles.jsx')

export default React.createClass({
    mixins: [Router.Navigation, Router.State, Tree.mixin],
    cursors: { customers: ['stores', 'customers'] },
    componentWillMount() {
        customerActions.load(this.context.router.getCurrentParams().ID);
    },
    componentWillReceiveProps() {
        customerActions.load(this.context.router.getCurrentParams().ID);
    },
    render() {
        let customerCursor = this.cursors.customers.select(p => p.ID === this.context.router.getCurrentParams().ID);
        let customer = customerCursor.get();
        if (!customer || customer._isLoading === true) {
            return (<span>Loading...</span>);
        }
        return (
            <div>
                <PageHeader>{customer.Name}</PageHeader>
                <GenericList titles={ProjectListTitles} hidetitles={["Customer", "Progress"]} storeName="projects" filter={p => p.CustomerID == customer.ID} />
            </div>
        );
    }
});
