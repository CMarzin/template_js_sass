var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');


    gulp.task('sass', function() {
      return gulp.src('app/sass/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass.sync().on('error', sass.logError)) // avoid break script if error sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
    });

    gulp.task('browserSync', function() {
      browserSync({
        server: {
          baseDir: 'app'
        },
      })
    })

    gulp.task('default', ['browserSync', 'sass'], function (){
      gulp.watch('app/sass/**/*.scss', ['sass']);
      gulp.watch('app/*.html', browserSync.reload);
      gulp.watch('app/js/**/*.js', browserSync.reload);
      // Other watchers
    });
