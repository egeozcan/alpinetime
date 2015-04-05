var builderFactory = require('./generic.build_server.js');

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
    //gulp.watch(['./public/**/*.js'], ['bs-reload']);
    gulp.watch(['./!(node_modules|data|public|client)/**/*.go', './*.go'], ['run-server']);
    builder(serverLoaded);
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