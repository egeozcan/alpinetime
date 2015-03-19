var ContainerPropTypes    = require('./DefaultContainer.PropTypes.js');
var React                 = require('react');
var Table                 = require('react-bootstrap/lib/table');

var DefaultContainer = React.createClass({
  propTypes: ContainerPropTypes,
  render() {
    let Titles = this.props.titles.map(t => (<td key={t.name}>{t.title || t.name}</td>));
    let Rows = this.props.data.map((datarow, i) => {
      let row = this.props.titles.map(t => (<td key={t.name}>{!!t.getter ? t.getter(datarow, t.name) : datarow[t.name]}</td>));
      return (<tr key={i}>{row}</tr>);
    });
    return (
      <div>
        <Table responsive hover>
          <thead>
            <tr>
              {Titles}
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