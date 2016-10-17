/**
 * The tasks for development, compiling pug, scss
 */

import * as gulp from 'gulp';
import {join} from 'path';
import {sassBuildTask, serverTask, tsBuildTask} from '../task_helpers';
import {DIST_ROOT, APP_ROOT} from '../constants';


const scssFilesToBuild = join(APP_ROOT, '**/*.scss');
const tsFilesToWatch = join(APP_ROOT, '**/*.ts');


gulp.task(':build:scss', sassBuildTask(scssFilesToBuild, DIST_ROOT));
gulp.task(':build:ts', tsBuildTask(APP_ROOT));

gulp.task('build:app', [':build:ts', ':build:scss']);


gulp.task('watch:app', () => {
  gulp.watch(scssFilesToBuild, [':build:scss']);
  gulp.watch(tsFilesToWatch, [':build:ts']);
});


gulp.task('serve:app', ['build:app', 'watch:app'], serverTask());