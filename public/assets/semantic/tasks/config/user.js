***REMOVED********************************
             Set-up
*******************************/

var
  // npm dependencies
  extend          = require('extend'),
  fs              = require('fs'),
  path            = require('path'),
  requireDotFile  = require('require-dot-file'),

  // semantic.json defaults
  defaults        = require('./defaults'),
  config          = require('./project/config'),

  // Final config object
  gulpConfig = {***REMOVED***,

  // semantic.json settings
  userConfig

;


***REMOVED********************************
          User Config
*******************************/

try {
  // looks for config file across all parent directories
  userConfig = requireDotFile('semantic.json');
***REMOVED***
catch(error) {
  if(error.code === 'MODULE_NOT_FOUND') {
    console.error('No semantic.json config found');
***REMOVED***
***REMOVED***

// extend user config with defaults
gulpConfig = (!userConfig)
  ? extend(true, {***REMOVED***, defaults)
  : extend(false, {***REMOVED***, defaults, userConfig)
;

***REMOVED********************************
       Add Derived Values
*******************************/

// adds calculated values
config.addDerivedValues(gulpConfig);


***REMOVED********************************
             Export
*******************************/

module.exports = gulpConfig;

