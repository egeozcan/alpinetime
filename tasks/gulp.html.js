var nunjucksRender = require('gulp-nunjucks-render');
var del = require('del');

module.exports = function (gulp, browserSync) {
  gulp.task('clean-html', function(done) {
    del(['public/*.html'], done);
  });
  
  gulp.task('html', ['clean-html'], function () {
    nunjucksRender.nunjucks.configure(['client/views/']);
    var build = gulp.src('client/views/*.html')
      .pipe(nunjucksRender())
      .pipe(gulp.dest('./public/'));
    return !!browserSync ? build.pipe(browserSync.reload({stream:true})) : build;
  });
}
