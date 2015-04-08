var builderFactory = require('./generic.build_server.js');
var webpack = require('webpack');

module.exports = function (gulp, browserSync) {
  var serverRunning = false;
  var builder = builderFactory(false, false);
  
  gulp.task('release', ['static', 'css', 'html'], function(done) {
    var compiler = webpack(require('./webpack.config.js'));
    compiler.run(function () {
      require('./webpack.log.js').apply(null, arguments);
      builder(done);
    });
  });
}