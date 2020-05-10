***REMOVED********************************
         Release Config
*******************************/

var
  requireDotFile = require('require-dot-file'),
  config,
  npmPackage,
  version
;


***REMOVED********************************
         Derived Values
*******************************/

try {
  config = requireDotFile('semantic.json');
***REMOVED***
catch(error) {***REMOVED***


try {
  npmPackage = require('../../../package.json');
***REMOVED***
catch(error) {
  // generate fake package
  npmPackage = {
    name: 'Unknown',
    version: 'x.x'
***REMOVED***;
***REMOVED***

// looks for version in config or package.json (whichever is available)
version = (npmPackage && npmPackage.version !== undefined && npmPackage.name == 'fomantic-ui')
  ? npmPackage.version
  : config.version
;


***REMOVED********************************
             Export
*******************************/

module.exports = {

  title      : 'Fomantic UI',
  repository : 'https://github.com/fomantic/Fomantic-UI',
  url        : 'http://fomantic-ui.com/',

  banner: ''
    + ' /*' + '\n'
    + '***REMOVED*** # <%= title %> - <%= version %>' + '\n'
    + '***REMOVED*** <%= repository %>' + '\n'
    + '***REMOVED*** <%= url %>' + '\n'
    + '***REMOVED***' + '\n'
    + '***REMOVED*** Copyright 2014 Contributors' + '\n'
    + '***REMOVED*** Released under the MIT license' + '\n'
    + '***REMOVED*** http://opensource.org/licenses/MIT' + '\n'
    + '***REMOVED***' + '\n'
    + '***REMOVED***/' + '\n',

  version    : version

***REMOVED***;
