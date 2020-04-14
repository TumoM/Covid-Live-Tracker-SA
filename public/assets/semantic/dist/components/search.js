/*!
***REMOVED*** # Fomantic-UI - Search
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

$.fn.search = function(parameters) {
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
  $(this)
    .each(function() {
      var
        settings          = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.search.settings, parameters)
          : $.extend({***REMOVED***, $.fn.search.settings),

        className        = settings.className,
        metadata         = settings.metadata,
        regExp           = settings.regExp,
        fields           = settings.fields,
        selector         = settings.selector,
        error            = settings.error,
        namespace        = settings.namespace,

        eventNamespace   = '.' + namespace,
        moduleNamespace  = namespace + '-module',

        $module          = $(this),
        $prompt          = $module.find(selector.prompt),
        $searchButton    = $module.find(selector.searchButton),
        $results         = $module.find(selector.results),
        $result          = $module.find(selector.result),
        $category        = $module.find(selector.category),

        element          = this,
        instance         = $module.data(moduleNamespace),

        disabledBubbled  = false,
        resultsDismissed = false,

        module
      ;

      module = {

        initialize: function() {
          module.verbose('Initializing module');
          module.get.settings();
          module.determine.searchFields();
          module.bind.events();
          module.set.type();
          module.create.results();
          module.instantiate();
 ***REMOVED*****REMOVED***
        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
 ***REMOVED*****REMOVED***
        destroy: function() {
          module.verbose('Destroying instance');
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
 ***REMOVED*****REMOVED***

        refresh: function() {
          module.debug('Refreshing selector cache');
          $prompt         = $module.find(selector.prompt);
          $searchButton   = $module.find(selector.searchButton);
          $category       = $module.find(selector.category);
          $results        = $module.find(selector.results);
          $result         = $module.find(selector.result);
 ***REMOVED*****REMOVED***

        refreshResults: function() {
          $results = $module.find(selector.results);
          $result  = $module.find(selector.result);
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            module.verbose('Binding events to search');
            if(settings.automatic) {
              $module
                .on(module.get.inputEvent() + eventNamespace, selector.prompt, module.event.input)
              ;
              $prompt
                .attr('autocomplete', 'off')
              ;
          ***REMOVED***
            $module
              // prompt
              .on('focus'     + eventNamespace, selector.prompt, module.event.focus)
              .on('blur'      + eventNamespace, selector.prompt, module.event.blur)
              .on('keydown'   + eventNamespace, selector.prompt, module.handleKeyboard)
              // search button
              .on('click'     + eventNamespace, selector.searchButton, module.query)
              // results
              .on('mousedown' + eventNamespace, selector.results, module.event.result.mousedown)
              .on('mouseup'   + eventNamespace, selector.results, module.event.result.mouseup)
              .on('click'     + eventNamespace, selector.result,  module.event.result.click)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        determine: {
          searchFields: function() {
            // this makes sure $.extend does not add specified search fields to default fields
            // this is the only setting which should not extend defaults
            if(parameters && parameters.searchFields !== undefined) {
              settings.searchFields = parameters.searchFields;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          input: function() {
            if(settings.searchDelay) {
              clearTimeout(module.timer);
              module.timer = setTimeout(function() {
                if(module.is.focused()) {
                  module.query();
              ***REMOVED***
  ***REMOVED*****REMOVED*****REMOVED*** settings.searchDelay);
          ***REMOVED***
            else {
              module.query();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          focus: function() {
            module.set.focus();
            if(settings.searchOnFocus && module.has.minimumCharacters() ) {
              module.query(function() {
                if(module.can.show() ) {
                  module.showResults();
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          blur: function(event) {
            var
              pageLostFocus = (document.activeElement === this),
              callback      = function() {
                module.cancel.query();
                module.remove.focus();
                module.timer = setTimeout(module.hideResults, settings.hideDelay);
            ***REMOVED***
            ;
            if(pageLostFocus) {
              return;
          ***REMOVED***
            resultsDismissed = false;
            if(module.resultsClicked) {
              module.debug('Determining if user action caused search to close');
              $module
                .one('click.close' + eventNamespace, selector.results, function(event) {
                  if(module.is.inMessage(event) || disabledBubbled) {
                    $prompt.focus();
                    return;
                ***REMOVED***
                  disabledBubbled = false;
                  if( !module.is.animating() && !module.is.hidden()) {
                    callback();
                ***REMOVED***
              ***REMOVED***)
              ;
          ***REMOVED***
            else {
              module.debug('Input blurred without user action, closing results');
              callback();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          result: {
            mousedown: function() {
              module.resultsClicked = true;
***REMOVED*****REMOVED*****REMOVED***
            mouseup: function() {
              module.resultsClicked = false;
***REMOVED*****REMOVED*****REMOVED***
            click: function(event) {
              module.debug('Search result selected');
              var
                $result = $(this),
                $title  = $result.find(selector.title).eq(0),
                $link   = $result.is('a[href]')
                  ? $result
                  : $result.find('a[href]').eq(0),
                href    = $link.attr('href')   || false,
                target  = $link.attr('target') || false,
                // title is used for result lookup
                value   = ($title.length > 0)
                  ? $title.text()
                  : false,
                results = module.get.results(),
                result  = $result.data(metadata.result) || module.get.result(value, results)
              ;
              if(value) {
                module.set.value(value);
            ***REMOVED***
              if( $.isFunction(settings.onSelect) ) {
                if(settings.onSelect.call(element, result, results) === false) {
                  module.debug('Custom onSelect callback cancelled default select action');
                  disabledBubbled = true;
                  return;
              ***REMOVED***
            ***REMOVED***
              module.hideResults();
              if(href) {
                module.verbose('Opening search link found in result', $link);
                if(target == '_blank' || event.ctrlKey) {
                  window.open(href);
              ***REMOVED***
                else {
                  window.location.href = (href);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***
        handleKeyboard: function(event) {
          var
            // force selector refresh
            $result         = $module.find(selector.result),
            $category       = $module.find(selector.category),
            $activeResult   = $result.filter('.' + className.active),
            currentIndex    = $result.index( $activeResult ),
            resultSize      = $result.length,
            hasActiveResult = $activeResult.length > 0,

            keyCode         = event.which,
            keys            = {
              backspace : 8,
              enter     : 13,
              escape    : 27,
              upArrow   : 38,
              downArrow : 40
***REMOVED*****REMOVED*****REMOVED***
            newIndex
          ;
          // search shortcuts
          if(keyCode == keys.escape) {
            module.verbose('Escape key pressed, blurring search field');
            module.hideResults();
            resultsDismissed = true;
        ***REMOVED***
          if( module.is.visible() ) {
            if(keyCode == keys.enter) {
              module.verbose('Enter key pressed, selecting active result');
              if( $result.filter('.' + className.active).length > 0 ) {
                module.event.result.click.call($result.filter('.' + className.active), event);
                event.preventDefault();
                return false;
            ***REMOVED***
          ***REMOVED***
            else if(keyCode == keys.upArrow && hasActiveResult) {
              module.verbose('Up key pressed, changing active result');
              newIndex = (currentIndex - 1 < 0)
                ? currentIndex
                : currentIndex - 1
              ;
              $category
                .removeClass(className.active)
              ;
              $result
                .removeClass(className.active)
                .eq(newIndex)
                  .addClass(className.active)
                  .closest($category)
                    .addClass(className.active)
              ;
              event.preventDefault();
          ***REMOVED***
            else if(keyCode == keys.downArrow) {
              module.verbose('Down key pressed, changing active result');
              newIndex = (currentIndex + 1 >= resultSize)
                ? currentIndex
                : currentIndex + 1
              ;
              $category
                .removeClass(className.active)
              ;
              $result
                .removeClass(className.active)
                .eq(newIndex)
                  .addClass(className.active)
                  .closest($category)
                    .addClass(className.active)
              ;
              event.preventDefault();
          ***REMOVED***
        ***REMOVED***
          else {
            // query shortcuts
            if(keyCode == keys.enter) {
              module.verbose('Enter key pressed, executing query');
              module.query();
              module.set.buttonPressed();
              $prompt.one('keyup', module.remove.buttonFocus);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        setup: {
          api: function(searchTerm, callback) {
            var
              apiSettings = {
                debug             : settings.debug,
                on                : false,
                cache             : settings.cache,
                action            : 'search',
                urlData           : {
                  query : searchTerm
    ***REMOVED*****REMOVED*****REMOVED***
                onSuccess         : function(response) {
                  module.parse.response.call(element, response, searchTerm);
                  callback();
    ***REMOVED*****REMOVED*****REMOVED***
                onFailure         : function() {
                  module.displayMessage(error.serverError);
                  callback();
    ***REMOVED*****REMOVED*****REMOVED***
                onAbort : function(response) {
    ***REMOVED*****REMOVED*****REMOVED***
                onError           : module.error
            ***REMOVED***
            ;
            $.extend(true, apiSettings, settings.apiSettings);
            module.verbose('Setting up API request', apiSettings);
            $module.api(apiSettings);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        can: {
          useAPI: function() {
            return $.fn.api !== undefined;
   ***REMOVED*****REMOVED***
          show: function() {
            return module.is.focused() && !module.is.visible() && !module.is.empty();
   ***REMOVED*****REMOVED***
          transition: function() {
            return settings.transition && $.fn.transition !== undefined && $module.transition('is supported');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          animating: function() {
            return $results.hasClass(className.animating);
   ***REMOVED*****REMOVED***
          hidden: function() {
            return $results.hasClass(className.hidden);
   ***REMOVED*****REMOVED***
          inMessage: function(event) {
            if(!event.target) {
              return;
          ***REMOVED***
            var
              $target = $(event.target),
              isInDOM = $.contains(document.documentElement, event.target)
            ;
            return (isInDOM && $target.closest(selector.message).length > 0);
   ***REMOVED*****REMOVED***
          empty: function() {
            return ($results.html() === '');
   ***REMOVED*****REMOVED***
          visible: function() {
            return ($results.filter(':visible').length > 0);
   ***REMOVED*****REMOVED***
          focused: function() {
            return ($prompt.filter(':focus').length > 0);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          settings: function() {
            if($.isPlainObject(parameters) && parameters.searchFullText) {
              settings.fullTextSearch = parameters.searchFullText;
              module.error(settings.error.oldSearchSyntax, element);
          ***REMOVED***
            if (settings.ignoreDiacritics && !String.prototype.normalize) {
              settings.ignoreDiacritics = false;
              module.error(error.noNormalize, element);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          inputEvent: function() {
            var
              prompt = $prompt[0],
              inputEvent   = (prompt !== undefined && prompt.oninput !== undefined)
                ? 'input'
                : (prompt !== undefined && prompt.onpropertychange !== undefined)
                  ? 'propertychange'
                  : 'keyup'
            ;
            return inputEvent;
   ***REMOVED*****REMOVED***
          value: function() {
            return $prompt.val();
   ***REMOVED*****REMOVED***
          results: function() {
            var
              results = $module.data(metadata.results)
            ;
            return results;
   ***REMOVED*****REMOVED***
          result: function(value, results) {
            var
              result       = false
            ;
            value = (value !== undefined)
              ? value
              : module.get.value()
            ;
            results = (results !== undefined)
              ? results
              : module.get.results()
            ;
            if(settings.type === 'category') {
              module.debug('Finding result that matches', value);
              $.each(results, function(index, category) {
                if(Array.isArray(category.results)) {
                  result = module.search.object(value, category.results)[0];
                  // don't continue searching if a result is found
                  if(result) {
                    return false;
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***
            else {
              module.debug('Finding result in results object', value);
              result = module.search.object(value, results)[0];
          ***REMOVED***
            return result || false;
   ***REMOVED*****REMOVED***
 ***REMOVED*****REMOVED***

        select: {
          firstResult: function() {
            module.verbose('Selecting first result');
            $result.first().addClass(className.active);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          focus: function() {
            $module.addClass(className.focus);
   ***REMOVED*****REMOVED***
          loading: function() {
            $module.addClass(className.loading);
   ***REMOVED*****REMOVED***
          value: function(value) {
            module.verbose('Setting search input value', value);
            $prompt
              .val(value)
            ;
   ***REMOVED*****REMOVED***
          type: function(type) {
            type = type || settings.type;
            if(settings.type == 'category') {
              $module.addClass(settings.type);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          buttonPressed: function() {
            $searchButton.addClass(className.pressed);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          loading: function() {
            $module.removeClass(className.loading);
   ***REMOVED*****REMOVED***
          focus: function() {
            $module.removeClass(className.focus);
   ***REMOVED*****REMOVED***
          buttonPressed: function() {
            $searchButton.removeClass(className.pressed);
   ***REMOVED*****REMOVED***
          diacritics: function(text) {
            return settings.ignoreDiacritics ?  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : text;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        query: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          var
            searchTerm = module.get.value(),
            cache = module.read.cache(searchTerm)
          ;
          callback = callback || function() {***REMOVED***;
          if( module.has.minimumCharacters() )  {
            if(cache) {
              module.debug('Reading result from cache', searchTerm);
              module.save.results(cache.results);
              module.addResults(cache.html);
              module.inject.id(cache.results);
              callback();
          ***REMOVED***
            else {
              module.debug('Querying for', searchTerm);
              if($.isPlainObject(settings.source) || Array.isArray(settings.source)) {
                module.search.local(searchTerm);
                callback();
            ***REMOVED***
              else if( module.can.useAPI() ) {
                module.search.remote(searchTerm, callback);
            ***REMOVED***
              else {
                module.error(error.source);
                callback();
            ***REMOVED***
          ***REMOVED***
            settings.onSearchQuery.call(element, searchTerm);
        ***REMOVED***
          else {
            module.hideResults();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        search: {
          local: function(searchTerm) {
            var
              results = module.search.object(searchTerm, settings.source),
              searchHTML
            ;
            module.set.loading();
            module.save.results(results);
            module.debug('Returned full local search results', results);
            if(settings.maxResults > 0) {
              module.debug('Using specified max results', results);
              results = results.slice(0, settings.maxResults);
          ***REMOVED***
            if(settings.type == 'category') {
              results = module.create.categoryResults(results);
          ***REMOVED***
            searchHTML = module.generateResults({
              results: results
          ***REMOVED***);
            module.remove.loading();
            module.addResults(searchHTML);
            module.inject.id(results);
            module.write.cache(searchTerm, {
              html    : searchHTML,
              results : results
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          remote: function(searchTerm, callback) {
            callback = $.isFunction(callback)
              ? callback
              : function(){***REMOVED***
            ;
            if($module.api('is loading')) {
              $module.api('abort');
          ***REMOVED***
            module.setup.api(searchTerm, callback);
            $module
              .api('query')
            ;
   ***REMOVED*****REMOVED***
          object: function(searchTerm, source, searchFields) {
            searchTerm = module.remove.diacritics(String(searchTerm));
            var
              results      = [],
              exactResults = [],
              fuzzyResults = [],
              searchExp    = searchTerm.replace(regExp.escape, '\\$&'),
              matchRegExp  = new RegExp(regExp.beginsWith + searchExp, 'i'),

              // avoid duplicates when pushing results
              addResult = function(array, result) {
                var
                  notResult      = ($.inArray(result, results) == -1),
                  notFuzzyResult = ($.inArray(result, fuzzyResults) == -1),
                  notExactResults = ($.inArray(result, exactResults) == -1)
                ;
                if(notResult && notFuzzyResult && notExactResults) {
                  array.push(result);
              ***REMOVED***
            ***REMOVED***
            ;
            source = source || settings.source;
            searchFields = (searchFields !== undefined)
              ? searchFields
              : settings.searchFields
            ;

            // search fields should be array to loop correctly
            if(!Array.isArray(searchFields)) {
              searchFields = [searchFields];
          ***REMOVED***

            // exit conditions if no source
            if(source === undefined || source === false) {
              module.error(error.source);
              return [];
          ***REMOVED***
            // iterate through search fields looking for matches
            $.each(searchFields, function(index, field) {
              $.each(source, function(label, content) {
                var
                  fieldExists = (typeof content[field] == 'string') || (typeof content[field] == 'number')
                ;
                if(fieldExists) {
                  var text;
                  if (typeof content[field] === 'string'){  
                      text = module.remove.diacritics(content[field]);
                ***REMOVED*** else {
                      text = content[field].toString(); 
                ***REMOVED***
                  if( text.search(matchRegExp) !== -1) {
                    // content starts with value (first in results)
                    addResult(results, content);
                ***REMOVED***
                  else if(settings.fullTextSearch === 'exact' && module.exactSearch(searchTerm, text) ) {
                    // content fuzzy matches (last in results)
                    addResult(exactResults, content);
                ***REMOVED***
                  else if(settings.fullTextSearch == true && module.fuzzySearch(searchTerm, text) ) {
                    // content fuzzy matches (last in results)
                    addResult(fuzzyResults, content);
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***);
            $.merge(exactResults, fuzzyResults);
            $.merge(results, exactResults);
            return results;
        ***REMOVED***
 ***REMOVED*****REMOVED***
        exactSearch: function (query, term) {
          query = query.toLowerCase();
          term  = term.toLowerCase();
          return term.indexOf(query) > -1;
 ***REMOVED*****REMOVED***
        fuzzySearch: function(query, term) {
          var
            termLength  = term.length,
            queryLength = query.length
          ;
          if(typeof query !== 'string') {
            return false;
        ***REMOVED***
          query = query.toLowerCase();
          term  = term.toLowerCase();
          if(queryLength > termLength) {
            return false;
        ***REMOVED***
          if(queryLength === termLength) {
            return (query === term);
        ***REMOVED***
          search: for (var characterIndex = 0, nextCharacterIndex = 0; characterIndex < queryLength; characterIndex++) {
            var
              queryCharacter = query.charCodeAt(characterIndex)
            ;
            while(nextCharacterIndex < termLength) {
              if(term.charCodeAt(nextCharacterIndex++) === queryCharacter) {
                continue search;
            ***REMOVED***
          ***REMOVED***
            return false;
        ***REMOVED***
          return true;
 ***REMOVED*****REMOVED***

        parse: {
          response: function(response, searchTerm) {
            if(Array.isArray(response)){
                var o={***REMOVED***;
                o[fields.results]=response;
                response = o;
          ***REMOVED***
            var
              searchHTML = module.generateResults(response)
            ;
            module.verbose('Parsing server response', response);
            if(response !== undefined) {
              if(searchTerm !== undefined && response[fields.results] !== undefined) {
                module.addResults(searchHTML);
                module.inject.id(response[fields.results]);
                module.write.cache(searchTerm, {
                  html    : searchHTML,
                  results : response[fields.results]
              ***REMOVED***);
                module.save.results(response[fields.results]);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        cancel: {
          query: function() {
            if( module.can.useAPI() ) {
              $module.api('abort');
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        has: {
          minimumCharacters: function() {
            var
              searchTerm    = module.get.value(),
              numCharacters = searchTerm.length
            ;
            return (numCharacters >= settings.minCharacters);
   ***REMOVED*****REMOVED***
          results: function() {
            if($results.length === 0) {
              return false;
          ***REMOVED***
            var
              html = $results.html()
            ;
            return html != '';
        ***REMOVED***
 ***REMOVED*****REMOVED***

        clear: {
          cache: function(value) {
            var
              cache = $module.data(metadata.cache)
            ;
            if(!value) {
              module.debug('Clearing cache', value);
              $module.removeData(metadata.cache);
          ***REMOVED***
            else if(value && cache && cache[value]) {
              module.debug('Removing value from cache', value);
              delete cache[value];
              $module.data(metadata.cache, cache);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        read: {
          cache: function(name) {
            var
              cache = $module.data(metadata.cache)
            ;
            if(settings.cache) {
              module.verbose('Checking cache for generated html for query', name);
              return (typeof cache == 'object') && (cache[name] !== undefined)
                ? cache[name]
                : false
              ;
          ***REMOVED***
            return false;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        create: {
          categoryResults: function(results) {
            var
              categoryResults = {***REMOVED***
            ;
            $.each(results, function(index, result) {
              if(!result.category) {
                return;
            ***REMOVED***
              if(categoryResults[result.category] === undefined) {
                module.verbose('Creating new category of results', result.category);
                categoryResults[result.category] = {
                  name    : result.category,
                  results : [result]
              ***REMOVED***;
            ***REMOVED***
              else {
                categoryResults[result.category].results.push(result);
            ***REMOVED***
          ***REMOVED***);
            return categoryResults;
   ***REMOVED*****REMOVED***
          id: function(resultIndex, categoryIndex) {
            var
              resultID      = (resultIndex + 1), // not zero indexed
              letterID,
              id
            ;
            if(categoryIndex !== undefined) {
              // start char code for "A"
              letterID = String.fromCharCode(97 + categoryIndex);
              id          = letterID + resultID;
              module.verbose('Creating category result id', id);
          ***REMOVED***
            else {
              id = resultID;
              module.verbose('Creating result id', id);
          ***REMOVED***
            return id;
   ***REMOVED*****REMOVED***
          results: function() {
            if($results.length === 0) {
              $results = $('<div />')
                .addClass(className.results)
                .appendTo($module)
              ;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        inject: {
          result: function(result, resultIndex, categoryIndex) {
            module.verbose('Injecting result into results');
            var
              $selectedResult = (categoryIndex !== undefined)
                ? $results
                    .children().eq(categoryIndex)
                      .children(selector.results)
                        .first()
                        .children(selector.result)
                          .eq(resultIndex)
                : $results
                    .children(selector.result).eq(resultIndex)
            ;
            module.verbose('Injecting results metadata', $selectedResult);
            $selectedResult
              .data(metadata.result, result)
            ;
   ***REMOVED*****REMOVED***
          id: function(results) {
            module.debug('Injecting unique ids into results');
            var
              // since results may be object, we must use counters
              categoryIndex = 0,
              resultIndex   = 0
            ;
            if(settings.type === 'category') {
              // iterate through each category result
              $.each(results, function(index, category) {
                if(category.results.length > 0){
                  resultIndex = 0;
                  $.each(category.results, function(index, result) {
                    if(result.id === undefined) {
                      result.id = module.create.id(resultIndex, categoryIndex);
                  ***REMOVED***
                    module.inject.result(result, resultIndex, categoryIndex);
                    resultIndex++;
                ***REMOVED***);
                  categoryIndex++;
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***
            else {
              // top level
              $.each(results, function(index, result) {
                if(result.id === undefined) {
                  result.id = module.create.id(resultIndex);
              ***REMOVED***
                module.inject.result(result, resultIndex);
                resultIndex++;
            ***REMOVED***);
          ***REMOVED***
            return results;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        save: {
          results: function(results) {
            module.verbose('Saving current search results to metadata', results);
            $module.data(metadata.results, results);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        write: {
          cache: function(name, value) {
            var
              cache = ($module.data(metadata.cache) !== undefined)
                ? $module.data(metadata.cache)
                : {***REMOVED***
            ;
            if(settings.cache) {
              module.verbose('Writing generated html to cache', name, value);
              cache[name] = value;
              $module
                .data(metadata.cache, cache)
              ;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        addResults: function(html) {
          if( $.isFunction(settings.onResultsAdd) ) {
            if( settings.onResultsAdd.call($results, html) === false ) {
              module.debug('onResultsAdd callback cancelled default action');
              return false;
          ***REMOVED***
        ***REMOVED***
          if(html) {
            $results
              .html(html)
            ;
            module.refreshResults();
            if(settings.selectFirstResult) {
              module.select.firstResult();
          ***REMOVED***
            module.showResults();
        ***REMOVED***
          else {
            module.hideResults(function() {
              $results.empty();
          ***REMOVED***);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        showResults: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          if(resultsDismissed) {
            return;
        ***REMOVED***
          if(!module.is.visible() && module.has.results()) {
            if( module.can.transition() ) {
              module.debug('Showing results with css animations');
              $results
                .transition({
                  animation  : settings.transition + ' in',
                  debug      : settings.debug,
                  verbose    : settings.verbose,
                  duration   : settings.duration,
                  onComplete : function() {
                    callback();
      ***REMOVED*****REMOVED*****REMOVED***
                  queue      : true
              ***REMOVED***)
              ;
          ***REMOVED***
            else {
              module.debug('Showing results with javascript');
              $results
                .stop()
                .fadeIn(settings.duration, settings.easing)
              ;
          ***REMOVED***
            settings.onResultsOpen.call($results);
        ***REMOVED***
 ***REMOVED*****REMOVED***
        hideResults: function(callback) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          if( module.is.visible() ) {
            if( module.can.transition() ) {
              module.debug('Hiding results with css animations');
              $results
                .transition({
                  animation  : settings.transition + ' out',
                  debug      : settings.debug,
                  verbose    : settings.verbose,
                  duration   : settings.duration,
                  onComplete : function() {
                    callback();
      ***REMOVED*****REMOVED*****REMOVED***
                  queue      : true
              ***REMOVED***)
              ;
          ***REMOVED***
            else {
              module.debug('Hiding results with javascript');
              $results
                .stop()
                .fadeOut(settings.duration, settings.easing)
              ;
          ***REMOVED***
            settings.onResultsClose.call($results);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        generateResults: function(response) {
          module.debug('Generating html from response', response);
          var
            template       = settings.templates[settings.type],
            isProperObject = ($.isPlainObject(response[fields.results]) && !$.isEmptyObject(response[fields.results])),
            isProperArray  = (Array.isArray(response[fields.results]) && response[fields.results].length > 0),
            html           = ''
          ;
          if(isProperObject || isProperArray ) {
            if(settings.maxResults > 0) {
              if(isProperObject) {
                if(settings.type == 'standard') {
                  module.error(error.maxResults);
              ***REMOVED***
            ***REMOVED***
              else {
                response[fields.results] = response[fields.results].slice(0, settings.maxResults);
            ***REMOVED***
          ***REMOVED***
            if($.isFunction(template)) {
              html = template(response, fields, settings.preserveHTML);
          ***REMOVED***
            else {
              module.error(error.noTemplate, false);
          ***REMOVED***
        ***REMOVED***
          else if(settings.showNoResults) {
            html = module.displayMessage(error.noResults, 'empty', error.noResultsHeader);
        ***REMOVED***
          settings.onResults.call(element, response);
          return html;
 ***REMOVED*****REMOVED***

        displayMessage: function(text, type, header) {
          type = type || 'standard';
          module.debug('Displaying message', text, type, header);
          module.addResults( settings.templates.message(text, type, header) );
          return settings.templates.message(text, type, header);
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
          if( $.isFunction( found ) ) {
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

$.fn.search.settings = {

  name              : 'Search',
  namespace         : 'search',

  silent            : false,
  debug             : false,
  verbose           : false,
  performance       : true,

  // template to use (specified in settings.templates)
  type              : 'standard',

  // minimum characters required to search
  minCharacters     : 1,

  // whether to select first result after searching automatically
  selectFirstResult : false,

  // API config
  apiSettings       : false,

  // object to search
  source            : false,

  // Whether search should query current term on focus
  searchOnFocus     : true,

  // fields to search
  searchFields   : [
    'id',
    'title',
    'description'
  ],

  // field to display in standard results template
  displayField   : '',

  // search anywhere in value (set to 'exact' to require exact matches
  fullTextSearch : 'exact',

  // match results also if they contain diacritics of the same base character (for example searching for "a" will also match "á" or "â" or "à", etc...)
  ignoreDiacritics : false,

  // whether to add events to prompt automatically
  automatic      : true,

  // delay before hiding menu after blur
  hideDelay      : 0,

  // delay before searching
  searchDelay    : 200,

  // maximum results returned from search
  maxResults     : 7,

  // whether to store lookups in local cache
  cache          : true,

  // whether no results errors should be shown
  showNoResults  : true,

  // preserve possible html of resultset values
  preserveHTML   : true,

  // transition settings
  transition     : 'scale',
  duration       : 200,
  easing         : 'easeOutExpo',

  // callbacks
  onSelect       : false,
  onResultsAdd   : false,

  onSearchQuery  : function(query){***REMOVED***,
  onResults      : function(response){***REMOVED***,

  onResultsOpen  : function(){***REMOVED***,
  onResultsClose : function(){***REMOVED***,

  className: {
    animating : 'animating',
    active    : 'active',
    empty     : 'empty',
    focus     : 'focus',
    hidden    : 'hidden',
    loading   : 'loading',
    results   : 'results',
    pressed   : 'down'
***REMOVED***

  error : {
    source          : 'Cannot search. No source used, and Semantic API module was not included',
    noResultsHeader : 'No Results',
    noResults       : 'Your search returned no results',
    logging         : 'Error in debug logging, exiting.',
    noEndpoint      : 'No search endpoint was specified',
    noTemplate      : 'A valid template name was not specified.',
    oldSearchSyntax : 'searchFullText setting has been renamed fullTextSearch for consistency, please adjust your settings.',
    serverError     : 'There was an issue querying the server.',
    maxResults      : 'Results must be an array to use maxResults setting',
    method          : 'The method you called is not defined.',
    noNormalize     : '"ignoreDiacritics" setting will be ignored. Browser does not support String().normalize(). You may consider including <https://cdn.jsdelivr.net/npm/unorm@1.4.1/lib/unorm.min.js> as a polyfill.'
***REMOVED***

  metadata: {
    cache   : 'cache',
    results : 'results',
    result  : 'result'
***REMOVED***

  regExp: {
    escape     : /[\-\[\]\/\{\***REMOVED***\(\)\*\+\?\.\\\^\$\|]/g,
    beginsWith : '(?:\s|^)'
***REMOVED***

  // maps api response attributes to internal representation
  fields: {
    categories      : 'results',     // array of categories (category view)
    categoryName    : 'name',        // name of category (category view)
    categoryResults : 'results',     // array of results (category view)
    description     : 'description', // result description
    image           : 'image',       // result image
    price           : 'price',       // result price
    results         : 'results',     // array of results (standard)
    title           : 'title',       // result title
    url             : 'url',         // result url
    action          : 'action',      // "view more" object name
    actionText      : 'text',        // "view more" text
    actionURL       : 'url'          // "view more" url
***REMOVED***

  selector : {
    prompt       : '.prompt',
    searchButton : '.search.button',
    results      : '.results',
    message      : '.results > .message',
    category     : '.category',
    result       : '.result',
    title        : '.title, .name'
***REMOVED***

  templates: {
    escape: function(string, preserveHTML) {
      if (preserveHTML){
        return string;
    ***REMOVED***
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
    message: function(message, type, header) {
      var
        html = ''
      ;
      if(message !== undefined && type !== undefined) {
        html +=  ''
          + '<div class="message ' + type + '">'
        ;
        if(header) {
          html += ''
          + '<div class="header">' + header + '</div>'
          ;
      ***REMOVED***
        html += ' <div class="description">' + message + '</div>';
        html += '</div>';
    ***REMOVED***
      return html;
  ***REMOVED***
    category: function(response, fields, preserveHTML) {
      var
        html = '',
        escape = $.fn.search.settings.templates.escape
      ;
      if(response[fields.categoryResults] !== undefined) {

        // each category
        $.each(response[fields.categoryResults], function(index, category) {
          if(category[fields.results] !== undefined && category.results.length > 0) {

            html  += '<div class="category">';

            if(category[fields.categoryName] !== undefined) {
              html += '<div class="name">' + escape(category[fields.categoryName], preserveHTML) + '</div>';
          ***REMOVED***

            // each item inside category
            html += '<div class="results">';
            $.each(category.results, function(index, result) {
              if(result[fields.url]) {
                html  += '<a class="result" href="' + result[fields.url].replace(/"/g,"") + '">';
            ***REMOVED***
              else {
                html  += '<a class="result">';
            ***REMOVED***
              if(result[fields.image] !== undefined) {
                html += ''
                  + '<div class="image">'
                  + ' <img src="' + result[fields.image].replace(/"/g,"") + '">'
                  + '</div>'
                ;
            ***REMOVED***
              html += '<div class="content">';
              if(result[fields.price] !== undefined) {
                html += '<div class="price">' + escape(result[fields.price], preserveHTML) + '</div>';
            ***REMOVED***
              if(result[fields.title] !== undefined) {
                html += '<div class="title">' + escape(result[fields.title], preserveHTML) + '</div>';
            ***REMOVED***
              if(result[fields.description] !== undefined) {
                html += '<div class="description">' + escape(result[fields.description], preserveHTML) + '</div>';
            ***REMOVED***
              html  += ''
                + '</div>'
              ;
              html += '</a>';
          ***REMOVED***);
            html += '</div>';
            html  += ''
              + '</div>'
            ;
        ***REMOVED***
      ***REMOVED***);
        if(response[fields.action]) {
          if(fields.actionURL === false) {
            html += ''
            + '<div class="action">'
            +   escape(response[fields.action][fields.actionText], preserveHTML)
            + '</div>';
        ***REMOVED*** else {
            html += ''
            + '<a href="' + response[fields.action][fields.actionURL].replace(/"/g,"") + '" class="action">'
            +   escape(response[fields.action][fields.actionText], preserveHTML)
            + '</a>';
        ***REMOVED***
      ***REMOVED***
        return html;
    ***REMOVED***
      return false;
  ***REMOVED***
    standard: function(response, fields, preserveHTML) {
      var
        html = '',
        escape = $.fn.search.settings.templates.escape
      ;
      if(response[fields.results] !== undefined) {

        // each result
        $.each(response[fields.results], function(index, result) {
          if(result[fields.url]) {
            html  += '<a class="result" href="' + result[fields.url].replace(/"/g,"") + '">';
        ***REMOVED***
          else {
            html  += '<a class="result">';
        ***REMOVED***
          if(result[fields.image] !== undefined) {
            html += ''
              + '<div class="image">'
              + ' <img src="' + result[fields.image].replace(/"/g,"") + '">'
              + '</div>'
            ;
        ***REMOVED***
          html += '<div class="content">';
          if(result[fields.price] !== undefined) {
            html += '<div class="price">' + escape(result[fields.price], preserveHTML) + '</div>';
        ***REMOVED***
          if(result[fields.title] !== undefined) {
            html += '<div class="title">' + escape(result[fields.title], preserveHTML) + '</div>';
        ***REMOVED***
          if(result[fields.description] !== undefined) {
            html += '<div class="description">' + escape(result[fields.description], preserveHTML) + '</div>';
        ***REMOVED***
          html  += ''
            + '</div>'
          ;
          html += '</a>';
      ***REMOVED***);
        if(response[fields.action]) {
          if(fields.actionURL === false) {
            html += ''
            + '<div class="action">'
            +   escape(response[fields.action][fields.actionText], preserveHTML)
            + '</div>';
        ***REMOVED*** else {
            html += ''
            + '<a href="' + response[fields.action][fields.actionURL].replace(/"/g,"") + '" class="action">'
            +   escape(response[fields.action][fields.actionText], preserveHTML)
            + '</a>';
        ***REMOVED***
      ***REMOVED***
        return html;
    ***REMOVED***
      return false;
  ***REMOVED***
***REMOVED***
***REMOVED***;

***REMOVED***)( jQuery, window, document );
