/* gulpfile.js */

var del = require('del');
var gulp = require('gulp');
var to5ify = require("6to5ify");
var gutil = require('gulp-util');
var watchify = require('watchify');
var exec = require('child_process').exec;
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var browserSync = require("browser-sync");
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
 
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
  appJS: ['./src/js/app.js']
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
});

gulp.task('riot', function (cb) {
  exec('riot ./src', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('js', ['clean-js', 'riot'], bundle);

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('watch', ['css', 'js'], function() {
  gulp.watch(['./src/css/**/*.less'], ['css']);
  gulp.watch(['./src/js/**/*.tag'], ['riot']);
  gulp.watch(['./public/**/*.html'], ['bs-reload']);
  browserSync({
      server: {
          baseDir: "./public"
      }
  });
});
 
gulp.task('default', ['css', 'js']);