/*!
***REMOVED*** jQuery Mousewheel 3.1.12
***REMOVED***
***REMOVED*** Copyright 2014 jQuery Foundation and other contributors
***REMOVED*** Released under the MIT license.
***REMOVED*** http://jquery.org/license
***REMOVED***/

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
  ***REMOVED*** else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
  ***REMOVED*** else {
        // Browser globals
        factory(jQuery);
  ***REMOVED***
***REMOVED***(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
      ***REMOVED***
  ***REMOVED***

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
              ***REMOVED***
          ***REMOVED*** else {
                this.onmousewheel = handler;
          ***REMOVED***
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
 ***REMOVED*****REMOVED***

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
              ***REMOVED***
          ***REMOVED*** else {
                this.onmousewheel = null;
          ***REMOVED***
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
 ***REMOVED*****REMOVED***

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
          ***REMOVED***
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
 ***REMOVED*****REMOVED***

        getPageHeight: function(elem) {
            return $(elem).height();
 ***REMOVED*****REMOVED***

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
      ***REMOVED***
  ***REMOVED***;

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
 ***REMOVED*****REMOVED***

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
      ***REMOVED***
  ***REMOVED***);


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail***REMOVED*** -1;    ***REMOVED***
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;     ***REMOVED***
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;    ***REMOVED***
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX***REMOVED*** -1; ***REMOVED***

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY***REMOVED*** -1;
            deltaY = 0;
      ***REMOVED***

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY***REMOVED*** -1;
            delta  = deltaY;
      ***REMOVED***
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX***REMOVED*** -1; ***REMOVED***
      ***REMOVED***

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; ***REMOVED***

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //  ***REMOVED*** deltaMode 0 is by pixels, nothing to do
        //  ***REMOVED*** deltaMode 1 is by lines
        //  ***REMOVED*** deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta ***REMOVED***= lineHeight;
            deltaY***REMOVED***= lineHeight;
            deltaX***REMOVED***= lineHeight;
      ***REMOVED*** else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta ***REMOVED***= pageHeight;
            deltaY***REMOVED***= pageHeight;
            deltaX***REMOVED***= pageHeight;
      ***REMOVED***

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
          ***REMOVED***
      ***REMOVED***

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
      ***REMOVED***

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
      ***REMOVED***

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); ***REMOVED***
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
  ***REMOVED***

    function nullLowestDelta() {
        lowestDelta = null;
  ***REMOVED***

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
  ***REMOVED***

***REMOVED***));
