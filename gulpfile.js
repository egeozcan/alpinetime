var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require("babelify");
var watchify = require('watchify');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync");
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
bundler.transform(babelify.configure({
    experimental: true
}));
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
    .pipe(gulp.dest('./public/js'));
}

gulp.task('clean', function(done) {
  del(['public'], done);
});
 
gulp.task('css', ['clean'], function() {
  return gulp.src(paths.appCSS)
    .pipe(less({
      plugins: [autoprefix, cleancss]
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', ['clean'], bundle);

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('watch', ['css', 'js'], function() {
  gulp.watch(['./src/css/**/*.less'], ['css']);
  gulp.watch(['./public/**/*.html'], ['bs-reload']);
  browserSync({
      proxy: {
        target: "localhost:8080",
        middeware: function (req, res, next) {
            console.log(req.url);
            next();
        }
      }
  });
});
 
gulp.task('default', ['css', 'js']);