const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

module.exports = function images() {
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
}
