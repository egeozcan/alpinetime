var Baobab = require('baobab');
export default new Baobab({
  stores: {
    projects: [],
    tasks: [],
    packages: [],
    users: []
  },
  //this is the app state, never the component state
  state: {
    numInProgress: 0,
    views: {
      projects: {
        list: {
          query: {}
        },
        details: {
          project: {}
        }
      }
    }
  }
});