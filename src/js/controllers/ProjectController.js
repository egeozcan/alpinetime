var db = require('../lib/Database');
var projectsTable = db.table('projects');
var tasksTable = db.table('tasks');
var parse = require('co-body');

module.exports.list = function* list() {
    //var projects = yield
}