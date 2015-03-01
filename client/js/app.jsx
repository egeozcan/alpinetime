var React = require('react');
var stateTree = require("./stateTree.js");
window.stateTree = stateTree;

var projects = [{
  Name: "Test1",
  Start: new Date(),
  Deadline: new Date(),
  Packages: [{
    Name: "Package1",
    Start: new Date(),
    Category: "Cat1",
    Tasks: [{
        Description: "do stuff",
        Category: "TaskCat1",
        Estimation: 8,
        AssignedTo: "ege.ozcan",
        EstimatedBy: "ege.ozcan",
        Tags: ["testTag", "testTag2"],
        Status: "Released"
    },
    {
      Description: "do other stuff",
      Category: "TaskCat2",
      Estimation: 8,
      AssignedTo: "ege.ozcan",
      EstimatedBy: "ege.ozcan",
      Tags: ["testTag", "testTag2"],
      Status: "Released"
    }]
  }]
}]

var HelloMessage = React.createClass({
  render() {
  	return (
	  	<span>Hello World</span>
  	)
  }
});

React.render(<HelloMessage />, document.getElementById("main"));