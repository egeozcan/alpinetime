var Baobab = require('baobab');
export default new Baobab({
  stores: {
    projects: [{
      ID: 1,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      DeletedAt: null,
      Name: "Test project 1",
      Customer: {
        Name: "Test customer 1",
        LegacyId: "1112"
      }
    }, {
      ID: 2,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      DeletedAt: null,
      Name: "Test project 2",
      Customer: {
        Name: "Test customer 1",
        LegacyId: "1112"
      }
    }],
    users: []
  },
  //this is the app state, never the component state
  state: {
    activeView: "projects.list",
    isLoading: true,
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