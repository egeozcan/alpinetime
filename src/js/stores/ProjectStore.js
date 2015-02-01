var Reflux = require('reflux');
var extend = require('lodash-node/modern/objects/assign');
var ProjectActions = require('./ProjectActions');

var ProjectStore = Reflux.createStore({
    listenables: [ProjectActions],
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