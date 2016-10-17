/**
 * The tasks for development, compiling pug, scss
 */

import * as gulp from 'gulp';
import {join} from 'path';
import {sassBuildTask, serverTask, tsBuildTask} from '../task_helpers';
import {PROJECT_ROOT, SOURCE_ROOT, APP_ROOT} from '../constants';

// This import is lack a type
const gulpPug = require('gulp-pug');

const pugFilesToBuild = join(SOURCE_ROOT, 'pug/index.pug');
const pugFilesToWatch = join(SOURCE_ROOT, 'pug/**/*.pug');
const scssFilesToBuild = join(SOURCE_ROOT, 'scss/**/*.scss');


gulp.task(':build:pug', () => {
  return gulp.src(pugFilesToBuild)
    .pipe(gulpPug({
      pretty: true
    }))
    .pipe(gulp.dest(PROJECT_ROOT));
});
gulp.task(':build:scss', sassBuildTask('css', scssFilesToBuild));
gulp.task(':build:ts', tsBuildTask(APP_ROOT));

gulp.task('build:app', [':build:ts', ':build:scss']);


gulp.task('watch:app', () => {
  gulp.watch(pugFilesToWatch, [':build:pug']);
  gulp.watch(scssFilesToBuild, [':build:scss']);
});


gulp.task('serve:app', ['build:app', 'watch:app'], serverTask());