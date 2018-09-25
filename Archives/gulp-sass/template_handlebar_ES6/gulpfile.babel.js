'use strict';

import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import handlebars from 'gulp-handlebars';
import concat from 'gulp-concat';
import declare from 'gulp-declare';
import wrap from 'gulp-wrap';


gulp.task("html", () => {
    return gulp.src("./app/*.html")
        .pipe(gulp.dest("./build"))
        .pipe(browserSync.stream());
});

gulp.task("handlebars", () => {
    return gulp.src("bower_components/handlebars/handlebars.min.js")
        .pipe(gulp.dest("./build/vendor"))
});

gulp.task('templates', function () {
  gulp.src('./app/templates/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/js/'));
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
        server: "./build"
    });
});

gulp.task('watch', () => {
    gulp.watch('./app/*.html', ['html']);
    gulp.watch(['./app/js/*.js'], ['scripts']);
    gulp.watch(['./app/sass/**/*.scss'], ['styles']);
    gulp.watch('app/templates/*.hbs', ['templates']);
});

gulp.task("build", ["html", "handlebars", "templates", "scripts", "styles"]);
gulp.task("dev", ["startServer", "watch"]);
