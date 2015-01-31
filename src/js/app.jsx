var React = require('react');
var Table = require('react-bootstrap/Table');
var ProjectItemConceptStatus = require("./components/project/properties/ProjectItemConceptStatus.jsx")
var ProjectItemTechnicalStatus = require("./components/project/properties/ProjectItemTechnicalStatus.jsx")

var projects = [
  {
    Name: "Test1",
    Start: new Date(),
    Deadline: new Date(),
    Packages: [
      {
        Name: "Package1",
        Start: new Date(),
        Category: "Cat1",
        Tasks: [
          {
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
          }
        ]
      }
    ]
  }
]

var HelloMessage = React.createClass({
  render() {
  	return (
	  	<div>
        <h3>Estimation for ACME - Blah</h3>
        <Table responsive condensed>
          <thead>
            <tr>
              <th>Concept</th>
              <th>Technical</th>
              <th>Blocked By</th>
              <th>BugId</th>
              <th>Description</th>
              <th>Estimation</th>
              <th>Responsible</th>
              <th>Is Standard</th>
              <th>Package</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ProjectItemConceptStatus statusKey="accepted" />
              </td>
              <td>
                <ProjectItemTechnicalStatus statusKey="trivial" />
              </td>
              <td>-</td>
              <td>13356</td>
              <td>Besuch: Ausdruckbar und möglicherweise mehr Infos für Topics</td>
              <td>8</td>
              <td>Ege Özcan</td>
              <td>No</td>
              <td>1</td>
              <td>Add a details and a print view to the visits. (Standard, do in a fb)</td>
            </tr>
            <tr>
              <td>
                <ProjectItemConceptStatus statusKey="rejected" />
              </td>
              <td>
                <ProjectItemTechnicalStatus statusKey="trivial" />
              </td>
              <td>-</td>
              <td>13356</td>
              <td>Besuch: Ausdruckbar und möglicherweise mehr Infos für Topics</td>
              <td>8</td>
              <td>Ege Özcan</td>
              <td>No</td>
              <td>1</td>
              <td>Add a details and a print view to the visits. (Standard, do in a fb)</td>
            </tr>
          </tbody>
        </Table>
      </div>
  	)
  }
});

React.render(<HelloMessage />, document.getElementById("main"));