/*!
***REMOVED*** # Fomantic-UI - Rating
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

$.fn.rating = function(parameters) {
  var
    $allModules     = $(this),
    moduleSelector  = $allModules.selector || '',

    time            = new Date().getTime(),
    performance     = [],

    query           = arguments[0],
    methodInvoked   = (typeof query == 'string'),
    queryArguments  = [].slice.call(arguments, 1),
    returnedValue
  ;
  $allModules
    .each(function() {
      var
        settings        = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.rating.settings, parameters)
          : $.extend({***REMOVED***, $.fn.rating.settings),

        namespace       = settings.namespace,
        className       = settings.className,
        metadata        = settings.metadata,
        selector        = settings.selector,
        cssVars         = settings.cssVars,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        element         = this,
        instance        = $(this).data(moduleNamespace),

        $module         = $(this),
        $icon           = $module.find(selector.icon),

        initialLoad,
        module
      ;

      module = {

        initialize: function() {
          module.verbose('Initializing rating module', settings);

          if($icon.length === 0) {
            module.setup.layout();
        ***REMOVED***

          if(settings.interactive && !module.is.disabled()) {
            module.enable();
        ***REMOVED***
          else {
            module.disable();
        ***REMOVED***
          module.set.initialLoad();
          module.set.rating( module.get.initialRating() );
          module.remove.initialLoad();
          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Instantiating module', settings);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.verbose('Destroying previous instance', instance);
          module.remove.events();
          $module
            .removeData(moduleNamespace)
          ;
 ***REMOVED*****REMOVED***

        refresh: function() {
          $icon   = $module.find(selector.icon);
 ***REMOVED*****REMOVED***

        setup: {
          layout: function() {
            var
              maxRating = module.get.maxRating(),
              icon      = module.get.icon(),
              html      = $.fn.rating.settings.templates.icon(maxRating, icon)
            ;
            module.debug('Generating icon html dynamically');
            $module
              .html(html)
            ;
            module.refresh();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          mouseenter: function() {
            var
              $activeIcon = $(this)
            ;
            $activeIcon
              .nextAll()
                .removeClass(className.selected)
            ;
            $module
              .addClass(className.selected)
            ;
            $activeIcon
              .addClass(className.selected)
                .prevAll()
                .addClass(className.selected)
            ;
   ***REMOVED*****REMOVED***
          mouseleave: function() {
            $module
              .removeClass(className.selected)
            ;
            $icon
              .removeClass(className.selected)
            ;
   ***REMOVED*****REMOVED***
          click: function() {
            var
              $activeIcon   = $(this),
              currentRating = module.get.rating(),
              rating        = $icon.index($activeIcon) + 1,
              canClear      = (settings.clearable == 'auto')
               ? ($icon.length === 1)
               : settings.clearable
            ;
            if(canClear && currentRating == rating) {
              module.clearRating();
          ***REMOVED***
            else {
              module.set.rating( rating );
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        clearRating: function() {
          module.debug('Clearing current rating');
          module.set.rating(0);
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            module.verbose('Binding events');
            $module
              .on('mouseenter' + eventNamespace, selector.icon, module.event.mouseenter)
              .on('mouseleave' + eventNamespace, selector.icon, module.event.mouseleave)
              .on('click'      + eventNamespace, selector.icon, module.event.click)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          events: function() {
            module.verbose('Removing events');
            $module
              .off(eventNamespace)
            ;
   ***REMOVED*****REMOVED***
          initialLoad: function() {
            initialLoad = false;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        enable: function() {
          module.debug('Setting rating to interactive mode');
          module.bind.events();
          $module
            .removeClass(className.disabled)
          ;
 ***REMOVED*****REMOVED***

        disable: function() {
          module.debug('Setting rating to read-only mode');
          module.remove.events();
          $module
            .addClass(className.disabled)
          ;
 ***REMOVED*****REMOVED***

        is: {
          initialLoad: function() {
            return initialLoad;
   ***REMOVED*****REMOVED***
          disabled: function() {
            return $module.hasClass(className.disabled);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          icon: function(){
            var icon = $module.data(metadata.icon);
            if (icon) {
              $module.removeData(metadata.icon);
          ***REMOVED***
            return icon || settings.icon;
   ***REMOVED*****REMOVED***
          initialRating: function() {
            if($module.data(metadata.rating) !== undefined) {
              $module.removeData(metadata.rating);
              return $module.data(metadata.rating);
          ***REMOVED***
            return settings.initialRating;
   ***REMOVED*****REMOVED***
          maxRating: function() {
            if($module.data(metadata.maxRating) !== undefined) {
              $module.removeData(metadata.maxRating);
              return $module.data(metadata.maxRating);
          ***REMOVED***
            return settings.maxRating;
   ***REMOVED*****REMOVED***
          rating: function() {
            var
              currentRating = $icon.filter('.' + className.active).length
            ;
            module.verbose('Current rating retrieved', currentRating);
            return currentRating;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          rating: function(rating) {
            var
              ratingIndex = Math.floor(
                (rating - 1 >= 0)
                  ? (rating - 1)
                  : 0
              ),
              $activeIcon = $icon.eq(ratingIndex),
              $partialActiveIcon = rating <= 1
                ? $activeIcon
                : $activeIcon.next()
              ,
              filledPercentage = (rating % 1)***REMOVED*** 100
            ;
            $module
              .removeClass(className.selected)
            ;
            $icon
              .removeClass(className.selected)
              .removeClass(className.active)
              .removeClass(className.partiallyActive)
            ;
            if(rating > 0) {
              module.verbose('Setting current rating to', rating);
              $activeIcon
                .prevAll()
                .addBack()
                .addClass(className.active)
              ;
              if($activeIcon.next() && rating % 1 !== 0) {
                $partialActiveIcon
                  .addClass(className.partiallyActive)
                  .addClass(className.active)
                ;
                $partialActiveIcon
                  .css(cssVars.filledCustomPropName, filledPercentage + '%')
                ;
                if($partialActiveIcon.css('backgroundColor') === 'transparent') {
                  $partialActiveIcon
                    .removeClass(className.partiallyActive)
                    .removeClass(className.active)
                  ;
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
            if(!module.is.initialLoad()) {
              settings.onRate.call(element, rating);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          initialLoad: function() {
            initialLoad = true;
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

$.fn.rating.settings = {

  name          : 'Rating',
  namespace     : 'rating',

  icon          : 'star',

  silent        : false,
  debug         : false,
  verbose       : false,
  performance   : true,

  initialRating : 0,
  interactive   : true,
  maxRating     : 4,
  clearable     : 'auto',

  fireOnInit    : false,

  onRate        : function(rating){***REMOVED***,

  error         : {
    method    : 'The method you called is not defined',
    noMaximum : 'No maximum rating specified. Cannot generate HTML automatically'
***REMOVED***


  metadata: {
    rating    : 'rating',
    maxRating : 'maxRating',
    icon      : 'icon'
***REMOVED***

  className : {
    active   : 'active',
    disabled : 'disabled',
    selected : 'selected',
    loading  : 'loading',
    partiallyActive : 'partial'
***REMOVED***

  cssVars : {
    filledCustomPropName : '--full'
***REMOVED***

  selector  : {
    icon : '.icon'
***REMOVED***

  templates: {
    icon: function(maxRating, iconClass) {
      var
        icon = 1,
        html = ''
      ;
      while(icon <= maxRating) {
        html += '<i class="'+iconClass+' icon"></i>';
        icon++;
    ***REMOVED***
      return html;
  ***REMOVED***
***REMOVED***

***REMOVED***;

***REMOVED***)( jQuery, window, document );
