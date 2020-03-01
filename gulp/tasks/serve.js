const gulp = require('gulp');
const server = require('browser-sync').create();
const styles = require('./styles');
const script = require('./script');
const html = require('./html');

module.exports = function serve(cb) {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series(styles)).on('change', server.reload);
  gulp.watch('source/js/**/*.js', gulp
    .series(script)).on('change', server.reload);
  gulp.watch(
    'source/*.html', gulp.series(html));
  gulp.watch('build/*.html').on('change', server.reload);
  return cb();
};
