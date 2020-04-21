/*!
***REMOVED*** # Fomantic-UI - Tab
***REMOVED*** http://github.com/fomantic/Fomantic-UI/
***REMOVED***
***REMOVED***
***REMOVED*** Released under the MIT license
***REMOVED*** http://opensource.org/licenses/MIT
***REMOVED***
***REMOVED***/

;(function ($, window, document, undefined) {

***REMOVED***;

$.isWindow = $.isWindow || function(obj) {
  return obj != null && obj === obj.window;
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

$.fn.tab = function(parameters) {

  var
    // use window context if none specified
    $allModules     = $.isFunction(this)
        ? $(window)
        : $(this),

    moduleSelector  = $allModules.selector || '',
    time            = new Date().getTime(),
    performance     = [],

    query           = arguments[0],
    methodInvoked   = (typeof query == 'string'),
    queryArguments  = [].slice.call(arguments, 1),

    initializedHistory = false,
    returnedValue
  ;

  $allModules
    .each(function() {
      var

        settings        = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.tab.settings, parameters)
          : $.extend({***REMOVED***, $.fn.tab.settings),

        className       = settings.className,
        metadata        = settings.metadata,
        selector        = settings.selector,
        error           = settings.error,
        regExp          = settings.regExp,

        eventNamespace  = '.' + settings.namespace,
        moduleNamespace = 'module-' + settings.namespace,

        $module         = $(this),
        $context,
        $tabs,

        cache           = {***REMOVED***,
        firstLoad       = true,
        recursionDepth  = 0,
        element         = this,
        instance        = $module.data(moduleNamespace),

        activeTabPath,
        parameterArray,
        module,

        historyEvent

      ;

      module = {

        initialize: function() {
          module.debug('Initializing tab menu item', $module);
          module.fix.callbacks();
          module.determineTabs();

          module.debug('Determining tabs', settings.context, $tabs);
          // set up automatic routing
          if(settings.auto) {
            module.set.auto();
        ***REMOVED***
          module.bind.events();

          if(settings.history && !initializedHistory) {
            module.initializeHistory();
            initializedHistory = true;
        ***REMOVED***

          if(instance === undefined && module.determine.activeTab() == null) {
            module.debug('No active tab detected, setting first tab active', module.get.initialPath());
            module.changeTab(module.get.initialPath());
        ***REMOVED***;

          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function () {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.debug('Destroying tabs', $module);
          $module
            .removeData(moduleNamespace)
            .off(eventNamespace)
          ;
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            // if using $.tab don't add events
            if( !$.isWindow( element ) ) {
              module.debug('Attaching tab activation events to element', $module);
              $module
                .on('click' + eventNamespace, module.event.click)
              ;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        determineTabs: function() {
          var
            $reference
          ;

          // determine tab context
          if(settings.context === 'parent') {
            if($module.closest(selector.ui).length > 0) {
              $reference = $module.closest(selector.ui);
              module.verbose('Using closest UI element as parent', $reference);
          ***REMOVED***
            else {
              $reference = $module;
          ***REMOVED***
            $context = $reference.parent();
            module.verbose('Determined parent element for creating context', $context);
        ***REMOVED***
          else if(settings.context) {
            $context = $(settings.context);
            module.verbose('Using selector for tab context', settings.context, $context);
        ***REMOVED***
          else {
            $context = $('body');
        ***REMOVED***
          // find tabs
          if(settings.childrenOnly) {
            $tabs = $context.children(selector.tabs);
            module.debug('Searching tab context children for tabs', $context, $tabs);
        ***REMOVED***
          else {
            $tabs = $context.find(selector.tabs);
            module.debug('Searching tab context for tabs', $context, $tabs);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        fix: {
          callbacks: function() {
            if( $.isPlainObject(parameters) && (parameters.onTabLoad || parameters.onTabInit) ) {
              if(parameters.onTabLoad) {
                parameters.onLoad = parameters.onTabLoad;
                delete parameters.onTabLoad;
                module.error(error.legacyLoad, parameters.onLoad);
            ***REMOVED***
              if(parameters.onTabInit) {
                parameters.onFirstLoad = parameters.onTabInit;
                delete parameters.onTabInit;
                module.error(error.legacyInit, parameters.onFirstLoad);
            ***REMOVED***
              settings = $.extend(true, {***REMOVED***, $.fn.tab.settings, parameters);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        initializeHistory: function() {
          module.debug('Initializing page state');
          if( $.address === undefined ) {
            module.error(error.state);
            return false;
        ***REMOVED***
          else {
            if(settings.historyType == 'state') {
              module.debug('Using HTML5 to manage state');
              if(settings.path !== false) {
                $.address
                  .history(true)
                  .state(settings.path)
                ;
            ***REMOVED***
              else {
                module.error(error.path);
                return false;
            ***REMOVED***
          ***REMOVED***
            $.address
              .bind('change', module.event.history.change)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          click: function(event) {
            var
              tabPath = $(this).data(metadata.tab)
            ;
            if(tabPath !== undefined) {
              if(settings.history) {
                module.verbose('Updating page state', event);
                $.address.value(tabPath);
            ***REMOVED***
              else {
                module.verbose('Changing tab', event);
                module.changeTab(tabPath);
            ***REMOVED***
              event.preventDefault();
          ***REMOVED***
            else {
              module.debug('No tab specified');
          ***REMOVED***
   ***REMOVED*****REMOVED***
          history: {
            change: function(event) {
              var
                tabPath   = event.pathNames.join('/') || module.get.initialPath(),
                pageTitle = settings.templates.determineTitle(tabPath) || false
              ;
              module.performance.display();
              module.debug('History change event', tabPath, event);
              historyEvent = event;
              if(tabPath !== undefined) {
                module.changeTab(tabPath);
            ***REMOVED***
              if(pageTitle) {
                $.address.title(pageTitle);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        refresh: function() {
          if(activeTabPath) {
            module.debug('Refreshing tab', activeTabPath);
            module.changeTab(activeTabPath);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        cache: {

          read: function(cacheKey) {
            return (cacheKey !== undefined)
              ? cache[cacheKey]
              : false
            ;
   ***REMOVED*****REMOVED***
          add: function(cacheKey, content) {
            cacheKey = cacheKey || activeTabPath;
            module.debug('Adding cached content for', cacheKey);
            cache[cacheKey] = content;
   ***REMOVED*****REMOVED***
          remove: function(cacheKey) {
            cacheKey = cacheKey || activeTabPath;
            module.debug('Removing cached content for', cacheKey);
            delete cache[cacheKey];
        ***REMOVED***
 ***REMOVED*****REMOVED***

        escape: {
          string: function(text) {
            text =  String(text);
            return text.replace(regExp.escape, '\\$&');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          auto: function() {
            var
              url = (typeof settings.path == 'string')
                ? settings.path.replace(/\/$/, '') + '/{$tab***REMOVED***'
                : '/{$tab***REMOVED***'
            ;
            module.verbose('Setting up automatic tab retrieval from server', url);
            if($.isPlainObject(settings.apiSettings)) {
              settings.apiSettings.url = url;
          ***REMOVED***
            else {
              settings.apiSettings = {
                url: url
            ***REMOVED***;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          loading: function(tabPath) {
            var
              $tab      = module.get.tabElement(tabPath),
              isLoading = $tab.hasClass(className.loading)
            ;
            if(!isLoading) {
              module.verbose('Setting loading state for', $tab);
              $tab
                .addClass(className.loading)
                .siblings($tabs)
                  .removeClass(className.active + ' ' + className.loading)
              ;
              if($tab.length > 0) {
                settings.onRequest.call($tab[0], tabPath);
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          state: function(state) {
            $.address.value(state);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        changeTab: function(tabPath) {
          var
            pushStateAvailable = (window.history && window.history.pushState),
            shouldIgnoreLoad   = (pushStateAvailable && settings.ignoreFirstLoad && firstLoad),
            remoteContent      = (settings.auto || $.isPlainObject(settings.apiSettings) ),
            // only add default path if not remote content
            pathArray = (remoteContent && !shouldIgnoreLoad)
              ? module.utilities.pathToArray(tabPath)
              : module.get.defaultPathArray(tabPath)
          ;
          tabPath = module.utilities.arrayToPath(pathArray);
          $.each(pathArray, function(index, tab) {
            var
              currentPathArray   = pathArray.slice(0, index + 1),
              currentPath        = module.utilities.arrayToPath(currentPathArray),

              isTab              = module.is.tab(currentPath),
              isLastIndex        = (index + 1 == pathArray.length),

              $tab               = module.get.tabElement(currentPath),
              $anchor,
              nextPathArray,
              nextPath,
              isLastTab
            ;
            module.verbose('Looking for tab', tab);
            if(isTab) {
              module.verbose('Tab was found', tab);
              // scope up
              activeTabPath  = currentPath;
              parameterArray = module.utilities.filterArray(pathArray, currentPathArray);

              if(isLastIndex) {
                isLastTab = true;
            ***REMOVED***
              else {
                nextPathArray = pathArray.slice(0, index + 2);
                nextPath      = module.utilities.arrayToPath(nextPathArray);
                isLastTab     = ( !module.is.tab(nextPath) );
                if(isLastTab) {
                  module.verbose('Tab parameters found', nextPathArray);
              ***REMOVED***
            ***REMOVED***
              if(isLastTab && remoteContent) {
                if(!shouldIgnoreLoad) {
                  module.activate.navigation(currentPath);
                  module.fetch.content(currentPath, tabPath);
              ***REMOVED***
                else {
                  module.debug('Ignoring remote content on first tab load', currentPath);
                  firstLoad = false;
                  module.cache.add(tabPath, $tab.html());
                  module.activate.all(currentPath);
                  settings.onFirstLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                  settings.onLoad.call($tab[0], currentPath, parameterArray, historyEvent);
              ***REMOVED***
                return false;
            ***REMOVED***
              else {
                module.debug('Opened local tab', currentPath);
                module.activate.all(currentPath);
                if( !module.cache.read(currentPath) ) {
                  module.cache.add(currentPath, true);
                  module.debug('First time tab loaded calling tab init');
                  settings.onFirstLoad.call($tab[0], currentPath, parameterArray, historyEvent);
              ***REMOVED***
                settings.onLoad.call($tab[0], currentPath, parameterArray, historyEvent);
            ***REMOVED***

          ***REMOVED***
            else if(tabPath.search('/') == -1 && tabPath !== '') {
              // look for in page anchor
              tabPath = module.escape.string(tabPath);
              $anchor     = $('#' + tabPath + ', a[name="' + tabPath + '"]');
              currentPath = $anchor.closest('[data-tab]').data(metadata.tab);
              $tab        = module.get.tabElement(currentPath);
              // if anchor exists use parent tab
              if($anchor && $anchor.length > 0 && currentPath) {
                module.debug('Anchor link used, opening parent tab', $tab, $anchor);
                if( !$tab.hasClass(className.active) ) {
                  setTimeout(function() {
                    module.scrollTo($anchor);
      ***REMOVED*****REMOVED*****REMOVED*** 0);
              ***REMOVED***
                module.activate.all(currentPath);
                if( !module.cache.read(currentPath) ) {
                  module.cache.add(currentPath, true);
                  module.debug('First time tab loaded calling tab init');
                  settings.onFirstLoad.call($tab[0], currentPath, parameterArray, historyEvent);
              ***REMOVED***
                settings.onLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                return false;
            ***REMOVED***
          ***REMOVED***
            else {
              module.error(error.missingTab, $module, $context, currentPath);
              return false;
          ***REMOVED***
        ***REMOVED***);
 ***REMOVED*****REMOVED***

        scrollTo: function($element) {
          var
            scrollOffset = ($element && $element.length > 0)
              ? $element.offset().top
              : false
          ;
          if(scrollOffset !== false) {
            module.debug('Forcing scroll to an in-page link in a hidden tab', scrollOffset, $element);
            $(document).scrollTop(scrollOffset);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        update: {
          content: function(tabPath, html, evaluateScripts) {
            var
              $tab = module.get.tabElement(tabPath),
              tab  = $tab[0]
            ;
            evaluateScripts = (evaluateScripts !== undefined)
              ? evaluateScripts
              : settings.evaluateScripts
            ;
            if(typeof settings.cacheType == 'string' && settings.cacheType.toLowerCase() == 'dom' && typeof html !== 'string') {
              $tab
                .empty()
                .append($(html).clone(true))
              ;
          ***REMOVED***
            else {
              if(evaluateScripts) {
                module.debug('Updating HTML and evaluating inline scripts', tabPath, html);
                $tab.html(html);
            ***REMOVED***
              else {
                module.debug('Updating HTML', tabPath, html);
                tab.innerHTML = html;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        fetch: {

          content: function(tabPath, fullTabPath) {
            var
              $tab        = module.get.tabElement(tabPath),
              apiSettings = {
                dataType         : 'html',
                encodeParameters : false,
                on               : 'now',
                cache            : settings.alwaysRefresh,
                headers          : {
                  'X-Remote': true
    ***REMOVED*****REMOVED*****REMOVED***
                onSuccess : function(response) {
                  if(settings.cacheType == 'response') {
                    module.cache.add(fullTabPath, response);
                ***REMOVED***
                  module.update.content(tabPath, response);
                  if(tabPath == activeTabPath) {
                    module.debug('Content loaded', tabPath);
                    module.activate.tab(tabPath);
                ***REMOVED***
                  else {
                    module.debug('Content loaded in background', tabPath);
                ***REMOVED***
                  settings.onFirstLoad.call($tab[0], tabPath, parameterArray, historyEvent);
                  settings.onLoad.call($tab[0], tabPath, parameterArray, historyEvent);

                  if(settings.loadOnce) {
                    module.cache.add(fullTabPath, true);
                ***REMOVED***
                  else if(typeof settings.cacheType == 'string' && settings.cacheType.toLowerCase() == 'dom' && $tab.children().length > 0) {
                    setTimeout(function() {
                      var
                        $clone = $tab.children().clone(true)
                      ;
                      $clone = $clone.not('script');
                      module.cache.add(fullTabPath, $clone);
        ***REMOVED*****REMOVED*****REMOVED*** 0);
                ***REMOVED***
                  else {
                    module.cache.add(fullTabPath, $tab.html());
                ***REMOVED***
    ***REMOVED*****REMOVED*****REMOVED***
                urlData: {
                  tab: fullTabPath
              ***REMOVED***
  ***REMOVED*****REMOVED*****REMOVED***
              request         = $tab.api('get request') || false,
              existingRequest = ( request && request.state() === 'pending' ),
              requestSettings,
              cachedContent
            ;

            fullTabPath   = fullTabPath || tabPath;
            cachedContent = module.cache.read(fullTabPath);


            if(settings.cache && cachedContent) {
              module.activate.tab(tabPath);
              module.debug('Adding cached content', fullTabPath);
              if(!settings.loadOnce) {
                if(settings.evaluateScripts == 'once') {
                  module.update.content(tabPath, cachedContent, false);
              ***REMOVED***
                else {
                  module.update.content(tabPath, cachedContent);
              ***REMOVED***
            ***REMOVED***
              settings.onLoad.call($tab[0], tabPath, parameterArray, historyEvent);
          ***REMOVED***
            else if(existingRequest) {
              module.set.loading(tabPath);
              module.debug('Content is already loading', fullTabPath);
          ***REMOVED***
            else if($.api !== undefined) {
              requestSettings = $.extend(true, {***REMOVED***, settings.apiSettings, apiSettings);
              module.debug('Retrieving remote content', fullTabPath, requestSettings);
              module.set.loading(tabPath);
              $tab.api(requestSettings);
          ***REMOVED***
            else {
              module.error(error.api);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        activate: {
          all: function(tabPath) {
            module.activate.tab(tabPath);
            module.activate.navigation(tabPath);
   ***REMOVED*****REMOVED***
          tab: function(tabPath) {
            var
              $tab          = module.get.tabElement(tabPath),
              $deactiveTabs = (settings.deactivate == 'siblings')
                ? $tab.siblings($tabs)
                : $tabs.not($tab),
              isActive      = $tab.hasClass(className.active)
            ;
            module.verbose('Showing tab content for', $tab);
            if(!isActive) {
              $tab
                .addClass(className.active)
              ;
              $deactiveTabs
                .removeClass(className.active + ' ' + className.loading)
              ;
              if($tab.length > 0) {
                settings.onVisible.call($tab[0], tabPath);
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          navigation: function(tabPath) {
            var
              $navigation         = module.get.navElement(tabPath),
              $deactiveNavigation = (settings.deactivate == 'siblings')
                ? $navigation.siblings($allModules)
                : $allModules.not($navigation),
              isActive    = $navigation.hasClass(className.active)
            ;
            module.verbose('Activating tab navigation for', $navigation, tabPath);
            if(!isActive) {
              $navigation
                .addClass(className.active)
              ;
              $deactiveNavigation
                .removeClass(className.active + ' ' + className.loading)
              ;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        deactivate: {
          all: function() {
            module.deactivate.navigation();
            module.deactivate.tabs();
   ***REMOVED*****REMOVED***
          navigation: function() {
            $allModules
              .removeClass(className.active)
            ;
   ***REMOVED*****REMOVED***
          tabs: function() {
            $tabs
              .removeClass(className.active + ' ' + className.loading)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          tab: function(tabName) {
            return (tabName !== undefined)
              ? ( module.get.tabElement(tabName).length > 0 )
              : false
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          initialPath: function() {
            return $allModules.eq(0).data(metadata.tab) || $tabs.eq(0).data(metadata.tab);
   ***REMOVED*****REMOVED***
          path: function() {
            return $.address.value();
   ***REMOVED*****REMOVED***
          // adds default tabs to tab path
          defaultPathArray: function(tabPath) {
            return module.utilities.pathToArray( module.get.defaultPath(tabPath) );
   ***REMOVED*****REMOVED***
          defaultPath: function(tabPath) {
            var
              $defaultNav = $allModules.filter('[data-' + metadata.tab + '^="' + module.escape.string(tabPath) + '/"]').eq(0),
              defaultTab  = $defaultNav.data(metadata.tab) || false
            ;
            if( defaultTab ) {
              module.debug('Found default tab', defaultTab);
              if(recursionDepth < settings.maxDepth) {
                recursionDepth++;
                return module.get.defaultPath(defaultTab);
            ***REMOVED***
              module.error(error.recursion);
          ***REMOVED***
            else {
              module.debug('No default tabs found for', tabPath, $tabs);
          ***REMOVED***
            recursionDepth = 0;
            return tabPath;
   ***REMOVED*****REMOVED***
          navElement: function(tabPath) {
            tabPath = tabPath || activeTabPath;
            return $allModules.filter('[data-' + metadata.tab + '="' + module.escape.string(tabPath) + '"]');
   ***REMOVED*****REMOVED***
          tabElement: function(tabPath) {
            var
              $fullPathTab,
              $simplePathTab,
              tabPathArray,
              lastTab
            ;
            tabPath        = tabPath || activeTabPath;
            tabPathArray   = module.utilities.pathToArray(tabPath);
            lastTab        = module.utilities.last(tabPathArray);
            $fullPathTab   = $tabs.filter('[data-' + metadata.tab + '="' + module.escape.string(tabPath) + '"]');
            $simplePathTab = $tabs.filter('[data-' + metadata.tab + '="' + module.escape.string(lastTab) + '"]');
            return ($fullPathTab.length > 0)
              ? $fullPathTab
              : $simplePathTab
            ;
   ***REMOVED*****REMOVED***
          tab: function() {
            return activeTabPath;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        determine: {
          activeTab: function() {
            var activeTab = null;

            $tabs.each(function(_index, tab) {
              var $tab = $(tab);

              if( $tab.hasClass(className.active) ) {
                var
                  tabPath = $(this).data(metadata.tab),
                  $anchor = $allModules.filter('[data-' + metadata.tab + '="' + module.escape.string(tabPath) + '"]')
                ;

                if( $anchor.hasClass(className.active) ) {
                  activeTab = tabPath;
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***);

            return activeTab;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        utilities: {
          filterArray: function(keepArray, removeArray) {
            return $.grep(keepArray, function(keepValue) {
              return ( $.inArray(keepValue, removeArray) == -1);
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          last: function(array) {
            return Array.isArray(array)
              ? array[ array.length - 1]
              : false
            ;
   ***REMOVED*****REMOVED***
          pathToArray: function(pathName) {
            if(pathName === undefined) {
              pathName = activeTabPath;
          ***REMOVED***
            return typeof pathName == 'string'
              ? pathName.split('/')
              : [pathName]
            ;
   ***REMOVED*****REMOVED***
          arrayToPath: function(pathArray) {
            return Array.isArray(pathArray)
              ? pathArray.join('/')
              : false
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

// shortcut for tabbed content with no defined navigation
$.tab = function() {
  $(window).tab.apply(this, arguments);
***REMOVED***;

$.fn.tab.settings = {

  name            : 'Tab',
  namespace       : 'tab',

  silent          : false,
  debug           : false,
  verbose         : false,
  performance     : true,

  auto            : false,      // uses pjax style endpoints fetching content from same url with remote-content headers
  history         : false,      // use browser history
  historyType     : 'hash',     // #/ or html5 state
  path            : false,      // base path of url

  context         : false,      // specify a context that tabs must appear inside
  childrenOnly    : false,      // use only tabs that are children of context
  maxDepth        : 25,         // max depth a tab can be nested

  deactivate      : 'siblings', // whether tabs should deactivate sibling menu elements or all elements initialized together

  alwaysRefresh   : false,      // load tab content new every tab click
  cache           : true,       // cache the content requests to pull locally
  loadOnce        : false,      // Whether tab data should only be loaded once when using remote content
  cacheType       : 'response', // Whether to cache exact response, or to html cache contents after scripts execute
  ignoreFirstLoad : false,      // don't load remote content on first load

  apiSettings     : false,      // settings for api call
  evaluateScripts : 'once',     // whether inline scripts should be parsed (true/false/once). Once will not re-evaluate on cached content

  onFirstLoad : function(tabPath, parameterArray, historyEvent) {***REMOVED***, // called first time loaded
  onLoad      : function(tabPath, parameterArray, historyEvent) {***REMOVED***, // called on every load
  onVisible   : function(tabPath, parameterArray, historyEvent) {***REMOVED***, // called every time tab visible
  onRequest   : function(tabPath, parameterArray, historyEvent) {***REMOVED***, // called ever time a tab beings loading remote content

  templates : {
    determineTitle: function(tabArray) {***REMOVED*** // returns page title for path
***REMOVED***

  error: {
    api        : 'You attempted to load content without API module',
    method     : 'The method you called is not defined',
    missingTab : 'Activated tab cannot be found. Tabs are case-sensitive.',
    noContent  : 'The tab you specified is missing a content url.',
    path       : 'History enabled, but no path was specified',
    recursion  : 'Max recursive depth reached',
    legacyInit : 'onTabInit has been renamed to onFirstLoad in 2.0, please adjust your code.',
    legacyLoad : 'onTabLoad has been renamed to onLoad in 2.0. Please adjust your code',
    state      : 'History requires Asual\'s Address library <https://github.com/asual/jquery-address>'
***REMOVED***

  regExp : {
    escape   : /[-[\]{***REMOVED***()*+?.,\\^$|#\s:=@]/g
***REMOVED***

  metadata : {
    tab    : 'tab',
    loaded : 'loaded',
    promise: 'promise'
***REMOVED***

  className   : {
    loading : 'loading',
    active  : 'active'
***REMOVED***

  selector    : {
    tabs : '.ui.tab',
    ui   : '.ui'
***REMOVED***

***REMOVED***;

***REMOVED***)( jQuery, window, document );
