var gulp = require('gulp');
var browserSync = require("browser-sync");

['css', 'html', 'static', 'watch', 'release'].forEach(function (task) {
  require('./tasks/gulp.' + task + '.js')(gulp, browserSync);
});