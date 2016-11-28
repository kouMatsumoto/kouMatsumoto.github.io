/**
 * The tasks for development, compiling pug, stylus
 */

import * as gulp from 'gulp';
import * as gulpRename from 'gulp-rename';
import * as gulpSourcemaps from 'gulp-sourcemaps';
import {join} from 'path';
import {serverTask, tsBuildTask, copyTask, stylusBuildTask} from '../task_helpers';
import {DIST_ROOT, APP_ROOT, PROJECT_ROOT} from '../constants';

// lack of types
const gulpStylus = require('gulp-stylus');
const runSequence = require('run-sequence');



gulp.task(':build:styl', stylusBuildTask(APP_ROOT, DIST_ROOT));
gulp.task(':build:ts', tsBuildTask(APP_ROOT));
gulp.task(':copy:html', copyTask(join(APP_ROOT, '**/*.html'), DIST_ROOT));


/**
 * Copy production.index.html to PROJECT_ROOT as index.html
 */
gulp.task(':html:development', () => {
  return gulp.src(join(APP_ROOT, 'development.index.html'))
    .pipe(gulpRename('index.html'))
    .pipe(gulp.dest(PROJECT_ROOT));
});


gulp.task('build:app', [':html:development', ':build:ts', ':build:styl', ':copy:html']);

gulp.task('watch:app', () => {
  gulp.watch(join(APP_ROOT, '**/*.styl'), [':build:styl']);
  gulp.watch(join(APP_ROOT, '**/*.ts'), [':build:ts']);
  gulp.watch(join(APP_ROOT, '**/*.html'), [':copy:html']);
});


gulp.task('serve:app', ['build:app', 'watch:app'], serverTask());


/**
 * Used in development
 */
gulp.task('dev:app', ['build:app'], () => {
  runSequence([
    'serve:app',
    ':test:unit',
    'watch:app'
  ]);
});


/**
 * Task to transpile stylus files in development
 */
gulp.task('styl:app:dev', () => {
  return gulp.src([join(APP_ROOT, '**/*.styl')])
    .pipe(gulpSourcemaps.init())
    .pipe(gulpStylus())
    .pipe(gulpSourcemaps.write('.'))
    .pipe(gulp.dest(APP_ROOT));
});


/**
 * Task to transpile TS files in development
 */
gulp.task('ts:app:dev', tsBuildTask(APP_ROOT));
