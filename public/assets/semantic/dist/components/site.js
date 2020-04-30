/*!
***REMOVED*** # Fomantic-UI - Site
***REMOVED*** http://github.com/fomantic/Fomantic-UI/
***REMOVED***
***REMOVED***
***REMOVED*** Released under the MIT license
***REMOVED*** http://opensource.org/licenses/MIT
***REMOVED***
***REMOVED***/

;(function ($, window, document, undefined) {

$.isFunction = $.isFunction || function(obj) {
    return typeof obj === "function" && typeof obj.nodeType !== "number";
***REMOVED***;

$.site = $.fn.site = function(parameters) {
  var
    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),

    settings        = ( $.isPlainObject(parameters) )
      ? $.extend(true, {***REMOVED***, $.site.settings, parameters)
      : $.extend({***REMOVED***, $.site.settings),

    namespace       = settings.namespace,
    error           = settings.error,

    moduleNamespace = 'module-' + namespace,

    $document       = $(document),
    $module         = $document,
    element         = this,
    instance        = $module.data(moduleNamespace),

    module,
    returnedValue
  ;
  module = {

    initialize: function() {
      module.instantiate();
  ***REMOVED***

    instantiate: function() {
      module.verbose('Storing instance of site', module);
      instance = module;
      $module
        .data(moduleNamespace, module)
      ;
  ***REMOVED***

    normalize: function() {
      module.fix.console();
      module.fix.requestAnimationFrame();
  ***REMOVED***

    fix: {
      console: function() {
        module.debug('Normalizing window.console');
        if (console === undefined || console.log === undefined) {
          module.verbose('Console not available, normalizing events');
          module.disable.console();
      ***REMOVED***
        if (typeof console.group == 'undefined' || typeof console.groupEnd == 'undefined' || typeof console.groupCollapsed == 'undefined') {
          module.verbose('Console group not available, normalizing events');
          window.console.group = function() {***REMOVED***;
          window.console.groupEnd = function() {***REMOVED***;
          window.console.groupCollapsed = function() {***REMOVED***;
      ***REMOVED***
        if (typeof console.markTimeline == 'undefined') {
          module.verbose('Mark timeline not available, normalizing events');
          window.console.markTimeline = function() {***REMOVED***;
      ***REMOVED***
    ***REMOVED***
      consoleClear: function() {
        module.debug('Disabling programmatic console clearing');
        window.console.clear = function() {***REMOVED***;
    ***REMOVED***
      requestAnimationFrame: function() {
        module.debug('Normalizing requestAnimationFrame');
        if(window.requestAnimationFrame === undefined) {
          module.debug('RequestAnimationFrame not available, normalizing event');
          window.requestAnimationFrame = window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function(callback) { setTimeout(callback, 0); ***REMOVED***
          ;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

    moduleExists: function(name) {
      return ($.fn[name] !== undefined && $.fn[name].settings !== undefined);
  ***REMOVED***

    enabled: {
      modules: function(modules) {
        var
          enabledModules = []
        ;
        modules = modules || settings.modules;
        $.each(modules, function(index, name) {
          if(module.moduleExists(name)) {
            enabledModules.push(name);
        ***REMOVED***
      ***REMOVED***);
        return enabledModules;
    ***REMOVED***
  ***REMOVED***

    disabled: {
      modules: function(modules) {
        var
          disabledModules = []
        ;
        modules = modules || settings.modules;
        $.each(modules, function(index, name) {
          if(!module.moduleExists(name)) {
            disabledModules.push(name);
        ***REMOVED***
      ***REMOVED***);
        return disabledModules;
    ***REMOVED***
  ***REMOVED***

    change: {
      setting: function(setting, value, modules, modifyExisting) {
        modules = (typeof modules === 'string')
          ? (modules === 'all')
            ? settings.modules
            : [modules]
          : modules || settings.modules
        ;
        modifyExisting = (modifyExisting !== undefined)
          ? modifyExisting
          : true
        ;
        $.each(modules, function(index, name) {
          var
            namespace = (module.moduleExists(name))
              ? $.fn[name].settings.namespace || false
              : true,
            $existingModules
          ;
          if(module.moduleExists(name)) {
            module.verbose('Changing default setting', setting, value, name);
            $.fn[name].settings[setting] = value;
            if(modifyExisting && namespace) {
              $existingModules = $(':data(module-' + namespace + ')');
              if($existingModules.length > 0) {
                module.verbose('Modifying existing settings', $existingModules);
                $existingModules[name]('setting', setting, value);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
      settings: function(newSettings, modules, modifyExisting) {
        modules = (typeof modules === 'string')
          ? [modules]
          : modules || settings.modules
        ;
        modifyExisting = (modifyExisting !== undefined)
          ? modifyExisting
          : true
        ;
        $.each(modules, function(index, name) {
          var
            $existingModules
          ;
          if(module.moduleExists(name)) {
            module.verbose('Changing default setting', newSettings, name);
            $.extend(true, $.fn[name].settings, newSettings);
            if(modifyExisting && namespace) {
              $existingModules = $(':data(module-' + namespace + ')');
              if($existingModules.length > 0) {
                module.verbose('Modifying existing settings', $existingModules);
                $existingModules[name]('setting', newSettings);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***

    enable: {
      console: function() {
        module.console(true);
    ***REMOVED***
      debug: function(modules, modifyExisting) {
        modules = modules || settings.modules;
        module.debug('Enabling debug for modules', modules);
        module.change.setting('debug', true, modules, modifyExisting);
    ***REMOVED***
      verbose: function(modules, modifyExisting) {
        modules = modules || settings.modules;
        module.debug('Enabling verbose debug for modules', modules);
        module.change.setting('verbose', true, modules, modifyExisting);
    ***REMOVED***
  ***REMOVED***
    disable: {
      console: function() {
        module.console(false);
    ***REMOVED***
      debug: function(modules, modifyExisting) {
        modules = modules || settings.modules;
        module.debug('Disabling debug for modules', modules);
        module.change.setting('debug', false, modules, modifyExisting);
    ***REMOVED***
      verbose: function(modules, modifyExisting) {
        modules = modules || settings.modules;
        module.debug('Disabling verbose debug for modules', modules);
        module.change.setting('verbose', false, modules, modifyExisting);
    ***REMOVED***
  ***REMOVED***

    console: function(enable) {
      if(enable) {
        if(instance.cache.console === undefined) {
          module.error(error.console);
          return;
      ***REMOVED***
        module.debug('Restoring console function');
        window.console = instance.cache.console;
    ***REMOVED***
      else {
        module.debug('Disabling console function');
        instance.cache.console = window.console;
        window.console = {
          clear          : function(){***REMOVED***,
          error          : function(){***REMOVED***,
          group          : function(){***REMOVED***,
          groupCollapsed : function(){***REMOVED***,
          groupEnd       : function(){***REMOVED***,
          info           : function(){***REMOVED***,
          log            : function(){***REMOVED***,
          markTimeline   : function(){***REMOVED***,
          warn           : function(){***REMOVED***
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***

    destroy: function() {
      module.verbose('Destroying previous site for', $module);
      $module
        .removeData(moduleNamespace)
      ;
  ***REMOVED***

    cache: {***REMOVED***,

    setting: function(name, value) {
      if( $.isPlainObject(name) ) {
        $.extend(true, settings, name);
    ***REMOVED***
      else if(value !== undefined) {
        settings[name] = value;
    ***REMOVED***
      else {
        return settings[name];
    ***REMOVED***
  ***REMOVED***
    internal: function(name, value) {
      if( $.isPlainObject(name) ) {
        $.extend(true, module, name);
    ***REMOVED***
      else if(value !== undefined) {
        module[name] = value;
    ***REMOVED***
      else {
        return module[name];
    ***REMOVED***
  ***REMOVED***
    debug: function() {
      if(settings.debug) {
        if(settings.performance) {
          module.performance.log(arguments);
      ***REMOVED***
        else {
          module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
          module.debug.apply(console, arguments);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
    verbose: function() {
      if(settings.verbose && settings.debug) {
        if(settings.performance) {
          module.performance.log(arguments);
      ***REMOVED***
        else {
          module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
          module.verbose.apply(console, arguments);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
    error: function() {
      module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
      module.error.apply(console, arguments);
  ***REMOVED***
    performance: {
      log: function(message) {
        var
          currentTime,
          executionTime,
          previousTime
        ;
        if(settings.performance) {
          currentTime   = new Date().getTime();
          previousTime  = time || currentTime;
          executionTime = currentTime - previousTime;
          time          = currentTime;
          performance.push({
            'Element'        : element,
            'Name'           : message[0],
            'Arguments'      : [].slice.call(message, 1) || '',
            'Execution Time' : executionTime
        ***REMOVED***);
      ***REMOVED***
        clearTimeout(module.performance.timer);
        module.performance.timer = setTimeout(module.performance.display, 500);
    ***REMOVED***
      display: function() {
        var
          title = settings.name + ':',
          totalTime = 0
        ;
        time = false;
        clearTimeout(module.performance.timer);
        $.each(performance, function(index, data) {
          totalTime += data['Execution Time'];
      ***REMOVED***);
        title += ' ' + totalTime + 'ms';
        if( (console.group !== undefined || console.table !== undefined) && performance.length > 0) {
          console.groupCollapsed(title);
          if(console.table) {
            console.table(performance);
        ***REMOVED***
          else {
            $.each(performance, function(index, data) {
              console.log(data['Name'] + ': ' + data['Execution Time']+'ms');
          ***REMOVED***);
        ***REMOVED***
          console.groupEnd();
      ***REMOVED***
        performance = [];
    ***REMOVED***
  ***REMOVED***
    invoke: function(query, passedArguments, context) {
      var
        object = instance,
        maxDepth,
        found,
        response
      ;
      passedArguments = passedArguments || queryArguments;
      context         = element         || context;
      if(typeof query == 'string' && object !== undefined) {
        query    = query.split(/[\. ]/);
        maxDepth = query.length - 1;
        $.each(query, function(depth, value) {
          var camelCaseValue = (depth != maxDepth)
            ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
            : query
          ;
          if( $.isPlainObject( object[camelCaseValue] ) && (depth != maxDepth) ) {
            object = object[camelCaseValue];
        ***REMOVED***
          else if( object[camelCaseValue] !== undefined ) {
            found = object[camelCaseValue];
            return false;
        ***REMOVED***
          else if( $.isPlainObject( object[value] ) && (depth != maxDepth) ) {
            object = object[value];
        ***REMOVED***
          else if( object[value] !== undefined ) {
            found = object[value];
            return false;
        ***REMOVED***
          else {
            module.error(error.method, query);
            return false;
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
      if ( $.isFunction( found ) ) {
        response = found.apply(context, passedArguments);
    ***REMOVED***
      else if(found !== undefined) {
        response = found;
    ***REMOVED***
      if(Array.isArray(returnedValue)) {
        returnedValue.push(response);
    ***REMOVED***
      else if(returnedValue !== undefined) {
        returnedValue = [returnedValue, response];
    ***REMOVED***
      else if(response !== undefined) {
        returnedValue = response;
    ***REMOVED***
      return found;
  ***REMOVED***
***REMOVED***;

  if(methodInvoked) {
    if(instance === undefined) {
      module.initialize();
  ***REMOVED***
    module.invoke(query);
***REMOVED***
  else {
    if(instance !== undefined) {
      module.destroy();
  ***REMOVED***
    module.initialize();
***REMOVED***
  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
***REMOVED***;

$.site.settings = {

  name        : 'Site',
  namespace   : 'site',

  error : {
    console : 'Console cannot be restored, most likely it was overwritten outside of module',
    method : 'The method you called is not defined.'
***REMOVED***

  debug       : false,
  verbose     : false,
  performance : true,

  modules: [
    'accordion',
    'api',
    'calendar',
    'checkbox',
    'dimmer',
    'dropdown',
    'embed',
    'form',
    'modal',
    'nag',
    'popup',
    'slider',
    'rating',
    'shape',
    'sidebar',
    'state',
    'sticky',
    'tab',
    'toast',
    'transition',
    'visibility',
    'visit'
  ],

  siteNamespace   : 'site',
  namespaceStub   : {
    cache     : {***REMOVED***,
    config    : {***REMOVED***,
    sections  : {***REMOVED***,
    section   : {***REMOVED***,
    utilities : {***REMOVED***
***REMOVED***

***REMOVED***;

// allows for selection of elements with data attributes
$.extend($.expr[ ":" ], {
  data: ($.expr.createPseudo)
    ? $.expr.createPseudo(function(dataName) {
        return function(elem) {
          return !!$.data(elem, dataName);
      ***REMOVED***;
    ***REMOVED***)
    : function(elem, i, match) {
      // support: jQuery < 1.8
      return !!$.data(elem, match[ 3 ]);
  ***REMOVED***
***REMOVED***);


***REMOVED***)( jQuery, window, document );
