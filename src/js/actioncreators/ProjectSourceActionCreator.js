var Marty = require('marty');
var ProjectConstants = require('../constants/ProjectConstants');

var ProjectSourceActionCreator = Marty.createActionCreators({
    receiveProject: ProjectConstants.PROJECT_RECEIVE
});