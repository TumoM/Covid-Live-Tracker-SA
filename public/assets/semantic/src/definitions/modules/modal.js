/*!
***REMOVED*** # Fomantic-UI - Modal
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

$.fn.modal = function(parameters) {
  var
    $allModules    = $(this),
    $window        = $(window),
    $document      = $(document),
    $body          = $('body'),

    moduleSelector = $allModules.selector || '',

    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),

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
        settings    = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.modal.settings, parameters)
          : $.extend({***REMOVED***, $.fn.modal.settings),

        selector        = settings.selector,
        className       = settings.className,
        namespace       = settings.namespace,
        error           = settings.error,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $module         = $(this),
        $context        = $(settings.context),
        $close          = $module.find(selector.close),

        $allModals,
        $otherModals,
        $focusedElement,
        $dimmable,
        $dimmer,

        element         = this,
        instance        = $module.data(moduleNamespace),

        ignoreRepeatedEvents = false,

        initialMouseDownInModal,
        initialMouseDownInScrollbar,
        initialBodyMargin = '',
        tempBodyMargin = '',

        elementEventNamespace,
        id,
        observer,
        module
      ;
      module  = {

        initialize: function() {
          module.cache = {***REMOVED***;
          module.verbose('Initializing dimmer', $context);

          module.create.id();
          module.create.dimmer();

          if ( settings.allowMultiple ) {
            module.create.innerDimmer();
        ***REMOVED***
          if (!settings.centered){
            $module.addClass('top aligned');
        ***REMOVED***
          module.refreshModals();

          module.bind.events();
          if(settings.observeChanges) {
            module.observeChanges();
        ***REMOVED***
          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of modal');
          instance = module;
          $module
            .data(moduleNamespace, instance)
          ;
 ***REMOVED*****REMOVED***

        create: {
          dimmer: function() {
            var
              defaultSettings = {
                debug      : settings.debug,
                dimmerName : 'modals'
  ***REMOVED*****REMOVED*****REMOVED***
              dimmerSettings = $.extend(true, defaultSettings, settings.dimmerSettings)
            ;
            if($.fn.dimmer === undefined) {
              module.error(error.dimmer);
              return;
          ***REMOVED***
            module.debug('Creating dimmer');
            $dimmable = $context.dimmer(dimmerSettings);
            if(settings.detachable) {
              module.verbose('Modal is detachable, moving content into dimmer');
              $dimmable.dimmer('add content', $module);
          ***REMOVED***
            else {
              module.set.undetached();
          ***REMOVED***
            $dimmer = $dimmable.dimmer('get dimmer');
   ***REMOVED*****REMOVED***
          id: function() {
            id = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementEventNamespace = '.' + id;
            module.verbose('Creating unique id for element', id);
   ***REMOVED*****REMOVED***
          innerDimmer: function() {
            if ( $module.find(selector.dimmer).length == 0 ) {
              $module.prepend('<div class="ui inverted dimmer"></div>');
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        destroy: function() {
          if (observer) {
            observer.disconnect();
        ***REMOVED***
          module.verbose('Destroying previous modal');
          $module
            .removeData(moduleNamespace)
            .off(eventNamespace)
          ;
          $window.off(elementEventNamespace);
          $dimmer.off(elementEventNamespace);
          $close.off(eventNamespace);
          $context.dimmer('destroy');
 ***REMOVED*****REMOVED***

        observeChanges: function() {
          if('MutationObserver' in window) {
            observer = new MutationObserver(function(mutations) {
              module.debug('DOM tree modified, refreshing');
              module.refresh();
          ***REMOVED***);
            observer.observe(element, {
              childList : true,
              subtree   : true
          ***REMOVED***);
            module.debug('Setting up mutation observer', observer);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        refresh: function() {
          module.remove.scrolling();
          module.cacheSizes();
          if(!module.can.useFlex()) {
            module.set.modalOffset();
        ***REMOVED***
          module.set.screenHeight();
          module.set.type();
 ***REMOVED*****REMOVED***

        refreshModals: function() {
          $otherModals = $module.siblings(selector.modal);
          $allModals   = $otherModals.add($module);
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
            module.debug('Attaching modal events to element', selector, event);
            $toggle
              .off(eventNamespace)
              .on('click' + eventNamespace, event)
            ;
        ***REMOVED***
          else {
            module.error(error.notFound, selector);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            module.verbose('Attaching events');
            $module
              .on('click' + eventNamespace, selector.close, module.event.close)
              .on('click' + eventNamespace, selector.approve, module.event.approve)
              .on('click' + eventNamespace, selector.deny, module.event.deny)
            ;
            $window
              .on('resize' + elementEventNamespace, module.event.resize)
            ;
   ***REMOVED*****REMOVED***
          scrollLock: function() {
            // touch events default to passive, due to changes in chrome to optimize mobile perf
            $dimmable.get(0).addEventListener('touchmove', module.event.preventScroll, { passive: false ***REMOVED***);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        unbind: {
          scrollLock: function() {
            $dimmable.get(0).removeEventListener('touchmove', module.event.preventScroll, { passive: false ***REMOVED***);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          id: function() {
            return (Math.random().toString(16) + '000000000').substr(2, 8);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          approve: function() {
            if(ignoreRepeatedEvents || settings.onApprove.call(element, $(this)) === false) {
              module.verbose('Approve callback returned false cancelling hide');
              return;
          ***REMOVED***
            ignoreRepeatedEvents = true;
            module.hide(function() {
              ignoreRepeatedEvents = false;
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          preventScroll: function(event) {
            if(event.target.className.indexOf('dimmer') !== -1) {
              event.preventDefault();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          deny: function() {
            if(ignoreRepeatedEvents || settings.onDeny.call(element, $(this)) === false) {
              module.verbose('Deny callback returned false cancelling hide');
              return;
          ***REMOVED***
            ignoreRepeatedEvents = true;
            module.hide(function() {
              ignoreRepeatedEvents = false;
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          close: function() {
            module.hide();
   ***REMOVED*****REMOVED***
          mousedown: function(event) {
            var
              $target   = $(event.target),
              isRtl = module.is.rtl();
            ;
            initialMouseDownInModal = ($target.closest(selector.modal).length > 0);
            if(initialMouseDownInModal) {
              module.verbose('Mouse down event registered inside the modal');
          ***REMOVED***
            initialMouseDownInScrollbar = module.is.scrolling() && ((!isRtl && $(window).outerWidth() - settings.scrollbarWidth <= event.clientX) || (isRtl && settings.scrollbarWidth >= event.clientX));
            if(initialMouseDownInScrollbar) {
              module.verbose('Mouse down event registered inside the scrollbar');
          ***REMOVED***
   ***REMOVED*****REMOVED***
          mouseup: function(event) {
            if(!settings.closable) {
              module.verbose('Dimmer clicked but closable setting is disabled');
              return;
          ***REMOVED***
            if(initialMouseDownInModal) {
              module.debug('Dimmer clicked but mouse down was initially registered inside the modal');
              return;
          ***REMOVED***
            if(initialMouseDownInScrollbar){
              module.debug('Dimmer clicked but mouse down was initially registered inside the scrollbar');
              return;
          ***REMOVED***
            var
              $target   = $(event.target),
              isInModal = ($target.closest(selector.modal).length > 0),
              isInDOM   = $.contains(document.documentElement, event.target)
            ;
            if(!isInModal && isInDOM && module.is.active() && $module.hasClass(className.front) ) {
              module.debug('Dimmer clicked, hiding all modals');
              if(settings.allowMultiple) {
                if(!module.hideAll()) {
                  return;
              ***REMOVED***
            ***REMOVED***
              else if(!module.hide()){
                  return;
            ***REMOVED***
              module.remove.clickaway();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          debounce: function(method, delay) {
            clearTimeout(module.timer);
            module.timer = setTimeout(method, delay);
   ***REMOVED*****REMOVED***
          keyboard: function(event) {
            var
              keyCode   = event.which,
              escapeKey = 27
            ;
            if(keyCode == escapeKey) {
              if(settings.closable) {
                module.debug('Escape key pressed hiding modal');
                if ( $module.hasClass(className.front) ) {
                  module.hide();
              ***REMOVED***
            ***REMOVED***
              else {
                module.debug('Escape key pressed, but closable is set to false');
            ***REMOVED***
              event.preventDefault();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          resize: function() {
            if( $dimmable.dimmer('is active') && ( module.is.animating() || module.is.active() ) ) {
              requestAnimationFrame(module.refresh);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        toggle: function() {
          if( module.is.active() || module.is.animating() ) {
            module.hide();
        ***REMOVED***
          else {
            module.show();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        show: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          module.refreshModals();
          module.set.dimmerSettings();
          module.set.dimmerStyles();

          module.showModal(callback);
 ***REMOVED*****REMOVED***

        hide: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          module.refreshModals();
          return module.hideModal(callback);
 ***REMOVED*****REMOVED***

        showModal: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          if( module.is.animating() || !module.is.active() ) {
            module.showDimmer();
            module.cacheSizes();
            module.set.bodyMargin();
            if(module.can.useFlex()) {
              module.remove.legacy();
          ***REMOVED***
            else {
              module.set.legacy();
              module.set.modalOffset();
              module.debug('Using non-flex legacy modal positioning.');
          ***REMOVED***
            module.set.screenHeight();
            module.set.type();
            module.set.clickaway();

            if( !settings.allowMultiple && module.others.active() ) {
              module.hideOthers(module.showModal);
          ***REMOVED***
            else {
              ignoreRepeatedEvents = false;
              if( settings.allowMultiple ) {
                if ( module.others.active() ) {
                  $otherModals.filter('.' + className.active).find(selector.dimmer).addClass('active');
              ***REMOVED***

                if ( settings.detachable ) {
                  $module.detach().appendTo($dimmer);
              ***REMOVED***
            ***REMOVED***
              settings.onShow.call(element);
              if(settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                module.debug('Showing modal with css animations');
                $module
                  .transition({
                    debug       : settings.debug,
                    animation   : settings.transition + ' in',
                    queue       : settings.queue,
                    duration    : settings.duration,
                    useFailSafe : true,
                    onComplete : function() {
                      settings.onVisible.apply(element);
                      if(settings.keyboardShortcuts) {
                        module.add.keyboardShortcuts();
                    ***REMOVED***
                      module.save.focus();
                      module.set.active();
                      if(settings.autofocus) {
                        module.set.autofocus();
                    ***REMOVED***
                      callback();
                  ***REMOVED***
                ***REMOVED***)
                ;
            ***REMOVED***
              else {
                module.error(error.noTransition);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
          else {
            module.debug('Modal is already visible');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        hideModal: function(callback, keepDimmed, hideOthersToo) {
          var
            $previousModal = $otherModals.filter('.' + className.active).last()
          ;
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          module.debug('Hiding modal');
          if(settings.onHide.call(element, $(this)) === false) {
            module.verbose('Hide callback returned false cancelling hide');
            ignoreRepeatedEvents = false;
            return false;
        ***REMOVED***

          if( module.is.animating() || module.is.active() ) {
            if(settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              module.remove.active();
              $module
                .transition({
                  debug       : settings.debug,
                  animation   : settings.transition + ' out',
                  queue       : settings.queue,
                  duration    : settings.duration,
                  useFailSafe : true,
                  onStart     : function() {
                    if(!module.others.active() && !module.others.animating() && !keepDimmed) {
                      module.hideDimmer();
                  ***REMOVED***
                    if( settings.keyboardShortcuts && !module.others.active() ) {
                      module.remove.keyboardShortcuts();
                  ***REMOVED***
      ***REMOVED*****REMOVED*****REMOVED***
                  onComplete : function() {
                    module.unbind.scrollLock();
                    if ( settings.allowMultiple ) {
                      $previousModal.addClass(className.front);
                      $module.removeClass(className.front);

                      if ( hideOthersToo ) {
                        $allModals.find(selector.dimmer).removeClass('active');
                    ***REMOVED***
                      else {
                        $previousModal.find(selector.dimmer).removeClass('active');
                    ***REMOVED***
                  ***REMOVED***
                    settings.onHidden.call(element);
                    module.remove.dimmerStyles();
                    module.restore.focus();
                    callback();
                ***REMOVED***
              ***REMOVED***)
              ;
          ***REMOVED***
            else {
              module.error(error.noTransition);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        showDimmer: function() {
          if($dimmable.dimmer('is animating') || !$dimmable.dimmer('is active') ) {
            module.save.bodyMargin();
            module.debug('Showing dimmer');
            $dimmable.dimmer('show');
        ***REMOVED***
          else {
            module.debug('Dimmer already visible');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        hideDimmer: function() {
          if( $dimmable.dimmer('is animating') || ($dimmable.dimmer('is active')) ) {
            module.unbind.scrollLock();
            $dimmable.dimmer('hide', function() {
              module.restore.bodyMargin();
              module.remove.clickaway();
              module.remove.screenHeight();
          ***REMOVED***);
        ***REMOVED***
          else {
            module.debug('Dimmer is not visible cannot hide');
            return;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        hideAll: function(callback) {
          var
            $visibleModals = $allModals.filter('.' + className.active + ', .' + className.animating)
          ;
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          if( $visibleModals.length > 0 ) {
            module.debug('Hiding all visible modals');
            var hideOk = true;
//check in reverse order trying to hide most top displayed modal first
            $($visibleModals.get().reverse()).each(function(index,element){
                if(hideOk){
                    hideOk = $(element).modal('hide modal', callback, false, true);
              ***REMOVED***
          ***REMOVED***);
            if(hideOk) {
              module.hideDimmer();
          ***REMOVED***
            return hideOk;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        hideOthers: function(callback) {
          var
            $visibleModals = $otherModals.filter('.' + className.active + ', .' + className.animating)
          ;
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          if( $visibleModals.length > 0 ) {
            module.debug('Hiding other modals', $otherModals);
            $visibleModals
              .modal('hide modal', callback, true)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        others: {
          active: function() {
            return ($otherModals.filter('.' + className.active).length > 0);
   ***REMOVED*****REMOVED***
          animating: function() {
            return ($otherModals.filter('.' + className.animating).length > 0);
        ***REMOVED***
 ***REMOVED*****REMOVED***


        add: {
          keyboardShortcuts: function() {
            module.verbose('Adding keyboard shortcuts');
            $document
              .on('keyup' + eventNamespace, module.event.keyboard)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        save: {
          focus: function() {
            var
              $activeElement = $(document.activeElement),
              inCurrentModal = $activeElement.closest($module).length > 0
            ;
            if(!inCurrentModal) {
              $focusedElement = $(document.activeElement).blur();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          bodyMargin: function() {
            initialBodyMargin = $body.css('margin-'+(module.can.leftBodyScrollbar() ? 'left':'right'));
            var bodyMarginRightPixel = parseInt(initialBodyMargin.replace(/[^\d.]/g, '')),
                bodyScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            tempBodyMargin = bodyMarginRightPixel + bodyScrollbarWidth;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        restore: {
          focus: function() {
            if($focusedElement && $focusedElement.length > 0 && settings.restoreFocus) {
              $focusedElement.focus();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          bodyMargin: function() {
            var position = module.can.leftBodyScrollbar() ? 'left':'right';
            $body.css('margin-'+position, initialBodyMargin);
            $body.find(selector.bodyFixed.replace('right',position)).css('padding-'+position, initialBodyMargin);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          active: function() {
            $module.removeClass(className.active);
   ***REMOVED*****REMOVED***
          legacy: function() {
            $module.removeClass(className.legacy);
   ***REMOVED*****REMOVED***
          clickaway: function() {
            if (!settings.detachable) {
              $module
                  .off('mousedown' + elementEventNamespace)
              ;
          ***REMOVED***           
            $dimmer
              .off('mousedown' + elementEventNamespace)
            ;
            $dimmer
              .off('mouseup' + elementEventNamespace)
            ;
   ***REMOVED*****REMOVED***
          dimmerStyles: function() {
            $dimmer.removeClass(className.inverted);
            $dimmable.removeClass(className.blurring);
   ***REMOVED*****REMOVED***
          bodyStyle: function() {
            if($body.attr('style') === '') {
              module.verbose('Removing style attribute');
              $body.removeAttr('style');
          ***REMOVED***
   ***REMOVED*****REMOVED***
          screenHeight: function() {
            module.debug('Removing page height');
            $body
              .css('height', '')
            ;
   ***REMOVED*****REMOVED***
          keyboardShortcuts: function() {
            module.verbose('Removing keyboard shortcuts');
            $document
              .off('keyup' + eventNamespace)
            ;
   ***REMOVED*****REMOVED***
          scrolling: function() {
            $dimmable.removeClass(className.scrolling);
            $module.removeClass(className.scrolling);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        cacheSizes: function() {
          $module.addClass(className.loading);
          var
            scrollHeight = $module.prop('scrollHeight'),
            modalWidth   = $module.outerWidth(),
            modalHeight  = $module.outerHeight()
          ;
          if(module.cache.pageHeight === undefined || modalHeight !== 0) {
            $.extend(module.cache, {
              pageHeight    : $(document).outerHeight(),
              width         : modalWidth,
              height        : modalHeight + settings.offset,
              scrollHeight  : scrollHeight + settings.offset,
              contextHeight : (settings.context == 'body')
                ? $(window).height()
                : $dimmable.height(),
          ***REMOVED***);
            module.cache.topOffset = -(module.cache.height / 2);
        ***REMOVED***
          $module.removeClass(className.loading);
          module.debug('Caching modal and container sizes', module.cache);
 ***REMOVED*****REMOVED***

        can: {
          leftBodyScrollbar: function(){
            if(module.cache.leftBodyScrollbar === undefined) {
              module.cache.leftBodyScrollbar = module.is.rtl() && ((module.is.iframe && !module.is.firefox()) || module.is.safari() || module.is.edge() || module.is.ie());
          ***REMOVED***
            return module.cache.leftBodyScrollbar;
   ***REMOVED*****REMOVED***
          useFlex: function() {
            if (settings.useFlex === 'auto') {
              return settings.detachable && !module.is.ie();
          ***REMOVED***
            if(settings.useFlex && module.is.ie()) {
              module.debug('useFlex true is not supported in IE');
          ***REMOVED*** else if(settings.useFlex && !settings.detachable) {
              module.debug('useFlex true in combination with detachable false is not supported');
          ***REMOVED***
            return settings.useFlex;
   ***REMOVED*****REMOVED***
          fit: function() {
            var
              contextHeight  = module.cache.contextHeight,
              verticalCenter = module.cache.contextHeight / 2,
              topOffset      = module.cache.topOffset,
              scrollHeight   = module.cache.scrollHeight,
              height         = module.cache.height,
              paddingHeight  = settings.padding,
              startPosition  = (verticalCenter + topOffset)
            ;
            return (scrollHeight > height)
              ? (startPosition + scrollHeight + paddingHeight < contextHeight)
              : (height + (paddingHeight***REMOVED*** 2) < contextHeight)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          active: function() {
            return $module.hasClass(className.active);
   ***REMOVED*****REMOVED***
          ie: function() {
            if(module.cache.isIE === undefined) {
              var
                  isIE11 = (!(window.ActiveXObject) && 'ActiveXObject' in window),
                  isIE = ('ActiveXObject' in window)
              ;
              module.cache.isIE = (isIE11 || isIE);
          ***REMOVED***
            return module.cache.isIE;
   ***REMOVED*****REMOVED***
          animating: function() {
            return $module.transition('is supported')
              ? $module.transition('is animating')
              : $module.is(':visible')
            ;
   ***REMOVED*****REMOVED***
          scrolling: function() {
            return $dimmable.hasClass(className.scrolling);
   ***REMOVED*****REMOVED***
          modernBrowser: function() {
            // appName for IE11 reports 'Netscape' can no longer use
            return !(window.ActiveXObject || 'ActiveXObject' in window);
   ***REMOVED*****REMOVED***
          rtl: function() {
            if(module.cache.isRTL === undefined) {
              module.cache.isRTL = $body.attr('dir') === 'rtl' || $body.css('direction') === 'rtl';
          ***REMOVED***
            return module.cache.isRTL;
   ***REMOVED*****REMOVED***
          safari: function() {
            if(module.cache.isSafari === undefined) {
              module.cache.isSafari = /constructor/i.test(window.HTMLElement) || !!window.ApplePaySession;
          ***REMOVED***
            return module.cache.isSafari;
   ***REMOVED*****REMOVED***
          edge: function(){
            if(module.cache.isEdge === undefined) {
              module.cache.isEdge = !!window.setImmediate && !module.is.ie();
          ***REMOVED***
            return module.cache.isEdge;
   ***REMOVED*****REMOVED***
          firefox: function(){
            if(module.cache.isFirefox === undefined) {
                module.cache.isFirefox = !!window.InstallTrigger;
          ***REMOVED***
            return module.cache.isFirefox;
   ***REMOVED*****REMOVED***
          iframe: function() {
              return !(self === top);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          autofocus: function() {
            var
              $inputs    = $module.find('[tabindex], :input').filter(':visible').filter(function() {
                return $(this).closest('.disabled').length === 0;
            ***REMOVED***),
              $autofocus = $inputs.filter('[autofocus]'),
              $input     = ($autofocus.length > 0)
                ? $autofocus.first()
                : $inputs.first()
            ;
            if($input.length > 0) {
              $input.focus();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          bodyMargin: function() {
            var position = module.can.leftBodyScrollbar() ? 'left':'right';
            if(settings.detachable || module.can.fit()) {
              $body.css('margin-'+position, tempBodyMargin + 'px');
          ***REMOVED***
            $body.find(selector.bodyFixed.replace('right',position)).css('padding-'+position, tempBodyMargin + 'px');
   ***REMOVED*****REMOVED***
          clickaway: function() {
            if (!settings.detachable) {
              $module
                .on('mousedown' + elementEventNamespace, module.event.mousedown)
              ;
          ***REMOVED***
            $dimmer
              .on('mousedown' + elementEventNamespace, module.event.mousedown)
            ;
            $dimmer
              .on('mouseup' + elementEventNamespace, module.event.mouseup)
            ;
   ***REMOVED*****REMOVED***
          dimmerSettings: function() {
            if($.fn.dimmer === undefined) {
              module.error(error.dimmer);
              return;
          ***REMOVED***
            var
              defaultSettings = {
                debug      : settings.debug,
                dimmerName : 'modals',
                closable   : 'auto',
                useFlex    : module.can.useFlex(),
                duration   : {
                  show     : settings.duration,
                  hide     : settings.duration
              ***REMOVED***
  ***REMOVED*****REMOVED*****REMOVED***
              dimmerSettings = $.extend(true, defaultSettings, settings.dimmerSettings)
            ;
            if(settings.inverted) {
              dimmerSettings.variation = (dimmerSettings.variation !== undefined)
                ? dimmerSettings.variation + ' inverted'
                : 'inverted'
              ;
          ***REMOVED***
            $context.dimmer('setting', dimmerSettings);
   ***REMOVED*****REMOVED***
          dimmerStyles: function() {
            if(settings.inverted) {
              $dimmer.addClass(className.inverted);
          ***REMOVED***
            else {
              $dimmer.removeClass(className.inverted);
          ***REMOVED***
            if(settings.blurring) {
              $dimmable.addClass(className.blurring);
          ***REMOVED***
            else {
              $dimmable.removeClass(className.blurring);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          modalOffset: function() {
            if (!settings.detachable) {
              var canFit = module.can.fit();
              $module
                .css({
                  top: (!$module.hasClass('aligned') && canFit)
                    ? $(document).scrollTop() + (module.cache.contextHeight - module.cache.height) / 2
                    : !canFit || $module.hasClass('top')
                      ? $(document).scrollTop() + settings.padding
                      : $(document).scrollTop() + (module.cache.contextHeight - module.cache.height - settings.padding),
                  marginLeft: -(module.cache.width / 2)
              ***REMOVED***) 
              ;
          ***REMOVED*** else {
              $module
                .css({
                  marginTop: (!$module.hasClass('aligned') && module.can.fit())
                    ? -(module.cache.height / 2)
                    : settings.padding / 2,
                  marginLeft: -(module.cache.width / 2)
              ***REMOVED***) 
              ;
          ***REMOVED***
            module.verbose('Setting modal offset for legacy mode');
   ***REMOVED*****REMOVED***
          screenHeight: function() {
            if( module.can.fit() ) {
              $body.css('height', '');
          ***REMOVED***
            else if(!$module.hasClass('bottom')) {
              module.debug('Modal is taller than page content, resizing page height');
              $body
                .css('height', module.cache.height + (settings.padding***REMOVED*** 2) )
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          active: function() {
            $module.addClass(className.active + ' ' + className.front);
            $otherModals.filter('.' + className.active).removeClass(className.front);
   ***REMOVED*****REMOVED***
          scrolling: function() {
            $dimmable.addClass(className.scrolling);
            $module.addClass(className.scrolling);
            module.unbind.scrollLock();
   ***REMOVED*****REMOVED***
          legacy: function() {
            $module.addClass(className.legacy);
   ***REMOVED*****REMOVED***
          type: function() {
            if(module.can.fit()) {
              module.verbose('Modal fits on screen');
              if(!module.others.active() && !module.others.animating()) {
                module.remove.scrolling();
                module.bind.scrollLock();
            ***REMOVED***
          ***REMOVED***
            else if (!$module.hasClass('bottom')){
              module.verbose('Modal cannot fit on screen setting to scrolling');
              module.set.scrolling();
          ***REMOVED*** else {
                module.verbose('Bottom aligned modal not fitting on screen is unsupported for scrolling');
          ***REMOVED***
   ***REMOVED*****REMOVED***
          undetached: function() {
            $dimmable.addClass(className.undetached);
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

$.fn.modal.settings = {

  name           : 'Modal',
  namespace      : 'modal',

  useFlex        : 'auto',
  offset         : 0,

  silent         : false,
  debug          : false,
  verbose        : false,
  performance    : true,

  observeChanges : false,

  allowMultiple  : false,
  detachable     : true,
  closable       : true,
  autofocus      : true,
  restoreFocus   : true,

  inverted       : false,
  blurring       : false,

  centered       : true,

  dimmerSettings : {
    closable : false,
    useCSS   : true
***REMOVED***

  // whether to use keyboard shortcuts
  keyboardShortcuts: true,

  context    : 'body',

  queue      : false,
  duration   : 500,
  transition : 'scale',

  // padding with edge of page
  padding    : 50,
  scrollbarWidth: 10,

  // called before show animation
  onShow     : function(){***REMOVED***,

  // called after show animation
  onVisible  : function(){***REMOVED***,

  // called before hide animation
  onHide     : function(){ return true; ***REMOVED***,

  // called after hide animation
  onHidden   : function(){***REMOVED***,

  // called after approve selector match
  onApprove  : function(){ return true; ***REMOVED***,

  // called after deny selector match
  onDeny     : function(){ return true; ***REMOVED***,

  selector    : {
    close    : '> .close',
    approve  : '.actions .positive, .actions .approve, .actions .ok',
    deny     : '.actions .negative, .actions .deny, .actions .cancel',
    modal    : '.ui.modal',
    dimmer   : '> .ui.dimmer',
    bodyFixed: '> .ui.fixed.menu, > .ui.right.toast-container, > .ui.right.sidebar'
***REMOVED***
  error : {
    dimmer    : 'UI Dimmer, a required component is not included in this page',
    method    : 'The method you called is not defined.',
    notFound  : 'The element you specified could not be found'
***REMOVED***
  className : {
    active     : 'active',
    animating  : 'animating',
    blurring   : 'blurring',
    inverted   : 'inverted',
    legacy     : 'legacy',
    loading    : 'loading',
    scrolling  : 'scrolling',
    undetached : 'undetached',
    front      : 'front'
***REMOVED***
***REMOVED***;


***REMOVED***)( jQuery, window, document );
