***REMOVED********************************
***REMOVED***         Release
***REMOVED*********************************/

/*
 This task update all SUI individual component repos with new versions of components

 ***REMOVED*** Initializes repositories with current versions
 ***REMOVED*** Creates local files at ../distributions/ with each repo for release

*/

var
  gulp = require('gulp')
;

/* Release All***REMOVED***/
module.exports = function (callback) {

  gulp.series(
    //'build', // build Semantic
    'init distributions', // sync with current github version
    'create distributions', // update each repo with changes from master repo
    'init components', // sync with current github version
    'create components', // update each repo
  )(callback);

***REMOVED***;