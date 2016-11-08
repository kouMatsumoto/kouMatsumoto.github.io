/**
 * The tasks for build, with system.js
 */

import * as gulp from 'gulp';
import {join} from 'path';
import {PROJECT_ROOT, DIST_ROOT} from '../constants';

// lack of types
const systemjsBuilder = require('systemjs-builder');


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
