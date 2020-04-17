const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');

module.exports = function spriteSvg() {
  return gulp
    .src('source/img/svg/sprite/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      }),
    )
    .pipe(gulp.dest('build/img/svg'));
};
