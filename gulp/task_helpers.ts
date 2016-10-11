import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gulpSass from 'gulp-sass';
import * as gulpSourcemaps from 'gulp-sourcemaps';
import * as path from 'path';

/** Those imports lack typings */
const gulpServer = require('gulp-server-livereload');



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


/** Create a SASS Build Task. */
export function sassBuildTask(destDir: string, srcRootDir: string, sassOptions?) {

  return () => {
    return gulp.src(_globify(srcRootDir, '**/*.scss'))
      .pipe(gulpSourcemaps.init())
      .pipe(gulpSass(sassOptions).on('error', gulpSass.logError))
      .pipe(gulpSourcemaps.write('.'))
      .pipe(gulp.dest(destDir));
  };
}


/** Create a task that serves the index.html */
export function serverTask(liveReload: boolean = true,
                           streamCallback: (stream: NodeJS.ReadWriteStream) => void = null) {
  return () => {
    const stream = gulp.src('')
      .pipe(gulpServer({
        livereload: liveReload,
        fallback: 'index.html',
        port: 4200
      }));

    if (streamCallback) {
      streamCallback(stream);
    }
    return stream;
  }
}