var ContainerPropTypes = require('./GenericContainer.PropTypes.js');
var React = require('react');

export default {
  titles: ContainerPropTypes.titles,
  data: ContainerPropTypes.data,
  containerElement: React.PropTypes.func,
  filter: React.PropTypes.func,
  sort: React.PropTypes.func,
  filterUrlPrefix: React.PropTypes.string,
  storeName: React.PropTypes.string.isRequired,
  itemsInPage: React.PropTypes.number,
  queryPrefix: React.PropTypes.string
}