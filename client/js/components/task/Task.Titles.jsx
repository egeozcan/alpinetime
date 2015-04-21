var React = require('react');
var Lookup = require('../main/Lookup.jsx');

export default function() {
	return [
		{name: "Name"},
		{name: "Status", getter(row) { return (<Lookup lookupID={row.TaskStatusID} />) }},
		{name: "Category", getter(row) { return (<Lookup lookupID={row.TaskCategoryID} />) }},
		{name: "Priority", getter(row) { return (<Lookup lookupID={row.TaskPriorityID} />) }},
		{name: "Description"}
	];
}