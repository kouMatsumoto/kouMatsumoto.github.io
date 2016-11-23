const path = require('path');

module.exports = (config) => {
  config.set({
    basePath: path.join(__dirname, 'app'),
    frameworks: ['jasmine'],
    files: [],

    preprocessors: {},
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,

    browserDisconnectTimeout: 20000,
    browserNoActivityTimeout: 240000,
    captureTimeout: 120000,
    browser: ['Chrome'],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher'
    ]
  });
};