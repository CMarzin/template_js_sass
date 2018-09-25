var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');
var stripDebug = require('gulp-strip-debug');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');

// Get project config
var config       = require('./app/config.json')
var path         = config.path
var dependencies = config.dependencies

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js').pipe(jshint()).pipe(jshint.reporter('default')).on('error', function(error) {
        console.error('' + error);
    })
});
gulp.task('webpack', function() {
    return gulp.src('./app/js/main.js').pipe(webpack(require('./webpack.config.js'))).pipe(gulp.dest('app/dist/js/'));
});
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/js/**/*.js').pipe(babel({
            presets: ['es2015']
        })).pipe(concat('all.js')).pipe(gulp.dest('app/dist/js')). // file for dev
    pipe(rename('all.min.js')). // rename file
    pipe(stripDebug()). // remove console.log alert etc..
    pipe(uglify()).pipe(gulp.dest('app/dist/js')). // file for prod
    pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('style', function() {
    return gulp.src('app/sass/*.scss'). // Gets all files ending with .scss in app/scss
    pipe(sass.sync().on('error', sass.logError)). // avoid break script if error sass
    pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    })).pipe(cssnano()).pipe(gulp.dest('app/dist/css'))
});

gulp.task('sass', function() {
    return gulp.src('app/sass/*.scss'). // Gets all files ending with .scss in app/scss
    pipe(sass.sync().on('error', sass.logError)). // avoid break script if error sass
    pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    })).pipe(gulp.dest('app/dist/css')).pipe(browserSync.reload({
        stream: true
    }))
});

// Launch hot relaod
// 'gulp reload' - Forces a manual browser reload
gulp.task('reload', function(){
  browsersync.reload()
})

gulp.task('build', ['style', 'scripts'], function() {
    var path = require('path');
    var root = path.resolve(__dirname);
    return gulp.src('./app/js/main.js').pipe(webpack({

        context: __dirname,
        node: {
            __filename: true
        },
        watch: false,
        entry: {
            app: ["./app/js/main.js"]
        },
        output: {
            path: path.resolve(__dirname, "./app/dist/js"),
            filename: "bundle.js"
        },
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /(nodes_modules|bower_components)/,
                include: root,
                loader: "babel",
                query: {
                    presets: ['es2015']
                }
            }]

        }

    })).pipe(gulp.dest('app/dist/js/'));
});

// ## Watch
// 'gulp watch' - Monitors theme files and assets for changes and live reloads
// with Browsersync. You must update your devUrl in config.json to reflect your
// local development hostname.
gulp.task('dev', ['sass', 'lint'], function() {
    browserSync.init({
        proxy: config.devUrl,
        snippetOptions: {
            whitelist: ['/wp-admin/admin-ajax.php'],
            blacklist: ['/wp-admin/**'],
        },
    })
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', ['scripts', 'webpack']);
    // Other watchers
});
