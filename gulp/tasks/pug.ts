import * as gulp from 'gulp';
const gulpPug = require('gulp-pug');


gulp.task('pug', () => {
  return gulp.src('src/pug/**/*.pug')
    .pipe(gulpPug({
      pretty: true
    }))
    .pipe(gulp.dest('assets'));
});