var Marty = require('marty');
var extend = require('lodash-node/modern/objects/assign');
var ProjectConstants = require('../constants/ProjectConstants');

var ProjectStore = Marty.createStore({
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
        text = text ? text.trim() : text;
        if (!text) {
            return;
        }
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        this.state[id] = {
            id: id,
            complete: false,
            text: text
        };
        this.hasChanged();
    },
    complete(id) {
        if (!id) {
            return;
        }
        this.update(id, {complete: true})
    },
    update(id, props) {
        this.state[id] = extend({}, this.state[id], props);
        this.hasChanged();
    }
});
export default ProjectStore;