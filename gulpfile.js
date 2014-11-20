var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('sass', function () {
    gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'sass']);