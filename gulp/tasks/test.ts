import * as gulp from 'gulp';
import {join} from 'path';
import {Server} from 'karma';
import {PROJECT_ROOT} from '../constants';


/**
 * This task is assuming that TS files are already transpiled. (don't run this before ts task.)
 * This task is dependency of TODO
 */
gulp.task(':test:app', (done) => {
  new Server({configFile: join(PROJECT_ROOT, 'karma.conf.js')}, done).start();
});