var React = require('react');
var Label = require('react-bootstrap/lib/Label');
var Tooltip = require('react-bootstrap/lib/Tooltip');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

export default React.createClass({
    render() {
        var statuses = {
            "progress" : {
                style: "info",
                text: "Progress",
                description: "The item is yet in the concept phase."
                 + " Description and estimation can still change." },
            "offered" : { 
                style: "primary",
                text: "Offered",
                description: "The item has been offered to the customer."
            },
            "accepted" : {
                style: "success",
                text: "Accepted",
                description: "The concept has been accepted by the customer."
            },
            "rejected" : {
                style: "danger",
                text: "Rejected",
                description: "The concept has been rejected by the customer."
                 + " Not included in the total estimation."
            }
        }
        var status = statuses[this.props.statusKey];
        if (!!status) {
            var tooltip = (
                <Tooltip><strong>{status.text}</strong>: {status.description}</Tooltip>
            );
            return (
                <OverlayTrigger placement="right" overlay={tooltip}>
                    <Label bsStyle={status.style}>{status.text}</Label>
                </OverlayTrigger>
            );
        }
        return (
            <Label>{this.props.statusKey}</Label>
        );
    }
});