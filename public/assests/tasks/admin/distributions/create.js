***REMOVED********************************
     Create Distributions
*******************************/

/*
 This will create individual distribution repositories for each SUI distribution

 ***REMOVED*** copy distribution files to release
 ***REMOVED*** update package.json file
*/

var
  gulp            = require('gulp'),

  // node dependencies
  fs              = require('fs'),
  path            = require('path'),
  mergeStream     = require('merge-stream'),

  // admin dependencies
  flatten         = require('gulp-flatten'),
  jsonEditor      = require('gulp-json-editor'),
  plumber         = require('gulp-plumber'),
  rename          = require('gulp-rename'),
  replace         = require('gulp-replace'),

  // config
  config          = require('../../config/user'),
  release         = require('../../config/admin/release'),
  project         = require('../../config/project/release'),

  // shorthand
  version         = project.version,
  output          = config.paths.output

;


module.exports = function(callback) {
  var
    stream,
    index,
    tasks = []
  ;

  for(index in release.distributions) {

    var
      distribution = release.distributions[index]
    ;

    // streams... designed to save time and make coding fun...
    (function(distribution) {

      var
        distLowerCase   = distribution.toLowerCase(),
        outputDirectory = path.join(release.outputRoot, distLowerCase),
        packageFile     = path.join(outputDirectory, release.files.npm),
        repoName        = release.distRepoRoot + distribution,
        regExp          = {
          match : {
            files   : '{files***REMOVED***',
            version : '{version***REMOVED***'
        ***REMOVED***
 ***REMOVED*****REMOVED***
        task = {
          all     : distribution + ' copying files',
          repo    : distribution + ' create repo',
          meteor  : distribution + ' create meteor package.js',
          package : distribution + ' create package.json'
 ***REMOVED*****REMOVED***
        gatherFiles,
        createList
      ;

      // get files for meteor
      gatherFiles = function(dir) {
        var
          dir   = dir || path.resolve('.'),
          list  = fs.readdirSync(dir),
          omitted = [
            '.git',
            'node_modules',
            'package.js',
            'LICENSE',
            'README.md',
            'package.json',
            'bower.json',
            '.gitignore'
      ***REMOVED***,
          files = []
        ;
        list.forEach(function(file) {
          var
            isOmitted = (omitted.indexOf(file) > -1),
            filePath  = path.join(dir, file),
            stat      = fs.statSync(filePath)
          ;
          if(!isOmitted) {
            if(stat && stat.isDirectory()) {
              files = files.concat(gatherFiles(filePath));
          ***REMOVED***
            else {
              files.push(filePath.replace(outputDirectory + path.sep, ''));
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***);
        return files;
    ***REMOVED***;

      // spaces out list correctly
      createList = function(files) {
        var filenames = '';
        for(var file in files) {
          if(file == (files.length - 1) ) {
            filenames += "'" + files[file] + "'";
        ***REMOVED***
          else {
            filenames += "'" + files[file] + "',\n    ";
        ***REMOVED***
      ***REMOVED***
        return filenames;
    ***REMOVED***;

      tasks.push(function() {
          var
              files     = gatherFiles(outputDirectory),
              filenames = createList(files)
          ;
          gulp.src(release.templates.meteor[distLowerCase])
              .pipe(plumber())
              .pipe(flatten())
              .pipe(replace(regExp.match.version, version))
              .pipe(replace(regExp.match.files, filenames))
              .pipe(rename(release.files.meteor))
              .pipe(gulp.dest(outputDirectory))
          ;
    ***REMOVED***);

      if(distribution == 'CSS') {
        tasks.push(function() {
          var
            themes,
            components,
            releases
          ;
          themes = gulp.src('dist/themes/default***REMOVED***/*', { base: 'dist/' ***REMOVED***)
            .pipe(gulp.dest(outputDirectory))
          ;
          components = gulp.src('dist/components/*', { base: 'dist/' ***REMOVED***)
            .pipe(gulp.dest(outputDirectory))
          ;
          releases = gulp.src('dist/*', { base: 'dist/' ***REMOVED***)
            .pipe(gulp.dest(outputDirectory))
          ;
          return mergeStream(themes, components, releases);
      ***REMOVED***);
    ***REMOVED***
      else if(distribution == 'LESS') {
        tasks.push(function() {
          var
            definitions,
            themeImport,
            themeConfig,
            siteTheme,
            themes
          ;
          definitions = gulp.src('src/definitions***REMOVED***/*', { base: 'src/' ***REMOVED***)
            .pipe(gulp.dest(outputDirectory))
          ;
          themeImport = gulp.src('src/semantic.less', { base: 'src/' ***REMOVED***)
            .pipe(gulp.dest(outputDirectory))
          ;
          themeImport = gulp.src('src/theme.less', { base: 'src/' ***REMOVED***)
            .pipe(gulp.dest(outputDirectory))
          ;
          themeConfig = gulp.src('src/theme.config.example', { base: 'src/' ***REMOVED***)
            .pipe(gulp.dest(outputDirectory))
          ;
          siteTheme = gulp.src('src/_site***REMOVED***/*', { base: 'src/' ***REMOVED***)
            .pipe(gulp.dest(outputDirectory))
          ;
          themes = gulp.src('src/themes***REMOVED***/*', { base: 'src/' ***REMOVED***)
            .pipe(gulp.dest(outputDirectory))
          ;
          return mergeStream(definitions, themeImport, themeConfig, siteTheme, themes);
      ***REMOVED***);
    ***REMOVED***

      // extend package.json
      tasks.push(function() {
        return gulp.src(packageFile)
          .pipe(plumber())
          .pipe(jsonEditor(function(package) {
            if(version) {
              package.version = version;
          ***REMOVED***
            return package;
        ***REMOVED***))
          .pipe(gulp.dest(outputDirectory))
        ;
    ***REMOVED***);

  ***REMOVED***)(distribution);
***REMOVED***

  gulp.series(...tasks)(callback);
***REMOVED***;