***REMOVED********************************
***REMOVED***          Build Task
***REMOVED*********************************/

const
  gulp         = require('gulp'),

  // node dependencies
  console      = require('better-console'),

  // gulp dependencies
  autoprefixer = require('gulp-autoprefixer'),
  chmod        = require('gulp-chmod'),
  concatCSS    = require('gulp-concat-css'),
  dedupe       = require('gulp-dedupe'),
  flatten      = require('gulp-flatten'),
  gulpif       = require('gulp-if'),
  header       = require('gulp-header'),
  less         = require('gulp-less'),
  minifyCSS    = require('gulp-clean-css'),
  normalize    = require('normalize-path'),
  plumber      = require('gulp-plumber'),
  print        = require('gulp-print').default,
  rename       = require('gulp-rename'),
  replace      = require('gulp-replace'),
  replaceExt   = require('replace-ext'),
  rtlcss       = require('gulp-rtlcss'),

  // config
  config       = require('./../config/user'),
  docsConfig   = require('./../config/docs'),
  tasks        = require('../config/tasks'),
  install      = require('../config/project/install'),

  // shorthand
  globs        = config.globs,
  assets       = config.paths.assets,

  banner       = tasks.banner,
  filenames    = tasks.filenames,
  comments     = tasks.regExp.comments,
  log          = tasks.log,
  settings     = tasks.settings
;

