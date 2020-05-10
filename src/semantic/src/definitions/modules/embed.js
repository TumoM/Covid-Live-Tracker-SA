/*!
***REMOVED*** # Fomantic-UI - Embed
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

$.fn.embed = function(parameters) {

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
        settings        = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.embed.settings, parameters)
          : $.extend({***REMOVED***, $.fn.embed.settings),

        selector        = settings.selector,
        className       = settings.className,
        sources         = settings.sources,
        error           = settings.error,
        metadata        = settings.metadata,
        namespace       = settings.namespace,
        templates       = settings.templates,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $module         = $(this),
        $placeholder    = $module.find(selector.placeholder),
        $icon           = $module.find(selector.icon),
        $embed          = $module.find(selector.embed),

        element         = this,
        instance        = $module.data(moduleNamespace),
        module
      ;

      module = {

        initialize: function() {
          module.debug('Initializing embed');
          module.determine.autoplay();
          module.create();
          module.bind.events();
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
          module.verbose('Destroying previous instance of embed');
          module.reset();
          $module
            .removeData(moduleNamespace)
            .off(eventNamespace)
          ;
 ***REMOVED*****REMOVED***

        refresh: function() {
          module.verbose('Refreshing selector cache');
          $placeholder = $module.find(selector.placeholder);
          $icon        = $module.find(selector.icon);
          $embed       = $module.find(selector.embed);
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            if( module.has.placeholder() ) {
              module.debug('Adding placeholder events');
              $module
                .on('click' + eventNamespace, selector.placeholder, module.createAndShow)
                .on('click' + eventNamespace, selector.icon, module.createAndShow)
              ;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        create: function() {
          var
            placeholder = module.get.placeholder()
          ;
          if(placeholder) {
            module.createPlaceholder();
        ***REMOVED***
          else {
            module.createAndShow();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        createPlaceholder: function(placeholder) {
          var
            icon  = module.get.icon(),
            url   = module.get.url(),
            embed = module.generate.embed(url)
          ;
          placeholder = placeholder || module.get.placeholder();
          $module.html( templates.placeholder(placeholder, icon) );
          module.debug('Creating placeholder for embed', placeholder, icon);
 ***REMOVED*****REMOVED***

        createEmbed: function(url) {
          module.refresh();
          url = url || module.get.url();
          $embed = $('<div/>')
            .addClass(className.embed)
            .html( module.generate.embed(url) )
            .appendTo($module)
          ;
          settings.onCreate.call(element, url);
          module.debug('Creating embed object', $embed);
 ***REMOVED*****REMOVED***

        changeEmbed: function(url) {
          $embed
            .html( module.generate.embed(url) )
          ;
 ***REMOVED*****REMOVED***

        createAndShow: function() {
          module.createEmbed();
          module.show();
 ***REMOVED*****REMOVED***

        // sets new embed
        change: function(source, id, url) {
          module.debug('Changing video to ', source, id, url);
          $module
            .data(metadata.source, source)
            .data(metadata.id, id)
          ;
          if(url) {
            $module.data(metadata.url, url);
        ***REMOVED***
          else {
            $module.removeData(metadata.url);
        ***REMOVED***
          if(module.has.embed()) {
            module.changeEmbed();
        ***REMOVED***
          else {
            module.create();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        // clears embed
        reset: function() {
          module.debug('Clearing embed and showing placeholder');
          module.remove.data();
          module.remove.active();
          module.remove.embed();
          module.showPlaceholder();
          settings.onReset.call(element);
 ***REMOVED*****REMOVED***

        // shows current embed
        show: function() {
          module.debug('Showing embed');
          module.set.active();
          settings.onDisplay.call(element);
 ***REMOVED*****REMOVED***

        hide: function() {
          module.debug('Hiding embed');
          module.showPlaceholder();
 ***REMOVED*****REMOVED***

        showPlaceholder: function() {
          module.debug('Showing placeholder image');
          module.remove.active();
          settings.onPlaceholderDisplay.call(element);
 ***REMOVED*****REMOVED***

        get: {
          id: function() {
            return settings.id || $module.data(metadata.id);
   ***REMOVED*****REMOVED***
          placeholder: function() {
            return settings.placeholder || $module.data(metadata.placeholder);
   ***REMOVED*****REMOVED***
          icon: function() {
            return (settings.icon)
              ? settings.icon
              : ($module.data(metadata.icon) !== undefined)
                ? $module.data(metadata.icon)
                : module.determine.icon()
            ;
   ***REMOVED*****REMOVED***
          source: function(url) {
            return (settings.source)
              ? settings.source
              : ($module.data(metadata.source) !== undefined)
                ? $module.data(metadata.source)
                : module.determine.source()
            ;
   ***REMOVED*****REMOVED***
          type: function() {
            var source = module.get.source();
            return (sources[source] !== undefined)
              ? sources[source].type
              : false
            ;
   ***REMOVED*****REMOVED***
          url: function() {
            return (settings.url)
              ? settings.url
              : ($module.data(metadata.url) !== undefined)
                ? $module.data(metadata.url)
                : module.determine.url()
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        determine: {
          autoplay: function() {
            if(module.should.autoplay()) {
              settings.autoplay = true;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          source: function(url) {
            var
              matchedSource = false
            ;
            url = url || module.get.url();
            if(url) {
              $.each(sources, function(name, source) {
                if(url.search(source.domain) !== -1) {
                  matchedSource = name;
                  return false;
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***
            return matchedSource;
   ***REMOVED*****REMOVED***
          icon: function() {
            var
              source = module.get.source()
            ;
            return (sources[source] !== undefined)
              ? sources[source].icon
              : false
            ;
   ***REMOVED*****REMOVED***
          url: function() {
            var
              id     = settings.id     || $module.data(metadata.id),
              source = settings.source || $module.data(metadata.source),
              url
            ;
            url = (sources[source] !== undefined)
              ? sources[source].url.replace('{id***REMOVED***', id)
              : false
            ;
            if(url) {
              $module.data(metadata.url, url);
          ***REMOVED***
            return url;
        ***REMOVED***
 ***REMOVED*****REMOVED***


        set: {
          active: function() {
            $module.addClass(className.active);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          data: function() {
            $module
              .removeData(metadata.id)
              .removeData(metadata.icon)
              .removeData(metadata.placeholder)
              .removeData(metadata.source)
              .removeData(metadata.url)
            ;
   ***REMOVED*****REMOVED***
          active: function() {
            $module.removeClass(className.active);
   ***REMOVED*****REMOVED***
          embed: function() {
            $embed.empty();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        encode: {
          parameters: function(parameters) {
            var
              urlString = [],
              index
            ;
            for (index in parameters) {
              urlString.push( encodeURIComponent(index) + '=' + encodeURIComponent( parameters[index] ) );
          ***REMOVED***
            return urlString.join('&amp;');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        generate: {
          embed: function(url) {
            module.debug('Generating embed html');
            var
              source = module.get.source(),
              html,
              parameters
            ;
            url = module.get.url(url);
            if(url) {
              parameters = module.generate.parameters(source);
              html       = templates.iframe(url, parameters);
          ***REMOVED***
            else {
              module.error(error.noURL, $module);
          ***REMOVED***
            return html;
   ***REMOVED*****REMOVED***
          parameters: function(source, extraParameters) {
            var
              parameters = (sources[source] && sources[source].parameters !== undefined)
                ? sources[source].parameters(settings)
                : {***REMOVED***
            ;
            extraParameters = extraParameters || settings.parameters;
            if(extraParameters) {
              parameters = $.extend({***REMOVED***, parameters, extraParameters);
          ***REMOVED***
            parameters = settings.onEmbed(parameters);
            return module.encode.parameters(parameters);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        has: {
          embed: function() {
            return ($embed.length > 0);
   ***REMOVED*****REMOVED***
          placeholder: function() {
            return settings.placeholder || $module.data(metadata.placeholder);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        should: {
          autoplay: function() {
            return (settings.autoplay === 'auto')
              ? (settings.placeholder || $module.data(metadata.placeholder) !== undefined)
              : settings.autoplay
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          video: function() {
            return module.get.type() == 'video';
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
            if($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
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

$.fn.embed.settings = {

  name        : 'Embed',
  namespace   : 'embed',

  silent      : false,
  debug       : false,
  verbose     : false,
  performance : true,

  icon     : false,
  source   : false,
  url      : false,
  id       : false,

  // standard video settings
  autoplay  : 'auto',
  color     : '#444444',
  hd        : true,
  brandedUI : false,

  // additional parameters to include with the embed
  parameters: false,

  onDisplay            : function() {***REMOVED***,
  onPlaceholderDisplay : function() {***REMOVED***,
  onReset              : function() {***REMOVED***,
  onCreate             : function(url) {***REMOVED***,
  onEmbed              : function(parameters) {
    return parameters;
***REMOVED***

  metadata    : {
    id          : 'id',
    icon        : 'icon',
    placeholder : 'placeholder',
    source      : 'source',
    url         : 'url'
***REMOVED***

  error : {
    noURL  : 'No URL specified',
    method : 'The method you called is not defined'
***REMOVED***

  className : {
    active : 'active',
    embed  : 'embed'
***REMOVED***

  selector : {
    embed       : '.embed',
    placeholder : '.placeholder',
    icon        : '.icon'
***REMOVED***

  sources: {
    youtube: {
      name   : 'youtube',
      type   : 'video',
      icon   : 'video play',
      domain : 'youtube.com',
      url    : '//www.youtube.com/embed/{id***REMOVED***',
      parameters: function(settings) {
        return {
          autohide       : !settings.brandedUI,
          autoplay       : settings.autoplay,
          color          : settings.color || undefined,
          hq             : settings.hd,
          jsapi          : settings.api,
          modestbranding : !settings.brandedUI
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
    vimeo: {
      name   : 'vimeo',
      type   : 'video',
      icon   : 'video play',
      domain : 'vimeo.com',
      url    : '//player.vimeo.com/video/{id***REMOVED***',
      parameters: function(settings) {
        return {
          api      : settings.api,
          autoplay : settings.autoplay,
          byline   : settings.brandedUI,
          color    : settings.color || undefined,
          portrait : settings.brandedUI,
          title    : settings.brandedUI
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

  templates: {
    iframe : function(url, parameters) {
      var src = url;
      if (parameters) {
          src += '?' + parameters;
    ***REMOVED***
      return ''
        + '<iframe src="' + src + '"'
        + ' width="100%" height="100%"'
        + ' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
      ;
  ***REMOVED***
    placeholder : function(image, icon) {
      var
        html = ''
      ;
      if(icon) {
        html += '<i class="' + icon + ' icon"></i>';
    ***REMOVED***
      if(image) {
        html += '<img class="placeholder" src="' + image + '">';
    ***REMOVED***
      return html;
  ***REMOVED***
***REMOVED***

  // NOT YET IMPLEMENTED
  api     : false,
  onPause : function() {***REMOVED***,
  onPlay  : function() {***REMOVED***,
  onStop  : function() {***REMOVED***

***REMOVED***;



***REMOVED***)( jQuery, window, document );
