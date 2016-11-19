/**
 * The tasks for build, with system.js
 */

import * as del from 'del';
import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gulpConcat from 'gulp-concat';
import * as gulpUglify from 'gulp-uglify';
import * as gulpTs from 'gulp-typescript';
import * as gutil from 'gulp-util';
import * as path from 'path';
const join = path.join;
import {PROJECT_ROOT, DIST_ROOT, APP_ROOT, TMP_ROOT} from '../constants';
import {copyTask, stylusBuildTask, tsBuildTask, cleanTask} from '../task_helpers';

// lack of types
const systemjsBuilder = require('systemjs-builder');
const inlineNg2Template= require('gulp-inline-ng2-template');
const runSequence = require('run-sequence');


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
 * Before copy, remove files existing
 */
gulp.task(':pre:bundle:clean', cleanTask([DIST_ROOT, TMP_ROOT]));

/**
 * A task to prepare bundle app
 * To alter file contents, copy app files.
 */
gulp.task(':pre:bundle:copy', [':pre:bundle:clean'], copyTask(APP_ROOT, TMP_ROOT));

/**
 * Compile stylus to css to inject as ng2 template
 */
gulp.task(':pre:bundle:styl', [':pre:bundle:copy'], stylusBuildTask(TMP_ROOT, TMP_ROOT));

/**
 * Inject html and css templates to ts as string
 *
 * TODO: resolve error of .pipe (Unresolved function or method)
 */
gulp.task(':pre:bundle:template', [':pre:bundle:styl'], () => {
  return gulp.src(join(TMP_ROOT, '**/*.ts'))
    .pipe<any>(inlineNg2Template({
      base: 'tmp',
      useRelativePaths: true
    }))
    .pipe(gulp.dest(TMP_ROOT));
});

/**
 * Compile ts files injected html and css templates.
 * Without source-map, uglify files.
 */
gulp.task(':pre:bundle:ts', [':pre:bundle:template'], () => {
  const tsConfigPath = join(TMP_ROOT, 'tsconfig.json');

  // Start Transpiling with tsconfig
  gutil.log(gutil.colors.green(`Start tsc with ${tsConfigPath}`));
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));
  const dest = join(path.dirname(tsConfigPath), tsConfig['compilerOptions']['outDir']);
  const tsProject = gulpTs.createProject(tsConfigPath, {
    typescript: require('typescript')
  });

  return tsProject.src()
    .pipe(gulpTs(tsProject))
    .pipe(gulp.dest(dest));
});


/**
 * bundle for system.js
 */
gulp.task('bundle:app', [':pre:bundle:ts'], () => {
  const builder = new systemjsBuilder(PROJECT_ROOT, 'systemjs.config.js');
  const src = join(DIST_ROOT, 'main.js');
  const dest = join(DIST_ROOT, 'app.js');
  const config = {
    mangle: false,
    minify: false,
    sourceMaps: false
  };

  builder.bundle(src, dest, config)
    .then(() => {
      console.log('Build Complete');
    })
    .catch((err) => {
      console.error('Build Failed', err);
    });
});


/**
 * A task for clean unnecessary files after bundle
 */
gulp.task(':clean:after-bundle', () => {
  return del([
    join(TMP_ROOT, '**/*'),
    join(DIST_ROOT, '**/*'),
    '!' + join(DIST_ROOT, 'app.js'),
    '!' + join(DIST_ROOT, 'dependency.js'),
  ]);
});


/**
 * A task of all set-up
 */
gulp.task('bundle', () => {
  runSequence(
    'bundle:app',
    'bundle:dependencies',
    ':clean:after-bundle'
  );
});