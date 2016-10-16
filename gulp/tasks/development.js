/**
 * The tasks for development, compiling pug, scss
 */
"use strict";
var gulp = require('gulp');
var path_1 = require('path');
var task_helpers_1 = require('../task_helpers');
var constants_1 = require('../constants');
// This import is lack a type
var gulpPug = require('gulp-pug');
var pugFilesToBuild = path_1.join(constants_1.SOURCE_ROOT, 'pug/index.pug');
var pugFilesToWatch = path_1.join(constants_1.SOURCE_ROOT, 'pug/**/*.pug');
var scssFilesToBuild = path_1.join(constants_1.SOURCE_ROOT, 'scss/**/*.scss');
gulp.task(':build:pug', function () {
    return gulp.src(pugFilesToBuild)
        .pipe(gulpPug({
        pretty: true
    }))
        .pipe(gulp.dest(constants_1.PROJECT_ROOT));
});
gulp.task(':build:scss', task_helpers_1.sassBuildTask('css', scssFilesToBuild));
gulp.task('build:app', [':build:pug', ':build:scss']);
gulp.task('watch:app', function () {
    gulp.watch(pugFilesToWatch, [':build:pug']);
    gulp.watch(scssFilesToBuild, [':build:scss']);
});
gulp.task('serve:app', ['build:app', 'watch:app'], task_helpers_1.serverTask());
//# sourceMappingURL=development.js.map