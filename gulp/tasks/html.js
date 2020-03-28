const gulp = require('gulp');
const plumber = require('gulp-plumber');
const htmlValidator = require('gulp-w3c-html-validator');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');

module.exports = function html() {
  return gulp
    .src('source/*.html')
    .pipe(plumber())
    .pipe(posthtml([include()]))
    .pipe(htmlValidator())
    .pipe(gulp.dest('build'));
};
