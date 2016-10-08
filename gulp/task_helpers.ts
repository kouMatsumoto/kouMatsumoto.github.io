import * as fs from 'fs';
import * as gulp from 'gulp';
import * as gulpSass from 'gulp-sass';
import * as gulpSourcemaps from 'gulp-sourcemaps';
import * as path from 'path';



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
