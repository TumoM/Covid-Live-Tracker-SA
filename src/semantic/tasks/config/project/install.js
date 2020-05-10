***REMOVED********************************
            Set-up
*******************************/

var
  fs             = require('fs'),
  path           = require('path'),
  defaults       = require('../defaults'),
  release        = require('./release'),

  requireDotFile = require('require-dot-file')
;

***REMOVED********************************
          When to Ask
*******************************/

/* Preconditions for install questions***REMOVED***/

var when = {

  // path
  changeRoot: function(questions) {
    return (questions.useRoot !== undefined && questions.useRoot !== true);
***REMOVED***

  // permissions
  changePermissions: function(questions) {
    return (questions.changePermissions && questions.changePermissions === true);
***REMOVED***

  // install
  hasConfig: function() {
    return requireDotFile('semantic.json', process.cwd());
***REMOVED***

  allowOverwrite: function(questions) {
    return (questions.overwrite === undefined || questions.overwrite == 'yes');
***REMOVED***
  notAuto: function(questions) {
    return (questions.install !== 'auto' && (questions.overwrite === undefined || questions.overwrite == 'yes'));
***REMOVED***
  custom: function(questions) {
    return (questions.install === 'custom' && (questions.overwrite === undefined || questions.overwrite == 'yes'));
***REMOVED***
  express: function(questions) {
    return (questions.install === 'express' && (questions.overwrite === undefined || questions.overwrite == 'yes'));
***REMOVED***

  // customize
  customize: function(questions) {
    return (questions.customize === true);
***REMOVED***
  primaryColor: function(questions) {
    return (questions.primaryColor);
***REMOVED***
  secondaryColor: function(questions) {
    return (questions.secondaryColor);
***REMOVED***
***REMOVED***;

***REMOVED********************************
        Response Filters
*******************************/

/* Filters to user input from install questions***REMOVED***/

var filter = {
  removeTrailingSlash: function(path) {
    return path.replace(/(\/$|\\$)+/mg, '');
***REMOVED***
***REMOVED***;

***REMOVED********************************
          Configuration
*******************************/

module.exports = {

  // check whether install is setup
  isSetup: function() {
    return when.hasConfig();
***REMOVED***

  // detect whether there is a semantic.json configuration and that the auto-install option is set to true
  shouldAutoInstall: function() {
    var
      config = when.hasConfig()
    ;
    return config['autoInstall'];
***REMOVED***

  // checks if files are in a PM directory
  getPackageManager: function(directory) {
    var
      // returns last matching result (avoid sub-module detection)
      walk = function(directory) {
        var
          pathArray     = directory.split(path.sep),
          folder        = pathArray[pathArray.length - 1],
          nextDirectory = path.join(directory, path.sep, '..')
        ;
        if( folder == 'bower_components') {
          return {
            name: 'Bower',
            root: nextDirectory
        ***REMOVED***;
      ***REMOVED***
        else if(folder == 'node_modules') {
         return {
            name: 'NPM',
            root: nextDirectory
        ***REMOVED***;
      ***REMOVED***
        else if(folder == 'composer') {
         return {
            name: 'Composer',
            root: nextDirectory
        ***REMOVED***;
      ***REMOVED***
        if(path.resolve(directory) == path.resolve(nextDirectory)) {
          return false;
      ***REMOVED***
        // recurse downward
        return walk(nextDirectory);
    ***REMOVED***
    ;
    // start walk from current directory if none specified
    directory = directory || (__dirname + path.sep);
    return walk(directory);
***REMOVED***

  // checks if files is PMed submodule
  isSubModule: function(directory) {
    var
      moduleFolders = 0,
      walk = function(directory) {
        var
          pathArray     = directory.split(path.sep),
          folder        = pathArray[pathArray.length - 2],
          nextDirectory = path.join(directory, path.sep, '..')
        ;
        if( folder == 'bower_components') {
          moduleFolders++;
      ***REMOVED***
        else if(folder == 'node_modules') {
          moduleFolders++;
      ***REMOVED***
        else if(folder == 'composer') {
          moduleFolders++;
      ***REMOVED***
        if(path.resolve(directory) == path.resolve(nextDirectory)) {
          return (moduleFolders > 1);
      ***REMOVED***
        // recurse downward
        return walk(nextDirectory);
    ***REMOVED***
    ;
    // start walk from current directory if none specified
    directory = directory || (__dirname + path.sep);
    return walk(directory);
***REMOVED***


  createJSON: function(answers) {
    var
      json = {
        paths: {
          source: {***REMOVED***,
          output: {***REMOVED***
      ***REMOVED***
    ***REMOVED***
    ;

    // add components
    if(answers.components) {
      json.components = answers.components;
  ***REMOVED***

    // add rtl choice
    if(answers.rtl) {
      json.rtl = answers.rtl;
  ***REMOVED***

    // add permissions
    if(answers.permission) {
      json.permission = answers.permission;
  ***REMOVED***

    // add path to semantic
    if(answers.semanticRoot) {
      json.base = path.normalize(answers.semanticRoot);
  ***REMOVED***

    // record version number to avoid re-installing on same version
    json.version = release.version;

    // add dist folder paths
    if(answers.dist) {
      answers.dist = path.normalize(answers.dist);

      json.paths.output = {
        packaged     : path.normalize(answers.dist + '/'),
        uncompressed : path.normalize(answers.dist + '/components/'),
        compressed   : path.normalize(answers.dist + '/components/'),
        themes       : path.normalize(answers.dist + '/themes/')
    ***REMOVED***;
  ***REMOVED***

    // add site path
    if(answers.site) {
      json.paths.source.site = path.normalize(answers.site + '/');
  ***REMOVED***
    if(answers.packaged) {
      json.paths.output.packaged = path.normalize(answers.packaged + '/');
  ***REMOVED***
    if(answers.compressed) {
      json.paths.output.compressed = path.normalize(answers.compressed + '/');
  ***REMOVED***
    if(answers.uncompressed) {
      json.paths.output.uncompressed = path.normalize(answers.uncompressed + '/');
  ***REMOVED***
    return json;
***REMOVED***

  // files cleaned up after install
  setupFiles: [
    './src/theme.config.example',
    './semantic.json.example',
    './src/_site'
  ],

  regExp: {
    // used to match siteFolder variable in theme.less
    siteVariable: /@siteFolder .*\'(.*)/mg
***REMOVED***

  // source paths (when installing)
  source: {
    config       : './semantic.json.example',
    definitions  : './src/definitions',
    gulpFile     : './gulpfile.js',
    lessImport   : './src/semantic.less',
    site         : './src/_site',
    tasks        : './tasks',
    themeConfig  : './src/theme.config.example',
    themeImport  : './src/theme.less',
    themes       : './src/themes',
    defaultTheme : './src/themes/default',
    userGulpFile : './tasks/config/npm/gulpfile.js'
***REMOVED***

  // expected final filenames
  files: {
    config      : 'semantic.json',
    lessImport  : 'src/semantic.less',
    site        : 'src/site',
    themeConfig : 'src/theme.config',
    themeImport : 'src/theme.less'
***REMOVED***

  // folder paths to files relative to root
  folders: {
    config       : './',
    definitions  : 'src/definitions/',
    lessImport   : 'src/',
    modules      : 'node_modules/',
    site         : 'src/site/',
    tasks        : 'tasks/',
    themeConfig  : 'src/',
    themeImport  : 'src/',
    themes       : 'src/themes/',

    defaultTheme : 'default/' // only path that is relative to another directory and not root
***REMOVED***

  // questions asked during install
  questions: {

    root: [
      {
        type    : 'list',
        name    : 'useRoot',
        message :
          '{packageMessage***REMOVED*** Is this your project folder? {root***REMOVED***',
        choices: [
          {
            name  : 'Yes',
            value : true
   ***REMOVED*****REMOVED***
          {
            name  : 'No, let me specify',
            value : false
        ***REMOVED***
    ***REMOVED***
    ***REMOVED***
      {
        type    : 'input',
        name    : 'customRoot',
        message : 'Please enter the absolute path to your project root',
        default : '/my/project/path',
        when    : when.changeRoot
    ***REMOVED***
      {
        type    : 'input',
        name    : 'semanticRoot',
        message : 'Where should we put Semantic UI inside your project?',
        default : 'semantic/'
    ***REMOVED***
***REMOVED***,

    setup: [
      {
        type: 'list',
        name: 'overwrite',
        message: 'It looks like you have a semantic.json file already.',
        when: when.hasConfig,
        choices: [
          {
            name: 'Yes, extend my current settings.',
            value: 'yes'
   ***REMOVED*****REMOVED***
          {
            name: 'Skip install',
            value: 'no'
        ***REMOVED***
    ***REMOVED***
    ***REMOVED***
      {
        type: 'list',
        name: 'install',
        message: 'Set-up Semantic UI',
        when: when.allowOverwrite,
        choices: [
          {
            name: 'Automatic (Use default locations and all components)',
            value: 'auto'
   ***REMOVED*****REMOVED***
          {
            name: 'Express (Set components and output folder)',
            value: 'express'
   ***REMOVED*****REMOVED***
          {
            name: 'Custom (Customize all src/dist values)',
            value: 'custom'
        ***REMOVED***
    ***REMOVED***
    ***REMOVED***
      {
        type: 'checkbox',
        name: 'components',
        message: 'What components should we include in the package?',

        // duplicated manually from tasks/defaults.js with additional property
        choices: [
          { name: "reset", checked: true ***REMOVED***,
          { name: "site", checked: true ***REMOVED***,
          { name: "button", checked: true ***REMOVED***,
          { name: "container", checked: true ***REMOVED***,
          { name: "divider", checked: true ***REMOVED***,
          { name: "emoji", checked: true ***REMOVED***,
          { name: "flag", checked: true ***REMOVED***,
          { name: "header", checked: true ***REMOVED***,
          { name: "icon", checked: true ***REMOVED***,
          { name: "image", checked: true ***REMOVED***,
          { name: "input", checked: true ***REMOVED***,
          { name: "label", checked: true ***REMOVED***,
          { name: "list", checked: true ***REMOVED***,
          { name: "loader", checked: true ***REMOVED***,
          { name: "rail", checked: true ***REMOVED***,
          { name: "reveal", checked: true ***REMOVED***,
          { name: "segment", checked: true ***REMOVED***,
          { name: "step", checked: true ***REMOVED***,
          { name: "breadcrumb", checked: true ***REMOVED***,
          { name: "form", checked: true ***REMOVED***,
          { name: "grid", checked: true ***REMOVED***,
          { name: "menu", checked: true ***REMOVED***,
          { name: "message", checked: true ***REMOVED***,
          { name: "table", checked: true ***REMOVED***,
          { name: "ad", checked: true ***REMOVED***,
          { name: "card", checked: true ***REMOVED***,
          { name: "comment", checked: true ***REMOVED***,
          { name: "feed", checked: true ***REMOVED***,
          { name: "item", checked: true ***REMOVED***,
          { name: "statistic", checked: true ***REMOVED***,
          { name: "accordion", checked: true ***REMOVED***,
          { name: "calendar", checked: true ***REMOVED***,
          { name: "checkbox", checked: true ***REMOVED***,
          { name: "dimmer", checked: true ***REMOVED***,
          { name: "dropdown", checked: true ***REMOVED***,
          { name: "embed", checked: true ***REMOVED***,
          { name: "modal", checked: true ***REMOVED***,
          { name: "nag", checked: true ***REMOVED***,
          { name: "placeholder", checked: true ***REMOVED***,
          { name: "popup", checked: true ***REMOVED***,
          { name: "progress", checked: true ***REMOVED***,
          { name: "slider", checked: true ***REMOVED***,
          { name: "rating", checked: true ***REMOVED***,
          { name: "search", checked: true ***REMOVED***,
          { name: "shape", checked: true ***REMOVED***,
          { name: "sidebar", checked: true ***REMOVED***,
          { name: "sticky", checked: true ***REMOVED***,
          { name: "tab", checked: true ***REMOVED***,
          { name: "text", checked: true ***REMOVED***,
          { name: "toast", checked: true ***REMOVED***,
          { name: "transition", checked: true ***REMOVED***,
          { name: "api", checked: true ***REMOVED***,
          { name: "form", checked: true ***REMOVED***,
          { name: "state", checked: true ***REMOVED***,
          { name: "visibility", checked: true ***REMOVED***
    ***REMOVED***,
        when: when.notAuto
    ***REMOVED***
      {
        type: 'list',
        name: 'changePermissions',
        when: when.notAuto,
        message: 'Should we set permissions on outputted files?',
        choices: [
          {
            name: 'No',
            value: false
   ***REMOVED*****REMOVED***
          {
            name: 'Yes',
            value: true
        ***REMOVED***
    ***REMOVED***
    ***REMOVED***
      {
        type: 'input',
        name: 'permission',
        message: 'What octal file permission should outputted files receive?',
        default: defaults.permission,
        when: when.changePermissions
    ***REMOVED***
      {
        type: 'list',
        name: 'rtl',
        message: 'Do you use a RTL (Right-To-Left) language?',
        when: when.notAuto,
        choices: [
          {
            name: 'No',
            value: false
   ***REMOVED*****REMOVED***
          {
            name: 'Yes',
            value: true
   ***REMOVED*****REMOVED***
          {
            name: 'Build Both',
            value: 'both'
        ***REMOVED***
    ***REMOVED***
    ***REMOVED***
      {
        type: 'input',
        name: 'dist',
        message: 'Where should we output Semantic UI?',
        default: defaults.paths.output.packaged,
        filter: filter.removeTrailingSlash,
        when: when.express
    ***REMOVED***
      {
        type: 'input',
        name: 'site',
        message: 'Where should we put your site folder?',
        default: defaults.paths.source.site,
        filter: filter.removeTrailingSlash,
        when: when.custom
    ***REMOVED***
      {
        type: 'input',
        name: 'packaged',
        message: 'Where should we output a packaged version?',
        default: defaults.paths.output.packaged,
        filter: filter.removeTrailingSlash,
        when: when.custom
    ***REMOVED***
      {
        type: 'input',
        name: 'compressed',
        message: 'Where should we output compressed components?',
        default: defaults.paths.output.compressed,
        filter: filter.removeTrailingSlash,
        when: when.custom
    ***REMOVED***
      {
        type: 'input',
        name: 'uncompressed',
        message: 'Where should we output uncompressed components?',
        default: defaults.paths.output.uncompressed,
        filter: filter.removeTrailingSlash,
        when: when.custom
    ***REMOVED***
***REMOVED***,


    cleanup: [
      {
        type: 'list',
        name: 'cleanup',
        message: 'Should we remove set-up files?',
        choices: [
          {
            name: 'Yes (re-install will require redownloading semantic).',
            value: 'yes'
   ***REMOVED*****REMOVED***
          {
            name: 'No Thanks',
            value: 'no'
        ***REMOVED***
    ***REMOVED***
    ***REMOVED***
      {
        type: 'list',
        name: 'build',
        message: 'Do you want to build Semantic now?',
        choices: [
          {
            name: 'Yes',
            value: 'yes'
   ***REMOVED*****REMOVED***
          {
            name: 'No',
            value: 'no'
        ***REMOVED***
    ***REMOVED***
    ***REMOVED***
***REMOVED***,
    site: [
      {
        type: 'list',
        name: 'customize',
        message: 'You have not yet customized your site, can we help you do that?',
        choices: [
          {
            name: 'Yes, ask me a few questions',
            value: true
   ***REMOVED*****REMOVED***
          {
            name: 'No I\'ll do it myself',
            value: false
        ***REMOVED***
    ***REMOVED***
    ***REMOVED***
      {
        type: 'list',
        name: 'headerFont',
        message: 'Select your header font',
        choices: [
          {
            name: 'Helvetica Neue, Arial, sans-serif',
            value: 'Helvetica Neue, Arial, sans-serif;'
   ***REMOVED*****REMOVED***
          {
            name: 'Lato (Google Fonts)',
            value: 'Lato'
   ***REMOVED*****REMOVED***
          {
            name: 'Open Sans (Google Fonts)',
            value: 'Open Sans'
   ***REMOVED*****REMOVED***
          {
            name: 'Source Sans Pro (Google Fonts)',
            value: 'Source Sans Pro'
   ***REMOVED*****REMOVED***
          {
            name: 'Droid (Google Fonts)',
            value: 'Droid'
   ***REMOVED*****REMOVED***
          {
            name: 'I\'ll choose on my own',
            value: false
        ***REMOVED***
    ***REMOVED***,
        when: when.customize
    ***REMOVED***
      {
        type: 'list',
        name: 'pageFont',
        message: 'Select your page font',
        choices: [
          {
            name: 'Helvetica Neue, Arial, sans-serif',
            value: 'Helvetica Neue, Arial, sans-serif;'
   ***REMOVED*****REMOVED***
          {
            name: 'Lato (Import from Google Fonts)',
            value: 'Lato'
   ***REMOVED*****REMOVED***
          {
            name: 'Open Sans (Import from Google Fonts)',
            value: 'Open Sans'
   ***REMOVED*****REMOVED***
          {
            name: 'Source Sans Pro (Import from Google Fonts)',
            value: 'Source Sans Pro'
   ***REMOVED*****REMOVED***
          {
            name: 'Droid (Google Fonts)',
            value: 'Droid'
   ***REMOVED*****REMOVED***
          {
            name: 'I\'ll choose on my own',
            value: false
        ***REMOVED***
    ***REMOVED***,
        when: when.customize
    ***REMOVED***
      {
        type: 'list',
        name: 'fontSize',
        message: 'Select your base font size',
        default: '14px',
        choices: [
          {
            name: '12px',
   ***REMOVED*****REMOVED***
          {
            name: '13px',
   ***REMOVED*****REMOVED***
          {
            name: '14px (Recommended)',
            value: '14px'
   ***REMOVED*****REMOVED***
          {
            name: '15px',
   ***REMOVED*****REMOVED***
          {
            name: '16px',
   ***REMOVED*****REMOVED***
          {
            name: 'I\'ll choose on my own',
            value: false
        ***REMOVED***
    ***REMOVED***,
        when: when.customize
    ***REMOVED***
      {
        type: 'list',
        name: 'primaryColor',
        message: 'Select the closest name for your primary brand color',
        default: '14px',
        choices: [
          {
            name: 'Blue'
   ***REMOVED*****REMOVED***
          {
            name: 'Green'
   ***REMOVED*****REMOVED***
          {
            name: 'Orange'
   ***REMOVED*****REMOVED***
          {
            name: 'Pink'
   ***REMOVED*****REMOVED***
          {
            name: 'Purple'
   ***REMOVED*****REMOVED***
          {
            name: 'Red'
   ***REMOVED*****REMOVED***
          {
            name: 'Teal'
   ***REMOVED*****REMOVED***
          {
            name: 'Yellow'
   ***REMOVED*****REMOVED***
          {
            name: 'Black'
   ***REMOVED*****REMOVED***
          {
            name: 'I\'ll choose on my own',
            value: false
        ***REMOVED***
    ***REMOVED***,
        when: when.customize
    ***REMOVED***
      {
        type: 'input',
        name: 'PrimaryHex',
        message: 'Enter a hexcode for your primary brand color',
        when: when.primaryColor
    ***REMOVED***
      {
        type: 'list',
        name: 'secondaryColor',
        message: 'Select the closest name for your secondary brand color',
        default: '14px',
        choices: [
          {
            name: 'Blue'
   ***REMOVED*****REMOVED***
          {
            name: 'Green'
   ***REMOVED*****REMOVED***
          {
            name: 'Orange'
   ***REMOVED*****REMOVED***
          {
            name: 'Pink'
   ***REMOVED*****REMOVED***
          {
            name: 'Purple'
   ***REMOVED*****REMOVED***
          {
            name: 'Red'
   ***REMOVED*****REMOVED***
          {
            name: 'Teal'
   ***REMOVED*****REMOVED***
          {
            name: 'Yellow'
   ***REMOVED*****REMOVED***
          {
            name: 'Black'
   ***REMOVED*****REMOVED***
          {
            name: 'I\'ll choose on my own',
            value: false
        ***REMOVED***
    ***REMOVED***,
        when: when.customize
    ***REMOVED***
      {
        type: 'input',
        name: 'secondaryHex',
        message: 'Enter a hexcode for your secondary brand color',
        when: when.secondaryColor
    ***REMOVED***
***REMOVED***

***REMOVED***

  settings: {

    /* Rename Files***REMOVED***/
    rename: {
      json : { extname : '.json' ***REMOVED***
  ***REMOVED***

    /* Copy Install Folders***REMOVED***/
    wrench: {

      // overwrite existing files update & install (default theme / definition)
      overwrite: {
        forceDelete       : true,
        excludeHiddenUnix : true,
        preserveFiles     : false
    ***REMOVED***

      // only create files that don't exist (site theme update)
      merge: {
        forceDelete       : false,
        excludeHiddenUnix : true,
        preserveFiles     : true
    ***REMOVED***

  ***REMOVED***
***REMOVED***
***REMOVED***;
