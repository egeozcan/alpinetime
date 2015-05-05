"use strict";

import React from "react";
import {branch} from "baobab-react/higher-order";
var Label = require("react-bootstrap/lib/Label");
var Tooltip = require("react-bootstrap/lib/Tooltip");
var OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");

const Lookup = React.createClass({
    propTypes: {
        lookupID: React.PropTypes.string.isRequired
    },
    shouldComponentUpdate(nextProps) {
        return this.needsUpdate || this.props.lookupID !== nextProps.lookupID;
    },
    render() {
        if (!this.props.lookups) {
            return null;
        }
        var lookup = this.props.lookups.filter(l => l.ID === this.props.lookupID)[0];
        if (!lookup) {
            this.needsUpdate = true;
            return null;
        }
        this.needsUpdate = false;
        var style = {
            display: "inline-block",
            padding: "0 3px",
            fontSize: 11,
            verticalAlign: "middle",
            whiteSpace: "pre-line"
        };
        style.borderBottom = lookup.Color ? "1px dashed " + lookup.Color : undefined;
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
        );
    }
});

export default branch(Lookup, {
    cursors: { lookups: ["stores", "lookups"] }
});