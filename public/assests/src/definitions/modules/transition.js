/*!
***REMOVED*** # Fomantic-UI - Transition
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

$.fn.transition = function() {
  var
    $allModules     = $(this),
    moduleSelector  = $allModules.selector || '',

    time            = new Date().getTime(),
    performance     = [],

    moduleArguments = arguments,
    query           = moduleArguments[0],
    queryArguments  = [].slice.call(arguments, 1),
    methodInvoked   = (typeof query === 'string'),

    returnedValue
  ;
  $allModules
    .each(function(index) {
      var
        $module  = $(this),
        element  = this,

        // set at run time
        settings,
        instance,

        error,
        className,
        metadata,
        animationEnd,

        moduleNamespace,
        eventNamespace,
        module
      ;

      module = {

        initialize: function() {

          // get full settings
          settings        = module.get.settings.apply(element, moduleArguments);

          // shorthand
          className       = settings.className;
          error           = settings.error;
          metadata        = settings.metadata;

          // define namespace
          eventNamespace  = '.' + settings.namespace;
          moduleNamespace = 'module-' + settings.namespace;
          instance        = $module.data(moduleNamespace) || module;

          // get vendor specific events
          animationEnd    = module.get.animationEndEvent();

          if(methodInvoked) {
            methodInvoked = module.invoke(query);
        ***REMOVED***

          // method not invoked, lets run an animation
          if(methodInvoked === false) {
            module.verbose('Converted arguments into settings object', settings);
            if(settings.interval) {
              module.delay(settings.animate);
          ***REMOVED***
            else  {
              module.animate();
          ***REMOVED***
            module.instantiate();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, instance)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.verbose('Destroying previous module for', element);
          $module
            .removeData(moduleNamespace)
          ;
 ***REMOVED*****REMOVED***

        refresh: function() {
          module.verbose('Refreshing display type on next animation');
          delete module.displayType;
 ***REMOVED*****REMOVED***

        forceRepaint: function() {
          module.verbose('Forcing element repaint');
          var
            $parentElement = $module.parent(),
            $nextElement = $module.next()
          ;
          if($nextElement.length === 0) {
            $module.detach().appendTo($parentElement);
        ***REMOVED***
          else {
            $module.detach().insertBefore($nextElement);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        repaint: function() {
          module.verbose('Repainting element');
          var
            fakeAssignment = element.offsetWidth
          ;
 ***REMOVED*****REMOVED***

        delay: function(interval) {
          var
            direction = module.get.animationDirection(),
            shouldReverse,
            delay
          ;
          if(!direction) {
            direction = module.can.transition()
              ? module.get.direction()
              : 'static'
            ;
        ***REMOVED***
          interval = (interval !== undefined)
            ? interval
            : settings.interval
          ;
          shouldReverse = (settings.reverse == 'auto' && direction == className.outward);
          delay = (shouldReverse || settings.reverse == true)
            ? ($allModules.length - index)***REMOVED*** settings.interval
            : index***REMOVED*** settings.interval
          ;
          module.debug('Delaying animation by', delay);
          setTimeout(module.animate, delay);
 ***REMOVED*****REMOVED***

        animate: function(overrideSettings) {
          settings = overrideSettings || settings;
          if(!module.is.supported()) {
            module.error(error.support);
            return false;
        ***REMOVED***
          module.debug('Preparing animation', settings.animation);
          if(module.is.animating()) {
            if(settings.queue) {
              if(!settings.allowRepeats && module.has.direction() && module.is.occurring() && module.queuing !== true) {
                module.debug('Animation is currently occurring, preventing queueing same animation', settings.animation);
            ***REMOVED***
              else {
                module.queue(settings.animation);
            ***REMOVED***
              return false;
          ***REMOVED***
            else if(!settings.allowRepeats && module.is.occurring()) {
              module.debug('Animation is already occurring, will not execute repeated animation', settings.animation);
              return false;
          ***REMOVED***
            else {
              module.debug('New animation started, completing previous early', settings.animation);
              instance.complete();
          ***REMOVED***
        ***REMOVED***
          if( module.can.animate() ) {
            module.set.animating(settings.animation);
        ***REMOVED***
          else {
            module.error(error.noAnimation, settings.animation, element);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        reset: function() {
          module.debug('Resetting animation to beginning conditions');
          module.remove.animationCallbacks();
          module.restore.conditions();
          module.remove.animating();
 ***REMOVED*****REMOVED***

        queue: function(animation) {
          module.debug('Queueing animation of', animation);
          module.queuing = true;
          $module
            .one(animationEnd + '.queue' + eventNamespace, function() {
              module.queuing = false;
              module.repaint();
              module.animate.apply(this, settings);
          ***REMOVED***)
          ;
 ***REMOVED*****REMOVED***

        complete: function (event) {
          if(event && event.target === element) {
              event.stopPropagation();
        ***REMOVED***
          module.debug('Animation complete', settings.animation);
          module.remove.completeCallback();
          module.remove.failSafe();
          if(!module.is.looping()) {
            if( module.is.outward() ) {
              module.verbose('Animation is outward, hiding element');
              module.restore.conditions();
              module.hide();
          ***REMOVED***
            else if( module.is.inward() ) {
              module.verbose('Animation is outward, showing element');
              module.restore.conditions();
              module.show();
          ***REMOVED***
            else {
              module.verbose('Static animation completed');
              module.restore.conditions();
              settings.onComplete.call(element);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        force: {
          visible: function() {
            var
              style          = $module.attr('style'),
              userStyle      = module.get.userStyle(style),
              displayType    = module.get.displayType(),
              overrideStyle  = userStyle + 'display: ' + displayType + ' !important;',
              inlineDisplay  = $module[0].style.display,
              mustStayHidden = !displayType || (inlineDisplay === 'none' && settings.skipInlineHidden) || $module[0].tagName.match(/(script|link|style)/i)
            ;
            if (mustStayHidden){
              module.remove.transition();
              return false;
          ***REMOVED***
            module.verbose('Overriding default display to show element', displayType);
            $module
              .attr('style', overrideStyle)
            ;
            return true;
   ***REMOVED*****REMOVED***
          hidden: function() {
            var
              style          = $module.attr('style'),
              currentDisplay = $module.css('display'),
              emptyStyle     = (style === undefined || style === '')
            ;
            if(currentDisplay !== 'none' && !module.is.hidden()) {
              module.verbose('Overriding default display to hide element');
              $module
                .css('display', 'none')
              ;
          ***REMOVED***
            else if(emptyStyle) {
              $module
                .removeAttr('style')
              ;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        has: {
          direction: function(animation) {
            var
              hasDirection = false
            ;
            animation = animation || settings.animation;
            if(typeof animation === 'string') {
              animation = animation.split(' ');
              $.each(animation, function(index, word){
                if(word === className.inward || word === className.outward) {
                  hasDirection = true;
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***
            return hasDirection;
   ***REMOVED*****REMOVED***
          inlineDisplay: function() {
            var
              style = $module.attr('style') || ''
            ;
            return Array.isArray(style.match(/display.*?;/, ''));
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          animating: function(animation) {
            // remove previous callbacks
            module.remove.completeCallback();

            // determine exact animation
            animation = animation || settings.animation;
            var animationClass = module.get.animationClass(animation);

              // save animation class in cache to restore class names
            module.save.animation(animationClass);

            if(module.force.visible()) {
              module.remove.hidden();
              module.remove.direction();

              module.start.animation(animationClass);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          duration: function(animationName, duration) {
            duration = duration || settings.duration;
            duration = (typeof duration == 'number')
              ? duration + 'ms'
              : duration
            ;
            if(duration || duration === 0) {
              module.verbose('Setting animation duration', duration);
              $module
                .css({
                  'animation-duration':  duration
              ***REMOVED***)
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          direction: function(direction) {
            direction = direction || module.get.direction();
            if(direction == className.inward) {
              module.set.inward();
          ***REMOVED***
            else {
              module.set.outward();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          looping: function() {
            module.debug('Transition set to loop');
            $module
              .addClass(className.looping)
            ;
   ***REMOVED*****REMOVED***
          hidden: function() {
            $module
              .addClass(className.transition)
              .addClass(className.hidden)
            ;
   ***REMOVED*****REMOVED***
          inward: function() {
            module.debug('Setting direction to inward');
            $module
              .removeClass(className.outward)
              .addClass(className.inward)
            ;
   ***REMOVED*****REMOVED***
          outward: function() {
            module.debug('Setting direction to outward');
            $module
              .removeClass(className.inward)
              .addClass(className.outward)
            ;
   ***REMOVED*****REMOVED***
          visible: function() {
            $module
              .addClass(className.transition)
              .addClass(className.visible)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        start: {
          animation: function(animationClass) {
            animationClass = animationClass || module.get.animationClass();
            module.debug('Starting tween', animationClass);
            $module
              .addClass(animationClass)
              .one(animationEnd + '.complete' + eventNamespace, module.complete)
            ;
            if(settings.useFailSafe) {
              module.add.failSafe();
          ***REMOVED***
            module.set.duration(settings.duration);
            settings.onStart.call(element);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        save: {
          animation: function(animation) {
            if(!module.cache) {
              module.cache = {***REMOVED***;
          ***REMOVED***
            module.cache.animation = animation;
   ***REMOVED*****REMOVED***
          displayType: function(displayType) {
            if(displayType !== 'none') {
              $module.data(metadata.displayType, displayType);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          transitionExists: function(animation, exists) {
            $.fn.transition.exists[animation] = exists;
            module.verbose('Saving existence of transition', animation, exists);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        restore: {
          conditions: function() {
            var
              animation = module.get.currentAnimation()
            ;
            if(animation) {
              $module
                .removeClass(animation)
              ;
              module.verbose('Removing animation class', module.cache);
          ***REMOVED***
            module.remove.duration();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        add: {
          failSafe: function() {
            var
              duration = module.get.duration()
            ;
            module.timer = setTimeout(function() {
              $module.triggerHandler(animationEnd);
***REMOVED*****REMOVED*****REMOVED*** duration + settings.failSafeDelay);
            module.verbose('Adding fail safe timer', module.timer);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          animating: function() {
            $module.removeClass(className.animating);
   ***REMOVED*****REMOVED***
          animationCallbacks: function() {
            module.remove.queueCallback();
            module.remove.completeCallback();
   ***REMOVED*****REMOVED***
          queueCallback: function() {
            $module.off('.queue' + eventNamespace);
   ***REMOVED*****REMOVED***
          completeCallback: function() {
            $module.off('.complete' + eventNamespace);
   ***REMOVED*****REMOVED***
          display: function() {
            $module.css('display', '');
   ***REMOVED*****REMOVED***
          direction: function() {
            $module
              .removeClass(className.inward)
              .removeClass(className.outward)
            ;
   ***REMOVED*****REMOVED***
          duration: function() {
            $module
              .css('animation-duration', '')
            ;
   ***REMOVED*****REMOVED***
          failSafe: function() {
            module.verbose('Removing fail safe timer', module.timer);
            if(module.timer) {
              clearTimeout(module.timer);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          hidden: function() {
            $module.removeClass(className.hidden);
   ***REMOVED*****REMOVED***
          visible: function() {
            $module.removeClass(className.visible);
   ***REMOVED*****REMOVED***
          looping: function() {
            module.debug('Transitions are no longer looping');
            if( module.is.looping() ) {
              module.reset();
              $module
                .removeClass(className.looping)
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          transition: function() {
            $module
              .removeClass(className.transition)
              .removeClass(className.visible)
              .removeClass(className.hidden)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***
        get: {
          settings: function(animation, duration, onComplete) {
            // single settings object
            if(typeof animation == 'object') {
              return $.extend(true, {***REMOVED***, $.fn.transition.settings, animation);
          ***REMOVED***
            // all arguments provided
            else if(typeof onComplete == 'function') {
              return $.extend({***REMOVED***, $.fn.transition.settings, {
                animation  : animation,
                onComplete : onComplete,
                duration   : duration
            ***REMOVED***);
          ***REMOVED***
            // only duration provided
            else if(typeof duration == 'string' || typeof duration == 'number') {
              return $.extend({***REMOVED***, $.fn.transition.settings, {
                animation : animation,
                duration  : duration
            ***REMOVED***);
          ***REMOVED***
            // duration is actually settings object
            else if(typeof duration == 'object') {
              return $.extend({***REMOVED***, $.fn.transition.settings, duration, {
                animation : animation
            ***REMOVED***);
          ***REMOVED***
            // duration is actually callback
            else if(typeof duration == 'function') {
              return $.extend({***REMOVED***, $.fn.transition.settings, {
                animation  : animation,
                onComplete : duration
            ***REMOVED***);
          ***REMOVED***
            // only animation provided
            else {
              return $.extend({***REMOVED***, $.fn.transition.settings, {
                animation : animation
            ***REMOVED***);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          animationClass: function(animation) {
            var
              animationClass = animation || settings.animation,
              directionClass = (module.can.transition() && !module.has.direction())
                ? module.get.direction() + ' '
                : ''
            ;
            return className.animating + ' '
              + className.transition + ' '
              + directionClass
              + animationClass
            ;
   ***REMOVED*****REMOVED***
          currentAnimation: function() {
            return (module.cache && module.cache.animation !== undefined)
              ? module.cache.animation
              : false
            ;
   ***REMOVED*****REMOVED***
          currentDirection: function() {
            return module.is.inward()
              ? className.inward
              : className.outward
            ;
   ***REMOVED*****REMOVED***
          direction: function() {
            return module.is.hidden() || !module.is.visible()
              ? className.inward
              : className.outward
            ;
   ***REMOVED*****REMOVED***
          animationDirection: function(animation) {
            var
              direction
            ;
            animation = animation || settings.animation;
            if(typeof animation === 'string') {
              animation = animation.split(' ');
              // search animation name for out/in class
              $.each(animation, function(index, word){
                if(word === className.inward) {
                  direction = className.inward;
              ***REMOVED***
                else if(word === className.outward) {
                  direction = className.outward;
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***
            // return found direction
            if(direction) {
              return direction;
          ***REMOVED***
            return false;
   ***REMOVED*****REMOVED***
          duration: function(duration) {
            duration = duration || settings.duration;
            if(duration === false) {
              duration = $module.css('animation-duration') || 0;
          ***REMOVED***
            return (typeof duration === 'string')
              ? (duration.indexOf('ms') > -1)
                ? parseFloat(duration)
                : parseFloat(duration)***REMOVED*** 1000
              : duration
            ;
   ***REMOVED*****REMOVED***
          displayType: function(shouldDetermine) {
            shouldDetermine = (shouldDetermine !== undefined)
              ? shouldDetermine
              : true
            ;
            if(settings.displayType) {
              return settings.displayType;
          ***REMOVED***
            if(shouldDetermine && $module.data(metadata.displayType) === undefined) {
              var currentDisplay = $module.css('display');
              if(currentDisplay === '' || currentDisplay === 'none'){
              // create fake element to determine display state
                module.can.transition(true);
            ***REMOVED*** else {
                module.save.displayType(currentDisplay);
            ***REMOVED***
          ***REMOVED***
            return $module.data(metadata.displayType);
   ***REMOVED*****REMOVED***
          userStyle: function(style) {
            style = style || $module.attr('style') || '';
            return style.replace(/display.*?;/, '');
   ***REMOVED*****REMOVED***
          transitionExists: function(animation) {
            return $.fn.transition.exists[animation];
   ***REMOVED*****REMOVED***
          animationStartEvent: function() {
            var
              element     = document.createElement('div'),
              animations  = {
                'animation'       :'animationstart',
                'OAnimation'      :'oAnimationStart',
                'MozAnimation'    :'mozAnimationStart',
                'WebkitAnimation' :'webkitAnimationStart'
  ***REMOVED*****REMOVED*****REMOVED***
              animation
            ;
            for(animation in animations){
              if( element.style[animation] !== undefined ){
                return animations[animation];
            ***REMOVED***
          ***REMOVED***
            return false;
   ***REMOVED*****REMOVED***
          animationEndEvent: function() {
            var
              element     = document.createElement('div'),
              animations  = {
                'animation'       :'animationend',
                'OAnimation'      :'oAnimationEnd',
                'MozAnimation'    :'mozAnimationEnd',
                'WebkitAnimation' :'webkitAnimationEnd'
  ***REMOVED*****REMOVED*****REMOVED***
              animation
            ;
            for(animation in animations){
              if( element.style[animation] !== undefined ){
                return animations[animation];
            ***REMOVED***
          ***REMOVED***
            return false;
        ***REMOVED***

 ***REMOVED*****REMOVED***

        can: {
          transition: function(forced) {
            var
              animation         = settings.animation,
              transitionExists  = module.get.transitionExists(animation),
              displayType       = module.get.displayType(false),
              elementClass,
              tagName,
              $clone,
              currentAnimation,
              inAnimation,
              directionExists
            ;
            if( transitionExists === undefined || forced) {
              module.verbose('Determining whether animation exists');
              elementClass = $module.attr('class');
              tagName      = $module.prop('tagName');

              $clone = $('<' + tagName + ' />').addClass( elementClass ).insertAfter($module);
              currentAnimation = $clone
                .addClass(animation)
                .removeClass(className.inward)
                .removeClass(className.outward)
                .addClass(className.animating)
                .addClass(className.transition)
                .css('animationName')
              ;
              inAnimation = $clone
                .addClass(className.inward)
                .css('animationName')
              ;
              if(!displayType) {
                displayType = $clone
                  .attr('class', elementClass)
                  .removeAttr('style')
                  .removeClass(className.hidden)
                  .removeClass(className.visible)
                  .show()
                  .css('display')
                ;
                module.verbose('Determining final display state', displayType);
                module.save.displayType(displayType);
            ***REMOVED***

              $clone.remove();
              if(currentAnimation != inAnimation) {
                module.debug('Direction exists for animation', animation);
                directionExists = true;
            ***REMOVED***
              else if(currentAnimation == 'none' || !currentAnimation) {
                module.debug('No animation defined in css', animation);
                return;
            ***REMOVED***
              else {
                module.debug('Static animation found', animation, displayType);
                directionExists = false;
            ***REMOVED***
              module.save.transitionExists(animation, directionExists);
          ***REMOVED***
            return (transitionExists !== undefined)
              ? transitionExists
              : directionExists
            ;
   ***REMOVED*****REMOVED***
          animate: function() {
            // can transition does not return a value if animation does not exist
            return (module.can.transition() !== undefined);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          animating: function() {
            return $module.hasClass(className.animating);
   ***REMOVED*****REMOVED***
          inward: function() {
            return $module.hasClass(className.inward);
   ***REMOVED*****REMOVED***
          outward: function() {
            return $module.hasClass(className.outward);
   ***REMOVED*****REMOVED***
          looping: function() {
            return $module.hasClass(className.looping);
   ***REMOVED*****REMOVED***
          occurring: function(animation) {
            animation = animation || settings.animation;
            animation = '.' + animation.replace(' ', '.');
            return ( $module.filter(animation).length > 0 );
   ***REMOVED*****REMOVED***
          visible: function() {
            return $module.is(':visible');
   ***REMOVED*****REMOVED***
          hidden: function() {
            return $module.css('visibility') === 'hidden';
   ***REMOVED*****REMOVED***
          supported: function() {
            return(animationEnd !== false);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        hide: function() {
          module.verbose('Hiding element');
          if( module.is.animating() ) {
            module.reset();
        ***REMOVED***
          element.blur(); // IE will trigger focus change if element is not blurred before hiding
          module.remove.display();
          module.remove.visible();
          if($.isFunction(settings.onBeforeHide)){
            settings.onBeforeHide.call(element,function(){
                module.hideNow();
          ***REMOVED***);
        ***REMOVED*** else {
              module.hideNow();
        ***REMOVED***

 ***REMOVED*****REMOVED***

        hideNow: function() {
            module.set.hidden();
            module.force.hidden();
            settings.onHide.call(element);
            settings.onComplete.call(element);
            // module.repaint();
 ***REMOVED*****REMOVED***

        show: function(display) {
          module.verbose('Showing element', display);
          if(module.force.visible()) {
            module.remove.hidden();
            module.set.visible();
            settings.onShow.call(element);
            settings.onComplete.call(element);
            // module.repaint();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        toggle: function() {
          if( module.is.visible() ) {
            module.hide();
        ***REMOVED***
          else {
            module.show();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        stop: function() {
          module.debug('Stopping current animation');
          $module.triggerHandler(animationEnd);
 ***REMOVED*****REMOVED***

        stopAll: function() {
          module.debug('Stopping all animation');
          module.remove.queueCallback();
          $module.triggerHandler(animationEnd);
 ***REMOVED*****REMOVED***

        clear: {
          queue: function() {
            module.debug('Clearing animation queue');
            module.remove.queueCallback();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        enable: function() {
          module.verbose('Starting animation');
          $module.removeClass(className.disabled);
 ***REMOVED*****REMOVED***

        disable: function() {
          module.debug('Stopping animation');
          $module.addClass(className.disabled);
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
        // modified for transition to return invoke success
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
          return (found !== undefined)
            ? found
            : false
          ;
      ***REMOVED***
    ***REMOVED***;
      module.initialize();
  ***REMOVED***)
  ;
  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
***REMOVED***;

// Records if CSS transition is available
$.fn.transition.exists = {***REMOVED***;

$.fn.transition.settings = {

  // module info
  name          : 'Transition',

  // hide all output from this component regardless of other settings
  silent        : false,

  // debug content outputted to console
  debug         : false,

  // verbose debug output
  verbose       : false,

  // performance data output
  performance   : true,

  // event namespace
  namespace     : 'transition',

  // delay between animations in group
  interval      : 0,

  // whether group animations should be reversed
  reverse       : 'auto',

  // animation callback event
  onStart       : function() {***REMOVED***,
  onComplete    : function() {***REMOVED***,
  onShow        : function() {***REMOVED***,
  onHide        : function() {***REMOVED***,

  // whether timeout should be used to ensure callback fires in cases animationend does not
  useFailSafe   : true,

  // delay in ms for fail safe
  failSafeDelay : 100,

  // whether EXACT animation can occur twice in a row
  allowRepeats  : false,

  // Override final display type on visible
  displayType   : false,

  // animation duration
  animation     : 'fade',
  duration      : false,

  // new animations will occur after previous ones
  queue         : true,

// whether initially inline hidden objects should be skipped for transition
  skipInlineHidden: false,

  metadata : {
    displayType: 'display'
***REMOVED***

  className   : {
    animating  : 'animating',
    disabled   : 'disabled',
    hidden     : 'hidden',
    inward     : 'in',
    loading    : 'loading',
    looping    : 'looping',
    outward    : 'out',
    transition : 'transition',
    visible    : 'visible'
***REMOVED***

  // possible errors
  error: {
    noAnimation : 'Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.',
    repeated    : 'That animation is already occurring, cancelling repeated animation',
    method      : 'The method you called is not defined',
    support     : 'This browser does not support CSS animations'
***REMOVED***

***REMOVED***;


***REMOVED***)( jQuery, window, document );
