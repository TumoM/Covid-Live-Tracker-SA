/*!
***REMOVED*** # Fomantic-UI - Slider
***REMOVED*** http://github.com/fomantic/Fomantic-UI/
***REMOVED***
***REMOVED***
***REMOVED*** Released under the MIT license
***REMOVED*** http://opensource.org/licenses/MIT
***REMOVED***
***REMOVED***/

;(function ( $, window, document, undefined ) {

"use strict";

window = (typeof window != 'undefined' && window.Math == Math)
  ? window
  : (typeof self != 'undefined' && self.Math == Math)
    ? self
    : Function('return this')()
;

$.fn.slider = function(parameters) {

  var
    $allModules    = $(this),
    $window        = $(window),

    moduleSelector = $allModules.selector || '',

    time           = new Date().getTime(),
    performance    = [],

    query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1),

    alphabet       = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

    SINGLE_STEP     = 1,
    BIG_STEP        = 2,
    NO_STEP         = 0,
    SINGLE_BACKSTEP = -1,
    BIG_BACKSTEP    = -2,

    // Used to manage document bound events.
    // Use this so that we can distinguish between which document events are bound to which range.
    currentRange    = 0,

    returnedValue
  ;

  $allModules
    .each(function() {

      var
        settings        = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.slider.settings, parameters)
          : $.extend({***REMOVED***, $.fn.slider.settings),

        className       = settings.className,
        metadata        = settings.metadata,
        namespace       = settings.namespace,
        error           = settings.error,
        keys            = settings.keys,
        interpretLabel  = settings.interpretLabel,

        isHover         = false,
        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $module         = $(this),
        $currThumb,
        $thumb,
        $secondThumb,
        $track,
        $trackFill,
        $labels,

        element         = this,
        instance        = $module.data(moduleNamespace),

        documentEventID,

        value,
        position,
        secondPos,
        offset,
        precision,
        isTouch,
        gapRatio = 1,

        initialPosition,
        initialLoad,
        module
      ;

      module = {

        initialize: function() {
          module.debug('Initializing slider', settings);
          initialLoad = true;

          currentRange += 1;
          documentEventID = currentRange;

          isTouch = module.setup.testOutTouch();
          module.setup.layout();
          module.setup.labels();

          if(!module.is.disabled()) {
            module.bind.events();
        ***REMOVED***

          module.read.metadata();
          module.read.settings();

          initialLoad = false;
          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of slider', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.verbose('Destroying previous slider for', $module);
          clearInterval(instance.interval);
          module.unbind.events();
          module.unbind.slidingEvents();
          $module.removeData(moduleNamespace);
          instance = undefined;
 ***REMOVED*****REMOVED***

        setup: {
          layout: function() {
            if( $module.attr('tabindex') === undefined) {
              $module.attr('tabindex', 0);
          ***REMOVED***
            if($module.find('.inner').length == 0) {
              $module.append("<div class='inner'>"
                             + "<div class='track'></div>"
                             + "<div class='track-fill'></div>"
                             + "<div class='thumb'></div>"
                             + "</div>");
          ***REMOVED***
            precision = module.get.precision();
            $thumb = $module.find('.thumb:not(.second)');
            $currThumb = $thumb;
            if(module.is.range()) {
              if($module.find('.thumb.second').length == 0) {
                $module.find('.inner').append("<div class='thumb second'></div>");
            ***REMOVED***
              $secondThumb = $module.find('.thumb.second');
          ***REMOVED***
            $track = $module.find('.track');
            $trackFill = $module.find('.track-fill');
            offset = $thumb.width() / 2;
   ***REMOVED*****REMOVED***
          labels: function() {
            if(module.is.labeled()) {
              $labels = $module.find('.labels:not(.auto)');
              if($labels.length != 0) {
                module.setup.customLabel();
            ***REMOVED*** else {
                module.setup.autoLabel();
            ***REMOVED***

              if (settings.showLabelTicks) {
                $module.addClass(className.ticked)
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          testOutTouch: function() {
            try {
             document.createEvent('TouchEvent');
             return true;
          ***REMOVED*** catch (e) {
             return false;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          customLabel: function() {
            var
              $children   = $labels.find('.label'),
              numChildren = $children.length,
              min         = module.get.min(),
              max         = module.get.max(),
              ratio
            ;
            $children.each(function(index) {
              var
                $child = $(this),
                attrValue = $child.attr('data-value')
              ;
              if(attrValue) {
                attrValue = attrValue > max ? max : attrValue < min ? min : attrValue;
                ratio = (attrValue - min) / (max - min);
            ***REMOVED*** else {
                ratio = (index + 1) / (numChildren + 1);
            ***REMOVED***
              module.update.labelPosition(ratio, $(this));
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          autoLabel: function() {
            if(module.get.step() != 0) {
              $labels = $module.find('.labels');
              if($labels.length != 0) {
                $labels.empty();
            ***REMOVED***
              else {
                $labels = $module.append('<ul class="auto labels"></ul>').find('.labels');
            ***REMOVED***
              for(var i = 0, len = module.get.numLabels(); i <= len; i++) {
                var
                  labelText = module.get.label(i),
                  $label = (labelText !== "") 
                    ? !(i % module.get.gapRatio())
                      ? $('<li class="label">' + labelText + '</li>') 
                      : $('<li class="halftick label"></li>')
                    : null,
                  ratio  = i / len
                ;
                if($label) {
                  module.update.labelPosition(ratio, $label);
                  $labels.append($label);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            module.bind.globalKeyboardEvents();
            module.bind.keyboardEvents();
            module.bind.mouseEvents();
            if(module.is.touch()) {
              module.bind.touchEvents();
          ***REMOVED***
            if (settings.autoAdjustLabels) {
              module.bind.windowEvents();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          keyboardEvents: function() {
            module.verbose('Binding keyboard events');
            $module.on('keydown' + eventNamespace, module.event.keydown);
   ***REMOVED*****REMOVED***
          globalKeyboardEvents: function() {
            $(document).on('keydown' + eventNamespace + documentEventID, module.event.activateFocus);
   ***REMOVED*****REMOVED***
          mouseEvents: function() {
            module.verbose('Binding mouse events');
            $module.find('.track, .thumb, .inner').on('mousedown' + eventNamespace, function(event) {
              event.stopImmediatePropagation();
              event.preventDefault();
              module.event.down(event);
          ***REMOVED***);
            $module.on('mousedown' + eventNamespace, module.event.down);
            $module.on('mouseenter' + eventNamespace, function(event) {
              isHover = true;
          ***REMOVED***);
            $module.on('mouseleave' + eventNamespace, function(event) {
              isHover = false;
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          touchEvents: function() {
            module.verbose('Binding touch events');
            $module.find('.track, .thumb, .inner').on('touchstart' + eventNamespace, function(event) {
              event.stopImmediatePropagation();
              event.preventDefault();
              module.event.down(event);
          ***REMOVED***);
            $module.on('touchstart' + eventNamespace, module.event.down);
   ***REMOVED*****REMOVED***
          slidingEvents: function() {
            // these don't need the identifier because we only ever want one of them to be registered with document
            module.verbose('Binding page wide events while handle is being draged');
            if(module.is.touch()) {
              $(document).on('touchmove' + eventNamespace, module.event.move);
              $(document).on('touchend' + eventNamespace, module.event.up);
          ***REMOVED***
            else {
              $(document).on('mousemove' + eventNamespace, module.event.move);
              $(document).on('mouseup' + eventNamespace, module.event.up);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          windowEvents: function() {
            $window.on('resize' + eventNamespace, module.event.resize);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        unbind: {
          events: function() {
            $module.find('.track, .thumb, .inner').off('mousedown' + eventNamespace);
            $module.find('.track, .thumb, .inner').off('touchstart' + eventNamespace);
            $module.off('mousedown' + eventNamespace);
            $module.off('mouseenter' + eventNamespace);
            $module.off('mouseleave' + eventNamespace);
            $module.off('touchstart' + eventNamespace);
            $module.off('keydown' + eventNamespace);
            $module.off('focusout' + eventNamespace);
            $(document).off('keydown' + eventNamespace + documentEventID, module.event.activateFocus);
            $window.off('resize' + eventNamespace);
   ***REMOVED*****REMOVED***
          slidingEvents: function() {
            if(module.is.touch()) {
              $(document).off('touchmove' + eventNamespace);
              $(document).off('touchend' + eventNamespace);
          ***REMOVED*** else {
              $(document).off('mousemove' + eventNamespace);
              $(document).off('mouseup' + eventNamespace);
          ***REMOVED***
   ***REMOVED*****REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          down: function(event) {
            event.preventDefault();
            if(module.is.range()) {
              var
                eventPos = module.determine.eventPos(event),
                newPos = module.determine.pos(eventPos)
              ;
              // Special handling if range mode and both thumbs have the same value
              if(settings.preventCrossover && module.is.range() && module.thumbVal === module.secondThumbVal) {
                initialPosition = newPos;
                $currThumb = undefined;
            ***REMOVED*** else {
                $currThumb = module.determine.closestThumb(newPos);
            ***REMOVED***
          ***REMOVED***
            if(!module.is.disabled()) {
              module.bind.slidingEvents();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          move: function(event) {
            event.preventDefault();
            var value = module.determine.valueFromEvent(event);
            if($currThumb === undefined) {
              var
                eventPos = module.determine.eventPos(event),
                newPos = module.determine.pos(eventPos)
              ;
              $currThumb = initialPosition > newPos ? $thumb : $secondThumb;
          ***REMOVED***
            if(module.get.step() == 0 || module.is.smooth()) {
              var
                thumbVal = module.thumbVal,
                secondThumbVal = module.secondThumbVal,
                thumbSmoothVal = module.determine.smoothValueFromEvent(event)
              ;
              if(!$currThumb.hasClass('second')) {
                if(settings.preventCrossover && module.is.range()) {
                  value = Math.min(secondThumbVal, value);
                  thumbSmoothVal = Math.min(secondThumbVal, thumbSmoothVal);
              ***REMOVED***
                thumbVal = value;
            ***REMOVED*** else {
                if(settings.preventCrossover && module.is.range()) {
                  value = Math.max(thumbVal, value);
                  thumbSmoothVal = Math.max(thumbVal, thumbSmoothVal);
              ***REMOVED***
                secondThumbVal = value;
            ***REMOVED***
              value = Math.abs(thumbVal - (secondThumbVal || 0));
              module.update.position(thumbSmoothVal);
              settings.onMove.call(element, value, thumbVal, secondThumbVal);
          ***REMOVED*** else {
              module.update.value(value, function(value, thumbVal, secondThumbVal) {
                settings.onMove.call(element, value, thumbVal, secondThumbVal);
            ***REMOVED***);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          up: function(event) {
            event.preventDefault();
            var value = module.determine.valueFromEvent(event);
            module.set.value(value);
            module.unbind.slidingEvents();
   ***REMOVED*****REMOVED***
          keydown: function(event, first) {
            if(settings.preventCrossover && module.is.range() && module.thumbVal === module.secondThumbVal) {
              $currThumb = undefined;
          ***REMOVED***
            if(module.is.focused()) {
              $(document).trigger(event);
          ***REMOVED***
            if(first || module.is.focused()) {
              var step = module.determine.keyMovement(event);
              if(step != NO_STEP) {
                event.preventDefault();
                switch(step) {
                  case SINGLE_STEP:
                    module.takeStep();
                    break;
                  case BIG_STEP:
                    module.takeStep(module.get.multiplier());
                    break;
                  case SINGLE_BACKSTEP:
                    module.backStep();
                    break;
                  case BIG_BACKSTEP:
                    module.backStep(module.get.multiplier());
                    break;
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          activateFocus: function(event) {
            if(!module.is.focused() && module.is.hover() && module.determine.keyMovement(event) != NO_STEP) {
              event.preventDefault();
              module.event.keydown(event, true);
              $module.focus();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          resize: function(_event) {
            // To avoid a useless performance cost, we only call the label refresh when its necessary
            if (gapRatio != module.get.gapRatio()) {
              module.setup.labels();
              gapRatio = module.get.gapRatio();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        resync: function() {
          module.verbose('Resyncing thumb position based on value');
          if(module.is.range()) {
            module.update.position(module.secondThumbVal, $secondThumb);
        ***REMOVED***
          module.update.position(module.thumbVal, $thumb);
          module.setup.labels();
 ***REMOVED*****REMOVED***
        takeStep: function(multiplier) {
          var
            multiplier = multiplier != undefined ? multiplier : 1,
            step = module.get.step(),
            currValue = module.get.currentThumbValue()
          ;
          module.verbose('Taking a step');
          if(step > 0) {
            module.set.value(currValue + step***REMOVED*** multiplier);
        ***REMOVED*** else if (step == 0){
            var
              precision = module.get.precision(),
              newValue = currValue + (multiplier/precision)
            ;
            module.set.value(Math.round(newValue***REMOVED*** precision) / precision);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        backStep: function(multiplier) {
          var
            multiplier = multiplier != undefined ? multiplier : 1,
            step = module.get.step(),
            currValue = module.get.currentThumbValue()
          ;
          module.verbose('Going back a step');
          if(step > 0) {
            module.set.value(currValue - step***REMOVED*** multiplier);
        ***REMOVED*** else if (step == 0) {
            var
              precision = module.get.precision(),
              newValue = currValue - (multiplier/precision)
            ;
            module.set.value(Math.round(newValue***REMOVED*** precision) / precision);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          range: function() {
            return $module.hasClass(settings.className.range);
   ***REMOVED*****REMOVED***
          hover: function() {
            return isHover;
   ***REMOVED*****REMOVED***
          focused: function() {
            return $module.is(':focus');
   ***REMOVED*****REMOVED***
          disabled: function() {
            return $module.hasClass(settings.className.disabled);
   ***REMOVED*****REMOVED***
          labeled: function() {
            return $module.hasClass(settings.className.labeled);
   ***REMOVED*****REMOVED***
          reversed: function() {
            return $module.hasClass(settings.className.reversed);
   ***REMOVED*****REMOVED***
          vertical: function() {
            return $module.hasClass(settings.className.vertical);
   ***REMOVED*****REMOVED***
          smooth: function() {
            return settings.smooth || $module.hasClass(settings.className.smooth);
   ***REMOVED*****REMOVED***
          touch: function() {
            return isTouch;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          trackOffset: function() {
            if (module.is.vertical()) {
              return $track.offset().top;
          ***REMOVED*** else {
              return $track.offset().left;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          trackLength: function() {
            if (module.is.vertical()) {
              return $track.height();
          ***REMOVED*** else {
              return $track.width();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          trackLeft: function() {
            if (module.is.vertical()) {
              return $track.position().top;
          ***REMOVED*** else {
              return $track.position().left;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          trackStartPos: function() {
            return module.is.reversed() ? module.get.trackLeft() + module.get.trackLength() : module.get.trackLeft();
   ***REMOVED*****REMOVED***
          trackEndPos: function() {
            return module.is.reversed() ? module.get.trackLeft() : module.get.trackLeft() + module.get.trackLength();
   ***REMOVED*****REMOVED***
          trackStartMargin: function () {
            var margin;
            if (module.is.vertical()) {
              margin = module.is.reversed() ? $module.css('padding-bottom') : $module.css('padding-top');
          ***REMOVED*** else {
              margin = module.is.reversed() ? $module.css('padding-right') : $module.css('padding-left');
          ***REMOVED***
            return margin || '0px';
   ***REMOVED*****REMOVED***
          trackEndMargin: function () {
            var margin;
            if (module.is.vertical()) {
              margin = module.is.reversed() ? $module.css('padding-top') : $module.css('padding-bottom');
          ***REMOVED*** else {
              margin = module.is.reversed() ? $module.css('padding-left') : $module.css('padding-right');
          ***REMOVED***
            return margin || '0px';
   ***REMOVED*****REMOVED***
          precision: function() {
            var
              decimalPlaces,
              step = module.get.step()
            ;
            if(step != 0) {
              var split = String(step).split('.');
              if(split.length == 2) {
                decimalPlaces = split[1].length;
            ***REMOVED*** else {
                decimalPlaces = 0;
            ***REMOVED***
          ***REMOVED*** else {
              decimalPlaces = settings.decimalPlaces;
          ***REMOVED***
            var precision = Math.pow(10, decimalPlaces);
            module.debug('Precision determined', precision);
            return precision;
   ***REMOVED*****REMOVED***
          min: function() {
            return settings.min;
   ***REMOVED*****REMOVED***
          max: function() {
            var step = module.get.step(),
                min = module.get.min(),
                quotient = step === 0 ? 0 : Math.floor((settings.max - min) / step),
                remainder = step === 0 ? 0 : (settings.max - min) % step;
            return remainder === 0 ? settings.max : min + quotient***REMOVED*** step;
   ***REMOVED*****REMOVED***
          step: function() {
            return settings.step;
   ***REMOVED*****REMOVED***
          numLabels: function() {
            var value = Math.round((module.get.max() - module.get.min()) / module.get.step());
            module.debug('Determined that there should be ' + value + ' labels');
            return value;
   ***REMOVED*****REMOVED***
          labelType: function() {
            return settings.labelType;
   ***REMOVED*****REMOVED***
          label: function(value) {
            if(interpretLabel) {
              return interpretLabel(value);
          ***REMOVED***

            switch (settings.labelType) {
              case settings.labelTypes.number:
                return Math.round(((value***REMOVED*** module.get.step()) + module.get.min())***REMOVED*** precision ) / precision;
              case settings.labelTypes.letter:
                return alphabet[(value) % 26];
              default:
                return value;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          value: function() {
            return value;
   ***REMOVED*****REMOVED***
          currentThumbValue: function() {
            return $currThumb !== undefined && $currThumb.hasClass('second') ? module.secondThumbVal : module.thumbVal;
   ***REMOVED*****REMOVED***
          thumbValue: function(which) {
            switch(which) {
              case 'second':
                if(module.is.range()) {
                  return module.secondThumbVal;
              ***REMOVED***
                else {
                  module.error(error.notrange);
                  break;
              ***REMOVED***
              case 'first':
              default:
                return module.thumbVal;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          multiplier: function() {
            return settings.pageMultiplier;
   ***REMOVED*****REMOVED***
          thumbPosition: function(which) {
            switch(which) {
              case 'second':
                if(module.is.range()) {
                  return secondPos;
              ***REMOVED***
                else {
                  module.error(error.notrange);
                  break;
              ***REMOVED***
              case 'first':
              default:
                return position;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          gapRatio: function() {
            var gapRatio = 1;
            
            if( settings.autoAdjustLabels ) {
              var 
                numLabels = module.get.numLabels(),
                trackLength = module.get.trackLength(),
                gapCounter = 1
              ;

              // While the distance between two labels is too short,
              // we divide the number of labels at each iteration
              // and apply only if the modulo of the operation is an odd number.
              if(trackLength>0){
                while ((trackLength / numLabels)***REMOVED*** gapCounter < settings.labelDistance) {
                  if( !(numLabels % gapCounter) ) {
                    gapRatio = gapCounter;
                ***REMOVED***
                  gapCounter += 1;
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
            return gapRatio;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        determine: {
          pos: function(pagePos) {
            return module.is.reversed()
              ?
              module.get.trackStartPos() - pagePos + module.get.trackOffset()
              :
              pagePos - module.get.trackOffset() - module.get.trackStartPos()
            ;
   ***REMOVED*****REMOVED***
          closestThumb: function(eventPos) {
            var
              thumbPos = parseFloat(module.determine.thumbPos($thumb)),
              thumbDelta = Math.abs(eventPos - thumbPos),
              secondThumbPos = parseFloat(module.determine.thumbPos($secondThumb)),
              secondThumbDelta = Math.abs(eventPos - secondThumbPos)
            ;
            if(thumbDelta === secondThumbDelta && module.get.thumbValue() === module.get.min()) {
              return $secondThumb;
          ***REMOVED***
            return thumbDelta <= secondThumbDelta ? $thumb : $secondThumb;
   ***REMOVED*****REMOVED***
          closestThumbPos: function(eventPos) {
            var
              thumbPos = parseFloat(module.determine.thumbPos($thumb)),
              thumbDelta = Math.abs(eventPos - thumbPos),
              secondThumbPos = parseFloat(module.determine.thumbPos($secondThumb)),
              secondThumbDelta = Math.abs(eventPos - secondThumbPos)
            ;
            return thumbDelta <= secondThumbDelta ? thumbPos : secondThumbPos;
   ***REMOVED*****REMOVED***
          thumbPos: function($element) {
            var pos =
              module.is.vertical()
              ?
              module.is.reversed() ? $element.css('bottom') : $element.css('top')
              :
              module.is.reversed() ? $element.css('right') : $element.css('left')
            ;
            return pos;
   ***REMOVED*****REMOVED***
          positionFromValue: function(value) {
            var
              min = module.get.min(),
              max = module.get.max(),
              value = value > max ? max : value < min ? min : value,
              trackLength = module.get.trackLength(),
              ratio = (value - min) / (max - min),
              position = Math.round(ratio***REMOVED*** trackLength)
            ;
            module.verbose('Determined position: ' + position + ' from value: ' + value);
            return position;
   ***REMOVED*****REMOVED***
          positionFromRatio: function(ratio) {
            var
              trackLength = module.get.trackLength(),
              step = module.get.step(),
              position = Math.round(ratio***REMOVED*** trackLength),
              adjustedPos = (step == 0) ? position : Math.round(position / step)***REMOVED*** step
            ;
            return adjustedPos;
   ***REMOVED*****REMOVED***
          valueFromEvent: function(event) {
            var
              eventPos = module.determine.eventPos(event),
              newPos = module.determine.pos(eventPos),
              value
            ;
            if(eventPos < module.get.trackOffset()) {
              value = module.is.reversed() ? module.get.max() : module.get.min();
          ***REMOVED*** else if(eventPos > module.get.trackOffset() + module.get.trackLength()) {
              value = module.is.reversed() ? module.get.min() : module.get.max();
          ***REMOVED*** else {
              value = module.determine.value(newPos);
          ***REMOVED***
            return value;
   ***REMOVED*****REMOVED***
          smoothValueFromEvent: function(event) {
            var
              min = module.get.min(),
              max = module.get.max(),
              trackLength = module.get.trackLength(),
              eventPos = module.determine.eventPos(event),
              newPos = eventPos - module.get.trackOffset(),
              ratio,
              value
            ;
            newPos = newPos < 0 ? 0 : newPos > trackLength ? trackLength : newPos;
            ratio = newPos / trackLength;
            if (module.is.reversed()) {
              ratio = 1 - ratio;
          ***REMOVED***
            value = ratio***REMOVED*** (max - min) + min;
            return value;
   ***REMOVED*****REMOVED***
          eventPos: function(event) {
            if(module.is.touch()) {
              var
                touchEvent = event.changedTouches ? event : event.originalEvent,
                touches = touchEvent.changedTouches[0] ? touchEvent.changedTouches : touchEvent.touches,
                touchY = touches[0].pageY,
                touchX = touches[0].pageX
              ;
              return module.is.vertical() ? touchY : touchX;
          ***REMOVED***
            var
              clickY = event.pageY || event.originalEvent.pageY,
              clickX = event.pageX || event.originalEvent.pageX
            ;
            return module.is.vertical() ? clickY : clickX;
   ***REMOVED*****REMOVED***
          value: function(position) {
            var
              startPos = module.is.reversed() ? module.get.trackEndPos() : module.get.trackStartPos(),
              endPos = module.is.reversed() ? module.get.trackStartPos() : module.get.trackEndPos(),
              ratio = (position - startPos) / (endPos - startPos),
              range = module.get.max() - module.get.min(),
              step = module.get.step(),
              value = (ratio***REMOVED*** range),
              difference = (step == 0) ? value : Math.round(value / step)***REMOVED*** step
            ;
            module.verbose('Determined value based upon position: ' + position + ' as: ' + value);
            if(value != difference) {
              module.verbose('Rounding value to closest step: ' + difference);
          ***REMOVED***
            // Use precision to avoid ugly Javascript floating point rounding issues
            // (like 35***REMOVED*** .01 = 0.35000000000000003)
            difference = Math.round(difference***REMOVED*** precision) / precision;
            module.verbose('Cutting off additional decimal places');
            return difference + module.get.min();
   ***REMOVED*****REMOVED***
          keyMovement: function(event) {
            var
              key = event.which,
              downArrow =
                module.is.vertical()
                ?
                module.is.reversed() ? keys.downArrow : keys.upArrow
                :
                keys.downArrow
              ,
              upArrow =
                module.is.vertical()
                ?
                module.is.reversed() ? keys.upArrow : keys.downArrow
                :
                keys.upArrow
              ,
              leftArrow =
                !module.is.vertical()
                ?
                module.is.reversed() ? keys.rightArrow : keys.leftArrow
                :
                keys.leftArrow
              ,
              rightArrow =
                !module.is.vertical()
                ?
                module.is.reversed() ? keys.leftArrow : keys.rightArrow
                :
                keys.rightArrow
            ;
            if(key == downArrow || key == leftArrow) {
              return SINGLE_BACKSTEP;
          ***REMOVED*** else if(key == upArrow || key == rightArrow) {
              return SINGLE_STEP;
          ***REMOVED*** else if (key == keys.pageDown) {
              return BIG_BACKSTEP;
          ***REMOVED*** else if (key == keys.pageUp) {
              return BIG_STEP;
          ***REMOVED*** else {
              return NO_STEP;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        handleNewValuePosition: function(val) {
          var
            min = module.get.min(),
            max = module.get.max(),
            newPos
          ;
          if (val <= min) {
            val = min;
        ***REMOVED*** else if (val >= max) {
            val = max;
        ***REMOVED***
          newPos = module.determine.positionFromValue(val);
          return newPos;
 ***REMOVED*****REMOVED***

        set: {
          value: function(newValue) {
            module.update.value(newValue, function(value, thumbVal, secondThumbVal) {
              if (!initialLoad || settings.fireOnInit){
                settings.onChange.call(element, value, thumbVal, secondThumbVal);
                settings.onMove.call(element, value, thumbVal, secondThumbVal);
            ***REMOVED***
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          rangeValue: function(first, second) {
            if(module.is.range()) {
              var
                min = module.get.min(),
                max = module.get.max()
              ;
              if (first <= min) {
                first = min;
            ***REMOVED*** else if(first >= max){
                first = max;
            ***REMOVED***
              if (second <= min) {
                second = min;
            ***REMOVED*** else if(second >= max){
                second = max;
            ***REMOVED***
              module.thumbVal = first;
              module.secondThumbVal = second;
              value = Math.abs(module.thumbVal - module.secondThumbVal);
              module.update.position(module.thumbVal, $thumb);
              module.update.position(module.secondThumbVal, $secondThumb);
              if (!initialLoad || settings.fireOnInit) {
                settings.onChange.call(element, value, module.thumbVal, module.secondThumbVal);
                settings.onMove.call(element, value, module.thumbVal, module.secondThumbVal);
            ***REMOVED***
          ***REMOVED*** else {
              module.error(error.notrange);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          position: function(position, which) {
            var thumbVal = module.determine.value(position);
            switch (which) {
              case 'second':
                module.secondThumbVal = thumbVal;
                module.update.position(thumbVal, $secondThumb);
                break;
              default:
                module.thumbVal = thumbVal;
                module.update.position(thumbVal, $thumb);
          ***REMOVED***
            value = Math.abs(module.thumbVal - (module.secondThumbVal || 0));
            module.set.value(value);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        update: {
          value: function(newValue, callback) {
            var
              min = module.get.min(),
              max = module.get.max()
            ;
            if (newValue <= min) {
              newValue = min;
          ***REMOVED*** else if(newValue >= max){
              newValue = max;
          ***REMOVED***
            if(!module.is.range()) {
              value = newValue;
              module.thumbVal = value;
          ***REMOVED*** else {
              if($currThumb === undefined) {
                $currThumb = newValue <= module.get.currentThumbValue() ? $thumb : $secondThumb;
            ***REMOVED***
              if(!$currThumb.hasClass('second')) {
                if(settings.preventCrossover && module.is.range()) {
                  newValue = Math.min(module.secondThumbVal, newValue);
              ***REMOVED***
                module.thumbVal = newValue;
            ***REMOVED*** else {
                if(settings.preventCrossover && module.is.range()) {
                  newValue = Math.max(module.thumbVal, newValue);
              ***REMOVED***
                module.secondThumbVal = newValue;
            ***REMOVED***
              value = Math.abs(module.thumbVal - module.secondThumbVal);
          ***REMOVED***
            module.update.position(newValue);
            module.debug('Setting slider value to ' + value);
            if(typeof callback === 'function') {
              callback(value, module.thumbVal, module.secondThumbVal);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          position: function(newValue, $element) {
            var
              newPos = module.handleNewValuePosition(newValue),
              $targetThumb = $element != undefined ? $element : $currThumb,
              thumbVal = module.thumbVal || module.get.min(),
              secondThumbVal = module.secondThumbVal || module.get.min()
            ;
            if(module.is.range()) {
              if(!$targetThumb.hasClass('second')) {
                position = newPos;
                thumbVal = newValue;
            ***REMOVED*** else {
                secondPos = newPos;
                secondThumbVal = newValue;
            ***REMOVED***
          ***REMOVED*** else {
              position = newPos;
              thumbVal = newValue;
          ***REMOVED***
            var
              trackPosValue,
              thumbPosValue,
              min = module.get.min(),
              max = module.get.max(),
              thumbPosPercent = 100***REMOVED*** (newValue - min) / (max - min),
              trackStartPosPercent = 100***REMOVED*** (Math.min(thumbVal, secondThumbVal) - min) / (max - min),
              trackEndPosPercent = 100***REMOVED*** (1 - (Math.max(thumbVal, secondThumbVal) - min) / (max - min))
            ;
            if (module.is.vertical()) {
              if (module.is.reversed()) {
                thumbPosValue = {bottom: 'calc(' + thumbPosPercent + '% - ' + offset + 'px)', top: 'auto'***REMOVED***;
                trackPosValue = {bottom: trackStartPosPercent + '%', top: trackEndPosPercent + '%'***REMOVED***;
            ***REMOVED***
              else {
                thumbPosValue = {top: 'calc(' + thumbPosPercent + '% - ' + offset + 'px)', bottom: 'auto'***REMOVED***;
                trackPosValue = {top: trackStartPosPercent + '%', bottom: trackEndPosPercent + '%'***REMOVED***;
            ***REMOVED***
          ***REMOVED*** else {
              if (module.is.reversed()) {
                thumbPosValue = {right: 'calc(' + thumbPosPercent + '% - ' + offset + 'px)', left: 'auto'***REMOVED***;
                trackPosValue = {right: trackStartPosPercent + '%', left: trackEndPosPercent + '%'***REMOVED***;
            ***REMOVED***
              else {
                thumbPosValue = {left: 'calc(' + thumbPosPercent + '% - ' + offset + 'px)', right: 'auto'***REMOVED***;
                trackPosValue = {left: trackStartPosPercent + '%', right: trackEndPosPercent + '%'***REMOVED***;
            ***REMOVED***
          ***REMOVED***
            $targetThumb.css(thumbPosValue);
            $trackFill.css(trackPosValue);
            module.debug('Setting slider position to ' + newPos);
   ***REMOVED*****REMOVED***
          labelPosition: function (ratio, $label) {
            var
              startMargin = module.get.trackStartMargin(),
              endMargin   = module.get.trackEndMargin(),
              posDir =
                module.is.vertical()
                ?
                module.is.reversed() ? 'bottom' : 'top'
                :
                  module.is.reversed() ? 'right' : 'left',
              startMarginMod = module.is.reversed() && !module.is.vertical() ? ' - ' : ' + '
            ;
            var position = '(100% - ' + startMargin + ' - ' + endMargin + ')***REMOVED*** ' + ratio;
            $label.css(posDir, 'calc(' + position + startMarginMod + startMargin + ')');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        goto: {
          max: function() {
            module.set.value(module.get.max());
   ***REMOVED*****REMOVED***
          min: function() {
            module.set.value(module.get.min());
   ***REMOVED*****REMOVED***
 ***REMOVED*****REMOVED***

        read: {
          metadata: function() {
            var
              data = {
                thumbVal        : $module.data(metadata.thumbVal),
                secondThumbVal  : $module.data(metadata.secondThumbVal)
            ***REMOVED***
            ;
            if(data.thumbVal) {
              if(module.is.range() && data.secondThumbVal) {
                module.debug('Current value set from metadata', data.thumbVal, data.secondThumbVal);
                module.set.rangeValue(data.thumbVal, data.secondThumbVal);
            ***REMOVED*** else {
                module.debug('Current value set from metadata', data.thumbVal);
                module.set.value(data.thumbVal);
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          settings: function() {
            if(settings.start !== false) {
              if(module.is.range()) {
                module.debug('Start position set from settings', settings.start, settings.end);
                module.set.rangeValue(settings.start, settings.end);
            ***REMOVED*** else {
                module.debug('Start position set from settings', settings.start);
                module.set.value(settings.start);
            ***REMOVED***
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
          if($.isArray(returnedValue)) {
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

$.fn.slider.settings = {

  silent       : false,
  debug        : false,
  verbose      : false,
  performance  : true,

  name         : 'Slider',
  namespace    : 'slider',

  error    : {
    method    : 'The method you called is not defined.',
    notrange : 'This slider is not a range slider'
***REMOVED***

  metadata: {
    thumbVal        : 'thumbVal',
    secondThumbVal  : 'secondThumbVal'
***REMOVED***

  min              : 0,
  max              : 20,
  step             : 1,
  start            : 0,
  end              : 20,
  labelType        : 'number',
  showLabelTicks   : false,
  smooth           : false,
  autoAdjustLabels : true,
  labelDistance    : 100,
  preventCrossover : true,
  fireOnInit       : false,

  //the decimal place to round to if step is undefined
  decimalPlaces  : 2,

  // page up/down multiplier. How many more times the steps to take on page up/down press
  pageMultiplier : 2,

  selector: {

***REMOVED***

  className     : {
    reversed : 'reversed',
    disabled : 'disabled',
    labeled  : 'labeled',
    ticked   : 'ticked',
    vertical : 'vertical',
    range    : 'range',
    smooth   : 'smooth'
***REMOVED***

  keys : {
    pageUp     : 33,
    pageDown   : 34,
    leftArrow  : 37,
    upArrow    : 38,
    rightArrow : 39,
    downArrow  : 40
***REMOVED***

  labelTypes    : {
    number  : 'number',
    letter  : 'letter'
***REMOVED***

  onChange : function(value, thumbVal, secondThumbVal){***REMOVED***,
  onMove   : function(value, thumbVal, secondThumbVal){***REMOVED***,
***REMOVED***;


***REMOVED***)( jQuery, window, document );
