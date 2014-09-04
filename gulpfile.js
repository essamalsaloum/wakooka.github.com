var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload');

gulp.task('watch', function() {
  // livereload.listen();
  gulp.watch('./scss/**/*.scss', ['sass']);//.on('change', livereload.changed);
});

gulp.task('sass', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'sass']);