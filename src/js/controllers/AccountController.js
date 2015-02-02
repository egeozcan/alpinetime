var parse = require('co-body');
var config = require('../config');
var r = require('../lib/Database');

module.exports.signin = function *signin() {
    var body = yield parse(this);
    var [user, password, email] = [body.user, body.password, body.email];
    this.session.username = 'username';
    //noinspection JSCheckFunctionSignatures
    this.redirect(config.app.afterSignInRedirect);
};

module.exports.signup = function *signup() {
    var body = yield parse(this);
    var [user, password, email] = [body.user, body.password, body.email];
    if(!exists(user, password, email)) {
        this.throw('You need to give me a username, password and an email.', 400);
    }
    yield r.table('users').insert({
        user,
        password,
        email,
        verified: false
    });
    this.session.username = 'username';
    //noinspection JSCheckFunctionSignatures
    this.redirect(config.app.afterSignInRedirect);
};

function exists () {
    [].forEach.call(arguments, function(str) {
        if(str === null || str === undefined || str.trim().length === 0) {
            return false;
        }
    });
    return true;
}