'use strict';

import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import notifier from 'node-notifier'

gulp.task('html', () => {
    return gulp.src('./app/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

gulp.task('styles', () => {
    return gulp.src('./app/stylesheets/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
    return browserify({
            entries: ['./app/scripts/main.js']
        })
        .transform(babelify.configure({
            presets: ['es2015']
        }))
        .bundle()
        .on('error', (error) => {
            console.log(error.stack)
            notifier.notify({
                'title': 'Compile Error',
                'message': error.message
              });
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
});

gulp.task('startServer', () => {
    browserSync.init({
        server: './build'
    });
});

gulp.task('watch', () => {
    gulp.watch('./app/*.html', ['html']);
    gulp.watch(['./app/scripts/*.js'], ['scripts']);
    gulp.watch(['./app/stylesheets/**/*.scss'], ['styles']);
});

gulp.task('build', ['html', 'scripts', 'styles']);
gulp.task('dev', ['build', 'startServer', 'watch']);