***REMOVED***
***REMOVED*** Builds the css
***REMOVED*** @param src
***REMOVED*** @param type
***REMOVED*** @param compress
***REMOVED*** @param config
***REMOVED*** @param opts
***REMOVED*** @return {****REMOVED***
***REMOVED***/
function build(src, type, compress, config, opts) {
  let fileExtension;
  if (type === 'rtl' && compress) {
    fileExtension = settings.rename.rtlMinCSS;
***REMOVED*** else if (type === 'rtl') {
    fileExtension = settings.rename.rtlCSS;
***REMOVED*** else if (compress) {
    fileExtension = settings.rename.minCSS;
***REMOVED***

  return gulp.src(src, opts)
    .pipe(plumber(settings.plumber.less))
    .pipe(less(settings.less))
    .pipe(autoprefixer(settings.prefix))
    .pipe(gulpif(type === 'rtl', rtlcss()))
    .pipe(replace(comments.variables.in, comments.variables.out))
    .pipe(replace(comments.license.in, comments.license.out))
    .pipe(replace(comments.large.in, comments.large.out))
    .pipe(replace(comments.small.in, comments.small.out))
    .pipe(replace(comments.tiny.in, comments.tiny.out))
    .pipe(flatten())
    .pipe(replace(config.paths.assets.source,
      compress ? config.paths.assets.compressed : config.paths.assets.uncompressed))
    .pipe(gulpif(compress, minifyCSS(settings.minify)))
    .pipe(gulpif(fileExtension, rename(fileExtension)))
    .pipe(gulpif(config.hasPermissions, chmod(config.parsedPermissions)))
    .pipe(gulp.dest(compress ? config.paths.output.compressed : config.paths.output.uncompressed))
    .pipe(print(log.created))
    ;
***REMOVED***

***REMOVED***
***REMOVED*** Packages the css files in dist
***REMOVED*** @param {string***REMOVED*** type - type of the css processing (none, rtl, docs)
***REMOVED*** @param {boolean***REMOVED*** compress - should the output be compressed
***REMOVED***/
function pack(type, compress) {
  const output       = type === 'docs' ? docsConfig.paths.output : config.paths.output;
  const ignoredGlobs = type === 'rtl' ? globs.ignoredRTL + '.rtl.css' : globs.ignored + '.css';

  let concatenatedCSS;
  if (type === 'rtl') {
    concatenatedCSS = compress ? filenames.concatenatedMinifiedRTLCSS : filenames.concatenatedRTLCSS;
***REMOVED*** else {
    concatenatedCSS = compress ? filenames.concatenatedMinifiedCSS : filenames.concatenatedCSS;
***REMOVED***

  return gulp.src(output.uncompressed + '***REMOVED***/' + globs.components + ignoredGlobs)
    .pipe(plumber())
    .pipe(dedupe())
    .pipe(replace(assets.uncompressed, assets.packaged))
    .pipe(concatCSS(concatenatedCSS, settings.concatCSS))
    .pipe(gulpif(config.hasPermissions, chmod(config.parsedPermissions)))
    .pipe(gulpif(compress, minifyCSS(settings.concatMinify)))
    .pipe(header(banner, settings.header))
    .pipe(gulp.dest(output.packaged))
    .pipe(print(log.created))
    ;
***REMOVED***

function buildCSS(src, type, config, opts, callback) {
  if (!install.isSetup()) {
    console.error('Cannot build CSS files. Run "gulp install" to set-up Semantic');
    callback();
    return;
***REMOVED***

  if (callback === undefined) {
    callback = opts;
    opts     = config;
    config   = type;
    type     = src;
    src      = config.paths.source.definitions + '***REMOVED***/' + config.globs.components + '.less';
***REMOVED***
/*
  const buildUncompressed       = () => build(src, type, false, config, opts);
  buildUncompressed.displayName = 'Building uncompressed CSS';
*/

  const buildCompressed       = () => build(src, type, true, config, opts);
  buildCompressed.displayName = 'Building compressed CSS';

  const packUncompressed       = () => pack(type, false);
  packUncompressed.displayName = 'Packing uncompressed CSS';

  const packCompressed       = () => pack(type, true);
  packCompressed.displayName = 'Packing compressed CSS';

  gulp.parallel(
    // gulp.series(buildUncompressed, packUncompressed),
    gulp.series(buildCompressed, packCompressed)
  )(callback);
***REMOVED***

function rtlAndNormal(src, callback) {
  if (callback === undefined) {
    callback = src;
    src      = config.paths.source.definitions + '***REMOVED***/' + config.globs.components + '.less';
***REMOVED***

  const rtl       = (callback) => buildCSS(src, 'rtl', config, {***REMOVED***, callback);
  rtl.displayName = "CSS Right-To-Left";
  const css       = (callback) => buildCSS(src, 'default', config, {***REMOVED***, callback);
  css.displayName = "CSS";

  if (config.rtl === true || config.rtl === 'Yes') {
    rtl(callback);
***REMOVED*** else if (config.rtl === 'both') {
    gulp.series(rtl, css)(callback);
***REMOVED*** else {
    css(callback);
***REMOVED***
***REMOVED***

function docs(src, callback) {
  if (callback === undefined) {
    callback = src;
    src      = config.paths.source.definitions + '***REMOVED***/' + config.globs.components + '.less';
***REMOVED***

  const func       = (callback) => buildCSS(src, 'docs', config, {***REMOVED***, callback);
  func.displayName = "CSS Docs";

  func(callback);
***REMOVED***

// Default tasks
module.exports = rtlAndNormal;

// We keep the changed files in an array to call build with all of them at the same time
let timeout, files = [];

***REMOVED***
***REMOVED*** Watch changes in CSS files and call the correct build pipe
***REMOVED*** @param type
***REMOVED*** @param config
***REMOVED***/
module.exports.watch = function (type, config) {
  const method = type === 'docs' ? docs : rtlAndNormal;

  // Watch theme.config file
  gulp.watch([
    normalize(config.paths.source.config),
    normalize(config.paths.source.site + '***REMOVED***/site.variables'),
    normalize(config.paths.source.themes + '***REMOVED***/site.variables')
  ])
    .on('all', function () {
      // Clear timeout and reset files
      timeout && clearTimeout(timeout);
      files = [];
      return gulp.series(method)();
  ***REMOVED***);

  // Watch any less / overrides / variables files
  gulp.watch([
    normalize(config.paths.source.definitions + '***REMOVED***/*.less'),
    normalize(config.paths.source.site + '***REMOVED***/*.{overrides,variables***REMOVED***'),
    normalize(config.paths.source.themes + '***REMOVED***/*.{overrides,variables***REMOVED***')
  ])
    .on('all', function (event, path) {
      // We don't handle deleted files yet
      if (event === 'unlink' || event === 'unlinkDir') {
        return;
    ***REMOVED***

      // Clear timeout
      timeout && clearTimeout(timeout);

      // Determine which LESS file has to be recompiled
      let lessPath;
      if(path.indexOf('site.variables') !== -1)  {
        return;
    ***REMOVED*** else if (path.indexOf(config.paths.source.themes) !== -1) {
        console.log('Change detected in packaged theme');
        lessPath = replaceExt(path, '.less');
        lessPath = lessPath.replace(tasks.regExp.theme, config.paths.source.definitions);
    ***REMOVED*** else if (path.indexOf(config.paths.source.site) !== -1) {
        console.log('Change detected in site theme');
        lessPath = replaceExt(path, '.less');
        lessPath = lessPath.replace(config.paths.source.site, config.paths.source.definitions);
    ***REMOVED*** else {
        console.log('Change detected in definition');
        lessPath = path;
    ***REMOVED***

      // Add file to internal changed files array
      if (!files.includes(lessPath)) {
        files.push(lessPath);
    ***REMOVED***

      // Update timeout
      timeout = setTimeout(() => {
        // Copy files to build in another array
        const buildFiles = [...files];
        // Call method
        gulp.series((callback) => method(buildFiles, callback))();
        // Reset internal changed files array
        files = [];
    ***REMOVED*** 1000);
  ***REMOVED***);
***REMOVED***;

// Expose build css method
module.exports.buildCSS = buildCSS;