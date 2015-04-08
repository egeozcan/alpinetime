var builderFactory = require('./generic.build_server.js');
var cp = require('child_process');
var path = require('path');
var webpackWatcher = path.resolve(__dirname, './webpack.watch.js');

module.exports = function (gulp, browserSync) {
  var serverRunning = false;
  var builder = builderFactory(true, true);
  
  function serverLoaded() {
    browserSync.reload();
    serverRunning = true;
  }
  
  gulp.task('bs-reload', function () {
    browserSync.reload();
  });
  
  gulp.task('run-server', function () {
    console.log("re-build");
    builder(serverLoaded);
  });
  
  gulp.task('watch', ['static', 'css', 'html'], function() {
    gulp.watch(['./client/css/**/*.less', './client/js/**/*.less'], ['css']);
    gulp.watch(['./client/views/**/*.html'], ['html']);
    gulp.watch(['./public/**/*.js'], ['bs-reload']);
    var proc = cp.spawn('node', [webpackWatcher]);
    proc.stdout.on('data', function (data) {
      console.log(data.toString().replace(/\n+?$/m, ""));
      if(!serverRunning) {
        builder(function () {
          serverLoaded();
          gulp.watch(['./!(node_modules|data|public|client)/**/*.go', './*.go'], ['run-server']);
        });
      } else if(data.toString().indexOf('Success') >= 0) {
        browserSync.reload();
      }
    });
    loadBrowserSync();
  });

  function loadBrowserSync() {
    if (!serverRunning) {
      console.log("server not loaded yet");
      setTimeout(loadBrowserSync, 100);
      return;
    };
    browserSync({
      proxy: { target: "localhost:8081", ui: { port: 3001 } }
    });
  }

}