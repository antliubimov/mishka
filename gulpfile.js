"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
sass.compiler = require('node-sass');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var server = require('browser-sync');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var {pipeline} = require('readable-stream');
var del = require('del');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');

gulp.task('css', function () {
  return gulp.src('source/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require('scss-resets').includePaths
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('build/css'));
});

gulp.task('minifyCSS', function () {
  return gulp.src('build/css/style.css', {
      base: "source"
    })
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img'));
});

gulp.task('compress', function () {
  return pipeline(
    gulp.src('source/js/**/*.js'),
    uglify(),
    gulp.dest('build/js')
  )
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css', 'minifyCSS'));
  gulp.watch('source/*.html').on('change', server.reload);
  gulp.watch('source/js/**/*.js', gulp.series('compress')).on('change', server.reload);
});

gulp.task('build', gulp.series(
  'clean',
  'css',
  'minifyCSS',
  'compress',
  'html'
));

gulp.task("start", gulp.series('build', 'server'));
