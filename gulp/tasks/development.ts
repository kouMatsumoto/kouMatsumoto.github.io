/**
 * The tasks for development, compiling pug, scss
 */

import * as gulp from 'gulp';
import {join} from 'path';
import {sassBuildTask, serverTask, tsBuildTask, copyTask} from '../task_helpers';
import {DIST_ROOT, APP_ROOT} from '../constants';


const scssFilesToBuild = join(APP_ROOT, '**/*.scss');
const tsFilesToWatch = join(APP_ROOT, '**/*.ts');
const htmlFilesToCopy = join(APP_ROOT, '**/*.html');


gulp.task(':build:scss', sassBuildTask(scssFilesToBuild, DIST_ROOT));
gulp.task(':build:ts', tsBuildTask(APP_ROOT));
gulp.task(':copy:html', copyTask(htmlFilesToCopy, DIST_ROOT));

gulp.task('build:app', [':build:ts', ':build:scss', ':copy:html']);


gulp.task('watch:app', () => {
  gulp.watch(scssFilesToBuild, [':build:scss']);
  gulp.watch(tsFilesToWatch, [':build:ts']);
  gulp.watch(htmlFilesToCopy, [':copy:html']);
});


gulp.task('serve:app', ['build:app', 'watch:app'], serverTask());


gulp.task('build:ng', () => {
  const inlineNg2Template= require('gulp-inline-ng2-template');

  gulp.src(join(DIST_ROOT, '**/*.js'))
    .pipe(inlineNg2Template({
      base: 'dist',
      useRelativePaths: true
    }))
    .pipe(gulp.dest('dist'));
});