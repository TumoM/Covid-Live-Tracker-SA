***REMOVED********************************
***REMOVED***         Release All
***REMOVED*********************************/

/*
 This task update all SUI individual component repos with new versions of components

 ***REMOVED*** Commits changes from create components to GitHub and Tags

*/

var
  gulp = require('gulp')
;

/* Release All***REMOVED***/
module.exports = function (callback) {

  gulp.series(
    'update distributions', // commit less/css versions to github
    'update components', // commit components to github
  )(callback);

***REMOVED***;