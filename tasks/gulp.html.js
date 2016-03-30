var nunjucksRender = require('gulp-nunjucks-render');
var del = require('del');

module.exports = function (gulp, browserSync) {
  gulp.task('clean-html', function() {
    return del(['public/*.html']);
  });
  
  gulp.task('html', ['clean-html'], function () {
    nunjucksRender.nunjucks.configure(['client/views/']);
    var build = gulp.src('client/views/*.html')
      .pipe(nunjucksRender({
        path: ['client/views/']
      }))
      .pipe(gulp.dest('./public/'));
    return !!browserSync ? build.pipe(browserSync.reload({stream:true})) : build;
  });
}
