/*!
***REMOVED*** # Fomantic-UI - Dimmer
***REMOVED*** http://github.com/fomantic/Fomantic-UI/
***REMOVED***
***REMOVED***
***REMOVED*** Released under the MIT license
***REMOVED*** http://opensource.org/licenses/MIT
***REMOVED***
***REMOVED***/

;(function ($, window, document, undefined) {

***REMOVED***;

$.isFunction = $.isFunction || function(obj) {
  return typeof obj === "function" && typeof obj.nodeType !== "number";
***REMOVED***;

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.dimmer = function(parameters) {
  var
    $allModules     = $(this),

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
          ? $.extend(true, {***REMOVED***, $.fn.dimmer.settings, parameters)
          : $.extend({***REMOVED***, $.fn.dimmer.settings),

        selector        = settings.selector,
        namespace       = settings.namespace,
        className       = settings.className,
        error           = settings.error,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,
        moduleSelector  = $allModules.selector || '',

        clickEvent      = ('ontouchstart' in document.documentElement)
          ? 'touchstart'
          : 'click',

        $module = $(this),
        $dimmer,
        $dimmable,

        element   = this,
        instance  = $module.data(moduleNamespace),
        module
      ;

      module = {

        preinitialize: function() {
          if( module.is.dimmer() ) {

            $dimmable = $module.parent();
            $dimmer   = $module;
        ***REMOVED***
          else {
            $dimmable = $module;
            if( module.has.dimmer() ) {
              if(settings.dimmerName) {
                $dimmer = $dimmable.find(selector.dimmer).filter('.' + settings.dimmerName);
            ***REMOVED***
              else {
                $dimmer = $dimmable.find(selector.dimmer);
            ***REMOVED***
          ***REMOVED***
            else {
              $dimmer = module.create();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        initialize: function() {
          module.debug('Initializing dimmer', settings);

          module.bind.events();
          module.set.dimmable();
          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, instance)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.verbose('Destroying previous module', $dimmer);
          module.unbind.events();
          module.remove.variation();
          $dimmable
            .off(eventNamespace)
          ;
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            if(settings.on == 'hover') {
              $dimmable
                .on('mouseenter' + eventNamespace, module.show)
                .on('mouseleave' + eventNamespace, module.hide)
              ;
          ***REMOVED***
            else if(settings.on == 'click') {
              $dimmable
                .on(clickEvent + eventNamespace, module.toggle)
              ;
          ***REMOVED***
            if( module.is.page() ) {
              module.debug('Setting as a page dimmer', $dimmable);
              module.set.pageDimmer();
          ***REMOVED***

            if( module.is.closable() ) {
              module.verbose('Adding dimmer close event', $dimmer);
              $dimmable
                .on(clickEvent + eventNamespace, selector.dimmer, module.event.click)
              ;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        unbind: {
          events: function() {
            $module
              .removeData(moduleNamespace)
            ;
            $dimmable
              .off(eventNamespace)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          click: function(event) {
            module.verbose('Determining if event occured on dimmer', event);
            if( $dimmer.find(event.target).length === 0 || $(event.target).is(selector.content) ) {
              module.hide();
              event.stopImmediatePropagation();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        addContent: function(element) {
          var
            $content = $(element)
          ;
          module.debug('Add content to dimmer', $content);
          if($content.parent()[0] !== $dimmer[0]) {
            $content.detach().appendTo($dimmer);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        create: function() {
          var
            $element = $( settings.template.dimmer(settings) )
          ;
          if(settings.dimmerName) {
            module.debug('Creating named dimmer', settings.dimmerName);
            $element.addClass(settings.dimmerName);
        ***REMOVED***
          $element
            .appendTo($dimmable)
          ;
          return $element;
 ***REMOVED*****REMOVED***

        show: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          module.debug('Showing dimmer', $dimmer, settings);
          module.set.variation();
          if( (!module.is.dimmed() || module.is.animating()) && module.is.enabled() ) {
            module.animate.show(callback);
            settings.onShow.call(element);
            settings.onChange.call(element);
        ***REMOVED***
          else {
            module.debug('Dimmer is already shown or disabled');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        hide: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          if( module.is.dimmed() || module.is.animating() ) {
            module.debug('Hiding dimmer', $dimmer);
            module.animate.hide(callback);
            settings.onHide.call(element);
            settings.onChange.call(element);
        ***REMOVED***
          else {
            module.debug('Dimmer is not visible');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        toggle: function() {
          module.verbose('Toggling dimmer visibility', $dimmer);
          if( !module.is.dimmed() ) {
            module.show();
        ***REMOVED***
          else {
            if ( module.is.closable() ) {
              module.hide();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        animate: {
          show: function(callback) {
            callback = $.isFunction(callback)
              ? callback
              : function(){***REMOVED***
            ;
            if(settings.useCSS && $.fn.transition !== undefined && $dimmer.transition('is supported')) {
              if(settings.useFlex) {
                module.debug('Using flex dimmer');
                module.remove.legacy();
            ***REMOVED***
              else {
                module.debug('Using legacy non-flex dimmer');
                module.set.legacy();
            ***REMOVED***
              if(settings.opacity !== 'auto') {
                module.set.opacity();
            ***REMOVED***
              $dimmer
                .transition({
                  displayType : settings.useFlex
                    ? 'flex'
                    : 'block',
                  animation   : settings.transition + ' in',
                  queue       : false,
                  duration    : module.get.duration(),
                  useFailSafe : true,
                  onStart     : function() {
                    module.set.dimmed();
      ***REMOVED*****REMOVED*****REMOVED***
                  onComplete  : function() {
                    module.set.active();
                    callback();
                ***REMOVED***
              ***REMOVED***)
              ;
          ***REMOVED***
            else {
              module.verbose('Showing dimmer animation with javascript');
              module.set.dimmed();
              if(settings.opacity == 'auto') {
                settings.opacity = 0.8;
            ***REMOVED***
              $dimmer
                .stop()
                .css({
                  opacity : 0,
                  width   : '100%',
                  height  : '100%'
              ***REMOVED***)
                .fadeTo(module.get.duration(), settings.opacity, function() {
                  $dimmer.removeAttr('style');
                  module.set.active();
                  callback();
              ***REMOVED***)
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          hide: function(callback) {
            callback = $.isFunction(callback)
              ? callback
              : function(){***REMOVED***
            ;
            if(settings.useCSS && $.fn.transition !== undefined && $dimmer.transition('is supported')) {
              module.verbose('Hiding dimmer with css');
              $dimmer
                .transition({
                  displayType : settings.useFlex
                    ? 'flex'
                    : 'block',
                  animation   : settings.transition + ' out',
                  queue       : false,
                  duration    : module.get.duration(),
                  useFailSafe : true,
                  onComplete  : function() {
                    module.remove.dimmed();
                    module.remove.variation();
                    module.remove.active();
                    callback();
                ***REMOVED***
              ***REMOVED***)
              ;
          ***REMOVED***
            else {
              module.verbose('Hiding dimmer with javascript');
              $dimmer
                .stop()
                .fadeOut(module.get.duration(), function() {
                  module.remove.dimmed();
                  module.remove.active();
                  $dimmer.removeAttr('style');
                  callback();
              ***REMOVED***)
              ;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          dimmer: function() {
            return $dimmer;
   ***REMOVED*****REMOVED***
          duration: function() {
            if(typeof settings.duration == 'object') {
              if( module.is.active() ) {
                return settings.duration.hide;
            ***REMOVED***
              else {
                return settings.duration.show;
            ***REMOVED***
          ***REMOVED***
            return settings.duration;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        has: {
          dimmer: function() {
            if(settings.dimmerName) {
              return ($module.find(selector.dimmer).filter('.' + settings.dimmerName).length > 0);
          ***REMOVED***
            else {
              return ( $module.find(selector.dimmer).length > 0 );
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          active: function() {
            return $dimmer.hasClass(className.active);
   ***REMOVED*****REMOVED***
          animating: function() {
            return ( $dimmer.is(':animated') || $dimmer.hasClass(className.animating) );
   ***REMOVED*****REMOVED***
          closable: function() {
            if(settings.closable == 'auto') {
              if(settings.on == 'hover') {
                return false;
            ***REMOVED***
              return true;
          ***REMOVED***
            return settings.closable;
   ***REMOVED*****REMOVED***
          dimmer: function() {
            return $module.hasClass(className.dimmer);
   ***REMOVED*****REMOVED***
          dimmable: function() {
            return $module.hasClass(className.dimmable);
   ***REMOVED*****REMOVED***
          dimmed: function() {
            return $dimmable.hasClass(className.dimmed);
   ***REMOVED*****REMOVED***
          disabled: function() {
            return $dimmable.hasClass(className.disabled);
   ***REMOVED*****REMOVED***
          enabled: function() {
            return !module.is.disabled();
   ***REMOVED*****REMOVED***
          page: function () {
            return $dimmable.is('body');
   ***REMOVED*****REMOVED***
          pageDimmer: function() {
            return $dimmer.hasClass(className.pageDimmer);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        can: {
          show: function() {
            return !$dimmer.hasClass(className.disabled);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          opacity: function(opacity) {
            var
              color      = $dimmer.css('background-color'),
              colorArray = color.split(','),
              isRGB      = (colorArray && colorArray.length == 3),
              isRGBA     = (colorArray && colorArray.length == 4)
            ;
            opacity    = settings.opacity === 0 ? 0 : settings.opacity || opacity;
            if(isRGB || isRGBA) {
              colorArray[3] = opacity + ')';
              color         = colorArray.join(',');
          ***REMOVED***
            else {
              color = 'rgba(0, 0, 0, ' + opacity + ')';
          ***REMOVED***
            module.debug('Setting opacity to', opacity);
            $dimmer.css('background-color', color);
   ***REMOVED*****REMOVED***
          legacy: function() {
            $dimmer.addClass(className.legacy);
   ***REMOVED*****REMOVED***
          active: function() {
            $dimmer.addClass(className.active);
   ***REMOVED*****REMOVED***
          dimmable: function() {
            $dimmable.addClass(className.dimmable);
   ***REMOVED*****REMOVED***
          dimmed: function() {
            $dimmable.addClass(className.dimmed);
   ***REMOVED*****REMOVED***
          pageDimmer: function() {
            $dimmer.addClass(className.pageDimmer);
   ***REMOVED*****REMOVED***
          disabled: function() {
            $dimmer.addClass(className.disabled);
   ***REMOVED*****REMOVED***
          variation: function(variation) {
            variation = variation || settings.variation;
            if(variation) {
              $dimmer.addClass(variation);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          active: function() {
            $dimmer
              .removeClass(className.active)
            ;
   ***REMOVED*****REMOVED***
          legacy: function() {
            $dimmer.removeClass(className.legacy);
   ***REMOVED*****REMOVED***
          dimmed: function() {
            $dimmable.removeClass(className.dimmed);
   ***REMOVED*****REMOVED***
          disabled: function() {
            $dimmer.removeClass(className.disabled);
   ***REMOVED*****REMOVED***
          variation: function(variation) {
            variation = variation || settings.variation;
            if(variation) {
              $dimmer.removeClass(variation);
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

      module.preinitialize();

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

$.fn.dimmer.settings = {

  name        : 'Dimmer',
  namespace   : 'dimmer',

  silent      : false,
  debug       : false,
  verbose     : false,
  performance : true,

  // whether should use flex layout
  useFlex     : true,

  // name to distinguish between multiple dimmers in context
  dimmerName  : false,

  // whether to add a variation type
  variation   : false,

  // whether to bind close events
  closable    : 'auto',

  // whether to use css animations
  useCSS      : true,

  // css animation to use
  transition  : 'fade',

  // event to bind to
  on          : false,

  // overriding opacity value
  opacity     : 'auto',

  // transition durations
  duration    : {
    show : 500,
    hide : 500
***REMOVED***
// whether the dynamically created dimmer should have a loader
  displayLoader: false,
  loaderText  : false,
  loaderVariation : '',

  onChange    : function(){***REMOVED***,
  onShow      : function(){***REMOVED***,
  onHide      : function(){***REMOVED***,

  error   : {
    method   : 'The method you called is not defined.'
***REMOVED***

  className : {
    active     : 'active',
    animating  : 'animating',
    dimmable   : 'dimmable',
    dimmed     : 'dimmed',
    dimmer     : 'dimmer',
    disabled   : 'disabled',
    hide       : 'hide',
    legacy     : 'legacy',
    pageDimmer : 'page',
    show       : 'show',
    loader     : 'ui loader'
***REMOVED***

  selector: {
    dimmer   : '> .ui.dimmer',
    content  : '.ui.dimmer > .content, .ui.dimmer > .content > .center'
***REMOVED***

  template: {
    dimmer: function(settings) {
        var d = $('<div/>').addClass('ui dimmer'),l;
        if(settings.displayLoader) {
          l = $('<div/>')
              .addClass(settings.className.loader)
              .addClass(settings.loaderVariation);
          if(!!settings.loaderText){
            l.text(settings.loaderText);
            l.addClass('text');
        ***REMOVED***
          d.append(l);
      ***REMOVED***
        return d;
  ***REMOVED***
***REMOVED***

***REMOVED***;

***REMOVED***)( jQuery, window, document );
