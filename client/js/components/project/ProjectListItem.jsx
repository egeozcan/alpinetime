var ProjectListItem = React.createClass({
  render() {
    return (
      <li>
        <h2>{this.props.project.Name}</h2>
        <p>{this.props.project.Description}</p>
      </li>
    )
  }
});

module.exports = ProjectListItem;