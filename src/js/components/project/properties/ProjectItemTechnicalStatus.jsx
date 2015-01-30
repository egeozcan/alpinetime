var React = require('react');
var Label = require('react-bootstrap/Label');
var Tooltip = require('react-bootstrap/Tooltip');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');

export default React.createClass({
    render() {
    	var statuses = {
    		"unknown" : {
    			style: "warning",
    			text: "Unknown",
    			description: "The implementation details haven't been decided yet."
            },
    		"blocked" : { 
    			style: "danger",
    			text: "Blocked",
    			description: "The implementation isn't possible because of blocking issues in the standard." + 
                    " An estimation can't be done."
    		},
            "experimental" : {
                style: "warning",
                text: "Experimental",
                description: "Something like this is never done before." + 
                    " There may be yet unknown problems when developing this.",
            },
            "trivial" : {
                style: "info",
                text: "Trivial",
                description: "There is already a similar implementation and/or" +
                    " it is very clear, how to develop this feature."
            },
            "done" : {
                style: "success",
                text: "Done",
                description: "Feature already exists. It just needs to be enabled."
            }
    	}
    	var status = statuses[this.props.statusKey];
    	if (!!status) {
    		var tooltip = (
    			<Tooltip><strong>{status.text}</strong>: {status.description}</Tooltip>
    		);
    		return (
    			<OverlayTrigger placement="top" overlay={tooltip}>
    				<Label bsStyle={status.style}>{status.text}</Label>
    			</OverlayTrigger>
	        );
    	}
    	return (
    		<Label>{this.props.statusKey}</Label>
    	);
    }
});