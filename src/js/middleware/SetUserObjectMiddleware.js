var r = require('../lib/Database');

module.exports = function* (next) {
    if(!this.session.user) {
        return yield next;
    }
    this.user = yield r.table('users').filter({username: this.session.user}).run();
    yield next;
};