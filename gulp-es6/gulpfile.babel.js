'use strict';

import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

gulp.task("html", () => {
    return gulp.src("./app/*.html")
        .pipe(gulp.dest("./build"))
});

gulp.task("styles", () => {
  return gulp.src("./app/sass/*.scss")
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
});

gulp.task("scripts", () => {
    return browserify({
            entries: ["./app/js/index.js"]
        })
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./build/js"))
        .pipe(browserSync.stream());
});

gulp.task("startServer", () => {
    browserSync.init({
      server: "./app"
  });
});

gulp.task('watch', () => {
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch(['./app/js/*.js'], ['js']);
    gulp.watch(['./app/sass/**/*.scss'], ['styles']);
});

gulp.task("build", ["html", "scripts", "styles"]);
gulp.task("dev", ["startServer", "watch"]);
