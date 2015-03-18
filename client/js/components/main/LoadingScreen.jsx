var React = require('react');
var stateTree = require("../../stateTree.js");

export default React.createClass({
  mixins: [stateTree.mixin],
  cursor: ["state", "numInProgress"],
  render() {
    let numInProgress = this.cursor.get();
    if (numInProgress > 0) {
      return (<div id="loading-screen"><span className="message"></span></div>);
    }
    return (<div></div>);
  }
});