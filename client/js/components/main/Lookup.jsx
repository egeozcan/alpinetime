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
    lookupID: React.PropTypes.string.isRequired
  },
  shouldComponentUpdate(nextProps) {
    return this.needsUpdate || this.props.lookupID !== nextProps.lookupID;
  },
  render() {
  	var lookup = this.cursors.lookups.get(l => l.ID === this.props.lookupID);
    if (!lookup) {
      this.needsUpdate = true;
      return null;
    }
    this.needsUpdate = false;
    var style = lookup.Color ? { 
      display: "inline-block",
      borderBottom: "1px dotted " + lookup.Color,
      padding: "1px 2px"
    } : {};
    style.whiteSpace = "nowrap";
    var label = lookup.LabelType
      ? (<Label bsStyle={lookup.LabelType || "default"}>{lookup.Value || "-"}</Label>)
      : (<span style={style} className="lookup">{lookup.Value}</span>);
    var description = lookup.Description;
    if(!description) {
      return label;
    }
  	return (
      <OverlayTrigger placement="top" overlay={<Tooltip>{description}</Tooltip>}>
        {label}
      </OverlayTrigger>
    )
  }
});

export default Lookup;