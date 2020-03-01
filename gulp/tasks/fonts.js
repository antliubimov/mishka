const gulp = require('gulp');

module.exports = function fonts() {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}'
    ], {
      base: "source"
    })
    .pipe(gulp.dest('build'));
}
