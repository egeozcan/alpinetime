var cp = require('child_process');
var gulp = require('gulp');
var less = require('gulp-less');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var browserSync = require("browser-sync");
var path = require("path");

var debug = require('gulp-debug');

var del = require('del');
gulp.task('clean-css', function(done) {
  del(['public/css/*.*'], done);
});
gulp.task('clean-html', function(done) {
  del(['public/*.html'], done);
});
gulp.task('clean-static', function(done) {
  del(['public/*.png', 'public/*.xml', 'public/*.ico', 'public/*.json'], done);
});

var cleancssPlugin = require("less-plugin-clean-css");
var cleancss = new cleancssPlugin({ advanced: true });
var autoprefixPlugin = require('less-plugin-autoprefix');
var autoprefix = new autoprefixPlugin({ browsers: ["> 5%"] });
var concatCss = require('gulp-concat-css');
var plumber = require('gulp-plumber');
gulp.task('css', ['clean-css'], function() {
  return gulp.src(['./client/css/*.less', './client/js/**/*.less'])
    .pipe(plumber())
    .pipe(less({
      plugins: [autoprefix, cleancss]
    }))
    .pipe(concatCss('app.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('static', ['clean-static'], function () {
  return gulp.src(['client/static/**/*.*'])
    .pipe(gulp.dest('./public/'));
})

var nunjucksRender = require('gulp-nunjucks-render');
gulp.task('html', ['clean-html'], function () {
    nunjucksRender.nunjucks.configure(['client/views/']);
    return gulp.src('client/views/*.html')
      .pipe(nunjucksRender())
      .pipe(gulp.dest('./public/'))
      .pipe(browserSync.reload({stream:true}));
});

gulp.task('run-server', buildAndRunServer);

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('watch', ['static', 'css', 'html'], function() {
  gulp.watch(['./client/css/**/*.less', './client/js/**/*.less'], ['css']);
  gulp.watch(['./client/views/**/*.html'], ['html']);
  gulp.watch(['./public/**/*.js'], ['bs-reload']);
  gulp.watch(['./!(node_modules|data|public|client)/**/*.go', './*.go'], ['run-server']);
  buildAndRunServer();
  loadBrowserSync();
});

function loadBrowserSync() {
  if (!proc) {
    gutil.log("server not loaded yet");
    setTimeout(loadBrowserSync, 100);
    return;
  };
  browserSync({
    proxy: { target: "localhost:8081", ui: { port: 3001 } }
  });
}

var proc;
function buildAndRunServer() {
  if(proc) {
    proc.kill('SIGINT');
  }
  ["go-bindata -debug -pkg data -o ./data/bindata.go ./public/...", "go build -tags 'debug'"].forEach(function (command) {
    gutil.log("running: ", command);
    cp.execSync(command, {cwd: process.cwd()});
  });
  proc = cp.spawn('./alpinetime');
  proc.stdout.on('data', function (data) {
    console.log(data.toString().replace(/\n+?$/m, ""));
    if(data.toString().indexOf('-- Started --') >= 0) {
      browserSync.reload();
    }
  });
}