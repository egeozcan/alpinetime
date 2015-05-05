"use strict";

import React from "react";
import PropTypes from "baobab-react/prop-types";
import {branch} from "baobab-react/higher-order";

let LoadingScreen = React.createClass({
    static: {
        contextTypes: {
           tree: PropTypes.baobab,
           cursors: PropTypes.cursors
       }
    },
    render() {
        let numInProgress = this.props.inProgress;
        if (numInProgress > 0) {
            return (<div id="loading-screen"><span className="message"></span></div>);
        }
        return false;
    }
});

export default LoadingScreen;

export default branch(LoadingScreen, {
  cursors: {
    inProgress: ["state", "numInProgress"]
  }
});