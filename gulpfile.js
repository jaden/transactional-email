var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');
var htmlreplace = require('gulp-html-replace');
var del = require('del');

var paths = {
  scripts: ['js/**/*.js'],
  css: ['css/**/*.css']  
};

var vendorCss = [
    'components/bootstrap/dist/css/bootstrap.min.css',
    'components/rangeslider.js/dist/rangeslider.css'
];

var vendorJs = [
    'components/jquery/dist/jquery.min.js',
    'components/jquery/dist/jquery.min.map',
	'components/angular/angular.min.js',
    'components/angular/angular.min.js.map',
	'components/bootstrap/dist/js/bootstrap.min.js',
	'components/rangeslider.js/dist/rangeslider.min.js'
];

// Not all tasks need to use streams
gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', ['clean'], function() {
  return gulp.src(paths.css)
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist'));
});

// Replace JS and CSS in HTML file
gulp.task('replace', ['scripts', 'minify-css'], function() {
  gulp.src('index.html')
    .pipe(htmlreplace({
        'css': 'styles.min.css',
        'js': 'js/all.min.js'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-css', ['minify-css'], function() {
    return gulp.src(vendorCss, {base: "."})
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-js', ['scripts'], function() {
    return gulp.src(vendorJs, {base: "."})
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-images', ['clean'], function() {
    return gulp.src('./images/**')
      .pipe(gulp.dest('dist/images/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts', 'minify-css', 'replace', 'copy-images']);
});

gulp.task('default', ['scripts', 'minify-css', 'replace', 'copy-css', 'copy-js', 'copy-images']);
