/*!
***REMOVED*** # Fomantic-UI - Sticky
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

$.fn.sticky = function(parameters) {
  var
    $allModules    = $(this),
    moduleSelector = $allModules.selector || '',

    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),
    returnedValue
  ;

  $allModules
    .each(function() {
      var
        settings              = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.sticky.settings, parameters)
          : $.extend({***REMOVED***, $.fn.sticky.settings),

        className             = settings.className,
        namespace             = settings.namespace,
        error                 = settings.error,

        eventNamespace        = '.' + namespace,
        moduleNamespace       = 'module-' + namespace,

        $module               = $(this),
        $window               = $(window),
        $scroll               = $(settings.scrollContext),
        $container,
        $context,

        instance              = $module.data(moduleNamespace),

        requestAnimationFrame = window.requestAnimationFrame
          || window.mozRequestAnimationFrame
          || window.webkitRequestAnimationFrame
          || window.msRequestAnimationFrame
          || function(callback) { setTimeout(callback, 0); ***REMOVED***,

        element         = this,

        documentObserver,
        observer,
        module
      ;

      module      = {

        initialize: function() {

          module.determineContainer();
          module.determineContext();
          module.verbose('Initializing sticky', settings, $container);

          module.save.positions();
          module.checkErrors();
          module.bind.events();

          if(settings.observeChanges) {
            module.observeChanges();
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
          module.verbose('Destroying previous instance');
          module.reset();
          if(documentObserver) {
            documentObserver.disconnect();
        ***REMOVED***
          if(observer) {
            observer.disconnect();
        ***REMOVED***
          $window
            .off('load' + eventNamespace, module.event.load)
            .off('resize' + eventNamespace, module.event.resize)
          ;
          $scroll
            .off('scrollchange' + eventNamespace, module.event.scrollchange)
          ;
          $module.removeData(moduleNamespace);
 ***REMOVED*****REMOVED***

        observeChanges: function() {
          if('MutationObserver' in window) {
            documentObserver = new MutationObserver(module.event.documentChanged);
            observer         = new MutationObserver(module.event.changed);
            documentObserver.observe(document, {
              childList : true,
              subtree   : true
          ***REMOVED***);
            observer.observe(element, {
              childList : true,
              subtree   : true
          ***REMOVED***);
            observer.observe($context[0], {
              childList : true,
              subtree   : true
          ***REMOVED***);
            module.debug('Setting up mutation observer', observer);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        determineContainer: function() {
          if(settings.container) {
            $container = $(settings.container);
        ***REMOVED***
          else {
            $container = $module.offsetParent();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        determineContext: function() {
          if(settings.context) {
            $context = $(settings.context);
        ***REMOVED***
          else {
            $context = $container;
        ***REMOVED***
          if($context.length === 0) {
            module.error(error.invalidContext, settings.context, $module);
            return;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        checkErrors: function() {
          if( module.is.hidden() ) {
            module.error(error.visible, $module);
        ***REMOVED***
          if(module.cache.element.height > module.cache.context.height) {
            module.reset();
            module.error(error.elementSize, $module);
            return;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            $window
              .on('load' + eventNamespace, module.event.load)
              .on('resize' + eventNamespace, module.event.resize)
            ;
            // pub/sub pattern
            $scroll
              .off('scroll' + eventNamespace)
              .on('scroll' + eventNamespace, module.event.scroll)
              .on('scrollchange' + eventNamespace, module.event.scrollchange)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          changed: function(mutations) {
            clearTimeout(module.timer);
            module.timer = setTimeout(function() {
              module.verbose('DOM tree modified, updating sticky menu', mutations);
              module.refresh();
***REMOVED*****REMOVED*****REMOVED*** 100);
   ***REMOVED*****REMOVED***
          documentChanged: function(mutations) {
            [].forEach.call(mutations, function(mutation) {
              if(mutation.removedNodes) {
                [].forEach.call(mutation.removedNodes, function(node) {
                  if(node == element || $(node).find(element).length > 0) {
                    module.debug('Element removed from DOM, tearing down events');
                    module.destroy();
                ***REMOVED***
              ***REMOVED***);
            ***REMOVED***
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          load: function() {
            module.verbose('Page contents finished loading');
            requestAnimationFrame(module.refresh);
   ***REMOVED*****REMOVED***
          resize: function() {
            module.verbose('Window resized');
            requestAnimationFrame(module.refresh);
   ***REMOVED*****REMOVED***
          scroll: function() {
            requestAnimationFrame(function() {
              $scroll.triggerHandler('scrollchange' + eventNamespace, $scroll.scrollTop() );
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          scrollchange: function(event, scrollPosition) {
            module.stick(scrollPosition);
            settings.onScroll.call(element);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        refresh: function(hardRefresh) {
          module.reset();
          if(!settings.context) {
            module.determineContext();
        ***REMOVED***
          if(hardRefresh) {
            module.determineContainer();
        ***REMOVED***
          module.save.positions();
          module.stick();
          settings.onReposition.call(element);
 ***REMOVED*****REMOVED***

        supports: {
          sticky: function() {
            var
              $element = $('<div/>')
            ;
            $element.addClass(className.supported);
            return($element.css('position').match('sticky'));
        ***REMOVED***
 ***REMOVED*****REMOVED***

        save: {
          lastScroll: function(scroll) {
            module.lastScroll = scroll;
   ***REMOVED*****REMOVED***
          elementScroll: function(scroll) {
            module.elementScroll = scroll;
   ***REMOVED*****REMOVED***
          positions: function() {
            var
              scrollContext = {
                height : $scroll.height()
  ***REMOVED*****REMOVED*****REMOVED***
              element = {
                margin: {
                  top    : parseInt($module.css('margin-top'), 10),
                  bottom : parseInt($module.css('margin-bottom'), 10),
    ***REMOVED*****REMOVED*****REMOVED***
                offset : $module.offset(),
                width  : $module.outerWidth(),
                height : $module.outerHeight()
  ***REMOVED*****REMOVED*****REMOVED***
              context = {
                offset : $context.offset(),
                height : $context.outerHeight()
            ***REMOVED***
            ;
            if( !module.is.standardScroll() ) {
              module.debug('Non-standard scroll. Removing scroll offset from element offset');

              scrollContext.top  = $scroll.scrollTop();
              scrollContext.left = $scroll.scrollLeft();

              element.offset.top  += scrollContext.top;
              context.offset.top  += scrollContext.top;
              element.offset.left += scrollContext.left;
              context.offset.left += scrollContext.left;
          ***REMOVED***
            module.cache = {
              fits          : ( (element.height + settings.offset) <= scrollContext.height),
              sameHeight    : (element.height == context.height),
              scrollContext : {
                height : scrollContext.height
  ***REMOVED*****REMOVED*****REMOVED***
              element: {
                margin : element.margin,
                top    : element.offset.top - element.margin.top,
                left   : element.offset.left,
                width  : element.width,
                height : element.height,
                bottom : element.offset.top + element.height
  ***REMOVED*****REMOVED*****REMOVED***
              context: {
                top           : context.offset.top,
                height        : context.height,
                bottom        : context.offset.top + context.height
            ***REMOVED***
          ***REMOVED***;
            module.set.containerSize();

            module.stick();
            module.debug('Caching element positions', module.cache);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          direction: function(scroll) {
            var
              direction = 'down'
            ;
            scroll = scroll || $scroll.scrollTop();
            if(module.lastScroll !== undefined) {
              if(module.lastScroll < scroll) {
                direction = 'down';
            ***REMOVED***
              else if(module.lastScroll > scroll) {
                direction = 'up';
            ***REMOVED***
          ***REMOVED***
            return direction;
   ***REMOVED*****REMOVED***
          scrollChange: function(scroll) {
            scroll = scroll || $scroll.scrollTop();
            return (module.lastScroll)
              ? (scroll - module.lastScroll)
              : 0
            ;
   ***REMOVED*****REMOVED***
          currentElementScroll: function() {
            if(module.elementScroll) {
              return module.elementScroll;
          ***REMOVED***
            return ( module.is.top() )
              ? Math.abs(parseInt($module.css('top'), 10))    || 0
              : Math.abs(parseInt($module.css('bottom'), 10)) || 0
            ;
   ***REMOVED*****REMOVED***

          elementScroll: function(scroll) {
            scroll = scroll || $scroll.scrollTop();
            var
              element        = module.cache.element,
              scrollContext  = module.cache.scrollContext,
              delta          = module.get.scrollChange(scroll),
              maxScroll      = (element.height - scrollContext.height + settings.offset),
              elementScroll  = module.get.currentElementScroll(),
              possibleScroll = (elementScroll + delta)
            ;
            if(module.cache.fits || possibleScroll < 0) {
              elementScroll = 0;
          ***REMOVED***
            else if(possibleScroll > maxScroll ) {
              elementScroll = maxScroll;
          ***REMOVED***
            else {
              elementScroll = possibleScroll;
          ***REMOVED***
            return elementScroll;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          lastScroll: function() {
            delete module.lastScroll;
   ***REMOVED*****REMOVED***
          elementScroll: function(scroll) {
            delete module.elementScroll;
   ***REMOVED*****REMOVED***
          minimumSize: function() {
            $container
              .css('min-height', '')
            ;
   ***REMOVED*****REMOVED***
          offset: function() {
            $module.css('margin-top', '');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          offset: function() {
            module.verbose('Setting offset on element', settings.offset);
            $module
              .css('margin-top', settings.offset)
            ;
   ***REMOVED*****REMOVED***
          containerSize: function() {
            var
              tagName = $container.get(0).tagName
            ;
            if(tagName === 'HTML' || tagName == 'body') {
              // this can trigger for too many reasons
              //module.error(error.container, tagName, $module);
              module.determineContainer();
          ***REMOVED***
            else {
              if( Math.abs($container.outerHeight() - module.cache.context.height) > settings.jitter) {
                module.debug('Context has padding, specifying exact height for container', module.cache.context.height);
                $container.css({
                  height: module.cache.context.height
              ***REMOVED***);
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          minimumSize: function() {
            var
              element   = module.cache.element
            ;
            $container
              .css('min-height', element.height)
            ;
   ***REMOVED*****REMOVED***
          scroll: function(scroll) {
            module.debug('Setting scroll on element', scroll);
            if(module.elementScroll == scroll) {
              return;
          ***REMOVED***
            if( module.is.top() ) {
              $module
                .css('bottom', '')
                .css('top', -scroll)
              ;
          ***REMOVED***
            if( module.is.bottom() ) {
              $module
                .css('top', '')
                .css('bottom', scroll)
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          size: function() {
            if(module.cache.element.height !== 0 && module.cache.element.width !== 0) {
              element.style.setProperty('width',  module.cache.element.width  + 'px', 'important');
              element.style.setProperty('height', module.cache.element.height + 'px', 'important');
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          standardScroll: function() {
            return ($scroll[0] == window);
   ***REMOVED*****REMOVED***
          top: function() {
            return $module.hasClass(className.top);
   ***REMOVED*****REMOVED***
          bottom: function() {
            return $module.hasClass(className.bottom);
   ***REMOVED*****REMOVED***
          initialPosition: function() {
            return (!module.is.fixed() && !module.is.bound());
   ***REMOVED*****REMOVED***
          hidden: function() {
            return (!$module.is(':visible'));
   ***REMOVED*****REMOVED***
          bound: function() {
            return $module.hasClass(className.bound);
   ***REMOVED*****REMOVED***
          fixed: function() {
            return $module.hasClass(className.fixed);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        stick: function(scroll) {
          var
            cachedPosition = scroll || $scroll.scrollTop(),
            cache          = module.cache,
            fits           = cache.fits,
            sameHeight     = cache.sameHeight,
            element        = cache.element,
            scrollContext  = cache.scrollContext,
            context        = cache.context,
            offset         = (module.is.bottom() && settings.pushing)
              ? settings.bottomOffset
              : settings.offset,
            scroll         = {
              top    : cachedPosition + offset,
              bottom : cachedPosition + offset + scrollContext.height
***REMOVED*****REMOVED*****REMOVED***
            elementScroll  = (fits)
              ? 0
              : module.get.elementScroll(scroll.top),

            // shorthand
            doesntFit      = !fits,
            elementVisible = (element.height !== 0)
          ;
          if(elementVisible && !sameHeight) {

            if( module.is.initialPosition() ) {
              if(scroll.top >= context.bottom) {
                module.debug('Initial element position is bottom of container');
                module.bindBottom();
            ***REMOVED***
              else if(scroll.top > element.top) {
                if( (element.height + scroll.top - elementScroll) >= context.bottom ) {
                  module.debug('Initial element position is bottom of container');
                  module.bindBottom();
              ***REMOVED***
                else {
                  module.debug('Initial element position is fixed');
                  module.fixTop();
              ***REMOVED***
            ***REMOVED***

          ***REMOVED***
            else if( module.is.fixed() ) {

              // currently fixed top
              if( module.is.top() ) {
                if( scroll.top <= element.top ) {
                  module.debug('Fixed element reached top of container');
                  module.setInitialPosition();
              ***REMOVED***
                else if( (element.height + scroll.top - elementScroll) >= context.bottom ) {
                  module.debug('Fixed element reached bottom of container');
                  module.bindBottom();
              ***REMOVED***
                // scroll element if larger than screen
                else if(doesntFit) {
                  module.set.scroll(elementScroll);
                  module.save.lastScroll(scroll.top);
                  module.save.elementScroll(elementScroll);
              ***REMOVED***
            ***REMOVED***

              // currently fixed bottom
              else if(module.is.bottom() ) {

                // top edge
                if( (scroll.bottom - element.height) <= element.top) {
                  module.debug('Bottom fixed rail has reached top of container');
                  module.setInitialPosition();
              ***REMOVED***
                // bottom edge
                else if(scroll.bottom >= context.bottom) {
                  module.debug('Bottom fixed rail has reached bottom of container');
                  module.bindBottom();
              ***REMOVED***
                // scroll element if larger than screen
                else if(doesntFit) {
                  module.set.scroll(elementScroll);
                  module.save.lastScroll(scroll.top);
                  module.save.elementScroll(elementScroll);
              ***REMOVED***

            ***REMOVED***
          ***REMOVED***
            else if( module.is.bottom() ) {
              if( scroll.top <= element.top ) {
                module.debug('Jumped from bottom fixed to top fixed, most likely used home/end button');
                module.setInitialPosition();
            ***REMOVED***
              else {
                if(settings.pushing) {
                  if(module.is.bound() && scroll.bottom <= context.bottom ) {
                    module.debug('Fixing bottom attached element to bottom of browser.');
                    module.fixBottom();
                ***REMOVED***
              ***REMOVED***
                else {
                  if(module.is.bound() && (scroll.top <= context.bottom - element.height) ) {
                    module.debug('Fixing bottom attached element to top of browser.');
                    module.fixTop();
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bindTop: function() {
          module.debug('Binding element to top of parent container');
          module.remove.offset();
          $module
            .css({
              left         : '',
              top          : '',
              marginBottom : ''
          ***REMOVED***)
            .removeClass(className.fixed)
            .removeClass(className.bottom)
            .addClass(className.bound)
            .addClass(className.top)
          ;
          settings.onTop.call(element);
          settings.onUnstick.call(element);
 ***REMOVED*****REMOVED***
        bindBottom: function() {
          module.debug('Binding element to bottom of parent container');
          module.remove.offset();
          $module
            .css({
              left         : '',
              top          : ''
          ***REMOVED***)
            .removeClass(className.fixed)
            .removeClass(className.top)
            .addClass(className.bound)
            .addClass(className.bottom)
          ;
          settings.onBottom.call(element);
          settings.onUnstick.call(element);
 ***REMOVED*****REMOVED***

        setInitialPosition: function() {
          module.debug('Returning to initial position');
          module.unfix();
          module.unbind();
 ***REMOVED*****REMOVED***


        fixTop: function() {
          module.debug('Fixing element to top of page');
          if(settings.setSize) {
            module.set.size();
        ***REMOVED***
          module.set.minimumSize();
          module.set.offset();
          $module
            .css({
              left         : module.cache.element.left,
              bottom       : '',
              marginBottom : ''
          ***REMOVED***)
            .removeClass(className.bound)
            .removeClass(className.bottom)
            .addClass(className.fixed)
            .addClass(className.top)
          ;
          settings.onStick.call(element);
 ***REMOVED*****REMOVED***

        fixBottom: function() {
          module.debug('Sticking element to bottom of page');
          if(settings.setSize) {
            module.set.size();
        ***REMOVED***
          module.set.minimumSize();
          module.set.offset();
          $module
            .css({
              left         : module.cache.element.left,
              bottom       : '',
              marginBottom : ''
          ***REMOVED***)
            .removeClass(className.bound)
            .removeClass(className.top)
            .addClass(className.fixed)
            .addClass(className.bottom)
          ;
          settings.onStick.call(element);
 ***REMOVED*****REMOVED***

        unbind: function() {
          if( module.is.bound() ) {
            module.debug('Removing container bound position on element');
            module.remove.offset();
            $module
              .removeClass(className.bound)
              .removeClass(className.top)
              .removeClass(className.bottom)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        unfix: function() {
          if( module.is.fixed() ) {
            module.debug('Removing fixed position on element');
            module.remove.minimumSize();
            module.remove.offset();
            $module
              .removeClass(className.fixed)
              .removeClass(className.top)
              .removeClass(className.bottom)
            ;
            settings.onUnstick.call(element);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        reset: function() {
          module.debug('Resetting elements position');
          module.unbind();
          module.unfix();
          module.resetCSS();
          module.remove.offset();
          module.remove.lastScroll();
 ***REMOVED*****REMOVED***

        resetCSS: function() {
          $module
            .css({
              width  : '',
              height : ''
          ***REMOVED***)
          ;
          $container
            .css({
              height: ''
          ***REMOVED***)
          ;
 ***REMOVED*****REMOVED***

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
            module.performance.timer = setTimeout(module.performance.display, 0);
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

$.fn.sticky.settings = {

  name           : 'Sticky',
  namespace      : 'sticky',

  silent         : false,
  debug          : false,
  verbose        : true,
  performance    : true,

  // whether to stick in the opposite direction on scroll up
  pushing        : false,

  context        : false,
  container      : false,

  // Context to watch scroll events
  scrollContext  : window,

  // Offset to adjust scroll
  offset         : 0,

  // Offset to adjust scroll when attached to bottom of screen
  bottomOffset   : 0,

  // will only set container height if difference between context and container is larger than this number
  jitter         : 5,

  // set width of sticky element when it is fixed to page (used to make sure 100% width is maintained if no fixed size set)
  setSize        : true,

  // Whether to automatically observe changes with Mutation Observers
  observeChanges : false,

  // Called when position is recalculated
  onReposition   : function(){***REMOVED***,

  // Called on each scroll
  onScroll       : function(){***REMOVED***,

  // Called when element is stuck to viewport
  onStick        : function(){***REMOVED***,

  // Called when element is unstuck from viewport
  onUnstick      : function(){***REMOVED***,

  // Called when element reaches top of context
  onTop          : function(){***REMOVED***,

  // Called when element reaches bottom of context
  onBottom       : function(){***REMOVED***,

  error         : {
    container      : 'Sticky element must be inside a relative container',
    visible        : 'Element is hidden, you must call refresh after element becomes visible. Use silent setting to surpress this warning in production.',
    method         : 'The method you called is not defined.',
    invalidContext : 'Context specified does not exist',
    elementSize    : 'Sticky element is larger than its container, cannot create sticky.'
***REMOVED***

  className : {
    bound     : 'bound',
    fixed     : 'fixed',
    supported : 'native',
    top       : 'top',
    bottom    : 'bottom'
***REMOVED***

***REMOVED***;

***REMOVED***)( jQuery, window, document );
