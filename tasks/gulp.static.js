var del = require('del');

module.exports = function (gulp) {
  gulp.task('clean-static', function(done) {
    del(['public/*.png', 'public/*.xml', 'public/*.ico', 'public/*.json'], done);
  });

  gulp.task('static', ['clean-static'], function () {
    return gulp.src(['client/static/**/*.*'])
      .pipe(gulp.dest('./public/'));
  });
}
