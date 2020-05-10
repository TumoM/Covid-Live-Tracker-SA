var
  browserslist = require('browserslist'),
  console = require('better-console'),
  config  = require('./user'),
  release = require('./project/release')
;

var defaultBrowsers = browserslist(browserslist.defaults)
var userBrowsers = browserslist()
var hasBrowserslistConfig = JSON.stringify(defaultBrowsers) !== JSON.stringify(userBrowsers)

var overrideBrowserslist = hasBrowserslistConfig ? undefined : [
  'last 2 versions',
  '> 1%',
  'opera 12.1',
  'bb 10',
  'android 4'
]

module.exports = {

  banner : release.banner,

  log: {
    created: function(file) {
      return 'Created: ' + file;
  ***REMOVED***
    modified: function(file) {
      return 'Modified: ' + file;
  ***REMOVED***
***REMOVED***

  filenames: {
    concatenatedCSS            : 'semantic.css',
    concatenatedJS             : 'semantic.js',
    concatenatedMinifiedCSS    : 'semantic.min.css',
    concatenatedMinifiedJS     : 'semantic.min.js',
    concatenatedRTLCSS         : 'semantic.rtl.css',
    concatenatedMinifiedRTLCSS : 'semantic.rtl.min.css'
***REMOVED***

  regExp: {

    comments: {

      // remove all comments from config files (.variable)
      variables : {
        in  : /(\/\*[\s\S]+?\*\/+)[\s\S]+?\/\* End Config \*\//,
        out : '$1',
    ***REMOVED***

      // add version to first comment
      license: {
        in  : /(^\/\*[\s\S]+)(# Semantic UI )([\s\S]+?\*\/)/,
        out : '$1$2' + release.version + ' $3'
    ***REMOVED***

      // adds uniform spacing around comments
      large: {
        in  : /(\/\*\*\*\*[\s\S]+?\*\/)/mg,
        out : '\n\n$1\n'
    ***REMOVED***
      small: {
        in  : /(\/\*---[\s\S]+?\*\/)/mg,
        out : '\n$1\n'
    ***REMOVED***
      tiny: {
        in  : /(\/\* [\s\S]+? \*\/)/mg,
        out : '\n$1'
    ***REMOVED***
  ***REMOVED***

    theme: /.*(\/|\\)themes(\/|\\).*?(?=(\/|\\))/mg

***REMOVED***

  settings: {

    /* Remove Files in Clean***REMOVED***/
    del: {
      silent : true
  ***REMOVED***

    concatCSS: {
      rebaseUrls: false
  ***REMOVED***

    /* Comment Banners***REMOVED***/
    header: {
      title      : release.title,
      version    : release.version,
      repository : release.repository,
      url        : release.url
  ***REMOVED***

    plumber: {
      less: {
        errorHandler: function(error) {
          var
            regExp = {
              variable : /@(\S.*?)\s/,
              theme    : /themes[\/\\]+(.*?)[\/\\].*/,
              element  : /[\/\\]([^\/\\*]*)\.overrides/
***REMOVED*****REMOVED*****REMOVED***
            theme,
            element
          ;
          if(error.filename.match(/theme.less/)) {
            if (error.line == 9) {
              element = regExp.variable.exec(error.message)[1];
              if (element) {
                console.error('Missing theme.config value for ', element);
            ***REMOVED***
              console.error('Most likely new UI was added in an update. You will need to add missing elements from theme.config.example');
          ***REMOVED*** else if (error.line == 73) {
              element = regExp.element.exec(error.message)[1];
              theme   = regExp.theme.exec(error.message)[1];
              console.error(theme + ' is not an available theme for ' + element);
          ***REMOVED*** else {
              console.error(error);
          ***REMOVED***
        ***REMOVED***
          else {
            throw new Error(error);
        ***REMOVED***
          this.emit('end');
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

    /* What Browsers to Prefix***REMOVED***/
    prefix: {
      overrideBrowserslist
  ***REMOVED***

    /* File Renames***REMOVED***/
    rename: {
      minJS     : { extname : '.min.js' ***REMOVED***,
      minCSS    : { extname : '.min.css' ***REMOVED***,
      rtlCSS    : { extname : '.rtl.css' ***REMOVED***,
      rtlMinCSS : { extname : '.rtl.min.css' ***REMOVED***
  ***REMOVED***

    /* Minified CSS Concat***REMOVED***/
    minify: {
      processImport       : false,
      restructuring       : false,
      keepSpecialComments : 1,
      roundingPrecision   : -1,
  ***REMOVED***

    /* Minified JS Settings***REMOVED***/
    uglify: {
      mangle   : true,
      output: {
        comments: 'some'
    ***REMOVED***
  ***REMOVED***

    /* Minified Concat CSS Settings***REMOVED***/
    concatMinify: {
      processImport       : false,
      restructuring       : false,
      keepSpecialComments : false,
      roundingPrecision   : -1,
  ***REMOVED***

    /* Minified Concat JS***REMOVED***/
    concatUglify: {
      mangle   : true,
      output: {
        comments: 'some'
    ***REMOVED***
  ***REMOVED***

***REMOVED***
***REMOVED***;
