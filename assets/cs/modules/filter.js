var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; ***REMOVED*** : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; ***REMOVED***;

/* Tabulator v4.6.2 (c) Oliver Folkerd***REMOVED***/

var Filter = function Filter(table) {

	this.table = table; //hold Tabulator object

	this.filterList = []; //hold filter list
	this.headerFilters = {***REMOVED***; //hold column filters
	this.headerFilterColumns = []; //hold columns that use header filters

	this.prevHeaderFilterChangeCheck = "";
	this.prevHeaderFilterChangeCheck = "{***REMOVED***";

	this.changed = false; //has filtering changed since last render
***REMOVED***;

//initialize column header filter
Filter.prototype.initializeColumn = function (column, value) {
	var self = this,
	    field = column.getField(),
	    params;

	//handle successfull value change
	function success(value) {
		var filterType = column.modules.filter.tagType == "input" && column.modules.filter.attrType == "text" || column.modules.filter.tagType == "textarea" ? "partial" : "match",
		    type = "",
		    filterChangeCheck = "",
		    filterFunc;

		if (typeof column.modules.filter.prevSuccess === "undefined" || column.modules.filter.prevSuccess !== value) {

			column.modules.filter.prevSuccess = value;

			if (!column.modules.filter.emptyFunc(value)) {
				column.modules.filter.value = value;

				switch (_typeof(column.definition.headerFilterFunc)) {
					case "string":
						if (self.filters[column.definition.headerFilterFunc]) {
							type = column.definition.headerFilterFunc;
							filterFunc = function filterFunc(data) {
								var params = column.definition.headerFilterFuncParams || {***REMOVED***;
								var fieldVal = column.getFieldValue(data);

								params = typeof params === "function" ? params(value, fieldVal, data) : params;

								return self.filters[column.definition.headerFilterFunc](value, fieldVal, data, params);
							***REMOVED***;
						***REMOVED*** else {
							console.warn("Header Filter Error - Matching filter function not found: ", column.definition.headerFilterFunc);
						***REMOVED***
						break;

					case "function":
						filterFunc = function filterFunc(data) {
							var params = column.definition.headerFilterFuncParams || {***REMOVED***;
							var fieldVal = column.getFieldValue(data);

							params = typeof params === "function" ? params(value, fieldVal, data) : params;

							return column.definition.headerFilterFunc(value, fieldVal, data, params);
						***REMOVED***;

						type = filterFunc;
						break;
				***REMOVED***

				if (!filterFunc) {
					switch (filterType) {
						case "partial":
							filterFunc = function filterFunc(data) {
								var colVal = column.getFieldValue(data);

								if (typeof colVal !== 'undefined' && colVal !== null) {
									return String(colVal).toLowerCase().indexOf(String(value).toLowerCase()) > -1;
								***REMOVED*** else {
									return false;
								***REMOVED***
							***REMOVED***;
							type = "like";
							break;

						default:
							filterFunc = function filterFunc(data) {
								return column.getFieldValue(data) == value;
							***REMOVED***;
							type = "=";
					***REMOVED***
				***REMOVED***

				self.headerFilters[field] = { value: value, func: filterFunc, type: type ***REMOVED***;
			***REMOVED*** else {
				delete self.headerFilters[field];
			***REMOVED***

			filterChangeCheck = JSON.stringify(self.headerFilters);

			if (self.prevHeaderFilterChangeCheck !== filterChangeCheck) {
				self.prevHeaderFilterChangeCheck = filterChangeCheck;

				self.changed = true;
				self.table.rowManager.filterRefresh();
			***REMOVED***
		***REMOVED***

		return true;
	***REMOVED***

	column.modules.filter = {
		success: success,
		attrType: false,
		tagType: false,
		emptyFunc: false
	***REMOVED***;

	this.generateHeaderFilterElement(column);
***REMOVED***;

Filter.prototype.generateHeaderFilterElement = function (column, initialValue, reinitialize) {
	var _this = this;

	var self = this,
	    success = column.modules.filter.success,
	    field = column.getField(),
	    filterElement,
	    editor,
	    editorElement,
	    cellWrapper,
	    typingTimer,
	    searchTrigger,
	    params;

	//handle aborted edit
	function cancel() {***REMOVED***

	if (column.modules.filter.headerElement && column.modules.filter.headerElement.parentNode) {
		column.contentElement.removeChild(column.modules.filter.headerElement.parentNode);
	***REMOVED***

	if (field) {

		//set empty value function
		column.modules.filter.emptyFunc = column.definition.headerFilterEmptyCheck || function (value) {
			return !value && value !== "0";
		***REMOVED***;

		filterElement = document.createElement("div");
		filterElement.classList.add("tabulator-header-filter");

		//set column editor
		switch (_typeof(column.definition.headerFilter)) {
			case "string":
				if (self.table.modules.edit.editors[column.definition.headerFilter]) {
					editor = self.table.modules.edit.editors[column.definition.headerFilter];

					if ((column.definition.headerFilter === "tick" || column.definition.headerFilter === "tickCross") && !column.definition.headerFilterEmptyCheck) {
						column.modules.filter.emptyFunc = function (value) {
							return value !== true && value !== false;
						***REMOVED***;
					***REMOVED***
				***REMOVED*** else {
					console.warn("Filter Error - Cannot build header filter, No such editor found: ", column.definition.editor);
				***REMOVED***
				break;

			case "function":
				editor = column.definition.headerFilter;
				break;

			case "boolean":
				if (column.modules.edit && column.modules.edit.editor) {
					editor = column.modules.edit.editor;
				***REMOVED*** else {
					if (column.definition.formatter && self.table.modules.edit.editors[column.definition.formatter]) {
						editor = self.table.modules.edit.editors[column.definition.formatter];

						if ((column.definition.formatter === "tick" || column.definition.formatter === "tickCross") && !column.definition.headerFilterEmptyCheck) {
							column.modules.filter.emptyFunc = function (value) {
								return value !== true && value !== false;
							***REMOVED***;
						***REMOVED***
					***REMOVED*** else {
						editor = self.table.modules.edit.editors["input"];
					***REMOVED***
				***REMOVED***
				break;
		***REMOVED***

		if (editor) {

			cellWrapper = {
				getValue: function getValue() {
					return typeof initialValue !== "undefined" ? initialValue : "";
				***REMOVED***,
				getField: function getField() {
					return column.definition.field;
				***REMOVED***,
				getElement: function getElement() {
					return filterElement;
				***REMOVED***,
				getColumn: function getColumn() {
					return column.getComponent();
				***REMOVED***,
				getRow: function getRow() {
					return {
						normalizeHeight: function normalizeHeight() {***REMOVED***
					***REMOVED***;
				***REMOVED***
			***REMOVED***;

			params = column.definition.headerFilterParams || {***REMOVED***;

			params = typeof params === "function" ? params.call(self.table) : params;

			editorElement = editor.call(this.table.modules.edit, cellWrapper, function () {***REMOVED***, success, cancel, params);

			if (!editorElement) {
				console.warn("Filter Error - Cannot add filter to " + field + " column, editor returned a value of false");
				return;
			***REMOVED***

			if (!(editorElement instanceof Node)) {
				console.warn("Filter Error - Cannot add filter to " + field + " column, editor should return an instance of Node, the editor returned:", editorElement);
				return;
			***REMOVED***

			//set Placeholder Text
			if (field) {
				self.table.modules.localize.bind("headerFilters|columns|" + column.definition.field, function (value) {
					editorElement.setAttribute("placeholder", typeof value !== "undefined" && value ? value : self.table.modules.localize.getText("headerFilters|default"));
				***REMOVED***);
			***REMOVED*** else {
				self.table.modules.localize.bind("headerFilters|default", function (value) {
					editorElement.setAttribute("placeholder", typeof self.column.definition.headerFilterPlaceholder !== "undefined" && self.column.definition.headerFilterPlaceholder ? self.column.definition.headerFilterPlaceholder : value);
				***REMOVED***);
			***REMOVED***

			//focus on element on click
			editorElement.addEventListener("click", function (e) {
				e.stopPropagation();
				editorElement.focus();
			***REMOVED***);

			editorElement.addEventListener("focus", function (e) {
				var left = _this.table.columnManager.element.scrollLeft;

				if (left !== _this.table.rowManager.element.scrollLeft) {
					_this.table.rowManager.scrollHorizontal(left);
					_this.table.columnManager.scrollHorizontal(left);
				***REMOVED***
			***REMOVED***);

			//live update filters as user types
			typingTimer = false;

			searchTrigger = function searchTrigger(e) {
				if (typingTimer) {
					clearTimeout(typingTimer);
				***REMOVED***

				typingTimer = setTimeout(function () {
					success(editorElement.value);
				***REMOVED***, self.table.options.headerFilterLiveFilterDelay);
			***REMOVED***;

			column.modules.filter.headerElement = editorElement;
			column.modules.filter.attrType = editorElement.hasAttribute("type") ? editorElement.getAttribute("type").toLowerCase() : "";
			column.modules.filter.tagType = editorElement.tagName.toLowerCase();

			if (column.definition.headerFilterLiveFilter !== false) {

				if (!(column.definition.headerFilter === 'autocomplete' || column.definition.headerFilter === 'tickCross' || (column.definition.editor === 'autocomplete' || column.definition.editor === 'tickCross') && column.definition.headerFilter === true)) {
					editorElement.addEventListener("keyup", searchTrigger);
					editorElement.addEventListener("search", searchTrigger);

					//update number filtered columns on change
					if (column.modules.filter.attrType == "number") {
						editorElement.addEventListener("change", function (e) {
							success(editorElement.value);
						***REMOVED***);
					***REMOVED***

					//change text inputs to search inputs to allow for clearing of field
					if (column.modules.filter.attrType == "text" && this.table.browser !== "ie") {
						editorElement.setAttribute("type", "search");
						// editorElement.off("change blur"); //prevent blur from triggering filter and preventing selection click
					***REMOVED***
				***REMOVED***

				//prevent input and select elements from propegating click to column sorters etc
				if (column.modules.filter.tagType == "input" || column.modules.filter.tagType == "select" || column.modules.filter.tagType == "textarea") {
					editorElement.addEventListener("mousedown", function (e) {
						e.stopPropagation();
					***REMOVED***);
				***REMOVED***
			***REMOVED***

			filterElement.appendChild(editorElement);

			column.contentElement.appendChild(filterElement);

			if (!reinitialize) {
				self.headerFilterColumns.push(column);
			***REMOVED***
		***REMOVED***
	***REMOVED*** else {
		console.warn("Filter Error - Cannot add header filter, column has no field set:", column.definition.title);
	***REMOVED***
***REMOVED***;

//hide all header filter elements (used to ensure correct column widths in "fitData" layout mode)
Filter.prototype.hideHeaderFilterElements = function () {
	this.headerFilterColumns.forEach(function (column) {
		if (column.modules.filter && column.modules.filter.headerElement) {
			column.modules.filter.headerElement.style.display = 'none';
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//show all header filter elements (used to ensure correct column widths in "fitData" layout mode)
Filter.prototype.showHeaderFilterElements = function () {
	this.headerFilterColumns.forEach(function (column) {
		if (column.modules.filter && column.modules.filter.headerElement) {
			column.modules.filter.headerElement.style.display = '';
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//programatically set focus of header filter
Filter.prototype.setHeaderFilterFocus = function (column) {
	if (column.modules.filter && column.modules.filter.headerElement) {
		column.modules.filter.headerElement.focus();
	***REMOVED*** else {
		console.warn("Column Filter Focus Error - No header filter set on column:", column.getField());
	***REMOVED***
***REMOVED***;

//programmatically get value of header filter
Filter.prototype.getHeaderFilterValue = function (column) {
	if (column.modules.filter && column.modules.filter.headerElement) {
		return column.modules.filter.headerElement.value;
	***REMOVED*** else {
		console.warn("Column Filter Error - No header filter set on column:", column.getField());
	***REMOVED***
***REMOVED***;

//programatically set value of header filter
Filter.prototype.setHeaderFilterValue = function (column, value) {
	if (column) {
		if (column.modules.filter && column.modules.filter.headerElement) {
			this.generateHeaderFilterElement(column, value, true);
			column.modules.filter.success(value);
		***REMOVED*** else {
			console.warn("Column Filter Error - No header filter set on column:", column.getField());
		***REMOVED***
	***REMOVED***
***REMOVED***;

Filter.prototype.reloadHeaderFilter = function (column) {
	if (column) {
		if (column.modules.filter && column.modules.filter.headerElement) {
			this.generateHeaderFilterElement(column, column.modules.filter.value, true);
		***REMOVED*** else {
			console.warn("Column Filter Error - No header filter set on column:", column.getField());
		***REMOVED***
	***REMOVED***
***REMOVED***;

//check if the filters has changed since last use
Filter.prototype.hasChanged = function () {
	var changed = this.changed;
	this.changed = false;
	return changed;
***REMOVED***;

//set standard filters
Filter.prototype.setFilter = function (field, type, value) {
	var self = this;

	self.filterList = [];

	if (!Array.isArray(field)) {
		field = [{ field: field, type: type, value: value ***REMOVED***];
	***REMOVED***

	self.addFilter(field);
***REMOVED***;

//add filter to array
Filter.prototype.addFilter = function (field, type, value) {
	var self = this;

	if (!Array.isArray(field)) {
		field = [{ field: field, type: type, value: value ***REMOVED***];
	***REMOVED***

	field.forEach(function (filter) {

		filter = self.findFilter(filter);

		if (filter) {
			self.filterList.push(filter);

			self.changed = true;
		***REMOVED***
	***REMOVED***);

	if (this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.filter) {
		this.table.modules.persistence.save("filter");
	***REMOVED***
***REMOVED***;

Filter.prototype.findFilter = function (filter) {
	var self = this,
	    column;

	if (Array.isArray(filter)) {
		return this.findSubFilters(filter);
	***REMOVED***

	var filterFunc = false;

	if (typeof filter.field == "function") {
		filterFunc = function filterFunc(data) {
			return filter.field(data, filter.type || {***REMOVED***); // pass params to custom filter function
		***REMOVED***;
	***REMOVED*** else {

		if (self.filters[filter.type]) {

			column = self.table.columnManager.getColumnByField(filter.field);

			if (column) {
				filterFunc = function filterFunc(data) {
					return self.filters[filter.type](filter.value, column.getFieldValue(data));
				***REMOVED***;
			***REMOVED*** else {
				filterFunc = function filterFunc(data) {
					return self.filters[filter.type](filter.value, data[filter.field]);
				***REMOVED***;
			***REMOVED***
		***REMOVED*** else {
			console.warn("Filter Error - No such filter type found, ignoring: ", filter.type);
		***REMOVED***
	***REMOVED***

	filter.func = filterFunc;

	return filter.func ? filter : false;
***REMOVED***;

Filter.prototype.findSubFilters = function (filters) {
	var self = this,
	    output = [];

	filters.forEach(function (filter) {
		filter = self.findFilter(filter);

		if (filter) {
			output.push(filter);
		***REMOVED***
	***REMOVED***);

	return output.length ? output : false;
***REMOVED***;

//get all filters
Filter.prototype.getFilters = function (all, ajax) {
	var output = [];

	if (all) {
		output = this.getHeaderFilters();
	***REMOVED***

	if (ajax) {
		output.forEach(function (item) {
			if (typeof item.type == "function") {
				item.type = "function";
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	output = output.concat(this.filtersToArray(this.filterList, ajax));

	return output;
***REMOVED***;

//filter to Object
Filter.prototype.filtersToArray = function (filterList, ajax) {
	var _this2 = this;

	var output = [];

	filterList.forEach(function (filter) {
		var item;

		if (Array.isArray(filter)) {
			output.push(_this2.filtersToArray(filter, ajax));
		***REMOVED*** else {
			item = { field: filter.field, type: filter.type, value: filter.value ***REMOVED***;

			if (ajax) {
				if (typeof item.type == "function") {
					item.type = "function";
				***REMOVED***
			***REMOVED***

			output.push(item);
		***REMOVED***
	***REMOVED***);

	return output;
***REMOVED***;

//get all filters
Filter.prototype.getHeaderFilters = function () {
	var self = this,
	    output = [];

	for (var key in this.headerFilters) {
		output.push({ field: key, type: this.headerFilters[key].type, value: this.headerFilters[key].value ***REMOVED***);
	***REMOVED***

	return output;
***REMOVED***;

//remove filter from array
Filter.prototype.removeFilter = function (field, type, value) {
	var self = this;

	if (!Array.isArray(field)) {
		field = [{ field: field, type: type, value: value ***REMOVED***];
	***REMOVED***

	field.forEach(function (filter) {
		var index = -1;

		if (_typeof(filter.field) == "object") {
			index = self.filterList.findIndex(function (element) {
				return filter === element;
			***REMOVED***);
		***REMOVED*** else {
			index = self.filterList.findIndex(function (element) {
				return filter.field === element.field && filter.type === element.type && filter.value === element.value;
			***REMOVED***);
		***REMOVED***

		if (index > -1) {
			self.filterList.splice(index, 1);
			self.changed = true;
		***REMOVED*** else {
			console.warn("Filter Error - No matching filter type found, ignoring: ", filter.type);
		***REMOVED***
	***REMOVED***);

	if (this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.filter) {
		this.table.modules.persistence.save("filter");
	***REMOVED***
***REMOVED***;

//clear filters
Filter.prototype.clearFilter = function (all) {
	this.filterList = [];

	if (all) {
		this.clearHeaderFilter();
	***REMOVED***

	this.changed = true;

	if (this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.filter) {
		this.table.modules.persistence.save("filter");
	***REMOVED***
***REMOVED***;

//clear header filters
Filter.prototype.clearHeaderFilter = function () {
	var self = this;

	this.headerFilters = {***REMOVED***;
	self.prevHeaderFilterChangeCheck = "{***REMOVED***";

	this.headerFilterColumns.forEach(function (column) {
		column.modules.filter.value = null;
		column.modules.filter.prevSuccess = undefined;
		self.reloadHeaderFilter(column);
	***REMOVED***);

	this.changed = true;
***REMOVED***;

//search data and return matching rows
Filter.prototype.search = function (searchType, field, type, value) {
	var self = this,
	    activeRows = [],
	    filterList = [];

	if (!Array.isArray(field)) {
		field = [{ field: field, type: type, value: value ***REMOVED***];
	***REMOVED***

	field.forEach(function (filter) {
		filter = self.findFilter(filter);

		if (filter) {
			filterList.push(filter);
		***REMOVED***
	***REMOVED***);

	this.table.rowManager.rows.forEach(function (row) {
		var match = true;

		filterList.forEach(function (filter) {
			if (!self.filterRecurse(filter, row.getData())) {
				match = false;
			***REMOVED***
		***REMOVED***);

		if (match) {
			activeRows.push(searchType === "data" ? row.getData("data") : row.getComponent());
		***REMOVED***
	***REMOVED***);

	return activeRows;
***REMOVED***;

//filter row array
Filter.prototype.filter = function (rowList, filters) {
	var self = this,
	    activeRows = [],
	    activeRowComponents = [];

	if (self.table.options.dataFiltering) {
		self.table.options.dataFiltering.call(self.table, self.getFilters());
	***REMOVED***

	if (!self.table.options.ajaxFiltering && (self.filterList.length || Object.keys(self.headerFilters).length)) {

		rowList.forEach(function (row) {
			if (self.filterRow(row)) {
				activeRows.push(row);
			***REMOVED***
		***REMOVED***);
	***REMOVED*** else {
		activeRows = rowList.slice(0);
	***REMOVED***

	if (self.table.options.dataFiltered) {

		activeRows.forEach(function (row) {
			activeRowComponents.push(row.getComponent());
		***REMOVED***);

		self.table.options.dataFiltered.call(self.table, self.getFilters(), activeRowComponents);
	***REMOVED***

	return activeRows;
***REMOVED***;

//filter individual row
Filter.prototype.filterRow = function (row, filters) {
	var self = this,
	    match = true,
	    data = row.getData();

	self.filterList.forEach(function (filter) {
		if (!self.filterRecurse(filter, data)) {
			match = false;
		***REMOVED***
	***REMOVED***);

	for (var field in self.headerFilters) {
		if (!self.headerFilters[field].func(data)) {
			match = false;
		***REMOVED***
	***REMOVED***

	return match;
***REMOVED***;

Filter.prototype.filterRecurse = function (filter, data) {
	var self = this,
	    match = false;

	if (Array.isArray(filter)) {
		filter.forEach(function (subFilter) {
			if (self.filterRecurse(subFilter, data)) {
				match = true;
			***REMOVED***
		***REMOVED***);
	***REMOVED*** else {
		match = filter.func(data);
	***REMOVED***

	return match;
***REMOVED***;

//list of available filters
Filter.prototype.filters = {

	//equal to
	"=": function _(filterVal, rowVal, rowData, filterParams) {
		return rowVal == filterVal ? true : false;
	***REMOVED***,

	//less than
	"<": function _(filterVal, rowVal, rowData, filterParams) {
		return rowVal < filterVal ? true : false;
	***REMOVED***,

	//less than or equal to
	"<=": function _(filterVal, rowVal, rowData, filterParams) {
		return rowVal <= filterVal ? true : false;
	***REMOVED***,

	//greater than
	">": function _(filterVal, rowVal, rowData, filterParams) {
		return rowVal > filterVal ? true : false;
	***REMOVED***,

	//greater than or equal to
	">=": function _(filterVal, rowVal, rowData, filterParams) {
		return rowVal >= filterVal ? true : false;
	***REMOVED***,

	//not equal to
	"!=": function _(filterVal, rowVal, rowData, filterParams) {
		return rowVal != filterVal ? true : false;
	***REMOVED***,

	"regex": function regex(filterVal, rowVal, rowData, filterParams) {

		if (typeof filterVal == "string") {
			filterVal = new RegExp(filterVal);
		***REMOVED***

		return filterVal.test(rowVal);
	***REMOVED***,

	//contains the string
	"like": function like(filterVal, rowVal, rowData, filterParams) {
		if (filterVal === null || typeof filterVal === "undefined") {
			return rowVal === filterVal ? true : false;
		***REMOVED*** else {
			if (typeof rowVal !== 'undefined' && rowVal !== null) {
				return String(rowVal).toLowerCase().indexOf(filterVal.toLowerCase()) > -1;
			***REMOVED*** else {
				return false;
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	//in array
	"in": function _in(filterVal, rowVal, rowData, filterParams) {
		if (Array.isArray(filterVal)) {
			return filterVal.indexOf(rowVal) > -1;
		***REMOVED*** else {
			console.warn("Filter Error - filter value is not an array:", filterVal);
			return false;
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.registerModule("filter", Filter);