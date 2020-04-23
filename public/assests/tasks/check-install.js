***REMOVED********************************
***REMOVED***        Check Install
***REMOVED*********************************/

var
  // node dependencies
  gulp    = require('gulp'),
  console = require('better-console'),
  isSetup = require('./config/project/install').isSetup,

  install = require('./install'),
  watch   = require('./watch')
;

// export task
module.exports = function (callback) {

  setTimeout(function () {
    if (!isSetup()) {
      console.log('Starting install...');
      install(callback);
  ***REMOVED*** else {
      watch(callback);
  ***REMOVED***
***REMOVED*** 50); // Delay to allow console.clear to remove messages from check event

***REMOVED***;