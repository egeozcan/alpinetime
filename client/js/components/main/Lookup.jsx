var React = require('react');
var Label = require('react-bootstrap/lib/Label');
var Tooltip = require('react-bootstrap/lib/Tooltip');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var stateTree = require("../../stateTree.js");

const Lookup = React.createClass({
  mixins: [stateTree.mixin],
  cursors: {
  	lookups: ["stores", "lookups"]
  },
  propTypes: {
    editable: React.propTypes.bool,
    lookupID: React.propTypes.string.required,
    type: React.propTypes.string
  },
  getDefaultProps() {
    return {
      editable: false
    }
  },
  render() {
  	var lookup = this.cursors.lookups.get(l => l.ID === this.props.lookupID);
    var tooltip = (
      <Tooltip>{lookup.description}</Tooltip>
    );
  	return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <Label bsStyle={lookup.LabelType || "default"}>lookup.Value</Label>
      </OverlayTrigger>
    )
  }
});

export default Lookup;