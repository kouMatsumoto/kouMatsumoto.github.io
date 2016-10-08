/**
 * The tasks for development, compiling pug, scss
 */

import * as gulp from 'gulp';
import {join} from 'path';
import {sassBuildTask} from '../task_helpers';
import {PROJECT_ROOT, SOURCE_ROOT} from '../constants';
const gulpPug = require('gulp-pug');



gulp.task('build:pug', () => {
  return gulp.src(join(SOURCE_ROOT, 'pug/**/*.pug'))
    .pipe(gulpPug({
      pretty: true
    }))
    .pipe(gulp.dest(PROJECT_ROOT));
});


gulp.task('build:scss', sassBuildTask('css', join(SOURCE_ROOT, 'scss')));