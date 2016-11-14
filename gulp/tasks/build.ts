/**
 * The tasks for build, with system.js
 */

import * as gulp from 'gulp';
import * as gulpConcat from 'gulp-concat';
import * as gulpUglify from 'gulp-uglify';
import {join} from 'path';
import {PROJECT_ROOT, DIST_ROOT} from '../constants';

// lack of types
const systemjsBuilder = require('systemjs-builder');

/**
 * bundle for system.js
 */
gulp.task('bundle:app', () => {
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