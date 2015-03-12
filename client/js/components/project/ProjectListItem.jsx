var React = require('react');
var Link = require('react-router').Link;

var ProjectListItem = React.createClass({
  render() {
    var project = this.props.project;
    var customer = project.Customer === null ? "-" : "some customer";
    return (
      <tr>
        <td>
          <Link to="project" params={project}>
            {project.Name}
          </Link>
        </td>
        <td>{customer}</td>
        <td>{project.Description}</td>
      </tr>
    )
  }
});

module.exports = ProjectListItem;