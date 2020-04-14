var
  where = 'client' // Adds files only to the client
;

Package.describe({
  name    : 'semantic:ui',
  summary : 'Semantic UI - LESS Release of Semantic UI',
  version : '{version***REMOVED***',
  git     : 'git://github.com/Semantic-Org/Semantic-UI-LESS.git',
***REMOVED***);

Package.onUse(function(api) {

  api.versionsFrom('1.0');
  api.use('less', 'client');

  api.addFiles([
    {files***REMOVED***
  ], 'client');

***REMOVED***);
