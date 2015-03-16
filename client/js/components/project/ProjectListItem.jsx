var React = require('react');
var Link = require('react-router').Link;

var ProjectListItem = React.createClass({
  render() {
    var project = this.props.project;
    return (
      <tr>
        <td>
          <Link to="project" params={project}>
            {project.Name}
          </Link>
        </td>
        <td>
          <Link to="customer" params={project.Customer}>
            {project.Customer.Name}
          </Link>
        </td>
        <td>{project.Manager.Name}</td>
        <td>{project.Description}</td>
      </tr>
    )
  }
});

module.exports = ProjectListItem;