/**
 * The tasks for development, compiling pug, stylus
 */

import * as gulp from 'gulp';
import {join} from 'path';
import {serverTask, tsBuildTask, copyTask, stylusBuildTask} from '../task_helpers';
import {DIST_ROOT, APP_ROOT} from '../constants';



gulp.task(':build:styl', stylusBuildTask(APP_ROOT, DIST_ROOT));
gulp.task(':build:ts', tsBuildTask(APP_ROOT));
gulp.task(':copy:html', copyTask(join(APP_ROOT, '**/*.html'), DIST_ROOT));

gulp.task('build:app', [':build:ts', ':build:styl', ':copy:html']);

gulp.task('watch:app', () => {
  gulp.watch(join(APP_ROOT, '**/*.styl'), [':build:styl']);
  gulp.watch(join(APP_ROOT, '**/*.ts'), [':build:ts']);
  gulp.watch(join(APP_ROOT, '**/*.html'), [':copy:html']);
});


gulp.task('serve:app', ['build:app', 'watch:app'], serverTask());
