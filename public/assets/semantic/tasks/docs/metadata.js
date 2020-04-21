
***REMOVED********************************
           Summarize Docs
*******************************/

var
  // node dependencies
  console      = require('better-console'),
  fs           = require('fs'),
  YAML         = require('yamljs')
;

var data = {***REMOVED***;

***REMOVED***
***REMOVED*** Test for prefix in string.
***REMOVED*** @param {string***REMOVED*** str
***REMOVED*** @param {string***REMOVED*** prefix
***REMOVED*** @return {boolean***REMOVED***
***REMOVED***/
function startsWith(str, prefix) {
  return str.indexOf(prefix) === 0;
***REMOVED***;

function inArray(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
      if(haystack[i] == needle) return true;
***REMOVED***
  return false;
***REMOVED***

***REMOVED***
***REMOVED*** Parses a file for metadata and stores result in data object.
***REMOVED*** @param {File***REMOVED*** file - object provided by map-stream.
***REMOVED*** @param {function(?,File)***REMOVED*** - callback provided by map-stream to
***REMOVED*** reply when done.
***REMOVED***/
function parser(file, callback) {
  // file exit conditions
  if(file.isNull()) {
    return callback(null, file); // pass along
***REMOVED***

  if(file.isStream()) {
    return callback(new Error('Streaming not supported'));
***REMOVED***

  try {

    var
***REMOVED*****REMOVED*****REMOVED*** @type {string***REMOVED******REMOVED***/
      text     = String(file.contents.toString('utf8')),
      lines    = text.split('\n'),
      filename = file.path.substring(0, file.path.length - 4),
      key      = 'server/documents',
      position = filename.indexOf(key)
    ;

    // exit conditions
    if(!lines) {
      return;
  ***REMOVED***
    if(position < 0) {
      return callback(null, file);
  ***REMOVED***

    filename = filename.substring(position + key.length + 1, filename.length);

    var
      lineCount = lines.length,
      active    = false,
      yaml      = [],
      categories = [
        'UI Element',
        'UI Global',
        'UI Collection',
        'UI View',
        'UI Module',
        'UI Behavior'
  ***REMOVED***,
      index,
      meta,
      line
    ;

    for(index = 0; index < lineCount; index++) {

      line = lines[index];

      // Wait for metadata block to begin
      if(!active) {
        if(startsWith(line, '---')) {
          active = true;
      ***REMOVED***
        continue;
    ***REMOVED***
      // End of metadata block, stop parsing.
      if(startsWith(line, '---')) {
        break;
    ***REMOVED***
      yaml.push(line);
  ***REMOVED***


    // Parse yaml.
    meta = YAML.parse(yaml.join('\n'));
    if(meta && meta.type && meta.title && inArray(meta.type, categories) ) {
      meta.category = meta.type;
      meta.filename = filename;
      meta.url      = '/' + filename;
      meta.title    = meta.title;
      // Primary key will by filepath
      data[meta.element] = meta;
  ***REMOVED***
    else {
      // skip
      // console.log(meta);
  ***REMOVED***


***REMOVED***

  catch(error) {
    console.log(error, filename);
***REMOVED***

  callback(null, file);

***REMOVED***

***REMOVED***
***REMOVED*** Export function expected by map-stream.
***REMOVED***/
module.exports = {
  result : data,
  parser : parser
***REMOVED***;
