var React           = require('react');
var Router          = require('react-router');
var Table           = require('react-bootstrap/lib/table');
var PageHeader      = require('react-bootstrap/lib/PageHeader');
var Pager           = require('react-bootstrap/lib/Pager');
var PageItem        = require('react-bootstrap/lib/PageItem');
var ProjectListItem = require("./ProjectListItem.jsx");
var Tree            = require("../../stateTree.js");
var ProjectActions  = require("../../actions/projectActions.js");
var StateActions    = require("../../actions/stateActions.js");

var GenericList = React.createClass({
    render() {
        return (<p>Hello World</p>);
    }
});

module.exports = GenericList;