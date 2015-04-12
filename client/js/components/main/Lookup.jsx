var React = require('react');
var Label = require('react-bootstrap/lib/Label');
var stateTree = require("../../stateTree.js");

const Lookup = React.createClass({
  mixins: [stateTree.mixin],
  cursors: {
  	lookups: ["stores", "lookups"]
  },
  propTypes: {
    editable: React.propTypes.bool
  },
  getDefaultProps() {
    return {
      LabelType: "default"
    }
  },
  render() {
  	var lookup = this.cursors.lookups.get(function(lookup) {
	  return lookup.ID === "4" || lookup.ID === "5"
	})
  	<Label bsStyle={lookup.LabelType || "default"}>lookup.Value</Label>
  }
});

export default Field;