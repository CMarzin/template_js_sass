var gulp         = require('gulp');
var sass         = require('gulp-sass');

    gulp.task('sass', function() {
      return gulp.src('app/sass/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass.sync().on('error', sass.logError)) // avoid break script if error sass
        .pipe(gulp.dest('app/css'))
    });

    gulp.task('default', ['sass'], function (){
      gulp.watch('app/sass/**/*.scss', ['sass']);
      gulp.watch('app/*.html');
      gulp.watch('app/js/**/*.js');
      // Other watchers
    });
