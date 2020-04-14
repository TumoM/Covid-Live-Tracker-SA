/*!
***REMOVED*** # Fomantic-UI - Dropdown
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

$.fn.dropdown = function(parameters) {
  var
    $allModules    = $(this),
    $document      = $(document),

    moduleSelector = $allModules.selector || '',

    hasTouch       = ('ontouchstart' in document.documentElement),
    clickEvent      = hasTouch
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
    .each(function(elementIndex) {
      var
        settings          = ( $.isPlainObject(parameters) )
          ? $.extend(true, {***REMOVED***, $.fn.dropdown.settings, parameters)
          : $.extend({***REMOVED***, $.fn.dropdown.settings),

        className       = settings.className,
        message         = settings.message,
        fields          = settings.fields,
        keys            = settings.keys,
        metadata        = settings.metadata,
        namespace       = settings.namespace,
        regExp          = settings.regExp,
        selector        = settings.selector,
        error           = settings.error,
        templates       = settings.templates,

        eventNamespace  = '.' + namespace,
        moduleNamespace = 'module-' + namespace,

        $module         = $(this),
        $context        = $(settings.context),
        $text           = $module.find(selector.text),
        $search         = $module.find(selector.search),
        $sizer          = $module.find(selector.sizer),
        $input          = $module.find(selector.input),
        $icon           = $module.find(selector.icon),
        $clear          = $module.find(selector.clearIcon),

        $combo = ($module.prev().find(selector.text).length > 0)
          ? $module.prev().find(selector.text)
          : $module.prev(),

        $menu           = $module.children(selector.menu),
        $item           = $menu.find(selector.item),
        $divider        = settings.hideDividers ? $item.parent().children(selector.divider) : $(),

        activated       = false,
        itemActivated   = false,
        internalChange  = false,
        iconClicked     = false,
        element         = this,
        instance        = $module.data(moduleNamespace),

        selectActionActive,
        initialLoad,
        pageLostFocus,
        willRefocus,
        elementNamespace,
        id,
        selectObserver,
        menuObserver,
        module
      ;

      module = {

        initialize: function() {
          module.debug('Initializing dropdown', settings);

          if( module.is.alreadySetup() ) {
            module.setup.reference();
        ***REMOVED***
          else {
            if (settings.ignoreDiacritics && !String.prototype.normalize) {
              settings.ignoreDiacritics = false;
              module.error(error.noNormalize, element);
          ***REMOVED***

            module.setup.layout();

            if(settings.values) {
              module.change.values(settings.values);
          ***REMOVED***

            module.refreshData();

            module.save.defaults();
            module.restore.selected();

            module.create.id();
            module.bind.events();

            module.observeChanges();
            module.instantiate();
        ***REMOVED***

 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of dropdown', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.verbose('Destroying previous dropdown', $module);
          module.remove.tabbable();
          module.remove.active();
          $menu.transition('stop all');
          $menu.removeClass(className.visible).addClass(className.hidden);
          $module
            .off(eventNamespace)
            .removeData(moduleNamespace)
          ;
          $menu
            .off(eventNamespace)
          ;
          $document
            .off(elementNamespace)
          ;
          module.disconnect.menuObserver();
          module.disconnect.selectObserver();
 ***REMOVED*****REMOVED***

        observeChanges: function() {
          if('MutationObserver' in window) {
            selectObserver = new MutationObserver(module.event.select.mutation);
            menuObserver   = new MutationObserver(module.event.menu.mutation);
            module.debug('Setting up mutation observer', selectObserver, menuObserver);
            module.observe.select();
            module.observe.menu();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        disconnect: {
          menuObserver: function() {
            if(menuObserver) {
              menuObserver.disconnect();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          selectObserver: function() {
            if(selectObserver) {
              selectObserver.disconnect();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***
        observe: {
          select: function() {
            if(module.has.input() && selectObserver) {
              selectObserver.observe($module[0], {
                childList : true,
                subtree   : true
            ***REMOVED***);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          menu: function() {
            if(module.has.menu() && menuObserver) {
              menuObserver.observe($menu[0], {
                childList : true,
                subtree   : true
            ***REMOVED***);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        create: {
          id: function() {
            id = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementNamespace = '.' + id;
            module.verbose('Creating unique id for element', id);
   ***REMOVED*****REMOVED***
          userChoice: function(values) {
            var
              $userChoices,
              $userChoice,
              isUserValue,
              html
            ;
            values = values || module.get.userValues();
            if(!values) {
              return false;
          ***REMOVED***
            values = Array.isArray(values)
              ? values
              : [values]
            ;
            $.each(values, function(index, value) {
              if(module.get.item(value) === false) {
                html         = settings.templates.addition( module.add.variables(message.addResult, value) );
                $userChoice  = $('<div />')
                  .html(html)
                  .attr('data-' + metadata.value, value)
                  .attr('data-' + metadata.text, value)
                  .addClass(className.addition)
                  .addClass(className.item)
                ;
                if(settings.hideAdditions) {
                  $userChoice.addClass(className.hidden);
              ***REMOVED***
                $userChoices = ($userChoices === undefined)
                  ? $userChoice
                  : $userChoices.add($userChoice)
                ;
                module.verbose('Creating user choices for value', value, $userChoice);
            ***REMOVED***
          ***REMOVED***);
            return $userChoices;
   ***REMOVED*****REMOVED***
          userLabels: function(value) {
            var
              userValues = module.get.userValues()
            ;
            if(userValues) {
              module.debug('Adding user labels', userValues);
              $.each(userValues, function(index, value) {
                module.verbose('Adding custom user value');
                module.add.label(value, value);
            ***REMOVED***);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          menu: function() {
            $menu = $('<div />')
              .addClass(className.menu)
              .appendTo($module)
            ;
   ***REMOVED*****REMOVED***
          sizer: function() {
            $sizer = $('<span />')
              .addClass(className.sizer)
              .insertAfter($search)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        search: function(query) {
          query = (query !== undefined)
            ? query
            : module.get.query()
          ;
          module.verbose('Searching for query', query);
          if(module.has.minCharacters(query)) {
            module.filter(query);
        ***REMOVED***
          else {
            module.hide(null,true);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        select: {
          firstUnfiltered: function() {
            module.verbose('Selecting first non-filtered element');
            module.remove.selectedItem();
            $item
              .not(selector.unselectable)
              .not(selector.addition + selector.hidden)
                .eq(0)
                .addClass(className.selected)
            ;
   ***REMOVED*****REMOVED***
          nextAvailable: function($selected) {
            $selected = $selected.eq(0);
            var
              $nextAvailable = $selected.nextAll(selector.item).not(selector.unselectable).eq(0),
              $prevAvailable = $selected.prevAll(selector.item).not(selector.unselectable).eq(0),
              hasNext        = ($nextAvailable.length > 0)
            ;
            if(hasNext) {
              module.verbose('Moving selection to', $nextAvailable);
              $nextAvailable.addClass(className.selected);
          ***REMOVED***
            else {
              module.verbose('Moving selection to', $prevAvailable);
              $prevAvailable.addClass(className.selected);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        setup: {
          api: function() {
            var
              apiSettings = {
                debug   : settings.debug,
                urlData : {
                  value : module.get.value(),
                  query : module.get.query()
    ***REMOVED*****REMOVED*****REMOVED***
                on    : false
            ***REMOVED***
            ;
            module.verbose('First request, initializing API');
            $module
              .api(apiSettings)
            ;
   ***REMOVED*****REMOVED***
          layout: function() {
            if( $module.is('select') ) {
              module.setup.select();
              module.setup.returnedObject();
          ***REMOVED***
            if( !module.has.menu() ) {
              module.create.menu();
          ***REMOVED***
            if ( module.is.selection() && module.is.clearable() && !module.has.clearItem() ) {
              module.verbose('Adding clear icon');
              $clear = $('<i />')
                .addClass('remove icon')
                .insertBefore($text)
              ;
          ***REMOVED***
            if( module.is.search() && !module.has.search() ) {
              module.verbose('Adding search input');
              $search = $('<input />')
                .addClass(className.search)
                .prop('autocomplete', 'off')
                .insertBefore($text)
              ;
          ***REMOVED***
            if( module.is.multiple() && module.is.searchSelection() && !module.has.sizer()) {
              module.create.sizer();
          ***REMOVED***
            if(settings.allowTab) {
              module.set.tabbable();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          select: function() {
            var
              selectValues  = module.get.selectValues()
            ;
            module.debug('Dropdown initialized on a select', selectValues);
            if( $module.is('select') ) {
              $input = $module;
          ***REMOVED***
            // see if select is placed correctly already
            if($input.parent(selector.dropdown).length > 0) {
              module.debug('UI dropdown already exists. Creating dropdown menu only');
              $module = $input.closest(selector.dropdown);
              if( !module.has.menu() ) {
                module.create.menu();
            ***REMOVED***
              $menu = $module.children(selector.menu);
              module.setup.menu(selectValues);
          ***REMOVED***
            else {
              module.debug('Creating entire dropdown from select');
              $module = $('<div />')
                .attr('class', $input.attr('class') )
                .addClass(className.selection)
                .addClass(className.dropdown)
                .html( templates.dropdown(selectValues, fields, settings.preserveHTML, settings.className) )
                .insertBefore($input)
              ;
              if($input.hasClass(className.multiple) && $input.prop('multiple') === false) {
                module.error(error.missingMultiple);
                $input.prop('multiple', true);
            ***REMOVED***
              if($input.is('[multiple]')) {
                module.set.multiple();
            ***REMOVED***
              if ($input.prop('disabled')) {
                module.debug('Disabling dropdown');
                $module.addClass(className.disabled);
            ***REMOVED***
              $input
                .removeAttr('required')
                .removeAttr('class')
                .detach()
                .prependTo($module)
              ;
          ***REMOVED***
            module.refresh();
   ***REMOVED*****REMOVED***
          menu: function(values) {
            $menu.html( templates.menu(values, fields,settings.preserveHTML,settings.className));
            $item    = $menu.find(selector.item);
            $divider = settings.hideDividers ? $item.parent().children(selector.divider) : $();
   ***REMOVED*****REMOVED***
          reference: function() {
            module.debug('Dropdown behavior was called on select, replacing with closest dropdown');
            // replace module reference
            $module  = $module.parent(selector.dropdown);
            instance = $module.data(moduleNamespace);
            element  = $module.get(0);
            module.refresh();
            module.setup.returnedObject();
   ***REMOVED*****REMOVED***
          returnedObject: function() {
            var
              $firstModules = $allModules.slice(0, elementIndex),
              $lastModules  = $allModules.slice(elementIndex + 1)
            ;
            // adjust all modules to use correct reference
            $allModules = $firstModules.add($module).add($lastModules);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        refresh: function() {
          module.refreshSelectors();
          module.refreshData();
 ***REMOVED*****REMOVED***

        refreshItems: function() {
          $item    = $menu.find(selector.item);
          $divider = settings.hideDividers ? $item.parent().children(selector.divider) : $();
 ***REMOVED*****REMOVED***

        refreshSelectors: function() {
          module.verbose('Refreshing selector cache');
          $text   = $module.find(selector.text);
          $search = $module.find(selector.search);
          $input  = $module.find(selector.input);
          $icon   = $module.find(selector.icon);
          $combo  = ($module.prev().find(selector.text).length > 0)
            ? $module.prev().find(selector.text)
            : $module.prev()
          ;
          $menu    = $module.children(selector.menu);
          $item    = $menu.find(selector.item);
          $divider = settings.hideDividers ? $item.parent().children(selector.divider) : $();
 ***REMOVED*****REMOVED***

        refreshData: function() {
          module.verbose('Refreshing cached metadata');
          $item
            .removeData(metadata.text)
            .removeData(metadata.value)
          ;
 ***REMOVED*****REMOVED***

        clearData: function() {
          module.verbose('Clearing metadata');
          $item
            .removeData(metadata.text)
            .removeData(metadata.value)
          ;
          $module
            .removeData(metadata.defaultText)
            .removeData(metadata.defaultValue)
            .removeData(metadata.placeholderText)
          ;
 ***REMOVED*****REMOVED***

        toggle: function() {
          module.verbose('Toggling menu visibility');
          if( !module.is.active() ) {
            module.show();
        ***REMOVED***
          else {
            module.hide();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        show: function(callback, preventFocus) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          if(!module.can.show() && module.is.remote()) {
            module.debug('No API results retrieved, searching before show');
            module.queryRemote(module.get.query(), module.show);
        ***REMOVED***
          if( module.can.show() && !module.is.active() ) {
            module.debug('Showing dropdown');
            if(module.has.message() && !(module.has.maxSelections() || module.has.allResultsFiltered()) ) {
              module.remove.message();
          ***REMOVED***
            if(module.is.allFiltered()) {
              return true;
          ***REMOVED***
            if(settings.onShow.call(element) !== false) {
              module.animate.show(function() {
                if( module.can.click() ) {
                  module.bind.intent();
              ***REMOVED***
                if(module.has.search() && !preventFocus) {
                  module.focusSearch();
              ***REMOVED***
                module.set.visible();
                callback.call(element);
            ***REMOVED***);
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        hide: function(callback, preventBlur) {
          callback = $.isFunction(callback)
            ? callback
            : function(){***REMOVED***
          ;
          if( module.is.active() && !module.is.animatingOutward() ) {
            module.debug('Hiding dropdown');
            if(settings.onHide.call(element) !== false) {
              module.animate.hide(function() {
                module.remove.visible();
                // hidding search focus
                if ( module.is.focusedOnSearch() && preventBlur !== true ) {
                  $search.blur();
              ***REMOVED***
                callback.call(element);
            ***REMOVED***);
          ***REMOVED***
        ***REMOVED*** else if( module.can.click() ) {
              module.unbind.intent();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        hideOthers: function() {
          module.verbose('Finding other dropdowns to hide');
          $allModules
            .not($module)
              .has(selector.menu + '.' + className.visible)
                .dropdown('hide')
          ;
 ***REMOVED*****REMOVED***

        hideMenu: function() {
          module.verbose('Hiding menu  instantaneously');
          module.remove.active();
          module.remove.visible();
          $menu.transition('hide');
 ***REMOVED*****REMOVED***

        hideSubMenus: function() {
          var
            $subMenus = $menu.children(selector.item).find(selector.menu)
          ;
          module.verbose('Hiding sub menus', $subMenus);
          $subMenus.transition('hide');
 ***REMOVED*****REMOVED***

        bind: {
          events: function() {
            module.bind.keyboardEvents();
            module.bind.inputEvents();
            module.bind.mouseEvents();
   ***REMOVED*****REMOVED***
          keyboardEvents: function() {
            module.verbose('Binding keyboard events');
            $module
              .on('keydown' + eventNamespace, module.event.keydown)
            ;
            if( module.has.search() ) {
              $module
                .on(module.get.inputEvent() + eventNamespace, selector.search, module.event.input)
              ;
          ***REMOVED***
            if( module.is.multiple() ) {
              $document
                .on('keydown' + elementNamespace, module.event.document.keydown)
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          inputEvents: function() {
            module.verbose('Binding input change events');
            $module
              .on('change' + eventNamespace, selector.input, module.event.change)
            ;
   ***REMOVED*****REMOVED***
          mouseEvents: function() {
            module.verbose('Binding mouse events');
            if(module.is.multiple()) {
              $module
                .on(clickEvent   + eventNamespace, selector.label,  module.event.label.click)
                .on(clickEvent   + eventNamespace, selector.remove, module.event.remove.click)
              ;
          ***REMOVED***
            if( module.is.searchSelection() ) {
              $module
                .on('mousedown' + eventNamespace, module.event.mousedown)
                .on('mouseup'   + eventNamespace, module.event.mouseup)
                .on('mousedown' + eventNamespace, selector.menu,   module.event.menu.mousedown)
                .on('mouseup'   + eventNamespace, selector.menu,   module.event.menu.mouseup)
                .on(clickEvent  + eventNamespace, selector.icon,   module.event.icon.click)
                .on(clickEvent  + eventNamespace, selector.clearIcon, module.event.clearIcon.click)
                .on('focus'     + eventNamespace, selector.search, module.event.search.focus)
                .on(clickEvent  + eventNamespace, selector.search, module.event.search.focus)
                .on('blur'      + eventNamespace, selector.search, module.event.search.blur)
                .on(clickEvent  + eventNamespace, selector.text,   module.event.text.focus)
              ;
              if(module.is.multiple()) {
                $module
                  .on(clickEvent + eventNamespace, module.event.click)
                ;
            ***REMOVED***
          ***REMOVED***
            else {
              if(settings.on == 'click') {
                $module
                  .on(clickEvent + eventNamespace, selector.icon, module.event.icon.click)
                  .on(clickEvent + eventNamespace, module.event.test.toggle)
                ;
            ***REMOVED***
              else if(settings.on == 'hover') {
                $module
                  .on('mouseenter' + eventNamespace, module.delay.show)
                  .on('mouseleave' + eventNamespace, module.delay.hide)
                ;
            ***REMOVED***
              else {
                $module
                  .on(settings.on + eventNamespace, module.toggle)
                ;
            ***REMOVED***
              $module
                .on('mousedown' + eventNamespace, module.event.mousedown)
                .on('mouseup'   + eventNamespace, module.event.mouseup)
                .on('focus'     + eventNamespace, module.event.focus)
                .on(clickEvent  + eventNamespace, selector.clearIcon, module.event.clearIcon.click)
              ;
              if(module.has.menuSearch() ) {
                $module
                  .on('blur' + eventNamespace, selector.search, module.event.search.blur)
                ;
            ***REMOVED***
              else {
                $module
                  .on('blur' + eventNamespace, module.event.blur)
                ;
            ***REMOVED***
          ***REMOVED***
            $menu
              .on((hasTouch ? 'touchstart' : 'mouseenter') + eventNamespace, selector.item, module.event.item.mouseenter)
              .on('mouseleave' + eventNamespace, selector.item, module.event.item.mouseleave)
              .on('click'      + eventNamespace, selector.item, module.event.item.click)
            ;
   ***REMOVED*****REMOVED***
          intent: function() {
            module.verbose('Binding hide intent event to document');
            if(hasTouch) {
              $document
                .on('touchstart' + elementNamespace, module.event.test.touch)
                .on('touchmove'  + elementNamespace, module.event.test.touch)
              ;
          ***REMOVED***
            $document
              .on(clickEvent + elementNamespace, module.event.test.hide)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        unbind: {
          intent: function() {
            module.verbose('Removing hide intent event from document');
            if(hasTouch) {
              $document
                .off('touchstart' + elementNamespace)
                .off('touchmove' + elementNamespace)
              ;
          ***REMOVED***
            $document
              .off(clickEvent + elementNamespace)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        filter: function(query) {
          var
            searchTerm = (query !== undefined)
              ? query
              : module.get.query(),
            afterFiltered = function() {
              if(module.is.multiple()) {
                module.filterActive();
            ***REMOVED***
              if(query || (!query && module.get.activeItem().length == 0)) {
                module.select.firstUnfiltered();
            ***REMOVED***
              if( module.has.allResultsFiltered() ) {
                if( settings.onNoResults.call(element, searchTerm) ) {
                  if(settings.allowAdditions) {
                    if(settings.hideAdditions) {
                      module.verbose('User addition with no menu, setting empty style');
                      module.set.empty();
                      module.hideMenu();
                  ***REMOVED***
                ***REMOVED***
                  else {
                    module.verbose('All items filtered, showing message', searchTerm);
                    module.add.message(message.noResults);
                ***REMOVED***
              ***REMOVED***
                else {
                  module.verbose('All items filtered, hiding dropdown', searchTerm);
                  module.hideMenu();
              ***REMOVED***
            ***REMOVED***
              else {
                module.remove.empty();
                module.remove.message();
            ***REMOVED***
              if(settings.allowAdditions) {
                module.add.userSuggestion(module.escape.htmlEntities(query));
            ***REMOVED***
              if(module.is.searchSelection() && module.can.show() && module.is.focusedOnSearch() ) {
                module.show();
            ***REMOVED***
          ***REMOVED***
          ;
          if(settings.useLabels && module.has.maxSelections()) {
            return;
        ***REMOVED***
          if(settings.apiSettings) {
            if( module.can.useAPI() ) {
              module.queryRemote(searchTerm, function() {
                if(settings.filterRemoteData) {
                  module.filterItems(searchTerm);
              ***REMOVED***
                var preSelected = $input.val();
                if(!Array.isArray(preSelected)) {
                    preSelected = preSelected && preSelected!=="" ? preSelected.split(settings.delimiter) : [];
              ***REMOVED***
                $.each(preSelected,function(index,value){
                  $item.filter('[data-value="'+value+'"]')
                      .addClass(className.filtered)
                  ;
              ***REMOVED***);
                afterFiltered();
            ***REMOVED***);
          ***REMOVED***
            else {
              module.error(error.noAPI);
          ***REMOVED***
        ***REMOVED***
          else {
            module.filterItems(searchTerm);
            afterFiltered();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        queryRemote: function(query, callback) {
          var
            apiSettings = {
              errorDuration : false,
              cache         : 'local',
              throttle      : settings.throttle,
              urlData       : {
                query: query
  ***REMOVED*****REMOVED*****REMOVED***
              onError: function() {
                module.add.message(message.serverError);
                callback();
  ***REMOVED*****REMOVED*****REMOVED***
              onFailure: function() {
                module.add.message(message.serverError);
                callback();
  ***REMOVED*****REMOVED*****REMOVED***
              onSuccess : function(response) {
                var
                  values          = response[fields.remoteValues]
                ;
                if (!Array.isArray(values)){
                    values = [];
              ***REMOVED***
                module.remove.message();
                module.setup.menu({
                  values: values
              ***REMOVED***);

                if(values.length===0 && !settings.allowAdditions) {
                  module.add.message(message.noResults);
              ***REMOVED***
                callback();
            ***REMOVED***
          ***REMOVED***
          ;
          if( !$module.api('get request') ) {
            module.setup.api();
        ***REMOVED***
          apiSettings = $.extend(true, {***REMOVED***, apiSettings, settings.apiSettings);
          $module
            .api('setting', apiSettings)
            .api('query')
          ;
 ***REMOVED*****REMOVED***

        filterItems: function(query) {
          var
            searchTerm = module.remove.diacritics(query !== undefined
              ? query
              : module.get.query()
            ),
            results          =  null,
            escapedTerm      = module.escape.string(searchTerm),
            regExpFlags      = (settings.ignoreSearchCase ? 'i' : '') + 'gm',
            beginsWithRegExp = new RegExp('^' + escapedTerm, regExpFlags)
          ;
          // avoid loop if we're matching nothing
          if( module.has.query() ) {
            results = [];

            module.verbose('Searching for matching values', searchTerm);
            $item
              .each(function(){
                var
                  $choice = $(this),
                  text,
                  value
                ;
                if($choice.hasClass(className.unfilterable)) {
                  results.push(this);
                  return true;
              ***REMOVED***
                if(settings.match === 'both' || settings.match === 'text') {
                  text = module.remove.diacritics(String(module.get.choiceText($choice, false)));
                  if(text.search(beginsWithRegExp) !== -1) {
                    results.push(this);
                    return true;
                ***REMOVED***
                  else if (settings.fullTextSearch === 'exact' && module.exactSearch(searchTerm, text)) {
                    results.push(this);
                    return true;
                ***REMOVED***
                  else if (settings.fullTextSearch === true && module.fuzzySearch(searchTerm, text)) {
                    results.push(this);
                    return true;
                ***REMOVED***
              ***REMOVED***
                if(settings.match === 'both' || settings.match === 'value') {
                  value = module.remove.diacritics(String(module.get.choiceValue($choice, text)));
                  if(value.search(beginsWithRegExp) !== -1) {
                    results.push(this);
                    return true;
                ***REMOVED***
                  else if (settings.fullTextSearch === 'exact' && module.exactSearch(searchTerm, value)) {
                    results.push(this);
                    return true;
                ***REMOVED***
                  else if (settings.fullTextSearch === true && module.fuzzySearch(searchTerm, value)) {
                    results.push(this);
                    return true;
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***)
            ;
        ***REMOVED***
          module.debug('Showing only matched items', searchTerm);
          module.remove.filteredItem();
          if(results) {
            $item
              .not(results)
              .addClass(className.filtered)
            ;
        ***REMOVED***

          if(!module.has.query()) {
            $divider
              .removeClass(className.hidden);
        ***REMOVED*** else if(settings.hideDividers === true) {
            $divider
              .addClass(className.hidden);
        ***REMOVED*** else if(settings.hideDividers === 'empty') {
            $divider
              .removeClass(className.hidden)
              .filter(function() {
                // First find the last divider in this divider group
                // Dividers which are direct siblings are considered a group
                var lastDivider = $(this).nextUntil(selector.item);

                return (lastDivider.length ? lastDivider : $(this))
                // Count all non-filtered items until the next divider (or end of the dropdown)
                  .nextUntil(selector.divider)
                  .filter(selector.item + ":not(." + className.filtered + ")")
                  // Hide divider if no items are found
                  .length === 0;
            ***REMOVED***)
              .addClass(className.hidden);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        fuzzySearch: function(query, term) {
          var
            termLength  = term.length,
            queryLength = query.length
          ;
          query = (settings.ignoreSearchCase ? query.toLowerCase() : query);
          term  = (settings.ignoreSearchCase ? term.toLowerCase() : term);
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
        exactSearch: function (query, term) {
          query = (settings.ignoreSearchCase ? query.toLowerCase() : query);
          term  = (settings.ignoreSearchCase ? term.toLowerCase() : term);
          return term.indexOf(query) > -1;

 ***REMOVED*****REMOVED***
        filterActive: function() {
          if(settings.useLabels) {
            $item.filter('.' + className.active)
              .addClass(className.filtered)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        focusSearch: function(skipHandler) {
          if( module.has.search() && !module.is.focusedOnSearch() ) {
            if(skipHandler) {
              $module.off('focus' + eventNamespace, selector.search);
              $search.focus();
              $module.on('focus'  + eventNamespace, selector.search, module.event.search.focus);
          ***REMOVED***
            else {
              $search.focus();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        blurSearch: function() {
          if( module.has.search() ) {
            $search.blur();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        forceSelection: function() {
          var
            $currentlySelected = $item.not(className.filtered).filter('.' + className.selected).eq(0),
            $activeItem        = $item.not(className.filtered).filter('.' + className.active).eq(0),
            $selectedItem      = ($currentlySelected.length > 0)
              ? $currentlySelected
              : $activeItem,
            hasSelected = ($selectedItem.length > 0)
          ;
          if(settings.allowAdditions || (hasSelected && !module.is.multiple())) {
            module.debug('Forcing partial selection to selected item', $selectedItem);
            module.event.item.click.call($selectedItem, {***REMOVED***, true);
        ***REMOVED***
          else {
            module.remove.searchTerm();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        change: {
          values: function(values) {
            if(!settings.allowAdditions) {
              module.clear();
          ***REMOVED***
            module.debug('Creating dropdown with specified values', values);
            module.setup.menu({values: values***REMOVED***);
            $.each(values, function(index, item) {
              if(item.selected == true) {
                module.debug('Setting initial selection to', item[fields.value]);
                module.set.selected(item[fields.value]);
                if(!module.is.multiple()) {
                  return false;
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***);

            if(module.has.selectInput()) {
              module.disconnect.selectObserver();
              $input.html('');
              $input.append('<option disabled selected value></option>');
              $.each(values, function(index, item) {
                var
                  value = settings.templates.deQuote(item[fields.value]),
                  name = settings.templates.escape(
                    item[fields.name] || '',
                    settings.preserveHTML
                  )
                ;
                $input.append('<option value="' + value + '">' + name + '</option>');
            ***REMOVED***);
              module.observe.select();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        event: {
          change: function() {
            if(!internalChange) {
              module.debug('Input changed, updating selection');
              module.set.selected();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          focus: function() {
            if(settings.showOnFocus && !activated && module.is.hidden() && !pageLostFocus) {
              module.show();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          blur: function(event) {
            pageLostFocus = (document.activeElement === this);
            if(!activated && !pageLostFocus) {
              module.remove.activeLabel();
              module.hide();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          mousedown: function() {
            if(module.is.searchSelection()) {
              // prevent menu hiding on immediate re-focus
              willRefocus = true;
          ***REMOVED***
            else {
              // prevents focus callback from occurring on mousedown
              activated = true;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          mouseup: function() {
            if(module.is.searchSelection()) {
              // prevent menu hiding on immediate re-focus
              willRefocus = false;
          ***REMOVED***
            else {
              activated = false;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          click: function(event) {
            var
              $target = $(event.target)
            ;
            // focus search
            if($target.is($module)) {
              if(!module.is.focusedOnSearch()) {
                module.focusSearch();
            ***REMOVED***
              else {
                module.show();
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          search: {
            focus: function(event) {
              activated = true;
              if(module.is.multiple()) {
                module.remove.activeLabel();
            ***REMOVED***
              if(settings.showOnFocus || (event.type !== 'focus' && event.type !== 'focusin')) {
                module.search();
            ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            blur: function(event) {
              pageLostFocus = (document.activeElement === this);
              if(module.is.searchSelection() && !willRefocus) {
                if(!itemActivated && !pageLostFocus) {
                  if(settings.forceSelection) {
                    module.forceSelection();
                ***REMOVED*** else if(!settings.allowAdditions){
                    module.remove.searchTerm();
                ***REMOVED***
                  module.hide();
              ***REMOVED***
            ***REMOVED***
              willRefocus = false;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          clearIcon: {
            click: function(event) {
              module.clear();
              if(module.is.searchSelection()) {
                module.remove.searchTerm();
            ***REMOVED***
              module.hide();
              event.stopPropagation();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          icon: {
            click: function(event) {
              iconClicked=true;
              if(module.has.search()) {
                if(!module.is.active()) {
                    if(settings.showOnFocus){
                      module.focusSearch();
                  ***REMOVED*** else {
                      module.toggle();
                  ***REMOVED***
              ***REMOVED*** else {
                  module.blurSearch();
              ***REMOVED***
            ***REMOVED*** else {
                module.toggle();
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          text: {
            focus: function(event) {
              activated = true;
              module.focusSearch();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          input: function(event) {
            if(module.is.multiple() || module.is.searchSelection()) {
              module.set.filtered();
          ***REMOVED***
            clearTimeout(module.timer);
            module.timer = setTimeout(module.search, settings.delay.search);
   ***REMOVED*****REMOVED***
          label: {
            click: function(event) {
              var
                $label        = $(this),
                $labels       = $module.find(selector.label),
                $activeLabels = $labels.filter('.' + className.active),
                $nextActive   = $label.nextAll('.' + className.active),
                $prevActive   = $label.prevAll('.' + className.active),
                $range = ($nextActive.length > 0)
                  ? $label.nextUntil($nextActive).add($activeLabels).add($label)
                  : $label.prevUntil($prevActive).add($activeLabels).add($label)
              ;
              if(event.shiftKey) {
                $activeLabels.removeClass(className.active);
                $range.addClass(className.active);
            ***REMOVED***
              else if(event.ctrlKey) {
                $label.toggleClass(className.active);
            ***REMOVED***
              else {
                $activeLabels.removeClass(className.active);
                $label.addClass(className.active);
            ***REMOVED***
              settings.onLabelSelect.apply(this, $labels.filter('.' + className.active));
          ***REMOVED***
   ***REMOVED*****REMOVED***
          remove: {
            click: function() {
              var
                $label = $(this).parent()
              ;
              if( $label.hasClass(className.active) ) {
                // remove all selected labels
                module.remove.activeLabels();
            ***REMOVED***
              else {
                // remove this label only
                module.remove.activeLabels( $label );
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          test: {
            toggle: function(event) {
              var
                toggleBehavior = (module.is.multiple())
                  ? module.show
                  : module.toggle
              ;
              if(module.is.bubbledLabelClick(event) || module.is.bubbledIconClick(event)) {
                return;
            ***REMOVED***
              if( module.determine.eventOnElement(event, toggleBehavior) ) {
                event.preventDefault();
            ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            touch: function(event) {
              module.determine.eventOnElement(event, function() {
                if(event.type == 'touchstart') {
                  module.timer = setTimeout(function() {
                    module.hide();
      ***REMOVED*****REMOVED*****REMOVED*** settings.delay.touch);
              ***REMOVED***
                else if(event.type == 'touchmove') {
                  clearTimeout(module.timer);
              ***REMOVED***
            ***REMOVED***);
              event.stopPropagation();
***REMOVED*****REMOVED*****REMOVED***
            hide: function(event) {
              if(module.determine.eventInModule(event, module.hide)){
                if(element.id && $(event.target).attr('for') === element.id){
                  event.preventDefault();
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          select: {
            mutation: function(mutations) {
              module.debug('<select> modified, recreating menu');
              if(module.is.selectMutation(mutations)) {
                module.disconnect.selectObserver();
                module.refresh();
                module.setup.select();
                module.set.selected();
                module.observe.select();
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          menu: {
            mutation: function(mutations) {
              var
                mutation   = mutations[0],
                $addedNode = mutation.addedNodes
                  ? $(mutation.addedNodes[0])
                  : $(false),
                $removedNode = mutation.removedNodes
                  ? $(mutation.removedNodes[0])
                  : $(false),
                $changedNodes  = $addedNode.add($removedNode),
                isUserAddition = $changedNodes.is(selector.addition) || $changedNodes.closest(selector.addition).length > 0,
                isMessage      = $changedNodes.is(selector.message)  || $changedNodes.closest(selector.message).length > 0
              ;
              if(isUserAddition || isMessage) {
                module.debug('Updating item selector cache');
                module.refreshItems();
            ***REMOVED***
              else {
                module.debug('Menu modified, updating selector cache');
                module.refresh();
            ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            mousedown: function() {
              itemActivated = true;
***REMOVED*****REMOVED*****REMOVED***
            mouseup: function() {
              itemActivated = false;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          item: {
            mouseenter: function(event) {
              var
                $target        = $(event.target),
                $item          = $(this),
                $subMenu       = $item.children(selector.menu),
                $otherMenus    = $item.siblings(selector.item).children(selector.menu),
                hasSubMenu     = ($subMenu.length > 0),
                isBubbledEvent = ($subMenu.find($target).length > 0)
              ;
              if( !isBubbledEvent && hasSubMenu ) {
                clearTimeout(module.itemTimer);
                module.itemTimer = setTimeout(function() {
                  module.verbose('Showing sub-menu', $subMenu);
                  $.each($otherMenus, function() {
                    module.animate.hide(false, $(this));
                ***REMOVED***);
                  module.animate.show(false, $subMenu);
    ***REMOVED*****REMOVED*****REMOVED*** settings.delay.show);
                event.preventDefault();
            ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            mouseleave: function(event) {
              var
                $subMenu = $(this).children(selector.menu)
              ;
              if($subMenu.length > 0) {
                clearTimeout(module.itemTimer);
                module.itemTimer = setTimeout(function() {
                  module.verbose('Hiding sub-menu', $subMenu);
                  module.animate.hide(false, $subMenu);
    ***REMOVED*****REMOVED*****REMOVED*** settings.delay.hide);
            ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            click: function (event, skipRefocus) {
              var
                $choice        = $(this),
                $target        = (event)
                  ? $(event.target)
                  : $(''),
                $subMenu       = $choice.find(selector.menu),
                text           = module.get.choiceText($choice),
                value          = module.get.choiceValue($choice, text),
                hasSubMenu     = ($subMenu.length > 0),
                isBubbledEvent = ($subMenu.find($target).length > 0)
              ;
              // prevents IE11 bug where menu receives focus even though `tabindex=-1`
              if (document.activeElement.tagName.toLowerCase() !== 'input') {
                $(document.activeElement).blur();
            ***REMOVED***
              if(!isBubbledEvent && (!hasSubMenu || settings.allowCategorySelection)) {
                if(module.is.searchSelection()) {
                  if(settings.allowAdditions) {
                    module.remove.userAddition();
                ***REMOVED***
                  module.remove.searchTerm();
                  if(!module.is.focusedOnSearch() && !(skipRefocus == true)) {
                    module.focusSearch(true);
                ***REMOVED***
              ***REMOVED***
                if(!settings.useLabels) {
                  module.remove.filteredItem();
                  module.set.scrollPosition($choice);
              ***REMOVED***
                module.determine.selectAction.call(this, text, value);
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***

          document: {
            // label selection should occur even when element has no focus
            keydown: function(event) {
              var
                pressedKey    = event.which,
                isShortcutKey = module.is.inObject(pressedKey, keys)
              ;
              if(isShortcutKey) {
                var
                  $label            = $module.find(selector.label),
                  $activeLabel      = $label.filter('.' + className.active),
                  activeValue       = $activeLabel.data(metadata.value),
                  labelIndex        = $label.index($activeLabel),
                  labelCount        = $label.length,
                  hasActiveLabel    = ($activeLabel.length > 0),
                  hasMultipleActive = ($activeLabel.length > 1),
                  isFirstLabel      = (labelIndex === 0),
                  isLastLabel       = (labelIndex + 1 == labelCount),
                  isSearch          = module.is.searchSelection(),
                  isFocusedOnSearch = module.is.focusedOnSearch(),
                  isFocused         = module.is.focused(),
                  caretAtStart      = (isFocusedOnSearch && module.get.caretPosition(false) === 0),
                  isSelectedSearch  = (caretAtStart && module.get.caretPosition(true) !== 0),
                  $nextLabel
                ;
                if(isSearch && !hasActiveLabel && !isFocusedOnSearch) {
                  return;
              ***REMOVED***

                if(pressedKey == keys.leftArrow) {
                  // activate previous label
                  if((isFocused || caretAtStart) && !hasActiveLabel) {
                    module.verbose('Selecting previous label');
                    $label.last().addClass(className.active);
                ***REMOVED***
                  else if(hasActiveLabel) {
                    if(!event.shiftKey) {
                      module.verbose('Selecting previous label');
                      $label.removeClass(className.active);
                  ***REMOVED***
                    else {
                      module.verbose('Adding previous label to selection');
                  ***REMOVED***
                    if(isFirstLabel && !hasMultipleActive) {
                      $activeLabel.addClass(className.active);
                  ***REMOVED***
                    else {
                      $activeLabel.prev(selector.siblingLabel)
                        .addClass(className.active)
                        .end()
                      ;
                  ***REMOVED***
                    event.preventDefault();
                ***REMOVED***
              ***REMOVED***
                else if(pressedKey == keys.rightArrow) {
                  // activate first label
                  if(isFocused && !hasActiveLabel) {
                    $label.first().addClass(className.active);
                ***REMOVED***
                  // activate next label
                  if(hasActiveLabel) {
                    if(!event.shiftKey) {
                      module.verbose('Selecting next label');
                      $label.removeClass(className.active);
                  ***REMOVED***
                    else {
                      module.verbose('Adding next label to selection');
                  ***REMOVED***
                    if(isLastLabel) {
                      if(isSearch) {
                        if(!isFocusedOnSearch) {
                          module.focusSearch();
                      ***REMOVED***
                        else {
                          $label.removeClass(className.active);
                      ***REMOVED***
                    ***REMOVED***
                      else if(hasMultipleActive) {
                        $activeLabel.next(selector.siblingLabel).addClass(className.active);
                    ***REMOVED***
                      else {
                        $activeLabel.addClass(className.active);
                    ***REMOVED***
                  ***REMOVED***
                    else {
                      $activeLabel.next(selector.siblingLabel).addClass(className.active);
                  ***REMOVED***
                    event.preventDefault();
                ***REMOVED***
              ***REMOVED***
                else if(pressedKey == keys.deleteKey || pressedKey == keys.backspace) {
                  if(hasActiveLabel) {
                    module.verbose('Removing active labels');
                    if(isLastLabel) {
                      if(isSearch && !isFocusedOnSearch) {
                        module.focusSearch();
                    ***REMOVED***
                  ***REMOVED***
                    $activeLabel.last().next(selector.siblingLabel).addClass(className.active);
                    module.remove.activeLabels($activeLabel);
                    event.preventDefault();
                ***REMOVED***
                  else if(caretAtStart && !isSelectedSearch && !hasActiveLabel && pressedKey == keys.backspace) {
                    module.verbose('Removing last label on input backspace');
                    $activeLabel = $label.last().addClass(className.active);
                    module.remove.activeLabels($activeLabel);
                ***REMOVED***
              ***REMOVED***
                else {
                  $activeLabel.removeClass(className.active);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***

          keydown: function(event) {
            var
              pressedKey    = event.which,
              isShortcutKey = module.is.inObject(pressedKey, keys)
            ;
            if(isShortcutKey) {
              var
                $currentlySelected = $item.not(selector.unselectable).filter('.' + className.selected).eq(0),
                $activeItem        = $menu.children('.' + className.active).eq(0),
                $selectedItem      = ($currentlySelected.length > 0)
                  ? $currentlySelected
                  : $activeItem,
                $visibleItems = ($selectedItem.length > 0)
                  ? $selectedItem.siblings(':not(.' + className.filtered +')').addBack()
                  : $menu.children(':not(.' + className.filtered +')'),
                $subMenu              = $selectedItem.children(selector.menu),
                $parentMenu           = $selectedItem.closest(selector.menu),
                inVisibleMenu         = ($parentMenu.hasClass(className.visible) || $parentMenu.hasClass(className.animating) || $parentMenu.parent(selector.menu).length > 0),
                hasSubMenu            = ($subMenu.length> 0),
                hasSelectedItem       = ($selectedItem.length > 0),
                selectedIsSelectable  = ($selectedItem.not(selector.unselectable).length > 0),
                delimiterPressed      = (pressedKey == keys.delimiter && settings.allowAdditions && module.is.multiple()),
                isAdditionWithoutMenu = (settings.allowAdditions && settings.hideAdditions && (pressedKey == keys.enter || delimiterPressed) && selectedIsSelectable),
                $nextItem,
                isSubMenuItem,
                newIndex
              ;
              // allow selection with menu closed
              if(isAdditionWithoutMenu) {
                module.verbose('Selecting item from keyboard shortcut', $selectedItem);
                module.event.item.click.call($selectedItem, event);
                if(module.is.searchSelection()) {
                  module.remove.searchTerm();
              ***REMOVED***
                if(module.is.multiple()){
                    event.preventDefault();
              ***REMOVED***
            ***REMOVED***

              // visible menu keyboard shortcuts
              if( module.is.visible() ) {

                // enter (select or open sub-menu)
                if(pressedKey == keys.enter || delimiterPressed) {
                  if(pressedKey == keys.enter && hasSelectedItem && hasSubMenu && !settings.allowCategorySelection) {
                    module.verbose('Pressed enter on unselectable category, opening sub menu');
                    pressedKey = keys.rightArrow;
                ***REMOVED***
                  else if(selectedIsSelectable) {
                    module.verbose('Selecting item from keyboard shortcut', $selectedItem);
                    module.event.item.click.call($selectedItem, event);
                    if(module.is.searchSelection()) {
                      module.remove.searchTerm();
                      if(module.is.multiple()) {
                          $search.focus();
                    ***REMOVED***
                  ***REMOVED***
                ***REMOVED***
                  event.preventDefault();
              ***REMOVED***

                // sub-menu actions
                if(hasSelectedItem) {

                  if(pressedKey == keys.leftArrow) {

                    isSubMenuItem = ($parentMenu[0] !== $menu[0]);

                    if(isSubMenuItem) {
                      module.verbose('Left key pressed, closing sub-menu');
                      module.animate.hide(false, $parentMenu);
                      $selectedItem
                        .removeClass(className.selected)
                      ;
                      $parentMenu
                        .closest(selector.item)
                          .addClass(className.selected)
                      ;
                      event.preventDefault();
                  ***REMOVED***
                ***REMOVED***

                  // right arrow (show sub-menu)
                  if(pressedKey == keys.rightArrow) {
                    if(hasSubMenu) {
                      module.verbose('Right key pressed, opening sub-menu');
                      module.animate.show(false, $subMenu);
                      $selectedItem
                        .removeClass(className.selected)
                      ;
                      $subMenu
                        .find(selector.item).eq(0)
                          .addClass(className.selected)
                      ;
                      event.preventDefault();
                  ***REMOVED***
                ***REMOVED***
              ***REMOVED***

                // up arrow (traverse menu up)
                if(pressedKey == keys.upArrow) {
                  $nextItem = (hasSelectedItem && inVisibleMenu)
                    ? $selectedItem.prevAll(selector.item + ':not(' + selector.unselectable + ')').eq(0)
                    : $item.eq(0)
                  ;
                  if($visibleItems.index( $nextItem ) < 0) {
                    module.verbose('Up key pressed but reached top of current menu');
                    event.preventDefault();
                    return;
                ***REMOVED***
                  else {
                    module.verbose('Up key pressed, changing active item');
                    $selectedItem
                      .removeClass(className.selected)
                    ;
                    $nextItem
                      .addClass(className.selected)
                    ;
                    module.set.scrollPosition($nextItem);
                    if(settings.selectOnKeydown && module.is.single()) {
                      module.set.selectedItem($nextItem);
                  ***REMOVED***
                ***REMOVED***
                  event.preventDefault();
              ***REMOVED***

                // down arrow (traverse menu down)
                if(pressedKey == keys.downArrow) {
                  $nextItem = (hasSelectedItem && inVisibleMenu)
                    ? $nextItem = $selectedItem.nextAll(selector.item + ':not(' + selector.unselectable + ')').eq(0)
                    : $item.eq(0)
                  ;
                  if($nextItem.length === 0) {
                    module.verbose('Down key pressed but reached bottom of current menu');
                    event.preventDefault();
                    return;
                ***REMOVED***
                  else {
                    module.verbose('Down key pressed, changing active item');
                    $item
                      .removeClass(className.selected)
                    ;
                    $nextItem
                      .addClass(className.selected)
                    ;
                    module.set.scrollPosition($nextItem);
                    if(settings.selectOnKeydown && module.is.single()) {
                      module.set.selectedItem($nextItem);
                  ***REMOVED***
                ***REMOVED***
                  event.preventDefault();
              ***REMOVED***

                // page down (show next page)
                if(pressedKey == keys.pageUp) {
                  module.scrollPage('up');
                  event.preventDefault();
              ***REMOVED***
                if(pressedKey == keys.pageDown) {
                  module.scrollPage('down');
                  event.preventDefault();
              ***REMOVED***

                // escape (close menu)
                if(pressedKey == keys.escape) {
                  module.verbose('Escape key pressed, closing dropdown');
                  module.hide();
              ***REMOVED***

            ***REMOVED***
              else {
                // delimiter key
                if(delimiterPressed) {
                  event.preventDefault();
              ***REMOVED***
                // down arrow (open menu)
                if(pressedKey == keys.downArrow && !module.is.visible()) {
                  module.verbose('Down key pressed, showing dropdown');
                  module.show();
                  event.preventDefault();
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
            else {
              if( !module.has.search() ) {
                module.set.selectedLetter( String.fromCharCode(pressedKey) );
            ***REMOVED***
          ***REMOVED***
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

        determine: {
          selectAction: function(text, value) {
            selectActionActive = true;
            module.verbose('Determining action', settings.action);
            if( $.isFunction( module.action[settings.action] ) ) {
              module.verbose('Triggering preset action', settings.action, text, value);
              module.action[ settings.action ].call(element, text, value, this);
          ***REMOVED***
            else if( $.isFunction(settings.action) ) {
              module.verbose('Triggering user action', settings.action, text, value);
              settings.action.call(element, text, value, this);
          ***REMOVED***
            else {
              module.error(error.action, settings.action);
          ***REMOVED***
            selectActionActive = false;
   ***REMOVED*****REMOVED***
          eventInModule: function(event, callback) {
            var
              $target    = $(event.target),
              inDocument = ($target.closest(document.documentElement).length > 0),
              inModule   = ($target.closest($module).length > 0)
            ;
            callback = $.isFunction(callback)
              ? callback
              : function(){***REMOVED***
            ;
            if(inDocument && !inModule) {
              module.verbose('Triggering event', callback);
              callback();
              return true;
          ***REMOVED***
            else {
              module.verbose('Event occurred in dropdown, canceling callback');
              return false;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          eventOnElement: function(event, callback) {
            var
              $target      = $(event.target),
              $label       = $target.closest(selector.siblingLabel),
              inVisibleDOM = document.body.contains(event.target),
              notOnLabel   = ($module.find($label).length === 0 || !(module.is.multiple() && settings.useLabels)),
              notInMenu    = ($target.closest($menu).length === 0)
            ;
            callback = $.isFunction(callback)
              ? callback
              : function(){***REMOVED***
            ;
            if(inVisibleDOM && notOnLabel && notInMenu) {
              module.verbose('Triggering event', callback);
              callback();
              return true;
          ***REMOVED***
            else {
              module.verbose('Event occurred in dropdown menu, canceling callback');
              return false;
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        action: {

          nothing: function() {***REMOVED***,

          activate: function(text, value, element) {
            value = (value !== undefined)
              ? value
              : text
            ;
            if( module.can.activate( $(element) ) ) {
              module.set.selected(value, $(element));
              if(!module.is.multiple()) {
                module.hideAndClear();
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***

          select: function(text, value, element) {
            value = (value !== undefined)
              ? value
              : text
            ;
            if( module.can.activate( $(element) ) ) {
              module.set.value(value, text, $(element));
              if(!module.is.multiple()) {
                module.hideAndClear();
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***

          combo: function(text, value, element) {
            value = (value !== undefined)
              ? value
              : text
            ;
            module.set.selected(value, $(element));
            module.hideAndClear();
   ***REMOVED*****REMOVED***

          hide: function(text, value, element) {
            module.set.value(value, text, $(element));
            module.hideAndClear();
        ***REMOVED***

 ***REMOVED*****REMOVED***

        get: {
          id: function() {
            return id;
   ***REMOVED*****REMOVED***
          defaultText: function() {
            return $module.data(metadata.defaultText);
   ***REMOVED*****REMOVED***
          defaultValue: function() {
            return $module.data(metadata.defaultValue);
   ***REMOVED*****REMOVED***
          placeholderText: function() {
            if(settings.placeholder != 'auto' && typeof settings.placeholder == 'string') {
              return settings.placeholder;
          ***REMOVED***
            return $module.data(metadata.placeholderText) || '';
   ***REMOVED*****REMOVED***
          text: function() {
            return $text.text();
   ***REMOVED*****REMOVED***
          query: function() {
            return $.trim($search.val());
   ***REMOVED*****REMOVED***
          searchWidth: function(value) {
            value = (value !== undefined)
              ? value
              : $search.val()
            ;
            $sizer.text(value);
            // prevent rounding issues
            return Math.ceil( $sizer.width() + 1);
   ***REMOVED*****REMOVED***
          selectionCount: function() {
            var
              values = module.get.values(),
              count
            ;
            count = ( module.is.multiple() )
              ? Array.isArray(values)
                ? values.length
                : 0
              : (module.get.value() !== '')
                ? 1
                : 0
            ;
            return count;
   ***REMOVED*****REMOVED***
          transition: function($subMenu) {
            return (settings.transition == 'auto')
              ? module.is.upward($subMenu)
                ? 'slide up'
                : 'slide down'
              : settings.transition
            ;
   ***REMOVED*****REMOVED***
          userValues: function() {
            var
              values = module.get.values()
            ;
            if(!values) {
              return false;
          ***REMOVED***
            values = Array.isArray(values)
              ? values
              : [values]
            ;
            return $.grep(values, function(value) {
              return (module.get.item(value) === false);
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          uniqueArray: function(array) {
            return $.grep(array, function (value, index) {
                return $.inArray(value, array) === index;
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          caretPosition: function(returnEndPos) {
            var
              input = $search.get(0),
              range,
              rangeLength
            ;
            if(returnEndPos && 'selectionEnd' in input){
              return input.selectionEnd;
          ***REMOVED***
            else if(!returnEndPos && 'selectionStart' in input) {
              return input.selectionStart;
          ***REMOVED***
            if (document.selection) {
              input.focus();
              range       = document.selection.createRange();
              rangeLength = range.text.length;
              if(returnEndPos) {
                return rangeLength;
            ***REMOVED***
              range.moveStart('character', -input.value.length);
              return range.text.length - rangeLength;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          value: function() {
            var
              value = ($input.length > 0)
                ? $input.val()
                : $module.data(metadata.value),
              isEmptyMultiselect = (Array.isArray(value) && value.length === 1 && value[0] === '')
            ;
            // prevents placeholder element from being selected when multiple
            return (value === undefined || isEmptyMultiselect)
              ? ''
              : value
            ;
   ***REMOVED*****REMOVED***
          values: function() {
            var
              value = module.get.value()
            ;
            if(value === '') {
              return '';
          ***REMOVED***
            return ( !module.has.selectInput() && module.is.multiple() )
              ? (typeof value == 'string') // delimited string
                ? module.escape.htmlEntities(value).split(settings.delimiter)
                : ''
              : value
            ;
   ***REMOVED*****REMOVED***
          remoteValues: function() {
            var
              values = module.get.values(),
              remoteValues = false
            ;
            if(values) {
              if(typeof values == 'string') {
                values = [values];
            ***REMOVED***
              $.each(values, function(index, value) {
                var
                  name = module.read.remoteData(value)
                ;
                module.verbose('Restoring value from session data', name, value);
                if(name) {
                  if(!remoteValues) {
                    remoteValues = {***REMOVED***;
                ***REMOVED***
                  remoteValues[value] = name;
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***
            return remoteValues;
   ***REMOVED*****REMOVED***
          choiceText: function($choice, preserveHTML) {
            preserveHTML = (preserveHTML !== undefined)
              ? preserveHTML
              : settings.preserveHTML
            ;
            if($choice) {
              if($choice.find(selector.menu).length > 0) {
                module.verbose('Retrieving text of element with sub-menu');
                $choice = $choice.clone();
                $choice.find(selector.menu).remove();
                $choice.find(selector.menuIcon).remove();
            ***REMOVED***
              return ($choice.data(metadata.text) !== undefined)
                ? $choice.data(metadata.text)
                : (preserveHTML)
                  ? $.trim($choice.html())
                  : $.trim($choice.text())
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          choiceValue: function($choice, choiceText) {
            choiceText = choiceText || module.get.choiceText($choice);
            if(!$choice) {
              return false;
          ***REMOVED***
            return ($choice.data(metadata.value) !== undefined)
              ? String( $choice.data(metadata.value) )
              : (typeof choiceText === 'string')
                ? $.trim(
                  settings.ignoreSearchCase
                  ? choiceText.toLowerCase()
                  : choiceText
                )
                : String(choiceText)
            ;
   ***REMOVED*****REMOVED***
          inputEvent: function() {
            var
              input = $search[0]
            ;
            if(input) {
              return (input.oninput !== undefined)
                ? 'input'
                : (input.onpropertychange !== undefined)
                  ? 'propertychange'
                  : 'keyup'
              ;
          ***REMOVED***
            return false;
   ***REMOVED*****REMOVED***
          selectValues: function() {
            var
              select = {***REMOVED***,
              oldGroup = []
            ;
            select.values = [];
            $module
              .find('option')
                .each(function() {
                  var
                    $option  = $(this),
                    name     = $option.html(),
                    disabled = $option.attr('disabled'),
                    value    = ( $option.attr('value') !== undefined )
                      ? $option.attr('value')
                      : name,
                    text     = ( $option.data(metadata.text) !== undefined )
                      ? $option.data(metadata.text)
                      : name,
                    group = $option.parent('optgroup')
                  ;
                  if(settings.placeholder === 'auto' && value === '') {
                    select.placeholder = name;
                ***REMOVED***
                  else {
                    if(group.length !== oldGroup.length || group[0] !== oldGroup[0]) {
                      select.values.push({
                        type: 'header',
                        divider: settings.headerDivider,
                        name: group.attr('label') || ''
                    ***REMOVED***);
                      oldGroup = group;
                  ***REMOVED***
                    select.values.push({
                      name     : name,
                      value    : value,
                      text     : text,
                      disabled : disabled
                  ***REMOVED***);
                ***REMOVED***
              ***REMOVED***)
            ;
            if(settings.placeholder && settings.placeholder !== 'auto') {
              module.debug('Setting placeholder value to', settings.placeholder);
              select.placeholder = settings.placeholder;
          ***REMOVED***
            if(settings.sortSelect) {
              if(settings.sortSelect === true) {
                select.values.sort(function(a, b) {
                  return a.name.localeCompare(b.name);
              ***REMOVED***);
            ***REMOVED*** else if(settings.sortSelect === 'natural') {
                select.values.sort(function(a, b) {
                  return (a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
              ***REMOVED***);
            ***REMOVED*** else if($.isFunction(settings.sortSelect)) {
                select.values.sort(settings.sortSelect);
            ***REMOVED***
              module.debug('Retrieved and sorted values from select', select);
          ***REMOVED***
            else {
              module.debug('Retrieved values from select', select);
          ***REMOVED***
            return select;
   ***REMOVED*****REMOVED***
          activeItem: function() {
            return $item.filter('.'  + className.active);
   ***REMOVED*****REMOVED***
          selectedItem: function() {
            var
              $selectedItem = $item.not(selector.unselectable).filter('.'  + className.selected)
            ;
            return ($selectedItem.length > 0)
              ? $selectedItem
              : $item.eq(0)
            ;
   ***REMOVED*****REMOVED***
          itemWithAdditions: function(value) {
            var
              $items       = module.get.item(value),
              $userItems   = module.create.userChoice(value),
              hasUserItems = ($userItems && $userItems.length > 0)
            ;
            if(hasUserItems) {
              $items = ($items.length > 0)
                ? $items.add($userItems)
                : $userItems
              ;
          ***REMOVED***
            return $items;
   ***REMOVED*****REMOVED***
          item: function(value, strict) {
            var
              $selectedItem = false,
              shouldSearch,
              isMultiple
            ;
            value = (value !== undefined)
              ? value
              : ( module.get.values() !== undefined)
                ? module.get.values()
                : module.get.text()
            ;
            isMultiple = (module.is.multiple() && Array.isArray(value));
            shouldSearch = (isMultiple)
              ? (value.length > 0)
              : (value !== undefined && value !== null)
            ;
            strict     = (value === '' || value === false  || value === true)
              ? true
              : strict || false
            ;
            if(shouldSearch) {
              $item
                .each(function() {
                  var
                    $choice       = $(this),
                    optionText    = module.get.choiceText($choice),
                    optionValue   = module.get.choiceValue($choice, optionText)
                  ;
                  // safe early exit
                  if(optionValue === null || optionValue === undefined) {
                    return;
                ***REMOVED***
                  if(isMultiple) {
                    if($.inArray(module.escape.htmlEntities(String(optionValue)), value.map(function(v){return String(v);***REMOVED***)) !== -1) {
                      $selectedItem = ($selectedItem)
                        ? $selectedItem.add($choice)
                        : $choice
                      ;
                  ***REMOVED***
                ***REMOVED***
                  else if(strict) {
                    module.verbose('Ambiguous dropdown value using strict type check', $choice, value);
                    if( optionValue === value) {
                      $selectedItem = $choice;
                      return true;
                  ***REMOVED***
                ***REMOVED***
                  else {
                    if(settings.ignoreCase) {
                      optionValue = optionValue.toLowerCase();
                      value = value.toLowerCase();
                  ***REMOVED***
                    if(module.escape.htmlEntities(String(optionValue)) === module.escape.htmlEntities(String(value))) {
                      module.verbose('Found select item by value', optionValue, value);
                      $selectedItem = $choice;
                      return true;
                  ***REMOVED***
                ***REMOVED***
              ***REMOVED***)
              ;
          ***REMOVED***
            return $selectedItem;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        check: {
          maxSelections: function(selectionCount) {
            if(settings.maxSelections) {
              selectionCount = (selectionCount !== undefined)
                ? selectionCount
                : module.get.selectionCount()
              ;
              if(selectionCount >= settings.maxSelections) {
                module.debug('Maximum selection count reached');
                if(settings.useLabels) {
                  $item.addClass(className.filtered);
                  module.add.message(message.maxSelections);
              ***REMOVED***
                return true;
            ***REMOVED***
              else {
                module.verbose('No longer at maximum selection count');
                module.remove.message();
                module.remove.filteredItem();
                if(module.is.searchSelection()) {
                  module.filterItems();
              ***REMOVED***
                return false;
            ***REMOVED***
          ***REMOVED***
            return true;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        restore: {
          defaults: function(preventChangeTrigger) {
            module.clear(preventChangeTrigger);
            module.restore.defaultText();
            module.restore.defaultValue();
   ***REMOVED*****REMOVED***
          defaultText: function() {
            var
              defaultText     = module.get.defaultText(),
              placeholderText = module.get.placeholderText
            ;
            if(defaultText === placeholderText) {
              module.debug('Restoring default placeholder text', defaultText);
              module.set.placeholderText(defaultText);
          ***REMOVED***
            else {
              module.debug('Restoring default text', defaultText);
              module.set.text(defaultText);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          placeholderText: function() {
            module.set.placeholderText();
   ***REMOVED*****REMOVED***
          defaultValue: function() {
            var
              defaultValue = module.get.defaultValue()
            ;
            if(defaultValue !== undefined) {
              module.debug('Restoring default value', defaultValue);
              if(defaultValue !== '') {
                module.set.value(defaultValue);
                module.set.selected();
            ***REMOVED***
              else {
                module.remove.activeItem();
                module.remove.selectedItem();
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          labels: function() {
            if(settings.allowAdditions) {
              if(!settings.useLabels) {
                module.error(error.labels);
                settings.useLabels = true;
            ***REMOVED***
              module.debug('Restoring selected values');
              module.create.userLabels();
          ***REMOVED***
            module.check.maxSelections();
   ***REMOVED*****REMOVED***
          selected: function() {
            module.restore.values();
            if(module.is.multiple()) {
              module.debug('Restoring previously selected values and labels');
              module.restore.labels();
          ***REMOVED***
            else {
              module.debug('Restoring previously selected values');
          ***REMOVED***
   ***REMOVED*****REMOVED***
          values: function() {
            // prevents callbacks from occurring on initial load
            module.set.initialLoad();
            if(settings.apiSettings && settings.saveRemoteData && module.get.remoteValues()) {
              module.restore.remoteValues();
          ***REMOVED***
            else {
              module.set.selected();
          ***REMOVED***
            var value = module.get.value();
            if(value && value !== '' && !(Array.isArray(value) && value.length === 0)) {
              $input.removeClass(className.noselection);
          ***REMOVED*** else {
              $input.addClass(className.noselection);
          ***REMOVED***
            module.remove.initialLoad();
   ***REMOVED*****REMOVED***
          remoteValues: function() {
            var
              values = module.get.remoteValues()
            ;
            module.debug('Recreating selected from session data', values);
            if(values) {
              if( module.is.single() ) {
                $.each(values, function(value, name) {
                  module.set.text(name);
              ***REMOVED***);
            ***REMOVED***
              else {
                $.each(values, function(value, name) {
                  module.add.label(value, name);
              ***REMOVED***);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        read: {
          remoteData: function(value) {
            var
              name
            ;
            if(window.Storage === undefined) {
              module.error(error.noStorage);
              return;
          ***REMOVED***
            name = sessionStorage.getItem(value);
            return (name !== undefined)
              ? name
              : false
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        save: {
          defaults: function() {
            module.save.defaultText();
            module.save.placeholderText();
            module.save.defaultValue();
   ***REMOVED*****REMOVED***
          defaultValue: function() {
            var
              value = module.get.value()
            ;
            module.verbose('Saving default value as', value);
            $module.data(metadata.defaultValue, value);
   ***REMOVED*****REMOVED***
          defaultText: function() {
            var
              text = module.get.text()
            ;
            module.verbose('Saving default text as', text);
            $module.data(metadata.defaultText, text);
   ***REMOVED*****REMOVED***
          placeholderText: function() {
            var
              text
            ;
            if(settings.placeholder !== false && $text.hasClass(className.placeholder)) {
              text = module.get.text();
              module.verbose('Saving placeholder text as', text);
              $module.data(metadata.placeholderText, text);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          remoteData: function(name, value) {
            if(window.Storage === undefined) {
              module.error(error.noStorage);
              return;
          ***REMOVED***
            module.verbose('Saving remote data to session storage', value, name);
            sessionStorage.setItem(value, name);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        clear: function(preventChangeTrigger) {
          if(module.is.multiple() && settings.useLabels) {
            module.remove.labels();
        ***REMOVED***
          else {
            module.remove.activeItem();
            module.remove.selectedItem();
            module.remove.filteredItem();
        ***REMOVED***
          module.set.placeholderText();
          module.clearValue(preventChangeTrigger);
 ***REMOVED*****REMOVED***

        clearValue: function(preventChangeTrigger) {
          module.set.value('', null, null, preventChangeTrigger);
 ***REMOVED*****REMOVED***

        scrollPage: function(direction, $selectedItem) {
          var
            $currentItem  = $selectedItem || module.get.selectedItem(),
            $menu         = $currentItem.closest(selector.menu),
            menuHeight    = $menu.outerHeight(),
            currentScroll = $menu.scrollTop(),
            itemHeight    = $item.eq(0).outerHeight(),
            itemsPerPage  = Math.floor(menuHeight / itemHeight),
            maxScroll     = $menu.prop('scrollHeight'),
            newScroll     = (direction == 'up')
              ? currentScroll - (itemHeight***REMOVED*** itemsPerPage)
              : currentScroll + (itemHeight***REMOVED*** itemsPerPage),
            $selectableItem = $item.not(selector.unselectable),
            isWithinRange,
            $nextSelectedItem,
            elementIndex
          ;
          elementIndex      = (direction == 'up')
            ? $selectableItem.index($currentItem) - itemsPerPage
            : $selectableItem.index($currentItem) + itemsPerPage
          ;
          isWithinRange = (direction == 'up')
            ? (elementIndex >= 0)
            : (elementIndex < $selectableItem.length)
          ;
          $nextSelectedItem = (isWithinRange)
            ? $selectableItem.eq(elementIndex)
            : (direction == 'up')
              ? $selectableItem.first()
              : $selectableItem.last()
          ;
          if($nextSelectedItem.length > 0) {
            module.debug('Scrolling page', direction, $nextSelectedItem);
            $currentItem
              .removeClass(className.selected)
            ;
            $nextSelectedItem
              .addClass(className.selected)
            ;
            if(settings.selectOnKeydown && module.is.single()) {
              module.set.selectedItem($nextSelectedItem);
          ***REMOVED***
            $menu
              .scrollTop(newScroll)
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          filtered: function() {
            var
              isMultiple       = module.is.multiple(),
              isSearch         = module.is.searchSelection(),
              isSearchMultiple = (isMultiple && isSearch),
              searchValue      = (isSearch)
                ? module.get.query()
                : '',
              hasSearchValue   = (typeof searchValue === 'string' && searchValue.length > 0),
              searchWidth      = module.get.searchWidth(),
              valueIsSet       = searchValue !== ''
            ;
            if(isMultiple && hasSearchValue) {
              module.verbose('Adjusting input width', searchWidth, settings.glyphWidth);
              $search.css('width', searchWidth);
          ***REMOVED***
            if(hasSearchValue || (isSearchMultiple && valueIsSet)) {
              module.verbose('Hiding placeholder text');
              $text.addClass(className.filtered);
          ***REMOVED***
            else if(!isMultiple || (isSearchMultiple && !valueIsSet)) {
              module.verbose('Showing placeholder text');
              $text.removeClass(className.filtered);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          empty: function() {
            $module.addClass(className.empty);
   ***REMOVED*****REMOVED***
          loading: function() {
            $module.addClass(className.loading);
   ***REMOVED*****REMOVED***
          placeholderText: function(text) {
            text = text || module.get.placeholderText();
            module.debug('Setting placeholder text', text);
            module.set.text(text);
            $text.addClass(className.placeholder);
   ***REMOVED*****REMOVED***
          tabbable: function() {
            if( module.is.searchSelection() ) {
              module.debug('Added tabindex to searchable dropdown');
              $search
                .val('')
                .attr('tabindex', 0)
              ;
              $menu
                .attr('tabindex', -1)
              ;
          ***REMOVED***
            else {
              module.debug('Added tabindex to dropdown');
              if( $module.attr('tabindex') === undefined) {
                $module
                  .attr('tabindex', 0)
                ;
                $menu
                  .attr('tabindex', -1)
                ;
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          initialLoad: function() {
            module.verbose('Setting initial load');
            initialLoad = true;
   ***REMOVED*****REMOVED***
          activeItem: function($item) {
            if( settings.allowAdditions && $item.filter(selector.addition).length > 0 ) {
              $item.addClass(className.filtered);
          ***REMOVED***
            else {
              $item.addClass(className.active);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          partialSearch: function(text) {
            var
              length = module.get.query().length
            ;
            $search.val( text.substr(0, length));
   ***REMOVED*****REMOVED***
          scrollPosition: function($item, forceScroll) {
            var
              edgeTolerance = 5,
              $menu,
              hasActive,
              offset,
              itemHeight,
              itemOffset,
              menuOffset,
              menuScroll,
              menuHeight,
              abovePage,
              belowPage
            ;

            $item       = $item || module.get.selectedItem();
            $menu       = $item.closest(selector.menu);
            hasActive   = ($item && $item.length > 0);
            forceScroll = (forceScroll !== undefined)
              ? forceScroll
              : false
            ;
            if(module.get.activeItem().length === 0){
              forceScroll = false;
          ***REMOVED***
            if($item && $menu.length > 0 && hasActive) {
              itemOffset = $item.position().top;

              $menu.addClass(className.loading);
              menuScroll = $menu.scrollTop();
              menuOffset = $menu.offset().top;
              itemOffset = $item.offset().top;
              offset     = menuScroll - menuOffset + itemOffset;
              if(!forceScroll) {
                menuHeight = $menu.height();
                belowPage  = menuScroll + menuHeight < (offset + edgeTolerance);
                abovePage  = ((offset - edgeTolerance) < menuScroll);
            ***REMOVED***
              module.debug('Scrolling to active item', offset);
              if(forceScroll || abovePage || belowPage) {
                $menu.scrollTop(offset);
            ***REMOVED***
              $menu.removeClass(className.loading);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          text: function(text) {
            if(settings.action === 'combo') {
              module.debug('Changing combo button text', text, $combo);
              if(settings.preserveHTML) {
                $combo.html(text);
            ***REMOVED***
              else {
                $combo.text(text);
            ***REMOVED***
          ***REMOVED***
            else if(settings.action === 'activate') {
              if(text !== module.get.placeholderText()) {
                $text.removeClass(className.placeholder);
            ***REMOVED***
              module.debug('Changing text', text, $text);
              $text
                .removeClass(className.filtered)
              ;
              if(settings.preserveHTML) {
                $text.html(text);
            ***REMOVED***
              else {
                $text.text(text);
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          selectedItem: function($item) {
            var
              value      = module.get.choiceValue($item),
              searchText = module.get.choiceText($item, false),
              text       = module.get.choiceText($item, true)
            ;
            module.debug('Setting user selection to item', $item);
            module.remove.activeItem();
            module.set.partialSearch(searchText);
            module.set.activeItem($item);
            module.set.selected(value, $item);
            module.set.text(text);
   ***REMOVED*****REMOVED***
          selectedLetter: function(letter) {
            var
              $selectedItem         = $item.filter('.' + className.selected),
              alreadySelectedLetter = $selectedItem.length > 0 && module.has.firstLetter($selectedItem, letter),
              $nextValue            = false,
              $nextItem
            ;
            // check next of same letter
            if(alreadySelectedLetter) {
              $nextItem = $selectedItem.nextAll($item).eq(0);
              if( module.has.firstLetter($nextItem, letter) ) {
                $nextValue  = $nextItem;
            ***REMOVED***
          ***REMOVED***
            // check all values
            if(!$nextValue) {
              $item
                .each(function(){
                  if(module.has.firstLetter($(this), letter)) {
                    $nextValue = $(this);
                    return false;
                ***REMOVED***
              ***REMOVED***)
              ;
          ***REMOVED***
            // set next value
            if($nextValue) {
              module.verbose('Scrolling to next value with letter', letter);
              module.set.scrollPosition($nextValue);
              $selectedItem.removeClass(className.selected);
              $nextValue.addClass(className.selected);
              if(settings.selectOnKeydown && module.is.single()) {
                module.set.selectedItem($nextValue);
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          direction: function($menu) {
            if(settings.direction == 'auto') {
              // reset position, remove upward if it's base menu
              if (!$menu) {
                module.remove.upward();
            ***REMOVED*** else if (module.is.upward($menu)) {
                //we need make sure when make assertion openDownward for $menu, $menu does not have upward class
                module.remove.upward($menu);
            ***REMOVED***

              if(module.can.openDownward($menu)) {
                module.remove.upward($menu);
            ***REMOVED***
              else {
                module.set.upward($menu);
            ***REMOVED***
              if(!module.is.leftward($menu) && !module.can.openRightward($menu)) {
                module.set.leftward($menu);
            ***REMOVED***
          ***REMOVED***
            else if(settings.direction == 'upward') {
              module.set.upward($menu);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          upward: function($currentMenu) {
            var $element = $currentMenu || $module;
            $element.addClass(className.upward);
   ***REMOVED*****REMOVED***
          leftward: function($currentMenu) {
            var $element = $currentMenu || $menu;
            $element.addClass(className.leftward);
   ***REMOVED*****REMOVED***
          value: function(value, text, $selected, preventChangeTrigger) {
            if(value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0)) {
              $input.removeClass(className.noselection);
          ***REMOVED*** else {
              $input.addClass(className.noselection);
          ***REMOVED***
            var
              escapedValue = module.escape.value(value),
              hasInput     = ($input.length > 0),
              currentValue = module.get.values(),
              stringValue  = (value !== undefined)
                ? String(value)
                : value,
              newValue
            ;
            if(hasInput) {
              if(!settings.allowReselection && stringValue == currentValue) {
                module.verbose('Skipping value update already same value', value, currentValue);
                if(!module.is.initialLoad()) {
                  return;
              ***REMOVED***
            ***REMOVED***

              if( module.is.single() && module.has.selectInput() && module.can.extendSelect() ) {
                module.debug('Adding user option', value);
                module.add.optionValue(value);
            ***REMOVED***
              module.debug('Updating input value', escapedValue, currentValue);
              internalChange = true;
              $input
                .val(escapedValue)
              ;
              if(settings.fireOnInit === false && module.is.initialLoad()) {
                module.debug('Input native change event ignored on initial load');
            ***REMOVED***
              else if(preventChangeTrigger !== true) {
                module.trigger.change();
            ***REMOVED***
              internalChange = false;
          ***REMOVED***
            else {
              module.verbose('Storing value in metadata', escapedValue, $input);
              if(escapedValue !== currentValue) {
                $module.data(metadata.value, stringValue);
            ***REMOVED***
          ***REMOVED***
            if(settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onChange);
          ***REMOVED***
            else if(preventChangeTrigger !== true) {
              settings.onChange.call(element, value, text, $selected);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          active: function() {
            $module
              .addClass(className.active)
            ;
   ***REMOVED*****REMOVED***
          multiple: function() {
            $module.addClass(className.multiple);
   ***REMOVED*****REMOVED***
          visible: function() {
            $module.addClass(className.visible);
   ***REMOVED*****REMOVED***
          exactly: function(value, $selectedItem) {
            module.debug('Setting selected to exact values');
            module.clear();
            module.set.selected(value, $selectedItem);
   ***REMOVED*****REMOVED***
          selected: function(value, $selectedItem) {
            var
              isMultiple = module.is.multiple()
            ;
            $selectedItem = (settings.allowAdditions)
              ? $selectedItem || module.get.itemWithAdditions(value)
              : $selectedItem || module.get.item(value)
            ;
            if(!$selectedItem) {
              return;
          ***REMOVED***
            module.debug('Setting selected menu item to', $selectedItem);
            if(module.is.multiple()) {
              module.remove.searchWidth();
          ***REMOVED***
            if(module.is.single()) {
              module.remove.activeItem();
              module.remove.selectedItem();
          ***REMOVED***
            else if(settings.useLabels) {
              module.remove.selectedItem();
          ***REMOVED***
            // select each item
            $selectedItem
              .each(function() {
                var
                  $selected      = $(this),
                  selectedText   = module.get.choiceText($selected),
                  selectedValue  = module.get.choiceValue($selected, selectedText),

                  isFiltered     = $selected.hasClass(className.filtered),
                  isActive       = $selected.hasClass(className.active),
                  isUserValue    = $selected.hasClass(className.addition),
                  shouldAnimate  = (isMultiple && $selectedItem.length == 1)
                ;
                if(isMultiple) {
                  if(!isActive || isUserValue) {
                    if(settings.apiSettings && settings.saveRemoteData) {
                      module.save.remoteData(selectedText, selectedValue);
                  ***REMOVED***
                    if(settings.useLabels) {
                      module.add.label(selectedValue, selectedText, shouldAnimate);
                      module.add.value(selectedValue, selectedText, $selected);
                      module.set.activeItem($selected);
                      module.filterActive();
                      module.select.nextAvailable($selectedItem);
                  ***REMOVED***
                    else {
                      module.add.value(selectedValue, selectedText, $selected);
                      module.set.text(module.add.variables(message.count));
                      module.set.activeItem($selected);
                  ***REMOVED***
                ***REMOVED***
                  else if(!isFiltered && (settings.useLabels || selectActionActive)) {
                    module.debug('Selected active value, removing label');
                    module.remove.selected(selectedValue);
                ***REMOVED***
              ***REMOVED***
                else {
                  if(settings.apiSettings && settings.saveRemoteData) {
                    module.save.remoteData(selectedText, selectedValue);
                ***REMOVED***
                  module.set.text(selectedText);
                  module.set.value(selectedValue, selectedText, $selected);
                  $selected
                    .addClass(className.active)
                    .addClass(className.selected)
                  ;
              ***REMOVED***
            ***REMOVED***)
            ;
            module.remove.searchTerm();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        add: {
          label: function(value, text, shouldAnimate) {
            var
              $next  = module.is.searchSelection()
                ? $search
                : $text,
              escapedValue = module.escape.value(value),
              $label
            ;
            if(settings.ignoreCase) {
              escapedValue = escapedValue.toLowerCase();
          ***REMOVED***
            $label =  $('<a />')
              .addClass(className.label)
              .attr('data-' + metadata.value, escapedValue)
              .html(templates.label(escapedValue, text, settings.preserveHTML, settings.className))
            ;
            $label = settings.onLabelCreate.call($label, escapedValue, text);

            if(module.has.label(value)) {
              module.debug('User selection already exists, skipping', escapedValue);
              return;
          ***REMOVED***
            if(settings.label.variation) {
              $label.addClass(settings.label.variation);
          ***REMOVED***
            if(shouldAnimate === true) {
              module.debug('Animating in label', $label);
              $label
                .addClass(className.hidden)
                .insertBefore($next)
                .transition({
                    animation  : settings.label.transition,
                    debug      : settings.debug,
                    verbose    : settings.verbose,
                    duration   : settings.label.duration
              ***REMOVED***)
              ;
          ***REMOVED***
            else {
              module.debug('Adding selection label', $label);
              $label
                .insertBefore($next)
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          message: function(message) {
            var
              $message = $menu.children(selector.message),
              html     = settings.templates.message(module.add.variables(message))
            ;
            if($message.length > 0) {
              $message
                .html(html)
              ;
          ***REMOVED***
            else {
              $message = $('<div/>')
                .html(html)
                .addClass(className.message)
                .appendTo($menu)
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          optionValue: function(value) {
            var
              escapedValue = module.escape.value(value),
              $option      = $input.find('option[value="' + module.escape.string(escapedValue) + '"]'),
              hasOption    = ($option.length > 0)
            ;
            if(hasOption) {
              return;
          ***REMOVED***
            // temporarily disconnect observer
            module.disconnect.selectObserver();
            if( module.is.single() ) {
              module.verbose('Removing previous user addition');
              $input.find('option.' + className.addition).remove();
          ***REMOVED***
            $('<option/>')
              .prop('value', escapedValue)
              .addClass(className.addition)
              .html(value)
              .appendTo($input)
            ;
            module.verbose('Adding user addition as an <option>', value);
            module.observe.select();
   ***REMOVED*****REMOVED***
          userSuggestion: function(value) {
            var
              $addition         = $menu.children(selector.addition),
              $existingItem     = module.get.item(value),
              alreadyHasValue   = $existingItem && $existingItem.not(selector.addition).length,
              hasUserSuggestion = $addition.length > 0,
              html
            ;
            if(settings.useLabels && module.has.maxSelections()) {
              return;
          ***REMOVED***
            if(value === '' || alreadyHasValue) {
              $addition.remove();
              return;
          ***REMOVED***
            if(hasUserSuggestion) {
              $addition
                .data(metadata.value, value)
                .data(metadata.text, value)
                .attr('data-' + metadata.value, value)
                .attr('data-' + metadata.text, value)
                .removeClass(className.filtered)
              ;
              if(!settings.hideAdditions) {
                html = settings.templates.addition( module.add.variables(message.addResult, value) );
                $addition
                  .html(html)
                ;
            ***REMOVED***
              module.verbose('Replacing user suggestion with new value', $addition);
          ***REMOVED***
            else {
              $addition = module.create.userChoice(value);
              $addition
                .prependTo($menu)
              ;
              module.verbose('Adding item choice to menu corresponding with user choice addition', $addition);
          ***REMOVED***
            if(!settings.hideAdditions || module.is.allFiltered()) {
              $addition
                .addClass(className.selected)
                .siblings()
                .removeClass(className.selected)
              ;
          ***REMOVED***
            module.refreshItems();
   ***REMOVED*****REMOVED***
          variables: function(message, term) {
            var
              hasCount    = (message.search('{count***REMOVED***') !== -1),
              hasMaxCount = (message.search('{maxCount***REMOVED***') !== -1),
              hasTerm     = (message.search('{term***REMOVED***') !== -1),
              count,
              query
            ;
            module.verbose('Adding templated variables to message', message);
            if(hasCount) {
              count  = module.get.selectionCount();
              message = message.replace('{count***REMOVED***', count);
          ***REMOVED***
            if(hasMaxCount) {
              count  = module.get.selectionCount();
              message = message.replace('{maxCount***REMOVED***', settings.maxSelections);
          ***REMOVED***
            if(hasTerm) {
              query   = term || module.get.query();
              message = message.replace('{term***REMOVED***', query);
          ***REMOVED***
            return message;
   ***REMOVED*****REMOVED***
          value: function(addedValue, addedText, $selectedItem) {
            var
              currentValue = module.get.values(),
              newValue
            ;
            if(module.has.value(addedValue)) {
              module.debug('Value already selected');
              return;
          ***REMOVED***
            if(addedValue === '') {
              module.debug('Cannot select blank values from multiselect');
              return;
          ***REMOVED***
            // extend current array
            if(Array.isArray(currentValue)) {
              newValue = currentValue.concat([addedValue]);
              newValue = module.get.uniqueArray(newValue);
          ***REMOVED***
            else {
              newValue = [addedValue];
          ***REMOVED***
            // add values
            if( module.has.selectInput() ) {
              if(module.can.extendSelect()) {
                module.debug('Adding value to select', addedValue, newValue, $input);
                module.add.optionValue(addedValue);
            ***REMOVED***
          ***REMOVED***
            else {
              newValue = newValue.join(settings.delimiter);
              module.debug('Setting hidden input to delimited value', newValue, $input);
          ***REMOVED***

            if(settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('Skipping onadd callback on initial load', settings.onAdd);
          ***REMOVED***
            else {
              settings.onAdd.call(element, addedValue, addedText, $selectedItem);
          ***REMOVED***
            module.set.value(newValue, addedText, $selectedItem);
            module.check.maxSelections();
   ***REMOVED*****REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          active: function() {
            $module.removeClass(className.active);
   ***REMOVED*****REMOVED***
          activeLabel: function() {
            $module.find(selector.label).removeClass(className.active);
   ***REMOVED*****REMOVED***
          empty: function() {
            $module.removeClass(className.empty);
   ***REMOVED*****REMOVED***
          loading: function() {
            $module.removeClass(className.loading);
   ***REMOVED*****REMOVED***
          initialLoad: function() {
            initialLoad = false;
   ***REMOVED*****REMOVED***
          upward: function($currentMenu) {
            var $element = $currentMenu || $module;
            $element.removeClass(className.upward);
   ***REMOVED*****REMOVED***
          leftward: function($currentMenu) {
            var $element = $currentMenu || $menu;
            $element.removeClass(className.leftward);
   ***REMOVED*****REMOVED***
          visible: function() {
            $module.removeClass(className.visible);
   ***REMOVED*****REMOVED***
          activeItem: function() {
            $item.removeClass(className.active);
   ***REMOVED*****REMOVED***
          filteredItem: function() {
            if(settings.useLabels && module.has.maxSelections() ) {
              return;
          ***REMOVED***
            if(settings.useLabels && module.is.multiple()) {
              $item.not('.' + className.active).removeClass(className.filtered);
          ***REMOVED***
            else {
              $item.removeClass(className.filtered);
          ***REMOVED***
            if(settings.hideDividers) {
              $divider.removeClass(className.hidden);
          ***REMOVED***
            module.remove.empty();
   ***REMOVED*****REMOVED***
          optionValue: function(value) {
            var
              escapedValue = module.escape.value(value),
              $option      = $input.find('option[value="' + module.escape.string(escapedValue) + '"]'),
              hasOption    = ($option.length > 0)
            ;
            if(!hasOption || !$option.hasClass(className.addition)) {
              return;
          ***REMOVED***
            // temporarily disconnect observer
            if(selectObserver) {
              selectObserver.disconnect();
              module.verbose('Temporarily disconnecting mutation observer');
          ***REMOVED***
            $option.remove();
            module.verbose('Removing user addition as an <option>', escapedValue);
            if(selectObserver) {
              selectObserver.observe($input[0], {
                childList : true,
                subtree   : true
            ***REMOVED***);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          message: function() {
            $menu.children(selector.message).remove();
   ***REMOVED*****REMOVED***
          searchWidth: function() {
            $search.css('width', '');
   ***REMOVED*****REMOVED***
          searchTerm: function() {
            module.verbose('Cleared search term');
            $search.val('');
            module.set.filtered();
   ***REMOVED*****REMOVED***
          userAddition: function() {
            $item.filter(selector.addition).remove();
   ***REMOVED*****REMOVED***
          selected: function(value, $selectedItem) {
            $selectedItem = (settings.allowAdditions)
              ? $selectedItem || module.get.itemWithAdditions(value)
              : $selectedItem || module.get.item(value)
            ;

            if(!$selectedItem) {
              return false;
          ***REMOVED***

            $selectedItem
              .each(function() {
                var
                  $selected     = $(this),
                  selectedText  = module.get.choiceText($selected),
                  selectedValue = module.get.choiceValue($selected, selectedText)
                ;
                if(module.is.multiple()) {
                  if(settings.useLabels) {
                    module.remove.value(selectedValue, selectedText, $selected);
                    module.remove.label(selectedValue);
                ***REMOVED***
                  else {
                    module.remove.value(selectedValue, selectedText, $selected);
                    if(module.get.selectionCount() === 0) {
                      module.set.placeholderText();
                  ***REMOVED***
                    else {
                      module.set.text(module.add.variables(message.count));
                  ***REMOVED***
                ***REMOVED***
              ***REMOVED***
                else {
                  module.remove.value(selectedValue, selectedText, $selected);
              ***REMOVED***
                $selected
                  .removeClass(className.filtered)
                  .removeClass(className.active)
                ;
                if(settings.useLabels) {
                  $selected.removeClass(className.selected);
              ***REMOVED***
            ***REMOVED***)
            ;
   ***REMOVED*****REMOVED***
          selectedItem: function() {
            $item.removeClass(className.selected);
   ***REMOVED*****REMOVED***
          value: function(removedValue, removedText, $removedItem) {
            var
              values = module.get.values(),
              newValue
            ;
            removedValue = module.escape.htmlEntities(removedValue);
            if( module.has.selectInput() ) {
              module.verbose('Input is <select> removing selected option', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              module.remove.optionValue(removedValue);
          ***REMOVED***
            else {
              module.verbose('Removing from delimited values', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              newValue = newValue.join(settings.delimiter);
          ***REMOVED***
            if(settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onRemove);
          ***REMOVED***
            else {
              settings.onRemove.call(element, removedValue, removedText, $removedItem);
          ***REMOVED***
            module.set.value(newValue, removedText, $removedItem);
            module.check.maxSelections();
   ***REMOVED*****REMOVED***
          arrayValue: function(removedValue, values) {
            if( !Array.isArray(values) ) {
              values = [values];
          ***REMOVED***
            values = $.grep(values, function(value){
              return (removedValue != value);
          ***REMOVED***);
            module.verbose('Removed value from delimited string', removedValue, values);
            return values;
   ***REMOVED*****REMOVED***
          label: function(value, shouldAnimate) {
            var
              $labels       = $module.find(selector.label),
              $removedLabel = $labels.filter('[data-' + metadata.value + '="' + module.escape.string(settings.ignoreCase ? value.toLowerCase() : value) +'"]')
            ;
            module.verbose('Removing label', $removedLabel);
            $removedLabel.remove();
   ***REMOVED*****REMOVED***
          activeLabels: function($activeLabels) {
            $activeLabels = $activeLabels || $module.find(selector.label).filter('.' + className.active);
            module.verbose('Removing active label selections', $activeLabels);
            module.remove.labels($activeLabels);
   ***REMOVED*****REMOVED***
          labels: function($labels) {
            $labels = $labels || $module.find(selector.label);
            module.verbose('Removing labels', $labels);
            $labels
              .each(function(){
                var
                  $label      = $(this),
                  value       = $label.data(metadata.value),
                  stringValue = (value !== undefined)
                    ? String(value)
                    : value,
                  isUserValue = module.is.userValue(stringValue)
                ;
                if(settings.onLabelRemove.call($label, value) === false) {
                  module.debug('Label remove callback cancelled removal');
                  return;
              ***REMOVED***
                module.remove.message();
                if(isUserValue) {
                  module.remove.value(stringValue);
                  module.remove.label(stringValue);
              ***REMOVED***
                else {
                  // selected will also remove label
                  module.remove.selected(stringValue);
              ***REMOVED***
            ***REMOVED***)
            ;
   ***REMOVED*****REMOVED***
          tabbable: function() {
            if( module.is.searchSelection() ) {
              module.debug('Searchable dropdown initialized');
              $search
                .removeAttr('tabindex')
              ;
              $menu
                .removeAttr('tabindex')
              ;
          ***REMOVED***
            else {
              module.debug('Simple selection dropdown initialized');
              $module
                .removeAttr('tabindex')
              ;
              $menu
                .removeAttr('tabindex')
              ;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          diacritics: function(text) {
            return settings.ignoreDiacritics ?  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : text;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        has: {
          menuSearch: function() {
            return (module.has.search() && $search.closest($menu).length > 0);
   ***REMOVED*****REMOVED***
          clearItem: function() {
            return ($clear.length > 0);
   ***REMOVED*****REMOVED***
          search: function() {
            return ($search.length > 0);
   ***REMOVED*****REMOVED***
          sizer: function() {
            return ($sizer.length > 0);
   ***REMOVED*****REMOVED***
          selectInput: function() {
            return ( $input.is('select') );
   ***REMOVED*****REMOVED***
          minCharacters: function(searchTerm) {
            if(settings.minCharacters && !iconClicked) {
              searchTerm = (searchTerm !== undefined)
                ? String(searchTerm)
                : String(module.get.query())
              ;
              return (searchTerm.length >= settings.minCharacters);
          ***REMOVED***
            iconClicked=false;
            return true;
   ***REMOVED*****REMOVED***
          firstLetter: function($item, letter) {
            var
              text,
              firstLetter
            ;
            if(!$item || $item.length === 0 || typeof letter !== 'string') {
              return false;
          ***REMOVED***
            text        = module.get.choiceText($item, false);
            letter      = letter.toLowerCase();
            firstLetter = String(text).charAt(0).toLowerCase();
            return (letter == firstLetter);
   ***REMOVED*****REMOVED***
          input: function() {
            return ($input.length > 0);
   ***REMOVED*****REMOVED***
          items: function() {
            return ($item.length > 0);
   ***REMOVED*****REMOVED***
          menu: function() {
            return ($menu.length > 0);
   ***REMOVED*****REMOVED***
          message: function() {
            return ($menu.children(selector.message).length !== 0);
   ***REMOVED*****REMOVED***
          label: function(value) {
            var
              escapedValue = module.escape.value(value),
              $labels      = $module.find(selector.label)
            ;
            if(settings.ignoreCase) {
              escapedValue = escapedValue.toLowerCase();
          ***REMOVED***
            return ($labels.filter('[data-' + metadata.value + '="' + module.escape.string(escapedValue) +'"]').length > 0);
   ***REMOVED*****REMOVED***
          maxSelections: function() {
            return (settings.maxSelections && module.get.selectionCount() >= settings.maxSelections);
   ***REMOVED*****REMOVED***
          allResultsFiltered: function() {
            var
              $normalResults = $item.not(selector.addition)
            ;
            return ($normalResults.filter(selector.unselectable).length === $normalResults.length);
   ***REMOVED*****REMOVED***
          userSuggestion: function() {
            return ($menu.children(selector.addition).length > 0);
   ***REMOVED*****REMOVED***
          query: function() {
            return (module.get.query() !== '');
   ***REMOVED*****REMOVED***
          value: function(value) {
            return (settings.ignoreCase)
              ? module.has.valueIgnoringCase(value)
              : module.has.valueMatchingCase(value)
            ;
   ***REMOVED*****REMOVED***
          valueMatchingCase: function(value) {
            var
              values   = module.get.values(),
              hasValue = Array.isArray(values)
               ? values && ($.inArray(value, values) !== -1)
               : (values == value)
            ;
            return (hasValue)
              ? true
              : false
            ;
   ***REMOVED*****REMOVED***
          valueIgnoringCase: function(value) {
            var
              values   = module.get.values(),
              hasValue = false
            ;
            if(!Array.isArray(values)) {
              values = [values];
          ***REMOVED***
            $.each(values, function(index, existingValue) {
              if(String(value).toLowerCase() == String(existingValue).toLowerCase()) {
                hasValue = true;
                return false;
            ***REMOVED***
          ***REMOVED***);
            return hasValue;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          active: function() {
            return $module.hasClass(className.active);
   ***REMOVED*****REMOVED***
          animatingInward: function() {
            return $menu.transition('is inward');
   ***REMOVED*****REMOVED***
          animatingOutward: function() {
            return $menu.transition('is outward');
   ***REMOVED*****REMOVED***
          bubbledLabelClick: function(event) {
            return $(event.target).is('select, input') && $module.closest('label').length > 0;
   ***REMOVED*****REMOVED***
          bubbledIconClick: function(event) {
            return $(event.target).closest($icon).length > 0;
   ***REMOVED*****REMOVED***
          alreadySetup: function() {
            return ($module.is('select') && $module.parent(selector.dropdown).data(moduleNamespace) !== undefined && $module.prev().length === 0);
   ***REMOVED*****REMOVED***
          animating: function($subMenu) {
            return ($subMenu)
              ? $subMenu.transition && $subMenu.transition('is animating')
              : $menu.transition    && $menu.transition('is animating')
            ;
   ***REMOVED*****REMOVED***
          leftward: function($subMenu) {
            var $selectedMenu = $subMenu || $menu;
            return $selectedMenu.hasClass(className.leftward);
   ***REMOVED*****REMOVED***
          clearable: function() {
            return ($module.hasClass(className.clearable) || settings.clearable);
   ***REMOVED*****REMOVED***
          disabled: function() {
            return $module.hasClass(className.disabled);
   ***REMOVED*****REMOVED***
          focused: function() {
            return (document.activeElement === $module[0]);
   ***REMOVED*****REMOVED***
          focusedOnSearch: function() {
            return (document.activeElement === $search[0]);
   ***REMOVED*****REMOVED***
          allFiltered: function() {
            return( (module.is.multiple() || module.has.search()) && !(settings.hideAdditions == false && module.has.userSuggestion()) && !module.has.message() && module.has.allResultsFiltered() );
   ***REMOVED*****REMOVED***
          hidden: function($subMenu) {
            return !module.is.visible($subMenu);
   ***REMOVED*****REMOVED***
          initialLoad: function() {
            return initialLoad;
   ***REMOVED*****REMOVED***
          inObject: function(needle, object) {
            var
              found = false
            ;
            $.each(object, function(index, property) {
              if(property == needle) {
                found = true;
                return true;
            ***REMOVED***
          ***REMOVED***);
            return found;
   ***REMOVED*****REMOVED***
          multiple: function() {
            return $module.hasClass(className.multiple);
   ***REMOVED*****REMOVED***
          remote: function() {
            return settings.apiSettings && module.can.useAPI();
   ***REMOVED*****REMOVED***
          single: function() {
            return !module.is.multiple();
   ***REMOVED*****REMOVED***
          selectMutation: function(mutations) {
            var
              selectChanged = false
            ;
            $.each(mutations, function(index, mutation) {
              if($(mutation.target).is('select') || $(mutation.addedNodes).is('select')) {
                selectChanged = true;
                return false;
            ***REMOVED***
          ***REMOVED***);
            return selectChanged;
   ***REMOVED*****REMOVED***
          search: function() {
            return $module.hasClass(className.search);
   ***REMOVED*****REMOVED***
          searchSelection: function() {
            return ( module.has.search() && $search.parent(selector.dropdown).length === 1 );
   ***REMOVED*****REMOVED***
          selection: function() {
            return $module.hasClass(className.selection);
   ***REMOVED*****REMOVED***
          userValue: function(value) {
            return ($.inArray(value, module.get.userValues()) !== -1);
   ***REMOVED*****REMOVED***
          upward: function($menu) {
            var $element = $menu || $module;
            return $element.hasClass(className.upward);
   ***REMOVED*****REMOVED***
          visible: function($subMenu) {
            return ($subMenu)
              ? $subMenu.hasClass(className.visible)
              : $menu.hasClass(className.visible)
            ;
   ***REMOVED*****REMOVED***
          verticallyScrollableContext: function() {
            var
              overflowY = ($context.get(0) !== window)
                ? $context.css('overflow-y')
                : false
            ;
            return (overflowY == 'auto' || overflowY == 'scroll');
   ***REMOVED*****REMOVED***
          horizontallyScrollableContext: function() {
            var
              overflowX = ($context.get(0) !== window)
                ? $context.css('overflow-X')
                : false
            ;
            return (overflowX == 'auto' || overflowX == 'scroll');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        can: {
          activate: function($item) {
            if(settings.useLabels) {
              return true;
          ***REMOVED***
            if(!module.has.maxSelections()) {
              return true;
          ***REMOVED***
            if(module.has.maxSelections() && $item.hasClass(className.active)) {
              return true;
          ***REMOVED***
            return false;
   ***REMOVED*****REMOVED***
          openDownward: function($subMenu) {
            var
              $currentMenu    = $subMenu || $menu,
              canOpenDownward = true,
              onScreen        = {***REMOVED***,
              calculations
            ;
            $currentMenu
              .addClass(className.loading)
            ;
            calculations = {
              context: {
                offset    : ($context.get(0) === window)
                  ? { top: 0, left: 0***REMOVED***
                  : $context.offset(),
                scrollTop : $context.scrollTop(),
                height    : $context.outerHeight()
  ***REMOVED*****REMOVED*****REMOVED***
              menu : {
                offset: $currentMenu.offset(),
                height: $currentMenu.outerHeight()
            ***REMOVED***
          ***REMOVED***;
            if(module.is.verticallyScrollableContext()) {
              calculations.menu.offset.top += calculations.context.scrollTop;
          ***REMOVED***
            onScreen = {
              above : (calculations.context.scrollTop) <= calculations.menu.offset.top - calculations.context.offset.top - calculations.menu.height,
              below : (calculations.context.scrollTop + calculations.context.height) >= calculations.menu.offset.top - calculations.context.offset.top + calculations.menu.height
          ***REMOVED***;
            if(onScreen.below) {
              module.verbose('Dropdown can fit in context downward', onScreen);
              canOpenDownward = true;
          ***REMOVED***
            else if(!onScreen.below && !onScreen.above) {
              module.verbose('Dropdown cannot fit in either direction, favoring downward', onScreen);
              canOpenDownward = true;
          ***REMOVED***
            else {
              module.verbose('Dropdown cannot fit below, opening upward', onScreen);
              canOpenDownward = false;
          ***REMOVED***
            $currentMenu.removeClass(className.loading);
            return canOpenDownward;
   ***REMOVED*****REMOVED***
          openRightward: function($subMenu) {
            var
              $currentMenu     = $subMenu || $menu,
              canOpenRightward = true,
              isOffscreenRight = false,
              calculations
            ;
            $currentMenu
              .addClass(className.loading)
            ;
            calculations = {
              context: {
                offset     : ($context.get(0) === window)
                  ? { top: 0, left: 0***REMOVED***
                  : $context.offset(),
                scrollLeft : $context.scrollLeft(),
                width      : $context.outerWidth()
  ***REMOVED*****REMOVED*****REMOVED***
              menu: {
                offset : $currentMenu.offset(),
                width  : $currentMenu.outerWidth()
            ***REMOVED***
          ***REMOVED***;
            if(module.is.horizontallyScrollableContext()) {
              calculations.menu.offset.left += calculations.context.scrollLeft;
          ***REMOVED***
            isOffscreenRight = (calculations.menu.offset.left - calculations.context.offset.left + calculations.menu.width >= calculations.context.scrollLeft + calculations.context.width);
            if(isOffscreenRight) {
              module.verbose('Dropdown cannot fit in context rightward', isOffscreenRight);
              canOpenRightward = false;
          ***REMOVED***
            $currentMenu.removeClass(className.loading);
            return canOpenRightward;
   ***REMOVED*****REMOVED***
          click: function() {
            return (hasTouch || settings.on == 'click');
   ***REMOVED*****REMOVED***
          extendSelect: function() {
            return settings.allowAdditions || settings.apiSettings;
   ***REMOVED*****REMOVED***
          show: function() {
            return !module.is.disabled() && (module.has.items() || module.has.message());
   ***REMOVED*****REMOVED***
          useAPI: function() {
            return $.fn.api !== undefined;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        animate: {
          show: function(callback, $subMenu) {
            var
              $currentMenu = $subMenu || $menu,
              start = ($subMenu)
                ? function() {***REMOVED***
                : function() {
                  module.hideSubMenus();
                  module.hideOthers();
                  module.set.active();
    ***REMOVED*****REMOVED*****REMOVED***
              transition
            ;
            callback = $.isFunction(callback)
              ? callback
              : function(){***REMOVED***
            ;
            module.verbose('Doing menu show animation', $currentMenu);
            module.set.direction($subMenu);
            transition = module.get.transition($subMenu);
            if( module.is.selection() ) {
              module.set.scrollPosition(module.get.selectedItem(), true);
          ***REMOVED***
            if( module.is.hidden($currentMenu) || module.is.animating($currentMenu) ) {
              if(transition == 'none') {
                start();
                $currentMenu.transition('show');
                callback.call(element);
            ***REMOVED***
              else if($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu
                  .transition({
                    animation  : transition + ' in',
                    debug      : settings.debug,
                    verbose    : settings.verbose,
                    duration   : settings.duration,
                    queue      : true,
                    onStart    : start,
                    onComplete : function() {
                      callback.call(element);
                  ***REMOVED***
                ***REMOVED***)
                ;
            ***REMOVED***
              else {
                module.error(error.noTransition, transition);
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          hide: function(callback, $subMenu) {
            var
              $currentMenu = $subMenu || $menu,
              start = ($subMenu)
                ? function() {***REMOVED***
                : function() {
                  if( module.can.click() ) {
                    module.unbind.intent();
                ***REMOVED***
                  module.remove.active();
    ***REMOVED*****REMOVED*****REMOVED***
              transition = module.get.transition($subMenu)
            ;
            callback = $.isFunction(callback)
              ? callback
              : function(){***REMOVED***
            ;
            if( module.is.visible($currentMenu) || module.is.animating($currentMenu) ) {
              module.verbose('Doing menu hide animation', $currentMenu);

              if(transition == 'none') {
                start();
                $currentMenu.transition('hide');
                callback.call(element);
            ***REMOVED***
              else if($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu
                  .transition({
                    animation  : transition + ' out',
                    duration   : settings.duration,
                    debug      : settings.debug,
                    verbose    : settings.verbose,
                    queue      : false,
                    onStart    : start,
                    onComplete : function() {
                      callback.call(element);
                  ***REMOVED***
                ***REMOVED***)
                ;
            ***REMOVED***
              else {
                module.error(error.transition);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        hideAndClear: function() {
          module.remove.searchTerm();
          if( module.has.maxSelections() ) {
            return;
        ***REMOVED***
          if(module.has.search()) {
            module.hide(function() {
              module.remove.filteredItem();
          ***REMOVED***);
        ***REMOVED***
          else {
            module.hide();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        delay: {
          show: function() {
            module.verbose('Delaying show event to ensure user intent');
            clearTimeout(module.timer);
            module.timer = setTimeout(module.show, settings.delay.show);
   ***REMOVED*****REMOVED***
          hide: function() {
            module.verbose('Delaying hide event to ensure user intent');
            clearTimeout(module.timer);
            module.timer = setTimeout(module.hide, settings.delay.hide);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        escape: {
          value: function(value) {
            var
              multipleValues = Array.isArray(value),
              stringValue    = (typeof value === 'string'),
              isUnparsable   = (!stringValue && !multipleValues),
              hasQuotes      = (stringValue && value.search(regExp.quote) !== -1),
              values         = []
            ;
            if(isUnparsable || !hasQuotes) {
              return value;
          ***REMOVED***
            module.debug('Encoding quote values for use in select', value);
            if(multipleValues) {
              $.each(value, function(index, value){
                values.push(value.replace(regExp.quote, '&quot;'));
            ***REMOVED***);
              return values;
          ***REMOVED***
            return value.replace(regExp.quote, '&quot;');
   ***REMOVED*****REMOVED***
          string: function(text) {
            text =  String(text);
            return text.replace(regExp.escape, '\\$&');
   ***REMOVED*****REMOVED***
          htmlEntities: function(string) {
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
    : $allModules
  ;
***REMOVED***;

$.fn.dropdown.settings = {

  silent                 : false,
  debug                  : false,
  verbose                : false,
  performance            : true,

  on                     : 'click',    // what event should show menu action on item selection
  action                 : 'activate', // action on item selection (nothing, activate, select, combo, hide, function(){***REMOVED***)

  values                 : false,      // specify values to use for dropdown

  clearable              : false,      // whether the value of the dropdown can be cleared

  apiSettings            : false,
  selectOnKeydown        : true,       // Whether selection should occur automatically when keyboard shortcuts used
  minCharacters          : 0,          // Minimum characters required to trigger API call

  filterRemoteData       : false,      // Whether API results should be filtered after being returned for query term
  saveRemoteData         : true,       // Whether remote name/value pairs should be stored in sessionStorage to allow remote data to be restored on page refresh

  throttle               : 200,        // How long to wait after last user input to search remotely

  context                : window,     // Context to use when determining if on screen
  direction              : 'auto',     // Whether dropdown should always open in one direction
  keepOnScreen           : true,       // Whether dropdown should check whether it is on screen before showing

  match                  : 'both',     // what to match against with search selection (both, text, or label)
  fullTextSearch         : false,      // search anywhere in value (set to 'exact' to require exact matches)
  ignoreDiacritics       : false,      // match results also if they contain diacritics of the same base character (for example searching for "a" will also match "á" or "â" or "à", etc...)
  hideDividers           : false,      // Whether to hide any divider elements (specified in selector.divider) that are sibling to any items when searched (set to true will hide all dividers, set to 'empty' will hide them when they are not followed by a visible item)

  placeholder            : 'auto',     // whether to convert blank <select> values to placeholder text
  preserveHTML           : true,       // preserve html when selecting value
  sortSelect             : false,      // sort selection on init

  forceSelection         : true,       // force a choice on blur with search selection

  allowAdditions         : false,      // whether multiple select should allow user added values
  ignoreCase             : false,      // whether to consider case sensitivity when creating labels
  ignoreSearchCase       : true,       // whether to consider case sensitivity when filtering items
  hideAdditions          : true,       // whether or not to hide special message prompting a user they can enter a value

  maxSelections          : false,      // When set to a number limits the number of selections to this count
  useLabels              : true,       // whether multiple select should filter currently active selections from choices
  delimiter              : ',',        // when multiselect uses normal <input> the values will be delimited with this character

  showOnFocus            : true,       // show menu on focus
  allowReselection       : false,      // whether current value should trigger callbacks when reselected
  allowTab               : true,       // add tabindex to element
  allowCategorySelection : false,      // allow elements with sub-menus to be selected

  fireOnInit             : false,      // Whether callbacks should fire when initializing dropdown values

  transition             : 'auto',     // auto transition will slide down or up based on direction
  duration               : 200,        // duration of transition

  glyphWidth             : 1.037,      // widest glyph width in em (W is 1.037 em) used to calculate multiselect input width

  headerDivider          : true,       // whether option headers should have an additional divider line underneath when converted from <select> <optgroup>

  // label settings on multi-select
  label: {
    transition : 'scale',
    duration   : 200,
    variation  : false
***REMOVED***

  // delay before event
  delay : {
    hide   : 300,
    show   : 200,
    search : 20,
    touch  : 50
***REMOVED***

  /* Callbacks***REMOVED***/
  onChange      : function(value, text, $selected){***REMOVED***,
  onAdd         : function(value, text, $selected){***REMOVED***,
  onRemove      : function(value, text, $selected){***REMOVED***,

  onLabelSelect : function($selectedLabels){***REMOVED***,
  onLabelCreate : function(value, text) { return $(this); ***REMOVED***,
  onLabelRemove : function(value) { return true; ***REMOVED***,
  onNoResults   : function(searchTerm) { return true; ***REMOVED***,
  onShow        : function(){***REMOVED***,
  onHide        : function(){***REMOVED***,

  /* Component***REMOVED***/
  name           : 'Dropdown',
  namespace      : 'dropdown',

  message: {
    addResult     : 'Add <b>{term***REMOVED***</b>',
    count         : '{count***REMOVED*** selected',
    maxSelections : 'Max {maxCount***REMOVED*** selections',
    noResults     : 'No results found.',
    serverError   : 'There was an error contacting the server'
***REMOVED***

  error : {
    action          : 'You called a dropdown action that was not defined',
    alreadySetup    : 'Once a select has been initialized behaviors must be called on the created ui dropdown',
    labels          : 'Allowing user additions currently requires the use of labels.',
    missingMultiple : '<select> requires multiple property to be set to correctly preserve multiple values',
    method          : 'The method you called is not defined.',
    noAPI           : 'The API module is required to load resources remotely',
    noStorage       : 'Saving remote data requires session storage',
    noTransition    : 'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>',
    noNormalize     : '"ignoreDiacritics" setting will be ignored. Browser does not support String().normalize(). You may consider including <https://cdn.jsdelivr.net/npm/unorm@1.4.1/lib/unorm.min.js> as a polyfill.'
***REMOVED***

  regExp : {
    escape   : /[-[\]{***REMOVED***()*+?.,\\^$|#\s:=@]/g,
    quote    : /"/g
***REMOVED***

  metadata : {
    defaultText     : 'defaultText',
    defaultValue    : 'defaultValue',
    placeholderText : 'placeholder',
    text            : 'text',
    value           : 'value'
***REMOVED***

  // property names for remote query
  fields: {
    remoteValues : 'results',  // grouping for api results
    values       : 'values',   // grouping for all dropdown values
    disabled     : 'disabled', // whether value should be disabled
    name         : 'name',     // displayed dropdown text
    value        : 'value',    // actual dropdown value
    text         : 'text',     // displayed text when selected
    type         : 'type',     // type of dropdown element
    image        : 'image',    // optional image path
    imageClass   : 'imageClass', // optional individual class for image
    icon         : 'icon',     // optional icon name
    iconClass    : 'iconClass', // optional individual class for icon (for example to use flag instead)
    class        : 'class',    // optional individual class for item/header
    divider      : 'divider'   // optional divider append for group headers
***REMOVED***

  keys : {
    backspace  : 8,
    delimiter  : 188, // comma
    deleteKey  : 46,
    enter      : 13,
    escape     : 27,
    pageUp     : 33,
    pageDown   : 34,
    leftArrow  : 37,
    upArrow    : 38,
    rightArrow : 39,
    downArrow  : 40
***REMOVED***

  selector : {
    addition     : '.addition',
    divider      : '.divider, .header',
    dropdown     : '.ui.dropdown',
    hidden       : '.hidden',
    icon         : '> .dropdown.icon',
    input        : '> input[type="hidden"], > select',
    item         : '.item',
    label        : '> .label',
    remove       : '> .label > .delete.icon',
    siblingLabel : '.label',
    menu         : '.menu',
    message      : '.message',
    menuIcon     : '.dropdown.icon',
    search       : 'input.search, .menu > .search > input, .menu input.search',
    sizer        : '> input.sizer',
    text         : '> .text:not(.icon)',
    unselectable : '.disabled, .filtered',
    clearIcon    : '> .remove.icon'
***REMOVED***

  className : {
    active      : 'active',
    addition    : 'addition',
    animating   : 'animating',
    disabled    : 'disabled',
    empty       : 'empty',
    dropdown    : 'ui dropdown',
    filtered    : 'filtered',
    hidden      : 'hidden transition',
    icon        : 'icon',
    image       : 'image',
    item        : 'item',
    label       : 'ui label',
    loading     : 'loading',
    menu        : 'menu',
    message     : 'message',
    multiple    : 'multiple',
    placeholder : 'default',
    sizer       : 'sizer',
    search      : 'search',
    selected    : 'selected',
    selection   : 'selection',
    upward      : 'upward',
    leftward    : 'left',
    visible     : 'visible',
    clearable   : 'clearable',
    noselection : 'noselection',
    delete      : 'delete',
    header      : 'header',
    divider     : 'divider',
    groupIcon   : '',
    unfilterable : 'unfilterable'
***REMOVED***

***REMOVED***;

/* Templates***REMOVED***/
$.fn.dropdown.settings.templates = {
  deQuote: function(string) {
      return String(string).replace(/"/g,"");
***REMOVED***
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
  // generates dropdown from select values
  dropdown: function(select, fields, preserveHTML, className) {
    var
      placeholder = select.placeholder || false,
      html        = '',
      escape = $.fn.dropdown.settings.templates.escape
    ;
    html +=  '<i class="dropdown icon"></i>';
    if(placeholder) {
      html += '<div class="default text">' + escape(placeholder,preserveHTML) + '</div>';
  ***REMOVED***
    else {
      html += '<div class="text"></div>';
  ***REMOVED***
    html += '<div class="'+className.menu+'">';
    html += $.fn.dropdown.settings.templates.menu(select, fields, preserveHTML,className);
    html += '</div>';
    return html;
***REMOVED***

  // generates just menu from select
  menu: function(response, fields, preserveHTML, className) {
    var
      values = response[fields.values] || [],
      html   = '',
      escape = $.fn.dropdown.settings.templates.escape,
      deQuote = $.fn.dropdown.settings.templates.deQuote
    ;
    $.each(values, function(index, option) {
      var
        itemType = (option[fields.type])
          ? option[fields.type]
          : 'item'
      ;

      if( itemType === 'item' ) {
        var
          maybeText = (option[fields.text])
            ? ' data-text="' + deQuote(option[fields.text]) + '"'
            : '',
          maybeDisabled = (option[fields.disabled])
            ? className.disabled+' '
            : ''
        ;
        html += '<div class="'+ maybeDisabled + (option[fields.class] ? deQuote(option[fields.class]) : className.item)+'" data-value="' + deQuote(option[fields.value]) + '"' + maybeText + '>';
        if(option[fields.image]) {
          html += '<img class="'+(option[fields.imageClass] ? deQuote(option[fields.imageClass]) : className.image)+'" src="' + deQuote(option[fields.image]) + '">';
      ***REMOVED***
        if(option[fields.icon]) {
          html += '<i class="'+deQuote(option[fields.icon])+' '+(option[fields.iconClass] ? deQuote(option[fields.iconClass]) : className.icon)+'"></i>';
      ***REMOVED***
        html +=   escape(option[fields.name] || '', preserveHTML);
        html += '</div>';
    ***REMOVED*** else if (itemType === 'header') {
        var groupName = escape(option[fields.name] || '', preserveHTML),
            groupIcon = option[fields.icon] ? deQuote(option[fields.icon]) : className.groupIcon
        ;
        if(groupName !== '' || groupIcon !== '') {
          html += '<div class="' + (option[fields.class] ? deQuote(option[fields.class]) : className.header) + '">';
          if (groupIcon !== '') {
            html += '<i class="' + groupIcon + ' ' + (option[fields.iconClass] ? deQuote(option[fields.iconClass]) : className.icon) + '"></i>';
        ***REMOVED***
          html += groupName;
          html += '</div>';
      ***REMOVED***
        if(option[fields.divider]){
          html += '<div class="'+className.divider+'"></div>';
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***);
    return html;
***REMOVED***

  // generates label for multiselect
  label: function(value, text, preserveHTML, className) {
    var
        escape = $.fn.dropdown.settings.templates.escape;
    return escape(text,preserveHTML) + '<i class="'+className.delete+' icon"></i>';
***REMOVED***


  // generates messages like "No results"
  message: function(message) {
    return message;
***REMOVED***

  // generates user addition to selection menu
  addition: function(choice) {
    return choice;
***REMOVED***

***REMOVED***;

***REMOVED***)( jQuery, window, document );
