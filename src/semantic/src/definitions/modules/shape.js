/*!
***REMOVED*** # Fomantic-UI - Shape
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

$.fn.shape = function(parameters) {
  var
    $allModules     = $(this),

    time            = new Date().getTime(),
    performance     = [],

    query           = arguments[0],
    methodInvoked   = (typeof query == 'string'),
    queryArguments  = [].slice.call(arguments, 1),

    requestAnimationFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function(callback) { setTimeout(callback, 0); ***REMOVED***,

    returnedValue
  ;

  $allModules
    .each(function() {
      var
        moduleSelector = $allModules.selector || '',
        settings       = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.shape.settings, parameters)
          : $.extend({***REMOVED***, $.fn.shape.settings),

        // internal aliases
        namespace     = settings.namespace,
        selector      = settings.selector,
        error         = settings.error,
        className     = settings.className,

        // define namespaces for modules
        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        // selector cache
        $module       = $(this),
        $sides        = $module.find('>' + selector.sides),
        $side         = $sides.find('>' + selector.side),

        // private variables
        nextIndex = false,
        $activeSide,
        $nextSide,

        // standard module
        element       = this,
        instance      = $module.data(moduleNamespace),
        module
      ;

      module = {

        initialize: function() {
          module.verbose('Initializing module for', element);
          module.set.defaultSide();
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
          module.verbose('Destroying previous module for', element);
          $module
            .removeData(moduleNamespace)
            .off(eventNamespace)
          ;
 ***REMOVED*****REMOVED***

        refresh: function() {
          module.verbose('Refreshing selector cache for', element);
          $module = $(element);
          $sides  = $(this).find(selector.sides);
          $side   = $(this).find(selector.side);
 ***REMOVED*****REMOVED***

        repaint: function() {
          module.verbose('Forcing repaint event');
          var
            shape          = $sides[0] || document.createElement('div'),
            fakeAssignment = shape.offsetWidth
          ;
 ***REMOVED*****REMOVED***

        animate: function(propertyObject, callback) {
          module.verbose('Animating box with properties', propertyObject);
          callback = callback || function(event) {
            module.verbose('Executing animation callback');
            if(event !== undefined) {
              event.stopPropagation();
          ***REMOVED***
            module.reset();
            module.set.active();
        ***REMOVED***;
          settings.beforeChange.call($nextSide[0]);
          if(module.get.transitionEvent()) {
            module.verbose('Starting CSS animation');
            $module
              .addClass(className.animating)
            ;
            $sides
              .css(propertyObject)
              .one(module.get.transitionEvent(), callback)
            ;
            module.set.duration(settings.duration);
            requestAnimationFrame(function() {
              $module
                .addClass(className.animating)
              ;
              $activeSide
                .addClass(className.hidden)
              ;
          ***REMOVED***);
        ***REMOVED***
          else {
            callback();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        queue: function(method) {
          module.debug('Queueing animation of', method);
          $sides
            .one(module.get.transitionEvent(), function() {
              module.debug('Executing queued animation');
              setTimeout(function(){
                $module.shape(method);
  ***REMOVED*****REMOVED*****REMOVED*** 0);
          ***REMOVED***)
          ;
 ***REMOVED*****REMOVED***

        reset: function() {
          module.verbose('Animating states reset');
          $module
            .removeClass(className.animating)
            .attr('style', '')
            .removeAttr('style')
          ;
          // removeAttr style does not consistently work in safari
          $sides
            .attr('style', '')
            .removeAttr('style')
          ;
          $side
            .attr('style', '')
            .removeAttr('style')
            .removeClass(className.hidden)
          ;
          $nextSide
            .removeClass(className.animating)
            .attr('style', '')
            .removeAttr('style')
          ;
 ***REMOVED*****REMOVED***

        is: {
          complete: function() {
            return ($side.filter('.' + className.active)[0] == $nextSide[0]);
   ***REMOVED*****REMOVED***
          animating: function() {
            return $module.hasClass(className.animating);
   ***REMOVED*****REMOVED***
          hidden: function() {
            return $module.closest(':hidden').length > 0;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {

          defaultSide: function() {
            $activeSide = $side.filter('.' + settings.className.active);
            $nextSide   = ( $activeSide.next(selector.side).length > 0 )
              ? $activeSide.next(selector.side)
              : $side.first()
            ;
            nextIndex = false;
            module.verbose('Active side set to', $activeSide);
            module.verbose('Next side set to', $nextSide);
   ***REMOVED*****REMOVED***

          duration: function(duration) {
            duration = duration || settings.duration;
            duration = (typeof duration == 'number')
              ? duration + 'ms'
              : duration
            ;
            module.verbose('Setting animation duration', duration);
            if(settings.duration || settings.duration === 0) {
              $sides.add($side)
                .css({
                  '-webkit-transition-duration': duration,
                  '-moz-transition-duration': duration,
                  '-ms-transition-duration': duration,
                  '-o-transition-duration': duration,
                  'transition-duration': duration
              ***REMOVED***)
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***

          currentStageSize: function() {
            var
              $activeSide = $side.filter('.' + settings.className.active),
              width       = $activeSide.outerWidth(true),
              height      = $activeSide.outerHeight(true)
            ;
            $module
              .css({
                width: width,
                height: height
            ***REMOVED***)
            ;
   ***REMOVED*****REMOVED***

          stageSize: function() {
            var
              $clone      = $module.clone().addClass(className.loading),
              $side       = $clone.find('>' + selector.sides + '>' + selector.side),
              $activeSide = $side.filter('.' + settings.className.active),
              $nextSide   = (nextIndex)
                ? $side.eq(nextIndex)
                : ( $activeSide.next(selector.side).length > 0 )
                  ? $activeSide.next(selector.side)
                  : $side.first(),
              newWidth    = (settings.width === 'next')
                ? $nextSide.outerWidth(true)
                : (settings.width === 'initial')
                  ? $module.width()
                  : settings.width,
              newHeight    = (settings.height === 'next')
                ? $nextSide.outerHeight(true)
                : (settings.height === 'initial')
                  ? $module.height()
                  : settings.height
            ;
            $activeSide.removeClass(className.active);
            $nextSide.addClass(className.active);
            $clone.insertAfter($module);
            $clone.remove();
            if(settings.width !== 'auto') {
              $module.css('width', newWidth + settings.jitter);
              module.verbose('Specifying width during animation', newWidth);
          ***REMOVED***
            if(settings.height !== 'auto') {
              $module.css('height', newHeight + settings.jitter);
              module.verbose('Specifying height during animation', newHeight);
          ***REMOVED***
   ***REMOVED*****REMOVED***

          nextSide: function(selector) {
            nextIndex = selector;
            $nextSide = $side.filter(selector);
            nextIndex = $side.index($nextSide);
            if($nextSide.length === 0) {
              module.set.defaultSide();
              module.error(error.side);
          ***REMOVED***
            module.verbose('Next side manually set to', $nextSide);
   ***REMOVED*****REMOVED***

          active: function() {
            module.verbose('Setting new side to active', $nextSide);
            $side
              .removeClass(className.active)
            ;
            $nextSide
              .addClass(className.active)
            ;
            settings.onChange.call($nextSide[0]);
            module.set.defaultSide();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        flip: {
          to: function(type,stage){
            if(module.is.hidden()) {
              module.debug('Module not visible', $nextSide);
              return;
          ***REMOVED***
            if(module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);
              return;
          ***REMOVED***
            var
              transform = module.get.transform[type]()
            ;
            if( !module.is.animating()) {
              module.debug('Flipping '+type, $nextSide);
              module.set.stageSize();
              module.stage[stage]();
              module.animate(transform);
          ***REMOVED***
            else {
              module.queue('flip '+type);
          ***REMOVED***
   ***REMOVED*****REMOVED***

          up: function() {
            module.flip.to('up','above');
   ***REMOVED*****REMOVED***

          down: function() {
            module.flip.to('down','below');
   ***REMOVED*****REMOVED***

          left: function() {
            module.flip.to('left','left');
   ***REMOVED*****REMOVED***

          right: function() {
            module.flip.to('right','right');
   ***REMOVED*****REMOVED***

          over: function() {
            module.flip.to('over','behind');
   ***REMOVED*****REMOVED***

          back: function() {
            module.flip.to('back','behind');
        ***REMOVED***

 ***REMOVED*****REMOVED***

        get: {

          transform: {
            up: function() {
              var
                    translateZ = $activeSide.outerHeight(true) / 2,
                translateY = $nextSide.outerHeight(true) - translateZ
              ;
              return {
                transform: 'translateY(' + translateY + 'px) translateZ(-'+ translateZ + 'px) rotateX(-90deg)'
            ***REMOVED***;
***REMOVED*****REMOVED*****REMOVED***

            down: function() {
              var
                translate = {
                  z: $activeSide.outerHeight(true) / 2
              ***REMOVED***
              ;
              return {
                transform: 'translateY(-' + translate.z + 'px) translateZ(-'+ translate.z + 'px) rotateX(90deg)'
            ***REMOVED***;
***REMOVED*****REMOVED*****REMOVED***

            left: function() {
              var
                  translateZ = $activeSide.outerWidth(true) / 2,
                  translateX = $nextSide.outerWidth(true) - translateZ
              ;
              return {
                transform: 'translateX(' + translateX + 'px) translateZ(-' + translateZ + 'px) rotateY(90deg)'
            ***REMOVED***;
***REMOVED*****REMOVED*****REMOVED***

            right: function() {
              var
                translate = {
                  z : $activeSide.outerWidth(true) / 2
              ***REMOVED***
              ;
              return {
                transform: 'translateX(-' + translate.z + 'px) translateZ(-' + translate.z + 'px) rotateY(-90deg)'
            ***REMOVED***;
***REMOVED*****REMOVED*****REMOVED***

            over: function() {
              var
                translate = {
                  x : -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2)
              ***REMOVED***
              ;
              return {
                transform: 'translateX(' + translate.x + 'px) rotateY(180deg)'
            ***REMOVED***;
***REMOVED*****REMOVED*****REMOVED***

            back: function() {
              var
                translate = {
                  x : -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2)
              ***REMOVED***
              ;
              return {
                transform: 'translateX(' + translate.x + 'px) rotateY(-180deg)'
            ***REMOVED***;
          ***REMOVED***
   ***REMOVED*****REMOVED***

          transitionEvent: function() {
            var
              element     = document.createElement('element'),
              transitions = {
                'transition'       :'transitionend',
                'OTransition'      :'oTransitionEnd',
                'MozTransition'    :'transitionend',
                'WebkitTransition' :'webkitTransitionEnd'
  ***REMOVED*****REMOVED*****REMOVED***
              transition
            ;
            for(transition in transitions){
              if( element.style[transition] !== undefined ){
                return transitions[transition];
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***

          nextSide: function() {
            return ( $activeSide.next(selector.side).length > 0 )
              ? $activeSide.next(selector.side)
              : $side.first()
            ;
        ***REMOVED***

 ***REMOVED*****REMOVED***

        stage: {

          above: function() {
            var
              box = {
                origin : (($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2),
                depth  : {
                  active : ($nextSide.outerHeight(true) / 2),
                  next   : ($activeSide.outerHeight(true) / 2)
              ***REMOVED***
            ***REMOVED***
            ;
            module.verbose('Setting the initial animation position as above', $nextSide, box);
            $activeSide
              .css({
                'transform' : 'rotateX(0deg)'
            ***REMOVED***)
            ;
            $nextSide
              .addClass(className.animating)
              .css({
                'top'       : box.origin + 'px',
                'transform' : 'rotateX(90deg) translateZ(' + box.depth.next + 'px) translateY(-' + box.depth.active + 'px)'
            ***REMOVED***)
            ;
   ***REMOVED*****REMOVED***

          below: function() {
            var
              box = {
                origin : (($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2),
                depth  : {
                  active : ($nextSide.outerHeight(true) / 2),
                  next   : ($activeSide.outerHeight(true) / 2)
              ***REMOVED***
            ***REMOVED***
            ;
            module.verbose('Setting the initial animation position as below', $nextSide, box);
            $activeSide
              .css({
                'transform' : 'rotateX(0deg)'
            ***REMOVED***)
            ;
            $nextSide
              .addClass(className.animating)
              .css({
                'top'       : box.origin + 'px',
                'transform' : 'rotateX(-90deg) translateZ(' + box.depth.next + 'px) translateY(' + box.depth.active + 'px)'
            ***REMOVED***)
            ;
   ***REMOVED*****REMOVED***

          left: function() {
            var
              height = {
                active : $activeSide.outerWidth(true),
                next   : $nextSide.outerWidth(true)
  ***REMOVED*****REMOVED*****REMOVED***
              box = {
                origin : ( ( height.active - height.next ) / 2),
                depth  : {
                  active : (height.next / 2),
                  next   : (height.active / 2)
              ***REMOVED***
            ***REMOVED***
            ;
            module.verbose('Setting the initial animation position as left', $nextSide, box);
            $activeSide
              .css({
                'transform' : 'rotateY(0deg)'
            ***REMOVED***)
            ;
            $nextSide
              .addClass(className.animating)
              .css({
                'left'      : box.origin + 'px',
                'transform' : 'rotateY(-90deg) translateZ(' + box.depth.next + 'px) translateX(-' + box.depth.active + 'px)'
            ***REMOVED***)
            ;
   ***REMOVED*****REMOVED***

          right: function() {
            var
              height = {
                active : $activeSide.outerWidth(true),
                next   : $nextSide.outerWidth(true)
  ***REMOVED*****REMOVED*****REMOVED***
              box = {
                origin : ( ( height.active - height.next ) / 2),
                depth  : {
                  active : (height.next / 2),
                  next   : (height.active / 2)
              ***REMOVED***
            ***REMOVED***
            ;
            module.verbose('Setting the initial animation position as right', $nextSide, box);
            $activeSide
              .css({
                'transform' : 'rotateY(0deg)'
            ***REMOVED***)
            ;
            $nextSide
              .addClass(className.animating)
              .css({
                'left'      : box.origin + 'px',
                'transform' : 'rotateY(90deg) translateZ(' + box.depth.next + 'px) translateX(' + box.depth.active + 'px)'
            ***REMOVED***)
            ;
   ***REMOVED*****REMOVED***

          behind: function() {
            var
              height = {
                active : $activeSide.outerWidth(true),
                next   : $nextSide.outerWidth(true)
  ***REMOVED*****REMOVED*****REMOVED***
              box = {
                origin : ( ( height.active - height.next ) / 2),
                depth  : {
                  active : (height.next / 2),
                  next   : (height.active / 2)
              ***REMOVED***
            ***REMOVED***
            ;
            module.verbose('Setting the initial animation position as behind', $nextSide, box);
            $activeSide
              .css({
                'transform' : 'rotateY(0deg)'
            ***REMOVED***)
            ;
            $nextSide
              .addClass(className.animating)
              .css({
                'left'      : box.origin + 'px',
                'transform' : 'rotateY(-180deg)'
            ***REMOVED***)
            ;
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
        var $inputs = $module.find('input');
        if( $inputs.length > 0) {
          $inputs.blur();
          setTimeout(function(){
            module.invoke(query);
   ***REMOVED*****REMOVED*** 150);
      ***REMOVED*** else {
          module.invoke(query);
      ***REMOVED***
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

$.fn.shape.settings = {

  // module info
  name : 'Shape',

  // hide all debug content
  silent     : false,

  // debug content outputted to console
  debug      : false,

  // verbose debug output
  verbose    : false,

  // fudge factor in pixels when swapping from 2d to 3d (can be useful to correct rounding errors)
  jitter     : 0,

  // performance data output
  performance: true,

  // event namespace
  namespace  : 'shape',

  // width during animation, can be set to 'auto', initial', 'next' or pixel amount
  width: 'initial',

  // height during animation, can be set to 'auto', 'initial', 'next' or pixel amount
  height: 'initial',

  // callback occurs on side change
  beforeChange : function() {***REMOVED***,
  onChange     : function() {***REMOVED***,

  // allow animation to same side
  allowRepeats: false,

  // animation duration
  duration   : false,

  // possible errors
  error: {
    side   : 'You tried to switch to a side that does not exist.',
    method : 'The method you called is not defined'
***REMOVED***

  // classnames used
  className   : {
    animating : 'animating',
    hidden    : 'hidden',
    loading   : 'loading',
    active    : 'active'
***REMOVED***

  // selectors used
  selector    : {
    sides : '.sides',
    side  : '.side'
***REMOVED***

***REMOVED***;


***REMOVED***)( jQuery, window, document );
