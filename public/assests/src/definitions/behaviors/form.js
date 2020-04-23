/*!
***REMOVED*** # Fomantic-UI - Form Validation
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

$.fn.form = function(parameters) {
  var
    $allModules      = $(this),
    moduleSelector   = $allModules.selector || '',

    time             = new Date().getTime(),
    performance      = [],

    query            = arguments[0],
    legacyParameters = arguments[1],
    methodInvoked    = (typeof query == 'string'),
    queryArguments   = [].slice.call(arguments, 1),
    returnedValue
  ;
  $allModules
    .each(function() {
      var
        $module     = $(this),
        element     = this,

        formErrors  = [],
        keyHeldDown = false,

        // set at run-time
        $field,
        $group,
        $message,
        $prompt,
        $submit,
        $clear,
        $reset,

        settings,
        validation,

        metadata,
        selector,
        className,
        regExp,
        error,

        namespace,
        moduleNamespace,
        eventNamespace,

        submitting = false,
        dirty = false,
        history = ['clean', 'clean'],

        instance,
        module
      ;

      module      = {

        initialize: function() {

          // settings grabbed at run time
          module.get.settings();
          if(methodInvoked) {
            if(instance === undefined) {
              module.instantiate();
          ***REMOVED***
            module.invoke(query);
        ***REMOVED***
          else {
            if(instance !== undefined) {
              instance.invoke('destroy');
          ***REMOVED***
            module.verbose('Initializing form validation', $module, settings);
            module.bindEvents();
            module.set.defaults();
            if (settings.autoCheckRequired) {
              module.set.autoCheck();
          ***REMOVED***
            module.instantiate();
        ***REMOVED***
 ***REMOVED*****REMOVED***

        instantiate: function() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module
            .data(moduleNamespace, module)
          ;
 ***REMOVED*****REMOVED***

        destroy: function() {
          module.verbose('Destroying previous module', instance);
          module.removeEvents();
          $module
            .removeData(moduleNamespace)
          ;
 ***REMOVED*****REMOVED***

        refresh: function() {
          module.verbose('Refreshing selector cache');
          $field      = $module.find(selector.field);
          $group      = $module.find(selector.group);
          $message    = $module.find(selector.message);
          $prompt     = $module.find(selector.prompt);

          $submit     = $module.find(selector.submit);
          $clear      = $module.find(selector.clear);
          $reset      = $module.find(selector.reset);
 ***REMOVED*****REMOVED***

        submit: function() {
          module.verbose('Submitting form', $module);
          submitting = true;
          $module.submit();
 ***REMOVED*****REMOVED***

        attachEvents: function(selector, action) {
          action = action || 'submit';
          $(selector).on('click' + eventNamespace, function(event) {
            module[action]();
            event.preventDefault();
        ***REMOVED***);
 ***REMOVED*****REMOVED***

        bindEvents: function() {
          module.verbose('Attaching form events');
          $module
            .on('submit' + eventNamespace, module.validate.form)
            .on('blur'   + eventNamespace, selector.field, module.event.field.blur)
            .on('click'  + eventNamespace, selector.submit, module.submit)
            .on('click'  + eventNamespace, selector.reset, module.reset)
            .on('click'  + eventNamespace, selector.clear, module.clear)
          ;
          if(settings.keyboardShortcuts) {
            $module.on('keydown' + eventNamespace, selector.field, module.event.field.keydown);
        ***REMOVED***
          $field.each(function(index, el) {
            var
              $input     = $(el),
              type       = $input.prop('type'),
              inputEvent = module.get.changeEvent(type, $input)
            ;
            $input.on(inputEvent + eventNamespace, module.event.field.change);
        ***REMOVED***);

          // Dirty events
          if (settings.preventLeaving) {
            $(window).on('beforeunload' + eventNamespace, module.event.beforeUnload);
        ***REMOVED***

          $field.on('change click keyup keydown blur', function(e) {
            $(this).triggerHandler(e.type + ".dirty");
        ***REMOVED***);

          $field.on('change.dirty click.dirty keyup.dirty keydown.dirty blur.dirty', module.determine.isDirty);

          $module.on('dirty' + eventNamespace, function(e) {
            settings.onDirty.call();
        ***REMOVED***);

          $module.on('clean' + eventNamespace, function(e) {
            settings.onClean.call();
        ***REMOVED***)
 ***REMOVED*****REMOVED***

        clear: function() {
          $field.each(function (index, el) {
            var
              $field       = $(el),
              $element     = $field.parent(),
              $fieldGroup  = $field.closest($group),
              $prompt      = $fieldGroup.find(selector.prompt),
              $calendar    = $field.closest(selector.uiCalendar),
              defaultValue = $field.data(metadata.defaultValue) || '',
              isCheckbox   = $element.is(selector.uiCheckbox),
              isDropdown   = $element.is(selector.uiDropdown)  && module.can.useElement('dropdown'),
              isCalendar   = ($calendar.length > 0  && module.can.useElement('calendar')),
              isErrored    = $fieldGroup.hasClass(className.error)
            ;
            if(isErrored) {
              module.verbose('Resetting error on field', $fieldGroup);
              $fieldGroup.removeClass(className.error);
              $prompt.remove();
          ***REMOVED***
            if(isDropdown) {
              module.verbose('Resetting dropdown value', $element, defaultValue);
              $element.dropdown('clear', true);
          ***REMOVED***
            else if(isCheckbox) {
              $field.prop('checked', false);
          ***REMOVED***
            else if (isCalendar) {
              $calendar.calendar('clear');
          ***REMOVED***
            else {
              module.verbose('Resetting field value', $field, defaultValue);
              $field.val('');
          ***REMOVED***
        ***REMOVED***);
 ***REMOVED*****REMOVED***

        reset: function() {
          $field.each(function (index, el) {
            var
              $field       = $(el),
              $element     = $field.parent(),
              $fieldGroup  = $field.closest($group),
              $calendar    = $field.closest(selector.uiCalendar),
              $prompt      = $fieldGroup.find(selector.prompt),
              defaultValue = $field.data(metadata.defaultValue),
              isCheckbox   = $element.is(selector.uiCheckbox),
              isDropdown   = $element.is(selector.uiDropdown)  && module.can.useElement('dropdown'),
              isCalendar   = ($calendar.length > 0  && module.can.useElement('calendar')),
              isErrored    = $fieldGroup.hasClass(className.error)
            ;
            if(defaultValue === undefined) {
              return;
          ***REMOVED***
            if(isErrored) {
              module.verbose('Resetting error on field', $fieldGroup);
              $fieldGroup.removeClass(className.error);
              $prompt.remove();
          ***REMOVED***
            if(isDropdown) {
              module.verbose('Resetting dropdown value', $element, defaultValue);
              $element.dropdown('restore defaults', true);
          ***REMOVED***
            else if(isCheckbox) {
              module.verbose('Resetting checkbox value', $element, defaultValue);
              $field.prop('checked', defaultValue);
          ***REMOVED***
            else if (isCalendar) {
              $calendar.calendar('set date', defaultValue);
          ***REMOVED***
            else {
              module.verbose('Resetting field value', $field, defaultValue);
              $field.val(defaultValue);
          ***REMOVED***
        ***REMOVED***);

          module.determine.isDirty();
 ***REMOVED*****REMOVED***

        determine: {
          isValid: function() {
            var
              allValid = true
            ;
            $.each(validation, function(fieldName, field) {
              if( !( module.validate.field(field, fieldName, true) ) ) {
                allValid = false;
            ***REMOVED***
          ***REMOVED***);
            return allValid;
   ***REMOVED*****REMOVED***
          isDirty: function(e) {
            var formIsDirty = false;

            $field.each(function(index, el) {
              var
                $el = $(el),
                isCheckbox = ($el.filter(selector.checkbox).length > 0),
                isDirty
              ;

              if (isCheckbox) {
                isDirty = module.is.checkboxDirty($el);
            ***REMOVED*** else {
                isDirty = module.is.fieldDirty($el);
            ***REMOVED***

              $el.data(settings.metadata.isDirty, isDirty);

              formIsDirty |= isDirty;
          ***REMOVED***);

            if (formIsDirty) {
              module.set.dirty();
          ***REMOVED*** else {
              module.set.clean();
          ***REMOVED***

            if (e && e.namespace === 'dirty') {
              e.stopImmediatePropagation();
              e.preventDefault();
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        is: {
          bracketedRule: function(rule) {
            return (rule.type && rule.type.match(settings.regExp.bracket));
   ***REMOVED*****REMOVED***
          shorthandFields: function(fields) {
            var
              fieldKeys = Object.keys(fields),
              firstRule = fields[fieldKeys[0]]
            ;
            return module.is.shorthandRules(firstRule);
   ***REMOVED*****REMOVED***
          // duck type rule test
          shorthandRules: function(rules) {
            return (typeof rules == 'string' || Array.isArray(rules));
   ***REMOVED*****REMOVED***
          empty: function($field) {
            if(!$field || $field.length === 0) {
              return true;
          ***REMOVED***
            else if($field.is(selector.checkbox)) {
              return !$field.is(':checked');
          ***REMOVED***
            else {
              return module.is.blank($field);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          blank: function($field) {
            return $.trim($field.val()) === '';
   ***REMOVED*****REMOVED***
          valid: function(field) {
            var
              allValid = true
            ;
            if(field) {
              module.verbose('Checking if field is valid', field);
              return module.validate.field(validation[field], field, false);
          ***REMOVED***
            else {
              module.verbose('Checking if form is valid');
              $.each(validation, function(fieldName, field) {
                if( !module.is.valid(fieldName) ) {
                  allValid = false;
              ***REMOVED***
            ***REMOVED***);
              return allValid;
          ***REMOVED***
   ***REMOVED*****REMOVED***
          dirty: function() {
            return dirty;
   ***REMOVED*****REMOVED***
          clean: function() {
            return !dirty;
   ***REMOVED*****REMOVED***
          fieldDirty: function($el) {
            var initialValue = $el.data(metadata.defaultValue);
            // Explicitly check for null/undefined here as value may be `false`, so ($el.data(dataInitialValue) || '') would not work
            if (initialValue == null) { initialValue = ''; ***REMOVED***
            var currentValue = $el.val();
            if (currentValue == null) { currentValue = ''; ***REMOVED***

            // Boolean values can be encoded as "true/false" or "True/False" depending on underlying frameworks so we need a case insensitive comparison
            var boolRegex = /^(true|false)$/i;
            var isBoolValue = boolRegex.test(initialValue) && boolRegex.test(currentValue);
            if (isBoolValue) {
              var regex = new RegExp("^" + initialValue + "$", "i");
              return !regex.test(currentValue);
          ***REMOVED***

            return currentValue !== initialValue;
   ***REMOVED*****REMOVED***
          checkboxDirty: function($el) {
            var initialValue = $el.data(metadata.defaultValue);
            var currentValue = $el.is(":checked");

            return initialValue !== currentValue;
   ***REMOVED*****REMOVED***
          justDirty: function() {
            return (history[0] === 'dirty');
   ***REMOVED*****REMOVED***
          justClean: function() {
            return (history[0] === 'clean');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        removeEvents: function() {
          $module.off(eventNamespace);
          $field.off(eventNamespace);
          $submit.off(eventNamespace);
          $field.off(eventNamespace);
 ***REMOVED*****REMOVED***

        event: {
          field: {
            keydown: function(event) {
              var
                $field       = $(this),
                key          = event.which,
                isInput      = $field.is(selector.input),
                isCheckbox   = $field.is(selector.checkbox),
                isInDropdown = ($field.closest(selector.uiDropdown).length > 0),
                keyCode      = {
                  enter  : 13,
                  escape : 27
              ***REMOVED***
              ;
              if( key == keyCode.escape) {
                module.verbose('Escape key pressed blurring field');
                $field
                  .blur()
                ;
            ***REMOVED***
              if(!event.ctrlKey && key == keyCode.enter && isInput && !isInDropdown && !isCheckbox) {
                if(!keyHeldDown) {
                  $field.one('keyup' + eventNamespace, module.event.field.keyup);
                  module.submit();
                  module.debug('Enter pressed on input submitting form');
              ***REMOVED***
                keyHeldDown = true;
            ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            keyup: function() {
              keyHeldDown = false;
***REMOVED*****REMOVED*****REMOVED***
            blur: function(event) {
              var
                $field          = $(this),
                $fieldGroup     = $field.closest($group),
                validationRules = module.get.validation($field)
              ;
              if( $fieldGroup.hasClass(className.error) ) {
                module.debug('Revalidating field', $field, validationRules);
                if(validationRules) {
                  module.validate.field( validationRules );
              ***REMOVED***
            ***REMOVED***
              else if(settings.on == 'blur') {
                if(validationRules) {
                  module.validate.field( validationRules );
              ***REMOVED***
            ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            change: function(event) {
              var
                $field      = $(this),
                $fieldGroup = $field.closest($group),
                validationRules = module.get.validation($field)
              ;
              if(validationRules && (settings.on == 'change' || ( $fieldGroup.hasClass(className.error) && settings.revalidate) )) {
                clearTimeout(module.timer);
                module.timer = setTimeout(function() {
                  module.debug('Revalidating field', $field,  module.get.validation($field));
                  module.validate.field( validationRules );
    ***REMOVED*****REMOVED*****REMOVED*** settings.delay);
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          beforeUnload: function(event) {
            if (module.is.dirty() && !submitting) {
              var event = event || window.event;

              // For modern browsers
              if (event) {
                event.returnValue = settings.text.leavingMessage;
            ***REMOVED***

              // For olders...
              return settings.text.leavingMessage;
          ***REMOVED***
        ***REMOVED***

 ***REMOVED*****REMOVED***

        get: {
          ancillaryValue: function(rule) {
            if(!rule.type || (!rule.value && !module.is.bracketedRule(rule))) {
              return false;
          ***REMOVED***
            return (rule.value !== undefined)
              ? rule.value
              : rule.type.match(settings.regExp.bracket)[1] + ''
            ;
   ***REMOVED*****REMOVED***
          ruleName: function(rule) {
            if( module.is.bracketedRule(rule) ) {
              return rule.type.replace(rule.type.match(settings.regExp.bracket)[0], '');
          ***REMOVED***
            return rule.type;
   ***REMOVED*****REMOVED***
          changeEvent: function(type, $input) {
            if(type == 'checkbox' || type == 'radio' || type == 'hidden' || $input.is('select')) {
              return 'change';
          ***REMOVED***
            else {
              return module.get.inputEvent();
          ***REMOVED***
   ***REMOVED*****REMOVED***
          inputEvent: function() {
            return (document.createElement('input').oninput !== undefined)
              ? 'input'
              : (document.createElement('input').onpropertychange !== undefined)
                ? 'propertychange'
                : 'keyup'
            ;
   ***REMOVED*****REMOVED***
          fieldsFromShorthand: function(fields) {
            var
              fullFields = {***REMOVED***
            ;
            $.each(fields, function(name, rules) {
              if(typeof rules == 'string') {
                rules = [rules];
            ***REMOVED***
              fullFields[name] = {
                rules: []
            ***REMOVED***;
              $.each(rules, function(index, rule) {
                fullFields[name].rules.push({ type: rule ***REMOVED***);
            ***REMOVED***);
          ***REMOVED***);
            return fullFields;
   ***REMOVED*****REMOVED***
          prompt: function(rule, field) {
            var
              ruleName      = module.get.ruleName(rule),
              ancillary     = module.get.ancillaryValue(rule),
              $field        = module.get.field(field.identifier),
              value         = $field.val(),
              prompt        = $.isFunction(rule.prompt)
                ? rule.prompt(value)
                : rule.prompt || settings.prompt[ruleName] || settings.text.unspecifiedRule,
              requiresValue = (prompt.search('{value***REMOVED***') !== -1),
              requiresName  = (prompt.search('{name***REMOVED***') !== -1),
              $label,
              name
            ;
            if(requiresValue) {
              prompt = prompt.replace(/\{value\***REMOVED***/g, $field.val());
          ***REMOVED***
            if(requiresName) {
              $label = $field.closest(selector.group).find('label').eq(0);
              name = ($label.length == 1)
                ? $label.text()
                : $field.prop('placeholder') || settings.text.unspecifiedField
              ;
              prompt = prompt.replace(/\{name\***REMOVED***/g, name);
          ***REMOVED***
            prompt = prompt.replace(/\{identifier\***REMOVED***/g, field.identifier);
            prompt = prompt.replace(/\{ruleValue\***REMOVED***/g, ancillary);
            if(!rule.prompt) {
              module.verbose('Using default validation prompt for type', prompt, ruleName);
          ***REMOVED***
            return prompt;
   ***REMOVED*****REMOVED***
          settings: function() {
            if($.isPlainObject(parameters)) {
              var
                keys     = Object.keys(parameters),
                isLegacySettings = (keys.length > 0)
                  ? (parameters[keys[0]].identifier !== undefined && parameters[keys[0]].rules !== undefined)
                  : false
              ;
              if(isLegacySettings) {
                // 1.x (ducktyped)
                settings   = $.extend(true, {***REMOVED***, $.fn.form.settings, legacyParameters);
                validation = $.extend({***REMOVED***, $.fn.form.settings.defaults, parameters);
                module.error(settings.error.oldSyntax, element);
                module.verbose('Extending settings from legacy parameters', validation, settings);
            ***REMOVED***
              else {
                // 2.x
                if(parameters.fields && module.is.shorthandFields(parameters.fields)) {
                  parameters.fields = module.get.fieldsFromShorthand(parameters.fields);
              ***REMOVED***
                settings   = $.extend(true, {***REMOVED***, $.fn.form.settings, parameters);
                validation = $.extend({***REMOVED***, $.fn.form.settings.defaults, settings.fields);
                module.verbose('Extending settings', validation, settings);
            ***REMOVED***
          ***REMOVED***
            else {
              settings   = $.fn.form.settings;
              validation = $.fn.form.settings.defaults;
              module.verbose('Using default form validation', validation, settings);
          ***REMOVED***

            // shorthand
            namespace       = settings.namespace;
            metadata        = settings.metadata;
            selector        = settings.selector;
            className       = settings.className;
            regExp          = settings.regExp;
            error           = settings.error;
            moduleNamespace = 'module-' + namespace;
            eventNamespace  = '.' + namespace;

            // grab instance
            instance = $module.data(moduleNamespace);

            // refresh selector cache
            module.refresh();
   ***REMOVED*****REMOVED***
          field: function(identifier) {
            module.verbose('Finding field with identifier', identifier);
            identifier = module.escape.string(identifier);
            var t;
            if((t=$field.filter('#' + identifier)).length > 0 ) {
              return t;
          ***REMOVED***
            if((t=$field.filter('[name="' + identifier +'"]')).length > 0 ) {
              return t;
          ***REMOVED***
            if((t=$field.filter('[name="' + identifier +'[]"]')).length > 0 ) {
              return t;
          ***REMOVED***
            if((t=$field.filter('[data-' + metadata.validate + '="'+ identifier +'"]')).length > 0 ) {
              return t;
          ***REMOVED***
            return $('<input/>');
   ***REMOVED*****REMOVED***
          fields: function(fields) {
            var
              $fields = $()
            ;
            $.each(fields, function(index, name) {
              $fields = $fields.add( module.get.field(name) );
          ***REMOVED***);
            return $fields;
   ***REMOVED*****REMOVED***
          validation: function($field) {
            var
              fieldValidation,
              identifier
            ;
            if(!validation) {
              return false;
          ***REMOVED***
            $.each(validation, function(fieldName, field) {
              identifier = field.identifier || fieldName;
              $.each(module.get.field(identifier), function(index, groupField) {
                if(groupField == $field[0]) {
                  field.identifier = identifier;
                  fieldValidation = field;
                  return false;
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***);
            return fieldValidation || false;
   ***REMOVED*****REMOVED***
          value: function (field) {
            var
              fields = [],
              results
            ;
            fields.push(field);
            results = module.get.values.call(element, fields);
            return results[field];
   ***REMOVED*****REMOVED***
          values: function (fields) {
            var
              $fields = Array.isArray(fields)
                ? module.get.fields(fields)
                : $field,
              values = {***REMOVED***
            ;
            $fields.each(function(index, field) {
              var
                $field       = $(field),
                $calendar    = $field.closest(selector.uiCalendar),
                name         = $field.prop('name'),
                value        = $field.val(),
                isCheckbox   = $field.is(selector.checkbox),
                isRadio      = $field.is(selector.radio),
                isMultiple   = (name.indexOf('[]') !== -1),
                isCalendar   = ($calendar.length > 0  && module.can.useElement('calendar')),
                isChecked    = (isCheckbox)
                  ? $field.is(':checked')
                  : false
              ;
              if(name) {
                if(isMultiple) {
                  name = name.replace('[]', '');
                  if(!values[name]) {
                    values[name] = [];
                ***REMOVED***
                  if(isCheckbox) {
                    if(isChecked) {
                      values[name].push(value || true);
                  ***REMOVED***
                    else {
                      values[name].push(false);
                  ***REMOVED***
                ***REMOVED***
                  else {
                    values[name].push(value);
                ***REMOVED***
              ***REMOVED***
                else {
                  if(isRadio) {
                    if(values[name] === undefined || values[name] === false) {
                      values[name] = (isChecked)
                        ? value || true
                        : false
                      ;
                  ***REMOVED***
                ***REMOVED***
                  else if(isCheckbox) {
                    if(isChecked) {
                      values[name] = value || true;
                  ***REMOVED***
                    else {
                      values[name] = false;
                  ***REMOVED***
                ***REMOVED***
                  else if(isCalendar) {
                    var date = $calendar.calendar('get date');

                    if (date !== null) {
                      if (settings.dateHandling == 'date') {
                        values[name] = date;
                    ***REMOVED*** else if(settings.dateHandling == 'input') {
                        values[name] = $calendar.calendar('get input date')
                    ***REMOVED*** else if (settings.dateHandling == 'formatter') {
                        var type = $calendar.calendar('setting', 'type');

                        switch(type) {
                          case 'date':
                          values[name] = settings.formatter.date(date);
                          break;

                          case 'datetime':
                          values[name] = settings.formatter.datetime(date);
                          break;

                          case 'time':
                          values[name] = settings.formatter.time(date);
                          break;

                          case 'month':
                          values[name] = settings.formatter.month(date);
                          break;

                          case 'year':
                          values[name] = settings.formatter.year(date);
                          break;

                          default:
                          module.debug('Wrong calendar mode', $calendar, type);
                          values[name] = '';
                      ***REMOVED***
                    ***REMOVED***
                  ***REMOVED*** else {
                      values[name] = '';
                  ***REMOVED***
                ***REMOVED*** else {
                    values[name] = value;
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***);
            return values;
   ***REMOVED*****REMOVED***
          dirtyFields: function() {
            return $field.filter(function(index, e) {
              return $(e).data(metadata.isDirty);
          ***REMOVED***);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        has: {

          field: function(identifier) {
            module.verbose('Checking for existence of a field with identifier', identifier);
            identifier = module.escape.string(identifier);
            if(typeof identifier !== 'string') {
              module.error(error.identifier, identifier);
          ***REMOVED***
            if($field.filter('#' + identifier).length > 0 ) {
              return true;
          ***REMOVED***
            else if( $field.filter('[name="' + identifier +'"]').length > 0 ) {
              return true;
          ***REMOVED***
            else if( $field.filter('[data-' + metadata.validate + '="'+ identifier +'"]').length > 0 ) {
              return true;
          ***REMOVED***
            return false;
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

        escape: {
          string: function(text) {
            text =  String(text);
            return text.replace(regExp.escape, '\\$&');
        ***REMOVED***
 ***REMOVED*****REMOVED***

        add: {
          // alias
          rule: function(name, rules) {
            module.add.field(name, rules);
   ***REMOVED*****REMOVED***
          field: function(name, rules) {
            // Validation should have at least a standard format
            if(validation[name] === undefined || validation[name].rules === undefined) {
              validation[name] = {
                rules: []
            ***REMOVED***;
          ***REMOVED***
            var
              newValidation = {
                rules: []
            ***REMOVED***
            ;
            if(module.is.shorthandRules(rules)) {
              rules = Array.isArray(rules)
                ? rules
                : [rules]
              ;
              $.each(rules, function(_index, rule) {
                newValidation.rules.push({ type: rule ***REMOVED***);
            ***REMOVED***);
          ***REMOVED***
            else {
              newValidation.rules = rules.rules;
          ***REMOVED***
            // For each new rule, check if there's not already one with the same type
            $.each(newValidation.rules, function (_index, rule) {
              if ($.grep(validation[name].rules, function(item){ return item.type == rule.type; ***REMOVED***).length == 0) {
                validation[name].rules.push(rule);
            ***REMOVED***
          ***REMOVED***);
            module.debug('Adding rules', newValidation.rules, validation);
   ***REMOVED*****REMOVED***
          fields: function(fields) {
            var
              newValidation
            ;
            if(fields && module.is.shorthandFields(fields)) {
              newValidation = module.get.fieldsFromShorthand(fields);
          ***REMOVED***
            else {
              newValidation = fields;
          ***REMOVED***
            validation = $.extend({***REMOVED***, validation, newValidation);
   ***REMOVED*****REMOVED***
          prompt: function(identifier, errors, internal) {
            var
              $field       = module.get.field(identifier),
              $fieldGroup  = $field.closest($group),
              $prompt      = $fieldGroup.children(selector.prompt),
              promptExists = ($prompt.length !== 0)
            ;
            errors = (typeof errors == 'string')
              ? [errors]
              : errors
            ;
            module.verbose('Adding field error state', identifier);
            if(!internal) {
              $fieldGroup
                  .addClass(className.error)
              ;
          ***REMOVED***
            if(settings.inline) {
              if(!promptExists) {
                $prompt = settings.templates.prompt(errors, className.label);
                $prompt
                  .appendTo($fieldGroup)
                ;
            ***REMOVED***
              $prompt
                .html(errors[0])
              ;
              if(!promptExists) {
                if(settings.transition && module.can.useElement('transition') && $module.transition('is supported')) {
                  module.verbose('Displaying error with css transition', settings.transition);
                  $prompt.transition(settings.transition + ' in', settings.duration);
              ***REMOVED***
                else {
                  module.verbose('Displaying error with fallback javascript animation');
                  $prompt
                    .fadeIn(settings.duration)
                  ;
              ***REMOVED***
            ***REMOVED***
              else {
                module.verbose('Inline errors are disabled, no inline error added', identifier);
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***
          errors: function(errors) {
            module.debug('Adding form error messages', errors);
            module.set.error();
            $message
              .html( settings.templates.error(errors) )
            ;
        ***REMOVED***
 ***REMOVED*****REMOVED***

        remove: {
          rule: function(field, rule) {
            var
              rules = Array.isArray(rule)
                ? rule
                : [rule]
            ;
            if(validation[field] === undefined || !Array.isArray(validation[field].rules)) {
              return;
          ***REMOVED***
            if(rule === undefined) {
              module.debug('Removed all rules');
              validation[field].rules = [];
              return;
          ***REMOVED***
            $.each(validation[field].rules, function(index, rule) {
              if(rule && rules.indexOf(rule.type) !== -1) {
                module.debug('Removed rule', rule.type);
                validation[field].rules.splice(index, 1);
            ***REMOVED***
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          field: function(field) {
            var
              fields = Array.isArray(field)
                ? field
                : [field]
            ;
            $.each(fields, function(index, field) {
              module.remove.rule(field);
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          // alias
          rules: function(field, rules) {
            if(Array.isArray(field)) {
              $.each(field, function(index, field) {
                module.remove.rule(field, rules);
            ***REMOVED***);
          ***REMOVED***
            else {
              module.remove.rule(field, rules);
          ***REMOVED***
   ***REMOVED*****REMOVED***
          fields: function(fields) {
            module.remove.field(fields);
   ***REMOVED*****REMOVED***
          prompt: function(identifier) {
            var
              $field      = module.get.field(identifier),
              $fieldGroup = $field.closest($group),
              $prompt     = $fieldGroup.children(selector.prompt)
            ;
            $fieldGroup
              .removeClass(className.error)
            ;
            if(settings.inline && $prompt.is(':visible')) {
              module.verbose('Removing prompt for field', identifier);
              if(settings.transition  && module.can.useElement('transition') && $module.transition('is supported')) {
                $prompt.transition(settings.transition + ' out', settings.duration, function() {
                  $prompt.remove();
              ***REMOVED***);
            ***REMOVED***
              else {
                $prompt
                  .fadeOut(settings.duration, function(){
                    $prompt.remove();
                ***REMOVED***)
                ;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
 ***REMOVED*****REMOVED***

        set: {
          success: function() {
            $module
              .removeClass(className.error)
              .addClass(className.success)
            ;
   ***REMOVED*****REMOVED***
          defaults: function () {
            $field.each(function (index, el) {
              var
                $el        = $(el),
                $parent    = $el.parent(),
                isCheckbox = ($el.filter(selector.checkbox).length > 0),
                isDropdown = $parent.is(selector.uiDropdown) && module.can.useElement('dropdown'),
                $calendar   = $el.closest(selector.uiCalendar),
                isCalendar  = ($calendar.length > 0  && module.can.useElement('calendar')),
                value      = (isCheckbox)
                  ? $el.is(':checked')
                  : $el.val()
              ;
              if (isDropdown) {
                $parent.dropdown('save defaults');
            ***REMOVED***
              else if (isCalendar) {
                $calendar.calendar('refresh');
            ***REMOVED***
              $el.data(metadata.defaultValue, value);
              $el.data(metadata.isDirty, false);
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          error: function() {
            $module
              .removeClass(className.success)
              .addClass(className.error)
            ;
   ***REMOVED*****REMOVED***
          value: function (field, value) {
            var
              fields = {***REMOVED***
            ;
            fields[field] = value;
            return module.set.values.call(element, fields);
   ***REMOVED*****REMOVED***
          values: function (fields) {
            if($.isEmptyObject(fields)) {
              return;
          ***REMOVED***
            $.each(fields, function(key, value) {
              var
                $field      = module.get.field(key),
                $element    = $field.parent(),
                $calendar   = $field.closest(selector.uiCalendar),
                isMultiple  = Array.isArray(value),
                isCheckbox  = $element.is(selector.uiCheckbox)  && module.can.useElement('checkbox'),
                isDropdown  = $element.is(selector.uiDropdown) && module.can.useElement('dropdown'),
                isRadio     = ($field.is(selector.radio) && isCheckbox),
                isCalendar  = ($calendar.length > 0  && module.can.useElement('calendar')),
                fieldExists = ($field.length > 0),
                $multipleField
              ;
              if(fieldExists) {
                if(isMultiple && isCheckbox) {
                  module.verbose('Selecting multiple', value, $field);
                  $element.checkbox('uncheck');
                  $.each(value, function(index, value) {
                    $multipleField = $field.filter('[value="' + value + '"]');
                    $element       = $multipleField.parent();
                    if($multipleField.length > 0) {
                      $element.checkbox('check');
                  ***REMOVED***
                ***REMOVED***);
              ***REMOVED***
                else if(isRadio) {
                  module.verbose('Selecting radio value', value, $field);
                  $field.filter('[value="' + value + '"]')
                    .parent(selector.uiCheckbox)
                      .checkbox('check')
                  ;
              ***REMOVED***
                else if(isCheckbox) {
                  module.verbose('Setting checkbox value', value, $element);
                  if(value === true || value === 1) {
                    $element.checkbox('check');
                ***REMOVED***
                  else {
                    $element.checkbox('uncheck');
                ***REMOVED***
              ***REMOVED***
                else if(isDropdown) {
                  module.verbose('Setting dropdown value', value, $element);
                  $element.dropdown('set selected', value);
              ***REMOVED***
                else if (isCalendar) {
                  $calendar.calendar('set date',value);
              ***REMOVED***
                else {
                  module.verbose('Setting field value', value, $field);
                  $field.val(value);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***);
   ***REMOVED*****REMOVED***
          dirty: function() {
            module.verbose('Setting state dirty');
            dirty = true;
            history[0] = history[1];
            history[1] = 'dirty';

            if (module.is.justClean()) {
              $module.trigger('dirty');
          ***REMOVED***
   ***REMOVED*****REMOVED***
          clean: function() {
            module.verbose('Setting state clean');
            dirty = false;
            history[0] = history[1];
            history[1] = 'clean';

            if (module.is.justDirty()) {
              $module.trigger('clean');
          ***REMOVED***
   ***REMOVED*****REMOVED***
          asClean: function() {
            module.set.defaults();
            module.set.clean();
   ***REMOVED*****REMOVED***
          asDirty: function() {
            module.set.defaults();
            module.set.dirty();
   ***REMOVED*****REMOVED***
          autoCheck: function() {
            module.debug('Enabling auto check on required fields');
            $field.each(function (_index, el) {
              var
                $el        = $(el),
                $elGroup   = $(el).closest($group),
                isCheckbox = ($el.filter(selector.checkbox).length > 0),
                isRequired = $el.prop('required') || $elGroup.hasClass(className.required) || $elGroup.parent().hasClass(className.required),
                isDisabled = $el.prop('disabled') || $elGroup.hasClass(className.disabled) || $elGroup.parent().hasClass(className.disabled),
                validation = module.get.validation($el),
                hasEmptyRule = validation
                  ? $.grep(validation.rules, function(rule) { return rule.type == "empty" ***REMOVED***) !== 0
                  : false,
                identifier = validation.identifier || $el.attr('id') || $el.attr('name') || $el.data(metadata.validate)
              ;
              if (isRequired && !isDisabled && !hasEmptyRule && identifier !== undefined) {
                if (isCheckbox) {
                  module.verbose("Adding 'checked' rule on field", identifier);
                  module.add.rule(identifier, "checked");
              ***REMOVED*** else {
                  module.verbose("Adding 'empty' rule on field", identifier);
                  module.add.rule(identifier, "empty");
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***
 ***REMOVED*****REMOVED***

        validate: {

          form: function(event, ignoreCallbacks) {
            var values = module.get.values();

            // input keydown event will fire submit repeatedly by browser default
            if(keyHeldDown) {
              return false;
          ***REMOVED***

            // reset errors
            formErrors = [];
            if( module.determine.isValid() ) {
              module.debug('Form has no validation errors, submitting');
              module.set.success();
              if(ignoreCallbacks !== true) {
                return settings.onSuccess.call(element, event, values);
            ***REMOVED***
          ***REMOVED***
            else {
              module.debug('Form has errors');
              module.set.error();
              if(!settings.inline) {
                module.add.errors(formErrors);
            ***REMOVED***
              // prevent ajax submit
              if(event && $module.data('moduleApi') !== undefined) {
                event.stopImmediatePropagation();
            ***REMOVED***
              if(ignoreCallbacks !== true) {
                return settings.onFailure.call(element, formErrors, values);
            ***REMOVED***
          ***REMOVED***
   ***REMOVED*****REMOVED***

          // takes a validation object and returns whether field passes validation
          field: function(field, fieldName, showErrors) {
            showErrors = (showErrors !== undefined)
              ? showErrors
              : true
            ;
            if(typeof field == 'string') {
              module.verbose('Validating field', field);
              fieldName = field;
              field     = validation[field];
          ***REMOVED***
            var
              identifier    = field.identifier || fieldName,
              $field        = module.get.field(identifier),
              $dependsField = (field.depends)
                ? module.get.field(field.depends)
                : false,
              fieldValid  = true,
              fieldErrors = []
            ;
            if(!field.identifier) {
              module.debug('Using field name as identifier', identifier);
              field.identifier = identifier;
          ***REMOVED***
            var isDisabled = true;
            $.each($field, function(){
                if(!$(this).prop('disabled')) {
                  isDisabled = false;
                  return false;
              ***REMOVED***
          ***REMOVED***);
            if(isDisabled) {
              module.debug('Field is disabled. Skipping', identifier);
          ***REMOVED***
            else if(field.optional && module.is.blank($field)){
              module.debug('Field is optional and blank. Skipping', identifier);
          ***REMOVED***
            else if(field.depends && module.is.empty($dependsField)) {
              module.debug('Field depends on another value that is not present or empty. Skipping', $dependsField);
          ***REMOVED***
            else if(field.rules !== undefined) {
              $field.closest($group).removeClass(className.error);
              $.each(field.rules, function(index, rule) {
                if( module.has.field(identifier)) {
                  var invalidFields = module.validate.rule(field, rule,true) || [];
                  if (invalidFields.length>0){
                    module.debug('Field is invalid', identifier, rule.type);
                    fieldErrors.push(module.get.prompt(rule, field));
                    fieldValid = false;
                    if(showErrors){
                      $(invalidFields).closest($group).addClass(className.error);
                  ***REMOVED***
                ***REMOVED***
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***
            if(fieldValid) {
              if(showErrors) {
                module.remove.prompt(identifier, fieldErrors);
                settings.onValid.call($field);
            ***REMOVED***
          ***REMOVED***
            else {
              if(showErrors) {
                formErrors = formErrors.concat(fieldErrors);
                module.add.prompt(identifier, fieldErrors, true);
                settings.onInvalid.call($field, fieldErrors);
            ***REMOVED***
              return false;
          ***REMOVED***
            return true;
   ***REMOVED*****REMOVED***

          // takes validation rule and returns whether field passes rule
          rule: function(field, rule, internal) {
            var
              $field       = module.get.field(field.identifier),
              ancillary    = module.get.ancillaryValue(rule),
              ruleName     = module.get.ruleName(rule),
              ruleFunction = settings.rules[ruleName],
              invalidFields = [],
              isCheckbox = $field.is(selector.checkbox),
              isValid = function(field){
                var value = (isCheckbox ? $(field).filter(':checked').val() : $(field).val());
                // cast to string avoiding encoding special values
                value = (value === undefined || value === '' || value === null)
                    ? ''
                    : (settings.shouldTrim) ? $.trim(value + '') : String(value + '')
                ;
                return ruleFunction.call(field, value, ancillary, $module);
            ***REMOVED***
            ;
            if( !$.isFunction(ruleFunction) ) {
              module.error(error.noRule, ruleName);
              return;
          ***REMOVED***
            if(isCheckbox) {
              if (!isValid($field)) {
                invalidFields = $field;
            ***REMOVED***
          ***REMOVED*** else {
              $.each($field, function (index, field) {
                if (!isValid(field)) {
                  invalidFields.push(field);
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***
            return internal ? invalidFields : !(invalidFields.length>0);
        ***REMOVED***
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
      module.initialize();
  ***REMOVED***)
  ;

  return (returnedValue !== undefined)
    ? returnedValue
    : this
  ;
***REMOVED***;

$.fn.form.settings = {

  name              : 'Form',
  namespace         : 'form',

  debug             : false,
  verbose           : false,
  performance       : true,

  fields            : false,

  keyboardShortcuts : true,
  on                : 'submit',
  inline            : false,

  delay             : 200,
  revalidate        : true,
  shouldTrim        : true,

  transition        : 'scale',
  duration          : 200,

  autoCheckRequired : false,
  preventLeaving    : false,
  dateHandling      : 'date', // 'date', 'input', 'formatter'

  onValid           : function() {***REMOVED***,
  onInvalid         : function() {***REMOVED***,
  onSuccess         : function() { return true; ***REMOVED***,
  onFailure         : function() { return false; ***REMOVED***,
  onDirty           : function() {***REMOVED***,
  onClean           : function() {***REMOVED***,

  metadata : {
    defaultValue : 'default',
    validate     : 'validate',
    isDirty      : 'isDirty'
***REMOVED***

  regExp: {
    htmlID  : /^[a-zA-Z][\w:.-]*$/g,
    bracket : /\[(.*)\]/i,
    decimal : /^\d+\.?\d*$/,
    email   : /^[a-z0-9!#$%&'*+\/=?^_`{|***REMOVED***~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    escape  : /[\-\[\]\/\{\***REMOVED***\(\)\*\+\?\.\\\^\$\|:,=@]/g,
    flags   : /^\/(.*)\/(.*)?/,
    integer : /^\-?\d+$/,
    number  : /^\-?\d*(\.\d+)?$/,
    url     : /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,***REMOVED***|www\.[^\s]+\.[^\s]{2,***REMOVED***)/i
***REMOVED***

  text: {
    unspecifiedRule  : 'Please enter a valid value',
    unspecifiedField : 'This field',
    leavingMessage   : 'There are unsaved changes on this page which will be discarded if you continue.'
***REMOVED***

  prompt: {
    empty                : '{name***REMOVED*** must have a value',
    checked              : '{name***REMOVED*** must be checked',
    email                : '{name***REMOVED*** must be a valid e-mail',
    url                  : '{name***REMOVED*** must be a valid url',
    regExp               : '{name***REMOVED*** is not formatted correctly',
    integer              : '{name***REMOVED*** must be an integer',
    decimal              : '{name***REMOVED*** must be a decimal number',
    number               : '{name***REMOVED*** must be set to a number',
    is                   : '{name***REMOVED*** must be "{ruleValue***REMOVED***"',
    isExactly            : '{name***REMOVED*** must be exactly "{ruleValue***REMOVED***"',
    not                  : '{name***REMOVED*** cannot be set to "{ruleValue***REMOVED***"',
    notExactly           : '{name***REMOVED*** cannot be set to exactly "{ruleValue***REMOVED***"',
    contain              : '{name***REMOVED*** must contain "{ruleValue***REMOVED***"',
    containExactly       : '{name***REMOVED*** must contain exactly "{ruleValue***REMOVED***"',
    doesntContain        : '{name***REMOVED*** cannot contain  "{ruleValue***REMOVED***"',
    doesntContainExactly : '{name***REMOVED*** cannot contain exactly "{ruleValue***REMOVED***"',
    minLength            : '{name***REMOVED*** must be at least {ruleValue***REMOVED*** characters',
    length               : '{name***REMOVED*** must be at least {ruleValue***REMOVED*** characters',
    exactLength          : '{name***REMOVED*** must be exactly {ruleValue***REMOVED*** characters',
    maxLength            : '{name***REMOVED*** cannot be longer than {ruleValue***REMOVED*** characters',
    match                : '{name***REMOVED*** must match {ruleValue***REMOVED*** field',
    different            : '{name***REMOVED*** must have a different value than {ruleValue***REMOVED*** field',
    creditCard           : '{name***REMOVED*** must be a valid credit card number',
    minCount             : '{name***REMOVED*** must have at least {ruleValue***REMOVED*** choices',
    exactCount           : '{name***REMOVED*** must have exactly {ruleValue***REMOVED*** choices',
    maxCount             : '{name***REMOVED*** must have {ruleValue***REMOVED*** or less choices'
***REMOVED***

  selector : {
    checkbox   : 'input[type="checkbox"], input[type="radio"]',
    clear      : '.clear',
    field      : 'input, textarea, select',
    group      : '.field',
    input      : 'input',
    message    : '.error.message',
    prompt     : '.prompt.label',
    radio      : 'input[type="radio"]',
    reset      : '.reset:not([type="reset"])',
    submit     : '.submit:not([type="submit"])',
    uiCheckbox : '.ui.checkbox',
    uiDropdown : '.ui.dropdown',
    uiCalendar : '.ui.calendar'
***REMOVED***

  className : {
    error    : 'error',
    label    : 'ui basic red pointing prompt label',
    pressed  : 'down',
    success  : 'success',
    required : 'required',
    disabled : 'disabled'
***REMOVED***

  error: {
    identifier : 'You must specify a string identifier for each field',
    method     : 'The method you called is not defined.',
    noRule     : 'There is no rule matching the one you specified',
    oldSyntax  : 'Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically.',
    noElement  : 'This module requires ui {element***REMOVED***'
***REMOVED***

  templates: {

    // template that produces error message
    error: function(errors) {
      var
        html = '<ul class="list">'
      ;
      $.each(errors, function(index, value) {
        html += '<li>' + value + '</li>';
    ***REMOVED***);
      html += '</ul>';
      return $(html);
  ***REMOVED***

    // template that produces label
    prompt: function(errors, labelClasses) {
      return $('<div/>')
        .addClass(labelClasses)
        .html(errors[0])
      ;
  ***REMOVED***
***REMOVED***

  formatter: {
    date: function(date) {
      return Intl.DateTimeFormat('en-GB').format(date);
  ***REMOVED***
    datetime: function(date) {
      return Intl.DateTimeFormat('en-GB', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    ***REMOVED***).format(date);
  ***REMOVED***
    time: function(date) {
      return Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    ***REMOVED***).format(date);
  ***REMOVED***
    month: function(date) {
      return Intl.DateTimeFormat('en-GB', {
        month: '2-digit',
        year: 'numeric'
    ***REMOVED***).format(date);
  ***REMOVED***
    year: function(date) {
      return Intl.DateTimeFormat('en-GB', {
        year: 'numeric'
    ***REMOVED***).format(date);
  ***REMOVED***
***REMOVED***

  rules: {

    // is not empty or blank string
    empty: function(value) {
      return !(value === undefined || '' === value || Array.isArray(value) && value.length === 0);
  ***REMOVED***

    // checkbox checked
    checked: function() {
      return ($(this).filter(':checked').length > 0);
  ***REMOVED***

    // is most likely an email
    email: function(value){
      return $.fn.form.settings.regExp.email.test(value);
  ***REMOVED***

    // value is most likely url
    url: function(value) {
      return $.fn.form.settings.regExp.url.test(value);
  ***REMOVED***

    // matches specified regExp
    regExp: function(value, regExp) {
      if(regExp instanceof RegExp) {
        return value.match(regExp);
    ***REMOVED***
      var
        regExpParts = regExp.match($.fn.form.settings.regExp.flags),
        flags
      ;
      // regular expression specified as /baz/gi (flags)
      if(regExpParts) {
        regExp = (regExpParts.length >= 2)
          ? regExpParts[1]
          : regExp
        ;
        flags = (regExpParts.length >= 3)
          ? regExpParts[2]
          : ''
        ;
    ***REMOVED***
      return value.match( new RegExp(regExp, flags) );
  ***REMOVED***

    // is valid integer or matches range
    integer: function(value, range) {
      var
        intRegExp = $.fn.form.settings.regExp.integer,
        min,
        max,
        parts
      ;
      if( !range || ['', '..'].indexOf(range) !== -1) {
        // do nothing
    ***REMOVED***
      else if(range.indexOf('..') == -1) {
        if(intRegExp.test(range)) {
          min = max = range - 0;
      ***REMOVED***
    ***REMOVED***
      else {
        parts = range.split('..', 2);
        if(intRegExp.test(parts[0])) {
          min = parts[0] - 0;
      ***REMOVED***
        if(intRegExp.test(parts[1])) {
          max = parts[1] - 0;
      ***REMOVED***
    ***REMOVED***
      return (
        intRegExp.test(value) &&
        (min === undefined || value >= min) &&
        (max === undefined || value <= max)
      );
  ***REMOVED***

    // is valid number (with decimal)
    decimal: function(value) {
      return $.fn.form.settings.regExp.decimal.test(value);
  ***REMOVED***

    // is valid number
    number: function(value) {
      return $.fn.form.settings.regExp.number.test(value);
  ***REMOVED***

    // is value (case insensitive)
    is: function(value, text) {
      text = (typeof text == 'string')
        ? text.toLowerCase()
        : text
      ;
      value = (typeof value == 'string')
        ? value.toLowerCase()
        : value
      ;
      return (value == text);
  ***REMOVED***

    // is value
    isExactly: function(value, text) {
      return (value == text);
  ***REMOVED***

    // value is not another value (case insensitive)
    not: function(value, notValue) {
      value = (typeof value == 'string')
        ? value.toLowerCase()
        : value
      ;
      notValue = (typeof notValue == 'string')
        ? notValue.toLowerCase()
        : notValue
      ;
      return (value != notValue);
  ***REMOVED***

    // value is not another value (case sensitive)
    notExactly: function(value, notValue) {
      return (value != notValue);
  ***REMOVED***

    // value contains text (insensitive)
    contains: function(value, text) {
      // escape regex characters
      text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
      return (value.search( new RegExp(text, 'i') ) !== -1);
  ***REMOVED***

    // value contains text (case sensitive)
    containsExactly: function(value, text) {
      // escape regex characters
      text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
      return (value.search( new RegExp(text) ) !== -1);
  ***REMOVED***

    // value contains text (insensitive)
    doesntContain: function(value, text) {
      // escape regex characters
      text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
      return (value.search( new RegExp(text, 'i') ) === -1);
  ***REMOVED***

    // value contains text (case sensitive)
    doesntContainExactly: function(value, text) {
      // escape regex characters
      text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
      return (value.search( new RegExp(text) ) === -1);
  ***REMOVED***

    // is at least string length
    minLength: function(value, requiredLength) {
      return (value !== undefined)
        ? (value.length >= requiredLength)
        : false
      ;
  ***REMOVED***

    // see rls notes for 2.0.6 (this is a duplicate of minLength)
    length: function(value, requiredLength) {
      return (value !== undefined)
        ? (value.length >= requiredLength)
        : false
      ;
  ***REMOVED***

    // is exactly length
    exactLength: function(value, requiredLength) {
      return (value !== undefined)
        ? (value.length == requiredLength)
        : false
      ;
  ***REMOVED***

    // is less than length
    maxLength: function(value, maxLength) {
      return (value !== undefined)
        ? (value.length <= maxLength)
        : false
      ;
  ***REMOVED***

    // matches another field
    match: function(value, identifier, $module) {
      var
        matchingValue,
        matchingElement
      ;
      if((matchingElement = $module.find('[data-validate="'+ identifier +'"]')).length > 0 ) {
        matchingValue = matchingElement.val();
    ***REMOVED***
      else if((matchingElement = $module.find('#' + identifier)).length > 0) {
        matchingValue = matchingElement.val();
    ***REMOVED***
      else if((matchingElement = $module.find('[name="' + identifier +'"]')).length > 0) {
        matchingValue = matchingElement.val();
    ***REMOVED***
      else if((matchingElement = $module.find('[name="' + identifier +'[]"]')).length > 0 ) {
        matchingValue = matchingElement;
    ***REMOVED***
      return (matchingValue !== undefined)
        ? ( value.toString() == matchingValue.toString() )
        : false
      ;
  ***REMOVED***

    // different than another field
    different: function(value, identifier, $module) {
      // use either id or name of field
      var
        matchingValue,
        matchingElement
      ;
      if((matchingElement = $module.find('[data-validate="'+ identifier +'"]')).length > 0 ) {
        matchingValue = matchingElement.val();
    ***REMOVED***
      else if((matchingElement = $module.find('#' + identifier)).length > 0) {
        matchingValue = matchingElement.val();
    ***REMOVED***
      else if((matchingElement = $module.find('[name="' + identifier +'"]')).length > 0) {
        matchingValue = matchingElement.val();
    ***REMOVED***
      else if((matchingElement = $module.find('[name="' + identifier +'[]"]')).length > 0 ) {
        matchingValue = matchingElement;
    ***REMOVED***
      return (matchingValue !== undefined)
        ? ( value.toString() !== matchingValue.toString() )
        : false
      ;
  ***REMOVED***

    creditCard: function(cardNumber, cardTypes) {
      var
        cards = {
          visa: {
            pattern : /^4/,
            length  : [16]
   ***REMOVED*****REMOVED***
          amex: {
            pattern : /^3[47]/,
            length  : [15]
   ***REMOVED*****REMOVED***
          mastercard: {
            pattern : /^5[1-5]/,
            length  : [16]
   ***REMOVED*****REMOVED***
          discover: {
            pattern : /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2***REMOVED***|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            length  : [16]
   ***REMOVED*****REMOVED***
          unionPay: {
            pattern : /^(62|88)/,
            length  : [16, 17, 18, 19]
   ***REMOVED*****REMOVED***
          jcb: {
            pattern : /^35(2[89]|[3-8][0-9])/,
            length  : [16]
   ***REMOVED*****REMOVED***
          maestro: {
            pattern : /^(5018|5020|5038|6304|6759|676[1-3])/,
            length  : [12, 13, 14, 15, 16, 17, 18, 19]
   ***REMOVED*****REMOVED***
          dinersClub: {
            pattern : /^(30[0-5]|^36)/,
            length  : [14]
   ***REMOVED*****REMOVED***
          laser: {
            pattern : /^(6304|670[69]|6771)/,
            length  : [16, 17, 18, 19]
   ***REMOVED*****REMOVED***
          visaElectron: {
            pattern : /^(4026|417500|4508|4844|491(3|7))/,
            length  : [16]
        ***REMOVED***
 ***REMOVED*****REMOVED***
        valid         = {***REMOVED***,
        validCard     = false,
        requiredTypes = (typeof cardTypes == 'string')
          ? cardTypes.split(',')
          : false,
        unionPay,
        validation
      ;

      if(typeof cardNumber !== 'string' || cardNumber.length === 0) {
        return;
    ***REMOVED***

      // allow dashes in card
      cardNumber = cardNumber.replace(/[\-]/g, '');

      // verify card types
      if(requiredTypes) {
        $.each(requiredTypes, function(index, type){
          // verify each card type
          validation = cards[type];
          if(validation) {
            valid = {
              length  : ($.inArray(cardNumber.length, validation.length) !== -1),
              pattern : (cardNumber.search(validation.pattern) !== -1)
          ***REMOVED***;
            if(valid.length && valid.pattern) {
              validCard = true;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***);

        if(!validCard) {
          return false;
      ***REMOVED***
    ***REMOVED***

      // skip luhn for UnionPay
      unionPay = {
        number  : ($.inArray(cardNumber.length, cards.unionPay.length) !== -1),
        pattern : (cardNumber.search(cards.unionPay.pattern) !== -1)
    ***REMOVED***;
      if(unionPay.number && unionPay.pattern) {
        return true;
    ***REMOVED***

      // verify luhn, adapted from  <https://gist.github.com/2134376>
      var
        length        = cardNumber.length,
        multiple      = 0,
        producedValue = [
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
    ***REMOVED***,
        sum           = 0
      ;
      while (length--) {
        sum += producedValue[multiple][parseInt(cardNumber.charAt(length), 10)];
        multiple ^= 1;
    ***REMOVED***
      return (sum % 10 === 0 && sum > 0);
  ***REMOVED***

    minCount: function(value, minCount) {
      if(minCount == 0) {
        return true;
    ***REMOVED***
      if(minCount == 1) {
        return (value !== '');
    ***REMOVED***
      return (value.split(',').length >= minCount);
  ***REMOVED***

    exactCount: function(value, exactCount) {
      if(exactCount == 0) {
        return (value === '');
    ***REMOVED***
      if(exactCount == 1) {
        return (value !== '' && value.search(',') === -1);
    ***REMOVED***
      return (value.split(',').length == exactCount);
  ***REMOVED***

    maxCount: function(value, maxCount) {
      if(maxCount == 0) {
        return false;
    ***REMOVED***
      if(maxCount == 1) {
        return (value.search(',') === -1);
    ***REMOVED***
      return (value.split(',').length <= maxCount);
  ***REMOVED***
***REMOVED***

***REMOVED***;

***REMOVED***)( jQuery, window, document );
