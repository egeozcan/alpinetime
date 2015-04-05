var less = require('gulp-less');
var cleancssPlugin = require("less-plugin-clean-css");
var autoprefixPlugin = require('less-plugin-autoprefix');
var concatCss = require('gulp-concat-css');
var plumber = require('gulp-plumber');
var del = require('del');

module.exports = function (gulp, browserSync) {
  var cleancss = new cleancssPlugin({ advanced: true });
  var autoprefix = new autoprefixPlugin({ browsers: ["> 5%"] });
  
  gulp.task('clean-css', function(done) {
    del(['public/css/*.*'], done);
  });
  
  gulp.task('css', ['clean-css'], function() {
    var build = gulp.src(['./client/css/*.less', './client/js/**/*.less'])
      .pipe(plumber())
      .pipe(less({
        plugins: [autoprefix, cleancss]
      }))
      .pipe(concatCss('app.css'))
      .pipe(gulp.dest('./public/css'));
    if (!browserSync) {
      return build;
    }
    return build.pipe(browserSync.reload({stream:true}));
  });
}
