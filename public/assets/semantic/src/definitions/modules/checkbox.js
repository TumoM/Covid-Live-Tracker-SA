/*!
***REMOVED*** # Fomantic-UI - Checkbox
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

$.fn.checkbox = function(parameters) {
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
        settings        = $.extend(true, {***REMOVED***, $.fn.checkbox.settings, parameters),

        className       = settings.className,
        namespace       = settings.namespace,
        selector        = settings.selector,
        error           = settings.error,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $module         = $(this),
        $label          = $(this).children(selector.label),
        $input          = $(this).children(selector.input),
        input           = $input[0],

        initialLoad     = false,
        shortcutPressed = false,
        instance        = $module.data(moduleNamespace),

        observer,
        element         = this,
        module
      ;

      module      = {

        initialize: function() {
          module.verbose('Initializing checkbox', settings);

          module.create.label();
          module.bind.events();

          module.set.tabbable();
          module.hide.input();

          module.observeChanges();
          module.instantiate();
          module.setup();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.verbose('Destroying module');
          module.unbind.events();
          module.show.input();
          $module.removeData(moduleNamespace);
 ***REMOVED*****REMOVED***

        fix: {
          reference: function() {
            if( $module.is(selector.input) ) {
              module.debug('Behavior called on <input> adjusting invoked element');
              $module = $module.closest(selector.checkbox);
              module.refresh();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        setup: function() {
          module.set.initialLoad();
          if( module.is.indeterminate() ) {
            module.debug('Initial value is indeterminate');
            module.indeterminate();
        ***REMOVED***
          else if( module.is.checked() ) {
            module.debug('Initial value is checked');
            module.check();
        ***REMOVED***
          else {
            module.debug('Initial value is unchecked');
            module.uncheck();
        ***REMOVED***
          module.remove.initialLoad();
 ***REMOVED*****REMOVED***

        refresh: function() {
          $label = $module.children(selector.label);
          $input = $module.children(selector.input);
          input  = $input[0];
 ***REMOVED*****REMOVED***

        hide: {
          input: function() {
            module.verbose('Modifying <input> z-index to be unselectable');
            $input.addClass(className.hidden);
        ***REMOVED***
 ***REMOVED*****REMOVED***
        show: {
          input: function() {
            module.verbose('Modifying <input> z-index to be selectable');
            $input.removeClass(className.hidden);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        observeChanges: function() {
          if('MutationObserver' in window) {
            observer = new MutationObserver(function(mutations) {
              module.debug('DOM tree modified, updating selector cache');
              module.refresh();
          ***REMOVED***);
            observer.observe(element, {
              childList : true,
              subtree   : true
          ***REMOVED***);
            module.debug('Setting up mutation observer', observer);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        attachEvents: function(selector, event) {
          var
            $element = $(selector)
          ;
          event = $.isFunction(module[event])
            ? module[event]
            : module.toggle
          ;
          if($element.length > 0) {
            module.debug('Attaching checkbox events to element', selector, event);
            $element
              .on('click' + eventNamespace, event)
            ;
        ***REMOVED***
          else {
            module.error(error.notFound);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        preventDefaultOnInputTarget: function() {
          if(typeof event !== 'undefined' && event !== null && $(event.target).is(selector.input)) {
            module.verbose('Preventing default check action after manual check action');
            event.preventDefault();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          change: function(event) {
            if( !module.should.ignoreCallbacks() ) {
              settings.onChange.call(input);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          click: function(event) {
            var
              $target = $(event.target)
            ;
            if( $target.is(selector.input) ) {
              module.verbose('Using default check action on initialized checkbox');
              return;
          ***REMOVED***
            if( $target.is(selector.link) ) {
              module.debug('Clicking link inside checkbox, skipping toggle');
              return;
          ***REMOVED***
            module.toggle();
            $input.focus();
            event.preventDefault();
   ***REMOVED*****REMOVED***
          keydown: function(event) {
            var
              key     = event.which,
              keyCode = {
                enter  : 13,
                space  : 32,
                escape : 27,
                left   : 37,
                up     : 38,
                right  : 39,
                down   : 40
            ***REMOVED***
            ;

            var r = module.get.radios(),
                rIndex = r.index($module),
                rLen = r.length,
                checkIndex = false;

            if(key == keyCode.left || key == keyCode.up) {
              checkIndex = (rIndex === 0 ? rLen : rIndex) - 1;
          ***REMOVED*** else if(key == keyCode.right || key == keyCode.down) {
              checkIndex = rIndex === rLen-1 ? 0 : rIndex+1;
          ***REMOVED***

            if (!module.should.ignoreCallbacks() && checkIndex !== false) {
              if(settings.beforeUnchecked.apply(input)===false) {
                module.verbose('Option not allowed to be unchecked, cancelling key navigation');
                return false;
            ***REMOVED***
              if (settings.beforeChecked.apply($(r[checkIndex]).children(selector.input)[0])===false) {
                module.verbose('Next option should not allow check, cancelling key navigation');
                return false;
            ***REMOVED***
          ***REMOVED***

            if(key == keyCode.escape) {
              module.verbose('Escape key pressed blurring field');
              $input.blur();
              shortcutPressed = true;
          ***REMOVED***
            else if(!event.ctrlKey && ( key == keyCode.space || (key == keyCode.enter && settings.enableEnterKey)) ) {
              module.verbose('Enter/space key pressed, toggling checkbox');
              module.toggle();
              shortcutPressed = true;
          ***REMOVED***
            else {
              shortcutPressed = false;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          keyup: function(event) {
            if(shortcutPressed) {
              event.preventDefault();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        check: function() {
          if( !module.should.allowCheck() ) {
            return;
        ***REMOVED***
          module.debug('Checking checkbox', $input);
          module.set.checked();
          if( !module.should.ignoreCallbacks() ) {
            settings.onChecked.call(input);
            module.trigger.change();
        ***REMOVED***
          module.preventDefaultOnInputTarget();
 ***REMOVED*****REMOVED***

        uncheck: function() {
          if( !module.should.allowUncheck() ) {
            return;
        ***REMOVED***
          module.debug('Unchecking checkbox');
          module.set.unchecked();
          if( !module.should.ignoreCallbacks() ) {
            settings.onUnchecked.call(input);
            module.trigger.change();
        ***REMOVED***
          module.preventDefaultOnInputTarget();
 ***REMOVED*****REMOVED***

        indeterminate: function() {
          if( module.should.allowIndeterminate() ) {
            module.debug('Checkbox is already indeterminate');
            return;
        ***REMOVED***
          module.debug('Making checkbox indeterminate');
          module.set.indeterminate();
          if( !module.should.ignoreCallbacks() ) {
            settings.onIndeterminate.call(input);
            module.trigger.change();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        determinate: function() {
          if( module.should.allowDeterminate() ) {
            module.debug('Checkbox is already determinate');
            return;
        ***REMOVED***
          module.debug('Making checkbox determinate');
          module.set.determinate();
          if( !module.should.ignoreCallbacks() ) {
            settings.onDeterminate.call(input);
            module.trigger.change();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        enable: function() {
          if( module.is.enabled() ) {
            module.debug('Checkbox is already enabled');
            return;
        ***REMOVED***
          module.debug('Enabling checkbox');
          module.set.enabled();
          if( !module.should.ignoreCallbacks() ) {
            settings.onEnable.call(input);
            // preserve legacy callbacks
            settings.onEnabled.call(input);
            module.trigger.change();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        disable: function() {
          if( module.is.disabled() ) {
            module.debug('Checkbox is already disabled');
            return;
        ***REMOVED***
          module.debug('Disabling checkbox');
          module.set.disabled();
          if( !module.should.ignoreCallbacks() ) {
            settings.onDisable.call(input);
            // preserve legacy callbacks
            settings.onDisabled.call(input);
            module.trigger.change();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          radios: function() {
            var
              name = module.get.name()
            ;
            return $('input[name="' + name + '"]').closest(selector.checkbox);
   ***REMOVED*****REMOVED***
          otherRadios: function() {
            return module.get.radios().not($module);
   ***REMOVED*****REMOVED***
          name: function() {
            return $input.attr('name');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          initialLoad: function() {
            return initialLoad;
   ***REMOVED*****REMOVED***
          radio: function() {
            return ($input.hasClass(className.radio) || $input.attr('type') == 'radio');
   ***REMOVED*****REMOVED***
          indeterminate: function() {
            return $input.prop('indeterminate') !== undefined && $input.prop('indeterminate');
   ***REMOVED*****REMOVED***
          checked: function() {
            return $input.prop('checked') !== undefined && $input.prop('checked');
   ***REMOVED*****REMOVED***
          disabled: function() {
            return $input.prop('disabled') !== undefined && $input.prop('disabled');
   ***REMOVED*****REMOVED***
          enabled: function() {
            return !module.is.disabled();
   ***REMOVED*****REMOVED***
          determinate: function() {
            return !module.is.indeterminate();
   ***REMOVED*****REMOVED***
          unchecked: function() {
            return !module.is.checked();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        should: {
          allowCheck: function() {
            if(module.is.determinate() && module.is.checked() && !module.is.initialLoad() ) {
              module.debug('Should not allow check, checkbox is already checked');
              return false;
          ***REMOVED***
            if(!module.should.ignoreCallbacks() && settings.beforeChecked.apply(input) === false) {
              module.debug('Should not allow check, beforeChecked cancelled');
              return false;
          ***REMOVED***
            return true;
   ***REMOVED*****REMOVED***
          allowUncheck: function() {
            if(module.is.determinate() && module.is.unchecked() && !module.is.initialLoad() ) {
              module.debug('Should not allow uncheck, checkbox is already unchecked');
              return false;
          ***REMOVED***
            if(!module.should.ignoreCallbacks() && settings.beforeUnchecked.apply(input) === false) {
              module.debug('Should not allow uncheck, beforeUnchecked cancelled');
              return false;
          ***REMOVED***
            return true;
   ***REMOVED*****REMOVED***
          allowIndeterminate: function() {
            if(module.is.indeterminate() && !module.is.initialLoad() ) {
              module.debug('Should not allow indeterminate, checkbox is already indeterminate');
              return false;
          ***REMOVED***
            if(!module.should.ignoreCallbacks() && settings.beforeIndeterminate.apply(input) === false) {
              module.debug('Should not allow indeterminate, beforeIndeterminate cancelled');
              return false;
          ***REMOVED***
            return true;
   ***REMOVED*****REMOVED***
          allowDeterminate: function() {
            if(module.is.determinate() && !module.is.initialLoad() ) {
              module.debug('Should not allow determinate, checkbox is already determinate');
              return false;
          ***REMOVED***
            if(!module.should.ignoreCallbacks() && settings.beforeDeterminate.apply(input) === false) {
              module.debug('Should not allow determinate, beforeDeterminate cancelled');
              return false;
          ***REMOVED***
            return true;
   ***REMOVED*****REMOVED***
          ignoreCallbacks: function() {
            return (initialLoad && !settings.fireOnInit);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        can: {
          change: function() {
            return !( $module.hasClass(className.disabled) || $module.hasClass(className.readOnly) || $input.prop('disabled') || $input.prop('readonly') );
   ***REMOVED*****REMOVED***
          uncheck: function() {
            return (typeof settings.uncheckable === 'boolean')
              ? settings.uncheckable
              : !module.is.radio()
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          initialLoad: function() {
            initialLoad = true;
   ***REMOVED*****REMOVED***
          checked: function() {
            module.verbose('Setting class to checked');
            $module
              .removeClass(className.indeterminate)
              .addClass(className.checked)
            ;
            if( module.is.radio() ) {
              module.uncheckOthers();
          ***REMOVED***
            if(!module.is.indeterminate() && module.is.checked()) {
              module.debug('Input is already checked, skipping input property change');
              return;
          ***REMOVED***
            module.verbose('Setting state to checked', input);
            $input
              .prop('indeterminate', false)
              .prop('checked', true)
            ;
   ***REMOVED*****REMOVED***
          unchecked: function() {
            module.verbose('Removing checked class');
            $module
              .removeClass(className.indeterminate)
              .removeClass(className.checked)
            ;
            if(!module.is.indeterminate() &&  module.is.unchecked() ) {
              module.debug('Input is already unchecked');
              return;
          ***REMOVED***
            module.debug('Setting state to unchecked');
            $input
              .prop('indeterminate', false)
              .prop('checked', false)
            ;
   ***REMOVED*****REMOVED***
          indeterminate: function() {
            module.verbose('Setting class to indeterminate');
            $module
              .addClass(className.indeterminate)
            ;
            if( module.is.indeterminate() ) {
              module.debug('Input is already indeterminate, skipping input property change');
              return;
          ***REMOVED***
            module.debug('Setting state to indeterminate');
            $input
              .prop('indeterminate', true)
            ;
   ***REMOVED*****REMOVED***
          determinate: function() {
            module.verbose('Removing indeterminate class');
            $module
              .removeClass(className.indeterminate)
            ;
            if( module.is.determinate() ) {
              module.debug('Input is already determinate, skipping input property change');
              return;
          ***REMOVED***
            module.debug('Setting state to determinate');
            $input
              .prop('indeterminate', false)
            ;
   ***REMOVED*****REMOVED***
          disabled: function() {
            module.verbose('Setting class to disabled');
            $module
              .addClass(className.disabled)
            ;
            if( module.is.disabled() ) {
              module.debug('Input is already disabled, skipping input property change');
              return;
          ***REMOVED***
            module.debug('Setting state to disabled');
            $input
              .prop('disabled', 'disabled')
            ;
   ***REMOVED*****REMOVED***
          enabled: function() {
            module.verbose('Removing disabled class');
            $module.removeClass(className.disabled);
            if( module.is.enabled() ) {
              module.debug('Input is already enabled, skipping input property change');
              return;
          ***REMOVED***
            module.debug('Setting state to enabled');
            $input
              .prop('disabled', false)
            ;
   ***REMOVED*****REMOVED***
          tabbable: function() {
            module.verbose('Adding tabindex to checkbox');
            if( $input.attr('tabindex') === undefined) {
              $input.attr('tabindex', 0);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          initialLoad: function() {
            initialLoad = false;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        trigger: {
          change: function() {
            var
              events       = document.createEvent('HTMLEvents'),
              inputElement = $input[0]
            ;
            if(inputElement) {
              module.verbose('Triggering native change event');
              events.initEvent('change', true, false);
              inputElement.dispatchEvent(events);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***


        create: {
          label: function() {
            if($input.prevAll(selector.label).length > 0) {
              $input.prev(selector.label).detach().insertAfter($input);
              module.debug('Moving existing label', $label);
          ***REMOVED***
            else if( !module.has.label() ) {
              $label = $('<label>').insertAfter($input);
              module.debug('Creating label', $label);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        has: {
          label: function() {
            return ($label.length > 0);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            module.verbose('Attaching checkbox events');
            $module
              .on('click'   + eventNamespace, module.event.click)
              .on('change'  + eventNamespace, module.event.change)
              .on('keydown' + eventNamespace, selector.input, module.event.keydown)
              .on('keyup'   + eventNamespace, selector.input, module.event.keyup)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        unbind: {
          events: function() {
            module.debug('Removing events');
            $module
              .off(eventNamespace)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        uncheckOthers: function() {
          var
            $radios = module.get.otherRadios()
          ;
          module.debug('Unchecking other radios', $radios);
          $radios.removeClass(className.checked);
 ***REMOVED*****REMOVED***

        toggle: function() {
          if( !module.can.change() ) {
            if(!module.is.radio()) {
              module.debug('Checkbox is read-only or disabled, ignoring toggle');
          ***REMOVED***
            return;
        ***REMOVED***
          if( module.is.indeterminate() || module.is.unchecked() ) {
            module.debug('Currently unchecked');
            module.check();
        ***REMOVED***
          else if( module.is.checked() && module.can.uncheck() ) {
            module.debug('Currently checked');
            module.uncheck();
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

$.fn.checkbox.settings = {

  name                : 'Checkbox',
  namespace           : 'checkbox',

  silent              : false,
  debug               : false,
  verbose             : true,
  performance         : true,

  // delegated event context
  uncheckable         : 'auto',
  fireOnInit          : false,
  enableEnterKey      : true,

  onChange            : function(){***REMOVED***,

  beforeChecked       : function(){***REMOVED***,
  beforeUnchecked     : function(){***REMOVED***,
  beforeDeterminate   : function(){***REMOVED***,
  beforeIndeterminate : function(){***REMOVED***,

  onChecked           : function(){***REMOVED***,
  onUnchecked         : function(){***REMOVED***,

  onDeterminate       : function() {***REMOVED***,
  onIndeterminate     : function() {***REMOVED***,

  onEnable            : function(){***REMOVED***,
  onDisable           : function(){***REMOVED***,

  // preserve misspelled callbacks (will be removed in 3.0)
  onEnabled           : function(){***REMOVED***,
  onDisabled          : function(){***REMOVED***,

  className       : {
    checked       : 'checked',
    indeterminate : 'indeterminate',
    disabled      : 'disabled',
    hidden        : 'hidden',
    radio         : 'radio',
    readOnly      : 'read-only'
***REMOVED***

  error     : {
    method       : 'The method you called is not defined'
***REMOVED***

  selector : {
    checkbox : '.ui.checkbox',
    label    : 'label, .box',
    input    : 'input[type="checkbox"], input[type="radio"]',
    link     : 'a[href]'
***REMOVED***

***REMOVED***;

***REMOVED***)( jQuery, window, document );
