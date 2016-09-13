var gulp         = require('gulp');
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var stripDebug   = require('gulp-strip-debug');
var rename       = require('gulp-rename');
var wrap         = require('gulp-wrap');
var declare      = require('gulp-declare');
var autoprefixer = require('gulp-autoprefixer');
var handlebars   = require('gulp-handlebars');
var imagemin     = require('gulp-imagemin');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on('error', function(error) {
        console.error('' + error);
    })
})

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('all.min.js'))
    .pipe(stripDebug()) // remove console.log alert etc..
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

// Compile our Handlebar
gulp.task('templates', function() {
    gulp.src('app/templates/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'MyApp.templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist/js/'));
})

gulp.task('style', function() {
  return gulp.src('app/sass/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass.sync().on('error', sass.logError)) // avoid break script if error sass
    .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('app/css'))
})

// Compress imgs
gulp.task('imagemin', function() {
  return gulp.src('app/src/img/*')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('dist/img'))
})

gulp.task('build', ['imagemin', 'templates', 'style', 'scripts'])

gulp.task('dev', function (){
  gulp.watch('app/sass/**/*.scss', ['style'])
  gulp.watch('app/*.html')
  gulp.watch('app/js/**/*.js', ['lint', 'scripts'])
  gulp.watch('app/templates/*.hbs', ['templates'])
  // Other watchers
})
