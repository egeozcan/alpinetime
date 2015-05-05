"use strict";

import React from "react";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";

export default React.createClass({
    render() {
        return (
            <ButtonToolbar className="sidebar-actions island">
                {this.props.children}
            </ButtonToolbar>
        );
    }
});