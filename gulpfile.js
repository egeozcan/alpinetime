var cp = require('child_process');
var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require("babelify");
var watchify = require('watchify');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync");
var nunjucksRender = require('gulp-nunjucks-render');
var cleancssPlugin = require("less-plugin-clean-css");

var cleancss = new cleancssPlugin({
  advanced: true
});
var autoprefixPlugin = require('less-plugin-autoprefix');
var autoprefix = new autoprefixPlugin({
  browsers: ["> 5%"]
});
 
var paths = {
  appCSS: ['./client/css/*.less'],
  appJS: ['./client/js/app.jsx', './client/js/tests.jsx']
};

function buildJS(path, output) {
  var bundler = watchify(browserify(path, watchify.args));
  bundler.transform(babelify.configure({
      experimental: true
  }));
  bundler.transform('brfs');
  bundler.on('update', bundle);
  bundler.on('update', gutil.log.bind(gutil, "Updated js files"));
  bundler.on('bytes', browserSync.reload);

  function bundle() {
    bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(output))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/js'));
  }
  return bundle;
}

gulp.task('clean-css', function(done) {
  del(['public/css/*.*'], done);
});
gulp.task('clean-html', function(done) {
  del(['public/*.html'], done);
});
gulp.task('clean-js', function(done) {
  del(['public/js/*.*'], done);
});
 
gulp.task('css', ['clean-css'], function() {
  return gulp.src(paths.appCSS)
    .pipe(less({
      plugins: [autoprefix, cleancss]
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('static', function () {
  return gulp.src(['client/static/**/*.*'])
    .pipe(gulp.dest('./public/'));
})

gulp.task('html', ['clean-html'], function () {
    nunjucksRender.nunjucks.configure(['client/views/']);
    return gulp.src('client/views/*.html')
        .pipe(nunjucksRender())
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', buildJS(['./client/js/app.jsx'], 'bundle.js'));
gulp.task('js-test', buildJS(['./client/js/tests.jsx'], 'tests.js'));

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('run-server', buildAndRunServer);

gulp.task('watch', ['static', 'css', 'js', 'js-test', 'html'], function() {
  gulp.watch(['./client/css/**/*.less'], ['css']);
  gulp.watch(['./client/views/**/*.html'], ['html']);
  gulp.watch(['./**/*.go', '!./data/**/*.go'], ['run-server']);
  buildAndRunServer();
  loadBrowserSync();
});

gulp.task('default', ['css', 'js']);

function loadBrowserSync() {
  if (!proc) {
    gutil.log("server not loaded yet");
    setTimeout(loadBrowserSync, 1000);
    return;
  };
  browserSync({
      proxy: {
        target: "localhost:8081",
        middeware: function (req, res, next) {
            gutil.log(req.url);
            next();
        },
				ui: {
					port: 3001
				}
      }
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