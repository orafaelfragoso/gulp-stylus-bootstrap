var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    jshint = require('gulp-jshint'),
    sprite = require('css-sprite').stream,
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if');


gulp.task('stylus', function () {
  return gulp.src('./src/assets/styl/main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({compress: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('jshint', function() {
  return gulp.src('./src/assets/js/**/*.js')
    .pipe(jshint());
});

gulp.task('uglify', ['jshint'], function() {
  return gulp.src('./src/assets/js/**/*.js')
    .pipe(uglify({compress: true}))
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('sprites', function() {
  return gulp.src('./src/assets/images/**/*')
    .pipe(sprite({
      name: 'sprite',
      style: '_sprites.styl',
      cssPath: './assets/images/',
      preprocessor: 'stylus'
    }))
    .pipe(gulpif('*.png', gulp.dest('./public/assets/images/'), gulp.dest('./src/assets/styl/includes')));
});

gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'))
});

gulp.task('fonts', function() {
  return gulp.src('.src/assets/fonts/**/*')
    .pipe(gulp.dest('public/assets/fonts'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/assets/js/**/*.js'], ['jshint', 'ugligy']);
  gulp.watch(['./src/assets/styl/**/*.styl'], ['stylus']);
  gulp.watch(['./src/assets/images/**/*'], ['sprites']);
  gulp.watch(['./src/assets/fonts/**/*'], ['fonts']);
  gulp.watch(['./src/*.html'], ['html']);
});
