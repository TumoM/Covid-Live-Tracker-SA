/*!
***REMOVED*** # Fomantic-UI - Accordion
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

$.fn.accordion = function(parameters) {
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
          ? $.extend(true, {***REMOVED***, $.fn.accordion.settings, parameters)
          : $.extend({***REMOVED***, $.fn.accordion.settings),

        className       = settings.className,
        namespace       = settings.namespace,
        selector        = settings.selector,
        error           = settings.error,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,
        moduleSelector  = $allModules.selector || '',

        $module  = $(this),
        $title   = $module.find(selector.title),
        $content = $module.find(selector.content),

        element  = this,
        instance = $module.data(moduleNamespace),
        observer,
        module
      ;

      module = {

        initialize: function() {
          module.debug('Initializing', $module);
          module.bind.events();
          if(settings.observeChanges) {
            module.observeChanges();
        ***REMOVED***
          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.debug('Destroying previous instance', $module);
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
 ***REMOVED*****REMOVED***

        refresh: function() {
          $title   = $module.find(selector.title);
          $content = $module.find(selector.content);
 ***REMOVED*****REMOVED***

        observeChanges: function() {
          if('MutationObserver' in window) {
            observer = new MutationObserver(function(mutations) {
              module.debug('DOM tree modified, updating selector cache');
              module.refresh();
          ***REMOVED***);
            observer.observe(element, {
              childList : true,
              subtree   : true
          ***REMOVED***);
            module.debug('Setting up mutation observer', observer);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            module.debug('Binding delegated events');
            $module
              .on(settings.on + eventNamespace, selector.trigger, module.event.click)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          click: function() {
            module.toggle.call(this);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        toggle: function(query) {
          var
            $activeTitle = (query !== undefined)
              ? (typeof query === 'number')
                ? $title.eq(query)
                : $(query).closest(selector.title)
              : $(this).closest(selector.title),
            $activeContent = $activeTitle.next($content),
            isAnimating = $activeContent.hasClass(className.animating),
            isActive    = $activeContent.hasClass(className.active),
            isOpen      = (isActive && !isAnimating),
            isOpening   = (!isActive && isAnimating)
          ;
          module.debug('Toggling visibility of content', $activeTitle);
          if(isOpen || isOpening) {
            if(settings.collapsible) {
              module.close.call($activeTitle);
          ***REMOVED***
            else {
              module.debug('Cannot close accordion content collapsing is disabled');
          ***REMOVED***
        ***REMOVED***
          else {
            module.open.call($activeTitle);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        open: function(query) {
          var
            $activeTitle = (query !== undefined)
              ? (typeof query === 'number')
                ? $title.eq(query)
                : $(query).closest(selector.title)
              : $(this).closest(selector.title),
            $activeContent = $activeTitle.next($content),
            isAnimating = $activeContent.hasClass(className.animating),
            isActive    = $activeContent.hasClass(className.active),
            isOpen      = (isActive || isAnimating)
          ;
          if(isOpen) {
            module.debug('Accordion already open, skipping', $activeContent);
            return;
        ***REMOVED***
          module.debug('Opening accordion content', $activeTitle);
          settings.onOpening.call($activeContent);
          settings.onChanging.call($activeContent);
          if(settings.exclusive) {
            module.closeOthers.call($activeTitle);
        ***REMOVED***
          $activeTitle
            .addClass(className.active)
          ;
          $activeContent
            .stop(true, true)
            .addClass(className.animating)
          ;
          if(settings.animateChildren) {
            if($.fn.transition !== undefined && $module.transition('is supported')) {
              $activeContent
                .children()
                  .transition({
                    animation        : 'fade in',
                    queue            : false,
                    useFailSafe      : true,
                    debug            : settings.debug,
                    verbose          : settings.verbose,
                    duration         : settings.duration,
                    skipInlineHidden : true,
                    onComplete: function() {
                      $activeContent.children().removeClass(className.transition);
                  ***REMOVED***
                ***REMOVED***)
              ;
          ***REMOVED***
            else {
              $activeContent
                .children()
                  .stop(true, true)
                  .animate({
                    opacity: 1
      ***REMOVED*****REMOVED*****REMOVED*** settings.duration, module.resetOpacity)
              ;
          ***REMOVED***
        ***REMOVED***
          $activeContent
            .slideDown(settings.duration, settings.easing, function() {
              $activeContent
                .removeClass(className.animating)
                .addClass(className.active)
              ;
              module.reset.display.call(this);
              settings.onOpen.call(this);
              settings.onChange.call(this);
          ***REMOVED***)
          ;
 ***REMOVED*****REMOVED***

        close: function(query) {
          var
            $activeTitle = (query !== undefined)
              ? (typeof query === 'number')
                ? $title.eq(query)
                : $(query).closest(selector.title)
              : $(this).closest(selector.title),
            $activeContent = $activeTitle.next($content),
            isAnimating    = $activeContent.hasClass(className.animating),
            isActive       = $activeContent.hasClass(className.active),
            isOpening      = (!isActive && isAnimating),
            isClosing      = (isActive && isAnimating)
          ;
          if((isActive || isOpening) && !isClosing) {
            module.debug('Closing accordion content', $activeContent);
            settings.onClosing.call($activeContent);
            settings.onChanging.call($activeContent);
            $activeTitle
              .removeClass(className.active)
            ;
            $activeContent
              .stop(true, true)
              .addClass(className.animating)
            ;
            if(settings.animateChildren) {
              if($.fn.transition !== undefined && $module.transition('is supported')) {
                $activeContent
                  .children()
                    .transition({
                      animation        : 'fade out',
                      queue            : false,
                      useFailSafe      : true,
                      debug            : settings.debug,
                      verbose          : settings.verbose,
                      duration         : settings.duration,
                      skipInlineHidden : true
                  ***REMOVED***)
                ;
            ***REMOVED***
              else {
                $activeContent
                  .children()
                    .stop(true, true)
                    .animate({
                      opacity: 0
        ***REMOVED*****REMOVED*****REMOVED*** settings.duration, module.resetOpacity)
                ;
            ***REMOVED***
          ***REMOVED***
            $activeContent
              .slideUp(settings.duration, settings.easing, function() {
                $activeContent
                  .removeClass(className.animating)
                  .removeClass(className.active)
                ;
                module.reset.display.call(this);
                settings.onClose.call(this);
                settings.onChange.call(this);
            ***REMOVED***)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        closeOthers: function(index) {
          var
            $activeTitle = (index !== undefined)
              ? $title.eq(index)
              : $(this).closest(selector.title),
            $parentTitles    = $activeTitle.parents(selector.content).prev(selector.title),
            $activeAccordion = $activeTitle.closest(selector.accordion),
            activeSelector   = selector.title + '.' + className.active + ':visible',
            activeContent    = selector.content + '.' + className.active + ':visible',
            $openTitles,
            $nestedTitles,
            $openContents
          ;
          if(settings.closeNested) {
            $openTitles   = $activeAccordion.find(activeSelector).not($parentTitles);
            $openContents = $openTitles.next($content);
        ***REMOVED***
          else {
            $openTitles   = $activeAccordion.find(activeSelector).not($parentTitles);
            $nestedTitles = $activeAccordion.find(activeContent).find(activeSelector).not($parentTitles);
            $openTitles   = $openTitles.not($nestedTitles);
            $openContents = $openTitles.next($content);
        ***REMOVED***
          if( ($openTitles.length > 0) ) {
            module.debug('Exclusive enabled, closing other content', $openTitles);
            $openTitles
              .removeClass(className.active)
            ;
            $openContents
              .removeClass(className.animating)
              .stop(true, true)
            ;
            if(settings.animateChildren) {
              if($.fn.transition !== undefined && $module.transition('is supported')) {
                $openContents
                  .children()
                    .transition({
                      animation        : 'fade out',
                      useFailSafe      : true,
                      debug            : settings.debug,
                      verbose          : settings.verbose,
                      duration         : settings.duration,
                      skipInlineHidden : true
                  ***REMOVED***)
                ;
            ***REMOVED***
              else {
                $openContents
                  .children()
                    .stop(true, true)
                    .animate({
                      opacity: 0
        ***REMOVED*****REMOVED*****REMOVED*** settings.duration, module.resetOpacity)
                ;
            ***REMOVED***
          ***REMOVED***
            $openContents
              .slideUp(settings.duration , settings.easing, function() {
                $(this).removeClass(className.active);
                module.reset.display.call(this);
            ***REMOVED***)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        reset: {

          display: function() {
            module.verbose('Removing inline display from element', this);
            $(this).css('display', '');
            if( $(this).attr('style') === '') {
              $(this)
                .attr('style', '')
                .removeAttr('style')
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***

          opacity: function() {
            module.verbose('Removing inline opacity from element', this);
            $(this).css('opacity', '');
            if( $(this).attr('style') === '') {
              $(this)
                .attr('style', '')
                .removeAttr('style')
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***

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
          module.debug('Changing internal', name, value);
          if(value !== undefined) {
            if( $.isPlainObject(name) ) {
              $.extend(true, module, name);
          ***REMOVED***
            else {
              module[name] = value;
          ***REMOVED***
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

$.fn.accordion.settings = {

  name            : 'Accordion',
  namespace       : 'accordion',

  silent          : false,
  debug           : false,
  verbose         : false,
  performance     : true,

  on              : 'click', // event on title that opens accordion

  observeChanges  : true,  // whether accordion should automatically refresh on DOM insertion

  exclusive       : true,  // whether a single accordion content panel should be open at once
  collapsible     : true,  // whether accordion content can be closed
  closeNested     : false, // whether nested content should be closed when a panel is closed
  animateChildren : true,  // whether children opacity should be animated

  duration        : 350, // duration of animation
  easing          : 'easeOutQuad', // easing equation for animation

  onOpening       : function(){***REMOVED***, // callback before open animation
  onClosing       : function(){***REMOVED***, // callback before closing animation
  onChanging      : function(){***REMOVED***, // callback before closing or opening animation

  onOpen          : function(){***REMOVED***, // callback after open animation
  onClose         : function(){***REMOVED***, // callback after closing animation
  onChange        : function(){***REMOVED***, // callback after closing or opening animation

  error: {
    method : 'The method you called is not defined'
***REMOVED***

  className   : {
    active    : 'active',
    animating : 'animating',
    transition: 'transition'
***REMOVED***

  selector    : {
    accordion : '.accordion',
    title     : '.title',
    trigger   : '.title',
    content   : '.content'
***REMOVED***

***REMOVED***;

// Adds easing
$.extend( $.easing, {
  easeOutQuad: function (x, t, b, c, d) {
    return -c***REMOVED***(t/=d)*(t-2) + b;
***REMOVED***
***REMOVED***);

***REMOVED***)( jQuery, window, document );

