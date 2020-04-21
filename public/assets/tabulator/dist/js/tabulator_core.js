/* Tabulator v4.6.2 (c) Oliver Folkerd***REMOVED***/

***REMOVED***;

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; ***REMOVED*** : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; ***REMOVED***;

if (!Array.prototype.findIndex) {

	Object.defineProperty(Array.prototype, 'findIndex', {

		value: function value(predicate) {

			// 1. Let O be ? ToObject(this value).

			if (this == null) {

				throw new TypeError('"this" is null or not defined');
			***REMOVED***

			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).

			var len = o.length >>> 0;

			// 3. If IsCallable(predicate) is false, throw a TypeError exception.

			if (typeof predicate !== 'function') {

				throw new TypeError('predicate must be a function');
			***REMOVED***

			// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

			var thisArg = arguments[1];

			// 5. Let k be 0.

			var k = 0;

			// 6. Repeat, while k < len

			while (k < len) {

				// a. Let Pk be ! ToString(k).

				// b. Let kValue be ? Get(O, Pk).

				// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).

				// d. If testResult is true, return k.

				var kValue = o[k];

				if (predicate.call(thisArg, kValue, k, o)) {

					return k;
				***REMOVED***

				// e. Increase k by 1.

				k++;
			***REMOVED***

			// 7. Return -1.

			return -1;
		***REMOVED***

	***REMOVED***);
***REMOVED***

// https://tc39.github.io/ecma262/#sec-array.prototype.find

if (!Array.prototype.find) {

	Object.defineProperty(Array.prototype, 'find', {

		value: function value(predicate) {

			// 1. Let O be ? ToObject(this value).

			if (this == null) {

				throw new TypeError('"this" is null or not defined');
			***REMOVED***

			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).

			var len = o.length >>> 0;

			// 3. If IsCallable(predicate) is false, throw a TypeError exception.

			if (typeof predicate !== 'function') {

				throw new TypeError('predicate must be a function');
			***REMOVED***

			// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.

			var thisArg = arguments[1];

			// 5. Let k be 0.

			var k = 0;

			// 6. Repeat, while k < len

			while (k < len) {

				// a. Let Pk be ! ToString(k).

				// b. Let kValue be ? Get(O, Pk).

				// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).

				// d. If testResult is true, return kValue.

				var kValue = o[k];

				if (predicate.call(thisArg, kValue, k, o)) {

					return kValue;
				***REMOVED***

				// e. Increase k by 1.

				k++;
			***REMOVED***

			// 7. Return undefined.

			return undefined;
		***REMOVED***

	***REMOVED***);
***REMOVED***

var ColumnManager = function ColumnManager(table) {

	this.table = table; //hold parent table

	this.blockHozScrollEvent = false;

	this.headersElement = this.createHeadersElement();

	this.element = this.createHeaderElement(); //containing element

	this.rowManager = null; //hold row manager object

	this.columns = []; // column definition object

	this.columnsByIndex = []; //columns by index

	this.columnsByField = {***REMOVED***; //columns by field

	this.scrollLeft = 0;

	this.element.insertBefore(this.headersElement, this.element.firstChild);
***REMOVED***;

////////////// Setup Functions /////////////////


ColumnManager.prototype.createHeadersElement = function () {

	var el = document.createElement("div");

	el.classList.add("tabulator-headers");

	return el;
***REMOVED***;

ColumnManager.prototype.createHeaderElement = function () {

	var el = document.createElement("div");

	el.classList.add("tabulator-header");

	if (!this.table.options.headerVisible) {

		el.classList.add("tabulator-header-hidden");
	***REMOVED***

	return el;
***REMOVED***;

ColumnManager.prototype.initialize = function () {

	var self = this;

	//scroll body along with header

	// self.element.addEventListener("scroll", function(e){

	// 	if(!self.blockHozScrollEvent){

	// 		self.table.rowManager.scrollHorizontal(self.element.scrollLeft);

	// 	***REMOVED***

	// ***REMOVED***);
***REMOVED***;

//link to row manager

ColumnManager.prototype.setRowManager = function (manager) {

	this.rowManager = manager;
***REMOVED***;

//return containing element

ColumnManager.prototype.getElement = function () {

	return this.element;
***REMOVED***;

//return header containing element

ColumnManager.prototype.getHeadersElement = function () {

	return this.headersElement;
***REMOVED***;

// ColumnManager.prototype.tempScrollBlock = function(){

// 	clearTimeout(this.blockHozScrollEvent);

// 	this.blockHozScrollEvent = setTimeout(() => {this.blockHozScrollEvent = false;***REMOVED***, 50);

// ***REMOVED***


//scroll horizontally to match table body

ColumnManager.prototype.scrollHorizontal = function (left) {

	var hozAdjust = 0,
	    scrollWidth = this.element.scrollWidth - this.table.element.clientWidth;

	// this.tempScrollBlock();

	this.element.scrollLeft = left;

	//adjust for vertical scrollbar moving table when present

	if (left > scrollWidth) {

		hozAdjust = left - scrollWidth;

		this.element.style.marginLeft = -hozAdjust + "px";
	***REMOVED*** else {

		this.element.style.marginLeft = 0;
	***REMOVED***

	//keep frozen columns fixed in position

	//this._calcFrozenColumnsPos(hozAdjust + 3);


	this.scrollLeft = left;

	if (this.table.modExists("frozenColumns")) {

		this.table.modules.frozenColumns.scrollHorizontal();
	***REMOVED***
***REMOVED***;

///////////// Column Setup Functions /////////////


ColumnManager.prototype.generateColumnsFromRowData = function (data) {

	var cols = [],
	    row,
	    sorter;

	if (data && data.length) {

		row = data[0];

		for (var key in row) {

			var col = {

				field: key,

				title: key

			***REMOVED***;

			var value = row[key];

			switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {

				case "undefined":

					sorter = "string";

					break;

				case "boolean":

					sorter = "boolean";

					break;

				case "object":

					if (Array.isArray(value)) {

						sorter = "array";
					***REMOVED*** else {

						sorter = "string";
					***REMOVED***

					break;

				default:

					if (!isNaN(value) && value !== "") {

						sorter = "number";
					***REMOVED*** else {

						if (value.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i)) {

							sorter = "alphanum";
						***REMOVED*** else {

							sorter = "string";
						***REMOVED***
					***REMOVED***

					break;

			***REMOVED***

			col.sorter = sorter;

			cols.push(col);
		***REMOVED***

		this.table.options.columns = cols;

		this.setColumns(this.table.options.columns);
	***REMOVED***
***REMOVED***;

ColumnManager.prototype.setColumns = function (cols, row) {

	var self = this;

	while (self.headersElement.firstChild) {
		self.headersElement.removeChild(self.headersElement.firstChild);
	***REMOVED***self.columns = [];

	self.columnsByIndex = [];

	self.columnsByField = {***REMOVED***;

	//reset frozen columns

	if (self.table.modExists("frozenColumns")) {

		self.table.modules.frozenColumns.reset();
	***REMOVED***

	cols.forEach(function (def, i) {

		self._addColumn(def);
	***REMOVED***);

	self._reIndexColumns();

	if (self.table.options.responsiveLayout && self.table.modExists("responsiveLayout", true)) {

		self.table.modules.responsiveLayout.initialize();
	***REMOVED***

	self.redraw(true);
***REMOVED***;

ColumnManager.prototype._addColumn = function (definition, before, nextToColumn) {

	var column = new Column(definition, this),
	    colEl = column.getElement(),
	    index = nextToColumn ? this.findColumnIndex(nextToColumn) : nextToColumn;

	if (nextToColumn && index > -1) {

		var parentIndex = this.columns.indexOf(nextToColumn.getTopColumn());

		var nextEl = nextToColumn.getElement();

		if (before) {

			this.columns.splice(parentIndex, 0, column);

			nextEl.parentNode.insertBefore(colEl, nextEl);
		***REMOVED*** else {

			this.columns.splice(parentIndex + 1, 0, column);

			nextEl.parentNode.insertBefore(colEl, nextEl.nextSibling);
		***REMOVED***
	***REMOVED*** else {

		if (before) {

			this.columns.unshift(column);

			this.headersElement.insertBefore(column.getElement(), this.headersElement.firstChild);
		***REMOVED*** else {

			this.columns.push(column);

			this.headersElement.appendChild(column.getElement());
		***REMOVED***

		column.columnRendered();
	***REMOVED***

	return column;
***REMOVED***;

ColumnManager.prototype.registerColumnField = function (col) {

	if (col.definition.field) {

		this.columnsByField[col.definition.field] = col;
	***REMOVED***
***REMOVED***;

ColumnManager.prototype.registerColumnPosition = function (col) {

	this.columnsByIndex.push(col);
***REMOVED***;

ColumnManager.prototype._reIndexColumns = function () {

	this.columnsByIndex = [];

	this.columns.forEach(function (column) {

		column.reRegisterPosition();
	***REMOVED***);
***REMOVED***;

//ensure column headers take up the correct amount of space in column groups

ColumnManager.prototype._verticalAlignHeaders = function () {

	var self = this,
	    minHeight = 0;

	self.columns.forEach(function (column) {

		var height;

		column.clearVerticalAlign();

		height = column.getHeight();

		if (height > minHeight) {

			minHeight = height;
		***REMOVED***
	***REMOVED***);

	self.columns.forEach(function (column) {

		column.verticalAlign(self.table.options.columnHeaderVertAlign, minHeight);
	***REMOVED***);

	self.rowManager.adjustTableSize();
***REMOVED***;

//////////////// Column Details /////////////////


ColumnManager.prototype.findColumn = function (subject) {

	var self = this;

	if ((typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) == "object") {

		if (subject instanceof Column) {

			//subject is column element

			return subject;
		***REMOVED*** else if (subject instanceof ColumnComponent) {

			//subject is public column component

			return subject._getSelf() || false;
		***REMOVED*** else if (typeof HTMLElement !== "undefined" && subject instanceof HTMLElement) {

			//subject is a HTML element of the column header

			var match = self.columns.find(function (column) {

				return column.element === subject;
			***REMOVED***);

			return match || false;
		***REMOVED***
	***REMOVED*** else {

		//subject should be treated as the field name of the column

		return this.columnsByField[subject] || false;
	***REMOVED***

	//catch all for any other type of input


	return false;
***REMOVED***;

ColumnManager.prototype.getColumnByField = function (field) {

	return this.columnsByField[field];
***REMOVED***;

ColumnManager.prototype.getColumnsByFieldRoot = function (root) {
	var _this = this;

	var matches = [];

	Object.keys(this.columnsByField).forEach(function (field) {

		var fieldRoot = field.split(".")[0];

		if (fieldRoot === root) {

			matches.push(_this.columnsByField[field]);
		***REMOVED***
	***REMOVED***);

	return matches;
***REMOVED***;

ColumnManager.prototype.getColumnByIndex = function (index) {

	return this.columnsByIndex[index];
***REMOVED***;

ColumnManager.prototype.getFirstVisibileColumn = function (index) {

	var index = this.columnsByIndex.findIndex(function (col) {

		return col.visible;
	***REMOVED***);

	return index > -1 ? this.columnsByIndex[index] : false;
***REMOVED***;

ColumnManager.prototype.getColumns = function () {

	return this.columns;
***REMOVED***;

ColumnManager.prototype.findColumnIndex = function (column) {

	return this.columnsByIndex.findIndex(function (col) {

		return column === col;
	***REMOVED***);
***REMOVED***;

//return all columns that are not groups

ColumnManager.prototype.getRealColumns = function () {

	return this.columnsByIndex;
***REMOVED***;

//travers across columns and call action

ColumnManager.prototype.traverse = function (callback) {

	var self = this;

	self.columnsByIndex.forEach(function (column, i) {

		callback(column, i);
	***REMOVED***);
***REMOVED***;

//get defintions of actual columns

ColumnManager.prototype.getDefinitions = function (active) {

	var self = this,
	    output = [];

	self.columnsByIndex.forEach(function (column) {

		if (!active || active && column.visible) {

			output.push(column.getDefinition());
		***REMOVED***
	***REMOVED***);

	return output;
***REMOVED***;

//get full nested definition tree

ColumnManager.prototype.getDefinitionTree = function () {

	var self = this,
	    output = [];

	self.columns.forEach(function (column) {

		output.push(column.getDefinition(true));
	***REMOVED***);

	return output;
***REMOVED***;

ColumnManager.prototype.getComponents = function (structured) {

	var self = this,
	    output = [],
	    columns = structured ? self.columns : self.columnsByIndex;

	columns.forEach(function (column) {

		output.push(column.getComponent());
	***REMOVED***);

	return output;
***REMOVED***;

ColumnManager.prototype.getWidth = function () {

	var width = 0;

	this.columnsByIndex.forEach(function (column) {

		if (column.visible) {

			width += column.getWidth();
		***REMOVED***
	***REMOVED***);

	return width;
***REMOVED***;

ColumnManager.prototype.moveColumn = function (from, to, after) {

	this.moveColumnActual(from, to, after);

	if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

		this.table.modules.responsiveLayout.initialize();
	***REMOVED***

	if (this.table.modExists("columnCalcs")) {

		this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
	***REMOVED***

	to.element.parentNode.insertBefore(from.element, to.element);

	if (after) {

		to.element.parentNode.insertBefore(to.element, from.element);
	***REMOVED***

	this._verticalAlignHeaders();

	this.table.rowManager.reinitialize();
***REMOVED***;

ColumnManager.prototype.moveColumnActual = function (from, to, after) {

	if (from.parent.isGroup) {

		this._moveColumnInArray(from.parent.columns, from, to, after);
	***REMOVED*** else {

		this._moveColumnInArray(this.columns, from, to, after);
	***REMOVED***

	this._moveColumnInArray(this.columnsByIndex, from, to, after, true);

	if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

		this.table.modules.responsiveLayout.initialize();
	***REMOVED***

	if (this.table.options.columnMoved) {

		this.table.options.columnMoved.call(this.table, from.getComponent(), this.table.columnManager.getComponents());
	***REMOVED***

	if (this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.columns) {

		this.table.modules.persistence.save("columns");
	***REMOVED***
***REMOVED***;

ColumnManager.prototype._moveColumnInArray = function (columns, from, to, after, updateRows) {

	var fromIndex = columns.indexOf(from),
	    toIndex;

	if (fromIndex > -1) {

		columns.splice(fromIndex, 1);

		toIndex = columns.indexOf(to);

		if (toIndex > -1) {

			if (after) {

				toIndex = toIndex + 1;
			***REMOVED***
		***REMOVED*** else {

			toIndex = fromIndex;
		***REMOVED***

		columns.splice(toIndex, 0, from);

		if (updateRows) {

			this.table.rowManager.rows.forEach(function (row) {

				if (row.cells.length) {

					var cell = row.cells.splice(fromIndex, 1)[0];

					row.cells.splice(toIndex, 0, cell);
				***REMOVED***
			***REMOVED***);
		***REMOVED***
	***REMOVED***
***REMOVED***;

ColumnManager.prototype.scrollToColumn = function (column, position, ifVisible) {
	var _this2 = this;

	var left = 0,
	    offset = 0,
	    adjust = 0,
	    colEl = column.getElement();

	return new Promise(function (resolve, reject) {

		if (typeof position === "undefined") {

			position = _this2.table.options.scrollToColumnPosition;
		***REMOVED***

		if (typeof ifVisible === "undefined") {

			ifVisible = _this2.table.options.scrollToColumnIfVisible;
		***REMOVED***

		if (column.visible) {

			//align to correct position

			switch (position) {

				case "middle":

				case "center":

					adjust = -_this2.element.clientWidth / 2;

					break;

				case "right":

					adjust = colEl.clientWidth - _this2.headersElement.clientWidth;

					break;

			***REMOVED***

			//check column visibility

			if (!ifVisible) {

				offset = colEl.offsetLeft;

				if (offset > 0 && offset + colEl.offsetWidth < _this2.element.clientWidth) {

					return false;
				***REMOVED***
			***REMOVED***

			//calculate scroll position

			left = colEl.offsetLeft + _this2.element.scrollLeft + adjust;

			left = Math.max(Math.min(left, _this2.table.rowManager.element.scrollWidth - _this2.table.rowManager.element.clientWidth), 0);

			_this2.table.rowManager.scrollHorizontal(left);

			_this2.scrollHorizontal(left);

			resolve();
		***REMOVED*** else {

			console.warn("Scroll Error - Column not visible");

			reject("Scroll Error - Column not visible");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//////////////// Cell Management /////////////////


ColumnManager.prototype.generateCells = function (row) {

	var self = this;

	var cells = [];

	self.columnsByIndex.forEach(function (column) {

		cells.push(column.generateCell(row));
	***REMOVED***);

	return cells;
***REMOVED***;

//////////////// Column Management /////////////////


ColumnManager.prototype.getFlexBaseWidth = function () {

	var self = this,
	    totalWidth = self.table.element.clientWidth,
	    //table element width

	fixedWidth = 0;

	//adjust for vertical scrollbar if present

	if (self.rowManager.element.scrollHeight > self.rowManager.element.clientHeight) {

		totalWidth -= self.rowManager.element.offsetWidth - self.rowManager.element.clientWidth;
	***REMOVED***

	this.columnsByIndex.forEach(function (column) {

		var width, minWidth, colWidth;

		if (column.visible) {

			width = column.definition.width || 0;

			minWidth = typeof column.minWidth == "undefined" ? self.table.options.columnMinWidth : parseInt(column.minWidth);

			if (typeof width == "string") {

				if (width.indexOf("%") > -1) {

					colWidth = totalWidth / 100***REMOVED*** parseInt(width);
				***REMOVED*** else {

					colWidth = parseInt(width);
				***REMOVED***
			***REMOVED*** else {

				colWidth = width;
			***REMOVED***

			fixedWidth += colWidth > minWidth ? colWidth : minWidth;
		***REMOVED***
	***REMOVED***);

	return fixedWidth;
***REMOVED***;

ColumnManager.prototype.addColumn = function (definition, before, nextToColumn) {
	var _this3 = this;

	return new Promise(function (resolve, reject) {

		var column = _this3._addColumn(definition, before, nextToColumn);

		_this3._reIndexColumns();

		if (_this3.table.options.responsiveLayout && _this3.table.modExists("responsiveLayout", true)) {

			_this3.table.modules.responsiveLayout.initialize();
		***REMOVED***

		if (_this3.table.modExists("columnCalcs")) {

			_this3.table.modules.columnCalcs.recalc(_this3.table.rowManager.activeRows);
		***REMOVED***

		_this3.redraw();

		if (_this3.table.modules.layout.getMode() != "fitColumns") {

			column.reinitializeWidth();
		***REMOVED***

		_this3._verticalAlignHeaders();

		_this3.table.rowManager.reinitialize();

		resolve(column);
	***REMOVED***);
***REMOVED***;

//remove column from system

ColumnManager.prototype.deregisterColumn = function (column) {

	var field = column.getField(),
	    index;

	//remove from field list

	if (field) {

		delete this.columnsByField[field];
	***REMOVED***

	//remove from index list

	index = this.columnsByIndex.indexOf(column);

	if (index > -1) {

		this.columnsByIndex.splice(index, 1);
	***REMOVED***

	//remove from column list

	index = this.columns.indexOf(column);

	if (index > -1) {

		this.columns.splice(index, 1);
	***REMOVED***

	if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

		this.table.modules.responsiveLayout.initialize();
	***REMOVED***

	this.redraw();
***REMOVED***;

//redraw columns

ColumnManager.prototype.redraw = function (force) {

	if (force) {

		if (Tabulator.prototype.helpers.elVisible(this.element)) {

			this._verticalAlignHeaders();
		***REMOVED***

		this.table.rowManager.resetScroll();

		this.table.rowManager.reinitialize();
	***REMOVED***

	if (["fitColumns", "fitDataStretch"].indexOf(this.table.modules.layout.getMode()) > -1) {

		this.table.modules.layout.layout();
	***REMOVED*** else {

		if (force) {

			this.table.modules.layout.layout();
		***REMOVED*** else {

			if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

				this.table.modules.responsiveLayout.update();
			***REMOVED***
		***REMOVED***
	***REMOVED***

	if (this.table.modExists("frozenColumns")) {

		this.table.modules.frozenColumns.layout();
	***REMOVED***

	if (this.table.modExists("columnCalcs")) {

		this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
	***REMOVED***

	if (force) {

		if (this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.columns) {

			this.table.modules.persistence.save("columns");
		***REMOVED***

		if (this.table.modExists("columnCalcs")) {

			this.table.modules.columnCalcs.redraw();
		***REMOVED***
	***REMOVED***

	this.table.footerManager.redraw();
***REMOVED***;

//public column object
var ColumnComponent = function ColumnComponent(column) {
	this._column = column;
	this.type = "ColumnComponent";
***REMOVED***;

ColumnComponent.prototype.getElement = function () {
	return this._column.getElement();
***REMOVED***;

ColumnComponent.prototype.getDefinition = function () {
	return this._column.getDefinition();
***REMOVED***;

ColumnComponent.prototype.getField = function () {
	return this._column.getField();
***REMOVED***;

ColumnComponent.prototype.getCells = function () {
	var cells = [];

	this._column.cells.forEach(function (cell) {
		cells.push(cell.getComponent());
	***REMOVED***);

	return cells;
***REMOVED***;

ColumnComponent.prototype.getVisibility = function () {
	return this._column.visible;
***REMOVED***;

ColumnComponent.prototype.show = function () {
	if (this._column.isGroup) {
		this._column.columns.forEach(function (column) {
			column.show();
		***REMOVED***);
	***REMOVED*** else {
		this._column.show();
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.hide = function () {
	if (this._column.isGroup) {
		this._column.columns.forEach(function (column) {
			column.hide();
		***REMOVED***);
	***REMOVED*** else {
		this._column.hide();
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.toggle = function () {
	if (this._column.visible) {
		this.hide();
	***REMOVED*** else {
		this.show();
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.delete = function () {
	return this._column.delete();
***REMOVED***;

ColumnComponent.prototype.getSubColumns = function () {
	var output = [];

	if (this._column.columns.length) {
		this._column.columns.forEach(function (column) {
			output.push(column.getComponent());
		***REMOVED***);
	***REMOVED***

	return output;
***REMOVED***;

ColumnComponent.prototype.getParentColumn = function () {
	return this._column.parent instanceof Column ? this._column.parent.getComponent() : false;
***REMOVED***;

ColumnComponent.prototype._getSelf = function () {
	return this._column;
***REMOVED***;

ColumnComponent.prototype.scrollTo = function () {
	return this._column.table.columnManager.scrollToColumn(this._column);
***REMOVED***;

ColumnComponent.prototype.getTable = function () {
	return this._column.table;
***REMOVED***;

ColumnComponent.prototype.headerFilterFocus = function () {
	if (this._column.table.modExists("filter", true)) {
		this._column.table.modules.filter.setHeaderFilterFocus(this._column);
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.reloadHeaderFilter = function () {
	if (this._column.table.modExists("filter", true)) {
		this._column.table.modules.filter.reloadHeaderFilter(this._column);
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.getHeaderFilterValue = function () {
	if (this._column.table.modExists("filter", true)) {
		this._column.table.modules.filter.getHeaderFilterValue(this._column);
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.setHeaderFilterValue = function (value) {
	if (this._column.table.modExists("filter", true)) {
		this._column.table.modules.filter.setHeaderFilterValue(this._column, value);
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.move = function (to, after) {
	var toColumn = this._column.table.columnManager.findColumn(to);

	if (toColumn) {
		this._column.table.columnManager.moveColumn(this._column, toColumn, after);
	***REMOVED*** else {
		console.warn("Move Error - No matching column found:", toColumn);
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.getNextColumn = function () {
	var nextCol = this._column.nextColumn();

	return nextCol ? nextCol.getComponent() : false;
***REMOVED***;

ColumnComponent.prototype.getPrevColumn = function () {
	var prevCol = this._column.prevColumn();

	return prevCol ? prevCol.getComponent() : false;
***REMOVED***;

ColumnComponent.prototype.updateDefinition = function (updates) {
	return this._column.updateDefinition(updates);
***REMOVED***;

var Column = function Column(def, parent) {
	var self = this;

	this.table = parent.table;
	this.definition = def; //column definition
	this.parent = parent; //hold parent object
	this.type = "column"; //type of element
	this.columns = []; //child columns
	this.cells = []; //cells bound to this column
	this.element = this.createElement(); //column header element
	this.contentElement = false;
	this.titleElement = false;
	this.groupElement = this.createGroupElement(); //column group holder element
	this.isGroup = false;
	this.tooltip = false; //hold column tooltip
	this.hozAlign = ""; //horizontal text alignment
	this.vertAlign = ""; //vert text alignment

	//multi dimensional filed handling
	this.field = "";
	this.fieldStructure = "";
	this.getFieldValue = "";
	this.setFieldValue = "";

	this.titleFormatterRendered = false;

	this.setField(this.definition.field);

	if (this.table.options.invalidOptionWarnings) {
		this.checkDefinition();
	***REMOVED***

	this.modules = {***REMOVED***; //hold module variables;

	this.cellEvents = {
		cellClick: false,
		cellDblClick: false,
		cellContext: false,
		cellTap: false,
		cellDblTap: false,
		cellTapHold: false,
		cellMouseEnter: false,
		cellMouseLeave: false,
		cellMouseOver: false,
		cellMouseOut: false,
		cellMouseMove: false
	***REMOVED***;

	this.width = null; //column width
	this.widthStyled = ""; //column width prestyled to improve render efficiency
	this.minWidth = null; //column minimum width
	this.minWidthStyled = ""; //column minimum prestyled to improve render efficiency
	this.widthFixed = false; //user has specified a width for this column

	this.visible = true; //default visible state

	this._mapDepricatedFunctionality();

	//initialize column
	if (def.columns) {

		this.isGroup = true;

		def.columns.forEach(function (def, i) {
			var newCol = new Column(def, self);
			self.attachColumn(newCol);
		***REMOVED***);

		self.checkColumnVisibility();
	***REMOVED*** else {
		parent.registerColumnField(this);
	***REMOVED***

	if (def.rowHandle && this.table.options.movableRows !== false && this.table.modExists("moveRow")) {
		this.table.modules.moveRow.setHandle(true);
	***REMOVED***

	this._buildHeader();

	this.bindModuleColumns();
***REMOVED***;

Column.prototype.createElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-col");
	el.setAttribute("role", "columnheader");
	el.setAttribute("aria-sort", "none");

	return el;
***REMOVED***;

Column.prototype.createGroupElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-col-group-cols");

	return el;
***REMOVED***;

Column.prototype.checkDefinition = function () {
	var _this4 = this;

	Object.keys(this.definition).forEach(function (key) {
		if (_this4.defaultOptionList.indexOf(key) === -1) {
			console.warn("Invalid column definition option in '" + (_this4.field || _this4.definition.title) + "' column:", key);
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Column.prototype.setField = function (field) {
	this.field = field;
	this.fieldStructure = field ? this.table.options.nestedFieldSeparator ? field.split(this.table.options.nestedFieldSeparator) : [field] : [];
	this.getFieldValue = this.fieldStructure.length > 1 ? this._getNestedData : this._getFlatData;
	this.setFieldValue = this.fieldStructure.length > 1 ? this._setNestedData : this._setFlatData;
***REMOVED***;

//register column position with column manager
Column.prototype.registerColumnPosition = function (column) {
	this.parent.registerColumnPosition(column);
***REMOVED***;

//register column position with column manager
Column.prototype.registerColumnField = function (column) {
	this.parent.registerColumnField(column);
***REMOVED***;

//trigger position registration
Column.prototype.reRegisterPosition = function () {
	if (this.isGroup) {
		this.columns.forEach(function (column) {
			column.reRegisterPosition();
		***REMOVED***);
	***REMOVED*** else {
		this.registerColumnPosition(this);
	***REMOVED***
***REMOVED***;

Column.prototype._mapDepricatedFunctionality = function () {
	if (typeof this.definition.hideInHtml !== "undefined") {
		this.definition.htmlOutput = !this.definition.hideInHtml;
		console.warn("hideInHtml column definition property is deprecated, you should now use htmlOutput");
	***REMOVED***

	if (typeof this.definition.align !== "undefined") {
		this.definition.hozAlign = this.definition.align;
		console.warn("align column definition property is deprecated, you should now use hozAlign");
	***REMOVED***
***REMOVED***;

Column.prototype.setTooltip = function () {
	var self = this,
	    def = self.definition;

	//set header tooltips
	var tooltip = def.headerTooltip || def.tooltip === false ? def.headerTooltip : self.table.options.tooltipsHeader;

	if (tooltip) {
		if (tooltip === true) {
			if (def.field) {
				self.table.modules.localize.bind("columns|" + def.field, function (value) {
					self.element.setAttribute("title", value || def.title);
				***REMOVED***);
			***REMOVED*** else {
				self.element.setAttribute("title", def.title);
			***REMOVED***
		***REMOVED*** else {
			if (typeof tooltip == "function") {
				tooltip = tooltip(self.getComponent());

				if (tooltip === false) {
					tooltip = "";
				***REMOVED***
			***REMOVED***

			self.element.setAttribute("title", tooltip);
		***REMOVED***
	***REMOVED*** else {
		self.element.setAttribute("title", "");
	***REMOVED***
***REMOVED***;

//build header element
Column.prototype._buildHeader = function () {
	var self = this,
	    def = self.definition;

	while (self.element.firstChild) {
		self.element.removeChild(self.element.firstChild);
	***REMOVED***if (def.headerVertical) {
		self.element.classList.add("tabulator-col-vertical");

		if (def.headerVertical === "flip") {
			self.element.classList.add("tabulator-col-vertical-flip");
		***REMOVED***
	***REMOVED***

	self.contentElement = self._bindEvents();

	self.contentElement = self._buildColumnHeaderContent();

	self.element.appendChild(self.contentElement);

	if (self.isGroup) {
		self._buildGroupHeader();
	***REMOVED*** else {
		self._buildColumnHeader();
	***REMOVED***

	self.setTooltip();

	//set resizable handles
	if (self.table.options.resizableColumns && self.table.modExists("resizeColumns")) {
		self.table.modules.resizeColumns.initializeColumn("header", self, self.element);
	***REMOVED***

	//set resizable handles
	if (def.headerFilter && self.table.modExists("filter") && self.table.modExists("edit")) {
		if (typeof def.headerFilterPlaceholder !== "undefined" && def.field) {
			self.table.modules.localize.setHeaderFilterColumnPlaceholder(def.field, def.headerFilterPlaceholder);
		***REMOVED***

		self.table.modules.filter.initializeColumn(self);
	***REMOVED***

	//set resizable handles
	if (self.table.modExists("frozenColumns")) {
		self.table.modules.frozenColumns.initializeColumn(self);
	***REMOVED***

	//set movable column
	if (self.table.options.movableColumns && !self.isGroup && self.table.modExists("moveColumn")) {
		self.table.modules.moveColumn.initializeColumn(self);
	***REMOVED***

	//set calcs column
	if ((def.topCalc || def.bottomCalc) && self.table.modExists("columnCalcs")) {
		self.table.modules.columnCalcs.initializeColumn(self);
	***REMOVED***

	//handle persistence
	if (self.table.modExists("persistence") && self.table.modules.persistence.config.columns) {
		self.table.modules.persistence.initializeColumn(self);
	***REMOVED***

	//update header tooltip on mouse enter
	self.element.addEventListener("mouseenter", function (e) {
		self.setTooltip();
	***REMOVED***);
***REMOVED***;

Column.prototype._bindEvents = function () {

	var self = this,
	    def = self.definition,
	    dblTap,
	    tapHold,
	    tap;

	//setup header click event bindings
	if (typeof def.headerClick == "function") {
		self.element.addEventListener("click", function (e) {
			def.headerClick(e, self.getComponent());
		***REMOVED***);
	***REMOVED***

	if (typeof def.headerDblClick == "function") {
		self.element.addEventListener("dblclick", function (e) {
			def.headerDblClick(e, self.getComponent());
		***REMOVED***);
	***REMOVED***

	if (typeof def.headerContext == "function") {
		self.element.addEventListener("contextmenu", function (e) {
			def.headerContext(e, self.getComponent());
		***REMOVED***);
	***REMOVED***

	//setup header tap event bindings
	if (typeof def.headerTap == "function") {
		tap = false;

		self.element.addEventListener("touchstart", function (e) {
			tap = true;
		***REMOVED***, { passive: true ***REMOVED***);

		self.element.addEventListener("touchend", function (e) {
			if (tap) {
				def.headerTap(e, self.getComponent());
			***REMOVED***

			tap = false;
		***REMOVED***);
	***REMOVED***

	if (typeof def.headerDblTap == "function") {
		dblTap = null;

		self.element.addEventListener("touchend", function (e) {

			if (dblTap) {
				clearTimeout(dblTap);
				dblTap = null;

				def.headerDblTap(e, self.getComponent());
			***REMOVED*** else {

				dblTap = setTimeout(function () {
					clearTimeout(dblTap);
					dblTap = null;
				***REMOVED***, 300);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (typeof def.headerTapHold == "function") {
		tapHold = null;

		self.element.addEventListener("touchstart", function (e) {
			clearTimeout(tapHold);

			tapHold = setTimeout(function () {
				clearTimeout(tapHold);
				tapHold = null;
				tap = false;
				def.headerTapHold(e, self.getComponent());
			***REMOVED***, 1000);
		***REMOVED***, { passive: true ***REMOVED***);

		self.element.addEventListener("touchend", function (e) {
			clearTimeout(tapHold);
			tapHold = null;
		***REMOVED***);
	***REMOVED***

	//store column cell click event bindings
	if (typeof def.cellClick == "function") {
		self.cellEvents.cellClick = def.cellClick;
	***REMOVED***

	if (typeof def.cellDblClick == "function") {
		self.cellEvents.cellDblClick = def.cellDblClick;
	***REMOVED***

	if (typeof def.cellContext == "function") {
		self.cellEvents.cellContext = def.cellContext;
	***REMOVED***

	//store column mouse event bindings
	if (typeof def.cellMouseEnter == "function") {
		self.cellEvents.cellMouseEnter = def.cellMouseEnter;
	***REMOVED***

	if (typeof def.cellMouseLeave == "function") {
		self.cellEvents.cellMouseLeave = def.cellMouseLeave;
	***REMOVED***

	if (typeof def.cellMouseOver == "function") {
		self.cellEvents.cellMouseOver = def.cellMouseOver;
	***REMOVED***

	if (typeof def.cellMouseOut == "function") {
		self.cellEvents.cellMouseOut = def.cellMouseOut;
	***REMOVED***

	if (typeof def.cellMouseMove == "function") {
		self.cellEvents.cellMouseMove = def.cellMouseMove;
	***REMOVED***

	//setup column cell tap event bindings
	if (typeof def.cellTap == "function") {
		self.cellEvents.cellTap = def.cellTap;
	***REMOVED***

	if (typeof def.cellDblTap == "function") {
		self.cellEvents.cellDblTap = def.cellDblTap;
	***REMOVED***

	if (typeof def.cellTapHold == "function") {
		self.cellEvents.cellTapHold = def.cellTapHold;
	***REMOVED***

	//setup column cell edit callbacks
	if (typeof def.cellEdited == "function") {
		self.cellEvents.cellEdited = def.cellEdited;
	***REMOVED***

	if (typeof def.cellEditing == "function") {
		self.cellEvents.cellEditing = def.cellEditing;
	***REMOVED***

	if (typeof def.cellEditCancelled == "function") {
		self.cellEvents.cellEditCancelled = def.cellEditCancelled;
	***REMOVED***
***REMOVED***;

//build header element for header
Column.prototype._buildColumnHeader = function () {
	var self = this,
	    def = self.definition,
	    table = self.table,
	    sortable;

	//set column sorter
	if (table.modExists("sort")) {
		table.modules.sort.initializeColumn(self, self.contentElement);
	***REMOVED***

	//set column header context menu
	if ((def.headerContextMenu || def.headerMenu) && table.modExists("menu")) {
		table.modules.menu.initializeColumnHeader(self);
	***REMOVED***

	//set column formatter
	if (table.modExists("format")) {
		table.modules.format.initializeColumn(self);
	***REMOVED***

	//set column editor
	if (typeof def.editor != "undefined" && table.modExists("edit")) {
		table.modules.edit.initializeColumn(self);
	***REMOVED***

	//set colum validator
	if (typeof def.validator != "undefined" && table.modExists("validate")) {
		table.modules.validate.initializeColumn(self);
	***REMOVED***

	//set column mutator
	if (table.modExists("mutator")) {
		table.modules.mutator.initializeColumn(self);
	***REMOVED***

	//set column accessor
	if (table.modExists("accessor")) {
		table.modules.accessor.initializeColumn(self);
	***REMOVED***

	//set respoviveLayout
	if (_typeof(table.options.responsiveLayout) && table.modExists("responsiveLayout")) {
		table.modules.responsiveLayout.initializeColumn(self);
	***REMOVED***

	//set column visibility
	if (typeof def.visible != "undefined") {
		if (def.visible) {
			self.show(true);
		***REMOVED*** else {
			self.hide(true);
		***REMOVED***
	***REMOVED***

	//asign additional css classes to column header
	if (def.cssClass) {
		var classeNames = def.cssClass.split(" ");
		classeNames.forEach(function (className) {
			self.element.classList.add(className);
		***REMOVED***);
	***REMOVED***

	if (def.field) {
		this.element.setAttribute("tabulator-field", def.field);
	***REMOVED***

	//set min width if present
	self.setMinWidth(typeof def.minWidth == "undefined" ? self.table.options.columnMinWidth : parseInt(def.minWidth));

	self.reinitializeWidth();

	//set tooltip if present
	self.tooltip = self.definition.tooltip || self.definition.tooltip === false ? self.definition.tooltip : self.table.options.tooltips;

	//set orizontal text alignment
	self.hozAlign = typeof self.definition.hozAlign == "undefined" ? self.table.options.cellHozAlign : self.definition.hozAlign;
	self.vertAlign = typeof self.definition.vertAlign == "undefined" ? self.table.options.cellVertAlign : self.definition.vertAlign;
***REMOVED***;

Column.prototype._buildColumnHeaderContent = function () {
	var def = this.definition,
	    table = this.table;

	var contentElement = document.createElement("div");
	contentElement.classList.add("tabulator-col-content");

	this.titleElement = this._buildColumnHeaderTitle();

	contentElement.appendChild(this.titleElement);

	return contentElement;
***REMOVED***;

//build title element of column
Column.prototype._buildColumnHeaderTitle = function () {
	var self = this,
	    def = self.definition,
	    table = self.table,
	    title;

	var titleHolderElement = document.createElement("div");
	titleHolderElement.classList.add("tabulator-col-title");

	if (def.editableTitle) {
		var titleElement = document.createElement("input");
		titleElement.classList.add("tabulator-title-editor");

		titleElement.addEventListener("click", function (e) {
			e.stopPropagation();
			titleElement.focus();
		***REMOVED***);

		titleElement.addEventListener("change", function () {
			def.title = titleElement.value;
			table.options.columnTitleChanged.call(self.table, self.getComponent());
		***REMOVED***);

		titleHolderElement.appendChild(titleElement);

		if (def.field) {
			table.modules.localize.bind("columns|" + def.field, function (text) {
				titleElement.value = text || def.title || "&nbsp;";
			***REMOVED***);
		***REMOVED*** else {
			titleElement.value = def.title || "&nbsp;";
		***REMOVED***
	***REMOVED*** else {
		if (def.field) {
			table.modules.localize.bind("columns|" + def.field, function (text) {
				self._formatColumnHeaderTitle(titleHolderElement, text || def.title || "&nbsp;");
			***REMOVED***);
		***REMOVED*** else {
			self._formatColumnHeaderTitle(titleHolderElement, def.title || "&nbsp;");
		***REMOVED***
	***REMOVED***

	return titleHolderElement;
***REMOVED***;

Column.prototype._formatColumnHeaderTitle = function (el, title) {
	var _this5 = this;

	var formatter, contents, params, mockCell, onRendered;

	if (this.definition.titleFormatter && this.table.modExists("format")) {

		formatter = this.table.modules.format.getFormatter(this.definition.titleFormatter);

		onRendered = function onRendered(callback) {
			_this5.titleFormatterRendered = callback;
		***REMOVED***;

		mockCell = {
			getValue: function getValue() {
				return title;
			***REMOVED***,
			getElement: function getElement() {
				return el;
			***REMOVED***
		***REMOVED***;

		params = this.definition.titleFormatterParams || {***REMOVED***;

		params = typeof params === "function" ? params() : params;

		contents = formatter.call(this.table.modules.format, mockCell, params, onRendered);

		switch (typeof contents === 'undefined' ? 'undefined' : _typeof(contents)) {
			case "object":
				if (contents instanceof Node) {
					el.appendChild(contents);
				***REMOVED*** else {
					el.innerHTML = "";
					console.warn("Format Error - Title formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:", contents);
				***REMOVED***
				break;
			case "undefined":
			case "null":
				el.innerHTML = "";
				break;
			default:
				el.innerHTML = contents;
		***REMOVED***
	***REMOVED*** else {
		el.innerHTML = title;
	***REMOVED***
***REMOVED***;

//build header element for column group
Column.prototype._buildGroupHeader = function () {
	var _this6 = this;

	this.element.classList.add("tabulator-col-group");
	this.element.setAttribute("role", "columngroup");
	this.element.setAttribute("aria-title", this.definition.title);

	//asign additional css classes to column header
	if (this.definition.cssClass) {
		var classeNames = this.definition.cssClass.split(" ");
		classeNames.forEach(function (className) {
			_this6.element.classList.add(className);
		***REMOVED***);
	***REMOVED***

	this.element.appendChild(this.groupElement);
***REMOVED***;

//flat field lookup
Column.prototype._getFlatData = function (data) {
	return data[this.field];
***REMOVED***;

//nested field lookup
Column.prototype._getNestedData = function (data) {
	var dataObj = data,
	    structure = this.fieldStructure,
	    length = structure.length,
	    output;

	for (var i = 0; i < length; i++) {

		dataObj = dataObj[structure[i]];

		output = dataObj;

		if (!dataObj) {
			break;
		***REMOVED***
	***REMOVED***

	return output;
***REMOVED***;

//flat field set
Column.prototype._setFlatData = function (data, value) {
	if (this.field) {
		data[this.field] = value;
	***REMOVED***
***REMOVED***;

//nested field set
Column.prototype._setNestedData = function (data, value) {
	var dataObj = data,
	    structure = this.fieldStructure,
	    length = structure.length;

	for (var i = 0; i < length; i++) {

		if (i == length - 1) {
			dataObj[structure[i]] = value;
		***REMOVED*** else {
			if (!dataObj[structure[i]]) {
				if (typeof value !== "undefined") {
					dataObj[structure[i]] = {***REMOVED***;
				***REMOVED*** else {
					break;
				***REMOVED***
			***REMOVED***

			dataObj = dataObj[structure[i]];
		***REMOVED***
	***REMOVED***
***REMOVED***;

//attach column to this group
Column.prototype.attachColumn = function (column) {
	var self = this;

	if (self.groupElement) {
		self.columns.push(column);
		self.groupElement.appendChild(column.getElement());
	***REMOVED*** else {
		console.warn("Column Warning - Column being attached to another column instead of column group");
	***REMOVED***
***REMOVED***;

//vertically align header in column
Column.prototype.verticalAlign = function (alignment, height) {

	//calculate height of column header and group holder element
	var parentHeight = this.parent.isGroup ? this.parent.getGroupElement().clientHeight : height || this.parent.getHeadersElement().clientHeight;
	// var parentHeight = this.parent.isGroup ? this.parent.getGroupElement().clientHeight : this.parent.getHeadersElement().clientHeight;

	this.element.style.height = parentHeight + "px";

	if (this.isGroup) {
		this.groupElement.style.minHeight = parentHeight - this.contentElement.offsetHeight + "px";
	***REMOVED***

	//vertically align cell contents
	if (!this.isGroup && alignment !== "top") {
		if (alignment === "bottom") {
			this.element.style.paddingTop = this.element.clientHeight - this.contentElement.offsetHeight + "px";
		***REMOVED*** else {
			this.element.style.paddingTop = (this.element.clientHeight - this.contentElement.offsetHeight) / 2 + "px";
		***REMOVED***
	***REMOVED***

	this.columns.forEach(function (column) {
		column.verticalAlign(alignment);
	***REMOVED***);
***REMOVED***;

//clear vertical alignmenet
Column.prototype.clearVerticalAlign = function () {
	this.element.style.paddingTop = "";
	this.element.style.height = "";
	this.element.style.minHeight = "";
	this.groupElement.style.minHeight = "";

	this.columns.forEach(function (column) {
		column.clearVerticalAlign();
	***REMOVED***);
***REMOVED***;

Column.prototype.bindModuleColumns = function () {
	//check if rownum formatter is being used on a column
	if (this.definition.formatter == "rownum") {
		this.table.rowManager.rowNumColumn = this;
	***REMOVED***
***REMOVED***;

//// Retreive Column Information ////

//return column header element
Column.prototype.getElement = function () {
	return this.element;
***REMOVED***;

//return colunm group element
Column.prototype.getGroupElement = function () {
	return this.groupElement;
***REMOVED***;

//return field name
Column.prototype.getField = function () {
	return this.field;
***REMOVED***;

//return the first column in a group
Column.prototype.getFirstColumn = function () {
	if (!this.isGroup) {
		return this;
	***REMOVED*** else {
		if (this.columns.length) {
			return this.columns[0].getFirstColumn();
		***REMOVED*** else {
			return false;
		***REMOVED***
	***REMOVED***
***REMOVED***;

//return the last column in a group
Column.prototype.getLastColumn = function () {
	if (!this.isGroup) {
		return this;
	***REMOVED*** else {
		if (this.columns.length) {
			return this.columns[this.columns.length - 1].getLastColumn();
		***REMOVED*** else {
			return false;
		***REMOVED***
	***REMOVED***
***REMOVED***;

//return all columns in a group
Column.prototype.getColumns = function () {
	return this.columns;
***REMOVED***;

//return all columns in a group
Column.prototype.getCells = function () {
	return this.cells;
***REMOVED***;

//retreive the top column in a group of columns
Column.prototype.getTopColumn = function () {
	if (this.parent.isGroup) {
		return this.parent.getTopColumn();
	***REMOVED*** else {
		return this;
	***REMOVED***
***REMOVED***;

//return column definition object
Column.prototype.getDefinition = function (updateBranches) {
	var colDefs = [];

	if (this.isGroup && updateBranches) {
		this.columns.forEach(function (column) {
			colDefs.push(column.getDefinition(true));
		***REMOVED***);

		this.definition.columns = colDefs;
	***REMOVED***

	return this.definition;
***REMOVED***;

//////////////////// Actions ////////////////////

Column.prototype.checkColumnVisibility = function () {
	var visible = false;

	this.columns.forEach(function (column) {
		if (column.visible) {
			visible = true;
		***REMOVED***
	***REMOVED***);

	if (visible) {
		this.show();
		this.parent.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), false);
	***REMOVED*** else {
		this.hide();
	***REMOVED***
***REMOVED***;

//show column
Column.prototype.show = function (silent, responsiveToggle) {
	if (!this.visible) {
		this.visible = true;

		this.element.style.display = "";

		if (this.parent.isGroup) {
			this.parent.checkColumnVisibility();
		***REMOVED***

		this.cells.forEach(function (cell) {
			cell.show();
		***REMOVED***);

		if (!this.isGroup && this.width === null) {
			this.reinitializeWidth();
		***REMOVED***

		this.table.columnManager._verticalAlignHeaders();

		if (this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.columns) {
			this.table.modules.persistence.save("columns");
		***REMOVED***

		if (!responsiveToggle && this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {
			this.table.modules.responsiveLayout.updateColumnVisibility(this, this.visible);
		***REMOVED***

		if (!silent) {
			this.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), true);
		***REMOVED***

		if (this.parent.isGroup) {
			this.parent.matchChildWidths();
		***REMOVED***
	***REMOVED***
***REMOVED***;

//hide column
Column.prototype.hide = function (silent, responsiveToggle) {
	if (this.visible) {
		this.visible = false;

		this.element.style.display = "none";

		this.table.columnManager._verticalAlignHeaders();

		if (this.parent.isGroup) {
			this.parent.checkColumnVisibility();
		***REMOVED***

		this.cells.forEach(function (cell) {
			cell.hide();
		***REMOVED***);

		if (this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.columns) {
			this.table.modules.persistence.save("columns");
		***REMOVED***

		if (!responsiveToggle && this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {
			this.table.modules.responsiveLayout.updateColumnVisibility(this, this.visible);
		***REMOVED***

		if (!silent) {
			this.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), false);
		***REMOVED***

		if (this.parent.isGroup) {
			this.parent.matchChildWidths();
		***REMOVED***
	***REMOVED***
***REMOVED***;

Column.prototype.matchChildWidths = function () {
	var childWidth = 0;

	if (this.contentElement && this.columns.length) {
		this.columns.forEach(function (column) {
			if (column.visible) {
				childWidth += column.getWidth();
			***REMOVED***
		***REMOVED***);

		this.contentElement.style.maxWidth = childWidth - 1 + "px";

		if (this.parent.isGroup) {
			this.parent.matchChildWidths();
		***REMOVED***
	***REMOVED***
***REMOVED***;

Column.prototype.setWidth = function (width) {
	this.widthFixed = true;
	this.setWidthActual(width);
***REMOVED***;

Column.prototype.setWidthActual = function (width) {
	if (isNaN(width)) {
		width = Math.floor(this.table.element.clientWidth / 100***REMOVED*** parseInt(width));
	***REMOVED***

	width = Math.max(this.minWidth, width);

	this.width = width;
	this.widthStyled = width ? width + "px" : "";

	this.element.style.width = this.widthStyled;

	if (!this.isGroup) {
		this.cells.forEach(function (cell) {
			cell.setWidth();
		***REMOVED***);
	***REMOVED***

	if (this.parent.isGroup) {
		this.parent.matchChildWidths();
	***REMOVED***

	//set resizable handles
	if (this.table.modExists("frozenColumns")) {
		this.table.modules.frozenColumns.layout();
	***REMOVED***
***REMOVED***;

Column.prototype.checkCellHeights = function () {
	var rows = [];

	this.cells.forEach(function (cell) {
		if (cell.row.heightInitialized) {
			if (cell.row.getElement().offsetParent !== null) {
				rows.push(cell.row);
				cell.row.clearCellHeight();
			***REMOVED*** else {
				cell.row.heightInitialized = false;
			***REMOVED***
		***REMOVED***
	***REMOVED***);

	rows.forEach(function (row) {
		row.calcHeight();
	***REMOVED***);

	rows.forEach(function (row) {
		row.setCellHeight();
	***REMOVED***);
***REMOVED***;

Column.prototype.getWidth = function () {
	var width = 0;

	if (this.isGroup) {
		this.columns.forEach(function (column) {
			if (column.visible) {
				width += column.getWidth();
			***REMOVED***
		***REMOVED***);
	***REMOVED*** else {
		width = this.width;
	***REMOVED***

	return width;
***REMOVED***;

Column.prototype.getHeight = function () {
	return this.element.offsetHeight;
***REMOVED***;

Column.prototype.setMinWidth = function (minWidth) {
	this.minWidth = minWidth;
	this.minWidthStyled = minWidth ? minWidth + "px" : "";

	this.element.style.minWidth = this.minWidthStyled;

	this.cells.forEach(function (cell) {
		cell.setMinWidth();
	***REMOVED***);
***REMOVED***;

Column.prototype.delete = function () {
	var _this7 = this;

	return new Promise(function (resolve, reject) {

		if (_this7.isGroup) {
			_this7.columns.forEach(function (column) {
				column.delete();
			***REMOVED***);
		***REMOVED***

		var cellCount = _this7.cells.length;

		for (var i = 0; i < cellCount; i++) {
			_this7.cells[0].delete();
		***REMOVED***

		_this7.element.parentNode.removeChild(_this7.element);

		_this7.table.columnManager.deregisterColumn(_this7);

		resolve();
	***REMOVED***);
***REMOVED***;

Column.prototype.columnRendered = function () {
	if (this.titleFormatterRendered) {
		this.titleFormatterRendered();
	***REMOVED***
***REMOVED***;

//////////////// Cell Management /////////////////

//generate cell for this column
Column.prototype.generateCell = function (row) {
	var self = this;

	var cell = new Cell(self, row);

	this.cells.push(cell);

	return cell;
***REMOVED***;

Column.prototype.nextColumn = function () {
	var index = this.table.columnManager.findColumnIndex(this);
	return index > -1 ? this._nextVisibleColumn(index + 1) : false;
***REMOVED***;

Column.prototype._nextVisibleColumn = function (index) {
	var column = this.table.columnManager.getColumnByIndex(index);
	return !column || column.visible ? column : this._nextVisibleColumn(index + 1);
***REMOVED***;

Column.prototype.prevColumn = function () {
	var index = this.table.columnManager.findColumnIndex(this);
	return index > -1 ? this._prevVisibleColumn(index - 1) : false;
***REMOVED***;

Column.prototype._prevVisibleColumn = function (index) {
	var column = this.table.columnManager.getColumnByIndex(index);
	return !column || column.visible ? column : this._prevVisibleColumn(index - 1);
***REMOVED***;

Column.prototype.reinitializeWidth = function (force) {
	this.widthFixed = false;

	//set width if present
	if (typeof this.definition.width !== "undefined" && !force) {
		this.setWidth(this.definition.width);
	***REMOVED***

	//hide header filters to prevent them altering column width
	if (this.table.modExists("filter")) {
		this.table.modules.filter.hideHeaderFilterElements();
	***REMOVED***

	this.fitToData();

	//show header filters again after layout is complete
	if (this.table.modExists("filter")) {
		this.table.modules.filter.showHeaderFilterElements();
	***REMOVED***
***REMOVED***;

//set column width to maximum cell width
Column.prototype.fitToData = function () {
	var self = this;

	if (!this.widthFixed) {
		this.element.style.width = "";

		self.cells.forEach(function (cell) {
			cell.clearWidth();
		***REMOVED***);
	***REMOVED***

	var maxWidth = this.element.offsetWidth;

	if (!self.width || !this.widthFixed) {
		self.cells.forEach(function (cell) {
			var width = cell.getWidth();

			if (width > maxWidth) {
				maxWidth = width;
			***REMOVED***
		***REMOVED***);

		if (maxWidth) {
			self.setWidthActual(maxWidth + 1);
		***REMOVED***
	***REMOVED***
***REMOVED***;

Column.prototype.updateDefinition = function (updates) {
	var _this8 = this;

	return new Promise(function (resolve, reject) {
		var definition;

		if (!_this8.isGroup) {
			definition = Object.assign({***REMOVED***, _this8.getDefinition());
			definition = Object.assign(definition, updates);

			_this8.table.columnManager.addColumn(definition, false, _this8).then(function (column) {

				if (definition.field == _this8.field) {
					_this8.field = false; //cleair field name to prevent deletion of duplicate column from arrays
				***REMOVED***

				_this8.delete().then(function () {
					resolve(column.getComponent());
				***REMOVED***).catch(function (err) {
					reject(err);
				***REMOVED***);
			***REMOVED***).catch(function (err) {
				reject(err);
			***REMOVED***);
		***REMOVED*** else {
			console.warn("Column Update Error - The updateDefintion function is only available on columns, not column groups");
			reject("Column Update Error - The updateDefintion function is only available on columns, not column groups");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Column.prototype.deleteCell = function (cell) {
	var index = this.cells.indexOf(cell);

	if (index > -1) {
		this.cells.splice(index, 1);
	***REMOVED***
***REMOVED***;

Column.prototype.defaultOptionList = ["title", "field", "columns", "visible", "align", "hozAlign", "vertAlign", "width", "minWidth", "widthGrow", "widthShrink", "resizable", "frozen", "responsive", "tooltip", "cssClass", "rowHandle", "hideInHtml", "print", "htmlOutput", "sorter", "sorterParams", "formatter", "formatterParams", "variableHeight", "editable", "editor", "editorParams", "validator", "mutator", "mutatorParams", "mutatorData", "mutatorDataParams", "mutatorEdit", "mutatorEditParams", "mutatorClipboard", "mutatorClipboardParams", "accessor", "accessorParams", "accessorData", "accessorDataParams", "accessorDownload", "accessorDownloadParams", "accessorClipboard", "accessorClipboardParams", "accessorPrint", "accessorPrintParams", "accessorHtmlOutput", "accessorHtmlOutputParams", "clipboard", "download", "downloadTitle", "topCalc", "topCalcParams", "topCalcFormatter", "topCalcFormatterParams", "bottomCalc", "bottomCalcParams", "bottomCalcFormatter", "bottomCalcFormatterParams", "cellClick", "cellDblClick", "cellContext", "cellTap", "cellDblTap", "cellTapHold", "cellMouseEnter", "cellMouseLeave", "cellMouseOver", "cellMouseOut", "cellMouseMove", "cellEditing", "cellEdited", "cellEditCancelled", "headerSort", "headerSortStartingDir", "headerSortTristate", "headerClick", "headerDblClick", "headerContext", "headerTap", "headerDblTap", "headerTapHold", "headerTooltip", "headerVertical", "editableTitle", "titleFormatter", "titleFormatterParams", "headerFilter", "headerFilterPlaceholder", "headerFilterParams", "headerFilterEmptyCheck", "headerFilterFunc", "headerFilterFuncParams", "headerFilterLiveFilter", "print", "headerContextMenu", "headerMenu", "contextMenu", "formatterPrint", "formatterPrintParams", "formatterClipboard", "formatterClipboardParams", "formatterHtmlOutput", "formatterHtmlOutputParams"];

//////////////// Event Bindings /////////////////

//////////////// Object Generation /////////////////
Column.prototype.getComponent = function () {
	return new ColumnComponent(this);
***REMOVED***;

var RowManager = function RowManager(table) {

	this.table = table;
	this.element = this.createHolderElement(); //containing element
	this.tableElement = this.createTableElement(); //table element
	this.heightFixer = this.createTableElement(); //table element
	this.columnManager = null; //hold column manager object
	this.height = 0; //hold height of table element

	this.firstRender = false; //handle first render
	this.renderMode = "virtual"; //current rendering mode
	this.fixedHeight = false; //current rendering mode

	this.rows = []; //hold row data objects
	this.activeRows = []; //rows currently available to on display in the table
	this.activeRowsCount = 0; //count of active rows

	this.displayRows = []; //rows currently on display in the table
	this.displayRowsCount = 0; //count of display rows

	this.scrollTop = 0;
	this.scrollLeft = 0;

	this.vDomRowHeight = 20; //approximation of row heights for padding

	this.vDomTop = 0; //hold position for first rendered row in the virtual DOM
	this.vDomBottom = 0; //hold possition for last rendered row in the virtual DOM

	this.vDomScrollPosTop = 0; //last scroll position of the vDom top;
	this.vDomScrollPosBottom = 0; //last scroll position of the vDom bottom;

	this.vDomTopPad = 0; //hold value of padding for top of virtual DOM
	this.vDomBottomPad = 0; //hold value of padding for bottom of virtual DOM

	this.vDomMaxRenderChain = 90; //the maximum number of dom elements that can be rendered in 1 go

	this.vDomWindowBuffer = 0; //window row buffer before removing elements, to smooth scrolling

	this.vDomWindowMinTotalRows = 20; //minimum number of rows to be generated in virtual dom (prevent buffering issues on tables with tall rows)
	this.vDomWindowMinMarginRows = 5; //minimum number of rows to be generated in virtual dom margin

	this.vDomTopNewRows = []; //rows to normalize after appending to optimize render speed
	this.vDomBottomNewRows = []; //rows to normalize after appending to optimize render speed

	this.rowNumColumn = false; //hold column component for row number column

	this.redrawBlock = false; //prevent redraws to allow multiple data manipulations becore continuing
	this.redrawBlockRestoreConfig = false; //store latest redraw function calls for when redraw is needed
	this.redrawBlockRederInPosition = false; //store latest redraw function calls for when redraw is needed
***REMOVED***;

//////////////// Setup Functions /////////////////

RowManager.prototype.createHolderElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-tableHolder");
	el.setAttribute("tabindex", 0);

	return el;
***REMOVED***;

RowManager.prototype.createTableElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-table");

	return el;
***REMOVED***;

//return containing element
RowManager.prototype.getElement = function () {
	return this.element;
***REMOVED***;

//return table element
RowManager.prototype.getTableElement = function () {
	return this.tableElement;
***REMOVED***;

//return position of row in table
RowManager.prototype.getRowPosition = function (row, active) {
	if (active) {
		return this.activeRows.indexOf(row);
	***REMOVED*** else {
		return this.rows.indexOf(row);
	***REMOVED***
***REMOVED***;

//link to column manager
RowManager.prototype.setColumnManager = function (manager) {
	this.columnManager = manager;
***REMOVED***;

RowManager.prototype.initialize = function () {
	var self = this;

	self.setRenderMode();

	//initialize manager
	self.element.appendChild(self.tableElement);

	self.firstRender = true;

	//scroll header along with table body
	self.element.addEventListener("scroll", function () {
		var left = self.element.scrollLeft;

		//handle horizontal scrolling
		if (self.scrollLeft != left) {
			self.columnManager.scrollHorizontal(left);

			if (self.table.options.groupBy) {
				self.table.modules.groupRows.scrollHeaders(left);
			***REMOVED***

			if (self.table.modExists("columnCalcs")) {
				self.table.modules.columnCalcs.scrollHorizontal(left);
			***REMOVED***

			self.table.options.scrollHorizontal(left);
		***REMOVED***

		self.scrollLeft = left;
	***REMOVED***);

	//handle virtual dom scrolling
	if (this.renderMode === "virtual") {

		self.element.addEventListener("scroll", function () {
			var top = self.element.scrollTop;
			var dir = self.scrollTop > top;

			//handle verical scrolling
			if (self.scrollTop != top) {
				self.scrollTop = top;
				self.scrollVertical(dir);

				if (self.table.options.ajaxProgressiveLoad == "scroll") {
					self.table.modules.ajax.nextPage(self.element.scrollHeight - self.element.clientHeight - top);
				***REMOVED***

				self.table.options.scrollVertical(top);
			***REMOVED*** else {
				self.scrollTop = top;
			***REMOVED***
		***REMOVED***);
	***REMOVED***
***REMOVED***;

////////////////// Row Manipulation //////////////////

RowManager.prototype.findRow = function (subject) {
	var self = this;

	if ((typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) == "object") {

		if (subject instanceof Row) {
			//subject is row element
			return subject;
		***REMOVED*** else if (subject instanceof RowComponent) {
			//subject is public row component
			return subject._getSelf() || false;
		***REMOVED*** else if (typeof HTMLElement !== "undefined" && subject instanceof HTMLElement) {
			//subject is a HTML element of the row
			var match = self.rows.find(function (row) {
				return row.element === subject;
			***REMOVED***);

			return match || false;
		***REMOVED***
	***REMOVED*** else if (typeof subject == "undefined" || subject === null) {
		return false;
	***REMOVED*** else {
		//subject should be treated as the index of the row
		var _match = self.rows.find(function (row) {
			return row.data[self.table.options.index] == subject;
		***REMOVED***);

		return _match || false;
	***REMOVED***

	//catch all for any other type of input

	return false;
***REMOVED***;

RowManager.prototype.getRowFromDataObject = function (data) {
	var match = this.rows.find(function (row) {
		return row.data === data;
	***REMOVED***);

	return match || false;
***REMOVED***;

RowManager.prototype.getRowFromPosition = function (position, active) {
	if (active) {
		return this.activeRows[position];
	***REMOVED*** else {
		return this.rows[position];
	***REMOVED***
***REMOVED***;

RowManager.prototype.scrollToRow = function (row, position, ifVisible) {
	var _this9 = this;

	var rowIndex = this.getDisplayRows().indexOf(row),
	    rowEl = row.getElement(),
	    rowTop,
	    offset = 0;

	return new Promise(function (resolve, reject) {
		if (rowIndex > -1) {

			if (typeof position === "undefined") {
				position = _this9.table.options.scrollToRowPosition;
			***REMOVED***

			if (typeof ifVisible === "undefined") {
				ifVisible = _this9.table.options.scrollToRowIfVisible;
			***REMOVED***

			if (position === "nearest") {
				switch (_this9.renderMode) {
					case "classic":
						rowTop = Tabulator.prototype.helpers.elOffset(rowEl).top;
						position = Math.abs(_this9.element.scrollTop - rowTop) > Math.abs(_this9.element.scrollTop + _this9.element.clientHeight - rowTop) ? "bottom" : "top";
						break;
					case "virtual":
						position = Math.abs(_this9.vDomTop - rowIndex) > Math.abs(_this9.vDomBottom - rowIndex) ? "bottom" : "top";
						break;
				***REMOVED***
			***REMOVED***

			//check row visibility
			if (!ifVisible) {
				if (Tabulator.prototype.helpers.elVisible(rowEl)) {
					offset = Tabulator.prototype.helpers.elOffset(rowEl).top - Tabulator.prototype.helpers.elOffset(_this9.element).top;

					if (offset > 0 && offset < _this9.element.clientHeight - rowEl.offsetHeight) {
						return false;
					***REMOVED***
				***REMOVED***
			***REMOVED***

			//scroll to row
			switch (_this9.renderMode) {
				case "classic":
					_this9.element.scrollTop = Tabulator.prototype.helpers.elOffset(rowEl).top - Tabulator.prototype.helpers.elOffset(_this9.element).top + _this9.element.scrollTop;
					break;
				case "virtual":
					_this9._virtualRenderFill(rowIndex, true);
					break;
			***REMOVED***

			//align to correct position
			switch (position) {
				case "middle":
				case "center":

					if (_this9.element.scrollHeight - _this9.element.scrollTop == _this9.element.clientHeight) {
						_this9.element.scrollTop = _this9.element.scrollTop + (rowEl.offsetTop - _this9.element.scrollTop) - (_this9.element.scrollHeight - rowEl.offsetTop) / 2;
					***REMOVED*** else {
						_this9.element.scrollTop = _this9.element.scrollTop - _this9.element.clientHeight / 2;
					***REMOVED***

					break;

				case "bottom":

					if (_this9.element.scrollHeight - _this9.element.scrollTop == _this9.element.clientHeight) {
						_this9.element.scrollTop = _this9.element.scrollTop - (_this9.element.scrollHeight - rowEl.offsetTop) + rowEl.offsetHeight;
					***REMOVED*** else {
						_this9.element.scrollTop = _this9.element.scrollTop - _this9.element.clientHeight + rowEl.offsetHeight;
					***REMOVED***

					break;
			***REMOVED***

			resolve();
		***REMOVED*** else {
			console.warn("Scroll Error - Row not visible");
			reject("Scroll Error - Row not visible");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

////////////////// Data Handling //////////////////

RowManager.prototype.setData = function (data, renderInPosition, columnsChanged) {
	var _this10 = this;

	var self = this;

	return new Promise(function (resolve, reject) {
		if (renderInPosition && _this10.getDisplayRows().length) {
			if (self.table.options.pagination) {
				self._setDataActual(data, true);
			***REMOVED*** else {
				_this10.reRenderInPosition(function () {
					self._setDataActual(data);
				***REMOVED***);
			***REMOVED***
		***REMOVED*** else {
			if (_this10.table.options.autoColumns && columnsChanged) {
				_this10.table.columnManager.generateColumnsFromRowData(data);
			***REMOVED***
			_this10.resetScroll();
			_this10._setDataActual(data);
		***REMOVED***

		resolve();
	***REMOVED***);
***REMOVED***;

RowManager.prototype._setDataActual = function (data, renderInPosition) {
	var self = this;

	self.table.options.dataLoading.call(this.table, data);

	this._wipeElements();

	if (this.table.options.history && this.table.modExists("history")) {
		this.table.modules.history.clear();
	***REMOVED***

	if (Array.isArray(data)) {

		if (this.table.modExists("selectRow")) {
			this.table.modules.selectRow.clearSelectionData();
		***REMOVED***

		if (this.table.options.reactiveData && this.table.modExists("reactiveData", true)) {
			this.table.modules.reactiveData.watchData(data);
		***REMOVED***

		data.forEach(function (def, i) {
			if (def && (typeof def === 'undefined' ? 'undefined' : _typeof(def)) === "object") {
				var row = new Row(def, self);
				self.rows.push(row);
			***REMOVED*** else {
				console.warn("Data Loading Warning - Invalid row data detected and ignored, expecting object but received:", def);
			***REMOVED***
		***REMOVED***);

		self.table.options.dataLoaded.call(this.table, data);

		self.refreshActiveData(false, false, renderInPosition);
	***REMOVED*** else {
		console.error("Data Loading Error - Unable to process data due to invalid data type \nExpecting: array \nReceived: ", typeof data === 'undefined' ? 'undefined' : _typeof(data), "\nData:     ", data);
	***REMOVED***
***REMOVED***;

RowManager.prototype._wipeElements = function () {
	this.rows.forEach(function (row) {
		row.wipe();
	***REMOVED***);

	if (this.table.options.groupBy && this.table.modExists("groupRows")) {
		this.table.modules.groupRows.wipe();
	***REMOVED***

	this.rows = [];
***REMOVED***;

RowManager.prototype.deleteRow = function (row, blockRedraw) {
	var allIndex = this.rows.indexOf(row),
	    activeIndex = this.activeRows.indexOf(row);

	if (activeIndex > -1) {
		this.activeRows.splice(activeIndex, 1);
	***REMOVED***

	if (allIndex > -1) {
		this.rows.splice(allIndex, 1);
	***REMOVED***

	this.setActiveRows(this.activeRows);

	this.displayRowIterator(function (rows) {
		var displayIndex = rows.indexOf(row);

		if (displayIndex > -1) {
			rows.splice(displayIndex, 1);
		***REMOVED***
	***REMOVED***);

	if (!blockRedraw) {
		this.reRenderInPosition();
	***REMOVED***

	this.regenerateRowNumbers();

	this.table.options.rowDeleted.call(this.table, row.getComponent());

	this.table.options.dataEdited.call(this.table, this.getData());

	if (this.table.options.groupBy && this.table.modExists("groupRows")) {
		this.table.modules.groupRows.updateGroupRows(true);
	***REMOVED*** else if (this.table.options.pagination && this.table.modExists("page")) {
		this.refreshActiveData(false, false, true);
	***REMOVED*** else {
		if (this.table.options.pagination && this.table.modExists("page")) {
			this.refreshActiveData("page");
		***REMOVED***
	***REMOVED***
***REMOVED***;

RowManager.prototype.addRow = function (data, pos, index, blockRedraw) {

	var row = this.addRowActual(data, pos, index, blockRedraw);

	if (this.table.options.history && this.table.modExists("history")) {
		this.table.modules.history.action("rowAdd", row, { data: data, pos: pos, index: index ***REMOVED***);
	***REMOVED***

	return row;
***REMOVED***;

//add multiple rows
RowManager.prototype.addRows = function (data, pos, index) {
	var _this11 = this;

	var self = this,
	    length = 0,
	    rows = [];

	return new Promise(function (resolve, reject) {
		pos = _this11.findAddRowPos(pos);

		if (!Array.isArray(data)) {
			data = [data];
		***REMOVED***

		length = data.length - 1;

		if (typeof index == "undefined" && pos || typeof index !== "undefined" && !pos) {
			data.reverse();
		***REMOVED***

		data.forEach(function (item, i) {
			var row = self.addRow(item, pos, index, true);
			rows.push(row);
		***REMOVED***);

		if (_this11.table.options.groupBy && _this11.table.modExists("groupRows")) {
			_this11.table.modules.groupRows.updateGroupRows(true);
		***REMOVED*** else if (_this11.table.options.pagination && _this11.table.modExists("page")) {
			_this11.refreshActiveData(false, false, true);
		***REMOVED*** else {
			_this11.reRenderInPosition();
		***REMOVED***

		//recalc column calculations if present
		if (_this11.table.modExists("columnCalcs")) {
			_this11.table.modules.columnCalcs.recalc(_this11.table.rowManager.activeRows);
		***REMOVED***

		_this11.regenerateRowNumbers();
		resolve(rows);
	***REMOVED***);
***REMOVED***;

RowManager.prototype.findAddRowPos = function (pos) {
	if (typeof pos === "undefined") {
		pos = this.table.options.addRowPos;
	***REMOVED***

	if (pos === "pos") {
		pos = true;
	***REMOVED***

	if (pos === "bottom") {
		pos = false;
	***REMOVED***

	return pos;
***REMOVED***;

RowManager.prototype.addRowActual = function (data, pos, index, blockRedraw) {
	var row = data instanceof Row ? data : new Row(data || {***REMOVED***, this),
	    top = this.findAddRowPos(pos),
	    allIndex = -1,
	    activeIndex,
	    dispRows;

	if (!index && this.table.options.pagination && this.table.options.paginationAddRow == "page") {
		dispRows = this.getDisplayRows();

		if (top) {
			if (dispRows.length) {
				index = dispRows[0];
			***REMOVED*** else {
				if (this.activeRows.length) {
					index = this.activeRows[this.activeRows.length - 1];
					top = false;
				***REMOVED***
			***REMOVED***
		***REMOVED*** else {
			if (dispRows.length) {
				index = dispRows[dispRows.length - 1];
				top = dispRows.length < this.table.modules.page.getPageSize() ? false : true;
			***REMOVED***
		***REMOVED***
	***REMOVED***

	if (typeof index !== "undefined") {
		index = this.findRow(index);
	***REMOVED***

	if (this.table.options.groupBy && this.table.modExists("groupRows")) {
		this.table.modules.groupRows.assignRowToGroup(row);

		var groupRows = row.getGroup().rows;

		if (groupRows.length > 1) {

			if (!index || index && groupRows.indexOf(index) == -1) {
				if (top) {
					if (groupRows[0] !== row) {
						index = groupRows[0];
						this._moveRowInArray(row.getGroup().rows, row, index, !top);
					***REMOVED***
				***REMOVED*** else {
					if (groupRows[groupRows.length - 1] !== row) {
						index = groupRows[groupRows.length - 1];
						this._moveRowInArray(row.getGroup().rows, row, index, !top);
					***REMOVED***
				***REMOVED***
			***REMOVED*** else {
				this._moveRowInArray(row.getGroup().rows, row, index, !top);
			***REMOVED***
		***REMOVED***
	***REMOVED***

	if (index) {
		allIndex = this.rows.indexOf(index);
	***REMOVED***

	if (index && allIndex > -1) {
		activeIndex = this.activeRows.indexOf(index);

		this.displayRowIterator(function (rows) {
			var displayIndex = rows.indexOf(index);

			if (displayIndex > -1) {
				rows.splice(top ? displayIndex : displayIndex + 1, 0, row);
			***REMOVED***
		***REMOVED***);

		if (activeIndex > -1) {
			this.activeRows.splice(top ? activeIndex : activeIndex + 1, 0, row);
		***REMOVED***

		this.rows.splice(top ? allIndex : allIndex + 1, 0, row);
	***REMOVED*** else {

		if (top) {

			this.displayRowIterator(function (rows) {
				rows.unshift(row);
			***REMOVED***);

			this.activeRows.unshift(row);
			this.rows.unshift(row);
		***REMOVED*** else {
			this.displayRowIterator(function (rows) {
				rows.push(row);
			***REMOVED***);

			this.activeRows.push(row);
			this.rows.push(row);
		***REMOVED***
	***REMOVED***

	this.setActiveRows(this.activeRows);

	this.table.options.rowAdded.call(this.table, row.getComponent());

	this.table.options.dataEdited.call(this.table, this.getData());

	if (!blockRedraw) {
		this.reRenderInPosition();
	***REMOVED***

	return row;
***REMOVED***;

RowManager.prototype.moveRow = function (from, to, after) {
	if (this.table.options.history && this.table.modExists("history")) {
		this.table.modules.history.action("rowMove", from, { posFrom: this.getRowPosition(from), posTo: this.getRowPosition(to), to: to, after: after ***REMOVED***);
	***REMOVED***

	this.moveRowActual(from, to, after);

	this.regenerateRowNumbers();

	this.table.options.rowMoved.call(this.table, from.getComponent());
***REMOVED***;

RowManager.prototype.moveRowActual = function (from, to, after) {
	var self = this;
	this._moveRowInArray(this.rows, from, to, after);
	this._moveRowInArray(this.activeRows, from, to, after);

	this.displayRowIterator(function (rows) {
		self._moveRowInArray(rows, from, to, after);
	***REMOVED***);

	if (this.table.options.groupBy && this.table.modExists("groupRows")) {
		var toGroup = to.getGroup();
		var fromGroup = from.getGroup();

		if (toGroup === fromGroup) {
			this._moveRowInArray(toGroup.rows, from, to, after);
		***REMOVED*** else {
			if (fromGroup) {
				fromGroup.removeRow(from);
			***REMOVED***

			toGroup.insertRow(from, to, after);
		***REMOVED***
	***REMOVED***
***REMOVED***;

RowManager.prototype._moveRowInArray = function (rows, from, to, after) {
	var fromIndex, toIndex, start, end;

	if (from !== to) {

		fromIndex = rows.indexOf(from);

		if (fromIndex > -1) {

			rows.splice(fromIndex, 1);

			toIndex = rows.indexOf(to);

			if (toIndex > -1) {

				if (after) {
					rows.splice(toIndex + 1, 0, from);
				***REMOVED*** else {
					rows.splice(toIndex, 0, from);
				***REMOVED***
			***REMOVED*** else {
				rows.splice(fromIndex, 0, from);
			***REMOVED***
		***REMOVED***

		//restyle rows
		if (rows === this.getDisplayRows()) {

			start = fromIndex < toIndex ? fromIndex : toIndex;
			end = toIndex > fromIndex ? toIndex : fromIndex + 1;

			for (var i = start; i <= end; i++) {
				if (rows[i]) {
					this.styleRow(rows[i], i);
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

RowManager.prototype.clearData = function () {
	this.setData([]);
***REMOVED***;

RowManager.prototype.getRowIndex = function (row) {
	return this.findRowIndex(row, this.rows);
***REMOVED***;

RowManager.prototype.getDisplayRowIndex = function (row) {
	var index = this.getDisplayRows().indexOf(row);
	return index > -1 ? index : false;
***REMOVED***;

RowManager.prototype.nextDisplayRow = function (row, rowOnly) {
	var index = this.getDisplayRowIndex(row),
	    nextRow = false;

	if (index !== false && index < this.displayRowsCount - 1) {
		nextRow = this.getDisplayRows()[index + 1];
	***REMOVED***

	if (nextRow && (!(nextRow instanceof Row) || nextRow.type != "row")) {
		return this.nextDisplayRow(nextRow, rowOnly);
	***REMOVED***

	return nextRow;
***REMOVED***;

RowManager.prototype.prevDisplayRow = function (row, rowOnly) {
	var index = this.getDisplayRowIndex(row),
	    prevRow = false;

	if (index) {
		prevRow = this.getDisplayRows()[index - 1];
	***REMOVED***

	if (prevRow && (!(prevRow instanceof Row) || prevRow.type != "row")) {
		return this.prevDisplayRow(prevRow, rowOnly);
	***REMOVED***

	return prevRow;
***REMOVED***;

RowManager.prototype.findRowIndex = function (row, list) {
	var rowIndex;

	row = this.findRow(row);

	if (row) {
		rowIndex = list.indexOf(row);

		if (rowIndex > -1) {
			return rowIndex;
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

RowManager.prototype.getData = function (active, transform) {
	var output = [],
	    rows = this.getRows(active);

	rows.forEach(function (row) {
		if (row.type == "row") {
			output.push(row.getData(transform || "data"));
		***REMOVED***
	***REMOVED***);

	return output;
***REMOVED***;

RowManager.prototype.getComponents = function (active) {
	var output = [],
	    rows = this.getRows(active);

	rows.forEach(function (row) {
		output.push(row.getComponent());
	***REMOVED***);

	return output;
***REMOVED***;

RowManager.prototype.getDataCount = function (active) {
	var rows = this.getRows(active);

	return rows.length;
***REMOVED***;

RowManager.prototype._genRemoteRequest = function () {
	var _this12 = this;

	var table = this.table,
	    options = table.options,
	    params = {***REMOVED***;

	if (table.modExists("page")) {
		//set sort data if defined
		if (options.ajaxSorting) {
			var sorters = this.table.modules.sort.getSort();

			sorters.forEach(function (item) {
				delete item.column;
			***REMOVED***);

			params[this.table.modules.page.paginationDataSentNames.sorters] = sorters;
		***REMOVED***

		//set filter data if defined
		if (options.ajaxFiltering) {
			var filters = this.table.modules.filter.getFilters(true, true);

			params[this.table.modules.page.paginationDataSentNames.filters] = filters;
		***REMOVED***

		this.table.modules.ajax.setParams(params, true);
	***REMOVED***

	table.modules.ajax.sendRequest().then(function (data) {
		_this12._setDataActual(data, true);
	***REMOVED***).catch(function (e) {***REMOVED***);
***REMOVED***;

//choose the path to refresh data after a filter update
RowManager.prototype.filterRefresh = function () {
	var table = this.table,
	    options = table.options,
	    left = this.scrollLeft;

	if (options.ajaxFiltering) {
		if (options.pagination == "remote" && table.modExists("page")) {
			table.modules.page.reset(true);
			table.modules.page.setPage(1).then(function () {***REMOVED***).catch(function () {***REMOVED***);
		***REMOVED*** else if (options.ajaxProgressiveLoad) {
			table.modules.ajax.loadData().then(function () {***REMOVED***).catch(function () {***REMOVED***);
		***REMOVED*** else {
			//assume data is url, make ajax call to url to get data
			this._genRemoteRequest();
		***REMOVED***
	***REMOVED*** else {
		this.refreshActiveData("filter");
	***REMOVED***

	this.scrollHorizontal(left);
***REMOVED***;

//choose the path to refresh data after a sorter update
RowManager.prototype.sorterRefresh = function (loadOrignalData) {
	var table = this.table,
	    options = this.table.options,
	    left = this.scrollLeft;

	if (options.ajaxSorting) {
		if ((options.pagination == "remote" || options.progressiveLoad) && table.modExists("page")) {
			table.modules.page.reset(true);
			table.modules.page.setPage(1).then(function () {***REMOVED***).catch(function () {***REMOVED***);
		***REMOVED*** else if (options.ajaxProgressiveLoad) {
			table.modules.ajax.loadData().then(function () {***REMOVED***).catch(function () {***REMOVED***);
		***REMOVED*** else {
			//assume data is url, make ajax call to url to get data
			this._genRemoteRequest();
		***REMOVED***
	***REMOVED*** else {
		this.refreshActiveData(loadOrignalData ? "filter" : "sort");
	***REMOVED***

	this.scrollHorizontal(left);
***REMOVED***;

RowManager.prototype.scrollHorizontal = function (left) {
	this.scrollLeft = left;
	this.element.scrollLeft = left;

	if (this.table.options.groupBy) {
		this.table.modules.groupRows.scrollHeaders(left);
	***REMOVED***

	if (this.table.modExists("columnCalcs")) {
		this.table.modules.columnCalcs.scrollHorizontal(left);
	***REMOVED***
***REMOVED***;

//set active data set
RowManager.prototype.refreshActiveData = function (stage, skipStage, renderInPosition) {
	var self = this,
	    table = this.table,
	    cascadeOrder = ["all", "filter", "sort", "display", "freeze", "group", "tree", "page"],
	    displayIndex;

	if (this.redrawBlock) {

		if (!this.redrawBlockRestoreConfig || cascadeOrder.indexOf(stage) < cascadeOrder.indexOf(this.redrawBlockRestoreConfig.stage)) {
			this.redrawBlockRestoreConfig = {
				stage: stage,
				skipStage: skipStage,
				renderInPosition: renderInPosition
			***REMOVED***;
		***REMOVED***

		return;
	***REMOVED*** else {

		if (self.table.modExists("edit")) {
			self.table.modules.edit.cancelEdit();
		***REMOVED***

		if (!stage) {
			stage = "all";
		***REMOVED***

		if (table.options.selectable && !table.options.selectablePersistence && table.modExists("selectRow")) {
			table.modules.selectRow.deselectRows();
		***REMOVED***

		//cascade through data refresh stages
		switch (stage) {
			case "all":

			case "filter":
				if (!skipStage) {
					if (table.modExists("filter")) {
						self.setActiveRows(table.modules.filter.filter(self.rows));
					***REMOVED*** else {
						self.setActiveRows(self.rows.slice(0));
					***REMOVED***
				***REMOVED*** else {
					skipStage = false;
				***REMOVED***

			case "sort":
				if (!skipStage) {
					if (table.modExists("sort")) {
						table.modules.sort.sort(this.activeRows);
					***REMOVED***
				***REMOVED*** else {
					skipStage = false;
				***REMOVED***

				//regenerate row numbers for row number formatter if in use
				this.regenerateRowNumbers();

			//generic stage to allow for pipeline trigger after the data manipulation stage
			case "display":
				this.resetDisplayRows();

			case "freeze":
				if (!skipStage) {
					if (this.table.modExists("frozenRows")) {
						if (table.modules.frozenRows.isFrozen()) {
							if (!table.modules.frozenRows.getDisplayIndex()) {
								table.modules.frozenRows.setDisplayIndex(this.getNextDisplayIndex());
							***REMOVED***

							displayIndex = table.modules.frozenRows.getDisplayIndex();

							displayIndex = self.setDisplayRows(table.modules.frozenRows.getRows(this.getDisplayRows(displayIndex - 1)), displayIndex);

							if (displayIndex !== true) {
								table.modules.frozenRows.setDisplayIndex(displayIndex);
							***REMOVED***
						***REMOVED***
					***REMOVED***
				***REMOVED*** else {
					skipStage = false;
				***REMOVED***

			case "group":
				if (!skipStage) {
					if (table.options.groupBy && table.modExists("groupRows")) {

						if (!table.modules.groupRows.getDisplayIndex()) {
							table.modules.groupRows.setDisplayIndex(this.getNextDisplayIndex());
						***REMOVED***

						displayIndex = table.modules.groupRows.getDisplayIndex();

						displayIndex = self.setDisplayRows(table.modules.groupRows.getRows(this.getDisplayRows(displayIndex - 1)), displayIndex);

						if (displayIndex !== true) {
							table.modules.groupRows.setDisplayIndex(displayIndex);
						***REMOVED***
					***REMOVED***
				***REMOVED*** else {
					skipStage = false;
				***REMOVED***

			case "tree":

				if (!skipStage) {
					if (table.options.dataTree && table.modExists("dataTree")) {
						if (!table.modules.dataTree.getDisplayIndex()) {
							table.modules.dataTree.setDisplayIndex(this.getNextDisplayIndex());
						***REMOVED***

						displayIndex = table.modules.dataTree.getDisplayIndex();

						displayIndex = self.setDisplayRows(table.modules.dataTree.getRows(this.getDisplayRows(displayIndex - 1)), displayIndex);

						if (displayIndex !== true) {
							table.modules.dataTree.setDisplayIndex(displayIndex);
						***REMOVED***
					***REMOVED***
				***REMOVED*** else {
					skipStage = false;
				***REMOVED***

				if (table.options.pagination && table.modExists("page") && !renderInPosition) {
					if (table.modules.page.getMode() == "local") {
						table.modules.page.reset();
					***REMOVED***
				***REMOVED***

			case "page":
				if (!skipStage) {
					if (table.options.pagination && table.modExists("page")) {

						if (!table.modules.page.getDisplayIndex()) {
							table.modules.page.setDisplayIndex(this.getNextDisplayIndex());
						***REMOVED***

						displayIndex = table.modules.page.getDisplayIndex();

						if (table.modules.page.getMode() == "local") {
							table.modules.page.setMaxRows(this.getDisplayRows(displayIndex - 1).length);
						***REMOVED***

						displayIndex = self.setDisplayRows(table.modules.page.getRows(this.getDisplayRows(displayIndex - 1)), displayIndex);

						if (displayIndex !== true) {
							table.modules.page.setDisplayIndex(displayIndex);
						***REMOVED***
					***REMOVED***
				***REMOVED*** else {
					skipStage = false;
				***REMOVED***
		***REMOVED***

		if (Tabulator.prototype.helpers.elVisible(self.element)) {
			if (renderInPosition) {
				self.reRenderInPosition();
			***REMOVED*** else {
				self.renderTable();
				if (table.options.layoutColumnsOnNewData) {
					self.table.columnManager.redraw(true);
				***REMOVED***
			***REMOVED***
		***REMOVED***

		if (table.modExists("columnCalcs")) {
			table.modules.columnCalcs.recalc(this.activeRows);
		***REMOVED***
	***REMOVED***
***REMOVED***;

//regenerate row numbers for row number formatter if in use
RowManager.prototype.regenerateRowNumbers = function () {
	var _this13 = this;

	if (this.rowNumColumn) {
		this.activeRows.forEach(function (row) {
			var cell = row.getCell(_this13.rowNumColumn);

			if (cell) {
				cell._generateContents();
			***REMOVED***
		***REMOVED***);
	***REMOVED***
***REMOVED***;

RowManager.prototype.setActiveRows = function (activeRows) {
	this.activeRows = activeRows;
	this.activeRowsCount = this.activeRows.length;
***REMOVED***;

//reset display rows array
RowManager.prototype.resetDisplayRows = function () {
	this.displayRows = [];

	this.displayRows.push(this.activeRows.slice(0));

	this.displayRowsCount = this.displayRows[0].length;

	if (this.table.modExists("frozenRows")) {
		this.table.modules.frozenRows.setDisplayIndex(0);
	***REMOVED***

	if (this.table.options.groupBy && this.table.modExists("groupRows")) {
		this.table.modules.groupRows.setDisplayIndex(0);
	***REMOVED***

	if (this.table.options.pagination && this.table.modExists("page")) {
		this.table.modules.page.setDisplayIndex(0);
	***REMOVED***
***REMOVED***;

RowManager.prototype.getNextDisplayIndex = function () {
	return this.displayRows.length;
***REMOVED***;

//set display row pipeline data
RowManager.prototype.setDisplayRows = function (displayRows, index) {

	var output = true;

	if (index && typeof this.displayRows[index] != "undefined") {
		this.displayRows[index] = displayRows;
		output = true;
	***REMOVED*** else {
		this.displayRows.push(displayRows);
		output = index = this.displayRows.length - 1;
	***REMOVED***

	if (index == this.displayRows.length - 1) {
		this.displayRowsCount = this.displayRows[this.displayRows.length - 1].length;
	***REMOVED***

	return output;
***REMOVED***;

RowManager.prototype.getDisplayRows = function (index) {
	if (typeof index == "undefined") {
		return this.displayRows.length ? this.displayRows[this.displayRows.length - 1] : [];
	***REMOVED*** else {
		return this.displayRows[index] || [];
	***REMOVED***
***REMOVED***;

RowManager.prototype.getVisibleRows = function (viewable) {
	var topEdge = this.element.scrollTop,
	    bottomEdge = this.element.clientHeight + topEdge,
	    topFound = false,
	    topRow = 0,
	    bottomRow = 0,
	    rows = this.getDisplayRows();

	if (viewable) {

		this.getDisplayRows();
		for (var i = this.vDomTop; i <= this.vDomBottom; i++) {
			if (rows[i]) {
				if (!topFound) {
					if (topEdge - rows[i].getElement().offsetTop >= 0) {
						topRow = i;
					***REMOVED*** else {
						topFound = true;

						if (bottomEdge - rows[i].getElement().offsetTop >= 0) {
							bottomRow = i;
						***REMOVED*** else {
							break;
						***REMOVED***
					***REMOVED***
				***REMOVED*** else {
					if (bottomEdge - rows[i].getElement().offsetTop >= 0) {
						bottomRow = i;
					***REMOVED*** else {
						break;
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED*** else {
		topRow = this.vDomTop;
		bottomRow = this.vDomBottom;
	***REMOVED***

	return rows.slice(topRow, bottomRow + 1);
***REMOVED***;

//repeat action accross display rows
RowManager.prototype.displayRowIterator = function (callback) {
	this.displayRows.forEach(callback);

	this.displayRowsCount = this.displayRows[this.displayRows.length - 1].length;
***REMOVED***;

//return only actual rows (not group headers etc)
RowManager.prototype.getRows = function (active) {
	var rows;

	switch (active) {
		case "active":
			rows = this.activeRows;
			break;

		case "display":
			rows = this.table.rowManager.getDisplayRows();
			break;

		case "visible":
			rows = this.getVisibleRows(true);
			break;

		default:
			rows = this.rows;
	***REMOVED***

	return rows;
***REMOVED***;

///////////////// Table Rendering /////////////////

//trigger rerender of table in current position
RowManager.prototype.reRenderInPosition = function (callback) {
	if (this.getRenderMode() == "virtual") {

		if (this.redrawBlock) {
			if (callback) {
				callback();
			***REMOVED*** else {
				this.redrawBlockRederInPosition = true;
			***REMOVED***
		***REMOVED*** else {
			var scrollTop = this.element.scrollTop;
			var topRow = false;
			var topOffset = false;

			var left = this.scrollLeft;

			var rows = this.getDisplayRows();

			for (var i = this.vDomTop; i <= this.vDomBottom; i++) {

				if (rows[i]) {
					var diff = scrollTop - rows[i].getElement().offsetTop;

					if (topOffset === false || Math.abs(diff) < topOffset) {
						topOffset = diff;
						topRow = i;
					***REMOVED*** else {
						break;
					***REMOVED***
				***REMOVED***
			***REMOVED***

			if (callback) {
				callback();
			***REMOVED***

			this._virtualRenderFill(topRow === false ? this.displayRowsCount - 1 : topRow, true, topOffset || 0);

			this.scrollHorizontal(left);
		***REMOVED***
	***REMOVED*** else {
		this.renderTable();

		if (callback) {
			callback();
		***REMOVED***
	***REMOVED***
***REMOVED***;

RowManager.prototype.setRenderMode = function () {

	if (this.table.options.virtualDom) {

		this.renderMode = "virtual";

		if (this.table.element.clientHeight || this.table.options.height) {
			this.fixedHeight = true;
		***REMOVED*** else {
			this.fixedHeight = false;
		***REMOVED***
	***REMOVED*** else {
		this.renderMode = "classic";
	***REMOVED***
***REMOVED***;

RowManager.prototype.getRenderMode = function () {
	return this.renderMode;
***REMOVED***;

RowManager.prototype.renderTable = function () {

	this.table.options.renderStarted.call(this.table);

	this.element.scrollTop = 0;

	switch (this.renderMode) {
		case "classic":
			this._simpleRender();
			break;

		case "virtual":
			this._virtualRenderFill();
			break;
	***REMOVED***

	if (this.firstRender) {
		if (this.displayRowsCount) {
			this.firstRender = false;
			this.table.modules.layout.layout();
		***REMOVED*** else {
			this.renderEmptyScroll();
		***REMOVED***
	***REMOVED***

	if (this.table.modExists("frozenColumns")) {
		this.table.modules.frozenColumns.layout();
	***REMOVED***

	if (!this.displayRowsCount) {
		if (this.table.options.placeholder) {

			this.table.options.placeholder.setAttribute("tabulator-render-mode", this.renderMode);

			this.getElement().appendChild(this.table.options.placeholder);
			this.table.options.placeholder.style.width = this.table.columnManager.getWidth() + "px";
		***REMOVED***
	***REMOVED***

	this.table.options.renderComplete.call(this.table);
***REMOVED***;

//simple render on heightless table
RowManager.prototype._simpleRender = function () {
	this._clearVirtualDom();

	if (this.displayRowsCount) {
		this.checkClassicModeGroupHeaderWidth();
	***REMOVED*** else {
		this.renderEmptyScroll();
	***REMOVED***
***REMOVED***;

RowManager.prototype.checkClassicModeGroupHeaderWidth = function () {
	var self = this,
	    element = this.tableElement,
	    onlyGroupHeaders = true;

	self.getDisplayRows().forEach(function (row, index) {
		self.styleRow(row, index);
		element.appendChild(row.getElement());
		row.initialize(true);

		if (row.type !== "group") {
			onlyGroupHeaders = false;
		***REMOVED***
	***REMOVED***);

	if (onlyGroupHeaders) {
		element.style.minWidth = self.table.columnManager.getWidth() + "px";
	***REMOVED*** else {
		element.style.minWidth = "";
	***REMOVED***
***REMOVED***;

//show scrollbars on empty table div
RowManager.prototype.renderEmptyScroll = function () {
	if (this.table.options.placeholder) {
		this.tableElement.style.display = "none";
	***REMOVED*** else {
		this.tableElement.style.minWidth = this.table.columnManager.getWidth() + "px";
		this.tableElement.style.minHeight = "1px";
		this.tableElement.style.visibility = "hidden";
	***REMOVED***
***REMOVED***;

RowManager.prototype._clearVirtualDom = function () {
	var element = this.tableElement;

	if (this.table.options.placeholder && this.table.options.placeholder.parentNode) {
		this.table.options.placeholder.parentNode.removeChild(this.table.options.placeholder);
	***REMOVED***

	// element.children.detach();
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	***REMOVED***element.style.paddingTop = "";
	element.style.paddingBottom = "";
	element.style.minWidth = "";
	element.style.minHeight = "";
	element.style.display = "";
	element.style.visibility = "";

	this.scrollTop = 0;
	this.scrollLeft = 0;
	this.vDomTop = 0;
	this.vDomBottom = 0;
	this.vDomTopPad = 0;
	this.vDomBottomPad = 0;
***REMOVED***;

RowManager.prototype.styleRow = function (row, index) {
	var rowEl = row.getElement();

	if (index % 2) {
		rowEl.classList.add("tabulator-row-even");
		rowEl.classList.remove("tabulator-row-odd");
	***REMOVED*** else {
		rowEl.classList.add("tabulator-row-odd");
		rowEl.classList.remove("tabulator-row-even");
	***REMOVED***
***REMOVED***;

//full virtual render
RowManager.prototype._virtualRenderFill = function (position, forceMove, offset) {
	var self = this,
	    element = self.tableElement,
	    holder = self.element,
	    topPad = 0,
	    rowsHeight = 0,
	    topPadHeight = 0,
	    i = 0,
	    onlyGroupHeaders = true,
	    rows = self.getDisplayRows();

	position = position || 0;

	offset = offset || 0;

	if (!position) {
		self._clearVirtualDom();
	***REMOVED*** else {
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		***REMOVED*** //check if position is too close to bottom of table
		var heightOccupied = (self.displayRowsCount - position + 1)***REMOVED*** self.vDomRowHeight;

		if (heightOccupied < self.height) {
			position -= Math.ceil((self.height - heightOccupied) / self.vDomRowHeight);

			if (position < 0) {
				position = 0;
			***REMOVED***
		***REMOVED***

		//calculate initial pad
		topPad = Math.min(Math.max(Math.floor(self.vDomWindowBuffer / self.vDomRowHeight), self.vDomWindowMinMarginRows), position);
		position -= topPad;
	***REMOVED***

	if (self.displayRowsCount && Tabulator.prototype.helpers.elVisible(self.element)) {

		self.vDomTop = position;

		self.vDomBottom = position - 1;

		while ((rowsHeight <= self.height + self.vDomWindowBuffer || i < self.vDomWindowMinTotalRows) && self.vDomBottom < self.displayRowsCount - 1) {
			var index = self.vDomBottom + 1,
			    row = rows[index],
			    rowHeight = 0;

			self.styleRow(row, index);

			element.appendChild(row.getElement());
			if (!row.initialized) {
				row.initialize(true);
			***REMOVED*** else {
				if (!row.heightInitialized) {
					row.normalizeHeight(true);
				***REMOVED***
			***REMOVED***

			rowHeight = row.getHeight();

			if (i < topPad) {
				topPadHeight += rowHeight;
			***REMOVED*** else {
				rowsHeight += rowHeight;
			***REMOVED***

			if (rowHeight > this.vDomWindowBuffer) {
				this.vDomWindowBuffer = rowHeight***REMOVED*** 2;
			***REMOVED***

			if (row.type !== "group") {
				onlyGroupHeaders = false;
			***REMOVED***

			self.vDomBottom++;
			i++;
		***REMOVED***

		if (!position) {
			this.vDomTopPad = 0;
			//adjust rowheight to match average of rendered elements
			self.vDomRowHeight = Math.floor((rowsHeight + topPadHeight) / i);
			self.vDomBottomPad = self.vDomRowHeight***REMOVED*** (self.displayRowsCount - self.vDomBottom - 1);

			self.vDomScrollHeight = topPadHeight + rowsHeight + self.vDomBottomPad - self.height;
		***REMOVED*** else {
			self.vDomTopPad = !forceMove ? self.scrollTop - topPadHeight : self.vDomRowHeight***REMOVED*** this.vDomTop + offset;
			self.vDomBottomPad = self.vDomBottom == self.displayRowsCount - 1 ? 0 : Math.max(self.vDomScrollHeight - self.vDomTopPad - rowsHeight - topPadHeight, 0);
		***REMOVED***

		element.style.paddingTop = self.vDomTopPad + "px";
		element.style.paddingBottom = self.vDomBottomPad + "px";

		if (forceMove) {
			this.scrollTop = self.vDomTopPad + topPadHeight + offset - (this.element.scrollWidth > this.element.clientWidth ? this.element.offsetHeight - this.element.clientHeight : 0);
		***REMOVED***

		this.scrollTop = Math.min(this.scrollTop, this.element.scrollHeight - this.height);

		//adjust for horizontal scrollbar if present (and not at top of table)
		if (this.element.scrollWidth > this.element.offsetWidth && forceMove) {
			this.scrollTop += this.element.offsetHeight - this.element.clientHeight;
		***REMOVED***

		this.vDomScrollPosTop = this.scrollTop;
		this.vDomScrollPosBottom = this.scrollTop;

		holder.scrollTop = this.scrollTop;

		element.style.minWidth = onlyGroupHeaders ? self.table.columnManager.getWidth() + "px" : "";

		if (self.table.options.groupBy) {
			if (self.table.modules.layout.getMode() != "fitDataFill" && self.displayRowsCount == self.table.modules.groupRows.countGroups()) {
				self.tableElement.style.minWidth = self.table.columnManager.getWidth();
			***REMOVED***
		***REMOVED***
	***REMOVED*** else {
		this.renderEmptyScroll();
	***REMOVED***

	if (!this.fixedHeight) {
		this.adjustTableSize();
	***REMOVED***
***REMOVED***;

//handle vertical scrolling
RowManager.prototype.scrollVertical = function (dir) {
	var topDiff = this.scrollTop - this.vDomScrollPosTop;
	var bottomDiff = this.scrollTop - this.vDomScrollPosBottom;
	var margin = this.vDomWindowBuffer***REMOVED*** 2;

	if (-topDiff > margin || bottomDiff > margin) {
		//if big scroll redraw table;
		var left = this.scrollLeft;
		this._virtualRenderFill(Math.floor(this.element.scrollTop / this.element.scrollHeight***REMOVED*** this.displayRowsCount));
		this.scrollHorizontal(left);
	***REMOVED*** else {

		if (dir) {
			//scrolling up
			if (topDiff < 0) {

				this._addTopRow(-topDiff);
			***REMOVED***

			if (bottomDiff < 0) {

				//hide bottom row if needed
				if (this.vDomScrollHeight - this.scrollTop > this.vDomWindowBuffer) {
					this._removeBottomRow(-bottomDiff);
				***REMOVED*** else {
					this.vDomScrollPosBottom = this.scrollTop;
				***REMOVED***
			***REMOVED***
		***REMOVED*** else {
			//scrolling down
			if (topDiff >= 0) {

				//hide top row if needed
				if (this.scrollTop > this.vDomWindowBuffer) {

					this._removeTopRow(topDiff);
				***REMOVED*** else {
					this.vDomScrollPosTop = this.scrollTop;
				***REMOVED***
			***REMOVED***

			if (bottomDiff >= 0) {

				this._addBottomRow(bottomDiff);
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

RowManager.prototype._addTopRow = function (topDiff) {
	var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	var table = this.tableElement,
	    rows = this.getDisplayRows();

	if (this.vDomTop) {
		var index = this.vDomTop - 1,
		    topRow = rows[index],
		    topRowHeight = topRow.getHeight() || this.vDomRowHeight;

		//hide top row if needed
		if (topDiff >= topRowHeight) {
			this.styleRow(topRow, index);
			table.insertBefore(topRow.getElement(), table.firstChild);
			if (!topRow.initialized || !topRow.heightInitialized) {
				this.vDomTopNewRows.push(topRow);

				if (!topRow.heightInitialized) {
					topRow.clearCellHeight();
				***REMOVED***
			***REMOVED***
			topRow.initialize();

			this.vDomTopPad -= topRowHeight;

			if (this.vDomTopPad < 0) {
				this.vDomTopPad = index***REMOVED*** this.vDomRowHeight;
			***REMOVED***

			if (!index) {
				this.vDomTopPad = 0;
			***REMOVED***

			table.style.paddingTop = this.vDomTopPad + "px";
			this.vDomScrollPosTop -= topRowHeight;
			this.vDomTop--;
		***REMOVED***

		topDiff = -(this.scrollTop - this.vDomScrollPosTop);

		if (topRow.getHeight() > this.vDomWindowBuffer) {
			this.vDomWindowBuffer = topRow.getHeight()***REMOVED*** 2;
		***REMOVED***

		if (i < this.vDomMaxRenderChain && this.vDomTop && topDiff >= (rows[this.vDomTop - 1].getHeight() || this.vDomRowHeight)) {
			this._addTopRow(topDiff, i + 1);
		***REMOVED*** else {
			this._quickNormalizeRowHeight(this.vDomTopNewRows);
		***REMOVED***
	***REMOVED***
***REMOVED***;

RowManager.prototype._removeTopRow = function (topDiff) {
	var table = this.tableElement,
	    topRow = this.getDisplayRows()[this.vDomTop],
	    topRowHeight = topRow.getHeight() || this.vDomRowHeight;

	if (topDiff >= topRowHeight) {

		var rowEl = topRow.getElement();
		rowEl.parentNode.removeChild(rowEl);

		this.vDomTopPad += topRowHeight;
		table.style.paddingTop = this.vDomTopPad + "px";
		this.vDomScrollPosTop += this.vDomTop ? topRowHeight : topRowHeight + this.vDomWindowBuffer;
		this.vDomTop++;

		topDiff = this.scrollTop - this.vDomScrollPosTop;

		this._removeTopRow(topDiff);
	***REMOVED***
***REMOVED***;

RowManager.prototype._addBottomRow = function (bottomDiff) {
	var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	var table = this.tableElement,
	    rows = this.getDisplayRows();

	if (this.vDomBottom < this.displayRowsCount - 1) {
		var index = this.vDomBottom + 1,
		    bottomRow = rows[index],
		    bottomRowHeight = bottomRow.getHeight() || this.vDomRowHeight;

		//hide bottom row if needed
		if (bottomDiff >= bottomRowHeight) {
			this.styleRow(bottomRow, index);
			table.appendChild(bottomRow.getElement());

			if (!bottomRow.initialized || !bottomRow.heightInitialized) {
				this.vDomBottomNewRows.push(bottomRow);

				if (!bottomRow.heightInitialized) {
					bottomRow.clearCellHeight();
				***REMOVED***
			***REMOVED***

			bottomRow.initialize();

			this.vDomBottomPad -= bottomRowHeight;

			if (this.vDomBottomPad < 0 || index == this.displayRowsCount - 1) {
				this.vDomBottomPad = 0;
			***REMOVED***

			table.style.paddingBottom = this.vDomBottomPad + "px";
			this.vDomScrollPosBottom += bottomRowHeight;
			this.vDomBottom++;
		***REMOVED***

		bottomDiff = this.scrollTop - this.vDomScrollPosBottom;

		if (bottomRow.getHeight() > this.vDomWindowBuffer) {
			this.vDomWindowBuffer = bottomRow.getHeight()***REMOVED*** 2;
		***REMOVED***

		if (i < this.vDomMaxRenderChain && this.vDomBottom < this.displayRowsCount - 1 && bottomDiff >= (rows[this.vDomBottom + 1].getHeight() || this.vDomRowHeight)) {
			this._addBottomRow(bottomDiff, i + 1);
		***REMOVED*** else {
			this._quickNormalizeRowHeight(this.vDomBottomNewRows);
		***REMOVED***
	***REMOVED***
***REMOVED***;

RowManager.prototype._removeBottomRow = function (bottomDiff) {
	var table = this.tableElement,
	    bottomRow = this.getDisplayRows()[this.vDomBottom],
	    bottomRowHeight = bottomRow.getHeight() || this.vDomRowHeight;

	if (bottomDiff >= bottomRowHeight) {

		var rowEl = bottomRow.getElement();

		if (rowEl.parentNode) {
			rowEl.parentNode.removeChild(rowEl);
		***REMOVED***

		this.vDomBottomPad += bottomRowHeight;

		if (this.vDomBottomPad < 0) {
			this.vDomBottomPad = 0;
		***REMOVED***

		table.style.paddingBottom = this.vDomBottomPad + "px";
		this.vDomScrollPosBottom -= bottomRowHeight;
		this.vDomBottom--;

		bottomDiff = -(this.scrollTop - this.vDomScrollPosBottom);

		this._removeBottomRow(bottomDiff);
	***REMOVED***
***REMOVED***;

RowManager.prototype._quickNormalizeRowHeight = function (rows) {
	rows.forEach(function (row) {
		row.calcHeight();
	***REMOVED***);

	rows.forEach(function (row) {
		row.setCellHeight();
	***REMOVED***);

	rows.length = 0;
***REMOVED***;

//normalize height of active rows
RowManager.prototype.normalizeHeight = function () {
	this.activeRows.forEach(function (row) {
		row.normalizeHeight();
	***REMOVED***);
***REMOVED***;

//adjust the height of the table holder to fit in the Tabulator element
RowManager.prototype.adjustTableSize = function () {
	var initialHeight = this.element.clientHeight,
	    modExists;

	if (this.renderMode === "virtual") {
		var otherHeight = this.columnManager.getElement().offsetHeight + (this.table.footerManager && !this.table.footerManager.external ? this.table.footerManager.getElement().offsetHeight : 0);

		if (this.fixedHeight) {
			this.element.style.minHeight = "calc(100% - " + otherHeight + "px)";
			this.element.style.height = "calc(100% - " + otherHeight + "px)";
			this.element.style.maxHeight = "calc(100% - " + otherHeight + "px)";
		***REMOVED*** else {
			this.element.style.height = "";
			this.element.style.height = this.table.element.clientHeight - otherHeight + "px";
			this.element.scrollTop = this.scrollTop;
		***REMOVED***

		this.height = this.element.clientHeight;
		this.vDomWindowBuffer = this.table.options.virtualDomBuffer || this.height;

		//check if the table has changed size when dealing with variable height tables
		if (!this.fixedHeight && initialHeight != this.element.clientHeight) {
			modExists = this.table.modExists("resizeTable");

			if (modExists && !this.table.modules.resizeTable.autoResize || !modExists) {
				this.redraw();
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

//renitialize all rows
RowManager.prototype.reinitialize = function () {
	this.rows.forEach(function (row) {
		row.reinitialize();
	***REMOVED***);
***REMOVED***;

//prevent table from being redrawn
RowManager.prototype.blockRedraw = function () {
	this.redrawBlock = true;
	this.redrawBlockRestoreConfig = false;
***REMOVED***;

//restore table redrawing
RowManager.prototype.restoreRedraw = function () {
	this.redrawBlock = false;

	if (this.redrawBlockRestoreConfig) {
		this.refreshActiveData(this.redrawBlockRestoreConfig.stage, this.redrawBlockRestoreConfig.skipStage, this.redrawBlockRestoreConfig.renderInPosition);

		this.redrawBlockRestoreConfig = false;
	***REMOVED*** else {
		if (this.redrawBlockRederInPosition) {
			this.reRenderInPosition();
		***REMOVED***
	***REMOVED***

	this.redrawBlockRederInPosition = false;
***REMOVED***;

//redraw table
RowManager.prototype.redraw = function (force) {
	var pos = 0,
	    left = this.scrollLeft;

	this.adjustTableSize();

	this.table.tableWidth = this.table.element.clientWidth;

	if (!force) {
		if (this.renderMode == "classic") {

			if (this.table.options.groupBy) {
				this.refreshActiveData("group", false, false);
			***REMOVED*** else {
				this._simpleRender();
			***REMOVED***
		***REMOVED*** else {
			this.reRenderInPosition();
			this.scrollHorizontal(left);
		***REMOVED***

		if (!this.displayRowsCount) {
			if (this.table.options.placeholder) {
				this.getElement().appendChild(this.table.options.placeholder);
			***REMOVED***
		***REMOVED***
	***REMOVED*** else {
		this.renderTable();
	***REMOVED***
***REMOVED***;

RowManager.prototype.resetScroll = function () {
	this.element.scrollLeft = 0;
	this.element.scrollTop = 0;

	if (this.table.browser === "ie") {
		var event = document.createEvent("Event");
		event.initEvent("scroll", false, true);
		this.element.dispatchEvent(event);
	***REMOVED*** else {
		this.element.dispatchEvent(new Event('scroll'));
	***REMOVED***
***REMOVED***;

//public row object
var RowComponent = function RowComponent(row) {
	this._row = row;
***REMOVED***;

RowComponent.prototype.getData = function (transform) {
	return this._row.getData(transform);
***REMOVED***;

RowComponent.prototype.getElement = function () {
	return this._row.getElement();
***REMOVED***;

RowComponent.prototype.getCells = function () {
	var cells = [];

	this._row.getCells().forEach(function (cell) {
		cells.push(cell.getComponent());
	***REMOVED***);

	return cells;
***REMOVED***;

RowComponent.prototype.getCell = function (column) {
	var cell = this._row.getCell(column);
	return cell ? cell.getComponent() : false;
***REMOVED***;

RowComponent.prototype.getIndex = function () {
	return this._row.getData("data")[this._row.table.options.index];
***REMOVED***;

RowComponent.prototype.getPosition = function (active) {
	return this._row.table.rowManager.getRowPosition(this._row, active);
***REMOVED***;

RowComponent.prototype.delete = function () {
	return this._row.delete();
***REMOVED***;

RowComponent.prototype.scrollTo = function () {
	return this._row.table.rowManager.scrollToRow(this._row);
***REMOVED***;

RowComponent.prototype.pageTo = function () {
	if (this._row.table.modExists("page", true)) {
		return this._row.table.modules.page.setPageToRow(this._row);
	***REMOVED***
***REMOVED***;

RowComponent.prototype.move = function (to, after) {
	this._row.moveToRow(to, after);
***REMOVED***;

RowComponent.prototype.update = function (data) {
	return this._row.updateData(data);
***REMOVED***;

RowComponent.prototype.normalizeHeight = function () {
	this._row.normalizeHeight(true);
***REMOVED***;

RowComponent.prototype.select = function () {
	this._row.table.modules.selectRow.selectRows(this._row);
***REMOVED***;

RowComponent.prototype.deselect = function () {
	this._row.table.modules.selectRow.deselectRows(this._row);
***REMOVED***;

RowComponent.prototype.toggleSelect = function () {
	this._row.table.modules.selectRow.toggleRow(this._row);
***REMOVED***;

RowComponent.prototype.isSelected = function () {
	return this._row.table.modules.selectRow.isRowSelected(this._row);
***REMOVED***;

RowComponent.prototype._getSelf = function () {
	return this._row;
***REMOVED***;

RowComponent.prototype.freeze = function () {
	if (this._row.table.modExists("frozenRows", true)) {
		this._row.table.modules.frozenRows.freezeRow(this._row);
	***REMOVED***
***REMOVED***;

RowComponent.prototype.unfreeze = function () {
	if (this._row.table.modExists("frozenRows", true)) {
		this._row.table.modules.frozenRows.unfreezeRow(this._row);
	***REMOVED***
***REMOVED***;

RowComponent.prototype.treeCollapse = function () {
	if (this._row.table.modExists("dataTree", true)) {
		this._row.table.modules.dataTree.collapseRow(this._row);
	***REMOVED***
***REMOVED***;

RowComponent.prototype.treeExpand = function () {
	if (this._row.table.modExists("dataTree", true)) {
		this._row.table.modules.dataTree.expandRow(this._row);
	***REMOVED***
***REMOVED***;

RowComponent.prototype.treeToggle = function () {
	if (this._row.table.modExists("dataTree", true)) {
		this._row.table.modules.dataTree.toggleRow(this._row);
	***REMOVED***
***REMOVED***;

RowComponent.prototype.getTreeParent = function () {
	if (this._row.table.modExists("dataTree", true)) {
		return this._row.table.modules.dataTree.getTreeParent(this._row);
	***REMOVED***

	return false;
***REMOVED***;

RowComponent.prototype.getTreeChildren = function () {
	if (this._row.table.modExists("dataTree", true)) {
		return this._row.table.modules.dataTree.getTreeChildren(this._row);
	***REMOVED***

	return false;
***REMOVED***;

RowComponent.prototype.reformat = function () {
	return this._row.reinitialize();
***REMOVED***;

RowComponent.prototype.getGroup = function () {
	return this._row.getGroup().getComponent();
***REMOVED***;

RowComponent.prototype.getTable = function () {
	return this._row.table;
***REMOVED***;

RowComponent.prototype.getNextRow = function () {
	var row = this._row.nextRow();
	return row ? row.getComponent() : row;
***REMOVED***;

RowComponent.prototype.getPrevRow = function () {
	var row = this._row.prevRow();
	return row ? row.getComponent() : row;
***REMOVED***;

var Row = function Row(data, parent) {
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "row";

	this.table = parent.table;
	this.parent = parent;
	this.data = {***REMOVED***;
	this.type = type; //type of element
	this.element = this.createElement();
	this.modules = {***REMOVED***; //hold module variables;
	this.cells = [];
	this.height = 0; //hold element height
	this.heightStyled = ""; //hold element height prestyled to improve render efficiency
	this.manualHeight = false; //user has manually set row height
	this.outerHeight = 0; //holde lements outer height
	this.initialized = false; //element has been rendered
	this.heightInitialized = false; //element has resized cells to fit

	this.setData(data);
	this.generateElement();
***REMOVED***;

Row.prototype.createElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-row");
	el.setAttribute("role", "row");

	return el;
***REMOVED***;

Row.prototype.getElement = function () {
	return this.element;
***REMOVED***;

Row.prototype.detachElement = function () {
	if (this.element && this.element.parentNode) {
		this.element.parentNode.removeChild(this.element);
	***REMOVED***
***REMOVED***;

Row.prototype.generateElement = function () {
	var self = this,
	    dblTap,
	    tapHold,
	    tap;

	//set row selection characteristics
	if (self.table.options.selectable !== false && self.table.modExists("selectRow")) {
		self.table.modules.selectRow.initializeRow(this);
	***REMOVED***

	//setup movable rows
	if (self.table.options.movableRows !== false && self.table.modExists("moveRow")) {
		self.table.modules.moveRow.initializeRow(this);
	***REMOVED***

	//setup data tree
	if (self.table.options.dataTree !== false && self.table.modExists("dataTree")) {
		self.table.modules.dataTree.initializeRow(this);
	***REMOVED***

	//setup column colapse container
	if (self.table.options.responsiveLayout === "collapse" && self.table.modExists("responsiveLayout")) {
		self.table.modules.responsiveLayout.initializeRow(this);
	***REMOVED***

	//set column menu
	if (self.table.options.rowContextMenu && this.table.modExists("menu")) {
		self.table.modules.menu.initializeRow(this);
	***REMOVED***

	//handle row click events
	if (self.table.options.rowClick) {
		self.element.addEventListener("click", function (e) {
			self.table.options.rowClick(e, self.getComponent());
		***REMOVED***);
	***REMOVED***

	if (self.table.options.rowDblClick) {
		self.element.addEventListener("dblclick", function (e) {
			self.table.options.rowDblClick(e, self.getComponent());
		***REMOVED***);
	***REMOVED***

	if (self.table.options.rowContext) {
		self.element.addEventListener("contextmenu", function (e) {
			self.table.options.rowContext(e, self.getComponent());
		***REMOVED***);
	***REMOVED***

	//handle mouse events
	if (self.table.options.rowMouseEnter) {
		self.element.addEventListener("mouseenter", function (e) {
			self.table.options.rowMouseEnter(e, self.getComponent());
		***REMOVED***);
	***REMOVED***

	if (self.table.options.rowMouseLeave) {
		self.element.addEventListener("mouseleave", function (e) {
			self.table.options.rowMouseLeave(e, self.getComponent());
		***REMOVED***);
	***REMOVED***

	if (self.table.options.rowMouseOver) {
		self.element.addEventListener("mouseover", function (e) {
			self.table.options.rowMouseOver(e, self.getComponent());
		***REMOVED***);
	***REMOVED***

	if (self.table.options.rowMouseOut) {
		self.element.addEventListener("mouseout", function (e) {
			self.table.options.rowMouseOut(e, self.getComponent());
		***REMOVED***);
	***REMOVED***

	if (self.table.options.rowMouseMove) {
		self.element.addEventListener("mousemove", function (e) {
			self.table.options.rowMouseMove(e, self.getComponent());
		***REMOVED***);
	***REMOVED***

	if (self.table.options.rowTap) {

		tap = false;

		self.element.addEventListener("touchstart", function (e) {
			tap = true;
		***REMOVED***, { passive: true ***REMOVED***);

		self.element.addEventListener("touchend", function (e) {
			if (tap) {
				self.table.options.rowTap(e, self.getComponent());
			***REMOVED***

			tap = false;
		***REMOVED***);
	***REMOVED***

	if (self.table.options.rowDblTap) {

		dblTap = null;

		self.element.addEventListener("touchend", function (e) {

			if (dblTap) {
				clearTimeout(dblTap);
				dblTap = null;

				self.table.options.rowDblTap(e, self.getComponent());
			***REMOVED*** else {

				dblTap = setTimeout(function () {
					clearTimeout(dblTap);
					dblTap = null;
				***REMOVED***, 300);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (self.table.options.rowTapHold) {

		tapHold = null;

		self.element.addEventListener("touchstart", function (e) {
			clearTimeout(tapHold);

			tapHold = setTimeout(function () {
				clearTimeout(tapHold);
				tapHold = null;
				tap = false;
				self.table.options.rowTapHold(e, self.getComponent());
			***REMOVED***, 1000);
		***REMOVED***, { passive: true ***REMOVED***);

		self.element.addEventListener("touchend", function (e) {
			clearTimeout(tapHold);
			tapHold = null;
		***REMOVED***);
	***REMOVED***
***REMOVED***;

Row.prototype.generateCells = function () {
	this.cells = this.table.columnManager.generateCells(this);
***REMOVED***;

//functions to setup on first render
Row.prototype.initialize = function (force) {
	var self = this;

	if (!self.initialized || force) {

		self.deleteCells();

		while (self.element.firstChild) {
			self.element.removeChild(self.element.firstChild);
		***REMOVED*** //handle frozen cells
		if (this.table.modExists("frozenColumns")) {
			this.table.modules.frozenColumns.layoutRow(this);
		***REMOVED***

		this.generateCells();

		self.cells.forEach(function (cell) {
			self.element.appendChild(cell.getElement());
			cell.cellRendered();
		***REMOVED***);

		if (force) {
			self.normalizeHeight();
		***REMOVED***

		//setup movable rows
		if (self.table.options.dataTree && self.table.modExists("dataTree")) {
			self.table.modules.dataTree.layoutRow(this);
		***REMOVED***

		//setup column colapse container
		if (self.table.options.responsiveLayout === "collapse" && self.table.modExists("responsiveLayout")) {
			self.table.modules.responsiveLayout.layoutRow(this);
		***REMOVED***

		if (self.table.options.rowFormatter) {
			self.table.options.rowFormatter(self.getComponent());
		***REMOVED***

		//set resizable handles
		if (self.table.options.resizableRows && self.table.modExists("resizeRows")) {
			self.table.modules.resizeRows.initializeRow(self);
		***REMOVED***

		self.initialized = true;
	***REMOVED***
***REMOVED***;

Row.prototype.reinitializeHeight = function () {
	this.heightInitialized = false;

	if (this.element.offsetParent !== null) {
		this.normalizeHeight(true);
	***REMOVED***
***REMOVED***;

Row.prototype.reinitialize = function () {
	this.initialized = false;
	this.heightInitialized = false;

	if (!this.manualHeight) {
		this.height = 0;
		this.heightStyled = "";
	***REMOVED***

	if (this.element.offsetParent !== null) {
		this.initialize(true);
	***REMOVED***
***REMOVED***;

//get heights when doing bulk row style calcs in virtual DOM
Row.prototype.calcHeight = function (force) {

	var maxHeight = 0,
	    minHeight = this.table.options.resizableRows ? this.element.clientHeight : 0;

	this.cells.forEach(function (cell) {
		var height = cell.getHeight();
		if (height > maxHeight) {
			maxHeight = height;
		***REMOVED***
	***REMOVED***);

	if (force) {
		this.height = Math.max(maxHeight, minHeight);
	***REMOVED*** else {
		this.height = this.manualHeight ? this.height : Math.max(maxHeight, minHeight);
	***REMOVED***

	this.heightStyled = this.height ? this.height + "px" : "";
	this.outerHeight = this.element.offsetHeight;
***REMOVED***;

//set of cells
Row.prototype.setCellHeight = function () {
	this.cells.forEach(function (cell) {
		cell.setHeight();
	***REMOVED***);

	this.heightInitialized = true;
***REMOVED***;

Row.prototype.clearCellHeight = function () {
	this.cells.forEach(function (cell) {
		cell.clearHeight();
	***REMOVED***);
***REMOVED***;

//normalize the height of elements in the row
Row.prototype.normalizeHeight = function (force) {

	if (force) {
		this.clearCellHeight();
	***REMOVED***

	this.calcHeight(force);

	this.setCellHeight();
***REMOVED***;

// Row.prototype.setHeight = function(height){
// 	this.height = height;

// 	this.setCellHeight();
// ***REMOVED***;

//set height of rows
Row.prototype.setHeight = function (height, force) {
	if (this.height != height || force) {

		this.manualHeight = true;

		this.height = height;
		this.heightStyled = height ? height + "px" : "";

		this.setCellHeight();

		// this.outerHeight = this.element.outerHeight();
		this.outerHeight = this.element.offsetHeight;
	***REMOVED***
***REMOVED***;

//return rows outer height
Row.prototype.getHeight = function () {
	return this.outerHeight;
***REMOVED***;

//return rows outer Width
Row.prototype.getWidth = function () {
	return this.element.offsetWidth;
***REMOVED***;

//////////////// Cell Management /////////////////

Row.prototype.deleteCell = function (cell) {
	var index = this.cells.indexOf(cell);

	if (index > -1) {
		this.cells.splice(index, 1);
	***REMOVED***
***REMOVED***;

//////////////// Data Management /////////////////

Row.prototype.setData = function (data) {
	if (this.table.modExists("mutator")) {
		data = this.table.modules.mutator.transformRow(data, "data");
	***REMOVED***

	this.data = data;

	if (this.table.options.reactiveData && this.table.modExists("reactiveData", true)) {
		this.table.modules.reactiveData.watchRow(this);
	***REMOVED***
***REMOVED***;

//update the rows data
Row.prototype.updateData = function (updatedData) {
	var _this14 = this;

	var visible = Tabulator.prototype.helpers.elVisible(this.element),
	    tempData = {***REMOVED***,
	    newRowData;

	return new Promise(function (resolve, reject) {

		if (typeof updatedData === "string") {
			updatedData = JSON.parse(updatedData);
		***REMOVED***

		if (_this14.table.options.reactiveData && _this14.table.modExists("reactiveData", true)) {
			_this14.table.modules.reactiveData.block();
		***REMOVED***

		//mutate incomming data if needed
		if (_this14.table.modExists("mutator")) {

			tempData = Object.assign(tempData, _this14.data);
			tempData = Object.assign(tempData, updatedData);

			newRowData = _this14.table.modules.mutator.transformRow(tempData, "data", updatedData);
		***REMOVED*** else {
			newRowData = updatedData;
		***REMOVED***

		//set data
		for (var attrname in newRowData) {
			_this14.data[attrname] = newRowData[attrname];
		***REMOVED***

		if (_this14.table.options.reactiveData && _this14.table.modExists("reactiveData", true)) {
			_this14.table.modules.reactiveData.unblock();
		***REMOVED***

		//update affected cells only
		for (var attrname in updatedData) {

			var columns = _this14.table.columnManager.getColumnsByFieldRoot(attrname);

			columns.forEach(function (column) {
				var cell = _this14.getCell(column.getField());

				if (cell) {
					var value = column.getFieldValue(newRowData);
					if (cell.getValue() != value) {
						cell.setValueProcessData(value);

						if (visible) {
							cell.cellRendered();
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED***);
		***REMOVED***

		//Partial reinitialization if visible
		if (visible) {
			_this14.normalizeHeight();

			if (_this14.table.options.rowFormatter) {
				_this14.table.options.rowFormatter(_this14.getComponent());
			***REMOVED***
		***REMOVED*** else {
			_this14.initialized = false;
			_this14.height = 0;
			_this14.heightStyled = "";
		***REMOVED***

		if (_this14.table.options.dataTree !== false && _this14.table.modExists("dataTree") && _this14.table.modules.dataTree.redrawNeeded(updatedData)) {
			_this14.table.modules.dataTree.initializeRow(_this14);
			_this14.table.modules.dataTree.layoutRow(_this14);
			_this14.table.rowManager.refreshActiveData("tree", false, true);
		***REMOVED***

		//this.reinitialize();

		_this14.table.options.rowUpdated.call(_this14.table, _this14.getComponent());

		resolve();
	***REMOVED***);
***REMOVED***;

Row.prototype.getData = function (transform) {
	var self = this;

	if (transform) {
		if (self.table.modExists("accessor")) {
			return self.table.modules.accessor.transformRow(self.data, transform);
		***REMOVED***
	***REMOVED*** else {
		return this.data;
	***REMOVED***
***REMOVED***;

Row.prototype.getCell = function (column) {
	var match = false;

	column = this.table.columnManager.findColumn(column);

	match = this.cells.find(function (cell) {
		return cell.column === column;
	***REMOVED***);

	return match;
***REMOVED***;

Row.prototype.getCellIndex = function (findCell) {
	return this.cells.findIndex(function (cell) {
		return cell === findCell;
	***REMOVED***);
***REMOVED***;

Row.prototype.findNextEditableCell = function (index) {
	var nextCell = false;

	if (index < this.cells.length - 1) {
		for (var i = index + 1; i < this.cells.length; i++) {
			var cell = this.cells[i];

			if (cell.column.modules.edit && Tabulator.prototype.helpers.elVisible(cell.getElement())) {
				var allowEdit = true;

				if (typeof cell.column.modules.edit.check == "function") {
					allowEdit = cell.column.modules.edit.check(cell.getComponent());
				***REMOVED***

				if (allowEdit) {
					nextCell = cell;
					break;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return nextCell;
***REMOVED***;

Row.prototype.findPrevEditableCell = function (index) {
	var prevCell = false;

	if (index > 0) {
		for (var i = index - 1; i >= 0; i--) {
			var cell = this.cells[i],
			    allowEdit = true;

			if (cell.column.modules.edit && Tabulator.prototype.helpers.elVisible(cell.getElement())) {
				if (typeof cell.column.modules.edit.check == "function") {
					allowEdit = cell.column.modules.edit.check(cell.getComponent());
				***REMOVED***

				if (allowEdit) {
					prevCell = cell;
					break;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return prevCell;
***REMOVED***;

Row.prototype.getCells = function () {
	return this.cells;
***REMOVED***;

Row.prototype.nextRow = function () {
	var row = this.table.rowManager.nextDisplayRow(this, true);
	return row || false;
***REMOVED***;

Row.prototype.prevRow = function () {
	var row = this.table.rowManager.prevDisplayRow(this, true);
	return row || false;
***REMOVED***;

Row.prototype.moveToRow = function (to, before) {
	var toRow = this.table.rowManager.findRow(to);

	if (toRow) {
		this.table.rowManager.moveRowActual(this, toRow, !before);
		this.table.rowManager.refreshActiveData("display", false, true);
	***REMOVED*** else {
		console.warn("Move Error - No matching row found:", to);
	***REMOVED***
***REMOVED***;

///////////////////// Actions  /////////////////////

Row.prototype.delete = function () {
	var _this15 = this;

	return new Promise(function (resolve, reject) {
		var index, rows;

		if (_this15.table.options.history && _this15.table.modExists("history")) {

			if (_this15.table.options.groupBy && _this15.table.modExists("groupRows")) {
				rows = _this15.getGroup().rows;
				index = rows.indexOf(_this15);

				if (index) {
					index = rows[index - 1];
				***REMOVED***
			***REMOVED*** else {
				index = _this15.table.rowManager.getRowIndex(_this15);

				if (index) {
					index = _this15.table.rowManager.rows[index - 1];
				***REMOVED***
			***REMOVED***

			_this15.table.modules.history.action("rowDelete", _this15, { data: _this15.getData(), pos: !index, index: index ***REMOVED***);
		***REMOVED***

		_this15.deleteActual();

		resolve();
	***REMOVED***);
***REMOVED***;

Row.prototype.deleteActual = function (blockRedraw) {
	var index = this.table.rowManager.getRowIndex(this);

	//deselect row if it is selected
	if (this.table.modExists("selectRow")) {
		this.table.modules.selectRow._deselectRow(this, true);
	***REMOVED***

	// if(this.table.options.dataTree && this.table.modExists("dataTree")){
	// 	this.table.modules.dataTree.collapseRow(this, true);
	// ***REMOVED***

	//remove any reactive data watchers from row object
	if (this.table.options.reactiveData && this.table.modExists("reactiveData", true)) {***REMOVED***
	// this.table.modules.reactiveData.unwatchRow(this);


	//remove from group
	if (this.modules.group) {
		this.modules.group.removeRow(this);
	***REMOVED***

	this.table.rowManager.deleteRow(this, blockRedraw);

	this.deleteCells();

	this.initialized = false;
	this.heightInitialized = false;

	//recalc column calculations if present
	if (this.table.modExists("columnCalcs")) {
		if (this.table.options.groupBy && this.table.modExists("groupRows")) {
			this.table.modules.columnCalcs.recalcRowGroup(this);
		***REMOVED*** else {
			this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
		***REMOVED***
	***REMOVED***
***REMOVED***;

Row.prototype.deleteCells = function () {
	var cellCount = this.cells.length;

	for (var i = 0; i < cellCount; i++) {
		this.cells[0].delete();
	***REMOVED***
***REMOVED***;

Row.prototype.wipe = function () {
	this.deleteCells();

	while (this.element.firstChild) {
		this.element.removeChild(this.element.firstChild);
	***REMOVED***this.element = false;
	this.modules = {***REMOVED***;

	if (this.element.parentNode) {
		this.element.parentNode.removeChild(this.element);
	***REMOVED***
***REMOVED***;

Row.prototype.getGroup = function () {
	return this.modules.group || false;
***REMOVED***;

//////////////// Object Generation /////////////////
Row.prototype.getComponent = function () {
	return new RowComponent(this);
***REMOVED***;

//public row object
var CellComponent = function CellComponent(cell) {
	this._cell = cell;
***REMOVED***;

CellComponent.prototype.getValue = function () {
	return this._cell.getValue();
***REMOVED***;

CellComponent.prototype.getOldValue = function () {
	return this._cell.getOldValue();
***REMOVED***;

CellComponent.prototype.getElement = function () {
	return this._cell.getElement();
***REMOVED***;

CellComponent.prototype.getRow = function () {
	return this._cell.row.getComponent();
***REMOVED***;

CellComponent.prototype.getData = function () {
	return this._cell.row.getData();
***REMOVED***;

CellComponent.prototype.getField = function () {
	return this._cell.column.getField();
***REMOVED***;

CellComponent.prototype.getColumn = function () {
	return this._cell.column.getComponent();
***REMOVED***;

CellComponent.prototype.setValue = function (value, mutate) {
	if (typeof mutate == "undefined") {
		mutate = true;
	***REMOVED***

	this._cell.setValue(value, mutate);
***REMOVED***;

CellComponent.prototype.restoreOldValue = function () {
	this._cell.setValueActual(this._cell.getOldValue());
***REMOVED***;

CellComponent.prototype.edit = function (force) {
	return this._cell.edit(force);
***REMOVED***;

CellComponent.prototype.cancelEdit = function () {
	this._cell.cancelEdit();
***REMOVED***;

CellComponent.prototype.nav = function () {
	return this._cell.nav();
***REMOVED***;

CellComponent.prototype.checkHeight = function () {
	this._cell.checkHeight();
***REMOVED***;

CellComponent.prototype.getTable = function () {
	return this._cell.table;
***REMOVED***;

CellComponent.prototype._getSelf = function () {
	return this._cell;
***REMOVED***;

var Cell = function Cell(column, row) {

	this.table = column.table;
	this.column = column;
	this.row = row;
	this.element = null;
	this.value = null;
	this.oldValue = null;
	this.modules = {***REMOVED***;

	this.height = null;
	this.width = null;
	this.minWidth = null;

	this.build();
***REMOVED***;

//////////////// Setup Functions /////////////////

//generate element
Cell.prototype.build = function () {
	this.generateElement();

	this.setWidth();

	this._configureCell();

	this.setValueActual(this.column.getFieldValue(this.row.data));
***REMOVED***;

Cell.prototype.generateElement = function () {
	this.element = document.createElement('div');
	this.element.className = "tabulator-cell";
	this.element.setAttribute("role", "gridcell");
	this.element = this.element;
***REMOVED***;

Cell.prototype._configureCell = function () {
	var self = this,
	    cellEvents = self.column.cellEvents,
	    element = self.element,
	    field = this.column.getField(),
	    vertAligns = {
		top: "flex-start",
		bottom: "flex-end",
		middle: "center"
	***REMOVED***,
	    hozAligns = {
		left: "flex-start",
		right: "flex-end",
		center: "center"
	***REMOVED***;

	//set text alignment
	element.style.textAlign = self.column.hozAlign;

	if (self.column.vertAlign) {
		element.style.display = "inline-flex";

		element.style.alignItems = vertAligns[self.column.vertAlign] || "";

		if (self.column.hozAlign) {
			element.style.justifyContent = hozAligns[self.column.hozAlign] || "";
		***REMOVED***
	***REMOVED***

	if (field) {
		element.setAttribute("tabulator-field", field);
	***REMOVED***

	//add class to cell if needed
	if (self.column.definition.cssClass) {
		var classNames = self.column.definition.cssClass.split(" ");
		classNames.forEach(function (className) {
			element.classList.add(className);
		***REMOVED***);
	***REMOVED***

	//update tooltip on mouse enter
	if (this.table.options.tooltipGenerationMode === "hover") {
		element.addEventListener("mouseenter", function (e) {
			self._generateTooltip();
		***REMOVED***);
	***REMOVED***

	self._bindClickEvents(cellEvents);

	self._bindTouchEvents(cellEvents);

	self._bindMouseEvents(cellEvents);

	if (self.column.modules.edit) {
		self.table.modules.edit.bindEditor(self);
	***REMOVED***

	if (self.column.definition.rowHandle && self.table.options.movableRows !== false && self.table.modExists("moveRow")) {
		self.table.modules.moveRow.initializeCell(self);
	***REMOVED***

	//hide cell if not visible
	if (!self.column.visible) {
		self.hide();
	***REMOVED***
***REMOVED***;

Cell.prototype._bindClickEvents = function (cellEvents) {
	var self = this,
	    element = self.element;

	//set event bindings
	if (cellEvents.cellClick || self.table.options.cellClick) {
		element.addEventListener("click", function (e) {
			var component = self.getComponent();

			if (cellEvents.cellClick) {
				cellEvents.cellClick.call(self.table, e, component);
			***REMOVED***

			if (self.table.options.cellClick) {
				self.table.options.cellClick.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellDblClick || this.table.options.cellDblClick) {
		element.addEventListener("dblclick", function (e) {
			var component = self.getComponent();

			if (cellEvents.cellDblClick) {
				cellEvents.cellDblClick.call(self.table, e, component);
			***REMOVED***

			if (self.table.options.cellDblClick) {
				self.table.options.cellDblClick.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED*** else {
		// element.addEventListener("dblclick", function(e){
		// e.preventDefault();
		// try{
		// 	if (document.selection) { // IE
		// 		var range = document.body.createTextRange();
		// 		range.moveToElementText(self.element);
		// 		range.select();
		// 	***REMOVED*** else if (window.getSelection) {
		// 		var range = document.createRange();
		// 		range.selectNode(self.element);
		// 		window.getSelection().removeAllRanges();
		// 		window.getSelection().addRange(range);
		// 	***REMOVED***
		// ***REMOVED***catch(e){***REMOVED***
		// ***REMOVED***);
	***REMOVED***

	if (cellEvents.cellContext || this.table.options.cellContext) {
		element.addEventListener("contextmenu", function (e) {
			var component = self.getComponent();

			if (cellEvents.cellContext) {
				cellEvents.cellContext.call(self.table, e, component);
			***REMOVED***

			if (self.table.options.cellContext) {
				self.table.options.cellContext.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***
***REMOVED***;

Cell.prototype._bindMouseEvents = function (cellEvents) {
	var self = this,
	    element = self.element;

	if (cellEvents.cellMouseEnter || self.table.options.cellMouseEnter) {
		element.addEventListener("mouseenter", function (e) {
			var component = self.getComponent();

			if (cellEvents.cellMouseEnter) {
				cellEvents.cellMouseEnter.call(self.table, e, component);
			***REMOVED***

			if (self.table.options.cellMouseEnter) {
				self.table.options.cellMouseEnter.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellMouseLeave || self.table.options.cellMouseLeave) {
		element.addEventListener("mouseleave", function (e) {
			var component = self.getComponent();

			if (cellEvents.cellMouseLeave) {
				cellEvents.cellMouseLeave.call(self.table, e, component);
			***REMOVED***

			if (self.table.options.cellMouseLeave) {
				self.table.options.cellMouseLeave.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellMouseOver || self.table.options.cellMouseOver) {
		element.addEventListener("mouseover", function (e) {
			var component = self.getComponent();

			if (cellEvents.cellMouseOver) {
				cellEvents.cellMouseOver.call(self.table, e, component);
			***REMOVED***

			if (self.table.options.cellMouseOver) {
				self.table.options.cellMouseOver.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellMouseOut || self.table.options.cellMouseOut) {
		element.addEventListener("mouseout", function (e) {
			var component = self.getComponent();

			if (cellEvents.cellMouseOut) {
				cellEvents.cellMouseOut.call(self.table, e, component);
			***REMOVED***

			if (self.table.options.cellMouseOut) {
				self.table.options.cellMouseOut.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellMouseMove || self.table.options.cellMouseMove) {
		element.addEventListener("mousemove", function (e) {
			var component = self.getComponent();

			if (cellEvents.cellMouseMove) {
				cellEvents.cellMouseMove.call(self.table, e, component);
			***REMOVED***

			if (self.table.options.cellMouseMove) {
				self.table.options.cellMouseMove.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***
***REMOVED***;

Cell.prototype._bindTouchEvents = function (cellEvents) {
	var self = this,
	    element = self.element,
	    dblTap,
	    tapHold,
	    tap;

	if (cellEvents.cellTap || this.table.options.cellTap) {
		tap = false;

		element.addEventListener("touchstart", function (e) {
			tap = true;
		***REMOVED***, { passive: true ***REMOVED***);

		element.addEventListener("touchend", function (e) {
			if (tap) {
				var component = self.getComponent();

				if (cellEvents.cellTap) {
					cellEvents.cellTap.call(self.table, e, component);
				***REMOVED***

				if (self.table.options.cellTap) {
					self.table.options.cellTap.call(self.table, e, component);
				***REMOVED***
			***REMOVED***

			tap = false;
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellDblTap || this.table.options.cellDblTap) {
		dblTap = null;

		element.addEventListener("touchend", function (e) {

			if (dblTap) {
				clearTimeout(dblTap);
				dblTap = null;

				var component = self.getComponent();

				if (cellEvents.cellDblTap) {
					cellEvents.cellDblTap.call(self.table, e, component);
				***REMOVED***

				if (self.table.options.cellDblTap) {
					self.table.options.cellDblTap.call(self.table, e, component);
				***REMOVED***
			***REMOVED*** else {

				dblTap = setTimeout(function () {
					clearTimeout(dblTap);
					dblTap = null;
				***REMOVED***, 300);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellTapHold || this.table.options.cellTapHold) {
		tapHold = null;

		element.addEventListener("touchstart", function (e) {
			clearTimeout(tapHold);

			tapHold = setTimeout(function () {
				clearTimeout(tapHold);
				tapHold = null;
				tap = false;
				var component = self.getComponent();

				if (cellEvents.cellTapHold) {
					cellEvents.cellTapHold.call(self.table, e, component);
				***REMOVED***

				if (self.table.options.cellTapHold) {
					self.table.options.cellTapHold.call(self.table, e, component);
				***REMOVED***
			***REMOVED***, 1000);
		***REMOVED***, { passive: true ***REMOVED***);

		element.addEventListener("touchend", function (e) {
			clearTimeout(tapHold);
			tapHold = null;
		***REMOVED***);
	***REMOVED***
***REMOVED***;

//generate cell contents
Cell.prototype._generateContents = function () {
	var val;

	if (this.table.modExists("format")) {
		val = this.table.modules.format.formatValue(this);
	***REMOVED*** else {
		val = this.element.innerHTML = this.value;
	***REMOVED***

	switch (typeof val === 'undefined' ? 'undefined' : _typeof(val)) {
		case "object":
			if (val instanceof Node) {

				//clear previous cell contents
				while (this.element.firstChild) {
					this.element.removeChild(this.element.firstChild);
				***REMOVED***this.element.appendChild(val);
			***REMOVED*** else {
				this.element.innerHTML = "";

				if (val != null) {
					console.warn("Format Error - Formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:", val);
				***REMOVED***
			***REMOVED***
			break;
		case "undefined":
		case "null":
			this.element.innerHTML = "";
			break;
		default:
			this.element.innerHTML = val;
	***REMOVED***
***REMOVED***;

Cell.prototype.cellRendered = function () {
	if (this.table.modExists("format") && this.table.modules.format.cellRendered) {
		this.table.modules.format.cellRendered(this);
	***REMOVED***
***REMOVED***;

//generate tooltip text
Cell.prototype._generateTooltip = function () {
	var tooltip = this.column.tooltip;

	if (tooltip) {
		if (tooltip === true) {
			tooltip = this.value;
		***REMOVED*** else if (typeof tooltip == "function") {
			tooltip = tooltip(this.getComponent());

			if (tooltip === false) {
				tooltip = "";
			***REMOVED***
		***REMOVED***

		if (typeof tooltip === "undefined") {
			tooltip = "";
		***REMOVED***

		this.element.setAttribute("title", tooltip);
	***REMOVED*** else {
		this.element.setAttribute("title", "");
	***REMOVED***
***REMOVED***;

//////////////////// Getters ////////////////////
Cell.prototype.getElement = function () {
	return this.element;
***REMOVED***;

Cell.prototype.getValue = function () {
	return this.value;
***REMOVED***;

Cell.prototype.getOldValue = function () {
	return this.oldValue;
***REMOVED***;

//////////////////// Actions ////////////////////

Cell.prototype.setValue = function (value, mutate) {

	var changed = this.setValueProcessData(value, mutate),
	    component;

	if (changed) {
		if (this.table.options.history && this.table.modExists("history")) {
			this.table.modules.history.action("cellEdit", this, { oldValue: this.oldValue, newValue: this.value ***REMOVED***);
		***REMOVED***

		component = this.getComponent();

		if (this.column.cellEvents.cellEdited) {
			this.column.cellEvents.cellEdited.call(this.table, component);
		***REMOVED***

		this.cellRendered();

		this.table.options.cellEdited.call(this.table, component);

		this.table.options.dataEdited.call(this.table, this.table.rowManager.getData());
	***REMOVED***
***REMOVED***;

Cell.prototype.setValueProcessData = function (value, mutate) {
	var changed = false;

	if (this.value != value) {

		changed = true;

		if (mutate) {
			if (this.column.modules.mutate) {
				value = this.table.modules.mutator.transformCell(this, value);
			***REMOVED***
		***REMOVED***
	***REMOVED***

	this.setValueActual(value);

	if (changed && this.table.modExists("columnCalcs")) {
		if (this.column.definition.topCalc || this.column.definition.bottomCalc) {
			if (this.table.options.groupBy && this.table.modExists("groupRows")) {

				if (this.table.options.columnCalcs == "table" || this.table.options.columnCalcs == "both") {
					this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
				***REMOVED***

				if (this.table.options.columnCalcs != "table") {
					this.table.modules.columnCalcs.recalcRowGroup(this.row);
				***REMOVED***
			***REMOVED*** else {
				this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return changed;
***REMOVED***;

Cell.prototype.setValueActual = function (value) {
	this.oldValue = this.value;

	this.value = value;

	if (this.table.options.reactiveData && this.table.modExists("reactiveData")) {
		this.table.modules.reactiveData.block();
	***REMOVED***

	this.column.setFieldValue(this.row.data, value);

	if (this.table.options.reactiveData && this.table.modExists("reactiveData")) {
		this.table.modules.reactiveData.unblock();
	***REMOVED***

	this._generateContents();
	this._generateTooltip();

	//set resizable handles
	if (this.table.options.resizableColumns && this.table.modExists("resizeColumns")) {
		this.table.modules.resizeColumns.initializeColumn("cell", this.column, this.element);
	***REMOVED***

	//set column menu
	if (this.column.definition.contextMenu && this.table.modExists("menu")) {
		this.table.modules.menu.initializeCell(this);
	***REMOVED***

	//handle frozen cells
	if (this.table.modExists("frozenColumns")) {
		this.table.modules.frozenColumns.layoutElement(this.element, this.column);
	***REMOVED***
***REMOVED***;

Cell.prototype.setWidth = function () {
	this.width = this.column.width;
	this.element.style.width = this.column.widthStyled;
***REMOVED***;

Cell.prototype.clearWidth = function () {
	this.width = "";
	this.element.style.width = "";
***REMOVED***;

Cell.prototype.getWidth = function () {
	return this.width || this.element.offsetWidth;
***REMOVED***;

Cell.prototype.setMinWidth = function () {
	this.minWidth = this.column.minWidth;
	this.element.style.minWidth = this.column.minWidthStyled;
***REMOVED***;

Cell.prototype.checkHeight = function () {
	// var height = this.element.css("height");
	this.row.reinitializeHeight();
***REMOVED***;

Cell.prototype.clearHeight = function () {
	this.element.style.height = "";
	this.height = null;
***REMOVED***;

Cell.prototype.setHeight = function () {
	this.height = this.row.height;
	this.element.style.height = this.row.heightStyled;
***REMOVED***;

Cell.prototype.getHeight = function () {
	return this.height || this.element.offsetHeight;
***REMOVED***;

Cell.prototype.show = function () {
	this.element.style.display = "";
***REMOVED***;

Cell.prototype.hide = function () {
	this.element.style.display = "none";
***REMOVED***;

Cell.prototype.edit = function (force) {
	if (this.table.modExists("edit", true)) {
		return this.table.modules.edit.editCell(this, force);
	***REMOVED***
***REMOVED***;

Cell.prototype.cancelEdit = function () {
	if (this.table.modExists("edit", true)) {
		var editing = this.table.modules.edit.getCurrentCell();

		if (editing && editing._getSelf() === this) {
			this.table.modules.edit.cancelEdit();
		***REMOVED*** else {
			console.warn("Cancel Editor Error - This cell is not currently being edited ");
		***REMOVED***
	***REMOVED***
***REMOVED***;

Cell.prototype.delete = function () {
	if (!this.table.rowManager.redrawBlock) {
		this.element.parentNode.removeChild(this.element);
	***REMOVED***
	this.element = false;
	this.column.deleteCell(this);
	this.row.deleteCell(this);
	this.calcs = {***REMOVED***;
***REMOVED***;

//////////////// Navigation /////////////////

Cell.prototype.nav = function () {

	var self = this,
	    nextCell = false,
	    index = this.row.getCellIndex(this);

	return {
		next: function next() {
			var nextCell = this.right(),
			    nextRow;

			if (!nextCell) {
				nextRow = self.table.rowManager.nextDisplayRow(self.row, true);

				if (nextRow) {
					nextCell = nextRow.findNextEditableCell(-1);

					if (nextCell) {
						nextCell.edit();
						return true;
					***REMOVED***
				***REMOVED***
			***REMOVED*** else {
				return true;
			***REMOVED***

			return false;
		***REMOVED***,
		prev: function prev() {
			var nextCell = this.left(),
			    prevRow;

			if (!nextCell) {
				prevRow = self.table.rowManager.prevDisplayRow(self.row, true);

				if (prevRow) {
					nextCell = prevRow.findPrevEditableCell(prevRow.cells.length);

					if (nextCell) {
						nextCell.edit();
						return true;
					***REMOVED***
				***REMOVED***
			***REMOVED*** else {
				return true;
			***REMOVED***

			return false;
		***REMOVED***,
		left: function left() {

			nextCell = self.row.findPrevEditableCell(index);

			if (nextCell) {
				nextCell.edit();
				return true;
			***REMOVED*** else {
				return false;
			***REMOVED***
		***REMOVED***,
		right: function right() {
			nextCell = self.row.findNextEditableCell(index);

			if (nextCell) {
				nextCell.edit();
				return true;
			***REMOVED*** else {
				return false;
			***REMOVED***
		***REMOVED***,
		up: function up() {
			var nextRow = self.table.rowManager.prevDisplayRow(self.row, true);

			if (nextRow) {
				nextRow.cells[index].edit();
			***REMOVED***
		***REMOVED***,
		down: function down() {
			var nextRow = self.table.rowManager.nextDisplayRow(self.row, true);

			if (nextRow) {
				nextRow.cells[index].edit();
			***REMOVED***
		***REMOVED***

	***REMOVED***;
***REMOVED***;

Cell.prototype.getIndex = function () {
	this.row.getCellIndex(this);
***REMOVED***;

//////////////// Object Generation /////////////////
Cell.prototype.getComponent = function () {
	return new CellComponent(this);
***REMOVED***;
var FooterManager = function FooterManager(table) {
	this.table = table;
	this.active = false;
	this.element = this.createElement(); //containing element
	this.external = false;
	this.links = [];

	this._initialize();
***REMOVED***;

FooterManager.prototype.createElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-footer");

	return el;
***REMOVED***;

FooterManager.prototype._initialize = function (element) {
	if (this.table.options.footerElement) {

		switch (_typeof(this.table.options.footerElement)) {
			case "string":

				if (this.table.options.footerElement[0] === "<") {
					this.element.innerHTML = this.table.options.footerElement;
				***REMOVED*** else {
					this.external = true;
					this.element = document.querySelector(this.table.options.footerElement);
				***REMOVED***
				break;
			default:
				this.element = this.table.options.footerElement;
				break;
		***REMOVED***
	***REMOVED***
***REMOVED***;

FooterManager.prototype.getElement = function () {
	return this.element;
***REMOVED***;

FooterManager.prototype.append = function (element, parent) {
	this.activate(parent);

	this.element.appendChild(element);
	this.table.rowManager.adjustTableSize();
***REMOVED***;

FooterManager.prototype.prepend = function (element, parent) {
	this.activate(parent);

	this.element.insertBefore(element, this.element.firstChild);
	this.table.rowManager.adjustTableSize();
***REMOVED***;

FooterManager.prototype.remove = function (element) {
	element.parentNode.removeChild(element);
	this.deactivate();
***REMOVED***;

FooterManager.prototype.deactivate = function (force) {
	if (!this.element.firstChild || force) {
		if (!this.external) {
			this.element.parentNode.removeChild(this.element);
		***REMOVED***
		this.active = false;
	***REMOVED***

	// this.table.rowManager.adjustTableSize();
***REMOVED***;

FooterManager.prototype.activate = function (parent) {
	if (!this.active) {
		this.active = true;
		if (!this.external) {
			this.table.element.appendChild(this.getElement());
			this.table.element.style.display = '';
		***REMOVED***
	***REMOVED***

	if (parent) {
		this.links.push(parent);
	***REMOVED***
***REMOVED***;

FooterManager.prototype.redraw = function () {
	this.links.forEach(function (link) {
		link.footerRedraw();
	***REMOVED***);
***REMOVED***;

var Tabulator = function Tabulator(element, options) {

	this.options = {***REMOVED***;

	this.columnManager = null; // hold Column Manager
	this.rowManager = null; //hold Row Manager
	this.footerManager = null; //holder Footer Manager
	this.browser = ""; //hold current browser type
	this.browserSlow = false; //handle reduced functionality for slower browsers
	this.browserMobile = false; //check if running on moble, prevent resize cancelling edit on keyboard appearence

	this.modules = {***REMOVED***; //hold all modules bound to this table

	this.initializeElement(element);
	this.initializeOptions(options || {***REMOVED***);
	this._create();

	Tabulator.prototype.comms.register(this); //register table for inderdevice communication
***REMOVED***;

//default setup options
Tabulator.prototype.defaultOptions = {

	height: false, //height of tabulator
	minHeight: false, //minimum height of tabulator
	maxHeight: false, //maximum height of tabulator

	layout: "fitData", ///layout type "fitColumns" | "fitData"
	layoutColumnsOnNewData: false, //update column widths on setData

	columnMinWidth: 40, //minimum global width for a column
	columnHeaderVertAlign: "top", //vertical alignment of column headers
	columnVertAlign: false, // DEPRECATED - Left to allow warning

	resizableColumns: true, //resizable columns
	resizableRows: false, //resizable rows
	autoResize: true, //auto resize table

	columns: [], //store for colum header info

	cellHozAlign: "", //horizontal align columns
	cellVertAlign: "", //certical align columns


	data: [], //default starting data

	autoColumns: false, //build columns from data row structure

	reactiveData: false, //enable data reactivity

	nestedFieldSeparator: ".", //seperatpr for nested data

	tooltips: false, //Tool tip value
	tooltipsHeader: false, //Tool tip for headers
	tooltipGenerationMode: "load", //when to generate tooltips

	initialSort: false, //initial sorting criteria
	initialFilter: false, //initial filtering criteria
	initialHeaderFilter: false, //initial header filtering criteria

	columnHeaderSortMulti: true, //multiple or single column sorting

	sortOrderReverse: false, //reverse internal sort ordering

	headerSort: true, //set default global header sort
	headerSortTristate: false, //set default tristate header sorting

	footerElement: false, //hold footer element

	index: "id", //filed for row index

	keybindings: [], //array for keybindings

	tabEndNewRow: false, //create new row when tab to end of table

	invalidOptionWarnings: true, //allow toggling of invalid option warnings

	clipboard: false, //enable clipboard
	clipboardCopyStyled: true, //formatted table data
	clipboardCopyConfig: false, //clipboard config
	clipboardCopyFormatter: false, //DEPRICATED - REMOVE in 5.0
	clipboardCopyRowRange: "active", //restrict clipboard to visible rows only
	clipboardPasteParser: "table", //convert pasted clipboard data to rows
	clipboardPasteAction: "insert", //how to insert pasted data into the table

	clipboardCopied: function clipboardCopied() {***REMOVED***, //data has been copied to the clipboard
	clipboardPasted: function clipboardPasted() {***REMOVED***, //data has been pasted into the table
	clipboardPasteError: function clipboardPasteError() {***REMOVED***, //data has not successfully been pasted into the table

	downloadDataFormatter: false, //function to manipulate table data before it is downloaded
	downloadReady: function downloadReady(data, blob) {
		return blob;
	***REMOVED***, //function to manipulate download data
	downloadComplete: false, //function to manipulate download data
	downloadConfig: false, //download config

	dataTree: false, //enable data tree
	dataTreeElementColumn: false,
	dataTreeBranchElement: true, //show data tree branch element
	dataTreeChildIndent: 9, //data tree child indent in px
	dataTreeChildField: "_children", //data tre column field to look for child rows
	dataTreeCollapseElement: false, //data tree row collapse element
	dataTreeExpandElement: false, //data tree row expand element
	dataTreeStartExpanded: false,
	dataTreeRowExpanded: function dataTreeRowExpanded() {***REMOVED***, //row has been expanded
	dataTreeRowCollapsed: function dataTreeRowCollapsed() {***REMOVED***, //row has been collapsed
	dataTreeChildColumnCalcs: false, //include visible data tree rows in column calculations
	dataTreeSelectPropagate: false, //seleccting a parent row selects its children

	printAsHtml: false, //enable print as html
	printFormatter: false, //printing page formatter
	printHeader: false, //page header contents
	printFooter: false, //page footer contents
	printCopyStyle: true, //DEPRICATED - REMOVE in 5.0
	printStyled: true, //enable print as html styling
	printVisibleRows: true, //DEPRICATED - REMOVE in 5.0
	printRowRange: "visible", //restrict print to visible rows only
	printConfig: {***REMOVED***, //print config options

	addRowPos: "bottom", //position to insert blank rows, top|bottom

	selectable: "highlight", //highlight rows on hover
	selectableRangeMode: "drag", //highlight rows on hover
	selectableRollingSelection: true, //roll selection once maximum number of selectable rows is reached
	selectablePersistence: true, // maintain selection when table view is updated
	selectableCheck: function selectableCheck(data, row) {
		return true;
	***REMOVED***, //check wheather row is selectable

	headerFilterLiveFilterDelay: 300, //delay before updating column after user types in header filter
	headerFilterPlaceholder: false, //placeholder text to display in header filters

	headerVisible: true, //hide header

	history: false, //enable edit history

	locale: false, //current system language
	langs: {***REMOVED***,

	virtualDom: true, //enable DOM virtualization
	virtualDomBuffer: 0, // set virtual DOM buffer size

	persistentLayout: false, //DEPRICATED - REMOVE in 5.0
	persistentSort: false, //DEPRICATED - REMOVE in 5.0
	persistentFilter: false, //DEPRICATED - REMOVE in 5.0
	persistenceID: "", //key for persistent storage
	persistenceMode: true, //mode for storing persistence information
	persistenceReaderFunc: false, //function for handling persistence data reading
	persistenceWriterFunc: false, //function for handling persistence data writing

	persistence: false,

	responsiveLayout: false, //responsive layout flags
	responsiveLayoutCollapseStartOpen: true, //start showing collapsed data
	responsiveLayoutCollapseUseFormatters: true, //responsive layout collapse formatter
	responsiveLayoutCollapseFormatter: false, //responsive layout collapse formatter

	pagination: false, //set pagination type
	paginationSize: false, //set number of rows to a page
	paginationInitialPage: 1, //initail page to show on load
	paginationButtonCount: 5, // set count of page button
	paginationSizeSelector: false, //add pagination size selector element
	paginationElement: false, //element to hold pagination numbers
	paginationDataSent: {***REMOVED***, //pagination data sent to the server
	paginationDataReceived: {***REMOVED***, //pagination data received from the server
	paginationAddRow: "page", //add rows on table or page

	ajaxURL: false, //url for ajax loading
	ajaxURLGenerator: false,
	ajaxParams: {***REMOVED***, //params for ajax loading
	ajaxConfig: "get", //ajax request type
	ajaxContentType: "form", //ajax request type
	ajaxRequestFunc: false, //promise function
	ajaxLoader: true, //show loader
	ajaxLoaderLoading: false, //loader element
	ajaxLoaderError: false, //loader element
	ajaxFiltering: false,
	ajaxSorting: false,
	ajaxProgressiveLoad: false, //progressive loading
	ajaxProgressiveLoadDelay: 0, //delay between requests
	ajaxProgressiveLoadScrollMargin: 0, //margin before scroll begins

	groupBy: false, //enable table grouping and set field to group by
	groupStartOpen: true, //starting state of group
	groupValues: false,

	groupHeader: false, //header generation function

	htmlOutputConfig: false, //html outypu config

	movableColumns: false, //enable movable columns

	movableRows: false, //enable movable rows
	movableRowsConnectedTables: false, //tables for movable rows to be connected to
	movableRowsSender: false,
	movableRowsReceiver: "insert",
	movableRowsSendingStart: function movableRowsSendingStart() {***REMOVED***,
	movableRowsSent: function movableRowsSent() {***REMOVED***,
	movableRowsSentFailed: function movableRowsSentFailed() {***REMOVED***,
	movableRowsSendingStop: function movableRowsSendingStop() {***REMOVED***,
	movableRowsReceivingStart: function movableRowsReceivingStart() {***REMOVED***,
	movableRowsReceived: function movableRowsReceived() {***REMOVED***,
	movableRowsReceivedFailed: function movableRowsReceivedFailed() {***REMOVED***,
	movableRowsReceivingStop: function movableRowsReceivingStop() {***REMOVED***,

	scrollToRowPosition: "top",
	scrollToRowIfVisible: true,

	scrollToColumnPosition: "left",
	scrollToColumnIfVisible: true,

	rowFormatter: false,
	rowFormatterPrint: null,
	rowFormatterClipboard: null,
	rowFormatterHtmlOutput: null,

	placeholder: false,

	//table building callbacks
	tableBuilding: function tableBuilding() {***REMOVED***,
	tableBuilt: function tableBuilt() {***REMOVED***,

	//render callbacks
	renderStarted: function renderStarted() {***REMOVED***,
	renderComplete: function renderComplete() {***REMOVED***,

	//row callbacks
	rowClick: false,
	rowDblClick: false,
	rowContext: false,
	rowTap: false,
	rowDblTap: false,
	rowTapHold: false,
	rowMouseEnter: false,
	rowMouseLeave: false,
	rowMouseOver: false,
	rowMouseOut: false,
	rowMouseMove: false,
	rowContextMenu: false,
	rowAdded: function rowAdded() {***REMOVED***,
	rowDeleted: function rowDeleted() {***REMOVED***,
	rowMoved: function rowMoved() {***REMOVED***,
	rowUpdated: function rowUpdated() {***REMOVED***,
	rowSelectionChanged: function rowSelectionChanged() {***REMOVED***,
	rowSelected: function rowSelected() {***REMOVED***,
	rowDeselected: function rowDeselected() {***REMOVED***,
	rowResized: function rowResized() {***REMOVED***,

	//cell callbacks
	//row callbacks
	cellClick: false,
	cellDblClick: false,
	cellContext: false,
	cellTap: false,
	cellDblTap: false,
	cellTapHold: false,
	cellMouseEnter: false,
	cellMouseLeave: false,
	cellMouseOver: false,
	cellMouseOut: false,
	cellMouseMove: false,
	cellEditing: function cellEditing() {***REMOVED***,
	cellEdited: function cellEdited() {***REMOVED***,
	cellEditCancelled: function cellEditCancelled() {***REMOVED***,

	//column callbacks
	columnMoved: false,
	columnResized: function columnResized() {***REMOVED***,
	columnTitleChanged: function columnTitleChanged() {***REMOVED***,
	columnVisibilityChanged: function columnVisibilityChanged() {***REMOVED***,

	//HTML iport callbacks
	htmlImporting: function htmlImporting() {***REMOVED***,
	htmlImported: function htmlImported() {***REMOVED***,

	//data callbacks
	dataLoading: function dataLoading() {***REMOVED***,
	dataLoaded: function dataLoaded() {***REMOVED***,
	dataEdited: function dataEdited() {***REMOVED***,

	//ajax callbacks
	ajaxRequesting: function ajaxRequesting() {***REMOVED***,
	ajaxResponse: false,
	ajaxError: function ajaxError() {***REMOVED***,

	//filtering callbacks
	dataFiltering: false,
	dataFiltered: false,

	//sorting callbacks
	dataSorting: function dataSorting() {***REMOVED***,
	dataSorted: function dataSorted() {***REMOVED***,

	//grouping callbacks
	groupToggleElement: "arrow",
	groupClosedShowCalcs: false,
	dataGrouping: function dataGrouping() {***REMOVED***,
	dataGrouped: false,
	groupVisibilityChanged: function groupVisibilityChanged() {***REMOVED***,
	groupClick: false,
	groupDblClick: false,
	groupContext: false,
	groupTap: false,
	groupDblTap: false,
	groupTapHold: false,

	columnCalcs: true,

	//pagination callbacks
	pageLoaded: function pageLoaded() {***REMOVED***,

	//localization callbacks
	localized: function localized() {***REMOVED***,

	//validation has failed
	validationFailed: function validationFailed() {***REMOVED***,

	//history callbacks
	historyUndo: function historyUndo() {***REMOVED***,
	historyRedo: function historyRedo() {***REMOVED***,

	//scroll callbacks
	scrollHorizontal: function scrollHorizontal() {***REMOVED***,
	scrollVertical: function scrollVertical() {***REMOVED***

***REMOVED***;

Tabulator.prototype.initializeOptions = function (options) {

	//warn user if option is not available
	if (options.invalidOptionWarnings !== false) {
		for (var key in options) {
			if (typeof this.defaultOptions[key] === "undefined") {
				console.warn("Invalid table constructor option:", key);
			***REMOVED***
		***REMOVED***
	***REMOVED***

	//assign options to table
	for (var key in this.defaultOptions) {
		if (key in options) {
			this.options[key] = options[key];
		***REMOVED*** else {
			if (Array.isArray(this.defaultOptions[key])) {
				this.options[key] = [];
			***REMOVED*** else if (_typeof(this.defaultOptions[key]) === "object" && this.defaultOptions[key] !== null) {
				this.options[key] = {***REMOVED***;
			***REMOVED*** else {
				this.options[key] = this.defaultOptions[key];
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.initializeElement = function (element) {

	if (typeof HTMLElement !== "undefined" && element instanceof HTMLElement) {
		this.element = element;
		return true;
	***REMOVED*** else if (typeof element === "string") {
		this.element = document.querySelector(element);

		if (this.element) {
			return true;
		***REMOVED*** else {
			console.error("Tabulator Creation Error - no element found matching selector: ", element);
			return false;
		***REMOVED***
	***REMOVED*** else {
		console.error("Tabulator Creation Error - Invalid element provided:", element);
		return false;
	***REMOVED***
***REMOVED***;

//convert depricated functionality to new functions
Tabulator.prototype._mapDepricatedFunctionality = function () {

	//map depricated persistance setup options
	if (this.options.persistentLayout || this.options.persistentSort || this.options.persistentFilter) {
		if (!this.options.persistence) {
			this.options.persistence = {***REMOVED***;
		***REMOVED***
	***REMOVED***

	if (typeof this.options.clipboardCopyHeader !== "undefined") {
		this.options.columnHeaders = this.options.clipboardCopyHeader;
		console.warn("DEPRECATION WARNING - clipboardCopyHeader option has been deprecated, please use the columnHeaders property on the clipboardCopyConfig option");
	***REMOVED***

	if (this.options.printVisibleRows !== true) {
		console.warn("printVisibleRows option is deprecated, you should now use the printRowRange option");

		this.options.persistence.printRowRange = "active";
	***REMOVED***

	if (this.options.printCopyStyle !== true) {
		console.warn("printCopyStyle option is deprecated, you should now use the printStyled option");

		this.options.persistence.printStyled = this.options.printCopyStyle;
	***REMOVED***

	if (this.options.persistentLayout) {
		console.warn("persistentLayout option is deprecated, you should now use the persistence option");

		if (this.options.persistence !== true && typeof this.options.persistence.columns === "undefined") {
			this.options.persistence.columns = true;
		***REMOVED***
	***REMOVED***

	if (this.options.persistentSort) {
		console.warn("persistentSort option is deprecated, you should now use the persistence option");

		if (this.options.persistence !== true && typeof this.options.persistence.sort === "undefined") {
			this.options.persistence.sort = true;
		***REMOVED***
	***REMOVED***

	if (this.options.persistentFilter) {
		console.warn("persistentFilter option is deprecated, you should now use the persistence option");

		if (this.options.persistence !== true && typeof this.options.persistence.filter === "undefined") {
			this.options.persistence.filter = true;
		***REMOVED***
	***REMOVED***

	if (this.options.columnVertAlign) {
		console.warn("columnVertAlign option is deprecated, you should now use the columnHeaderVertAlign option");

		this.options.columnHeaderVertAlign = this.options.columnVertAlign;
	***REMOVED***
***REMOVED***;

Tabulator.prototype._clearSelection = function () {

	this.element.classList.add("tabulator-block-select");

	if (window.getSelection) {
		if (window.getSelection().empty) {
			// Chrome
			window.getSelection().empty();
		***REMOVED*** else if (window.getSelection().removeAllRanges) {
			// Firefox
			window.getSelection().removeAllRanges();
		***REMOVED***
	***REMOVED*** else if (document.selection) {
		// IE?
		document.selection.empty();
	***REMOVED***

	this.element.classList.remove("tabulator-block-select");
***REMOVED***;

//concreate table
Tabulator.prototype._create = function () {
	this._clearObjectPointers();

	this._mapDepricatedFunctionality();

	this.bindModules();

	if (this.element.tagName === "TABLE") {
		if (this.modExists("htmlTableImport", true)) {
			this.modules.htmlTableImport.parseTable();
		***REMOVED***
	***REMOVED***

	this.columnManager = new ColumnManager(this);
	this.rowManager = new RowManager(this);
	this.footerManager = new FooterManager(this);

	this.columnManager.setRowManager(this.rowManager);
	this.rowManager.setColumnManager(this.columnManager);

	this._buildElement();

	this._loadInitialData();
***REMOVED***;

//clear pointers to objects in default config object
Tabulator.prototype._clearObjectPointers = function () {
	this.options.columns = this.options.columns.slice(0);

	if (!this.options.reactiveData) {
		this.options.data = this.options.data.slice(0);
	***REMOVED***
***REMOVED***;

//build tabulator element
Tabulator.prototype._buildElement = function () {
	var _this16 = this;

	var element = this.element,
	    mod = this.modules,
	    options = this.options;

	options.tableBuilding.call(this);

	element.classList.add("tabulator");
	element.setAttribute("role", "grid");

	//empty element
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	***REMOVED*** //set table height
	if (options.height) {
		options.height = isNaN(options.height) ? options.height : options.height + "px";
		element.style.height = options.height;
	***REMOVED***

	//set table min height
	if (options.minHeight !== false) {
		options.minHeight = isNaN(options.minHeight) ? options.minHeight : options.minHeight + "px";
		element.style.minHeight = options.minHeight;
	***REMOVED***

	//set table maxHeight
	if (options.maxHeight !== false) {
		options.maxHeight = isNaN(options.maxHeight) ? options.maxHeight : options.maxHeight + "px";
		element.style.maxHeight = options.maxHeight;
	***REMOVED***

	this.columnManager.initialize();
	this.rowManager.initialize();

	this._detectBrowser();

	if (this.modExists("layout", true)) {
		mod.layout.initialize(options.layout);
	***REMOVED***

	//set localization
	if (options.headerFilterPlaceholder !== false) {
		mod.localize.setHeaderFilterPlaceholder(options.headerFilterPlaceholder);
	***REMOVED***

	for (var locale in options.langs) {
		mod.localize.installLang(locale, options.langs[locale]);
	***REMOVED***

	mod.localize.setLocale(options.locale);

	//configure placeholder element
	if (typeof options.placeholder == "string") {

		var el = document.createElement("div");
		el.classList.add("tabulator-placeholder");

		var span = document.createElement("span");
		span.innerHTML = options.placeholder;

		el.appendChild(span);

		options.placeholder = el;
	***REMOVED***

	//build table elements
	element.appendChild(this.columnManager.getElement());
	element.appendChild(this.rowManager.getElement());

	if (options.footerElement) {
		this.footerManager.activate();
	***REMOVED***

	if (options.persistence && this.modExists("persistence", true)) {
		mod.persistence.initialize();
	***REMOVED***

	if (options.persistence && this.modExists("persistence", true) && mod.persistence.config.columns) {
		options.columns = mod.persistence.load("columns", options.columns);
	***REMOVED***

	if (options.movableRows && this.modExists("moveRow")) {
		mod.moveRow.initialize();
	***REMOVED***

	if (options.autoColumns && this.options.data) {
		this.columnManager.generateColumnsFromRowData(this.options.data);
	***REMOVED***

	if (this.modExists("columnCalcs")) {
		mod.columnCalcs.initialize();
	***REMOVED***

	this.columnManager.setColumns(options.columns);

	if (options.dataTree && this.modExists("dataTree", true)) {
		mod.dataTree.initialize();
	***REMOVED***

	if (this.modExists("frozenRows")) {
		this.modules.frozenRows.initialize();
	***REMOVED***

	if ((options.persistence && this.modExists("persistence", true) && mod.persistence.config.sort || options.initialSort) && this.modExists("sort", true)) {
		var sorters = [];

		if (options.persistence && this.modExists("persistence", true) && mod.persistence.config.sort) {
			sorters = mod.persistence.load("sort");

			if (sorters === false && options.initialSort) {
				sorters = options.initialSort;
			***REMOVED***
		***REMOVED*** else if (options.initialSort) {
			sorters = options.initialSort;
		***REMOVED***

		mod.sort.setSort(sorters);
	***REMOVED***

	if ((options.persistence && this.modExists("persistence", true) && mod.persistence.config.filter || options.initialFilter) && this.modExists("filter", true)) {
		var filters = [];

		if (options.persistence && this.modExists("persistence", true) && mod.persistence.config.filter) {
			filters = mod.persistence.load("filter");

			if (filters === false && options.initialFilter) {
				filters = options.initialFilter;
			***REMOVED***
		***REMOVED*** else if (options.initialFilter) {
			filters = options.initialFilter;
		***REMOVED***

		mod.filter.setFilter(filters);
	***REMOVED***

	if (options.initialHeaderFilter && this.modExists("filter", true)) {
		options.initialHeaderFilter.forEach(function (item) {

			var column = _this16.columnManager.findColumn(item.field);

			if (column) {
				mod.filter.setHeaderFilterValue(column, item.value);
			***REMOVED*** else {
				console.warn("Column Filter Error - No matching column found:", item.field);
				return false;
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (this.modExists("ajax")) {
		mod.ajax.initialize();
	***REMOVED***

	if (options.pagination && this.modExists("page", true)) {
		mod.page.initialize();
	***REMOVED***

	if (options.groupBy && this.modExists("groupRows", true)) {
		mod.groupRows.initialize();
	***REMOVED***

	if (this.modExists("keybindings")) {
		mod.keybindings.initialize();
	***REMOVED***

	if (this.modExists("selectRow")) {
		mod.selectRow.clearSelectionData(true);
	***REMOVED***

	if (options.autoResize && this.modExists("resizeTable")) {
		mod.resizeTable.initialize();
	***REMOVED***

	if (this.modExists("clipboard")) {
		mod.clipboard.initialize();
	***REMOVED***

	if (options.printAsHtml && this.modExists("print")) {
		mod.print.initialize();
	***REMOVED***

	options.tableBuilt.call(this);
***REMOVED***;

Tabulator.prototype._loadInitialData = function () {
	var self = this;

	if (self.options.pagination && self.modExists("page")) {
		self.modules.page.reset(true, true);

		if (self.options.pagination == "local") {
			if (self.options.data.length) {
				self.rowManager.setData(self.options.data, false, true);
			***REMOVED*** else {
				if ((self.options.ajaxURL || self.options.ajaxURLGenerator) && self.modExists("ajax")) {
					self.modules.ajax.loadData(false, true).then(function () {***REMOVED***).catch(function () {
						if (self.options.paginationInitialPage) {
							self.modules.page.setPage(self.options.paginationInitialPage);
						***REMOVED***
					***REMOVED***);

					return;
				***REMOVED*** else {
					self.rowManager.setData(self.options.data, false, true);
				***REMOVED***
			***REMOVED***

			if (self.options.paginationInitialPage) {
				self.modules.page.setPage(self.options.paginationInitialPage);
			***REMOVED***
		***REMOVED*** else {
			if (self.options.ajaxURL) {
				self.modules.page.setPage(self.options.paginationInitialPage).then(function () {***REMOVED***).catch(function () {***REMOVED***);
			***REMOVED*** else {
				self.rowManager.setData([], false, true);
			***REMOVED***
		***REMOVED***
	***REMOVED*** else {
		if (self.options.data.length) {
			self.rowManager.setData(self.options.data);
		***REMOVED*** else {
			if ((self.options.ajaxURL || self.options.ajaxURLGenerator) && self.modExists("ajax")) {
				self.modules.ajax.loadData(false, true).then(function () {***REMOVED***).catch(function () {***REMOVED***);
			***REMOVED*** else {
				self.rowManager.setData(self.options.data, false, true);
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

//deconstructor
Tabulator.prototype.destroy = function () {
	var element = this.element;

	Tabulator.prototype.comms.deregister(this); //deregister table from inderdevice communication

	if (this.options.reactiveData && this.modExists("reactiveData", true)) {
		this.modules.reactiveData.unwatchData();
	***REMOVED***

	//clear row data
	this.rowManager.rows.forEach(function (row) {
		row.wipe();
	***REMOVED***);

	this.rowManager.rows = [];
	this.rowManager.activeRows = [];
	this.rowManager.displayRows = [];

	//clear event bindings
	if (this.options.autoResize && this.modExists("resizeTable")) {
		this.modules.resizeTable.clearBindings();
	***REMOVED***

	if (this.modExists("keybindings")) {
		this.modules.keybindings.clearBindings();
	***REMOVED***

	//clear DOM
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	***REMOVED***element.classList.remove("tabulator");
***REMOVED***;

Tabulator.prototype._detectBrowser = function () {
	var ua = navigator.userAgent || navigator.vendor || window.opera;

	if (ua.indexOf("Trident") > -1) {
		this.browser = "ie";
		this.browserSlow = true;
	***REMOVED*** else if (ua.indexOf("Edge") > -1) {
		this.browser = "edge";
		this.browserSlow = true;
	***REMOVED*** else if (ua.indexOf("Firefox") > -1) {
		this.browser = "firefox";
		this.browserSlow = false;
	***REMOVED*** else {
		this.browser = "other";
		this.browserSlow = false;
	***REMOVED***

	this.browserMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
***REMOVED***;

////////////////// Data Handling //////////////////

//block table redrawing
Tabulator.prototype.blockRedraw = function () {
	return this.rowManager.blockRedraw();
***REMOVED***;

//restore table redrawing
Tabulator.prototype.restoreRedraw = function () {
	return this.rowManager.restoreRedraw();
***REMOVED***;

//local data from local file
Tabulator.prototype.setDataFromLocalFile = function (extensions) {
	var _this17 = this;

	return new Promise(function (resolve, reject) {
		var input = document.createElement("input");
		input.type = "file";
		input.accept = extensions || ".json,application/json";

		input.addEventListener("change", function (e) {
			var file = input.files[0],
			    reader = new FileReader(),
			    data;

			reader.readAsText(file);

			reader.onload = function (e) {

				try {
					data = JSON.parse(reader.result);
				***REMOVED*** catch (e) {
					console.warn("File Load Error - File contents is invalid JSON", e);
					reject(e);
					return;
				***REMOVED***

				_this17._setData(data).then(function (data) {
					resolve(data);
				***REMOVED***).catch(function (err) {
					resolve(err);
				***REMOVED***);
			***REMOVED***;

			reader.onerror = function (e) {
				console.warn("File Load Error - Unable to read file");
				reject();
			***REMOVED***;
		***REMOVED***);

		input.click();
	***REMOVED***);
***REMOVED***;

//load data
Tabulator.prototype.setData = function (data, params, config) {
	if (this.modExists("ajax")) {
		this.modules.ajax.blockActiveRequest();
	***REMOVED***

	return this._setData(data, params, config, false, true);
***REMOVED***;

Tabulator.prototype._setData = function (data, params, config, inPosition, columnsChanged) {
	var self = this;

	if (typeof data === "string") {
		if (data.indexOf("{") == 0 || data.indexOf("[") == 0) {
			//data is a json encoded string
			return self.rowManager.setData(JSON.parse(data), inPosition, columnsChanged);
		***REMOVED*** else {

			if (self.modExists("ajax", true)) {
				if (params) {
					self.modules.ajax.setParams(params);
				***REMOVED***

				if (config) {
					self.modules.ajax.setConfig(config);
				***REMOVED***

				self.modules.ajax.setUrl(data);

				if (self.options.pagination == "remote" && self.modExists("page", true)) {
					self.modules.page.reset(true, true);
					return self.modules.page.setPage(1);
				***REMOVED*** else {
					//assume data is url, make ajax call to url to get data
					return self.modules.ajax.loadData(inPosition, columnsChanged);
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED*** else {
		if (data) {
			//asume data is already an object
			return self.rowManager.setData(data, inPosition, columnsChanged);
		***REMOVED*** else {

			//no data provided, check if ajaxURL is present;
			if (self.modExists("ajax") && (self.modules.ajax.getUrl || self.options.ajaxURLGenerator)) {

				if (self.options.pagination == "remote" && self.modExists("page", true)) {
					self.modules.page.reset(true, true);
					return self.modules.page.setPage(1);
				***REMOVED*** else {
					return self.modules.ajax.loadData(inPosition, columnsChanged);
				***REMOVED***
			***REMOVED*** else {
				//empty data
				return self.rowManager.setData([], inPosition, columnsChanged);
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

//clear data
Tabulator.prototype.clearData = function () {
	if (this.modExists("ajax")) {
		this.modules.ajax.blockActiveRequest();
	***REMOVED***

	this.rowManager.clearData();
***REMOVED***;

//get table data array
Tabulator.prototype.getData = function (active) {

	if (active === true) {
		console.warn("passing a boolean to the getData function is deprecated, you should now pass the string 'active'");
		active = "active";
	***REMOVED***

	return this.rowManager.getData(active);
***REMOVED***;

//get table data array count
Tabulator.prototype.getDataCount = function (active) {

	if (active === true) {
		console.warn("passing a boolean to the getDataCount function is deprecated, you should now pass the string 'active'");
		active = "active";
	***REMOVED***

	return this.rowManager.getDataCount(active);
***REMOVED***;

//search for specific row components
Tabulator.prototype.searchRows = function (field, type, value) {
	if (this.modExists("filter", true)) {
		return this.modules.filter.search("rows", field, type, value);
	***REMOVED***
***REMOVED***;

//search for specific data
Tabulator.prototype.searchData = function (field, type, value) {
	if (this.modExists("filter", true)) {
		return this.modules.filter.search("data", field, type, value);
	***REMOVED***
***REMOVED***;

//get table html
Tabulator.prototype.getHtml = function (visible, style, config) {
	if (this.modExists("export", true)) {
		return this.modules.export.getHtml(visible, style, config);
	***REMOVED***
***REMOVED***;

//get print html
Tabulator.prototype.print = function (visible, style, config) {
	if (this.modExists("print", true)) {
		return this.modules.print.printFullscreen(visible, style, config);
	***REMOVED***
***REMOVED***;

//retrieve Ajax URL
Tabulator.prototype.getAjaxUrl = function () {
	if (this.modExists("ajax", true)) {
		return this.modules.ajax.getUrl();
	***REMOVED***
***REMOVED***;

//replace data, keeping table in position with same sort
Tabulator.prototype.replaceData = function (data, params, config) {
	if (this.modExists("ajax")) {
		this.modules.ajax.blockActiveRequest();
	***REMOVED***

	return this._setData(data, params, config, true);
***REMOVED***;

//update table data
Tabulator.prototype.updateData = function (data) {
	var _this18 = this;

	var self = this;
	var responses = 0;

	return new Promise(function (resolve, reject) {
		if (_this18.modExists("ajax")) {
			_this18.modules.ajax.blockActiveRequest();
		***REMOVED***

		if (typeof data === "string") {
			data = JSON.parse(data);
		***REMOVED***

		if (data) {
			data.forEach(function (item) {
				var row = self.rowManager.findRow(item[self.options.index]);

				if (row) {
					responses++;

					row.updateData(item).then(function () {
						responses--;

						if (!responses) {
							resolve();
						***REMOVED***
					***REMOVED***);
				***REMOVED***
			***REMOVED***);
		***REMOVED*** else {
			console.warn("Update Error - No data provided");
			reject("Update Error - No data provided");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Tabulator.prototype.addData = function (data, pos, index) {
	var _this19 = this;

	return new Promise(function (resolve, reject) {
		if (_this19.modExists("ajax")) {
			_this19.modules.ajax.blockActiveRequest();
		***REMOVED***

		if (typeof data === "string") {
			data = JSON.parse(data);
		***REMOVED***

		if (data) {
			_this19.rowManager.addRows(data, pos, index).then(function (rows) {
				var output = [];

				rows.forEach(function (row) {
					output.push(row.getComponent());
				***REMOVED***);

				resolve(output);
			***REMOVED***);
		***REMOVED*** else {
			console.warn("Update Error - No data provided");
			reject("Update Error - No data provided");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//update table data
Tabulator.prototype.updateOrAddData = function (data) {
	var _this20 = this;

	var self = this,
	    rows = [],
	    responses = 0;

	return new Promise(function (resolve, reject) {
		if (_this20.modExists("ajax")) {
			_this20.modules.ajax.blockActiveRequest();
		***REMOVED***

		if (typeof data === "string") {
			data = JSON.parse(data);
		***REMOVED***

		if (data) {
			data.forEach(function (item) {
				var row = self.rowManager.findRow(item[self.options.index]);

				responses++;

				if (row) {
					row.updateData(item).then(function () {
						responses--;
						rows.push(row.getComponent());

						if (!responses) {
							resolve(rows);
						***REMOVED***
					***REMOVED***);
				***REMOVED*** else {
					self.rowManager.addRows(item).then(function (newRows) {
						responses--;
						rows.push(newRows[0].getComponent());

						if (!responses) {
							resolve(rows);
						***REMOVED***
					***REMOVED***);
				***REMOVED***
			***REMOVED***);
		***REMOVED*** else {
			console.warn("Update Error - No data provided");
			reject("Update Error - No data provided");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//get row object
Tabulator.prototype.getRow = function (index) {
	var row = this.rowManager.findRow(index);

	if (row) {
		return row.getComponent();
	***REMOVED*** else {
		console.warn("Find Error - No matching row found:", index);
		return false;
	***REMOVED***
***REMOVED***;

//get row object
Tabulator.prototype.getRowFromPosition = function (position, active) {
	var row = this.rowManager.getRowFromPosition(position, active);

	if (row) {
		return row.getComponent();
	***REMOVED*** else {
		console.warn("Find Error - No matching row found:", position);
		return false;
	***REMOVED***
***REMOVED***;

//delete row from table
Tabulator.prototype.deleteRow = function (index) {
	var _this21 = this;

	return new Promise(function (resolve, reject) {
		var self = _this21,
		    count = 0,
		    successCount = 0,
		    foundRows = [];

		function doneCheck() {
			count++;

			if (count == index.length) {
				if (successCount) {
					self.rowManager.reRenderInPosition();
					resolve();
				***REMOVED***
			***REMOVED***
		***REMOVED***

		if (!Array.isArray(index)) {
			index = [index];
		***REMOVED***

		//find matching rows
		index.forEach(function (item) {
			var row = _this21.rowManager.findRow(item, true);

			if (row) {
				foundRows.push(row);
			***REMOVED*** else {
				console.warn("Delete Error - No matching row found:", item);
				reject("Delete Error - No matching row found");
				doneCheck();
			***REMOVED***
		***REMOVED***);

		//sort rows into correct order to ensure smooth delete from table
		foundRows.sort(function (a, b) {
			return _this21.rowManager.rows.indexOf(a) > _this21.rowManager.rows.indexOf(b) ? 1 : -1;
		***REMOVED***);

		foundRows.forEach(function (row) {
			row.delete().then(function () {
				successCount++;
				doneCheck();
			***REMOVED***).catch(function (err) {
				doneCheck();
				reject(err);
			***REMOVED***);
		***REMOVED***);
	***REMOVED***);
***REMOVED***;

//add row to table
Tabulator.prototype.addRow = function (data, pos, index) {
	var _this22 = this;

	return new Promise(function (resolve, reject) {
		if (typeof data === "string") {
			data = JSON.parse(data);
		***REMOVED***

		_this22.rowManager.addRows(data, pos, index).then(function (rows) {
			//recalc column calculations if present
			if (_this22.modExists("columnCalcs")) {
				_this22.modules.columnCalcs.recalc(_this22.rowManager.activeRows);
			***REMOVED***

			resolve(rows[0].getComponent());
		***REMOVED***);
	***REMOVED***);
***REMOVED***;

//update a row if it exitsts otherwise create it
Tabulator.prototype.updateOrAddRow = function (index, data) {
	var _this23 = this;

	return new Promise(function (resolve, reject) {
		var row = _this23.rowManager.findRow(index);

		if (typeof data === "string") {
			data = JSON.parse(data);
		***REMOVED***

		if (row) {
			row.updateData(data).then(function () {
				//recalc column calculations if present
				if (_this23.modExists("columnCalcs")) {
					_this23.modules.columnCalcs.recalc(_this23.rowManager.activeRows);
				***REMOVED***

				resolve(row.getComponent());
			***REMOVED***).catch(function (err) {
				reject(err);
			***REMOVED***);
		***REMOVED*** else {
			row = _this23.rowManager.addRows(data).then(function (rows) {
				//recalc column calculations if present
				if (_this23.modExists("columnCalcs")) {
					_this23.modules.columnCalcs.recalc(_this23.rowManager.activeRows);
				***REMOVED***

				resolve(rows[0].getComponent());
			***REMOVED***).catch(function (err) {
				reject(err);
			***REMOVED***);
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//update row data
Tabulator.prototype.updateRow = function (index, data) {
	var _this24 = this;

	return new Promise(function (resolve, reject) {
		var row = _this24.rowManager.findRow(index);

		if (typeof data === "string") {
			data = JSON.parse(data);
		***REMOVED***

		if (row) {
			row.updateData(data).then(function () {
				resolve(row.getComponent());
			***REMOVED***).catch(function (err) {
				reject(err);
			***REMOVED***);
		***REMOVED*** else {
			console.warn("Update Error - No matching row found:", index);
			reject("Update Error - No matching row found");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//scroll to row in DOM
Tabulator.prototype.scrollToRow = function (index, position, ifVisible) {
	var _this25 = this;

	return new Promise(function (resolve, reject) {
		var row = _this25.rowManager.findRow(index);

		if (row) {
			_this25.rowManager.scrollToRow(row, position, ifVisible).then(function () {
				resolve();
			***REMOVED***).catch(function (err) {
				reject(err);
			***REMOVED***);
		***REMOVED*** else {
			console.warn("Scroll Error - No matching row found:", index);
			reject("Scroll Error - No matching row found");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Tabulator.prototype.moveRow = function (from, to, after) {
	var fromRow = this.rowManager.findRow(from);

	if (fromRow) {
		fromRow.moveToRow(to, after);
	***REMOVED*** else {
		console.warn("Move Error - No matching row found:", from);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getRows = function (active) {

	if (active === true) {
		console.warn("passing a boolean to the getRows function is deprecated, you should now pass the string 'active'");
		active = "active";
	***REMOVED***

	return this.rowManager.getComponents(active);
***REMOVED***;

//get position of row in table
Tabulator.prototype.getRowPosition = function (index, active) {
	var row = this.rowManager.findRow(index);

	if (row) {
		return this.rowManager.getRowPosition(row, active);
	***REMOVED*** else {
		console.warn("Position Error - No matching row found:", index);
		return false;
	***REMOVED***
***REMOVED***;

//copy table data to clipboard
Tabulator.prototype.copyToClipboard = function (selector) {
	if (this.modExists("clipboard", true)) {
		this.modules.clipboard.copy(selector);
	***REMOVED***
***REMOVED***;

/////////////// Column Functions  ///////////////

Tabulator.prototype.setColumns = function (definition) {
	this.columnManager.setColumns(definition);
***REMOVED***;

Tabulator.prototype.getColumns = function (structured) {
	return this.columnManager.getComponents(structured);
***REMOVED***;

Tabulator.prototype.getColumn = function (field) {
	var col = this.columnManager.findColumn(field);

	if (col) {
		return col.getComponent();
	***REMOVED*** else {
		console.warn("Find Error - No matching column found:", field);
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getColumnDefinitions = function () {
	return this.columnManager.getDefinitionTree();
***REMOVED***;

Tabulator.prototype.getColumnLayout = function () {
	if (this.modExists("persistence", true)) {
		return this.modules.persistence.parseColumns(this.columnManager.getColumns());
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setColumnLayout = function (layout) {
	if (this.modExists("persistence", true)) {
		this.columnManager.setColumns(this.modules.persistence.mergeDefinition(this.options.columns, layout));
		return true;
	***REMOVED***
	return false;
***REMOVED***;

Tabulator.prototype.showColumn = function (field) {
	var column = this.columnManager.findColumn(field);

	if (column) {
		column.show();

		if (this.options.responsiveLayout && this.modExists("responsiveLayout", true)) {
			this.modules.responsiveLayout.update();
		***REMOVED***
	***REMOVED*** else {
		console.warn("Column Show Error - No matching column found:", field);
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.hideColumn = function (field) {
	var column = this.columnManager.findColumn(field);

	if (column) {
		column.hide();

		if (this.options.responsiveLayout && this.modExists("responsiveLayout", true)) {
			this.modules.responsiveLayout.update();
		***REMOVED***
	***REMOVED*** else {
		console.warn("Column Hide Error - No matching column found:", field);
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.toggleColumn = function (field) {
	var column = this.columnManager.findColumn(field);

	if (column) {
		if (column.visible) {
			column.hide();
		***REMOVED*** else {
			column.show();
		***REMOVED***
	***REMOVED*** else {
		console.warn("Column Visibility Toggle Error - No matching column found:", field);
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.addColumn = function (definition, before, field) {
	var _this26 = this;

	return new Promise(function (resolve, reject) {
		var column = _this26.columnManager.findColumn(field);

		_this26.columnManager.addColumn(definition, before, column).then(function (column) {
			resolve(column.getComponent());
		***REMOVED***).catch(function (err) {
			reject(err);
		***REMOVED***);
	***REMOVED***);
***REMOVED***;

Tabulator.prototype.deleteColumn = function (field) {
	var _this27 = this;

	return new Promise(function (resolve, reject) {
		var column = _this27.columnManager.findColumn(field);

		if (column) {
			column.delete().then(function () {
				resolve();
			***REMOVED***).catch(function (err) {
				reject(err);
			***REMOVED***);
		***REMOVED*** else {
			console.warn("Column Delete Error - No matching column found:", field);
			reject();
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Tabulator.prototype.updateColumnDefinition = function (field, definition) {
	var _this28 = this;

	return new Promise(function (resolve, reject) {
		var column = _this28.columnManager.findColumn(field);

		if (column) {
			column.updateDefinition(definition).then(function (col) {
				resolve(col);
			***REMOVED***).catch(function (err) {
				reject(err);
			***REMOVED***);
		***REMOVED*** else {
			console.warn("Column Update Error - No matching column found:", field);
			reject();
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Tabulator.prototype.moveColumn = function (from, to, after) {
	var fromColumn = this.columnManager.findColumn(from);
	var toColumn = this.columnManager.findColumn(to);

	if (fromColumn) {
		if (toColumn) {
			this.columnManager.moveColumn(fromColumn, toColumn, after);
		***REMOVED*** else {
			console.warn("Move Error - No matching column found:", toColumn);
		***REMOVED***
	***REMOVED*** else {
		console.warn("Move Error - No matching column found:", from);
	***REMOVED***
***REMOVED***;

//scroll to column in DOM
Tabulator.prototype.scrollToColumn = function (field, position, ifVisible) {
	var _this29 = this;

	return new Promise(function (resolve, reject) {
		var column = _this29.columnManager.findColumn(field);

		if (column) {
			_this29.columnManager.scrollToColumn(column, position, ifVisible).then(function () {
				resolve();
			***REMOVED***).catch(function (err) {
				reject(err);
			***REMOVED***);
		***REMOVED*** else {
			console.warn("Scroll Error - No matching column found:", field);
			reject("Scroll Error - No matching column found");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//////////// Localization Functions  ////////////
Tabulator.prototype.setLocale = function (locale) {
	this.modules.localize.setLocale(locale);
***REMOVED***;

Tabulator.prototype.getLocale = function () {
	return this.modules.localize.getLocale();
***REMOVED***;

Tabulator.prototype.getLang = function (locale) {
	return this.modules.localize.getLang(locale);
***REMOVED***;

//////////// General Public Functions ////////////

//redraw list without updating data
Tabulator.prototype.redraw = function (force) {
	this.columnManager.redraw(force);
	this.rowManager.redraw(force);
***REMOVED***;

Tabulator.prototype.setHeight = function (height) {

	if (this.rowManager.renderMode !== "classic") {
		this.options.height = isNaN(height) ? height : height + "px";
		this.element.style.height = this.options.height;
		this.rowManager.setRenderMode();
		this.rowManager.redraw();
	***REMOVED*** else {
		console.warn("setHeight function is not available in classic render mode");
	***REMOVED***
***REMOVED***;

///////////////////// Sorting ////////////////////

//trigger sort
Tabulator.prototype.setSort = function (sortList, dir) {
	if (this.modExists("sort", true)) {
		this.modules.sort.setSort(sortList, dir);
		this.rowManager.sorterRefresh();
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getSorters = function () {
	if (this.modExists("sort", true)) {
		return this.modules.sort.getSort();
	***REMOVED***
***REMOVED***;

Tabulator.prototype.clearSort = function () {
	if (this.modExists("sort", true)) {
		this.modules.sort.clear();
		this.rowManager.sorterRefresh();
	***REMOVED***
***REMOVED***;

///////////////////// Filtering ////////////////////

//set standard filters
Tabulator.prototype.setFilter = function (field, type, value) {
	if (this.modExists("filter", true)) {
		this.modules.filter.setFilter(field, type, value);
		this.rowManager.filterRefresh();
	***REMOVED***
***REMOVED***;

//add filter to array
Tabulator.prototype.addFilter = function (field, type, value) {
	if (this.modExists("filter", true)) {
		this.modules.filter.addFilter(field, type, value);
		this.rowManager.filterRefresh();
	***REMOVED***
***REMOVED***;

//get all filters
Tabulator.prototype.getFilters = function (all) {
	if (this.modExists("filter", true)) {
		return this.modules.filter.getFilters(all);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setHeaderFilterFocus = function (field) {
	if (this.modExists("filter", true)) {
		var column = this.columnManager.findColumn(field);

		if (column) {
			this.modules.filter.setHeaderFilterFocus(column);
		***REMOVED*** else {
			console.warn("Column Filter Focus Error - No matching column found:", field);
			return false;
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getHeaderFilterValue = function (field) {
	if (this.modExists("filter", true)) {
		var column = this.columnManager.findColumn(field);

		if (column) {
			return this.modules.filter.getHeaderFilterValue(column);
		***REMOVED*** else {
			console.warn("Column Filter Error - No matching column found:", field);
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setHeaderFilterValue = function (field, value) {
	if (this.modExists("filter", true)) {
		var column = this.columnManager.findColumn(field);

		if (column) {
			this.modules.filter.setHeaderFilterValue(column, value);
		***REMOVED*** else {
			console.warn("Column Filter Error - No matching column found:", field);
			return false;
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getHeaderFilters = function () {
	if (this.modExists("filter", true)) {
		return this.modules.filter.getHeaderFilters();
	***REMOVED***
***REMOVED***;

//remove filter from array
Tabulator.prototype.removeFilter = function (field, type, value) {
	if (this.modExists("filter", true)) {
		this.modules.filter.removeFilter(field, type, value);
		this.rowManager.filterRefresh();
	***REMOVED***
***REMOVED***;

//clear filters
Tabulator.prototype.clearFilter = function (all) {
	if (this.modExists("filter", true)) {
		this.modules.filter.clearFilter(all);
		this.rowManager.filterRefresh();
	***REMOVED***
***REMOVED***;

//clear header filters
Tabulator.prototype.clearHeaderFilter = function () {
	if (this.modExists("filter", true)) {
		this.modules.filter.clearHeaderFilter();
		this.rowManager.filterRefresh();
	***REMOVED***
***REMOVED***;

///////////////////// Filtering ////////////////////
Tabulator.prototype.selectRow = function (rows) {
	if (this.modExists("selectRow", true)) {
		if (rows === true) {
			console.warn("passing a boolean to the selectRowselectRow function is deprecated, you should now pass the string 'active'");
			rows = "active";
		***REMOVED***
		this.modules.selectRow.selectRows(rows);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.deselectRow = function (rows) {
	if (this.modExists("selectRow", true)) {
		this.modules.selectRow.deselectRows(rows);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.toggleSelectRow = function (row) {
	if (this.modExists("selectRow", true)) {
		this.modules.selectRow.toggleRow(row);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getSelectedRows = function () {
	if (this.modExists("selectRow", true)) {
		return this.modules.selectRow.getSelectedRows();
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getSelectedData = function () {
	if (this.modExists("selectRow", true)) {
		return this.modules.selectRow.getSelectedData();
	***REMOVED***
***REMOVED***;

//////////// Pagination Functions  ////////////

Tabulator.prototype.setMaxPage = function (max) {
	if (this.options.pagination && this.modExists("page")) {
		this.modules.page.setMaxPage(max);
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setPage = function (page) {
	if (this.options.pagination && this.modExists("page")) {
		return this.modules.page.setPage(page);
	***REMOVED*** else {
		return new Promise(function (resolve, reject) {
			reject();
		***REMOVED***);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setPageToRow = function (row) {
	var _this30 = this;

	return new Promise(function (resolve, reject) {
		if (_this30.options.pagination && _this30.modExists("page")) {
			row = _this30.rowManager.findRow(row);

			if (row) {
				_this30.modules.page.setPageToRow(row).then(function () {
					resolve();
				***REMOVED***).catch(function () {
					reject();
				***REMOVED***);
			***REMOVED*** else {
				reject();
			***REMOVED***
		***REMOVED*** else {
			reject();
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Tabulator.prototype.setPageSize = function (size) {
	if (this.options.pagination && this.modExists("page")) {
		this.modules.page.setPageSize(size);
		this.modules.page.setPage(1).then(function () {***REMOVED***).catch(function () {***REMOVED***);
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getPageSize = function () {
	if (this.options.pagination && this.modExists("page", true)) {
		return this.modules.page.getPageSize();
	***REMOVED***
***REMOVED***;

Tabulator.prototype.previousPage = function () {
	if (this.options.pagination && this.modExists("page")) {
		this.modules.page.previousPage();
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.nextPage = function () {
	if (this.options.pagination && this.modExists("page")) {
		this.modules.page.nextPage();
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getPage = function () {
	if (this.options.pagination && this.modExists("page")) {
		return this.modules.page.getPage();
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getPageMax = function () {
	if (this.options.pagination && this.modExists("page")) {
		return this.modules.page.getPageMax();
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

///////////////// Grouping Functions ///////////////

Tabulator.prototype.setGroupBy = function (groups) {
	if (this.modExists("groupRows", true)) {
		this.options.groupBy = groups;
		this.modules.groupRows.initialize();
		this.rowManager.refreshActiveData("display");

		if (this.options.persistence && this.modExists("persistence", true) && this.modules.persistence.config.group) {
			this.modules.persistence.save("group");
		***REMOVED***
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setGroupStartOpen = function (values) {
	if (this.modExists("groupRows", true)) {
		this.options.groupStartOpen = values;
		this.modules.groupRows.initialize();
		if (this.options.groupBy) {
			this.rowManager.refreshActiveData("group");

			if (this.options.persistence && this.modExists("persistence", true) && this.modules.persistence.config.group) {
				this.modules.persistence.save("group");
			***REMOVED***
		***REMOVED*** else {
			console.warn("Grouping Update - cant refresh view, no groups have been set");
		***REMOVED***
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setGroupHeader = function (values) {
	if (this.modExists("groupRows", true)) {
		this.options.groupHeader = values;
		this.modules.groupRows.initialize();
		if (this.options.groupBy) {
			this.rowManager.refreshActiveData("group");

			if (this.options.persistence && this.modExists("persistence", true) && this.modules.persistence.config.group) {
				this.modules.persistence.save("group");
			***REMOVED***
		***REMOVED*** else {
			console.warn("Grouping Update - cant refresh view, no groups have been set");
		***REMOVED***
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getGroups = function (values) {
	if (this.modExists("groupRows", true)) {
		return this.modules.groupRows.getGroups(true);
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

// get grouped table data in the same format as getData()
Tabulator.prototype.getGroupedData = function () {
	if (this.modExists("groupRows", true)) {
		return this.options.groupBy ? this.modules.groupRows.getGroupedData() : this.getData();
	***REMOVED***
***REMOVED***;

///////////////// Column Calculation Functions ///////////////
Tabulator.prototype.getCalcResults = function () {
	if (this.modExists("columnCalcs", true)) {
		return this.modules.columnCalcs.getResults();
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.recalc = function () {
	if (this.modExists("columnCalcs", true)) {
		this.modules.columnCalcs.recalcAll(this.rowManager.activeRows);
	***REMOVED***
***REMOVED***;

/////////////// Navigation Management //////////////

Tabulator.prototype.navigatePrev = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			return cell.nav().prev();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

Tabulator.prototype.navigateNext = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			return cell.nav().next();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

Tabulator.prototype.navigateLeft = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			e.preventDefault();
			return cell.nav().left();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

Tabulator.prototype.navigateRight = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			e.preventDefault();
			return cell.nav().right();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

Tabulator.prototype.navigateUp = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			e.preventDefault();
			return cell.nav().up();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

Tabulator.prototype.navigateDown = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			e.preventDefault();
			return cell.nav().down();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

/////////////// History Management //////////////
Tabulator.prototype.undo = function () {
	if (this.options.history && this.modExists("history", true)) {
		return this.modules.history.undo();
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.redo = function () {
	if (this.options.history && this.modExists("history", true)) {
		return this.modules.history.redo();
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getHistoryUndoSize = function () {
	if (this.options.history && this.modExists("history", true)) {
		return this.modules.history.getHistoryUndoSize();
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getHistoryRedoSize = function () {
	if (this.options.history && this.modExists("history", true)) {
		return this.modules.history.getHistoryRedoSize();
	***REMOVED*** else {
		return false;
	***REMOVED***
***REMOVED***;

/////////////// Download Management //////////////

Tabulator.prototype.download = function (type, filename, options, active) {
	if (this.modExists("download", true)) {
		this.modules.download.download(type, filename, options, active);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.downloadToTab = function (type, filename, options, active) {
	if (this.modExists("download", true)) {
		this.modules.download.download(type, filename, options, active, true);
	***REMOVED***
***REMOVED***;

/////////// Inter Table Communications ///////////

Tabulator.prototype.tableComms = function (table, module, action, data) {
	this.modules.comms.receive(table, module, action, data);
***REMOVED***;

////////////// Extension Management //////////////

//object to hold module
Tabulator.prototype.moduleBindings = {***REMOVED***;

//extend module
Tabulator.prototype.extendModule = function (name, property, values) {

	if (Tabulator.prototype.moduleBindings[name]) {
		var source = Tabulator.prototype.moduleBindings[name].prototype[property];

		if (source) {
			if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) == "object") {
				for (var key in values) {
					source[key] = values[key];
				***REMOVED***
			***REMOVED*** else {
				console.warn("Module Error - Invalid value type, it must be an object");
			***REMOVED***
		***REMOVED*** else {
			console.warn("Module Error - property does not exist:", property);
		***REMOVED***
	***REMOVED*** else {
		console.warn("Module Error - module does not exist:", name);
	***REMOVED***
***REMOVED***;

//add module to tabulator
Tabulator.prototype.registerModule = function (name, module) {
	var self = this;
	Tabulator.prototype.moduleBindings[name] = module;
***REMOVED***;

//ensure that module are bound to instantiated function
Tabulator.prototype.bindModules = function () {
	this.modules = {***REMOVED***;

	for (var name in Tabulator.prototype.moduleBindings) {
		this.modules[name] = new Tabulator.prototype.moduleBindings[name](this);
	***REMOVED***
***REMOVED***;

//Check for module
Tabulator.prototype.modExists = function (plugin, required) {
	if (this.modules[plugin]) {
		return true;
	***REMOVED*** else {
		if (required) {
			console.error("Tabulator Module Not Installed: " + plugin);
		***REMOVED***
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.helpers = {

	elVisible: function elVisible(el) {
		return !(el.offsetWidth <= 0 && el.offsetHeight <= 0);
	***REMOVED***,

	elOffset: function elOffset(el) {
		var box = el.getBoundingClientRect();

		return {
			top: box.top + window.pageYOffset - document.documentElement.clientTop,
			left: box.left + window.pageXOffset - document.documentElement.clientLeft
		***REMOVED***;
	***REMOVED***,

	deepClone: function deepClone(obj) {
		var clone = Array.isArray(obj) ? [] : {***REMOVED***;

		for (var i in obj) {
			if (obj[i] != null && _typeof(obj[i]) === "object") {
				if (obj[i] instanceof Date) {
					clone[i] = new Date(obj[i]);
				***REMOVED*** else {
					clone[i] = this.deepClone(obj[i]);
				***REMOVED***
			***REMOVED*** else {
				clone[i] = obj[i];
			***REMOVED***
		***REMOVED***
		return clone;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.comms = {
	tables: [],
	register: function register(table) {
		Tabulator.prototype.comms.tables.push(table);
	***REMOVED***,
	deregister: function deregister(table) {
		var index = Tabulator.prototype.comms.tables.indexOf(table);

		if (index > -1) {
			Tabulator.prototype.comms.tables.splice(index, 1);
		***REMOVED***
	***REMOVED***,
	lookupTable: function lookupTable(query, silent) {
		var results = [],
		    matches,
		    match;

		if (typeof query === "string") {
			matches = document.querySelectorAll(query);

			if (matches.length) {
				for (var i = 0; i < matches.length; i++) {
					match = Tabulator.prototype.comms.matchElement(matches[i]);

					if (match) {
						results.push(match);
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED*** else if (typeof HTMLElement !== "undefined" && query instanceof HTMLElement || query instanceof Tabulator) {
			match = Tabulator.prototype.comms.matchElement(query);

			if (match) {
				results.push(match);
			***REMOVED***
		***REMOVED*** else if (Array.isArray(query)) {
			query.forEach(function (item) {
				results = results.concat(Tabulator.prototype.comms.lookupTable(item));
			***REMOVED***);
		***REMOVED*** else {
			if (!silent) {
				console.warn("Table Connection Error - Invalid Selector", query);
			***REMOVED***
		***REMOVED***

		return results;
	***REMOVED***,
	matchElement: function matchElement(element) {
		return Tabulator.prototype.comms.tables.find(function (table) {
			return element instanceof Tabulator ? table === element : table.element === element;
		***REMOVED***);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.findTable = function (query) {
	var results = Tabulator.prototype.comms.lookupTable(query, true);
	return Array.isArray(results) && !results.length ? false : results;
***REMOVED***;

var Layout = function Layout(table) {

	this.table = table;

	this.mode = null;
***REMOVED***;

//initialize layout system

Layout.prototype.initialize = function (layout) {

	if (this.modes[layout]) {

		this.mode = layout;
	***REMOVED*** else {

		console.warn("Layout Error - invalid mode set, defaulting to 'fitData' : " + layout);

		this.mode = 'fitData';
	***REMOVED***

	this.table.element.setAttribute("tabulator-layout", this.mode);
***REMOVED***;

Layout.prototype.getMode = function () {

	return this.mode;
***REMOVED***;

//trigger table layout

Layout.prototype.layout = function () {

	this.modes[this.mode].call(this, this.table.columnManager.columnsByIndex);
***REMOVED***;

//layout render functions

Layout.prototype.modes = {

	//resize columns to fit data the contain

	"fitData": function fitData(columns) {

		columns.forEach(function (column) {

			column.reinitializeWidth();
		***REMOVED***);

		if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

			this.table.modules.responsiveLayout.update();
		***REMOVED***
	***REMOVED***,

	//resize columns to fit data the contain and stretch row to fill table

	"fitDataFill": function fitDataFill(columns) {

		columns.forEach(function (column) {

			column.reinitializeWidth();
		***REMOVED***);

		if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

			this.table.modules.responsiveLayout.update();
		***REMOVED***
	***REMOVED***,

	//resize columns to fit data the contain and stretch last column to fill table

	"fitDataStretch": function fitDataStretch(columns) {
		var _this31 = this;

		var colsWidth = 0,
		    tableWidth = this.table.rowManager.element.clientWidth,
		    gap = 0,
		    lastCol = false;

		columns.forEach(function (column, i) {

			if (!column.widthFixed) {

				column.reinitializeWidth();
			***REMOVED***

			if (_this31.table.options.responsiveLayout ? column.modules.responsive.visible : column.visible) {

				lastCol = column;
			***REMOVED***

			if (column.visible) {

				colsWidth += column.getWidth();
			***REMOVED***
		***REMOVED***);

		if (lastCol) {

			gap = tableWidth - colsWidth + lastCol.getWidth();

			if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

				lastCol.setWidth(0);

				this.table.modules.responsiveLayout.update();
			***REMOVED***

			if (gap > 0) {

				lastCol.setWidth(gap);
			***REMOVED*** else {

				lastCol.reinitializeWidth();
			***REMOVED***
		***REMOVED*** else {

			if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

				this.table.modules.responsiveLayout.update();
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	//resize columns to fit

	"fitColumns": function fitColumns(columns) {

		var self = this;

		var totalWidth = self.table.element.clientWidth; //table element width

		var fixedWidth = 0; //total width of columns with a defined width

		var flexWidth = 0; //total width available to flexible columns

		var flexGrowUnits = 0; //total number of widthGrow blocks accross all columns

		var flexColWidth = 0; //desired width of flexible columns

		var flexColumns = []; //array of flexible width columns

		var fixedShrinkColumns = []; //array of fixed width columns that can shrink

		var flexShrinkUnits = 0; //total number of widthShrink blocks accross all columns

		var overflowWidth = 0; //horizontal overflow width

		var gapFill = 0; //number of pixels to be added to final column to close and half pixel gaps


		function calcWidth(width) {

			var colWidth;

			if (typeof width == "string") {

				if (width.indexOf("%") > -1) {

					colWidth = totalWidth / 100***REMOVED*** parseInt(width);
				***REMOVED*** else {

					colWidth = parseInt(width);
				***REMOVED***
			***REMOVED*** else {

				colWidth = width;
			***REMOVED***

			return colWidth;
		***REMOVED***

		//ensure columns resize to take up the correct amount of space

		function scaleColumns(columns, freeSpace, colWidth, shrinkCols) {

			var oversizeCols = [],
			    oversizeSpace = 0,
			    remainingSpace = 0,
			    nextColWidth = 0,
			    gap = 0,
			    changeUnits = 0,
			    undersizeCols = [];

			function calcGrow(col) {

				return colWidth***REMOVED*** (col.column.definition.widthGrow || 1);
			***REMOVED***

			function calcShrink(col) {

				return calcWidth(col.width) - colWidth***REMOVED*** (col.column.definition.widthShrink || 0);
			***REMOVED***

			columns.forEach(function (col, i) {

				var width = shrinkCols ? calcShrink(col) : calcGrow(col);

				if (col.column.minWidth >= width) {

					oversizeCols.push(col);
				***REMOVED*** else {

					undersizeCols.push(col);

					changeUnits += shrinkCols ? col.column.definition.widthShrink || 1 : col.column.definition.widthGrow || 1;
				***REMOVED***
			***REMOVED***);

			if (oversizeCols.length) {

				oversizeCols.forEach(function (col) {

					oversizeSpace += shrinkCols ? col.width - col.column.minWidth : col.column.minWidth;

					col.width = col.column.minWidth;
				***REMOVED***);

				remainingSpace = freeSpace - oversizeSpace;

				nextColWidth = changeUnits ? Math.floor(remainingSpace / changeUnits) : remainingSpace;

				gap = remainingSpace - nextColWidth***REMOVED*** changeUnits;

				gap += scaleColumns(undersizeCols, remainingSpace, nextColWidth, shrinkCols);
			***REMOVED*** else {

				gap = changeUnits ? freeSpace - Math.floor(freeSpace / changeUnits)***REMOVED*** changeUnits : freeSpace;

				undersizeCols.forEach(function (column) {

					column.width = shrinkCols ? calcShrink(column) : calcGrow(column);
				***REMOVED***);
			***REMOVED***

			return gap;
		***REMOVED***

		if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

			this.table.modules.responsiveLayout.update();
		***REMOVED***

		//adjust for vertical scrollbar if present

		if (this.table.rowManager.element.scrollHeight > this.table.rowManager.element.clientHeight) {

			totalWidth -= this.table.rowManager.element.offsetWidth - this.table.rowManager.element.clientWidth;
		***REMOVED***

		columns.forEach(function (column) {

			var width, minWidth, colWidth;

			if (column.visible) {

				width = column.definition.width;

				minWidth = parseInt(column.minWidth);

				if (width) {

					colWidth = calcWidth(width);

					fixedWidth += colWidth > minWidth ? colWidth : minWidth;

					if (column.definition.widthShrink) {

						fixedShrinkColumns.push({

							column: column,

							width: colWidth > minWidth ? colWidth : minWidth

						***REMOVED***);

						flexShrinkUnits += column.definition.widthShrink;
					***REMOVED***
				***REMOVED*** else {

					flexColumns.push({

						column: column,

						width: 0

					***REMOVED***);

					flexGrowUnits += column.definition.widthGrow || 1;
				***REMOVED***
			***REMOVED***
		***REMOVED***);

		//calculate available space

		flexWidth = totalWidth - fixedWidth;

		//calculate correct column size

		flexColWidth = Math.floor(flexWidth / flexGrowUnits);

		//generate column widths

		var gapFill = scaleColumns(flexColumns, flexWidth, flexColWidth, false);

		//increase width of last column to account for rounding errors

		if (flexColumns.length && gapFill > 0) {

			flexColumns[flexColumns.length - 1].width += +gapFill;
		***REMOVED***

		//caculate space for columns to be shrunk into

		flexColumns.forEach(function (col) {

			flexWidth -= col.width;
		***REMOVED***);

		overflowWidth = Math.abs(gapFill) + flexWidth;

		//shrink oversize columns if there is no available space

		if (overflowWidth > 0 && flexShrinkUnits) {

			gapFill = scaleColumns(fixedShrinkColumns, overflowWidth, Math.floor(overflowWidth / flexShrinkUnits), true);
		***REMOVED***

		//decrease width of last column to account for rounding errors

		if (fixedShrinkColumns.length) {

			fixedShrinkColumns[fixedShrinkColumns.length - 1].width -= gapFill;
		***REMOVED***

		flexColumns.forEach(function (col) {

			col.column.setWidth(col.width);
		***REMOVED***);

		fixedShrinkColumns.forEach(function (col) {

			col.column.setWidth(col.width);
		***REMOVED***);
	***REMOVED***

***REMOVED***;

Tabulator.prototype.registerModule("layout", Layout);
var Localize = function Localize(table) {
	this.table = table; //hold Tabulator object
	this.locale = "default"; //current locale
	this.lang = false; //current language
	this.bindings = {***REMOVED***; //update events to call when locale is changed
***REMOVED***;

//set header placehoder
Localize.prototype.setHeaderFilterPlaceholder = function (placeholder) {
	this.langs.default.headerFilters.default = placeholder;
***REMOVED***;

//set header filter placeholder by column
Localize.prototype.setHeaderFilterColumnPlaceholder = function (column, placeholder) {
	this.langs.default.headerFilters.columns[column] = placeholder;

	if (this.lang && !this.lang.headerFilters.columns[column]) {
		this.lang.headerFilters.columns[column] = placeholder;
	***REMOVED***
***REMOVED***;

//setup a lang description object
Localize.prototype.installLang = function (locale, lang) {
	if (this.langs[locale]) {
		this._setLangProp(this.langs[locale], lang);
	***REMOVED*** else {
		this.langs[locale] = lang;
	***REMOVED***
***REMOVED***;

Localize.prototype._setLangProp = function (lang, values) {
	for (var key in values) {
		if (lang[key] && _typeof(lang[key]) == "object") {
			this._setLangProp(lang[key], values[key]);
		***REMOVED*** else {
			lang[key] = values[key];
		***REMOVED***
	***REMOVED***
***REMOVED***;

//set current locale
Localize.prototype.setLocale = function (desiredLocale) {
	var self = this;

	desiredLocale = desiredLocale || "default";

	//fill in any matching languge values
	function traverseLang(trans, path) {
		for (var prop in trans) {

			if (_typeof(trans[prop]) == "object") {
				if (!path[prop]) {
					path[prop] = {***REMOVED***;
				***REMOVED***
				traverseLang(trans[prop], path[prop]);
			***REMOVED*** else {
				path[prop] = trans[prop];
			***REMOVED***
		***REMOVED***
	***REMOVED***

	//determing correct locale to load
	if (desiredLocale === true && navigator.language) {
		//get local from system
		desiredLocale = navigator.language.toLowerCase();
	***REMOVED***

	if (desiredLocale) {

		//if locale is not set, check for matching top level locale else use default
		if (!self.langs[desiredLocale]) {
			var prefix = desiredLocale.split("-")[0];

			if (self.langs[prefix]) {
				console.warn("Localization Error - Exact matching locale not found, using closest match: ", desiredLocale, prefix);
				desiredLocale = prefix;
			***REMOVED*** else {
				console.warn("Localization Error - Matching locale not found, using default: ", desiredLocale);
				desiredLocale = "default";
			***REMOVED***
		***REMOVED***
	***REMOVED***

	self.locale = desiredLocale;

	//load default lang template
	self.lang = Tabulator.prototype.helpers.deepClone(self.langs.default || {***REMOVED***);

	if (desiredLocale != "default") {
		traverseLang(self.langs[desiredLocale], self.lang);
	***REMOVED***

	self.table.options.localized.call(self.table, self.locale, self.lang);

	self._executeBindings();
***REMOVED***;

//get current locale
Localize.prototype.getLocale = function (locale) {
	return self.locale;
***REMOVED***;

//get lang object for given local or current if none provided
Localize.prototype.getLang = function (locale) {
	return locale ? this.langs[locale] : this.lang;
***REMOVED***;

//get text for current locale
Localize.prototype.getText = function (path, value) {
	var path = value ? path + "|" + value : path,
	    pathArray = path.split("|"),
	    text = this._getLangElement(pathArray, this.locale);

	// if(text === false){
	// 	console.warn("Localization Error - Matching localized text not found for given path: ", path);
	// ***REMOVED***

	return text || "";
***REMOVED***;

//traverse langs object and find localized copy
Localize.prototype._getLangElement = function (path, locale) {
	var self = this;
	var root = self.lang;

	path.forEach(function (level) {
		var rootPath;

		if (root) {
			rootPath = root[level];

			if (typeof rootPath != "undefined") {
				root = rootPath;
			***REMOVED*** else {
				root = false;
			***REMOVED***
		***REMOVED***
	***REMOVED***);

	return root;
***REMOVED***;

//set update binding
Localize.prototype.bind = function (path, callback) {
	if (!this.bindings[path]) {
		this.bindings[path] = [];
	***REMOVED***

	this.bindings[path].push(callback);

	callback(this.getText(path), this.lang);
***REMOVED***;

//itterate through bindings and trigger updates
Localize.prototype._executeBindings = function () {
	var self = this;

	var _loop = function _loop(path) {
		self.bindings[path].forEach(function (binding) {
			binding(self.getText(path), self.lang);
		***REMOVED***);
	***REMOVED***;

	for (var path in self.bindings) {
		_loop(path);
	***REMOVED***
***REMOVED***;

//Localized text listings
Localize.prototype.langs = {
	"default": { //hold default locale text
		"groups": {
			"item": "item",
			"items": "items"
		***REMOVED***,
		"columns": {***REMOVED***,
		"ajax": {
			"loading": "Loading",
			"error": "Error"
		***REMOVED***,
		"pagination": {
			"page_size": "Page Size",
			"first": "First",
			"first_title": "First Page",
			"last": "Last",
			"last_title": "Last Page",
			"prev": "Prev",
			"prev_title": "Prev Page",
			"next": "Next",
			"next_title": "Next Page"
		***REMOVED***,
		"headerFilters": {
			"default": "filter column...",
			"columns": {***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.registerModule("localize", Localize);
var Comms = function Comms(table) {
	this.table = table;
***REMOVED***;

Comms.prototype.getConnections = function (selectors) {
	var self = this,
	    connections = [],
	    connection;

	connection = Tabulator.prototype.comms.lookupTable(selectors);

	connection.forEach(function (con) {
		if (self.table !== con) {
			connections.push(con);
		***REMOVED***
	***REMOVED***);

	return connections;
***REMOVED***;

Comms.prototype.send = function (selectors, module, action, data) {
	var self = this,
	    connections = this.getConnections(selectors);

	connections.forEach(function (connection) {
		connection.tableComms(self.table.element, module, action, data);
	***REMOVED***);

	if (!connections.length && selectors) {
		console.warn("Table Connection Error - No tables matching selector found", selectors);
	***REMOVED***
***REMOVED***;

Comms.prototype.receive = function (table, module, action, data) {
	if (this.table.modExists(module)) {
		return this.table.modules[module].commsReceived(table, action, data);
	***REMOVED*** else {
		console.warn("Inter-table Comms Error - no such module:", module);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.registerModule("comms", Comms);