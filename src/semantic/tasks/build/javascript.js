***REMOVED********************************
 Build Task
***REMOVED*********************************/

const
  gulp       = require('gulp'),

  // node dependencies
  console    = require('better-console'),

  // gulp dependencies
  chmod      = require('gulp-chmod'),
  concat     = require('gulp-concat'),
  dedupe     = require('gulp-dedupe'),
  flatten    = require('gulp-flatten'),
  gulpif     = require('gulp-if'),
  header     = require('gulp-header'),
  normalize  = require('normalize-path'),
  plumber    = require('gulp-plumber'),
  print      = require('gulp-print').default,
  rename     = require('gulp-rename'),
  replace    = require('gulp-replace'),
  uglify     = require('gulp-uglify'),

  // config
  config     = require('./../config/user'),
  docsConfig = require('./../config/docs'),
  tasks      = require('../config/tasks'),
  install    = require('../config/project/install'),

  // shorthand
  globs      = config.globs,
  assets     = config.paths.assets,

  banner     = tasks.banner,
  filenames  = tasks.filenames,
  comments   = tasks.regExp.comments,
  log        = tasks.log,
  settings   = tasks.settings
;

***REMOVED***
***REMOVED*** Concat and uglify the Javascript files
***REMOVED*** @param {string|array***REMOVED*** src - source files
***REMOVED*** @param type
***REMOVED*** @param config
***REMOVED*** @return {****REMOVED***
***REMOVED***/
function build(src, type, config) {
  return gulp.src(src)
    .pipe(plumber())
    .pipe(flatten())
    .pipe(replace(comments.license.in, comments.license.out))
    .pipe(gulpif(config.hasPermissions, chmod(config.parsedPermissions)))
    .pipe(gulp.dest(config.paths.output.uncompressed))
    .pipe(print(log.created))
    .pipe(uglify(settings.uglify))
    .pipe(rename(settings.rename.minJS))
    .pipe(header(banner, settings.header))
    .pipe(gulpif(config.hasPermissions, chmod(config.parsedPermissions)))
    .pipe(gulp.dest(config.paths.output.compressed))
    .pipe(print(log.created))
    ;
***REMOVED***

***REMOVED***
***REMOVED*** Packages the Javascript files in dist
***REMOVED*** @param {string***REMOVED*** type - type of the js processing (none, rtl, docs)
***REMOVED*** @param {boolean***REMOVED*** compress - should the output be compressed
***REMOVED***/
function pack(type, compress) {
  const output         = type === 'docs' ? docsConfig.paths.output : config.paths.output;
  const concatenatedJS = compress ? filenames.concatenatedMinifiedJS : filenames.concatenatedJS;

  return gulp.src(output.uncompressed + '***REMOVED***/' + globs.components + globs.ignored + '.js')
    .pipe(plumber())
    .pipe(dedupe())
    .pipe(replace(assets.uncompressed, assets.packaged))
    .pipe(concat(concatenatedJS))
    .pipe(gulpif(compress, uglify(settings.concatUglify)))
    .pipe(header(banner, settings.header))
    .pipe(gulpif(config.hasPermissions, chmod(config.parsedPermissions)))
    .pipe(gulp.dest(output.packagedJS))
    .pipe(print(log.created))
    ;
***REMOVED***

function buildJS(src, type, config, callback) {
  if (!install.isSetup()) {
    console.error('Cannot build Javascript. Run "gulp install" to set-up Semantic');
    callback();
    return;
***REMOVED***

  if (callback === undefined) {
    callback = config;
    config   = type;
    type     = src;
    src      = config.paths.source.definitions + '***REMOVED***/' + config.globs.components + (config.globs.ignored || '') + '.js';
***REMOVED***

  // copy source javascript
  const js       = () => build(src, type, config);
  js.displayName = "Building un/compressed Javascript";

/*
  const packUncompressed       = () => pack(type, false);
  packUncompressed.displayName = 'Packing uncompressed Javascript';
*/

  const packCompressed       = () => pack(type, true);
  packCompressed.displayName = 'Packing compressed Javascript';

  gulp.series(js, gulp.parallel(
      // packUncompressed,
      packCompressed))(callback);
***REMOVED***

module.exports = function (callback) {
  buildJS(false, config, callback);
***REMOVED***;

// We keep the changed files in an array to call build with all of them at the same time
let timeout, files = [];

module.exports.watch = function (type, config) {
  gulp
    .watch([normalize(config.paths.source.definitions + '***REMOVED***/*.js')])
    .on('all', function (event, path) {
      // We don't handle deleted files yet
      if (event === 'unlink' || event === 'unlinkDir') {
        return;
    ***REMOVED***

      // Clear timeout
      timeout && clearTimeout(timeout);

      // Add file to internal changed files array
      if (!files.includes(path)) {
        files.push(path);
    ***REMOVED***

      // Update timeout
      timeout = setTimeout(() => {
        console.log('Change in javascript detected');
        // Copy files to build in another array
        const buildFiles = [...files];
        // Call method
        gulp.series((callback) => buildJS(buildFiles, type, config, callback))();
        // Reset internal changed files array
        files = [];
    ***REMOVED*** 1000);
  ***REMOVED***);
***REMOVED***;

module.exports.buildJS = buildJS;
