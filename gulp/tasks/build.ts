/**
 * The tasks for build, with system.js
 */

import * as gulp from 'gulp';
import * as gulpConcat from 'gulp-concat';
import * as gulpUglify from 'gulp-uglify';
import {join} from 'path';
import {PROJECT_ROOT, DIST_ROOT, APP_ROOT, TMP_ROOT} from '../constants';
import {copyTask, sassBuildTask, tsBuildTask} from '../task_helpers';

// lack of types
const systemjsBuilder = require('systemjs-builder');
const inlineNg2Template= require('gulp-inline-ng2-template');
const runSequence= require('run-sequence');


/**
 * Concatenate dependency files of ES6-polyfill, zone.js, reflect, and system.js,
 */
gulp.task('bundle:dependencies', () => {
  const esDependencies = [
    join(PROJECT_ROOT, 'node_modules/core-js/client/shim.min.js'),
    join(PROJECT_ROOT, 'node_modules/zone.js/dist/zone.js'),
    join(PROJECT_ROOT, 'node_modules/reflect-metadata/Reflect.js'),
    join(PROJECT_ROOT, 'node_modules/systemjs/dist/system.src.js'),
    join(PROJECT_ROOT, 'systemjs.config.js'),
  ];

  return gulp.src(esDependencies)
    .pipe(gulpConcat('dependency.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest(DIST_ROOT));
});


/**
 * A task to prepare bundle app
 * To alter file contents, copy app files.
 */
gulp.task(':pre:bundle:copy', copyTask(APP_ROOT, TMP_ROOT));

/**
 * Compile scss to css to inject as ng2 template
 */
gulp.task(':pre:bundle:scss', sassBuildTask(TMP_ROOT, TMP_ROOT));

/**
 * Inject html and css templates to ts as string
 */
gulp.task(':pre:bundle:template', () => {
  return gulp.src(join(TMP_ROOT, '**/*.ts'))
    .pipe(inlineNg2Template({
      base: 'tmp',
      useRelativePaths: true
    }))
    .pipe(gulp.dest(TMP_ROOT));
});

/**
 * Compile ts files injected html and css templates
 */
gulp.task(':pre:bundle:ts', tsBuildTask(TMP_ROOT));


/**
 * bundle for system.js
 */
gulp.task(':pre:bundle:app', () => {
  const builder = new systemjsBuilder(PROJECT_ROOT, 'systemjs.config.js');
  const src = join(DIST_ROOT, 'main.js');
  const dest = join(DIST_ROOT, 'app.js');
  const config = {
    mangle: false,
    minify: false,
    sourceMaps: false
  };

  builder
    .bundle(src, dest, config)
    .then(() => {
      console.log('Build Complete');
    })
    .catch((err) => {
      console.error('Build Failed', err);
    });
});

/**
 * A task to bundle app
 */
gulp.task('bundle:app', () => runSequence(
  ':pre:bundle:copy',
  ':pre:bundle:scss',
  ':pre:bundle:template',
  ':pre:bundle:ts',
  ':pre:bundle:app'
));