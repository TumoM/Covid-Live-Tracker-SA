/*!
***REMOVED*** # Fomantic-UI - Popup
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

$.fn.popup = function(parameters) {
  var
    $allModules    = $(this),
    $document      = $(document),
    $window        = $(window),
    $body          = $('body'),

    moduleSelector = $allModules.selector || '',

    clickEvent      = ('ontouchstart' in document.documentElement)
        ? 'touchstart'
        : 'click',

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
        settings        = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.popup.settings, parameters)
          : $.extend({***REMOVED***, $.fn.popup.settings),

        selector           = settings.selector,
        className          = settings.className,
        error              = settings.error,
        metadata           = settings.metadata,
        namespace          = settings.namespace,

        eventNamespace     = '.' + settings.namespace,
        moduleNamespace    = 'module-' + namespace,

        $module            = $(this),
        $context           = $(settings.context),
        $scrollContext     = $(settings.scrollContext),
        $boundary          = $(settings.boundary),
        $target            = (settings.target)
          ? $(settings.target)
          : $module,

        $popup,
        $offsetParent,

        searchDepth        = 0,
        triedPositions     = false,
        openedWithTouch    = false,

        element            = this,
        instance           = $module.data(moduleNamespace),

        documentObserver,
        elementNamespace,
        id,
        module
      ;

      module = {

        // binds events
        initialize: function() {
          module.debug('Initializing', $module);
          module.createID();
          module.bind.events();
          if(!module.exists() && settings.preserve) {
            module.create();
        ***REMOVED***
          if(settings.observeChanges) {
            module.observeChanges();
        ***REMOVED***
          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance', module);
          instance = module;
          $module
            .data(moduleNamespace, instance)
          ;
 ***REMOVED*****REMOVED***

        observeChanges: function() {
          if('MutationObserver' in window) {
            documentObserver = new MutationObserver(module.event.documentChanged);
            documentObserver.observe(document, {
              childList : true,
              subtree   : true
          ***REMOVED***);
            module.debug('Setting up mutation observer', documentObserver);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        refresh: function() {
          if(settings.popup) {
            $popup = $(settings.popup).eq(0);
        ***REMOVED***
          else {
            if(settings.inline) {
              $popup = $target.nextAll(selector.popup).eq(0);
              settings.popup = $popup;
          ***REMOVED***
        ***REMOVED***
          if(settings.popup) {
            $popup.addClass(className.loading);
            $offsetParent = module.get.offsetParent();
            $popup.removeClass(className.loading);
            if(settings.movePopup && module.has.popup() && module.get.offsetParent($popup)[0] !== $offsetParent[0]) {
              module.debug('Moving popup to the same offset parent as target');
              $popup
                .detach()
                .appendTo($offsetParent)
              ;
          ***REMOVED***
        ***REMOVED***
          else {
            $offsetParent = (settings.inline)
              ? module.get.offsetParent($target)
              : module.has.popup()
                ? module.get.offsetParent($popup)
                : $body
            ;
        ***REMOVED***
          if( $offsetParent.is('html') && $offsetParent[0] !== $body[0] ) {
            module.debug('Setting page as offset parent');
            $offsetParent = $body;
        ***REMOVED***
          if( module.get.variation() ) {
            module.set.variation();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        reposition: function() {
          module.refresh();
          module.set.position();
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.debug('Destroying previous module');
          if(documentObserver) {
            documentObserver.disconnect();
        ***REMOVED***
          // remove element only if was created dynamically
          if($popup && !settings.preserve) {
            module.removePopup();
        ***REMOVED***
          // clear all timeouts
          clearTimeout(module.hideTimer);
          clearTimeout(module.showTimer);
          // remove events
          module.unbind.close();
          module.unbind.events();
          $module
            .removeData(moduleNamespace)
          ;
 ***REMOVED*****REMOVED***

        event: {
          start:  function(event) {
            var
              delay = ($.isPlainObject(settings.delay))
                ? settings.delay.show
                : settings.delay
            ;
            clearTimeout(module.hideTimer);
            if(!openedWithTouch || (openedWithTouch && settings.addTouchEvents) ) {
              module.showTimer = setTimeout(module.show, delay);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          end:  function() {
            var
              delay = ($.isPlainObject(settings.delay))
                ? settings.delay.hide
                : settings.delay
            ;
            clearTimeout(module.showTimer);
            module.hideTimer = setTimeout(module.hide, delay);
   ***REMOVED*****REMOVED***
          touchstart: function(event) {
            openedWithTouch = true;
            if(settings.addTouchEvents) {
              module.show();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          resize: function() {
            if( module.is.visible() ) {
              module.set.position();
          ***REMOVED***
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
          hideGracefully: function(event) {
            var
              $target = $(event.target),
              isInDOM = $.contains(document.documentElement, event.target),
              inPopup = ($target.closest(selector.popup).length > 0)
            ;
            // don't close on clicks inside popup
            if(event && !inPopup && isInDOM) {
              module.debug('Click occurred outside popup hiding popup');
              module.hide();
          ***REMOVED***
            else {
              module.debug('Click was inside popup, keeping popup open');
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        // generates popup html from metadata
        create: function() {
          var
            html      = module.get.html(),
            title     = module.get.title(),
            content   = module.get.content()
          ;

          if(html || content || title) {
            module.debug('Creating pop-up html');
            if(!html) {
              html = settings.templates.popup({
                title   : title,
                content : content
            ***REMOVED***);
          ***REMOVED***
            $popup = $('<div/>')
              .addClass(className.popup)
              .data(metadata.activator, $module)
              .html(html)
            ;
            if(settings.inline) {
              module.verbose('Inserting popup element inline', $popup);
              $popup
                .insertAfter($module)
              ;
          ***REMOVED***
            else {
              module.verbose('Appending popup element to body', $popup);
              $popup
                .appendTo( $context )
              ;
          ***REMOVED***
            module.refresh();
            module.set.variation();

            if(settings.hoverable) {
              module.bind.popup();
          ***REMOVED***
            settings.onCreate.call($popup, element);
        ***REMOVED***
          else if(settings.popup) {
            $(settings.popup).data(metadata.activator, $module);
            module.verbose('Used popup specified in settings');
            module.refresh();
            if(settings.hoverable) {
              module.bind.popup();
          ***REMOVED***
        ***REMOVED***
          else if($target.next(selector.popup).length !== 0) {
            module.verbose('Pre-existing popup found');
            settings.inline = true;
            settings.popup  = $target.next(selector.popup).data(metadata.activator, $module);
            module.refresh();
            if(settings.hoverable) {
              module.bind.popup();
          ***REMOVED***
        ***REMOVED***
          else {
            module.debug('No content specified skipping display', element);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        createID: function() {
          id = (Math.random().toString(16) + '000000000').substr(2, 8);
          elementNamespace = '.' + id;
          module.verbose('Creating unique id for element', id);
 ***REMOVED*****REMOVED***

        // determines popup state
        toggle: function() {
          module.debug('Toggling pop-up');
          if( module.is.hidden() ) {
            module.debug('Popup is hidden, showing pop-up');
            module.unbind.close();
            module.show();
        ***REMOVED***
          else {
            module.debug('Popup is visible, hiding pop-up');
            module.hide();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        show: function(callback) {
          callback = callback || function(){***REMOVED***;
          module.debug('Showing pop-up', settings.transition);
          if(module.is.hidden() && !( module.is.active() && module.is.dropdown()) ) {
            if( !module.exists() ) {
              module.create();
          ***REMOVED***
            if(settings.onShow.call($popup, element) === false) {
              module.debug('onShow callback returned false, cancelling popup animation');
              return;
          ***REMOVED***
            else if(!settings.preserve && !settings.popup) {
              module.refresh();
          ***REMOVED***
            if( $popup && module.set.position() ) {
              module.save.conditions();
              if(settings.exclusive) {
                module.hideAll();
            ***REMOVED***
              module.animate.show(callback);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***


        hide: function(callback) {
          callback = callback || function(){***REMOVED***;
          if( module.is.visible() || module.is.animating() ) {
            if(settings.onHide.call($popup, element) === false) {
              module.debug('onHide callback returned false, cancelling popup animation');
              return;
          ***REMOVED***
            module.remove.visible();
            module.unbind.close();
            module.restore.conditions();
            module.animate.hide(callback);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        hideAll: function() {
          $(selector.popup)
            .filter('.' + className.popupVisible)
            .each(function() {
              $(this)
                .data(metadata.activator)
                  .popup('hide')
              ;
          ***REMOVED***)
          ;
 ***REMOVED*****REMOVED***
        exists: function() {
          if(!$popup) {
            return false;
        ***REMOVED***
          if(settings.inline || settings.popup) {
            return ( module.has.popup() );
        ***REMOVED***
          else {
            return ( $popup.closest($context).length >= 1 )
              ? true
              : false
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        removePopup: function() {
          if( module.has.popup() && !settings.popup) {
            module.debug('Removing popup', $popup);
            $popup.remove();
            $popup = undefined;
            settings.onRemove.call($popup, element);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        save: {
          conditions: function() {
            module.cache = {
              title: $module.attr('title')
          ***REMOVED***;
            if (module.cache.title) {
              $module.removeAttr('title');
          ***REMOVED***
            module.verbose('Saving original attributes', module.cache.title);
        ***REMOVED***
 ***REMOVED*****REMOVED***
        restore: {
          conditions: function() {
            if(module.cache && module.cache.title) {
              $module.attr('title', module.cache.title);
              module.verbose('Restoring original attributes', module.cache.title);
          ***REMOVED***
            return true;
        ***REMOVED***
 ***REMOVED*****REMOVED***
        supports: {
          svg: function() {
            return (typeof SVGGraphicsElement !== 'undefined');
        ***REMOVED***
 ***REMOVED*****REMOVED***
        animate: {
          show: function(callback) {
            callback = $.isFunction(callback) ? callback : function(){***REMOVED***;
            if(settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              module.set.visible();
              $popup
                .transition({
                  animation  : settings.transition + ' in',
                  queue      : false,
                  debug      : settings.debug,
                  verbose    : settings.verbose,
                  duration   : settings.duration,
                  onComplete : function() {
                    module.bind.close();
                    callback.call($popup, element);
                    settings.onVisible.call($popup, element);
                ***REMOVED***
              ***REMOVED***)
              ;
          ***REMOVED***
            else {
              module.error(error.noTransition);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          hide: function(callback) {
            callback = $.isFunction(callback) ? callback : function(){***REMOVED***;
            module.debug('Hiding pop-up');
            if(settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              $popup
                .transition({
                  animation  : settings.transition + ' out',
                  queue      : false,
                  duration   : settings.duration,
                  debug      : settings.debug,
                  verbose    : settings.verbose,
                  onComplete : function() {
                    module.reset();
                    callback.call($popup, element);
                    settings.onHidden.call($popup, element);
                ***REMOVED***
              ***REMOVED***)
              ;
          ***REMOVED***
            else {
              module.error(error.noTransition);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        change: {
          content: function(html) {
            $popup.html(html);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          html: function() {
            $module.removeData(metadata.html);
            return $module.data(metadata.html) || settings.html;
   ***REMOVED*****REMOVED***
          title: function() {
            $module.removeData(metadata.title);
            return $module.data(metadata.title) || settings.title;
   ***REMOVED*****REMOVED***
          content: function() {
            $module.removeData(metadata.content);
            return $module.data(metadata.content) || settings.content || $module.attr('title');
   ***REMOVED*****REMOVED***
          variation: function() {
            $module.removeData(metadata.variation);
            return $module.data(metadata.variation) || settings.variation;
   ***REMOVED*****REMOVED***
          popup: function() {
            return $popup;
   ***REMOVED*****REMOVED***
          popupOffset: function() {
            return $popup.offset();
   ***REMOVED*****REMOVED***
          calculations: function() {
            var
              $popupOffsetParent = module.get.offsetParent($popup),
              targetElement      = $target[0],
              isWindow           = ($boundary[0] == window),
              targetPosition     = (settings.inline || (settings.popup && settings.movePopup))
                ? $target.position()
                : $target.offset(),
              screenPosition = (isWindow)
                ? { top: 0, left: 0 ***REMOVED***
                : $boundary.offset(),
              calculations   = {***REMOVED***,
              scroll = (isWindow)
                ? { top: $window.scrollTop(), left: $window.scrollLeft() ***REMOVED***
                : { top: 0, left: 0***REMOVED***,
              screen
            ;
            calculations = {
              // element which is launching popup
              target : {
                element : $target[0],
                width   : $target.outerWidth(),
                height  : $target.outerHeight(),
                top     : targetPosition.top,
                left    : targetPosition.left,
                margin  : {***REMOVED***
  ***REMOVED*****REMOVED*****REMOVED***
              // popup itself
              popup : {
                width  : $popup.outerWidth(),
                height : $popup.outerHeight()
  ***REMOVED*****REMOVED*****REMOVED***
              // offset container (or 3d context)
              parent : {
                width  : $offsetParent.outerWidth(),
                height : $offsetParent.outerHeight()
  ***REMOVED*****REMOVED*****REMOVED***
              // screen boundaries
              screen : {
                top  : screenPosition.top,
                left : screenPosition.left,
                scroll: {
                  top  : scroll.top,
                  left : scroll.left
    ***REMOVED*****REMOVED*****REMOVED***
                width  : $boundary.width(),
                height : $boundary.height()
            ***REMOVED***
          ***REMOVED***;

            // if popup offset context is not same as target, then adjust calculations
            if($popupOffsetParent.get(0) !== $offsetParent.get(0)) {
              var
                popupOffset        = $popupOffsetParent.offset()
              ;
              calculations.target.top -= popupOffset.top;
              calculations.target.left -= popupOffset.left;
              calculations.parent.width = $popupOffsetParent.outerWidth();
              calculations.parent.height = $popupOffsetParent.outerHeight();
          ***REMOVED***

            // add in container calcs if fluid
            if( settings.setFluidWidth && module.is.fluid() ) {
              calculations.container = {
                width: $popup.parent().outerWidth()
            ***REMOVED***;
              calculations.popup.width = calculations.container.width;
          ***REMOVED***

            // add in margins if inline
            calculations.target.margin.top = (settings.inline)
              ? parseInt( window.getComputedStyle(targetElement).getPropertyValue('margin-top'), 10)
              : 0
            ;
            calculations.target.margin.left = (settings.inline)
              ? module.is.rtl()
                ? parseInt( window.getComputedStyle(targetElement).getPropertyValue('margin-right'), 10)
                : parseInt( window.getComputedStyle(targetElement).getPropertyValue('margin-left'), 10)
              : 0
            ;
            // calculate screen boundaries
            screen = calculations.screen;
            calculations.boundary = {
              top    : screen.top + screen.scroll.top,
              bottom : screen.top + screen.scroll.top + screen.height,
              left   : screen.left + screen.scroll.left,
              right  : screen.left + screen.scroll.left + screen.width
          ***REMOVED***;
            return calculations;
   ***REMOVED*****REMOVED***
          id: function() {
            return id;
   ***REMOVED*****REMOVED***
          startEvent: function() {
            if(settings.on == 'hover') {
              return 'mouseenter';
          ***REMOVED***
            else if(settings.on == 'focus') {
              return 'focus';
          ***REMOVED***
            return false;
   ***REMOVED*****REMOVED***
          scrollEvent: function() {
            return 'scroll';
   ***REMOVED*****REMOVED***
          endEvent: function() {
            if(settings.on == 'hover') {
              return 'mouseleave';
          ***REMOVED***
            else if(settings.on == 'focus') {
              return 'blur';
          ***REMOVED***
            return false;
   ***REMOVED*****REMOVED***
          distanceFromBoundary: function(offset, calculations) {
            var
              distanceFromBoundary = {***REMOVED***,
              popup,
              boundary
            ;
            calculations = calculations || module.get.calculations();

            // shorthand
            popup        = calculations.popup;
            boundary     = calculations.boundary;

            if(offset) {
              distanceFromBoundary = {
                top    : (offset.top - boundary.top),
                left   : (offset.left - boundary.left),
                right  : (boundary.right - (offset.left + popup.width) ),
                bottom : (boundary.bottom - (offset.top + popup.height) )
            ***REMOVED***;
              module.verbose('Distance from boundaries determined', offset, distanceFromBoundary);
          ***REMOVED***
            return distanceFromBoundary;
   ***REMOVED*****REMOVED***
          offsetParent: function($element) {
            var
              element = ($element !== undefined)
                ? $element[0]
                : $target[0],
              parentNode = element.parentNode,
              $node    = $(parentNode)
            ;
            if(parentNode) {
              var
                is2D     = ($node.css('transform') === 'none'),
                isStatic = ($node.css('position') === 'static'),
                isBody   = $node.is('body')
              ;
              while(parentNode && !isBody && isStatic && is2D) {
                parentNode = parentNode.parentNode;
                $node    = $(parentNode);
                is2D     = ($node.css('transform') === 'none');
                isStatic = ($node.css('position') === 'static');
                isBody   = $node.is('body');
            ***REMOVED***
          ***REMOVED***
            return ($node && $node.length > 0)
              ? $node
              : $()
            ;
   ***REMOVED*****REMOVED***
          positions: function() {
            return {
              'top left'      : false,
              'top center'    : false,
              'top right'     : false,
              'bottom left'   : false,
              'bottom center' : false,
              'bottom right'  : false,
              'left center'   : false,
              'right center'  : false
          ***REMOVED***;
   ***REMOVED*****REMOVED***
          nextPosition: function(position) {
            var
              positions          = position.split(' '),
              verticalPosition   = positions[0],
              horizontalPosition = positions[1],
              opposite = {
                top    : 'bottom',
                bottom : 'top',
                left   : 'right',
                right  : 'left'
  ***REMOVED*****REMOVED*****REMOVED***
              adjacent = {
                left   : 'center',
                center : 'right',
                right  : 'left'
  ***REMOVED*****REMOVED*****REMOVED***
              backup = {
                'top left'      : 'top center',
                'top center'    : 'top right',
                'top right'     : 'right center',
                'right center'  : 'bottom right',
                'bottom right'  : 'bottom center',
                'bottom center' : 'bottom left',
                'bottom left'   : 'left center',
                'left center'   : 'top left'
  ***REMOVED*****REMOVED*****REMOVED***
              adjacentsAvailable = (verticalPosition == 'top' || verticalPosition == 'bottom'),
              oppositeTried = false,
              adjacentTried = false,
              nextPosition  = false
            ;
            if(!triedPositions) {
              module.verbose('All available positions available');
              triedPositions = module.get.positions();
          ***REMOVED***

            module.debug('Recording last position tried', position);
            triedPositions[position] = true;

            if(settings.prefer === 'opposite') {
              nextPosition  = [opposite[verticalPosition], horizontalPosition];
              nextPosition  = nextPosition.join(' ');
              oppositeTried = (triedPositions[nextPosition] === true);
              module.debug('Trying opposite strategy', nextPosition);
          ***REMOVED***
            if((settings.prefer === 'adjacent') && adjacentsAvailable ) {
              nextPosition  = [verticalPosition, adjacent[horizontalPosition]];
              nextPosition  = nextPosition.join(' ');
              adjacentTried = (triedPositions[nextPosition] === true);
              module.debug('Trying adjacent strategy', nextPosition);
          ***REMOVED***
            if(adjacentTried || oppositeTried) {
              module.debug('Using backup position', nextPosition);
              nextPosition = backup[position];
          ***REMOVED***
            return nextPosition;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          position: function(position, calculations) {

            // exit conditions
            if($target.length === 0 || $popup.length === 0) {
              module.error(error.notFound);
              return;
          ***REMOVED***
            var
              offset,
              distanceAway,
              target,
              popup,
              parent,
              positioning,
              popupOffset,
              distanceFromBoundary
            ;

            calculations = calculations || module.get.calculations();
            position     = position     || $module.data(metadata.position) || settings.position;

            offset       = $module.data(metadata.offset) || settings.offset;
            distanceAway = settings.distanceAway;

            // shorthand
            target = calculations.target;
            popup  = calculations.popup;
            parent = calculations.parent;

            if(module.should.centerArrow(calculations)) {
              module.verbose('Adjusting offset to center arrow on small target element');
              if(position == 'top left' || position == 'bottom left') {
                offset += (target.width / 2);
                offset -= settings.arrowPixelsFromEdge;
            ***REMOVED***
              if(position == 'top right' || position == 'bottom right') {
                offset -= (target.width / 2);
                offset += settings.arrowPixelsFromEdge;
            ***REMOVED***
          ***REMOVED***

            if(target.width === 0 && target.height === 0 && !module.is.svg(target.element)) {
              module.debug('Popup target is hidden, no action taken');
              return false;
          ***REMOVED***

            if(settings.inline) {
              module.debug('Adding margin to calculation', target.margin);
              if(position == 'left center' || position == 'right center') {
                offset       +=  target.margin.top;
                distanceAway += -target.margin.left;
            ***REMOVED***
              else if (position == 'top left' || position == 'top center' || position == 'top right') {
                offset       += target.margin.left;
                distanceAway -= target.margin.top;
            ***REMOVED***
              else {
                offset       += target.margin.left;
                distanceAway += target.margin.top;
            ***REMOVED***
          ***REMOVED***

            module.debug('Determining popup position from calculations', position, calculations);

            if (module.is.rtl()) {
              position = position.replace(/left|right/g, function (match) {
                return (match == 'left')
                  ? 'right'
                  : 'left'
                ;
            ***REMOVED***);
              module.debug('RTL: Popup position updated', position);
          ***REMOVED***

            // if last attempt use specified last resort position
            if(searchDepth == settings.maxSearchDepth && typeof settings.lastResort === 'string') {
              position = settings.lastResort;
          ***REMOVED***

            switch (position) {
              case 'top left':
                positioning = {
                  top    : 'auto',
                  bottom : parent.height - target.top + distanceAway,
                  left   : target.left + offset,
                  right  : 'auto'
              ***REMOVED***;
              break;
              case 'top center':
                positioning = {
                  bottom : parent.height - target.top + distanceAway,
                  left   : target.left + (target.width / 2) - (popup.width / 2) + offset,
                  top    : 'auto',
                  right  : 'auto'
              ***REMOVED***;
              break;
              case 'top right':
                positioning = {
                  bottom :  parent.height - target.top + distanceAway,
                  right  :  parent.width - target.left - target.width - offset,
                  top    : 'auto',
                  left   : 'auto'
              ***REMOVED***;
              break;
              case 'left center':
                positioning = {
                  top    : target.top + (target.height / 2) - (popup.height / 2) + offset,
                  right  : parent.width - target.left + distanceAway,
                  left   : 'auto',
                  bottom : 'auto'
              ***REMOVED***;
              break;
              case 'right center':
                positioning = {
                  top    : target.top + (target.height / 2) - (popup.height / 2) + offset,
                  left   : target.left + target.width + distanceAway,
                  bottom : 'auto',
                  right  : 'auto'
              ***REMOVED***;
              break;
              case 'bottom left':
                positioning = {
                  top    : target.top + target.height + distanceAway,
                  left   : target.left + offset,
                  bottom : 'auto',
                  right  : 'auto'
              ***REMOVED***;
              break;
              case 'bottom center':
                positioning = {
                  top    : target.top + target.height + distanceAway,
                  left   : target.left + (target.width / 2) - (popup.width / 2) + offset,
                  bottom : 'auto',
                  right  : 'auto'
              ***REMOVED***;
              break;
              case 'bottom right':
                positioning = {
                  top    : target.top + target.height + distanceAway,
                  right  : parent.width - target.left  - target.width - offset,
                  left   : 'auto',
                  bottom : 'auto'
              ***REMOVED***;
              break;
          ***REMOVED***
            if(positioning === undefined) {
              module.error(error.invalidPosition, position);
          ***REMOVED***

            module.debug('Calculated popup positioning values', positioning);

            // tentatively place on stage
            $popup
              .css(positioning)
              .removeClass(className.position)
              .addClass(position)
              .addClass(className.loading)
            ;

            popupOffset = module.get.popupOffset();

            // see if any boundaries are surpassed with this tentative position
            distanceFromBoundary = module.get.distanceFromBoundary(popupOffset, calculations);

            if(!settings.forcePosition && module.is.offstage(distanceFromBoundary, position) ) {
              module.debug('Position is outside viewport', position);
              if(searchDepth < settings.maxSearchDepth) {
                searchDepth++;
                position = module.get.nextPosition(position);
                module.debug('Trying new position', position);
                return ($popup)
                  ? module.set.position(position, calculations)
                  : false
                ;
            ***REMOVED***
              else {
                if(settings.lastResort) {
                  module.debug('No position found, showing with last position');
              ***REMOVED***
                else {
                  module.debug('Popup could not find a position to display', $popup);
                  module.error(error.cannotPlace, element);
                  module.remove.attempts();
                  module.remove.loading();
                  module.reset();
                  settings.onUnplaceable.call($popup, element);
                  return false;
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
            module.debug('Position is on stage', position);
            module.remove.attempts();
            module.remove.loading();
            if( settings.setFluidWidth && module.is.fluid() ) {
              module.set.fluidWidth(calculations);
          ***REMOVED***
            return true;
   ***REMOVED*****REMOVED***

          fluidWidth: function(calculations) {
            calculations = calculations || module.get.calculations();
            module.debug('Automatically setting element width to parent width', calculations.parent.width);
            $popup.css('width', calculations.container.width);
   ***REMOVED*****REMOVED***

          variation: function(variation) {
            variation = variation || module.get.variation();
            if(variation && module.has.popup() ) {
              module.verbose('Adding variation to popup', variation);
              $popup.addClass(variation);
          ***REMOVED***
   ***REMOVED*****REMOVED***

          visible: function() {
            $module.addClass(className.visible);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          loading: function() {
            $popup.removeClass(className.loading);
   ***REMOVED*****REMOVED***
          variation: function(variation) {
            variation = variation || module.get.variation();
            if(variation) {
              module.verbose('Removing variation', variation);
              $popup.removeClass(variation);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          visible: function() {
            $module.removeClass(className.visible);
   ***REMOVED*****REMOVED***
          attempts: function() {
            module.verbose('Resetting all searched positions');
            searchDepth    = 0;
            triedPositions = false;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            module.debug('Binding popup events to module');
            if(settings.on == 'click') {
              $module
                .on(clickEvent + eventNamespace, module.toggle)
              ;
          ***REMOVED***
            if(settings.on == 'hover') {
              $module
                .on('touchstart' + eventNamespace, module.event.touchstart)
              ;
          ***REMOVED***
            if( module.get.startEvent() ) {
              $module
                .on(module.get.startEvent() + eventNamespace, module.event.start)
                .on(module.get.endEvent() + eventNamespace, module.event.end)
              ;
          ***REMOVED***
            if(settings.target) {
              module.debug('Target set to element', $target);
          ***REMOVED***
            $window.on('resize' + elementNamespace, module.event.resize);
   ***REMOVED*****REMOVED***
          popup: function() {
            module.verbose('Allowing hover events on popup to prevent closing');
            if( $popup && module.has.popup() ) {
              $popup
                .on('mouseenter' + eventNamespace, module.event.start)
                .on('mouseleave' + eventNamespace, module.event.end)
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          close: function() {
            if(settings.hideOnScroll === true || (settings.hideOnScroll == 'auto' && settings.on != 'click')) {
              module.bind.closeOnScroll();
          ***REMOVED***
            if(module.is.closable()) {
              module.bind.clickaway();
          ***REMOVED***
            else if(settings.on == 'hover' && openedWithTouch) {
              module.bind.touchClose();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          closeOnScroll: function() {
            module.verbose('Binding scroll close event to document');
            $scrollContext
              .one(module.get.scrollEvent() + elementNamespace, module.event.hideGracefully)
            ;
   ***REMOVED*****REMOVED***
          touchClose: function() {
            module.verbose('Binding popup touchclose event to document');
            $document
              .on('touchstart' + elementNamespace, function(event) {
                module.verbose('Touched away from popup');
                module.event.hideGracefully.call(element, event);
            ***REMOVED***)
            ;
   ***REMOVED*****REMOVED***
          clickaway: function() {
            module.verbose('Binding popup close event to document');
            $document
              .on(clickEvent + elementNamespace, function(event) {
                module.verbose('Clicked away from popup');
                module.event.hideGracefully.call(element, event);
            ***REMOVED***)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        unbind: {
          events: function() {
            $window
              .off(elementNamespace)
            ;
            $module
              .off(eventNamespace)
            ;
   ***REMOVED*****REMOVED***
          close: function() {
            $document
              .off(elementNamespace)
            ;
            $scrollContext
              .off(elementNamespace)
            ;
   ***REMOVED*****REMOVED***
 ***REMOVED*****REMOVED***

        has: {
          popup: function() {
            return ($popup && $popup.length > 0);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        should: {
          centerArrow: function(calculations) {
            return !module.is.basic() && calculations.target.width <= (settings.arrowPixelsFromEdge***REMOVED*** 2);
   ***REMOVED*****REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          closable: function() {
            if(settings.closable == 'auto') {
              if(settings.on == 'hover') {
                return false;
            ***REMOVED***
              return true;
          ***REMOVED***
            return settings.closable;
   ***REMOVED*****REMOVED***
          offstage: function(distanceFromBoundary, position) {
            var
              offstage = []
            ;
            // return boundaries that have been surpassed
            $.each(distanceFromBoundary, function(direction, distance) {
              if(distance < -settings.jitter) {
                module.debug('Position exceeds allowable distance from edge', direction, distance, position);
                offstage.push(direction);
            ***REMOVED***
          ***REMOVED***);
            if(offstage.length > 0) {
              return true;
          ***REMOVED***
            else {
              return false;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          svg: function(element) {
            return module.supports.svg() && (element instanceof SVGGraphicsElement);
   ***REMOVED*****REMOVED***
          basic: function() {
            return $module.hasClass(className.basic);
   ***REMOVED*****REMOVED***
          active: function() {
            return $module.hasClass(className.active);
   ***REMOVED*****REMOVED***
          animating: function() {
            return ($popup !== undefined && $popup.hasClass(className.animating) );
   ***REMOVED*****REMOVED***
          fluid: function() {
            return ($popup !== undefined && $popup.hasClass(className.fluid));
   ***REMOVED*****REMOVED***
          visible: function() {
            return ($popup !== undefined && $popup.hasClass(className.popupVisible));
   ***REMOVED*****REMOVED***
          dropdown: function() {
            return $module.hasClass(className.dropdown);
   ***REMOVED*****REMOVED***
          hidden: function() {
            return !module.is.visible();
   ***REMOVED*****REMOVED***
          rtl: function () {
            return $module.attr('dir') === 'rtl' || $module.css('direction') === 'rtl';
        ***REMOVED***
 ***REMOVED*****REMOVED***

        reset: function() {
          module.remove.visible();
          if(settings.preserve) {
            if($.fn.transition !== undefined) {
              $popup
                .transition('remove transition')
              ;
          ***REMOVED***
        ***REMOVED***
          else {
            module.removePopup();
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

$.fn.popup.settings = {

  name           : 'Popup',

  // module settings
  silent         : false,
  debug          : false,
  verbose        : false,
  performance    : true,
  namespace      : 'popup',

  // whether it should use dom mutation observers
  observeChanges : true,

  // callback only when element added to dom
  onCreate       : function(){***REMOVED***,

  // callback before element removed from dom
  onRemove       : function(){***REMOVED***,

  // callback before show animation
  onShow         : function(){***REMOVED***,

  // callback after show animation
  onVisible      : function(){***REMOVED***,

  // callback before hide animation
  onHide         : function(){***REMOVED***,

  // callback when popup cannot be positioned in visible screen
  onUnplaceable  : function(){***REMOVED***,

  // callback after hide animation
  onHidden       : function(){***REMOVED***,

  // when to show popup
  on             : 'hover',

  // element to use to determine if popup is out of boundary
  boundary       : window,

  // whether to add touchstart events when using hover
  addTouchEvents : true,

  // default position relative to element
  position       : 'top left',

  // if given position should be used regardless if popup fits
  forcePosition  : false,

  // name of variation to use
  variation      : '',

  // whether popup should be moved to context
  movePopup      : true,

  // element which popup should be relative to
  target         : false,

  // jq selector or element that should be used as popup
  popup          : false,

  // popup should remain inline next to activator
  inline         : false,

  // popup should be removed from page on hide
  preserve       : false,

  // popup should not close when being hovered on
  hoverable      : false,

  // explicitly set content
  content        : false,

  // explicitly set html
  html           : false,

  // explicitly set title
  title          : false,

  // whether automatically close on clickaway when on click
  closable       : true,

  // automatically hide on scroll
  hideOnScroll   : 'auto',

  // hide other popups on show
  exclusive      : false,

  // context to attach popups
  context        : 'body',

  // context for binding scroll events
  scrollContext  : window,

  // position to prefer when calculating new position
  prefer         : 'opposite',

  // specify position to appear even if it doesn't fit
  lastResort     : false,

  // number of pixels from edge of popup to pointing arrow center (used from centering)
  arrowPixelsFromEdge: 20,

  // delay used to prevent accidental refiring of animations due to user error
  delay : {
    show : 50,
    hide : 70
***REMOVED***

  // whether fluid variation should assign width explicitly
  setFluidWidth  : true,

  // transition settings
  duration       : 200,
  transition     : 'scale',

  // distance away from activating element in px
  distanceAway   : 0,

  // number of pixels an element is allowed to be "offstage" for a position to be chosen (allows for rounding)
  jitter         : 2,

  // offset on aligning axis from calculated position
  offset         : 0,

  // maximum times to look for a position before failing (9 positions total)
  maxSearchDepth : 15,

  error: {
    invalidPosition : 'The position you specified is not a valid position',
    cannotPlace     : 'Popup does not fit within the boundaries of the viewport',
    method          : 'The method you called is not defined.',
    noTransition    : 'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>',
    notFound        : 'The target or popup you specified does not exist on the page'
***REMOVED***

  metadata: {
    activator : 'activator',
    content   : 'content',
    html      : 'html',
    offset    : 'offset',
    position  : 'position',
    title     : 'title',
    variation : 'variation'
***REMOVED***

  className   : {
    active       : 'active',
    basic        : 'basic',
    animating    : 'animating',
    dropdown     : 'dropdown',
    fluid        : 'fluid',
    loading      : 'loading',
    popup        : 'ui popup',
    position     : 'top left center bottom right',
    visible      : 'visible',
    popupVisible : 'visible'
***REMOVED***

  selector    : {
    popup    : '.ui.popup'
***REMOVED***

  templates: {
    escape: function(string) {
      var
        badChars     = /[<>"'`]/g,
        shouldEscape = /[&<>"'`]/,
        escape       = {
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
 ***REMOVED*****REMOVED***
        escapedChar  = function(chr) {
          return escape[chr];
      ***REMOVED***
      ;
      if(shouldEscape.test(string)) {
        string = string.replace(/&(?![a-z0-9#]{1,6***REMOVED***;)/, "&amp;");
        return string.replace(badChars, escapedChar);
    ***REMOVED***
      return string;
  ***REMOVED***
    popup: function(text) {
      var
        html   = '',
        escape = $.fn.popup.settings.templates.escape
      ;
      if(typeof text !== undefined) {
        if(typeof text.title !== undefined && text.title) {
          text.title = escape(text.title);
          html += '<div class="header">' + text.title + '</div>';
      ***REMOVED***
        if(typeof text.content !== undefined && text.content) {
          text.content = escape(text.content);
          html += '<div class="content">' + text.content + '</div>';
      ***REMOVED***
    ***REMOVED***
      return html;
  ***REMOVED***
***REMOVED***

***REMOVED***;


***REMOVED***)( jQuery, window, document );
