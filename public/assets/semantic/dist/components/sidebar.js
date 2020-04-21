/*!
***REMOVED*** # Fomantic-UI - Sidebar
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

$.fn.sidebar = function(parameters) {
  var
    $allModules     = $(this),
    $window         = $(window),
    $document       = $(document),
    $html           = $('html'),
    $head           = $('head'),

    moduleSelector  = $allModules.selector || '',

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
        settings        = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.sidebar.settings, parameters)
          : $.extend({***REMOVED***, $.fn.sidebar.settings),

        selector        = settings.selector,
        className       = settings.className,
        namespace       = settings.namespace,
        regExp          = settings.regExp,
        error           = settings.error,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $module         = $(this),
        $context        = $(settings.context),

        $sidebars       = $module.children(selector.sidebar),
        $fixed          = $context.children(selector.fixed),
        $pusher         = $context.children(selector.pusher),
        $style,

        element         = this,
        instance        = $module.data(moduleNamespace),

        elementNamespace,
        id,
        currentScroll,
        transitionEvent,

        module
      ;

      module      = {

        initialize: function() {
          module.debug('Initializing sidebar', parameters);

          module.create.id();

          transitionEvent = module.get.transitionEvent();

          // avoids locking rendering if initialized in onReady
          if(settings.delaySetup) {
            requestAnimationFrame(module.setup.layout);
        ***REMOVED***
          else {
            module.setup.layout();
        ***REMOVED***

          requestAnimationFrame(function() {
            module.setup.cache();
        ***REMOVED***);

          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
 ***REMOVED*****REMOVED***

        create: {
          id: function() {
            id = (Math.random().toString(16) + '000000000').substr(2,8);
            elementNamespace = '.' + id;
            module.verbose('Creating unique id for element', id);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.verbose('Destroying previous module for', $module);
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
          if(module.is.ios()) {
            module.remove.ios();
        ***REMOVED***
          // bound by uuid
          $context.off(elementNamespace);
          $window.off(elementNamespace);
          $document.off(elementNamespace);
 ***REMOVED*****REMOVED***

        event: {
          clickaway: function(event) {
            if(settings.closable){
              var
                clickedInPusher = ($pusher.find(event.target).length > 0 || $pusher.is(event.target)),
                clickedContext  = ($context.is(event.target))
              ;
              if(clickedInPusher) {
                module.verbose('User clicked on dimmed page');
                module.hide();
            ***REMOVED***
              if(clickedContext) {
                module.verbose('User clicked on dimmable context (scaled out page)');
                module.hide();
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          touch: function(event) {
            //event.stopPropagation();
   ***REMOVED*****REMOVED***
          containScroll: function(event) {
            if(element.scrollTop <= 0)  {
              element.scrollTop = 1;
          ***REMOVED***
            if((element.scrollTop + element.offsetHeight) >= element.scrollHeight) {
              element.scrollTop = element.scrollHeight - element.offsetHeight - 1;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          scroll: function(event) {
            if( $(event.target).closest(selector.sidebar).length === 0 ) {
              event.preventDefault();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bind: {
          clickaway: function() {
            module.verbose('Adding clickaway events to context', $context);
            $context
              .on('click'    + elementNamespace, module.event.clickaway)
              .on('touchend' + elementNamespace, module.event.clickaway)
            ;
   ***REMOVED*****REMOVED***
          scrollLock: function() {
            if(settings.scrollLock) {
              module.debug('Disabling page scroll');
              $window
                .on('DOMMouseScroll' + elementNamespace, module.event.scroll)
              ;
          ***REMOVED***
            module.verbose('Adding events to contain sidebar scroll');
            $document
              .on('touchmove' + elementNamespace, module.event.touch)
            ;
            $module
              .on('scroll' + eventNamespace, module.event.containScroll)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***
        unbind: {
          clickaway: function() {
            module.verbose('Removing clickaway events from context', $context);
            $context.off(elementNamespace);
   ***REMOVED*****REMOVED***
          scrollLock: function() {
            module.verbose('Removing scroll lock from page');
            $document.off(elementNamespace);
            $window.off(elementNamespace);
            $module.off('scroll' + eventNamespace);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        add: {
          inlineCSS: function() {
            var
              width     = module.cache.width  || $module.outerWidth(),
              height    = module.cache.height || $module.outerHeight(),
              isRTL     = module.is.rtl(),
              direction = module.get.direction(),
              distance  = {
                left   : width,
                right  : -width,
                top    : height,
                bottom : -height
  ***REMOVED*****REMOVED*****REMOVED***
              style
            ;

            if(isRTL){
              module.verbose('RTL detected, flipping widths');
              distance.left = -width;
              distance.right = width;
          ***REMOVED***

            style  = '<style>';

            if(direction === 'left' || direction === 'right') {
              module.debug('Adding CSS rules for animation distance', width);
              style  += ''
                + ' .ui.visible.' + direction + '.sidebar ~ .fixed,'
                + ' .ui.visible.' + direction + '.sidebar ~ .pusher {'
                + '   -webkit-transform: translate3d('+ distance[direction] + 'px, 0, 0);'
                + '           transform: translate3d('+ distance[direction] + 'px, 0, 0);'
                + ' ***REMOVED***'
              ;
          ***REMOVED***
            else if(direction === 'top' || direction == 'bottom') {
              style  += ''
                + ' .ui.visible.' + direction + '.sidebar ~ .fixed,'
                + ' .ui.visible.' + direction + '.sidebar ~ .pusher {'
                + '   -webkit-transform: translate3d(0, ' + distance[direction] + 'px, 0);'
                + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);'
                + ' ***REMOVED***'
              ;
          ***REMOVED***

            /* IE is only browser not to create context with transforms***REMOVED***/
            /* https://www.w3.org/Bugs/Public/show_bug.cgi?id=16328***REMOVED***/
            if( module.is.ie() ) {
              if(direction === 'left' || direction === 'right') {
                module.debug('Adding CSS rules for animation distance', width);
                style  += ''
                  + ' body.pushable > .ui.visible.' + direction + '.sidebar ~ .pusher:after {'
                  + '   -webkit-transform: translate3d('+ distance[direction] + 'px, 0, 0);'
                  + '           transform: translate3d('+ distance[direction] + 'px, 0, 0);'
                  + ' ***REMOVED***'
                ;
            ***REMOVED***
              else if(direction === 'top' || direction == 'bottom') {
                style  += ''
                  + ' body.pushable > .ui.visible.' + direction + '.sidebar ~ .pusher:after {'
                  + '   -webkit-transform: translate3d(0, ' + distance[direction] + 'px, 0);'
                  + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);'
                  + ' ***REMOVED***'
                ;
            ***REMOVED***
              /* opposite sides visible forces content overlay***REMOVED***/
              style += ''
                + ' body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after,'
                + ' body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {'
                + '   -webkit-transform: translate3d(0, 0, 0);'
                + '           transform: translate3d(0, 0, 0);'
                + ' ***REMOVED***'
              ;
          ***REMOVED***
            style += '</style>';
            $style = $(style)
              .appendTo($head)
            ;
            module.debug('Adding sizing css to head', $style);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        refresh: function() {
          module.verbose('Refreshing selector cache');
          $context  = $(settings.context);
          $sidebars = $context.children(selector.sidebar);
          $pusher   = $context.children(selector.pusher);
          $fixed    = $context.children(selector.fixed);
          module.clear.cache();
 ***REMOVED*****REMOVED***

        refreshSidebars: function() {
          module.verbose('Refreshing other sidebars');
          $sidebars = $context.children(selector.sidebar);
 ***REMOVED*****REMOVED***

        repaint: function() {
          module.verbose('Forcing repaint event');
          element.style.display = 'none';
          var ignored = element.offsetHeight;
          element.scrollTop = element.scrollTop;
          element.style.display = '';
 ***REMOVED*****REMOVED***

        setup: {
          cache: function() {
            module.cache = {
              width  : $module.outerWidth(),
              height : $module.outerHeight()
          ***REMOVED***;
   ***REMOVED*****REMOVED***
          layout: function() {
            if( $context.children(selector.pusher).length === 0 ) {
              module.debug('Adding wrapper element for sidebar');
              module.error(error.pusher);
              $pusher = $('<div class="pusher" />');
              $context
                .children()
                  .not(selector.omitted)
                  .not($sidebars)
                  .wrapAll($pusher)
              ;
              module.refresh();
          ***REMOVED***
            if($module.nextAll(selector.pusher).length === 0 || $module.nextAll(selector.pusher)[0] !== $pusher[0]) {
              module.debug('Moved sidebar to correct parent element');
              module.error(error.movedSidebar, element);
              $module.detach().prependTo($context);
              module.refresh();
          ***REMOVED***
            module.clear.cache();
            module.set.pushable();
            module.set.direction();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        attachEvents: function(selector, event) {
          var
            $toggle = $(selector)
          ;
          event = $.isFunction(module[event])
            ? module[event]
            : module.toggle
          ;
          if($toggle.length > 0) {
            module.debug('Attaching sidebar events to element', selector, event);
            $toggle
              .on('click' + eventNamespace, event)
            ;
        ***REMOVED***
          else {
            module.error(error.notFound, selector);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        show: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          if(module.is.hidden()) {
            module.refreshSidebars();
            if(settings.overlay)  {
              module.error(error.overlay);
              settings.transition = 'overlay';
          ***REMOVED***
            module.refresh();
            if(module.othersActive()) {
              module.debug('Other sidebars currently visible');
              if(settings.exclusive) {
                // if not overlay queue animation after hide
                if(settings.transition != 'overlay') {
                  module.hideOthers(module.show);
                  return;
              ***REMOVED***
                else {
                  module.hideOthers();
              ***REMOVED***
            ***REMOVED***
              else {
                settings.transition = 'overlay';
            ***REMOVED***
          ***REMOVED***
            module.pushPage(function() {
              callback.call(element);
              settings.onShow.call(element);
          ***REMOVED***);
            settings.onChange.call(element);
            settings.onVisible.call(element);
        ***REMOVED***
          else {
            module.debug('Sidebar is already visible');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        hide: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          if(module.is.visible() || module.is.animating()) {
            module.debug('Hiding sidebar', callback);
            module.refreshSidebars();
            module.pullPage(function() {
              callback.call(element);
              settings.onHidden.call(element);
          ***REMOVED***);
            settings.onChange.call(element);
            settings.onHide.call(element);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        othersAnimating: function() {
          return ($sidebars.not($module).filter('.' + className.animating).length > 0);
 ***REMOVED*****REMOVED***
        othersVisible: function() {
          return ($sidebars.not($module).filter('.' + className.visible).length > 0);
 ***REMOVED*****REMOVED***
        othersActive: function() {
          return(module.othersVisible() || module.othersAnimating());
 ***REMOVED*****REMOVED***

        hideOthers: function(callback) {
          var
            $otherSidebars = $sidebars.not($module).filter('.' + className.visible),
            sidebarCount   = $otherSidebars.length,
            callbackCount  = 0
          ;
          callback = callback || function(){***REMOVED***;
          $otherSidebars
            .sidebar('hide', function() {
              callbackCount++;
              if(callbackCount == sidebarCount) {
                callback();
            ***REMOVED***
          ***REMOVED***)
          ;
 ***REMOVED*****REMOVED***

        toggle: function() {
          module.verbose('Determining toggled direction');
          if(module.is.hidden()) {
            module.show();
        ***REMOVED***
          else {
            module.hide();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        pushPage: function(callback) {
          var
            transition = module.get.transition(),
            $transition = (transition === 'overlay' || module.othersActive())
              ? $module
              : $pusher,
            animate,
            dim,
            transitionEnd
          ;
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          if(settings.transition == 'scale down') {
            module.scrollToTop();
        ***REMOVED***
          module.set.transition(transition);
          module.repaint();
          animate = function() {
            module.bind.clickaway();
            module.add.inlineCSS();
            module.set.animating();
            module.set.visible();
        ***REMOVED***;
          dim = function() {
            module.set.dimmed();
        ***REMOVED***;
          transitionEnd = function(event) {
            if( event.target == $transition[0] ) {
              $transition.off(transitionEvent + elementNamespace, transitionEnd);
              module.remove.animating();
              module.bind.scrollLock();
              callback.call(element);
          ***REMOVED***
        ***REMOVED***;
          $transition.off(transitionEvent + elementNamespace);
          $transition.on(transitionEvent + elementNamespace, transitionEnd);
          requestAnimationFrame(animate);
          if(settings.dimPage && !module.othersVisible()) {
            requestAnimationFrame(dim);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        pullPage: function(callback) {
          var
            transition = module.get.transition(),
            $transition = (transition == 'overlay' || module.othersActive())
              ? $module
              : $pusher,
            animate,
            transitionEnd
          ;
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          module.verbose('Removing context push state', module.get.direction());

          module.unbind.clickaway();
          module.unbind.scrollLock();

          animate = function() {
            module.set.transition(transition);
            module.set.animating();
            module.remove.visible();
            if(settings.dimPage && !module.othersVisible()) {
              $pusher.removeClass(className.dimmed);
          ***REMOVED***
        ***REMOVED***;
          transitionEnd = function(event) {
            if( event.target == $transition[0] ) {
              $transition.off(transitionEvent + elementNamespace, transitionEnd);
              module.remove.animating();
              module.remove.transition();
              module.remove.inlineCSS();
              if(transition == 'scale down' || (settings.returnScroll && module.is.mobile()) ) {
                module.scrollBack();
            ***REMOVED***
              callback.call(element);
          ***REMOVED***
        ***REMOVED***;
          $transition.off(transitionEvent + elementNamespace);
          $transition.on(transitionEvent + elementNamespace, transitionEnd);
          requestAnimationFrame(animate);
 ***REMOVED*****REMOVED***

        scrollToTop: function() {
          module.verbose('Scrolling to top of page to avoid animation issues');
          currentScroll = $(window).scrollTop();
          $module.scrollTop(0);
          window.scrollTo(0, 0);
 ***REMOVED*****REMOVED***

        scrollBack: function() {
          module.verbose('Scrolling back to original page position');
          window.scrollTo(0, currentScroll);
 ***REMOVED*****REMOVED***

        clear: {
          cache: function() {
            module.verbose('Clearing cached dimensions');
            module.cache = {***REMOVED***;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {

          // ios only (scroll on html not document). This prevent auto-resize canvas/scroll in ios
          // (This is no longer necessary in latest iOS)
          ios: function() {
            $html.addClass(className.ios);
   ***REMOVED*****REMOVED***

          // container
          pushed: function() {
            $context.addClass(className.pushed);
   ***REMOVED*****REMOVED***
          pushable: function() {
            $context.addClass(className.pushable);
   ***REMOVED*****REMOVED***

          // pusher
          dimmed: function() {
            $pusher.addClass(className.dimmed);
   ***REMOVED*****REMOVED***

          // sidebar
          active: function() {
            $module.addClass(className.active);
   ***REMOVED*****REMOVED***
          animating: function() {
            $module.addClass(className.animating);
   ***REMOVED*****REMOVED***
          transition: function(transition) {
            transition = transition || module.get.transition();
            $module.addClass(transition);
   ***REMOVED*****REMOVED***
          direction: function(direction) {
            direction = direction || module.get.direction();
            $module.addClass(className[direction]);
   ***REMOVED*****REMOVED***
          visible: function() {
            $module.addClass(className.visible);
   ***REMOVED*****REMOVED***
          overlay: function() {
            $module.addClass(className.overlay);
        ***REMOVED***
 ***REMOVED*****REMOVED***
        remove: {

          inlineCSS: function() {
            module.debug('Removing inline css styles', $style);
            if($style && $style.length > 0) {
              $style.remove();
          ***REMOVED***
   ***REMOVED*****REMOVED***

          // ios scroll on html not document
          ios: function() {
            $html.removeClass(className.ios);
   ***REMOVED*****REMOVED***

          // context
          pushed: function() {
            $context.removeClass(className.pushed);
   ***REMOVED*****REMOVED***
          pushable: function() {
            $context.removeClass(className.pushable);
   ***REMOVED*****REMOVED***

          // sidebar
          active: function() {
            $module.removeClass(className.active);
   ***REMOVED*****REMOVED***
          animating: function() {
            $module.removeClass(className.animating);
   ***REMOVED*****REMOVED***
          transition: function(transition) {
            transition = transition || module.get.transition();
            $module.removeClass(transition);
   ***REMOVED*****REMOVED***
          direction: function(direction) {
            direction = direction || module.get.direction();
            $module.removeClass(className[direction]);
   ***REMOVED*****REMOVED***
          visible: function() {
            $module.removeClass(className.visible);
   ***REMOVED*****REMOVED***
          overlay: function() {
            $module.removeClass(className.overlay);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          direction: function() {
            if($module.hasClass(className.top)) {
              return className.top;
          ***REMOVED***
            else if($module.hasClass(className.right)) {
              return className.right;
          ***REMOVED***
            else if($module.hasClass(className.bottom)) {
              return className.bottom;
          ***REMOVED***
            return className.left;
   ***REMOVED*****REMOVED***
          transition: function() {
            var
              direction = module.get.direction(),
              transition
            ;
            transition = ( module.is.mobile() )
              ? (settings.mobileTransition == 'auto')
                ? settings.defaultTransition.mobile[direction]
                : settings.mobileTransition
              : (settings.transition == 'auto')
                ? settings.defaultTransition.computer[direction]
                : settings.transition
            ;
            module.verbose('Determined transition', transition);
            return transition;
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
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {

          ie: function() {
            var
              isIE11 = (!(window.ActiveXObject) && 'ActiveXObject' in window),
              isIE   = ('ActiveXObject' in window)
            ;
            return (isIE11 || isIE);
   ***REMOVED*****REMOVED***

          ios: function() {
            var
              userAgent      = navigator.userAgent,
              isIOS          = userAgent.match(regExp.ios),
              isMobileChrome = userAgent.match(regExp.mobileChrome)
            ;
            if(isIOS && !isMobileChrome) {
              module.verbose('Browser was found to be iOS', userAgent);
              return true;
          ***REMOVED***
            else {
              return false;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          mobile: function() {
            var
              userAgent    = navigator.userAgent,
              isMobile     = userAgent.match(regExp.mobile)
            ;
            if(isMobile) {
              module.verbose('Browser was found to be mobile', userAgent);
              return true;
          ***REMOVED***
            else {
              module.verbose('Browser is not mobile, using regular transition', userAgent);
              return false;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          hidden: function() {
            return !module.is.visible();
   ***REMOVED*****REMOVED***
          visible: function() {
            return $module.hasClass(className.visible);
   ***REMOVED*****REMOVED***
          // alias
          open: function() {
            return module.is.visible();
   ***REMOVED*****REMOVED***
          closed: function() {
            return module.is.hidden();
   ***REMOVED*****REMOVED***
          vertical: function() {
            return $module.hasClass(className.top);
   ***REMOVED*****REMOVED***
          animating: function() {
            return $context.hasClass(className.animating);
   ***REMOVED*****REMOVED***
          rtl: function () {
            if(module.cache.rtl === undefined) {
              module.cache.rtl = $module.attr('dir') === 'rtl' || $module.css('direction') === 'rtl';
          ***REMOVED***
            return module.cache.rtl;
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
    ***REMOVED***
    ;

    if(methodInvoked) {
      if(instance === undefined) {
        module.initialize();
    ***REMOVED***
      module.invoke(query);
  ***REMOVED***
    else {
      if(instance !== undefined) {
        module.invoke('destroy');
    ***REMOVED***
      module.initialize();
  ***REMOVED***
***REMOVED***);

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
***REMOVED***;

$.fn.sidebar.settings = {

  name              : 'Sidebar',
  namespace         : 'sidebar',

  silent            : false,
  debug             : false,
  verbose           : false,
  performance       : true,

  transition        : 'auto',
  mobileTransition  : 'auto',

  defaultTransition : {
    computer: {
      left   : 'uncover',
      right  : 'uncover',
      top    : 'overlay',
      bottom : 'overlay'
  ***REMOVED***
    mobile: {
      left   : 'uncover',
      right  : 'uncover',
      top    : 'overlay',
      bottom : 'overlay'
  ***REMOVED***
***REMOVED***

  context           : 'body',
  exclusive         : false,
  closable          : true,
  dimPage           : true,
  scrollLock        : false,
  returnScroll      : false,
  delaySetup        : false,

  duration          : 500,

  onChange          : function(){***REMOVED***,
  onShow            : function(){***REMOVED***,
  onHide            : function(){***REMOVED***,

  onHidden          : function(){***REMOVED***,
  onVisible         : function(){***REMOVED***,

  className         : {
    active    : 'active',
    animating : 'animating',
    dimmed    : 'dimmed',
    ios       : 'ios',
    pushable  : 'pushable',
    pushed    : 'pushed',
    right     : 'right',
    top       : 'top',
    left      : 'left',
    bottom    : 'bottom',
    visible   : 'visible'
***REMOVED***

  selector: {
    fixed   : '.fixed',
    omitted : 'script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed',
    pusher  : '.pusher',
    sidebar : '.ui.sidebar'
***REMOVED***

  regExp: {
    ios          : /(iPad|iPhone|iPod)/g,
    mobileChrome : /(CriOS)/g,
    mobile       : /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g
***REMOVED***

  error   : {
    method       : 'The method you called is not defined.',
    pusher       : 'Had to add pusher element. For optimal performance make sure body content is inside a pusher element',
    movedSidebar : 'Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag',
    overlay      : 'The overlay setting is no longer supported, use animation: overlay',
    notFound     : 'There were no elements that matched the specified selector'
***REMOVED***

***REMOVED***;


***REMOVED***)( jQuery, window, document );
