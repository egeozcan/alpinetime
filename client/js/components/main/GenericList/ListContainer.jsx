var React                 = require('react');
var PureRenderMixin       = require('react/addons').addons.PureRenderMixin;

var ListContainer = React.createClass({
  mixins: [PureRenderMixin],
  render() {
    let titles = this.props.titles(this.props.data)
      .filter((title) => !this.props.hidetitles || this.props.hidetitles.indexOf(title.name) === -1);

    let Rows = this.props.data
      .map((datarow, i) => {
        let Row = titles.map(t => {

          return (<div key={t.name} style={t.style}>
            {!!t.getter ? t.getter(datarow, i) : datarow[t.name]}
          </div>);
        });
        return (
          <li key={i}>
            {Row}
          </li>);
      });
    
    return (
      <div>
      
        <ul className="list-container">
          {Rows}
        </ul>
        
        {this.props.children}
      </div>
    );
  }
});

module.exports = ListContainer;