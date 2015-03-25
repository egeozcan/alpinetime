var ContainerPropTypes    = require('./GenericContainer.PropTypes.js');
var React                 = require('react');
var Table                 = require('react-bootstrap/lib/table');
var PureRenderMixin       = require('react/addons').addons.PureRenderMixin;

var DefaultContainer = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: ContainerPropTypes,
  render() {
    let titles = this.props.titles(this.props.data)
      .filter((title) => !this.props.hidetitles || this.props.hidetitles.indexOf(title.name) === -1);
    let TableTitles = titles.map(t => (<th key={t.name}>{t.title || t.name}</th>));
    let Rows = this.props.data
      .map((datarow, i) => {
        let row = titles.map(t => (<td key={t.name}>{!!t.getter ? t.getter(datarow, i) : datarow[t.name]}</td>));
        return (<tr key={i}>{row}</tr>);
      });
    return (
      <div>
        <Table responsive hover>
          <thead>
            <tr>
              {TableTitles}
            </tr>
          </thead>
          <tbody>
            {Rows}
          </tbody>
        </Table>
        {this.props.children}
      </div>
    );
  }
});

module.exports = DefaultContainer;