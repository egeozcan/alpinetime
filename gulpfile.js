/* gulpfile.js */

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var del = require('del');
var source = require('vinyl-source-stream');
var to5ify = require("6to5ify");
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var browserSync = require("browser-sync");
 
var less = require('gulp-less');
var cleancssPlugin = require("less-plugin-clean-css");
var cleancss = new cleancssPlugin({
  advanced: true
});
var autoprefixPlugin = require('less-plugin-autoprefix');
var autoprefix = new autoprefixPlugin({
  browsers: ["last 2 versions"]
});
 
var paths = {
  appCSS: ['./src/css/*.less'],
  appJS: ['./src/js/app.jsx']
};
 
var bundler = watchify(browserify(paths.appJS, watchify.args));
bundler.transform(to5ify);
bundler.transform('brfs');
bundler.on('update', bundle);
bundler.on('bytes', browserSync.reload);

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/dist/js'));
}

gulp.task('clean-js', function(done) {
  del(['public/dist/js'], done);
});

gulp.task('clean-css', function(done) {
  del(['public/dist/css'], done);
});
 
gulp.task('css', ['clean-css'], function() {
  return gulp.src(paths.appCSS)
    .pipe(less({
      plugins: [autoprefix, cleancss]
    }))
    .pipe(gulp.dest('./public/dist/css'))
    .pipe(browserSync.reload({stream:true}));
})

gulp.task('js', ['clean-js'], bundle);

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('watch', ['css', 'js'], function() {
  gulp.watch(['./src/css/**/*.less'], ['css']);
  gulp.watch(['./public/**/*.html'], ['bs-reload']);
  browserSync({
      server: {
          baseDir: "./public"
      }
  });
});
 
gulp.task('default', ['css', 'js']);