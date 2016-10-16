"use strict";
var fs = require('fs');
var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpSourcemaps = require('gulp-sourcemaps');
var path = require('path');
var constants_1 = require('./constants');
/** Those imports lack typings */
var gulpServer = require('gulp-server-livereload');
/** If the string passed in is a glob, returns it, otherwise append '**\/*' to it. */
function _globify(maybeGlob, suffix) {
    if (suffix === void 0) { suffix = '**/*'; }
    if (maybeGlob.indexOf('*') != -1) {
        return maybeGlob;
    }
    try {
        var stat = fs.statSync(maybeGlob);
        if (stat.isFile()) {
            return maybeGlob;
        }
    }
    catch (e) { }
    return path.join(maybeGlob, suffix);
}
/** Create a SASS Build Task. */
function sassBuildTask(destDir, srcRootDir, sassOptions) {
    return function () {
        return gulp.src(_globify(srcRootDir, '**/*.scss'))
            .pipe(gulpSourcemaps.init())
            .pipe(gulpSass(sassOptions).on('error', gulpSass.logError))
            .pipe(gulpSourcemaps.write('.'))
            .pipe(gulp.dest(destDir));
    };
}
exports.sassBuildTask = sassBuildTask;
/** Create a task that serves the index.html */
function serverTask(liveReload, streamCallback) {
    if (liveReload === void 0) { liveReload = true; }
    if (streamCallback === void 0) { streamCallback = null; }
    return function () {
        var stream = gulp.src(constants_1.PROJECT_ROOT)
            .pipe(gulpServer({
            livereload: liveReload,
            fallback: 'index.html',
            port: 4200
        }));
        if (streamCallback) {
            streamCallback(stream);
        }
        return stream;
    };
}
exports.serverTask = serverTask;
//# sourceMappingURL=task_helpers.js.map