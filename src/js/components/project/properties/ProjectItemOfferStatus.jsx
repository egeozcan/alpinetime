var Label = require('react-bootstrap/Label');

var ProjectItemOfferStatus = React.createClass({
    render() {
    	var statuses = {
    		"concept" : {
    			style: "info",
    			text: "Concept",
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
    			<Tooltip><strong>{status.text}</strong>{status.description}</Tooltip>
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

