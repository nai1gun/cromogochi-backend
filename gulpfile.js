var gulp = require('gulp');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('scripts', function () {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return del(['dist/*'])
});

gulp.task('default', ['clean'], function () {
  return runSequence(
    'scripts'
  );
});