***REMOVED********************************
          Init Repos
*******************************/

/*

 This task pulls the latest version of each component from GitHub

 ***REMOVED*** Creates new repo if doesnt exist (locally & GitHub)
 ***REMOVED*** Adds remote it doesnt exists
 ***REMOVED*** Pulls latest changes from repo

*/

var
  gulp      = require('gulp'),

  // node dependencies
  console   = require('better-console'),
  del       = require('del'),
  fs        = require('fs'),
  path      = require('path'),
  git       = require('gulp-git'),
  mkdirp    = require('mkdirp'),

  // admin files
  github    = require('../../config/admin/github.js'),
  release   = require('../../config/admin/release'),
  project   = require('../../config/project/release'),


  // oAuth configuration for GitHub
  oAuth     = fs.existsSync(__dirname + '/../../config/admin/oauth.js')
    ? require('../../config/admin/oauth')
    : false,

  // shorthand
  version         = project.version
;

module.exports = function(callback) {

  var
    index = -1,
    total = release.components.length,
    timer,
    stream,
    stepRepo
  ;

  if(!oAuth) {
    console.error('Must add oauth token for GitHub in tasks/config/admin/oauth.js');
    return;
***REMOVED***

  // Do Git commands synchronously per component, to avoid issues
  stepRepo = function() {

    index = index + 1;

    if(index >= total) {
      callback();
      return;
  ***REMOVED***

    var
      component            = release.components[index],
      outputDirectory      = path.resolve(release.outputRoot + component),
      capitalizedComponent = component.charAt(0).toUpperCase() + component.slice(1),
      repoName             = release.componentRepoRoot + capitalizedComponent,

      gitOptions           = { cwd: outputDirectory ***REMOVED***,
      pullOptions          = { args: '-q', cwd: outputDirectory, quiet: true ***REMOVED***,
      resetOptions         = { args: '-q --hard', cwd: outputDirectory, quiet: true ***REMOVED***,

      gitURL               = 'git@github.com:' + release.org + '/' + repoName + '.git',
      repoURL              = 'https://github.com/' + release.org + '/' + repoName + '/',
      localRepoSetup       = fs.existsSync(path.join(outputDirectory, '.git'))
    ;

    console.log('Processing repository: ' + outputDirectory);

    // create folder if doesn't exist
    if( !fs.existsSync(outputDirectory) ) {
      mkdirp.sync(outputDirectory);
  ***REMOVED***

    // clean folder
    if(release.outputRoot.search('../repos') == 0) {
      console.info('Cleaning dir', outputDirectory);
      del.sync([outputDirectory + '**/*'], {silent: true, force: true***REMOVED***);
  ***REMOVED***

    // set-up local repo
    function setupRepo() {
      if(localRepoSetup) {
        addRemote();
    ***REMOVED***
      else {
        initRepo();
    ***REMOVED***
  ***REMOVED***

    function initRepo() {
      console.info('Initializing repository for ' + component);
      git.init(gitOptions, function(error) {
        if(error) {
          console.error('Error initializing repo', error);
      ***REMOVED***
        addRemote();
    ***REMOVED***);
  ***REMOVED***

    function createRepo() {
      console.info('Creating GitHub repo ' + repoURL);
      github.repos.createFromOrg({
        org      : release.org,
        name     : repoName,
        homepage : release.homepage
    ***REMOVED*** function() {
        setupRepo();
    ***REMOVED***);
  ***REMOVED***

    function addRemote() {
      console.info('Adding remote origin as ' + gitURL);
      git.addRemote('origin', gitURL, gitOptions, function(){
        pullFiles();
    ***REMOVED***);
  ***REMOVED***

    function pullFiles() {
      console.info('Pulling ' + component + ' files');
      git.pull('origin', 'master', pullOptions, function(error) {
        resetFiles();
    ***REMOVED***);
  ***REMOVED***

    function resetFiles() {
      console.info('Resetting files to head');
      git.reset('HEAD', resetOptions, function(error) {
        nextRepo();
    ***REMOVED***);
  ***REMOVED***

    function nextRepo() {
      //console.log('Sleeping for 1 second...');
      // avoid rate throttling
      global.clearTimeout(timer);
      timer = global.setTimeout(function() {
        stepRepo()
    ***REMOVED*** 0);
  ***REMOVED***


    if(localRepoSetup) {
      pullFiles();
  ***REMOVED***
    else {
      setupRepo();
      // createRepo() only use to create remote repo (easier to do manually)
  ***REMOVED***

***REMOVED***;

  stepRepo();


***REMOVED***;
