/*!
***REMOVED*** # Fomantic-UI - State
***REMOVED*** http://github.com/fomantic/Fomantic-UI/
***REMOVED***
***REMOVED***
***REMOVED*** Released under the MIT license
***REMOVED*** http://opensource.org/licenses/MIT
***REMOVED***
***REMOVED***/

;(function ($, window, document, undefined) {

"use strict";

$.isFunction = $.isFunction || function(obj) {
  return typeof obj === "function" && typeof obj.nodeType !== "number";
***REMOVED***;

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.state = function(parameters) {
  var
    $allModules     = $(this),

    moduleSelector  = $allModules.selector || '',

    time            = new Date().getTime(),
    performance     = [],

    query           = arguments[0],
    methodInvoked   = (typeof query == 'string'),
    queryArguments  = [].slice.call(arguments, 1),

    returnedValue
  ;
  $allModules
    .each(function() {
      var
        settings          = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.state.settings, parameters)
          : $.extend({***REMOVED***, $.fn.state.settings),

        error           = settings.error,
        metadata        = settings.metadata,
        className       = settings.className,
        namespace       = settings.namespace,
        states          = settings.states,
        text            = settings.text,

        eventNamespace  = '.' + namespace,
        moduleNamespace = namespace + '-module',

        $module         = $(this),

        element         = this,
        instance        = $module.data(moduleNamespace),

        module
      ;
      module = {

        initialize: function() {
          module.verbose('Initializing module');

          // allow module to guess desired state based on element
          if(settings.automatic) {
            module.add.defaults();
        ***REMOVED***

          // bind events with delegated events
          if(settings.context && moduleSelector !== '') {
            $(settings.context)
              .on(moduleSelector, 'mouseenter' + eventNamespace, module.change.text)
              .on(moduleSelector, 'mouseleave' + eventNamespace, module.reset.text)
              .on(moduleSelector, 'click'      + eventNamespace, module.toggle.state)
            ;
        ***REMOVED***
          else {
            $module
              .on('mouseenter' + eventNamespace, module.change.text)
              .on('mouseleave' + eventNamespace, module.reset.text)
              .on('click'      + eventNamespace, module.toggle.state)
            ;
        ***REMOVED***
          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.verbose('Destroying previous module', instance);
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
 ***REMOVED*****REMOVED***

        refresh: function() {
          module.verbose('Refreshing selector cache');
          $module = $(element);
 ***REMOVED*****REMOVED***

        add: {
          defaults: function() {
            var
              userStates = parameters && $.isPlainObject(parameters.states)
                ? parameters.states
                : {***REMOVED***
            ;
            $.each(settings.defaults, function(type, typeStates) {
              if( module.is[type] !== undefined && module.is[type]() ) {
                module.verbose('Adding default states', type, element);
                $.extend(settings.states, typeStates, userStates);
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {

          active: function() {
            return $module.hasClass(className.active);
   ***REMOVED*****REMOVED***
          loading: function() {
            return $module.hasClass(className.loading);
   ***REMOVED*****REMOVED***
          inactive: function() {
            return !( $module.hasClass(className.active) );
   ***REMOVED*****REMOVED***
          state: function(state) {
            if(className[state] === undefined) {
              return false;
          ***REMOVED***
            return $module.hasClass( className[state] );
   ***REMOVED*****REMOVED***

          enabled: function() {
            return !( $module.is(settings.filter.active) );
   ***REMOVED*****REMOVED***
          disabled: function() {
            return ( $module.is(settings.filter.active) );
   ***REMOVED*****REMOVED***
          textEnabled: function() {
            return !( $module.is(settings.filter.text) );
   ***REMOVED*****REMOVED***

          // definitions for automatic type detection
          button: function() {
            return $module.is('.button:not(a, .submit)');
   ***REMOVED*****REMOVED***
          input: function() {
            return $module.is('input');
   ***REMOVED*****REMOVED***
          progress: function() {
            return $module.is('.ui.progress');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        allow: function(state) {
          module.debug('Now allowing state', state);
          states[state] = true;
 ***REMOVED*****REMOVED***
        disallow: function(state) {
          module.debug('No longer allowing', state);
          states[state] = false;
 ***REMOVED*****REMOVED***

        allows: function(state) {
          return states[state] || false;
 ***REMOVED*****REMOVED***

        enable: function() {
          $module.removeClass(className.disabled);
 ***REMOVED*****REMOVED***

        disable: function() {
          $module.addClass(className.disabled);
 ***REMOVED*****REMOVED***

        setState: function(state) {
          if(module.allows(state)) {
            $module.addClass( className[state] );
        ***REMOVED***
 ***REMOVED*****REMOVED***

        removeState: function(state) {
          if(module.allows(state)) {
            $module.removeClass( className[state] );
        ***REMOVED***
 ***REMOVED*****REMOVED***

        toggle: {
          state: function() {
            var
              apiRequest,
              requestCancelled
            ;
            if( module.allows('active') && module.is.enabled() ) {
              module.refresh();
              if($.fn.api !== undefined) {
                apiRequest       = $module.api('get request');
                requestCancelled = $module.api('was cancelled');
                if( requestCancelled ) {
                  module.debug('API Request cancelled by beforesend');
                  settings.activateTest   = function(){ return false; ***REMOVED***;
                  settings.deactivateTest = function(){ return false; ***REMOVED***;
              ***REMOVED***
                else if(apiRequest) {
                  module.listenTo(apiRequest);
                  return;
              ***REMOVED***
            ***REMOVED***
              module.change.state();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        listenTo: function(apiRequest) {
          module.debug('API request detected, waiting for state signal', apiRequest);
          if(apiRequest) {
            if(text.loading) {
              module.update.text(text.loading);
          ***REMOVED***
            $.when(apiRequest)
              .then(function() {
                if(apiRequest.state() == 'resolved') {
                  module.debug('API request succeeded');
                  settings.activateTest   = function(){ return true; ***REMOVED***;
                  settings.deactivateTest = function(){ return true; ***REMOVED***;
              ***REMOVED***
                else {
                  module.debug('API request failed');
                  settings.activateTest   = function(){ return false; ***REMOVED***;
                  settings.deactivateTest = function(){ return false; ***REMOVED***;
              ***REMOVED***
                module.change.state();
            ***REMOVED***)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        // checks whether active/inactive state can be given
        change: {

          state: function() {
            module.debug('Determining state change direction');
            // inactive to active change
            if( module.is.inactive() ) {
              module.activate();
          ***REMOVED***
            else {
              module.deactivate();
          ***REMOVED***
            if(settings.sync) {
              module.sync();
          ***REMOVED***
            settings.onChange.call(element);
   ***REMOVED*****REMOVED***

          text: function() {
            if( module.is.textEnabled() ) {
              if(module.is.disabled() ) {
                module.verbose('Changing text to disabled text', text.hover);
                module.update.text(text.disabled);
            ***REMOVED***
              else if( module.is.active() ) {
                if(text.hover) {
                  module.verbose('Changing text to hover text', text.hover);
                  module.update.text(text.hover);
              ***REMOVED***
                else if(text.deactivate) {
                  module.verbose('Changing text to deactivating text', text.deactivate);
                  module.update.text(text.deactivate);
              ***REMOVED***
            ***REMOVED***
              else {
                if(text.hover) {
                  module.verbose('Changing text to hover text', text.hover);
                  module.update.text(text.hover);
              ***REMOVED***
                else if(text.activate){
                  module.verbose('Changing text to activating text', text.activate);
                  module.update.text(text.activate);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***

 ***REMOVED*****REMOVED***

        activate: function() {
          if( settings.activateTest.call(element) ) {
            module.debug('Setting state to active');
            $module
              .addClass(className.active)
            ;
            module.update.text(text.active);
            settings.onActivate.call(element);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        deactivate: function() {
          if( settings.deactivateTest.call(element) ) {
            module.debug('Setting state to inactive');
            $module
              .removeClass(className.active)
            ;
            module.update.text(text.inactive);
            settings.onDeactivate.call(element);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        sync: function() {
          module.verbose('Syncing other buttons to current state');
          if( module.is.active() ) {
            $allModules
              .not($module)
                .state('activate');
        ***REMOVED***
          else {
            $allModules
              .not($module)
                .state('deactivate')
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          text: function() {
            return (settings.selector.text)
              ? $module.find(settings.selector.text).text()
              : $module.html()
            ;
   ***REMOVED*****REMOVED***
          textFor: function(state) {
            return text[state] || false;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        flash: {
          text: function(text, duration, callback) {
            var
              previousText = module.get.text()
            ;
            module.debug('Flashing text message', text, duration);
            text     = text     || settings.text.flash;
            duration = duration || settings.flashDuration;
            callback = callback || function() {***REMOVED***;
            module.update.text(text);
            setTimeout(function(){
              module.update.text(previousText);
              callback.call(element);
***REMOVED*****REMOVED*****REMOVED*** duration);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        reset: {
          // on mouseout sets text to previous value
          text: function() {
            var
              activeText   = text.active   || $module.data(metadata.storedText),
              inactiveText = text.inactive || $module.data(metadata.storedText)
            ;
            if( module.is.textEnabled() ) {
              if( module.is.active() && activeText) {
                module.verbose('Resetting active text', activeText);
                module.update.text(activeText);
            ***REMOVED***
              else if(inactiveText) {
                module.verbose('Resetting inactive text', activeText);
                module.update.text(inactiveText);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        update: {
          text: function(text) {
            var
              currentText = module.get.text()
            ;
            if(text && text !== currentText) {
              module.debug('Updating text', text);
              if(settings.selector.text) {
                $module
                  .data(metadata.storedText, text)
                  .find(settings.selector.text)
                    .text(text)
                ;
            ***REMOVED***
              else {
                $module
                  .data(metadata.storedText, text)
                  .html(text)
                ;
            ***REMOVED***
          ***REMOVED***
            else {
              module.debug('Text is already set, ignoring update', text);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        setting: function(name, value) {
          module.debug('Changing setting', name, value);
          if( $.isPlainObject(name) ) {
            $.extend(true, settings, name);
        ***REMOVED***
          else if(value !== undefined) {
            if($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
          ***REMOVED***
            else {
              settings[name] = value;
          ***REMOVED***
        ***REMOVED***
          else {
            return settings[name];
        ***REMOVED***
 ***REMOVED*****REMOVED***
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
 ***REMOVED*****REMOVED***
        debug: function() {
          if(!settings.silent && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
          ***REMOVED***
            else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***
        verbose: function() {
          if(!settings.silent && settings.verbose && settings.debug) {
            if(settings.performance) {
              module.performance.log(arguments);
          ***REMOVED***
            else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***
        error: function() {
          if(!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
        ***REMOVED***
 ***REMOVED*****REMOVED***
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
                'Name'           : message[0],
                'Arguments'      : [].slice.call(message, 1) || '',
                'Element'        : element,
                'Execution Time' : executionTime
            ***REMOVED***);
          ***REMOVED***
            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
   ***REMOVED*****REMOVED***
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
            if(moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
          ***REMOVED***
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
 ***REMOVED*****REMOVED***
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
          instance.invoke('destroy');
      ***REMOVED***
        module.initialize();
    ***REMOVED***
  ***REMOVED***)
  ;

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
***REMOVED***;

$.fn.state.settings = {

  // module info
  name           : 'State',

  // debug output
  debug          : false,

  // verbose debug output
  verbose        : false,

  // namespace for events
  namespace      : 'state',

  // debug data includes performance
  performance    : true,

  // callback occurs on state change
  onActivate     : function() {***REMOVED***,
  onDeactivate   : function() {***REMOVED***,
  onChange       : function() {***REMOVED***,

  // state test functions
  activateTest   : function() { return true; ***REMOVED***,
  deactivateTest : function() { return true; ***REMOVED***,

  // whether to automatically map default states
  automatic      : true,

  // activate / deactivate changes all elements instantiated at same time
  sync           : false,

  // default flash text duration, used for temporarily changing text of an element
  flashDuration  : 1000,

  // selector filter
  filter     : {
    text   : '.loading, .disabled',
    active : '.disabled'
***REMOVED***

  context    : false,

  // error
  error: {
    beforeSend : 'The before send function has cancelled state change',
    method     : 'The method you called is not defined.'
***REMOVED***

  // metadata
  metadata: {
    promise    : 'promise',
    storedText : 'stored-text'
***REMOVED***

  // change class on state
  className: {
    active   : 'active',
    disabled : 'disabled',
    error    : 'error',
    loading  : 'loading',
    success  : 'success',
    warning  : 'warning'
***REMOVED***

  selector: {
    // selector for text node
    text: false
***REMOVED***

  defaults : {
    input: {
      disabled : true,
      loading  : true,
      active   : true
  ***REMOVED***
    button: {
      disabled : true,
      loading  : true,
      active   : true,
  ***REMOVED***
    progress: {
      active   : true,
      success  : true,
      warning  : true,
      error    : true
  ***REMOVED***
***REMOVED***

  states     : {
    active   : true,
    disabled : true,
    error    : true,
    loading  : true,
    success  : true,
    warning  : true
***REMOVED***

  text     : {
    disabled   : false,
    flash      : false,
    hover      : false,
    active     : false,
    inactive   : false,
    activate   : false,
    deactivate : false
***REMOVED***

***REMOVED***;



***REMOVED***)( jQuery, window, document );
