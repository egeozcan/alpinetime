var parse = require('co-body');
var config = require('../config');

module.exports.signin = function *signin() {
    var body = yield parse(this);
    if (body.username !== 'username' || body.password !== 'password') return this.status = 400;
    this.session.username = 'username';
    this.redirect(config.app.afterSignInRedirect);
};