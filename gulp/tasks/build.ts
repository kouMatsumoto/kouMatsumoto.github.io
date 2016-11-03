/**
 * The tasks for build, with system.js
 */

import * as gulp from 'gulp';
import {join} from 'path';
import {PROJECT_ROOT, DIST_ROOT} from '../constants';

// lack of types
const systemjsBuilder = require('gulp-systemjs-builder');


gulp.task('bundle:app', () => {
  const builder = systemjsBuilder();
  builder.loadConfigSync(join(PROJECT_ROOT, 'systemjs.config.js'));

  builder.buildStatic(join(DIST_ROOT, 'main.js'), {
    mangle: false,
    minify: false,
    sourceMaps: false
  })
    .pipe(gulp.dest(join(PROJECT_ROOT, 'build')));
});
