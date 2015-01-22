var ProjectSummary = React.createClass({
    render() {
        var tagList = this.props.tags || [];
        var tags = tagList.map(tag => <li class="tag"><span>{tag}</span></li>)
        return (
            <h3>{this.props.name}</h3>
            <ul>{tags}</ul>
        );
    }
});