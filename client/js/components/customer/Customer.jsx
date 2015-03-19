var customerActions = require("../../actions/customerActions.js");
var stateActions = require("../../actions/stateActions.js");
var ReactPivot = require('react-pivot');
var Router = require('react-router');
var Tree = require("../../stateTree.js");
var React = require('react');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var GenericList = require('../main/GenericList/GenericList.jsx');
var Link        = require('react-router').Link;

export default React.createClass({
    mixins: [Router.Navigation, Router.State, Tree.mixin],
    cursors: { customers: ['stores', 'customers'] },
    componentWillMount() {
        customerActions.load(this.getParams().ID);
    },
    componentWillReceiveProps() {
        customerActions.load(this.getParams().ID);
    },
    render() {
        var customerCursor = this.cursors.customers.select(p => p.ID === this.getParams().ID);
        var customer = customerCursor.get();
        if (!customer || customer._isLoading === true) {
            return (<span>Loading...</span>);
        }
        return (
            <div>
                <PageHeader>{customer.Name}</PageHeader>
                <GenericList titles={[{name: "Name"}, {name: "Description"}]} storeName="projects" filter={p => p.CustomerID == customer.ID} />
            </div>
        );
    }
});
