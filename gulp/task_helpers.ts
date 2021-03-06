import * as fs from 'fs';
import * as del from 'del';
import * as gulp from 'gulp';
import * as gulpSourcemaps from 'gulp-sourcemaps';
import * as gulpTs from 'gulp-typescript';
import * as gutil from 'gulp-util';
import * as path from 'path';
import {PROJECT_ROOT} from './constants';

/** Those imports lack typings */
const gulpServer = require('gulp-server-livereload');
const gulpStylus = require('gulp-stylus');


/** If the string passed in is a glob, returns it, otherwise append '**\/*' to it. */
function _globify(maybeGlob: string, suffix = '**/*') {
  if (maybeGlob.indexOf('*') != -1) {
    return maybeGlob;
  }
  try {
    const stat = fs.statSync(maybeGlob);
    if (stat.isFile()) {
      return maybeGlob;
    }
  } catch (e) {}
  return path.join(maybeGlob, suffix);
}


/** Create a TS Build Task, based on the options */
export function tsBuildTask(tsConfigPathOrDir: string) {
  return () => {
    let tsConfigPath: string;
    let tsConfigDir: string;

    // Check Whether tsConfigPathOrDir is directory or path of tsconfig
    try {
      fs.accessSync(path.join(tsConfigPathOrDir, 'tsconfig.json'));
      tsConfigPath = path.join(tsConfigPathOrDir, 'tsconfig.json');
      tsConfigDir = tsConfigPathOrDir;
    } catch (e) {
      tsConfigPath = tsConfigPathOrDir;
      tsConfigDir = path.dirname(tsConfigPathOrDir);
    }

    // Start Transpiling with tsconfig
    gutil.log(gutil.colors.green(`Start tsc with ${tsConfigPath}`));
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));
    const dest = path.join(tsConfigDir, tsConfig['compilerOptions']['outDir']);
    const tsProject = gulpTs.createProject(tsConfigPath, {
      typescript: require('typescript')
    });

    // TODO: Resolve `Unresolved function or method .pipe()`
    return tsProject.src()
      .pipe(gulpSourcemaps.init())
      .pipe(gulpTs(tsProject))
      .pipe(gulpSourcemaps.write('.'))
      .pipe(gulp.dest(dest));
  }
}


/** Create a Stylus Build Task. */
export function stylusBuildTask(srcRootDir: string, destDir: string, stylusOptions?: {}) {
  return () => {
    return gulp.src(_globify(srcRootDir, '**/*.styl'))
      .pipe(gulpSourcemaps.init())
      .pipe(gulpStylus(stylusOptions))
      .pipe(gulpSourcemaps.write('.'))
      .pipe(gulp.dest(destDir));
  };
}


/** Copy files from a glob to a destination. */
export function copyTask(srcGlobOrDir: string | string[], outRoot: string) {
  if (typeof srcGlobOrDir === 'string') {
    return () => gulp.src(_globify(srcGlobOrDir)).pipe(gulp.dest(outRoot));
  } else {
    return () => gulp.src(srcGlobOrDir.map(name => _globify(name))).pipe(gulp.dest(outRoot));
  }
}


/**
 * Create a function for gulp task which deletes directories
 *
 * @param pathOrGlob: Path names or glob pattern (if passed path name, it will be converted to glob)
 */
export function cleanTask(pathOrGlob: string | string[]) {
  // convert strings to glob
  let globified;
  if (typeof pathOrGlob === 'string') {
    globified = _globify(pathOrGlob);
  } else {
    globified = pathOrGlob.map(name => _globify(name));
  }

  return () => del.sync(globified);
}


/**
 * Create a function for gulp task witch serves the index.html
 */
export function serverTask(streamCallback: (stream: any) => void = null) {
  return () => {
    const stream = gulp.src(PROJECT_ROOT)
      .pipe(gulpServer({
        livereload: {
          enable: true,
          filter: (filename, cb) => {
            cb(/dist/.test(filename));
          }
        },
        fallback: 'index.html',
        port: 4200,
        open: true
      }));

    if (streamCallback) {
      streamCallback(stream);
    }
    return stream;
  }
}