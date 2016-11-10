/**
 * The tasks for build, with system.js
 */

import * as gulp from 'gulp';
import * as gulpConcat from 'gulp-concat';
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
  const dest = join(DIST_ROOT, 'bundle.js');
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
 * Concatenate dependency files of ES6 and system.js
 */
gulp.task('concat:dependencies', () => {
  const esDependencies = [
    join(PROJECT_ROOT, 'node_modules/core-js/client/shim.min.js'),
    join(PROJECT_ROOT, 'node_modules/systemjs/dist/system.src.js')
  ];

  return gulp.src(esDependencies)
    .pipe(gulpConcat('dependencies.js'))
    .pipe(gulp.dest(DIST_ROOT));
});