"use strict";
var gulp = require('gulp');
gulp.task('default', ['help']);
gulp.task('help', function () {
    var taskList = Object.keys(gulp['tasks'])
        .sort();
    console.log("\nHere's a list of supported tasks:\n   ", taskList.join('\n    '));
});
//# sourceMappingURL=default.js.map