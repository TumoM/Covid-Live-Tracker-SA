/*!
***REMOVED*** # Fomantic-UI - API
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

  window = (typeof window != 'undefined' && window.Math == Math)
    ? window
    : (typeof self != 'undefined' && self.Math == Math)
      ? self
      : Function('return this')()
;

$.api = $.fn.api = function(parameters) {

  var
    // use window context if none specified
    $allModules     = $.isFunction(this)
        ? $(window)
        : $(this),
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
          ? $.extend(true, {***REMOVED***, $.fn.api.settings, parameters)
          : $.extend({***REMOVED***, $.fn.api.settings),

        // internal aliases
        namespace       = settings.namespace,
        metadata        = settings.metadata,
        selector        = settings.selector,
        error           = settings.error,
        className       = settings.className,

        // define namespaces for modules
        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        // element that creates request
        $module         = $(this),
        $form           = $module.closest(selector.form),

        // context used for state
        $context        = (settings.stateContext)
          ? $(settings.stateContext)
          : $module,

        // request details
        ajaxSettings,
        requestSettings,
        url,
        data,
        requestStartTime,

        // standard module
        element         = this,
        context         = $context[0],
        instance        = $module.data(moduleNamespace),
        module
      ;

      module = {

        initialize: function() {
          if(!methodInvoked) {
            module.bind.events();
        ***REMOVED***
          module.instantiate();
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, instance)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.verbose('Destroying previous module for', element);
          $module
            .removeData(moduleNamespace)
            .off(eventNamespace)
          ;
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            var
              triggerEvent = module.get.event()
            ;
            if( triggerEvent ) {
              module.verbose('Attaching API events to element', triggerEvent);
              $module
                .on(triggerEvent + eventNamespace, module.event.trigger)
              ;
          ***REMOVED***
            else if(settings.on == 'now') {
              module.debug('Querying API endpoint immediately');
              module.query();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        decode: {
          json: function(response) {
            if(response !== undefined && typeof response == 'string') {
              try {
               response = JSON.parse(response);
            ***REMOVED***
              catch(e) {
                // isnt json string
            ***REMOVED***
          ***REMOVED***
            return response;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        read: {
          cachedResponse: function(url) {
            var
              response
            ;
            if(window.Storage === undefined) {
              module.error(error.noStorage);
              return;
          ***REMOVED***
            response = sessionStorage.getItem(url);
            module.debug('Using cached response', url, response);
            response = module.decode.json(response);
            return response;
        ***REMOVED***
 ***REMOVED*****REMOVED***
        write: {
          cachedResponse: function(url, response) {
            if(response && response === '') {
              module.debug('Response empty, not caching', response);
              return;
          ***REMOVED***
            if(window.Storage === undefined) {
              module.error(error.noStorage);
              return;
          ***REMOVED***
            if( $.isPlainObject(response) ) {
              response = JSON.stringify(response);
          ***REMOVED***
            sessionStorage.setItem(url, response);
            module.verbose('Storing cached response for url', url, response);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        query: function() {

          if(module.is.disabled()) {
            module.debug('Element is disabled API request aborted');
            return;
        ***REMOVED***

          if(module.is.loading()) {
            if(settings.interruptRequests) {
              module.debug('Interrupting previous request');
              module.abort();
          ***REMOVED***
            else {
              module.debug('Cancelling request, previous request is still pending');
              return;
          ***REMOVED***
        ***REMOVED***

          // pass element metadata to url (value, text)
          if(settings.defaultData) {
            $.extend(true, settings.urlData, module.get.defaultData());
        ***REMOVED***

          // Add form content
          if(settings.serializeForm) {
            settings.data = module.add.formData(settings.data);
        ***REMOVED***

          // call beforesend and get any settings changes
          requestSettings = module.get.settings();

          // check if before send cancelled request
          if(requestSettings === false) {
            module.cancelled = true;
            module.error(error.beforeSend);
            return;
        ***REMOVED***
          else {
            module.cancelled = false;
        ***REMOVED***

          // get url
          url = module.get.templatedURL();

          if(!url && !module.is.mocked()) {
            module.error(error.missingURL);
            return;
        ***REMOVED***

          // replace variables
          url = module.add.urlData( url );
          // missing url parameters
          if( !url && !module.is.mocked()) {
            return;
        ***REMOVED***

          requestSettings.url = settings.base + url;

          // look for jQuery ajax parameters in settings
          ajaxSettings = $.extend(true, {***REMOVED***, settings, {
            type       : settings.method || settings.type,
            data       : data,
            url        : settings.base + url,
            beforeSend : settings.beforeXHR,
            success    : function() {***REMOVED***,
            failure    : function() {***REMOVED***,
            complete   : function() {***REMOVED***
        ***REMOVED***);

          module.debug('Querying URL', ajaxSettings.url);
          module.verbose('Using AJAX settings', ajaxSettings);
          if(settings.cache === 'local' && module.read.cachedResponse(url)) {
            module.debug('Response returned from local cache');
            module.request = module.create.request();
            module.request.resolveWith(context, [ module.read.cachedResponse(url) ]);
            return;
        ***REMOVED***

          if( !settings.throttle ) {
            module.debug('Sending request', data, ajaxSettings.method);
            module.send.request();
        ***REMOVED***
          else {
            if(!settings.throttleFirstRequest && !module.timer) {
              module.debug('Sending request', data, ajaxSettings.method);
              module.send.request();
              module.timer = setTimeout(function(){***REMOVED***, settings.throttle);
          ***REMOVED***
            else {
              module.debug('Throttling request', settings.throttle);
              clearTimeout(module.timer);
              module.timer = setTimeout(function() {
                if(module.timer) {
                  delete module.timer;
              ***REMOVED***
                module.debug('Sending throttled request', data, ajaxSettings.method);
                module.send.request();
  ***REMOVED*****REMOVED*****REMOVED*** settings.throttle);
          ***REMOVED***
        ***REMOVED***

 ***REMOVED*****REMOVED***

        should: {
          removeError: function() {
            return ( settings.hideError === true || (settings.hideError === 'auto' && !module.is.form()) );
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          disabled: function() {
            return ($module.filter(selector.disabled).length > 0);
   ***REMOVED*****REMOVED***
          expectingJSON: function() {
            return settings.dataType === 'json' || settings.dataType === 'jsonp';
   ***REMOVED*****REMOVED***
          form: function() {
            return $module.is('form') || $context.is('form');
   ***REMOVED*****REMOVED***
          mocked: function() {
            return (settings.mockResponse || settings.mockResponseAsync || settings.response || settings.responseAsync);
   ***REMOVED*****REMOVED***
          input: function() {
            return $module.is('input');
   ***REMOVED*****REMOVED***
          loading: function() {
            return (module.request)
              ? (module.request.state() == 'pending')
              : false
            ;
   ***REMOVED*****REMOVED***
          abortedRequest: function(xhr) {
            if(xhr && xhr.readyState !== undefined && xhr.readyState === 0) {
              module.verbose('XHR request determined to be aborted');
              return true;
          ***REMOVED***
            else {
              module.verbose('XHR request was not aborted');
              return false;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          validResponse: function(response) {
            if( (!module.is.expectingJSON()) || !$.isFunction(settings.successTest) ) {
              module.verbose('Response is not JSON, skipping validation', settings.successTest, response);
              return true;
          ***REMOVED***
            module.debug('Checking JSON returned success', settings.successTest, response);
            if( settings.successTest(response) ) {
              module.debug('Response passed success test', response);
              return true;
          ***REMOVED***
            else {
              module.debug('Response failed success test', response);
              return false;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        was: {
          cancelled: function() {
            return (module.cancelled || false);
   ***REMOVED*****REMOVED***
          succesful: function() {
            module.verbose('This behavior will be deleted due to typo. Use "was successful" instead.');
            return module.was.successful();
   ***REMOVED*****REMOVED***
          successful: function() {
            return (module.request && module.request.state() == 'resolved');
   ***REMOVED*****REMOVED***
          failure: function() {
            return (module.request && module.request.state() == 'rejected');
   ***REMOVED*****REMOVED***
          complete: function() {
            return (module.request && (module.request.state() == 'resolved' || module.request.state() == 'rejected') );
        ***REMOVED***
 ***REMOVED*****REMOVED***

        add: {
          urlData: function(url, urlData) {
            var
              requiredVariables,
              optionalVariables
            ;
            if(url) {
              requiredVariables = url.match(settings.regExp.required);
              optionalVariables = url.match(settings.regExp.optional);
              urlData           = urlData || settings.urlData;
              if(requiredVariables) {
                module.debug('Looking for required URL variables', requiredVariables);
                $.each(requiredVariables, function(index, templatedString) {
                  var
                    // allow legacy {$var***REMOVED*** style
                    variable = (templatedString.indexOf('$') !== -1)
                      ? templatedString.substr(2, templatedString.length - 3)
                      : templatedString.substr(1, templatedString.length - 2),
                    value   = ($.isPlainObject(urlData) && urlData[variable] !== undefined)
                      ? urlData[variable]
                      : ($module.data(variable) !== undefined)
                        ? $module.data(variable)
                        : ($context.data(variable) !== undefined)
                          ? $context.data(variable)
                          : urlData[variable]
                  ;
                  // remove value
                  if(value === undefined) {
                    module.error(error.requiredParameter, variable, url);
                    url = false;
                    return false;
                ***REMOVED***
                  else {
                    module.verbose('Found required variable', variable, value);
                    value = (settings.encodeParameters)
                      ? module.get.urlEncodedValue(value)
                      : value
                    ;
                    url = url.replace(templatedString, value);
                ***REMOVED***
              ***REMOVED***);
            ***REMOVED***
              if(optionalVariables) {
                module.debug('Looking for optional URL variables', requiredVariables);
                $.each(optionalVariables, function(index, templatedString) {
                  var
                    // allow legacy {/$var***REMOVED*** style
                    variable = (templatedString.indexOf('$') !== -1)
                      ? templatedString.substr(3, templatedString.length - 4)
                      : templatedString.substr(2, templatedString.length - 3),
                    value   = ($.isPlainObject(urlData) && urlData[variable] !== undefined)
                      ? urlData[variable]
                      : ($module.data(variable) !== undefined)
                        ? $module.data(variable)
                        : ($context.data(variable) !== undefined)
                          ? $context.data(variable)
                          : urlData[variable]
                  ;
                  // optional replacement
                  if(value !== undefined) {
                    module.verbose('Optional variable Found', variable, value);
                    url = url.replace(templatedString, value);
                ***REMOVED***
                  else {
                    module.verbose('Optional variable not found', variable);
                    // remove preceding slash if set
                    if(url.indexOf('/' + templatedString) !== -1) {
                      url = url.replace('/' + templatedString, '');
                  ***REMOVED***
                    else {
                      url = url.replace(templatedString, '');
                  ***REMOVED***
                ***REMOVED***
              ***REMOVED***);
            ***REMOVED***
          ***REMOVED***
            return url;
   ***REMOVED*****REMOVED***
          formData: function(data) {
            var
              canSerialize = ($.fn.serializeObject !== undefined),
              formData     = (canSerialize)
                ? $form.serializeObject()
                : $form.serialize(),
              hasOtherData
            ;
            data         = data || settings.data;
            hasOtherData = $.isPlainObject(data);

            if(hasOtherData) {
              if(canSerialize) {
                module.debug('Extending existing data with form data', data, formData);
                data = $.extend(true, {***REMOVED***, data, formData);
            ***REMOVED***
              else {
                module.error(error.missingSerialize);
                module.debug('Cant extend data. Replacing data with form data', data, formData);
                data = formData;
            ***REMOVED***
          ***REMOVED***
            else {
              module.debug('Adding form data', formData);
              data = formData;
          ***REMOVED***
            return data;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        send: {
          request: function() {
            module.set.loading();
            module.request = module.create.request();
            if( module.is.mocked() ) {
              module.mockedXHR = module.create.mockedXHR();
          ***REMOVED***
            else {
              module.xhr = module.create.xhr();
          ***REMOVED***
            settings.onRequest.call(context, module.request, module.xhr);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          trigger: function(event) {
            module.query();
            if(event.type == 'submit' || event.type == 'click') {
              event.preventDefault();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          xhr: {
            always: function() {
              // nothing special
***REMOVED*****REMOVED*****REMOVED***
            done: function(response, textStatus, xhr) {
              var
                context            = this,
                elapsedTime        = (new Date().getTime() - requestStartTime),
                timeLeft           = (settings.loadingDuration - elapsedTime),
                translatedResponse = ( $.isFunction(settings.onResponse) )
                  ? module.is.expectingJSON() && !settings.rawResponse
                    ? settings.onResponse.call(context, $.extend(true, {***REMOVED***, response))
                    : settings.onResponse.call(context, response)
                  : false
              ;
              timeLeft = (timeLeft > 0)
                ? timeLeft
                : 0
              ;
              if(translatedResponse) {
                module.debug('Modified API response in onResponse callback', settings.onResponse, translatedResponse, response);
                response = translatedResponse;
            ***REMOVED***
              if(timeLeft > 0) {
                module.debug('Response completed early delaying state change by', timeLeft);
            ***REMOVED***
              setTimeout(function() {
                if( module.is.validResponse(response) ) {
                  module.request.resolveWith(context, [response, xhr]);
              ***REMOVED***
                else {
                  module.request.rejectWith(context, [xhr, 'invalid']);
              ***REMOVED***
  ***REMOVED*****REMOVED*****REMOVED*** timeLeft);
***REMOVED*****REMOVED*****REMOVED***
            fail: function(xhr, status, httpMessage) {
              var
                context     = this,
                elapsedTime = (new Date().getTime() - requestStartTime),
                timeLeft    = (settings.loadingDuration - elapsedTime)
              ;
              timeLeft = (timeLeft > 0)
                ? timeLeft
                : 0
              ;
              if(timeLeft > 0) {
                module.debug('Response completed early delaying state change by', timeLeft);
            ***REMOVED***
              setTimeout(function() {
                if( module.is.abortedRequest(xhr) ) {
                  module.request.rejectWith(context, [xhr, 'aborted', httpMessage]);
              ***REMOVED***
                else {
                  module.request.rejectWith(context, [xhr, 'error', status, httpMessage]);
              ***REMOVED***
  ***REMOVED*****REMOVED*****REMOVED*** timeLeft);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          request: {
            done: function(response, xhr) {
              module.debug('Successful API Response', response);
              if(settings.cache === 'local' && url) {
                module.write.cachedResponse(url, response);
                module.debug('Saving server response locally', module.cache);
            ***REMOVED***
              settings.onSuccess.call(context, response, $module, xhr);
***REMOVED*****REMOVED*****REMOVED***
            complete: function(firstParameter, secondParameter) {
              var
                xhr,
                response
              ;
              // have to guess callback parameters based on request success
              if( module.was.successful() ) {
                response = firstParameter;
                xhr      = secondParameter;
            ***REMOVED***
              else {
                xhr      = firstParameter;
                response = module.get.responseFromXHR(xhr);
            ***REMOVED***
              module.remove.loading();
              settings.onComplete.call(context, response, $module, xhr);
***REMOVED*****REMOVED*****REMOVED***
            fail: function(xhr, status, httpMessage) {
              var
                // pull response from xhr if available
                response     = module.get.responseFromXHR(xhr),
                errorMessage = module.get.errorFromRequest(response, status, httpMessage)
              ;
              if(status == 'aborted') {
                module.debug('XHR Aborted (Most likely caused by page navigation or CORS Policy)', status, httpMessage);
                settings.onAbort.call(context, status, $module, xhr);
                return true;
            ***REMOVED***
              else if(status == 'invalid') {
                module.debug('JSON did not pass success test. A server-side error has most likely occurred', response);
            ***REMOVED***
              else if(status == 'error') {
                if(xhr !== undefined) {
                  module.debug('XHR produced a server error', status, httpMessage);
                  // make sure we have an error to display to console
                  if( (xhr.status < 200 || xhr.status >= 300) && httpMessage !== undefined && httpMessage !== '') {
                    module.error(error.statusMessage + httpMessage, ajaxSettings.url);
                ***REMOVED***
                  settings.onError.call(context, errorMessage, $module, xhr);
              ***REMOVED***
            ***REMOVED***

              if(settings.errorDuration && status !== 'aborted') {
                module.debug('Adding error state');
                module.set.error();
                if( module.should.removeError() ) {
                  setTimeout(module.remove.error, settings.errorDuration);
              ***REMOVED***
            ***REMOVED***
              module.debug('API Request failed', errorMessage, xhr);
              settings.onFailure.call(context, response, $module, xhr);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        create: {

          request: function() {
            // api request promise
            return $.Deferred()
              .always(module.event.request.complete)
              .done(module.event.request.done)
              .fail(module.event.request.fail)
            ;
   ***REMOVED*****REMOVED***

          mockedXHR: function () {
            var
              // xhr does not simulate these properties of xhr but must return them
              textStatus     = false,
              status         = false,
              httpMessage    = false,
              responder      = settings.mockResponse      || settings.response,
              asyncResponder = settings.mockResponseAsync || settings.responseAsync,
              asyncCallback,
              response,
              mockedXHR
            ;

            mockedXHR = $.Deferred()
              .always(module.event.xhr.complete)
              .done(module.event.xhr.done)
              .fail(module.event.xhr.fail)
            ;

            if(responder) {
              if( $.isFunction(responder) ) {
                module.debug('Using specified synchronous callback', responder);
                response = responder.call(context, requestSettings);
            ***REMOVED***
              else {
                module.debug('Using settings specified response', responder);
                response = responder;
            ***REMOVED***
              // simulating response
              mockedXHR.resolveWith(context, [ response, textStatus, { responseText: response ***REMOVED***]);
          ***REMOVED***
            else if( $.isFunction(asyncResponder) ) {
              asyncCallback = function(response) {
                module.debug('Async callback returned response', response);

                if(response) {
                  mockedXHR.resolveWith(context, [ response, textStatus, { responseText: response ***REMOVED***]);
              ***REMOVED***
                else {
                  mockedXHR.rejectWith(context, [{ responseText: response ***REMOVED***, status, httpMessage]);
              ***REMOVED***
            ***REMOVED***;
              module.debug('Using specified async response callback', asyncResponder);
              asyncResponder.call(context, requestSettings, asyncCallback);
          ***REMOVED***
            return mockedXHR;
   ***REMOVED*****REMOVED***

          xhr: function() {
            var
              xhr
            ;
            // ajax request promise
            xhr = $.ajax(ajaxSettings)
              .always(module.event.xhr.always)
              .done(module.event.xhr.done)
              .fail(module.event.xhr.fail)
            ;
            module.verbose('Created server request', xhr, ajaxSettings);
            return xhr;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          error: function() {
            module.verbose('Adding error state to element', $context);
            $context.addClass(className.error);
   ***REMOVED*****REMOVED***
          loading: function() {
            module.verbose('Adding loading state to element', $context);
            $context.addClass(className.loading);
            requestStartTime = new Date().getTime();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          error: function() {
            module.verbose('Removing error state from element', $context);
            $context.removeClass(className.error);
   ***REMOVED*****REMOVED***
          loading: function() {
            module.verbose('Removing loading state from element', $context);
            $context.removeClass(className.loading);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          responseFromXHR: function(xhr) {
            return $.isPlainObject(xhr)
              ? (module.is.expectingJSON())
                ? module.decode.json(xhr.responseText)
                : xhr.responseText
              : false
            ;
   ***REMOVED*****REMOVED***
          errorFromRequest: function(response, status, httpMessage) {
            return ($.isPlainObject(response) && response.error !== undefined)
              ? response.error // use json error message
              : (settings.error[status] !== undefined) // use server error message
                ? settings.error[status]
                : httpMessage
            ;
   ***REMOVED*****REMOVED***
          request: function() {
            return module.request || false;
   ***REMOVED*****REMOVED***
          xhr: function() {
            return module.xhr || false;
   ***REMOVED*****REMOVED***
          settings: function() {
            var
              runSettings
            ;
            runSettings = settings.beforeSend.call($module, settings);
            if(runSettings) {
              if(runSettings.success !== undefined) {
                module.debug('Legacy success callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.success);
                runSettings.onSuccess = runSettings.success;
            ***REMOVED***
              if(runSettings.failure !== undefined) {
                module.debug('Legacy failure callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.failure);
                runSettings.onFailure = runSettings.failure;
            ***REMOVED***
              if(runSettings.complete !== undefined) {
                module.debug('Legacy complete callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.complete);
                runSettings.onComplete = runSettings.complete;
            ***REMOVED***
          ***REMOVED***
            if(runSettings === undefined) {
              module.error(error.noReturnedValue);
          ***REMOVED***
            if(runSettings === false) {
              return runSettings;
          ***REMOVED***
            return (runSettings !== undefined)
              ? $.extend(true, {***REMOVED***, runSettings)
              : $.extend(true, {***REMOVED***, settings)
            ;
   ***REMOVED*****REMOVED***
          urlEncodedValue: function(value) {
            var
              decodedValue   = window.decodeURIComponent(value),
              encodedValue   = window.encodeURIComponent(value),
              alreadyEncoded = (decodedValue !== value)
            ;
            if(alreadyEncoded) {
              module.debug('URL value is already encoded, avoiding double encoding', value);
              return value;
          ***REMOVED***
            module.verbose('Encoding value using encodeURIComponent', value, encodedValue);
            return encodedValue;
   ***REMOVED*****REMOVED***
          defaultData: function() {
            var
              data = {***REMOVED***
            ;
            if( !$.isWindow(element) ) {
              if( module.is.input() ) {
                data.value = $module.val();
            ***REMOVED***
              else if( module.is.form() ) {

            ***REMOVED***
              else {
                data.text = $module.text();
            ***REMOVED***
          ***REMOVED***
            return data;
   ***REMOVED*****REMOVED***
          event: function() {
            if( $.isWindow(element) || settings.on == 'now' ) {
              module.debug('API called without element, no events attached');
              return false;
          ***REMOVED***
            else if(settings.on == 'auto') {
              if( $module.is('input') ) {
                return (element.oninput !== undefined)
                  ? 'input'
                  : (element.onpropertychange !== undefined)
                    ? 'propertychange'
                    : 'keyup'
                ;
            ***REMOVED***
              else if( $module.is('form') ) {
                return 'submit';
            ***REMOVED***
              else {
                return 'click';
            ***REMOVED***
          ***REMOVED***
            else {
              return settings.on;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          templatedURL: function(action) {
            action = action || $module.data(metadata.action) || settings.action || false;
            url    = $module.data(metadata.url) || settings.url || false;
            if(url) {
              module.debug('Using specified url', url);
              return url;
          ***REMOVED***
            if(action) {
              module.debug('Looking up url for action', action, settings.api);
              if(settings.api[action] === undefined && !module.is.mocked()) {
                module.error(error.missingAction, settings.action, settings.api);
                return;
            ***REMOVED***
              url = settings.api[action];
          ***REMOVED***
            else if( module.is.form() ) {
              url = $module.attr('action') || $context.attr('action') || false;
              module.debug('No url or action specified, defaulting to form action', url);
          ***REMOVED***
            return url;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        abort: function() {
          var
            xhr = module.get.xhr()
          ;
          if( xhr && xhr.state() !== 'resolved') {
            module.debug('Cancelling API request');
            xhr.abort();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        // reset state
        reset: function() {
          module.remove.error();
          module.remove.loading();
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
                //'Element'        : element,
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

$.api.settings = {

  name              : 'API',
  namespace         : 'api',

  debug             : false,
  verbose           : false,
  performance       : true,

  // object containing all templates endpoints
  api               : {***REMOVED***,

  // whether to cache responses
  cache             : true,

  // whether new requests should abort previous requests
  interruptRequests : true,

  // event binding
  on                : 'auto',

  // context for applying state classes
  stateContext      : false,

  // duration for loading state
  loadingDuration   : 0,

  // whether to hide errors after a period of time
  hideError         : 'auto',

  // duration for error state
  errorDuration     : 2000,

  // whether parameters should be encoded with encodeURIComponent
  encodeParameters  : true,

  // API action to use
  action            : false,

  // templated URL to use
  url               : false,

  // base URL to apply to all endpoints
  base              : '',

  // data that will
  urlData           : {***REMOVED***,

  // whether to add default data to url data
  defaultData          : true,

  // whether to serialize closest form
  serializeForm        : false,

  // how long to wait before request should occur
  throttle             : 0,

  // whether to throttle first request or only repeated
  throttleFirstRequest : true,

  // standard ajax settings
  method            : 'get',
  data              : {***REMOVED***,
  dataType          : 'json',

  // mock response
  mockResponse      : false,
  mockResponseAsync : false,

  // aliases for mock
  response          : false,
  responseAsync     : false,

// whether onResponse should work with response value without force converting into an object
  rawResponse       : false,

  // callbacks before request
  beforeSend  : function(settings) { return settings; ***REMOVED***,
  beforeXHR   : function(xhr) {***REMOVED***,
  onRequest   : function(promise, xhr) {***REMOVED***,

  // after request
  onResponse  : false, // function(response) { ***REMOVED***,

  // response was successful, if JSON passed validation
  onSuccess   : function(response, $module) {***REMOVED***,

  // request finished without aborting
  onComplete  : function(response, $module) {***REMOVED***,

  // failed JSON success test
  onFailure   : function(response, $module) {***REMOVED***,

  // server error
  onError     : function(errorMessage, $module) {***REMOVED***,

  // request aborted
  onAbort     : function(errorMessage, $module) {***REMOVED***,

  successTest : false,

  // errors
  error : {
    beforeSend        : 'The before send function has aborted the request',
    error             : 'There was an error with your request',
    exitConditions    : 'API Request Aborted. Exit conditions met',
    JSONParse         : 'JSON could not be parsed during error handling',
    legacyParameters  : 'You are using legacy API success callback names',
    method            : 'The method you called is not defined',
    missingAction     : 'API action used but no url was defined',
    missingSerialize  : 'jquery-serialize-object is required to add form data to an existing data object',
    missingURL        : 'No URL specified for api event',
    noReturnedValue   : 'The beforeSend callback must return a settings object, beforeSend ignored.',
    noStorage         : 'Caching responses locally requires session storage',
    parseError        : 'There was an error parsing your request',
    requiredParameter : 'Missing a required URL parameter: ',
    statusMessage     : 'Server gave an error: ',
    timeout           : 'Your request timed out'
***REMOVED***

  regExp  : {
    required : /\{\$*[A-z0-9]+\***REMOVED***/g,
    optional : /\{\/\$*[A-z0-9]+\***REMOVED***/g,
***REMOVED***

  className: {
    loading : 'loading',
    error   : 'error'
***REMOVED***

  selector: {
    disabled : '.disabled',
    form      : 'form'
***REMOVED***

  metadata: {
    action  : 'action',
    url     : 'url'
***REMOVED***
***REMOVED***;



***REMOVED***)( jQuery, window, document );
