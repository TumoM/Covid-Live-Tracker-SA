/*!
***REMOVED*** # Fomantic-UI - Visibility
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

$.fn.visibility = function(parameters) {
  var
    $allModules    = $(this),
    moduleSelector = $allModules.selector || '',

    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),
    returnedValue,

    moduleCount    = $allModules.length,
    loadedCount    = 0
  ;

  $allModules
    .each(function() {
      var
        settings        = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.visibility.settings, parameters)
          : $.extend({***REMOVED***, $.fn.visibility.settings),

        className       = settings.className,
        namespace       = settings.namespace,
        error           = settings.error,
        metadata        = settings.metadata,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $window         = $(window),

        $module         = $(this),
        $context        = $(settings.context),

        $placeholder,

        instance        = $module.data(moduleNamespace),

        requestAnimationFrame = window.requestAnimationFrame
          || window.mozRequestAnimationFrame
          || window.webkitRequestAnimationFrame
          || window.msRequestAnimationFrame
          || function(callback) { setTimeout(callback, 0); ***REMOVED***,

        element         = this,
        disabled        = false,

        contextObserver,
        observer,
        module
      ;

      module = {

        initialize: function() {
          module.debug('Initializing', settings);

          module.setup.cache();

          if( module.should.trackChanges() ) {

            if(settings.type == 'image') {
              module.setup.image();
          ***REMOVED***
            if(settings.type == 'fixed') {
              module.setup.fixed();
          ***REMOVED***

            if(settings.observeChanges) {
              module.observeChanges();
          ***REMOVED***
            module.bind.events();
        ***REMOVED***

          module.save.position();
          if( !module.is.visible() ) {
            module.error(error.visible, $module);
        ***REMOVED***

          if(settings.initialCheck) {
            module.checkVisibility();
        ***REMOVED***
          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.debug('Storing instance', module);
          $module
            .data(moduleNamespace, module)
          ;
          instance = module;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.verbose('Destroying previous module');
          if(observer) {
            observer.disconnect();
        ***REMOVED***
          if(contextObserver) {
            contextObserver.disconnect();
        ***REMOVED***
          $window
            .off('load'   + eventNamespace, module.event.load)
            .off('resize' + eventNamespace, module.event.resize)
          ;
          $context
            .off('scroll'       + eventNamespace, module.event.scroll)
            .off('scrollchange' + eventNamespace, module.event.scrollchange)
          ;
          if(settings.type == 'fixed') {
            module.resetFixed();
            module.remove.placeholder();
        ***REMOVED***
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
 ***REMOVED*****REMOVED***

        observeChanges: function() {
          if('MutationObserver' in window) {
            contextObserver = new MutationObserver(module.event.contextChanged);
            observer        = new MutationObserver(module.event.changed);
            contextObserver.observe(document, {
              childList : true,
              subtree   : true
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
            module.verbose('Binding visibility events to scroll and resize');
            if(settings.refreshOnLoad) {
              $window
                .on('load'   + eventNamespace, module.event.load)
              ;
          ***REMOVED***
            $window
              .on('resize' + eventNamespace, module.event.resize)
            ;
            // pub/sub pattern
            $context
              .off('scroll'      + eventNamespace)
              .on('scroll'       + eventNamespace, module.event.scroll)
              .on('scrollchange' + eventNamespace, module.event.scrollchange)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          changed: function(mutations) {
            module.verbose('DOM tree modified, updating visibility calculations');
            module.timer = setTimeout(function() {
              module.verbose('DOM tree modified, updating sticky menu');
              module.refresh();
***REMOVED*****REMOVED*****REMOVED*** 100);
   ***REMOVED*****REMOVED***
          contextChanged: function(mutations) {
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
          resize: function() {
            module.debug('Window resized');
            if(settings.refreshOnResize) {
              requestAnimationFrame(module.refresh);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          load: function() {
            module.debug('Page finished loading');
            requestAnimationFrame(module.refresh);
   ***REMOVED*****REMOVED***
          // publishes scrollchange event on one scroll
          scroll: function() {
            if(settings.throttle) {
              clearTimeout(module.timer);
              module.timer = setTimeout(function() {
                $context.triggerHandler('scrollchange' + eventNamespace, [ $context.scrollTop() ]);
  ***REMOVED*****REMOVED*****REMOVED*** settings.throttle);
          ***REMOVED***
            else {
              requestAnimationFrame(function() {
                $context.triggerHandler('scrollchange' + eventNamespace, [ $context.scrollTop() ]);
            ***REMOVED***);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          // subscribes to scrollchange
          scrollchange: function(event, scrollPosition) {
            module.checkVisibility(scrollPosition);
   ***REMOVED*****REMOVED***
 ***REMOVED*****REMOVED***

        precache: function(images, callback) {
          if (!(images instanceof Array)) {
            images = [images];
        ***REMOVED***
          var
            imagesLength  = images.length,
            loadedCounter = 0,
            cache         = [],
            cacheImage    = document.createElement('img'),
            handleLoad    = function() {
              loadedCounter++;
              if (loadedCounter >= images.length) {
                if ($.isFunction(callback)) {
                  callback();
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
          ;
          while (imagesLength--) {
            cacheImage         = document.createElement('img');
            cacheImage.onload  = handleLoad;
            cacheImage.onerror = handleLoad;
            cacheImage.src     = images[imagesLength];
            cache.push(cacheImage);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        enableCallbacks: function() {
          module.debug('Allowing callbacks to occur');
          disabled = false;
 ***REMOVED*****REMOVED***

        disableCallbacks: function() {
          module.debug('Disabling all callbacks temporarily');
          disabled = true;
 ***REMOVED*****REMOVED***

        should: {
          trackChanges: function() {
            if(methodInvoked) {
              module.debug('One time query, no need to bind events');
              return false;
          ***REMOVED***
            module.debug('Callbacks being attached');
            return true;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        setup: {
          cache: function() {
            module.cache = {
              occurred : {***REMOVED***,
              screen   : {***REMOVED***,
              element  : {***REMOVED***,
          ***REMOVED***;
   ***REMOVED*****REMOVED***
          image: function() {
            var
              src = $module.data(metadata.src)
            ;
            if(src) {
              module.verbose('Lazy loading image', src);
              settings.once           = true;
              settings.observeChanges = false;

              // show when top visible
              settings.onOnScreen = function() {
                module.debug('Image on screen', element);
                module.precache(src, function() {
                  module.set.image(src, function() {
                    loadedCount++;
                    if(loadedCount == moduleCount) {
                      settings.onAllLoaded.call(this);
                  ***REMOVED***
                    settings.onLoad.call(this);
                ***REMOVED***);
              ***REMOVED***);
            ***REMOVED***;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          fixed: function() {
            module.debug('Setting up fixed');
            settings.once           = false;
            settings.observeChanges = false;
            settings.initialCheck   = true;
            settings.refreshOnLoad  = true;
            if(!parameters.transition) {
              settings.transition = false;
          ***REMOVED***
            module.create.placeholder();
            module.debug('Added placeholder', $placeholder);
            settings.onTopPassed = function() {
              module.debug('Element passed, adding fixed position', $module);
              module.show.placeholder();
              module.set.fixed();
              if(settings.transition) {
                if($.fn.transition !== undefined) {
                  $module.transition(settings.transition, settings.duration);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***;
            settings.onTopPassedReverse = function() {
              module.debug('Element returned to position, removing fixed', $module);
              module.hide.placeholder();
              module.remove.fixed();
          ***REMOVED***;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        create: {
          placeholder: function() {
            module.verbose('Creating fixed position placeholder');
            $placeholder = $module
              .clone(false)
              .css('display', 'none')
              .addClass(className.placeholder)
              .insertAfter($module)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        show: {
          placeholder: function() {
            module.verbose('Showing placeholder');
            $placeholder
              .css('display', 'block')
              .css('visibility', 'hidden')
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***
        hide: {
          placeholder: function() {
            module.verbose('Hiding placeholder');
            $placeholder
              .css('display', 'none')
              .css('visibility', '')
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          fixed: function() {
            module.verbose('Setting element to fixed position');
            $module
              .addClass(className.fixed)
              .css({
                position : 'fixed',
                top      : settings.offset + 'px',
                left     : 'auto',
                zIndex   : settings.zIndex
            ***REMOVED***)
            ;
            settings.onFixed.call(element);
   ***REMOVED*****REMOVED***
          image: function(src, callback) {
            $module
              .attr('src', src)
            ;
            if(settings.transition) {
              if( $.fn.transition !== undefined) {
                if($module.hasClass(className.visible)) {
                  module.debug('Transition already occurred on this image, skipping animation');
                  return;
              ***REMOVED***
                $module.transition(settings.transition, settings.duration, callback);
            ***REMOVED***
              else {
                $module.fadeIn(settings.duration, callback);
            ***REMOVED***
          ***REMOVED***
            else {
              $module.show();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          onScreen: function() {
            var
              calculations   = module.get.elementCalculations()
            ;
            return calculations.onScreen;
   ***REMOVED*****REMOVED***
          offScreen: function() {
            var
              calculations   = module.get.elementCalculations()
            ;
            return calculations.offScreen;
   ***REMOVED*****REMOVED***
          visible: function() {
            if(module.cache && module.cache.element) {
              return !(module.cache.element.width === 0 && module.cache.element.offset.top === 0);
          ***REMOVED***
            return false;
   ***REMOVED*****REMOVED***
          verticallyScrollableContext: function() {
            var
              overflowY = ($context.get(0) !== window)
                ? $context.css('overflow-y')
                : false
            ;
            return (overflowY == 'auto' || overflowY == 'scroll');
   ***REMOVED*****REMOVED***
          horizontallyScrollableContext: function() {
            var
              overflowX = ($context.get(0) !== window)
                ? $context.css('overflow-x')
                : false
            ;
            return (overflowX == 'auto' || overflowX == 'scroll');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        refresh: function() {
          module.debug('Refreshing constants (width/height)');
          if(settings.type == 'fixed') {
            module.resetFixed();
        ***REMOVED***
          module.reset();
          module.save.position();
          if(settings.checkOnRefresh) {
            module.checkVisibility();
        ***REMOVED***
          settings.onRefresh.call(element);
 ***REMOVED*****REMOVED***

        resetFixed: function () {
          module.remove.fixed();
          module.remove.occurred();
 ***REMOVED*****REMOVED***

        reset: function() {
          module.verbose('Resetting all cached values');
          if( $.isPlainObject(module.cache) ) {
            module.cache.screen = {***REMOVED***;
            module.cache.element = {***REMOVED***;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        checkVisibility: function(scroll) {
          module.verbose('Checking visibility of element', module.cache.element);

          if( !disabled && module.is.visible() ) {

            // save scroll position
            module.save.scroll(scroll);

            // update calculations derived from scroll
            module.save.calculations();

            // percentage
            module.passed();

            // reverse (must be first)
            module.passingReverse();
            module.topVisibleReverse();
            module.bottomVisibleReverse();
            module.topPassedReverse();
            module.bottomPassedReverse();

            // one time
            module.onScreen();
            module.offScreen();
            module.passing();
            module.topVisible();
            module.bottomVisible();
            module.topPassed();
            module.bottomPassed();

            // on update callback
            if(settings.onUpdate) {
              settings.onUpdate.call(element, module.get.elementCalculations());
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        passed: function(amount, newCallback) {
          var
            calculations   = module.get.elementCalculations()
          ;
          // assign callback
          if(amount && newCallback) {
            settings.onPassed[amount] = newCallback;
        ***REMOVED***
          else if(amount !== undefined) {
            return (module.get.pixelsPassed(amount) > calculations.pixelsPassed);
        ***REMOVED***
          else if(calculations.passing) {
            $.each(settings.onPassed, function(amount, callback) {
              if(calculations.bottomVisible || calculations.pixelsPassed > module.get.pixelsPassed(amount)) {
                module.execute(callback, amount);
            ***REMOVED***
              else if(!settings.once) {
                module.remove.occurred(callback);
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        onScreen: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onOnScreen,
            callbackName = 'onScreen'
          ;
          if(newCallback) {
            module.debug('Adding callback for onScreen', newCallback);
            settings.onOnScreen = newCallback;
        ***REMOVED***
          if(calculations.onScreen) {
            module.execute(callback, callbackName);
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback !== undefined) {
            return calculations.onOnScreen;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        offScreen: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onOffScreen,
            callbackName = 'offScreen'
          ;
          if(newCallback) {
            module.debug('Adding callback for offScreen', newCallback);
            settings.onOffScreen = newCallback;
        ***REMOVED***
          if(calculations.offScreen) {
            module.execute(callback, callbackName);
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback !== undefined) {
            return calculations.onOffScreen;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        passing: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onPassing,
            callbackName = 'passing'
          ;
          if(newCallback) {
            module.debug('Adding callback for passing', newCallback);
            settings.onPassing = newCallback;
        ***REMOVED***
          if(calculations.passing) {
            module.execute(callback, callbackName);
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback !== undefined) {
            return calculations.passing;
        ***REMOVED***
 ***REMOVED*****REMOVED***


        topVisible: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onTopVisible,
            callbackName = 'topVisible'
          ;
          if(newCallback) {
            module.debug('Adding callback for top visible', newCallback);
            settings.onTopVisible = newCallback;
        ***REMOVED***
          if(calculations.topVisible) {
            module.execute(callback, callbackName);
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback === undefined) {
            return calculations.topVisible;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bottomVisible: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onBottomVisible,
            callbackName = 'bottomVisible'
          ;
          if(newCallback) {
            module.debug('Adding callback for bottom visible', newCallback);
            settings.onBottomVisible = newCallback;
        ***REMOVED***
          if(calculations.bottomVisible) {
            module.execute(callback, callbackName);
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback === undefined) {
            return calculations.bottomVisible;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        topPassed: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onTopPassed,
            callbackName = 'topPassed'
          ;
          if(newCallback) {
            module.debug('Adding callback for top passed', newCallback);
            settings.onTopPassed = newCallback;
        ***REMOVED***
          if(calculations.topPassed) {
            module.execute(callback, callbackName);
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback === undefined) {
            return calculations.topPassed;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bottomPassed: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onBottomPassed,
            callbackName = 'bottomPassed'
          ;
          if(newCallback) {
            module.debug('Adding callback for bottom passed', newCallback);
            settings.onBottomPassed = newCallback;
        ***REMOVED***
          if(calculations.bottomPassed) {
            module.execute(callback, callbackName);
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback === undefined) {
            return calculations.bottomPassed;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        passingReverse: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onPassingReverse,
            callbackName = 'passingReverse'
          ;
          if(newCallback) {
            module.debug('Adding callback for passing reverse', newCallback);
            settings.onPassingReverse = newCallback;
        ***REMOVED***
          if(!calculations.passing) {
            if(module.get.occurred('passing')) {
              module.execute(callback, callbackName);
          ***REMOVED***
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback !== undefined) {
            return !calculations.passing;
        ***REMOVED***
 ***REMOVED*****REMOVED***


        topVisibleReverse: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onTopVisibleReverse,
            callbackName = 'topVisibleReverse'
          ;
          if(newCallback) {
            module.debug('Adding callback for top visible reverse', newCallback);
            settings.onTopVisibleReverse = newCallback;
        ***REMOVED***
          if(!calculations.topVisible) {
            if(module.get.occurred('topVisible')) {
              module.execute(callback, callbackName);
          ***REMOVED***
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback === undefined) {
            return !calculations.topVisible;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bottomVisibleReverse: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onBottomVisibleReverse,
            callbackName = 'bottomVisibleReverse'
          ;
          if(newCallback) {
            module.debug('Adding callback for bottom visible reverse', newCallback);
            settings.onBottomVisibleReverse = newCallback;
        ***REMOVED***
          if(!calculations.bottomVisible) {
            if(module.get.occurred('bottomVisible')) {
              module.execute(callback, callbackName);
          ***REMOVED***
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback === undefined) {
            return !calculations.bottomVisible;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        topPassedReverse: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onTopPassedReverse,
            callbackName = 'topPassedReverse'
          ;
          if(newCallback) {
            module.debug('Adding callback for top passed reverse', newCallback);
            settings.onTopPassedReverse = newCallback;
        ***REMOVED***
          if(!calculations.topPassed) {
            if(module.get.occurred('topPassed')) {
              module.execute(callback, callbackName);
          ***REMOVED***
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback === undefined) {
            return !calculations.onTopPassed;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bottomPassedReverse: function(newCallback) {
          var
            calculations = module.get.elementCalculations(),
            callback     = newCallback || settings.onBottomPassedReverse,
            callbackName = 'bottomPassedReverse'
          ;
          if(newCallback) {
            module.debug('Adding callback for bottom passed reverse', newCallback);
            settings.onBottomPassedReverse = newCallback;
        ***REMOVED***
          if(!calculations.bottomPassed) {
            if(module.get.occurred('bottomPassed')) {
              module.execute(callback, callbackName);
          ***REMOVED***
        ***REMOVED***
          else if(!settings.once) {
            module.remove.occurred(callbackName);
        ***REMOVED***
          if(newCallback === undefined) {
            return !calculations.bottomPassed;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        execute: function(callback, callbackName) {
          var
            calculations = module.get.elementCalculations(),
            screen       = module.get.screenCalculations()
          ;
          callback = callback || false;
          if(callback) {
            if(settings.continuous) {
              module.debug('Callback being called continuously', callbackName, calculations);
              callback.call(element, calculations, screen);
          ***REMOVED***
            else if(!module.get.occurred(callbackName)) {
              module.debug('Conditions met', callbackName, calculations);
              callback.call(element, calculations, screen);
          ***REMOVED***
        ***REMOVED***
          module.save.occurred(callbackName);
 ***REMOVED*****REMOVED***

        remove: {
          fixed: function() {
            module.debug('Removing fixed position');
            $module
              .removeClass(className.fixed)
              .css({
                position : '',
                top      : '',
                left     : '',
                zIndex   : ''
            ***REMOVED***)
            ;
            settings.onUnfixed.call(element);
   ***REMOVED*****REMOVED***
          placeholder: function() {
            module.debug('Removing placeholder content');
            if($placeholder) {
              $placeholder.remove();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          occurred: function(callback) {
            if(callback) {
              var
                occurred = module.cache.occurred
              ;
              if(occurred[callback] !== undefined && occurred[callback] === true) {
                module.debug('Callback can now be called again', callback);
                module.cache.occurred[callback] = false;
            ***REMOVED***
          ***REMOVED***
            else {
              module.cache.occurred = {***REMOVED***;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        save: {
          calculations: function() {
            module.verbose('Saving all calculations necessary to determine positioning');
            module.save.direction();
            module.save.screenCalculations();
            module.save.elementCalculations();
   ***REMOVED*****REMOVED***
          occurred: function(callback) {
            if(callback) {
              if(module.cache.occurred[callback] === undefined || (module.cache.occurred[callback] !== true)) {
                module.verbose('Saving callback occurred', callback);
                module.cache.occurred[callback] = true;
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          scroll: function(scrollPosition) {
            scrollPosition      = scrollPosition + settings.offset || $context.scrollTop() + settings.offset;
            module.cache.scroll = scrollPosition;
   ***REMOVED*****REMOVED***
          direction: function() {
            var
              scroll     = module.get.scroll(),
              lastScroll = module.get.lastScroll(),
              direction
            ;
            if(scroll > lastScroll && lastScroll) {
              direction = 'down';
          ***REMOVED***
            else if(scroll < lastScroll && lastScroll) {
              direction = 'up';
          ***REMOVED***
            else {
              direction = 'static';
          ***REMOVED***
            module.cache.direction = direction;
            return module.cache.direction;
   ***REMOVED*****REMOVED***
          elementPosition: function() {
            var
              element = module.cache.element,
              screen  = module.get.screenSize()
            ;
            module.verbose('Saving element position');
            // (quicker than $.extend)
            element.fits          = (element.height < screen.height);
            element.offset        = $module.offset();
            element.width         = $module.outerWidth();
            element.height        = $module.outerHeight();
            // compensate for scroll in context
            if(module.is.verticallyScrollableContext()) {
              element.offset.top += $context.scrollTop() - $context.offset().top;
          ***REMOVED***
            if(module.is.horizontallyScrollableContext()) {
              element.offset.left += $context.scrollLeft - $context.offset().left;
          ***REMOVED***
            // store
            module.cache.element = element;
            return element;
   ***REMOVED*****REMOVED***
          elementCalculations: function() {
            var
              screen     = module.get.screenCalculations(),
              element    = module.get.elementPosition()
            ;
            // offset
            if(settings.includeMargin) {
              element.margin        = {***REMOVED***;
              element.margin.top    = parseInt($module.css('margin-top'), 10);
              element.margin.bottom = parseInt($module.css('margin-bottom'), 10);
              element.top    = element.offset.top - element.margin.top;
              element.bottom = element.offset.top + element.height + element.margin.bottom;
          ***REMOVED***
            else {
              element.top    = element.offset.top;
              element.bottom = element.offset.top + element.height;
          ***REMOVED***

            // visibility
            element.topPassed        = (screen.top >= element.top);
            element.bottomPassed     = (screen.top >= element.bottom);
            element.topVisible       = (screen.bottom >= element.top) && !element.topPassed;
            element.bottomVisible    = (screen.bottom >= element.bottom) && !element.bottomPassed;
            element.pixelsPassed     = 0;
            element.percentagePassed = 0;

            // meta calculations
            element.onScreen  = ((element.topVisible || element.passing) && !element.bottomPassed);
            element.passing   = (element.topPassed && !element.bottomPassed);
            element.offScreen = (!element.onScreen);

            // passing calculations
            if(element.passing) {
              element.pixelsPassed     = (screen.top - element.top);
              element.percentagePassed = (screen.top - element.top) / element.height;
          ***REMOVED***
            module.cache.element = element;
            module.verbose('Updated element calculations', element);
            return element;
   ***REMOVED*****REMOVED***
          screenCalculations: function() {
            var
              scroll = module.get.scroll()
            ;
            module.save.direction();
            module.cache.screen.top    = scroll;
            module.cache.screen.bottom = scroll + module.cache.screen.height;
            return module.cache.screen;
   ***REMOVED*****REMOVED***
          screenSize: function() {
            module.verbose('Saving window position');
            module.cache.screen = {
              height: $context.height()
          ***REMOVED***;
   ***REMOVED*****REMOVED***
          position: function() {
            module.save.screenSize();
            module.save.elementPosition();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          pixelsPassed: function(amount) {
            var
              element = module.get.elementCalculations()
            ;
            if(amount.search('%') > -1) {
              return ( element.height***REMOVED*** (parseInt(amount, 10) / 100) );
          ***REMOVED***
            return parseInt(amount, 10);
   ***REMOVED*****REMOVED***
          occurred: function(callback) {
            return (module.cache.occurred !== undefined)
              ? module.cache.occurred[callback] || false
              : false
            ;
   ***REMOVED*****REMOVED***
          direction: function() {
            if(module.cache.direction === undefined) {
              module.save.direction();
          ***REMOVED***
            return module.cache.direction;
   ***REMOVED*****REMOVED***
          elementPosition: function() {
            if(module.cache.element === undefined) {
              module.save.elementPosition();
          ***REMOVED***
            return module.cache.element;
   ***REMOVED*****REMOVED***
          elementCalculations: function() {
            if(module.cache.element === undefined) {
              module.save.elementCalculations();
          ***REMOVED***
            return module.cache.element;
   ***REMOVED*****REMOVED***
          screenCalculations: function() {
            if(module.cache.screen === undefined) {
              module.save.screenCalculations();
          ***REMOVED***
            return module.cache.screen;
   ***REMOVED*****REMOVED***
          screenSize: function() {
            if(module.cache.screen === undefined) {
              module.save.screenSize();
          ***REMOVED***
            return module.cache.screen;
   ***REMOVED*****REMOVED***
          scroll: function() {
            if(module.cache.scroll === undefined) {
              module.save.scroll();
          ***REMOVED***
            return module.cache.scroll;
   ***REMOVED*****REMOVED***
          lastScroll: function() {
            if(module.cache.screen === undefined) {
              module.debug('First scroll event, no last scroll could be found');
              return false;
          ***REMOVED***
            return module.cache.screen.top;
        ***REMOVED***
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
        instance.save.scroll();
        instance.save.calculations();
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

$.fn.visibility.settings = {

  name                   : 'Visibility',
  namespace              : 'visibility',

  debug                  : false,
  verbose                : false,
  performance            : true,

  // whether to use mutation observers to follow changes
  observeChanges         : true,

  // check position immediately on init
  initialCheck           : true,

  // whether to refresh calculations after all page images load
  refreshOnLoad          : true,

  // whether to refresh calculations after page resize event
  refreshOnResize        : true,

  // should call callbacks on refresh event (resize, etc)
  checkOnRefresh         : true,

  // callback should only occur one time
  once                   : true,

  // callback should fire continuously whe evaluates to true
  continuous             : false,

  // offset to use with scroll top
  offset                 : 0,

  // whether to include margin in elements position
  includeMargin          : false,

  // scroll context for visibility checks
  context                : window,

  // visibility check delay in ms (defaults to animationFrame)
  throttle               : false,

  // special visibility type (image, fixed)
  type                   : false,

  // z-index to use with visibility 'fixed'
  zIndex                 : '10',

  // image only animation settings
  transition             : 'fade in',
  duration               : 1000,

  // array of callbacks for percentage
  onPassed               : {***REMOVED***,

  // standard callbacks
  onOnScreen             : false,
  onOffScreen            : false,
  onPassing              : false,
  onTopVisible           : false,
  onBottomVisible        : false,
  onTopPassed            : false,
  onBottomPassed         : false,

  // reverse callbacks
  onPassingReverse       : false,
  onTopVisibleReverse    : false,
  onBottomVisibleReverse : false,
  onTopPassedReverse     : false,
  onBottomPassedReverse  : false,

  // special callbacks for image
  onLoad                 : function() {***REMOVED***,
  onAllLoaded            : function() {***REMOVED***,

  // special callbacks for fixed position
  onFixed                : function() {***REMOVED***,
  onUnfixed              : function() {***REMOVED***,

  // utility callbacks
  onUpdate               : false, // disabled by default for performance
  onRefresh              : function(){***REMOVED***,

  metadata : {
    src: 'src'
***REMOVED***

  className: {
    fixed       : 'fixed',
    placeholder : 'constraint',
    visible     : 'visible'
***REMOVED***

  error : {
    method  : 'The method you called is not defined.',
    visible : 'Element is hidden, you must call refresh after element becomes visible'
***REMOVED***

***REMOVED***;

***REMOVED***)( jQuery, window, document );
