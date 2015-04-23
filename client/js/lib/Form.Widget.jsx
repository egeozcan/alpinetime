const React = require('react');
const stateTree = require("../stateTree.js");
const TwoCols = require("../components/main/Layout/TwoCols.jsx");
const lookups = stateTree.select("stores", "lookups");

function getOptionsForLookupType(lookupType) {
	return lookups
		.get()
		.filter(l => l.Type === lookupType)
		.map(l =>  [l.ID, l.Value, l.Description]);
}

let EntityFormFields = React.createClass({
	mixins: [stateTree.mixin],
	cursors: { definitions: ["definitions"] },
	render() {
		var entity = this.props.entity;
		var entityDef = this.cursors.definitions.get()[entity];
		if (!entityDef) {
			return null;
		}
		let fields = Object.keys(entityDef).map(prop => {
			return (
				<div key={prop}>
					<h4>{prop}</h4>
					<p>{JSON.stringify(entityDef[prop], null, 2)}</p>
				</div>
			)
		});
		return <div>{fields}</div>
	}
})

export default React.createClass({
	render() {
		let content = <EntityFormFields entity='Package'></EntityFormFields>;
		return <TwoCols Content={content}></TwoCols>
	}
})