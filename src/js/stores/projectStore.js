var Marty = require('marty');
var extend = require('lodash-node/modern/objects/assign');
var ProjectConstants = require('../constants/ProjectConstants');

export default Marty.createStore({
    displayName: 'Projects',
    handlers: {
        create: ProjectConstants.PROJECT_CREATE,
        complete: ProjectConstants.PROJECT_COMPLETE,
        destroy: ProjectConstants.PROJECT_DESTROY,
        destroyCompleted: ProjectConstants.PROJECT_DESTROY_COMPLETED,
        undoComplete: ProjectConstants.PROJECT_UNDO_COMPLETE,
        updateText: ProjectConstants.PROJECT_UPDATE_TEXT
    },
    getInitialState() {
        return {};
    },
    create(text) {
        text = text.trim();
    }
});