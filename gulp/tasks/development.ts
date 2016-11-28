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



/**
 * Copy production.index.html to PROJECT_ROOT as index.html
 */
gulp.task(':html:dev', () => {
  return gulp.src(join(APP_ROOT, 'development.index.html'))
    .pipe(gulpRename('index.html'))
    .pipe(gulp.dest(PROJECT_ROOT));
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


/**
 * Task to prepare app to serve in development
 */
gulp.task('build:app:dev', [':html:dev', 'ts:app:dev', 'styl:app:dev']);


/**
 * Task to watch files to transpile
 */
gulp.task('watch:app:dev', () => {
  gulp.watch(join(APP_ROOT, '**/*.ts'), ['ts:app:dev']);
  gulp.watch(join(APP_ROOT, '**/*.styl'), ['styl:app:dev']);
});


/**
 * Task to serve app in development
 */
gulp.task('serve:app:dev', serverTask());


/**
 * Task to develop app
 */
gulp.task('dev:app', ['build:app:dev'], () => {
  runSequence([
    'serve:app:dev',
    ':test:unit',
    'watch:app:dev'
  ]);
});
