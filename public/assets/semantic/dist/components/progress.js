/*!
***REMOVED*** # Fomantic-UI - Progress
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

$.fn.progress = function(parameters) {
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
        settings          = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.progress.settings, parameters)
          : $.extend({***REMOVED***, $.fn.progress.settings),

        className       = settings.className,
        metadata        = settings.metadata,
        namespace       = settings.namespace,
        selector        = settings.selector,
        error           = settings.error,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $module         = $(this),
        $bars           = $(this).find(selector.bar),
        $progresses     = $(this).find(selector.progress),
        $label          = $(this).find(selector.label),

        element         = this,
        instance        = $module.data(moduleNamespace),

        animating = false,
        transitionEnd,
        module
      ;
      module = {
        helper: {
          sum: function (nums) {
            return Array.isArray(nums) ? nums.reduce(function (left, right) {
              return left + Number(right);
***REMOVED*****REMOVED*****REMOVED*** 0) : 0;
   ***REMOVED*****REMOVED***
    ***REMOVED*****REMOVED*****REMOVED***
***REMOVED*****REMOVED*****REMOVED*** Derive precision for multiple progress with total and values.
***REMOVED*****REMOVED*****REMOVED***
***REMOVED*****REMOVED*****REMOVED*** This helper dervices a precision that is sufficiently large to show minimum value of multiple progress.
***REMOVED*****REMOVED*****REMOVED***
***REMOVED*****REMOVED*****REMOVED*** Example1
***REMOVED*****REMOVED*****REMOVED*** - total: 1122
***REMOVED*****REMOVED*****REMOVED*** - values: [325, 111, 74, 612]
***REMOVED*****REMOVED*****REMOVED*** - min ratio: 74/1122 = 0.0659...
***REMOVED*****REMOVED*****REMOVED*** - required precision:  100
***REMOVED*****REMOVED*****REMOVED***
***REMOVED*****REMOVED*****REMOVED*** Example2
***REMOVED*****REMOVED*****REMOVED*** - total: 10541
***REMOVED*****REMOVED*****REMOVED*** - values: [3235, 1111, 74, 6121]
***REMOVED*****REMOVED*****REMOVED*** - min ratio: 74/10541 = 0.0070...
***REMOVED*****REMOVED*****REMOVED*** - required precision:   1000
***REMOVED*****REMOVED*****REMOVED***
***REMOVED*****REMOVED*****REMOVED*** @param min A minimum value within multiple values
***REMOVED*****REMOVED*****REMOVED*** @param total A total amount of multiple values
***REMOVED*****REMOVED*****REMOVED*** @returns {number***REMOVED*** A precison. Could be 1, 10, 100, ... 1e+10.
***REMOVED*****REMOVED*****REMOVED***/
          derivePrecision: function(min, total) {
            var precisionPower = 0
            var precision = 1;
            var ratio = min / total;
            while (precisionPower < 10) {
              ratio = ratio***REMOVED*** precision;
              if (ratio > 1) {
                break;
            ***REMOVED***
              precision = Math.pow(10, precisionPower++);
          ***REMOVED***
            return precision;
   ***REMOVED*****REMOVED***
          forceArray: function (element) {
            return Array.isArray(element)
              ? element
              : !isNaN(element)
                ? [element]
                : typeof element == 'string'
                  ? element.split(',')
                  : []
              ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        initialize: function() {
          module.set.duration();
          module.set.transitionEvent();
          module.debug(element);

          module.read.metadata();
          module.read.settings();

          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of progress', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
 ***REMOVED*****REMOVED***
        destroy: function() {
          module.verbose('Destroying previous progress for', $module);
          clearInterval(instance.interval);
          module.remove.state();
          $module.removeData(moduleNamespace);
          instance = undefined;
 ***REMOVED*****REMOVED***

        reset: function() {
          module.remove.nextValue();
          module.update.progress(0);
 ***REMOVED*****REMOVED***

        complete: function(keepState) {
          if(module.percent === undefined || module.percent < 100) {
            module.remove.progressPoll();
            if(keepState !== true){
                module.set.percent(100);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        read: {
          metadata: function() {
            var
              data = {
                percent : module.helper.forceArray($module.data(metadata.percent)),
                total   : $module.data(metadata.total),
                value   : module.helper.forceArray($module.data(metadata.value))
            ***REMOVED***
            ;
            if(data.total) {
              module.debug('Total value set from metadata', data.total);
              module.set.total(data.total);
          ***REMOVED***
            if(data.value.length > 0) {
              module.debug('Current value set from metadata', data.value);
              module.set.value(data.value);
              module.set.progress(data.value);
          ***REMOVED***
            if(data.percent.length > 0) {
              module.debug('Current percent value set from metadata', data.percent);
              module.set.percent(data.percent);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          settings: function() {
            if(settings.total !== false) {
              module.debug('Current total set in settings', settings.total);
              module.set.total(settings.total);
          ***REMOVED***
            if(settings.value !== false) {
              module.debug('Current value set in settings', settings.value);
              module.set.value(settings.value);
              module.set.progress(module.value);
          ***REMOVED***
            if(settings.percent !== false) {
              module.debug('Current percent set in settings', settings.percent);
              module.set.percent(settings.percent);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bind: {
          transitionEnd: function(callback) {
            var
              transitionEnd = module.get.transitionEnd()
            ;
            $bars
              .one(transitionEnd + eventNamespace, function(event) {
                clearTimeout(module.failSafeTimer);
                callback.call(this, event);
            ***REMOVED***)
            ;
            module.failSafeTimer = setTimeout(function() {
              $bars.triggerHandler(transitionEnd);
***REMOVED*****REMOVED*****REMOVED*** settings.duration + settings.failSafeDelay);
            module.verbose('Adding fail safe timer', module.timer);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        increment: function(incrementValue) {
          var
            startValue,
            newValue
          ;
          if( module.has.total() ) {
            startValue     = module.get.value();
            incrementValue = incrementValue || 1;
        ***REMOVED***
          else {
            startValue     = module.get.percent();
            incrementValue = incrementValue || module.get.randomValue();
        ***REMOVED***
          newValue = startValue + incrementValue;
          module.debug('Incrementing percentage by', startValue, newValue, incrementValue);
          newValue = module.get.normalizedValue(newValue);
          module.set.progress(newValue);
 ***REMOVED*****REMOVED***
        decrement: function(decrementValue) {
          var
            total     = module.get.total(),
            startValue,
            newValue
          ;
          if(total) {
            startValue     =  module.get.value();
            decrementValue =  decrementValue || 1;
            newValue       =  startValue - decrementValue;
            module.debug('Decrementing value by', decrementValue, startValue);
        ***REMOVED***
          else {
            startValue     =  module.get.percent();
            decrementValue =  decrementValue || module.get.randomValue();
            newValue       =  startValue - decrementValue;
            module.debug('Decrementing percentage by', decrementValue, startValue);
        ***REMOVED***
          newValue = module.get.normalizedValue(newValue);
          module.set.progress(newValue);
 ***REMOVED*****REMOVED***

        has: {
          progressPoll: function() {
            return module.progressPoll;
   ***REMOVED*****REMOVED***
          total: function() {
            return (module.get.total() !== false);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          text: function(templateText, index) {
            var
              index_  = index || 0,
              value   = module.get.value(index_),
              total   = module.total || 0,
              percent = (animating)
                ? module.get.displayPercent(index_)
                : module.get.percent(index_),
              left = (module.total > 0)
                ? (total - value)
                : (100 - percent)
            ;
            templateText = templateText || '';
            templateText = templateText
              .replace('{value***REMOVED***', value)
              .replace('{total***REMOVED***', total)
              .replace('{left***REMOVED***', left)
              .replace('{percent***REMOVED***', percent)
              .replace('{bar***REMOVED***', settings.text.bars[index_] || '')
            ;
            module.verbose('Adding variables to progress bar text', templateText);
            return templateText;
   ***REMOVED*****REMOVED***

          normalizedValue: function(value) {
            if(value < 0) {
              module.debug('Value cannot decrement below 0');
              return 0;
          ***REMOVED***
            if(module.has.total()) {
              if(value > module.total) {
                module.debug('Value cannot increment above total', module.total);
                return module.total;
            ***REMOVED***
          ***REMOVED***
            else if(value > 100 ) {
              module.debug('Value cannot increment above 100 percent');
              return 100;
          ***REMOVED***
            return value;
   ***REMOVED*****REMOVED***

          updateInterval: function() {
            if(settings.updateInterval == 'auto') {
              return settings.duration;
          ***REMOVED***
            return settings.updateInterval;
   ***REMOVED*****REMOVED***

          randomValue: function() {
            module.debug('Generating random increment percentage');
            return Math.floor((Math.random()***REMOVED*** settings.random.max) + settings.random.min);
   ***REMOVED*****REMOVED***

          numericValue: function(value) {
            return (typeof value === 'string')
              ? (value.replace(/[^\d.]/g, '') !== '')
                ? +(value.replace(/[^\d.]/g, ''))
                : false
              : value
            ;
   ***REMOVED*****REMOVED***

          transitionEnd: function() {
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

          // gets current displayed percentage (if animating values this is the intermediary value)
          displayPercent: function(index) {
            var
              $bar           = $($bars[index]),
              barWidth       = $bar.width(),
              totalWidth     = $module.width(),
              minDisplay     = parseInt($bar.css('min-width'), 10),
              displayPercent = (barWidth > minDisplay)
                ? (barWidth / totalWidth***REMOVED*** 100)
                : module.percent
            ;
            return (settings.precision > 0)
              ? Math.round(displayPercent***REMOVED*** (10***REMOVED*** settings.precision)) / (10***REMOVED*** settings.precision)
              : Math.round(displayPercent)
              ;
   ***REMOVED*****REMOVED***

          percent: function(index) {
            return module.percent && module.percent[index || 0] || 0;
   ***REMOVED*****REMOVED***
          value: function(index) {
            return module.nextValue || module.value && module.value[index || 0] || 0;
   ***REMOVED*****REMOVED***
          total: function() {
            return module.total || false;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        create: {
          progressPoll: function() {
            module.progressPoll = setTimeout(function() {
              module.update.toNextValue();
              module.remove.progressPoll();
***REMOVED*****REMOVED*****REMOVED*** module.get.updateInterval());
   ***REMOVED*****REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          complete: function() {
            return module.is.success() || module.is.warning() || module.is.error();
   ***REMOVED*****REMOVED***
          success: function() {
            return $module.hasClass(className.success);
   ***REMOVED*****REMOVED***
          warning: function() {
            return $module.hasClass(className.warning);
   ***REMOVED*****REMOVED***
          error: function() {
            return $module.hasClass(className.error);
   ***REMOVED*****REMOVED***
          active: function() {
            return $module.hasClass(className.active);
   ***REMOVED*****REMOVED***
          visible: function() {
            return $module.is(':visible');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          progressPoll: function() {
            module.verbose('Removing progress poll timer');
            if(module.progressPoll) {
              clearTimeout(module.progressPoll);
              delete module.progressPoll;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          nextValue: function() {
            module.verbose('Removing progress value stored for next update');
            delete module.nextValue;
   ***REMOVED*****REMOVED***
          state: function() {
            module.verbose('Removing stored state');
            delete module.total;
            delete module.percent;
            delete module.value;
   ***REMOVED*****REMOVED***
          active: function() {
            module.verbose('Removing active state');
            $module.removeClass(className.active);
   ***REMOVED*****REMOVED***
          success: function() {
            module.verbose('Removing success state');
            $module.removeClass(className.success);
   ***REMOVED*****REMOVED***
          warning: function() {
            module.verbose('Removing warning state');
            $module.removeClass(className.warning);
   ***REMOVED*****REMOVED***
          error: function() {
            module.verbose('Removing error state');
            $module.removeClass(className.error);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          barWidth: function(values) {
            module.debug("set bar width with ", values);
            values = module.helper.forceArray(values);
            var firstNonZeroIndex = -1;
            var lastNonZeroIndex = -1;
            var valuesSum = module.helper.sum(values);
            var barCounts = $bars.length;
            var isMultiple = barCounts > 1;
            var percents = values.map(function(value, index) {
              var allZero = (index === barCounts - 1 && valuesSum === 0);
              var $bar = $($bars[index]);
              if (value === 0 && isMultiple && !allZero) {
                $bar.css('display', 'none');
            ***REMOVED*** else {
                if (isMultiple && allZero) {
                  $bar.css('background', 'transparent');
              ***REMOVED***
                if (firstNonZeroIndex == -1) {
                  firstNonZeroIndex = index;
              ***REMOVED***
                lastNonZeroIndex = index;
                $bar.css({
                  display: 'block',
                  width: value + '%'
              ***REMOVED***);
            ***REMOVED***
              return parseFloat(value);
          ***REMOVED***);
            values.forEach(function(_, index) {
              var $bar = $($bars[index]);
              $bar.css({
                borderTopLeftRadius: index == firstNonZeroIndex ? '' : 0,
                borderBottomLeftRadius: index == firstNonZeroIndex ? '' : 0,
                borderTopRightRadius: index == lastNonZeroIndex ? '' : 0,
                borderBottomRightRadius: index == lastNonZeroIndex ? '' : 0
            ***REMOVED***);
          ***REMOVED***);
            $module
              .attr('data-percent', percents)
            ;
   ***REMOVED*****REMOVED***
          duration: function(duration) {
            duration = duration || settings.duration;
            duration = (typeof duration == 'number')
              ? duration + 'ms'
              : duration
            ;
            module.verbose('Setting progress bar transition duration', duration);
            $bars
              .css({
                'transition-duration':  duration
            ***REMOVED***)
            ;
   ***REMOVED*****REMOVED***
          percent: function(percents) {
            percents = module.helper.forceArray(percents).map(function(percent) {
              return (typeof percent == 'string')
                ? +(percent.replace('%', ''))
                : percent
                ;
          ***REMOVED***);
            var hasTotal = module.has.total();
            var totalPecent = module.helper.sum(percents);
            var isMultpleValues = percents.length > 1 && hasTotal;
            var sumTotal = module.helper.sum(module.helper.forceArray(module.value));
            if (isMultpleValues && sumTotal > module.total) {
              // Sum values instead of pecents to avoid precision issues when summing floats
              module.error(error.sumExceedsTotal, sumTotal, module.total);
          ***REMOVED*** else if (!isMultpleValues && totalPecent > 100) {
              // Sum before rouding since sum of rounded may have error though sum of actual is fine
              module.error(error.tooHigh, totalPecent);
          ***REMOVED*** else if (totalPecent < 0) {
              module.error(error.tooLow, totalPecent);
          ***REMOVED*** else {
              var autoPrecision = settings.precision > 0
                ? settings.precision
                : isMultpleValues
                  ? module.helper.derivePrecision(Math.min.apply(null, module.value), module.total)
                  : undefined;

              // round display percentage
              var roundedPercents = percents.map(function (percent) {
                return (autoPrecision > 0)
                  ? Math.round(percent***REMOVED*** (10***REMOVED*** autoPrecision)) / (10***REMOVED*** autoPrecision)
                  : Math.round(percent)
                  ;
            ***REMOVED***);
              module.percent = roundedPercents;
              if (!hasTotal) {
                module.value = roundedPercents.map(function (percent) {
                  return (autoPrecision > 0)
                    ? Math.round((percent / 100)***REMOVED*** module.total***REMOVED*** (10***REMOVED*** autoPrecision)) / (10***REMOVED*** autoPrecision)
                    : Math.round((percent / 100)***REMOVED*** module.total***REMOVED*** 10) / 10
                    ;
              ***REMOVED***);
                if (settings.limitValues) {
                  module.value = module.value.map(function (value) {
                    return (value > 100)
                      ? 100
                      : (module.value < 0)
                        ? 0
                        : module.value;
                ***REMOVED***);
              ***REMOVED***
            ***REMOVED***
              module.set.barWidth(percents);
              module.set.labelInterval();
              module.set.labels();
          ***REMOVED***
            settings.onChange.call(element, percents, module.value, module.total);
   ***REMOVED*****REMOVED***
          labelInterval: function() {
            var
              animationCallback = function() {
                module.verbose('Bar finished animating, removing continuous label updates');
                clearInterval(module.interval);
                animating = false;
                module.set.labels();
            ***REMOVED***
            ;
            clearInterval(module.interval);
            module.bind.transitionEnd(animationCallback);
            animating = true;
            module.interval = setInterval(function() {
              var
                isInDOM = $.contains(document.documentElement, element)
              ;
              if(!isInDOM) {
                clearInterval(module.interval);
                animating = false;
            ***REMOVED***
              module.set.labels();
***REMOVED*****REMOVED*****REMOVED*** settings.framerate);
   ***REMOVED*****REMOVED***
          labels: function() {
            module.verbose('Setting both bar progress and outer label text');
            module.set.barLabel();
            module.set.state();
   ***REMOVED*****REMOVED***
          label: function(text) {
            text = text || '';
            if(text) {
              text = module.get.text(text);
              module.verbose('Setting label to text', text);
              $label.text(text);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          state: function(percent) {
            percent = (percent !== undefined)
              ? percent
              : module.helper.sum(module.percent)
            ;
            if(percent === 100) {
              if(settings.autoSuccess && $bars.length === 1 && !(module.is.warning() || module.is.error() || module.is.success())) {
                module.set.success();
                module.debug('Automatically triggering success at 100%');
            ***REMOVED***
              else {
                module.verbose('Reached 100% removing active state');
                module.remove.active();
                module.remove.progressPoll();
            ***REMOVED***
          ***REMOVED***
            else if(percent > 0) {
              module.verbose('Adjusting active progress bar label', percent);
              module.set.active();
          ***REMOVED***
            else {
              module.remove.active();
              module.set.label(settings.text.active);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          barLabel: function(text) {
            $progresses.map(function(index, element){
              var $progress = $(element);
              if (text !== undefined) {
                $progress.text( module.get.text(text, index) );
            ***REMOVED***
              else if (settings.label == 'ratio' && module.total) {
                module.verbose('Adding ratio to bar label');
                $progress.text( module.get.text(settings.text.ratio, index) );
            ***REMOVED***
              else if (settings.label == 'percent') {
                module.verbose('Adding percentage to bar label');
                $progress.text( module.get.text(settings.text.percent, index) );
            ***REMOVED***
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          active: function(text) {
            text = text || settings.text.active;
            module.debug('Setting active state');
            if(settings.showActivity && !module.is.active() ) {
              $module.addClass(className.active);
          ***REMOVED***
            module.remove.warning();
            module.remove.error();
            module.remove.success();
            text = settings.onLabelUpdate('active', text, module.value, module.total);
            if(text) {
              module.set.label(text);
          ***REMOVED***
            module.bind.transitionEnd(function() {
              settings.onActive.call(element, module.value, module.total);
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          success : function(text, keepState) {
            text = text || settings.text.success || settings.text.active;
            module.debug('Setting success state');
            $module.addClass(className.success);
            module.remove.active();
            module.remove.warning();
            module.remove.error();
            module.complete(keepState);
            if(settings.text.success) {
              text = settings.onLabelUpdate('success', text, module.value, module.total);
              module.set.label(text);
          ***REMOVED***
            else {
              text = settings.onLabelUpdate('active', text, module.value, module.total);
              module.set.label(text);
          ***REMOVED***
            module.bind.transitionEnd(function() {
              settings.onSuccess.call(element, module.total);
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          warning : function(text, keepState) {
            text = text || settings.text.warning;
            module.debug('Setting warning state');
            $module.addClass(className.warning);
            module.remove.active();
            module.remove.success();
            module.remove.error();
            module.complete(keepState);
            text = settings.onLabelUpdate('warning', text, module.value, module.total);
            if(text) {
              module.set.label(text);
          ***REMOVED***
            module.bind.transitionEnd(function() {
              settings.onWarning.call(element, module.value, module.total);
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          error : function(text, keepState) {
            text = text || settings.text.error;
            module.debug('Setting error state');
            $module.addClass(className.error);
            module.remove.active();
            module.remove.success();
            module.remove.warning();
            module.complete(keepState);
            text = settings.onLabelUpdate('error', text, module.value, module.total);
            if(text) {
              module.set.label(text);
          ***REMOVED***
            module.bind.transitionEnd(function() {
              settings.onError.call(element, module.value, module.total);
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          transitionEvent: function() {
            transitionEnd = module.get.transitionEnd();
   ***REMOVED*****REMOVED***
          total: function(totalValue) {
            module.total = totalValue;
   ***REMOVED*****REMOVED***
          value: function(value) {
            module.value = module.helper.forceArray(value);
   ***REMOVED*****REMOVED***
          progress: function(value) {
            if(!module.has.progressPoll()) {
              module.debug('First update in progress update interval, immediately updating', value);
              module.update.progress(value);
              module.create.progressPoll();
          ***REMOVED***
            else {
              module.debug('Updated within interval, setting next update to use new value', value);
              module.set.nextValue(value);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          nextValue: function(value) {
            module.nextValue = value;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        update: {
          toNextValue: function() {
            var
              nextValue = module.nextValue
            ;
            if(nextValue) {
              module.debug('Update interval complete using last updated value', nextValue);
              module.update.progress(nextValue);
              module.remove.nextValue();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          progress: function(values) {
            var hasTotal = module.has.total();
            if (hasTotal) {
              module.set.value(values);
          ***REMOVED***
            var percentCompletes = module.helper.forceArray(values).map(function(value) {
              var
                percentComplete
              ;
              value = module.get.numericValue(value);
              if (value === false) {
                module.error(error.nonNumeric, value);
            ***REMOVED***
              value = module.get.normalizedValue(value);
              if (hasTotal) {
                percentComplete = (value / module.total)***REMOVED*** 100;
                module.debug('Calculating percent complete from total', percentComplete);
            ***REMOVED***
              else {
                percentComplete = value;
                module.debug('Setting value to exact percentage value', percentComplete);
            ***REMOVED***
              return percentComplete;
          ***REMOVED***);
            module.set.percent( percentCompletes );
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

$.fn.progress.settings = {

  name         : 'Progress',
  namespace    : 'progress',

  silent       : false,
  debug        : false,
  verbose      : false,
  performance  : true,

  random       : {
    min : 2,
    max : 5
***REMOVED***

  duration       : 300,

  updateInterval : 'auto',

  autoSuccess    : true,
  showActivity   : true,
  limitValues    : true,

  label          : 'percent',
  precision      : 0,
  framerate      : (1000 / 30), /// 30 fps

  percent        : false,
  total          : false,
  value          : false,

  // delay in ms for fail safe animation callback
  failSafeDelay : 100,

  onLabelUpdate : function(state, text, value, total){
    return text;
***REMOVED***
  onChange      : function(percent, value, total){***REMOVED***,
  onSuccess     : function(total){***REMOVED***,
  onActive      : function(value, total){***REMOVED***,
  onError       : function(value, total){***REMOVED***,
  onWarning     : function(value, total){***REMOVED***,

  error    : {
    method          : 'The method you called is not defined.',
    nonNumeric      : 'Progress value is non numeric',
    tooHigh         : 'Value specified is above 100%',
    tooLow          : 'Value specified is below 0%',
    sumExceedsTotal : 'Sum of multple values exceed total',
***REMOVED***

  regExp: {
    variable: /\{\$*[A-z0-9]+\***REMOVED***/g
***REMOVED***

  metadata: {
    percent : 'percent',
    total   : 'total',
    value   : 'value'
***REMOVED***

  selector : {
    bar      : '> .bar',
    label    : '> .label',
    progress : '.bar > .progress'
***REMOVED***

  text : {
    active  : false,
    error   : false,
    success : false,
    warning : false,
    percent : '{percent***REMOVED***%',
    ratio   : '{value***REMOVED*** of {total***REMOVED***',
    bars    : ['']
***REMOVED***

  className : {
    active  : 'active',
    error   : 'error',
    success : 'success',
    warning : 'warning'
***REMOVED***

***REMOVED***;


***REMOVED***)( jQuery, window, document );
