/*!
***REMOVED*** # Fomantic-UI - Toast
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

$.fn.toast = function(parameters) {
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
          ? $.extend(true, {***REMOVED***, $.fn.toast.settings, parameters)
          : $.extend({***REMOVED***, $.fn.toast.settings),

        className        = settings.className,
        selector         = settings.selector,
        error            = settings.error,
        namespace        = settings.namespace,
        fields           = settings.fields,

        eventNamespace   = '.' + namespace,
        moduleNamespace  = namespace + '-module',

        $module          = $(this),
        $toastBox,
        $toast,
        $actions,
        $progress,
        $progressBar,
        $animationObject,
        $close,
        $context         = (settings.context)
          ? $(settings.context)
          : $('body'),

        isToastComponent = $module.hasClass('toast') || $module.hasClass('message') || $module.hasClass('card'),

        element          = this,
        instance         = isToastComponent ? $module.data(moduleNamespace) : undefined,

        module
      ;
      module = {

        initialize: function() {
          module.verbose('Initializing element');
          if (!module.has.container()) {
            module.create.container();
        ***REMOVED***
          if(isToastComponent || settings.message !== '' || settings.title !== '' || module.get.iconClass() !== '' || settings.showImage || module.has.configActions()) {
            if(typeof settings.showProgress !== 'string' || [className.top,className.bottom].indexOf(settings.showProgress) === -1 ) {
              settings.showProgress = false;
          ***REMOVED***
            module.create.toast();
            if(settings.closeOnClick && (settings.closeIcon || $($toast).find(selector.input).length > 0 || module.has.configActions())){
              settings.closeOnClick = false;
          ***REMOVED***
            if(!settings.closeOnClick) {
              $toastBox.addClass(className.unclickable);
          ***REMOVED***
            module.bind.events();
        ***REMOVED***
          module.instantiate();
          if($toastBox) {
            module.show();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of toast');
          instance = module;
          $module
              .data(moduleNamespace, instance)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          if($toastBox) {
            module.debug('Removing toast', $toastBox);
            module.unbind.events();
            $toastBox.remove();
            $toastBox = undefined;
            $toast = undefined;
            $animationObject = undefined;
            settings.onRemove.call($toastBox, element);
            $progress = undefined;
            $progressBar = undefined;
            $close = undefined;
        ***REMOVED***
          $module
            .removeData(moduleNamespace)
          ;
 ***REMOVED*****REMOVED***

        show: function(callback) {
          callback = callback || function(){***REMOVED***;
          module.debug('Showing toast');
          if(settings.onShow.call($toastBox, element) === false) {
            module.debug('onShow callback returned false, cancelling toast animation');
            return;
        ***REMOVED***
          module.animate.show(callback);
 ***REMOVED*****REMOVED***

        close: function(callback) {
          callback = callback || function(){***REMOVED***;
          module.remove.visible();
          module.unbind.events();
          module.animate.close(callback);

 ***REMOVED*****REMOVED***

        create: {
          container: function() {
            module.verbose('Creating container');
            $context.append($('<div/>',{class: settings.position + ' ' + className.container***REMOVED***));
   ***REMOVED*****REMOVED***
          toast: function() {
            $toastBox = $('<div/>', {class: className.box***REMOVED***);
            if (!isToastComponent) {
              module.verbose('Creating toast');
              $toast = $('<div/>');
              var $content = $('<div/>', {class: className.content***REMOVED***);
              var iconClass = module.get.iconClass();
              if (iconClass !== '') {
                $toast.append($('<i/>', {class: iconClass + ' ' + className.icon***REMOVED***));
            ***REMOVED***

              if (settings.showImage) {
                $toast.append($('<img>', {
                  class: className.image + ' ' + settings.classImage,
                  src: settings.showImage
              ***REMOVED***));
            ***REMOVED***
              if (settings.title !== '') {
                $content.append($('<div/>', {
                  class: className.title,
                  text: settings.title
              ***REMOVED***));
            ***REMOVED***

              $content.append($('<div/>', {html: module.helpers.escape(settings.message, settings.preserveHTML)***REMOVED***));

              $toast
                .addClass(settings.class + ' ' + className.toast)
                .append($content)
              ;
              $toast.css('opacity', settings.opacity);
              if (settings.closeIcon) {
                $close = $('<i/>', {class: className.close + ' ' + (typeof settings.closeIcon === 'string' ? settings.closeIcon : '')***REMOVED***);
                if($close.hasClass(className.left)) {
                  $toast.prepend($close);
              ***REMOVED*** else {
                  $toast.append($close);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED*** else {
              $toast = settings.cloneModule ? $module.clone().removeAttr('id') : $module;
              $close = $toast.find('> i'+module.helpers.toClass(className.close));
              settings.closeIcon = ($close.length > 0);
          ***REMOVED***
            if ($toast.hasClass(className.compact)) {
              settings.compact = true;
          ***REMOVED***
            if ($toast.hasClass('card')) {
              settings.compact = false;
          ***REMOVED***
            $actions = $toast.find('.actions');
            if (module.has.configActions()) {
              if ($actions.length === 0) {
                $actions = $('<div/>', {class: className.actions + ' ' + (settings.classActions || '')***REMOVED***).appendTo($toast);
            ***REMOVED***
              if($toast.hasClass('card') && !$actions.hasClass(className.attached)) {
                $actions.addClass(className.extraContent);
                if($actions.hasClass(className.vertical)) {
                  $actions.removeClass(className.vertical);
                  module.error(error.verticalCard);
              ***REMOVED***
            ***REMOVED***
              settings.actions.forEach(function (el) {
                var icon = el[fields.icon] ? '<i class="' + module.helpers.deQuote(el[fields.icon]) + ' icon"></i>' : '',
                  text = module.helpers.escape(el[fields.text] || '', settings.preserveHTML),
                  cls = module.helpers.deQuote(el[fields.class] || ''),
                  click = el[fields.click] && $.isFunction(el[fields.click]) ? el[fields.click] : function () {***REMOVED***;
                $actions.append($('<button/>', {
                  html: icon + text,
                  class: className.button + ' ' + cls,
                  click: function () {
                    if (click.call(element, $module) === false) {
                      return;
                  ***REMOVED***
                    module.close();
                ***REMOVED***
              ***REMOVED***));
            ***REMOVED***);
          ***REMOVED***
            if ($actions && $actions.hasClass(className.vertical)) {
                $toast.addClass(className.vertical);
          ***REMOVED***
            if($actions.length > 0 && !$actions.hasClass(className.attached)) {
              if ($actions && (!$actions.hasClass(className.basic) || $actions.hasClass(className.left))) {
                $toast.addClass(className.actions);
            ***REMOVED***
          ***REMOVED***
            if(settings.displayTime === 'auto'){
              settings.displayTime = Math.max(settings.minDisplayTime, $toast.text().split(" ").length / settings.wordsPerMinute***REMOVED*** 60000);
          ***REMOVED***
            $toastBox.append($toast);

            if($actions.length > 0 && $actions.hasClass(className.attached)) {
              $actions.addClass(className.buttons);
              $actions.detach();
              $toast.addClass(className.attached);
              if (!$actions.hasClass(className.vertical)) {
                if ($actions.hasClass(className.top)) {
                  $toastBox.prepend($actions);
                  $toast.addClass(className.bottom);
              ***REMOVED*** else {
                  $toastBox.append($actions);
                  $toast.addClass(className.top);
              ***REMOVED***
            ***REMOVED*** else {
                $toast.wrap(
                  $('<div/>',{
                    class:className.vertical + ' ' +
                          className.attached + ' ' +
                          (settings.compact ? className.compact : '')
                ***REMOVED***)
                );
                if($actions.hasClass(className.left)) {
                  $toast.addClass(className.left).parent().addClass(className.left).prepend($actions);
              ***REMOVED*** else {
                  $toast.parent().append($actions);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
            if($module !== $toast) {
              $module = $toast;
              element = $toast[0];
          ***REMOVED***
            if(settings.displayTime > 0) {
              var progressingClass = className.progressing+' '+(settings.pauseOnHover ? className.pausable:'');
              if (!!settings.showProgress) {
                $progress = $('<div/>', {
                  class: className.progress + ' ' + (settings.classProgress || settings.class),
                  'data-percent': ''
              ***REMOVED***);
                if(!settings.classProgress) {
                  if ($toast.hasClass('toast') && !$toast.hasClass(className.inverted)) {
                    $progress.addClass(className.inverted);
                ***REMOVED*** else {
                    $progress.removeClass(className.inverted);
                ***REMOVED***
              ***REMOVED***
                $progressBar = $('<div/>', {class: 'bar '+(settings.progressUp ? 'up ' : 'down ')+progressingClass***REMOVED***);
                $progress
                    .addClass(settings.showProgress)
                    .append($progressBar);
                if ($progress.hasClass(className.top)) {
                  $toastBox.prepend($progress);
              ***REMOVED*** else {
                  $toastBox.append($progress);
              ***REMOVED***
                $progressBar.css('animation-duration', settings.displayTime / 1000 + 's');
            ***REMOVED***
              $animationObject = $('<span/>',{class:'wait '+progressingClass***REMOVED***);
              $animationObject.css('animation-duration', settings.displayTime / 1000 + 's');
              $animationObject.appendTo($toast);
          ***REMOVED***
            if (settings.compact) {
              $toastBox.addClass(className.compact);
              $toast.addClass(className.compact);
              if($progress) {
                $progress.addClass(className.compact);
            ***REMOVED***
          ***REMOVED***
            if (settings.newestOnTop) {
              $toastBox.prependTo(module.get.container());
          ***REMOVED***
            else {
              $toastBox.appendTo(module.get.container());
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            module.debug('Binding events to toast');
            if(settings.closeOnClick || settings.closeIcon) {
              (settings.closeIcon ? $close : $toast)
                  .on('click' + eventNamespace, module.event.click)
              ;
          ***REMOVED***
            if($animationObject) {
              $animationObject.on('animationend' + eventNamespace, module.close);
          ***REMOVED***
            $toastBox
              .on('click' + eventNamespace, selector.approve, module.event.approve)
              .on('click' + eventNamespace, selector.deny, module.event.deny)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        unbind: {
          events: function() {
            module.debug('Unbinding events to toast');
            if(settings.closeOnClick || settings.closeIcon) {
              (settings.closeIcon ? $close : $toast)
                  .off('click' + eventNamespace)
              ;
          ***REMOVED***
            if($animationObject) {
              $animationObject.off('animationend' + eventNamespace);
          ***REMOVED***
            $toastBox
              .off('click' + eventNamespace)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        animate: {
          show: function(callback) {
            callback = $.isFunction(callback) ? callback : function(){***REMOVED***;
            if(settings.transition && module.can.useElement('transition') && $module.transition('is supported')) {
              module.set.visible();
              $toastBox
                .transition({
                  animation  : settings.transition.showMethod + ' in',
                  queue      : false,
                  debug      : settings.debug,
                  verbose    : settings.verbose,
                  duration   : settings.transition.showDuration,
                  onComplete : function() {
                    callback.call($toastBox, element);
                    settings.onVisible.call($toastBox, element);
                ***REMOVED***
              ***REMOVED***)
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          close: function(callback) {
            callback = $.isFunction(callback) ? callback : function(){***REMOVED***;
            module.debug('Closing toast');
            if(settings.onHide.call($toastBox, element) === false) {
              module.debug('onHide callback returned false, cancelling toast animation');
              return;
          ***REMOVED***
            if(settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              $toastBox
                .transition({
                  animation  : settings.transition.hideMethod + ' out',
                  queue      : false,
                  duration   : settings.transition.hideDuration,
                  debug      : settings.debug,
                  verbose    : settings.verbose,
                  interval   : 50,

                  onBeforeHide: function(callback){
                      callback = $.isFunction(callback)?callback : function(){***REMOVED***;
                      if(settings.transition.closeEasing !== ''){
                          if($toastBox) {
                            $toastBox.css('opacity', 0);
                            $toastBox.wrap('<div/>').parent().slideUp(500, settings.transition.closeEasing, function () {
                              if ($toastBox) {
                                $toastBox.parent().remove();
                                callback.call($toastBox);
                            ***REMOVED***
                          ***REMOVED***);
                        ***REMOVED***
                    ***REMOVED*** else {
                        callback.call($toastBox);
                    ***REMOVED***
      ***REMOVED*****REMOVED*****REMOVED***
                  onComplete : function() {
                    callback.call($toastBox, element);
                    settings.onHidden.call($toastBox, element);
                    module.destroy();
                ***REMOVED***
              ***REMOVED***)
              ;
          ***REMOVED***
            else {
              module.error(error.noTransition);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          pause: function() {
            $animationObject.css('animationPlayState','paused');
            if($progressBar) {
              $progressBar.css('animationPlayState', 'paused');
          ***REMOVED***
   ***REMOVED*****REMOVED***
          continue: function() {
            $animationObject.css('animationPlayState','running');
            if($progressBar) {
              $progressBar.css('animationPlayState', 'running');
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        has: {
          container: function() {
            module.verbose('Determining if there is already a container');
            return ($context.find(module.helpers.toClass(settings.position) + selector.container).length > 0);
   ***REMOVED*****REMOVED***
          toast: function(){
            return !!module.get.toast();
   ***REMOVED*****REMOVED***
          toasts: function(){
            return module.get.toasts().length > 0;
   ***REMOVED*****REMOVED***
          configActions: function () {
            return Array.isArray(settings.actions) && settings.actions.length > 0;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        get: {
          container: function() {
            return ($context.find(module.helpers.toClass(settings.position) + selector.container)[0]);
   ***REMOVED*****REMOVED***
          toastBox: function() {
            return $toastBox || null;
   ***REMOVED*****REMOVED***
          toast: function() {
            return $toast || null;
   ***REMOVED*****REMOVED***
          toasts: function() {
            return $(module.get.container()).find(selector.box);
   ***REMOVED*****REMOVED***
          iconClass: function() {
            return typeof settings.showIcon === 'string' ? settings.showIcon : settings.showIcon && settings.icons[settings.class] ? settings.icons[settings.class] : '';
   ***REMOVED*****REMOVED***
          remainingTime: function() {
            return $animationObject ? $animationObject.css('opacity')***REMOVED*** settings.displayTime : 0;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          visible: function() {
            $toast.addClass(className.visible);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          visible: function() {
            $toast.removeClass(className.visible);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          click: function(event) {
            if($(event.target).closest('a').length === 0) {
              settings.onClick.call($toastBox, element);
              module.close();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          approve: function() {
            if(settings.onApprove.call(element, $module) === false) {
              module.verbose('Approve callback returned false cancelling close');
              return;
          ***REMOVED***
            module.close();
   ***REMOVED*****REMOVED***
          deny: function() {
            if(settings.onDeny.call(element, $module) === false) {
              module.verbose('Deny callback returned false cancelling close');
              return;
          ***REMOVED***
            module.close();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        helpers: {
          toClass: function(selector) {
            var
              classes = selector.split(' '),
              result = ''
            ;

            classes.forEach(function (element) {
              result += '.' + element;
          ***REMOVED***);

            return result;
   ***REMOVED*****REMOVED***
          deQuote: function(string) {
            return String(string).replace(/"/g,"");
   ***REMOVED*****REMOVED***
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
  ***REMOVED*****REMOVED*****REMOVED***
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
 ***REMOVED*****REMOVED***

        can: {
          useElement: function(element){
            if ($.fn[element] !== undefined) {
              return true;
          ***REMOVED***
            module.error(error.noElement.replace('{element***REMOVED***',element));
            return false;
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
        returnedValue = $module;
    ***REMOVED***
  ***REMOVED***)
  ;

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
***REMOVED***;

$.fn.toast.settings = {

  name           : 'Toast',
  namespace      : 'toast',

  silent         : false,
  debug          : false,
  verbose        : false,
  performance    : true,

  context        : 'body',

  position       : 'top right',
  class          : 'neutral',
  classProgress  : false,
  classActions   : false,
  classImage     : 'mini',

  title          : '',
  message        : '',
  displayTime    : 3000, // set to zero to require manually dismissal, otherwise hides on its own
  minDisplayTime : 1000, // minimum displaytime in case displayTime is set to 'auto'
  wordsPerMinute : 120,
  showIcon       : false,
  newestOnTop    : false,
  showProgress   : false,
  pauseOnHover   : true,
  progressUp     : false, //if true, the bar will start at 0% and increase to 100%
  opacity        : 1,
  compact        : true,
  closeIcon      : false,
  closeOnClick   : true,
  cloneModule    : true,
  actions        : false,
  preserveHTML   : true,
  showImage      : false,

  // transition settings
  transition     : {
    showMethod   : 'scale',
    showDuration : 500,
    hideMethod   : 'scale',
    hideDuration : 500,
    closeEasing  : 'easeOutCubic'  //Set to empty string to stack the closed toast area immediately (old behaviour)
***REMOVED***

  error: {
    method       : 'The method you called is not defined.',
    noElement    : 'This module requires ui {element***REMOVED***',
    verticalCard : 'Vertical but not attached actions are not supported for card layout'
***REMOVED***

  className      : {
    container    : 'ui toast-container',
    box          : 'floating toast-box',
    progress     : 'ui attached active progress',
    toast        : 'ui toast',
    icon         : 'centered icon',
    visible      : 'visible',
    content      : 'content',
    title        : 'ui header',
    actions      : 'actions',
    extraContent : 'extra content',
    button       : 'ui button',
    buttons      : 'ui buttons',
    close        : 'close icon',
    image        : 'ui image',
    vertical     : 'vertical',
    attached     : 'attached',
    inverted     : 'inverted',
    compact      : 'compact',
    pausable     : 'pausable',
    progressing  : 'progressing',
    top          : 'top',
    bottom       : 'bottom',
    left         : 'left',
    basic        : 'basic',
    unclickable  : 'unclickable'
***REMOVED***

  icons          : {
    info         : 'info',
    success      : 'checkmark',
    warning      : 'warning',
    error        : 'times'
***REMOVED***

  selector       : {
    container    : '.ui.toast-container',
    box          : '.toast-box',
    toast        : '.ui.toast',
    input        : 'input:not([type="hidden"]), textarea, select, button, .ui.button, ui.dropdown',
    approve      : '.actions .positive, .actions .approve, .actions .ok',
    deny         : '.actions .negative, .actions .deny, .actions .cancel'
***REMOVED***

  fields         : {
    class        : 'class',
    text         : 'text',
    icon         : 'icon',
    click        : 'click'
***REMOVED***

  // callbacks
  onShow         : function(){***REMOVED***,
  onVisible      : function(){***REMOVED***,
  onClick        : function(){***REMOVED***,
  onHide         : function(){***REMOVED***,
  onHidden       : function(){***REMOVED***,
  onRemove       : function(){***REMOVED***,
  onApprove      : function(){***REMOVED***,
  onDeny         : function(){***REMOVED***
***REMOVED***;

$.extend( $.easing, {
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
      ***REMOVED*** else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
      ***REMOVED*** else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
      ***REMOVED*** else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
      ***REMOVED***
  ***REMOVED***
    easeOutCubic: function (t) {
      return (--t)*t*t+1;
  ***REMOVED***
***REMOVED***);


***REMOVED***)( jQuery, window, document );
