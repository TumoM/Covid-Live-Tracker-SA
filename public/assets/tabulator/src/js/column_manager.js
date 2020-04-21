var ColumnManager = function(table){
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

ColumnManager.prototype.createHeadersElement = function (){
	var el = document.createElement("div");

	el.classList.add("tabulator-headers");

	return el;
***REMOVED***;

ColumnManager.prototype.createHeaderElement = function (){
	var el = document.createElement("div");

	el.classList.add("tabulator-header");

	if(!this.table.options.headerVisible){
		el.classList.add("tabulator-header-hidden");
	***REMOVED***

	return el;
***REMOVED***;

ColumnManager.prototype.initialize = function (){
	var self = this;

	//scroll body along with header
	// self.element.addEventListener("scroll", function(e){
	// 	if(!self.blockHozScrollEvent){
	// 		self.table.rowManager.scrollHorizontal(self.element.scrollLeft);
	// 	***REMOVED***
	// ***REMOVED***);
***REMOVED***;


//link to row manager
ColumnManager.prototype.setRowManager = function(manager){
	this.rowManager = manager;
***REMOVED***;

//return containing element
ColumnManager.prototype.getElement = function(){
	return this.element;
***REMOVED***;

//return header containing element
ColumnManager.prototype.getHeadersElement = function(){
	return this.headersElement;
***REMOVED***;

// ColumnManager.prototype.tempScrollBlock = function(){
// 	clearTimeout(this.blockHozScrollEvent);
// 	this.blockHozScrollEvent = setTimeout(() => {this.blockHozScrollEvent = false;***REMOVED***, 50);
// ***REMOVED***

//scroll horizontally to match table body
ColumnManager.prototype.scrollHorizontal = function(left){
	var hozAdjust = 0,
	scrollWidth = this.element.scrollWidth - this.table.element.clientWidth;

	// this.tempScrollBlock();
	this.element.scrollLeft = left;

	//adjust for vertical scrollbar moving table when present
	if(left > scrollWidth){
		hozAdjust = left - scrollWidth;
		this.element.style.marginLeft = (-(hozAdjust)) + "px";
	***REMOVED***else{
		this.element.style.marginLeft = 0;
	***REMOVED***

	//keep frozen columns fixed in position
	//this._calcFrozenColumnsPos(hozAdjust + 3);

	this.scrollLeft = left;

	if(this.table.modExists("frozenColumns")){
		this.table.modules.frozenColumns.scrollHorizontal();
	***REMOVED***
***REMOVED***;


///////////// Column Setup Functions /////////////

ColumnManager.prototype.generateColumnsFromRowData = function(data){
	var cols = [],
	row, sorter;

	if(data && data.length){

		row = data[0];

		for(var key in row){
			let col = {
				field:key,
				title:key,
			***REMOVED***;

			let value = row[key];

			switch(typeof value){
				case "undefined":
				sorter = "string";
				break;

				case "boolean":
				sorter = "boolean";
				break;

				case "object":
				if(Array.isArray(value)){
					sorter = "array";
				***REMOVED***else{
					sorter = "string";
				***REMOVED***
				break;

				default:
				if(!isNaN(value) && value !== ""){
					sorter = "number";
				***REMOVED***else{
					if(value.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i)){
						sorter = "alphanum";
					***REMOVED***else{
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

ColumnManager.prototype.setColumns = function(cols, row){
	var self = this;

	while(self.headersElement.firstChild) self.headersElement.removeChild(self.headersElement.firstChild);

	self.columns = [];
	self.columnsByIndex = [];
	self.columnsByField = {***REMOVED***;


	//reset frozen columns
	if(self.table.modExists("frozenColumns")){
		self.table.modules.frozenColumns.reset();
	***REMOVED***

	cols.forEach(function(def, i){
		self._addColumn(def);
	***REMOVED***);

	self._reIndexColumns();

	if(self.table.options.responsiveLayout && self.table.modExists("responsiveLayout", true)){
		self.table.modules.responsiveLayout.initialize();
	***REMOVED***

	self.redraw(true);
***REMOVED***;

ColumnManager.prototype._addColumn = function(definition, before, nextToColumn){
	var column = new Column(definition, this),
	colEl = column.getElement(),
	index = nextToColumn ? this.findColumnIndex(nextToColumn) : nextToColumn;

	if(nextToColumn && index > -1){

		var parentIndex = this.columns.indexOf(nextToColumn.getTopColumn());
		var nextEl = nextToColumn.getElement();

		if(before){
			this.columns.splice(parentIndex, 0, column);
			nextEl.parentNode.insertBefore(colEl, nextEl);
		***REMOVED***else{
			this.columns.splice(parentIndex + 1, 0, column);
			nextEl.parentNode.insertBefore(colEl, nextEl.nextSibling);
		***REMOVED***

	***REMOVED***else{
		if(before){
			this.columns.unshift(column);
			this.headersElement.insertBefore(column.getElement(), this.headersElement.firstChild);
		***REMOVED***else{
			this.columns.push(column);
			this.headersElement.appendChild(column.getElement());
		***REMOVED***

		column.columnRendered();
	***REMOVED***

	return column;
***REMOVED***;

ColumnManager.prototype.registerColumnField = function(col){
	if(col.definition.field){
		this.columnsByField[col.definition.field] = col;
	***REMOVED***
***REMOVED***;

ColumnManager.prototype.registerColumnPosition = function(col){
	this.columnsByIndex.push(col);
***REMOVED***;

ColumnManager.prototype._reIndexColumns = function(){
	this.columnsByIndex = [];

	this.columns.forEach(function(column){
		column.reRegisterPosition();
	***REMOVED***);
***REMOVED***;

//ensure column headers take up the correct amount of space in column groups
ColumnManager.prototype._verticalAlignHeaders = function(){
	var self = this, minHeight = 0;

	self.columns.forEach(function(column){
		var height;

		column.clearVerticalAlign();

		height = column.getHeight();

		if(height > minHeight){
			minHeight = height;
		***REMOVED***
	***REMOVED***);

	self.columns.forEach(function(column){
		column.verticalAlign(self.table.options.columnHeaderVertAlign, minHeight);
	***REMOVED***);

	self.rowManager.adjustTableSize();
***REMOVED***;

//////////////// Column Details /////////////////

ColumnManager.prototype.findColumn = function(subject){
	var self = this;

	if(typeof subject == "object"){

		if(subject instanceof Column){
			//subject is column element
			return subject;
		***REMOVED***else if(subject instanceof ColumnComponent){
			//subject is public column component
			return subject._getSelf() || false;
		***REMOVED***else if(typeof HTMLElement !== "undefined" && subject instanceof HTMLElement){
			//subject is a HTML element of the column header
			let match = self.columns.find(function(column){
				return column.element === subject;
			***REMOVED***);

			return match || false;
		***REMOVED***

	***REMOVED***else{
		//subject should be treated as the field name of the column
		return this.columnsByField[subject] || false;
	***REMOVED***

	//catch all for any other type of input

	return false;
***REMOVED***;

ColumnManager.prototype.getColumnByField = function(field){
	return this.columnsByField[field];
***REMOVED***;


ColumnManager.prototype.getColumnsByFieldRoot = function(root){

	var matches = [];

	Object.keys(this.columnsByField).forEach((field) => {
		var fieldRoot = field.split(".")[0];
		if(fieldRoot === root){
			matches.push(this.columnsByField[field]);
		***REMOVED***
	***REMOVED***);

	return matches;
***REMOVED***;

ColumnManager.prototype.getColumnByIndex = function(index){
	return this.columnsByIndex[index];
***REMOVED***;

ColumnManager.prototype.getFirstVisibileColumn = function(index){
	var index = this.columnsByIndex.findIndex(function(col){
		return col.visible;
	***REMOVED***);

	return index > -1 ? this.columnsByIndex[index] : false;
***REMOVED***;

ColumnManager.prototype.getColumns = function(){
	return this.columns;
***REMOVED***;

ColumnManager.prototype.findColumnIndex = function(column){
	return this.columnsByIndex.findIndex(function(col){
		return column === col;
	***REMOVED***);
***REMOVED***;

//return all columns that are not groups
ColumnManager.prototype.getRealColumns = function(){
	return this.columnsByIndex;
***REMOVED***;

//travers across columns and call action
ColumnManager.prototype.traverse = function(callback){
	var self = this;

	self.columnsByIndex.forEach(function(column,i){
		callback(column, i);
	***REMOVED***);
***REMOVED***;

//get defintions of actual columns
ColumnManager.prototype.getDefinitions = function(active){
	var self = this,
	output = [];

	self.columnsByIndex.forEach(function(column){
		if(!active || (active && column.visible)){
			output.push(column.getDefinition());
		***REMOVED***
	***REMOVED***);

	return output;
***REMOVED***;

//get full nested definition tree
ColumnManager.prototype.getDefinitionTree = function(){
	var self = this,
	output = [];

	self.columns.forEach(function(column){
		output.push(column.getDefinition(true));
	***REMOVED***);

	return output;
***REMOVED***;

ColumnManager.prototype.getComponents = function(structured){
	var self = this,
	output = [],
	columns = structured ? self.columns : self.columnsByIndex;

	columns.forEach(function(column){
		output.push(column.getComponent());
	***REMOVED***);

	return output;
***REMOVED***;

ColumnManager.prototype.getWidth = function(){
	var width = 0;

	this.columnsByIndex.forEach(function(column){
		if(column.visible){
			width += column.getWidth();
		***REMOVED***
	***REMOVED***);

	return width;
***REMOVED***;


ColumnManager.prototype.moveColumn = function(from, to, after){
	this.moveColumnActual(from, to, after);

	if(this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
		this.table.modules.responsiveLayout.initialize();
	***REMOVED***

	if(this.table.modExists("columnCalcs")){
		this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
	***REMOVED***

	to.element.parentNode.insertBefore(from.element, to.element);

	if(after){
		to.element.parentNode.insertBefore(to.element, from.element);
	***REMOVED***

	this._verticalAlignHeaders();

	this.table.rowManager.reinitialize();
***REMOVED***

ColumnManager.prototype.moveColumnActual = function(from, to, after){

	if(from.parent.isGroup){
		this._moveColumnInArray(from.parent.columns, from, to, after);
	***REMOVED***else{
		this._moveColumnInArray(this.columns, from, to, after);
	***REMOVED***

	this._moveColumnInArray(this.columnsByIndex, from, to, after, true);

	if(this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
		this.table.modules.responsiveLayout.initialize();
	***REMOVED***

	if(this.table.options.columnMoved){
		this.table.options.columnMoved.call(this.table, from.getComponent(), this.table.columnManager.getComponents());
	***REMOVED***

	if(this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.columns){
		this.table.modules.persistence.save("columns");
	***REMOVED***
***REMOVED***;

ColumnManager.prototype._moveColumnInArray = function(columns, from, to, after, updateRows){
	var	fromIndex = columns.indexOf(from),
	toIndex;

	if (fromIndex > -1) {

		columns.splice(fromIndex, 1);

		toIndex = columns.indexOf(to);

		if (toIndex > -1) {

			if(after){
				toIndex = toIndex+1;
			***REMOVED***

		***REMOVED***else{
			toIndex = fromIndex;
		***REMOVED***

		columns.splice(toIndex, 0, from);

		if(updateRows){

			this.table.rowManager.rows.forEach(function(row){
				if(row.cells.length){
					var cell = row.cells.splice(fromIndex, 1)[0];
					row.cells.splice(toIndex, 0, cell);
				***REMOVED***
			***REMOVED***);
		***REMOVED***
	***REMOVED***
***REMOVED***;

ColumnManager.prototype.scrollToColumn = function(column, position, ifVisible){
	var left = 0,
	offset = 0,
	adjust = 0,
	colEl = column.getElement();

	return new Promise((resolve, reject) => {

		if(typeof position === "undefined"){
			position = this.table.options.scrollToColumnPosition;
		***REMOVED***

		if(typeof ifVisible === "undefined"){
			ifVisible = this.table.options.scrollToColumnIfVisible;
		***REMOVED***

		if(column.visible){

			//align to correct position
			switch(position){
				case "middle":
				case "center":
				adjust = -this.element.clientWidth / 2;
				break;

				case "right":
				adjust = colEl.clientWidth - this.headersElement.clientWidth;
				break;
			***REMOVED***

			//check column visibility
			if(!ifVisible){

				offset = colEl.offsetLeft;

				if(offset > 0 && offset + colEl.offsetWidth < this.element.clientWidth){
					return false;
				***REMOVED***
			***REMOVED***

			//calculate scroll position
			left = colEl.offsetLeft + this.element.scrollLeft + adjust;

			left = Math.max(Math.min(left, this.table.rowManager.element.scrollWidth - this.table.rowManager.element.clientWidth),0);

			this.table.rowManager.scrollHorizontal(left);
			this.scrollHorizontal(left);

			resolve();
		***REMOVED***else{
			console.warn("Scroll Error - Column not visible");
			reject("Scroll Error - Column not visible");
		***REMOVED***

	***REMOVED***);
***REMOVED***;

//////////////// Cell Management /////////////////

ColumnManager.prototype.generateCells = function(row){
	var self = this;

	var cells = [];

	self.columnsByIndex.forEach(function(column){
		cells.push(column.generateCell(row));
	***REMOVED***);

	return cells;
***REMOVED***;

//////////////// Column Management /////////////////


ColumnManager.prototype.getFlexBaseWidth = function(){
	var self = this,
	totalWidth = self.table.element.clientWidth, //table element width
	fixedWidth = 0;

	//adjust for vertical scrollbar if present
	if(self.rowManager.element.scrollHeight > self.rowManager.element.clientHeight){
		totalWidth -= self.rowManager.element.offsetWidth - self.rowManager.element.clientWidth;
	***REMOVED***

	this.columnsByIndex.forEach(function(column){
		var width, minWidth, colWidth;

		if(column.visible){

			width = column.definition.width || 0;

			minWidth = typeof column.minWidth == "undefined" ? self.table.options.columnMinWidth : parseInt(column.minWidth);

			if(typeof(width) == "string"){
				if(width.indexOf("%") > -1){
					colWidth = (totalWidth / 100)***REMOVED*** parseInt(width) ;
				***REMOVED***else{
					colWidth = parseInt(width);
				***REMOVED***
			***REMOVED***else{
				colWidth = width;
			***REMOVED***

			fixedWidth += colWidth > minWidth ? colWidth : minWidth;

		***REMOVED***
	***REMOVED***);

	return fixedWidth;
***REMOVED***;

ColumnManager.prototype.addColumn = function(definition, before, nextToColumn){
	return new Promise((resolve, reject) => {
		var column = this._addColumn(definition, before, nextToColumn);

		this._reIndexColumns();

		if(this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
			this.table.modules.responsiveLayout.initialize();
		***REMOVED***

		if(this.table.modExists("columnCalcs")){
			this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
		***REMOVED***

		this.redraw();

		if(this.table.modules.layout.getMode() != "fitColumns"){
			column.reinitializeWidth();
		***REMOVED***

		this._verticalAlignHeaders();

		this.table.rowManager.reinitialize();

		resolve(column);
	***REMOVED***);
***REMOVED***;

//remove column from system
ColumnManager.prototype.deregisterColumn = function(column){
	var field = column.getField(),
	index;

	//remove from field list
	if(field){
		delete this.columnsByField[field];
	***REMOVED***

	//remove from index list
	index = this.columnsByIndex.indexOf(column);

	if(index > -1){
		this.columnsByIndex.splice(index, 1);
	***REMOVED***

	//remove from column list
	index = this.columns.indexOf(column);

	if(index > -1){
		this.columns.splice(index, 1);
	***REMOVED***

	if(this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
		this.table.modules.responsiveLayout.initialize();
	***REMOVED***

	this.redraw();
***REMOVED***;

//redraw columns
ColumnManager.prototype.redraw = function(force){
	if(force){

		if(Tabulator.prototype.helpers.elVisible(this.element)){
			this._verticalAlignHeaders();
		***REMOVED***

		this.table.rowManager.resetScroll();
		this.table.rowManager.reinitialize();
	***REMOVED***

	if(["fitColumns", "fitDataStretch"].indexOf(this.table.modules.layout.getMode()) > -1){
		this.table.modules.layout.layout();
	***REMOVED***else{
		if(force){
			this.table.modules.layout.layout();
		***REMOVED***else{
			if(this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
				this.table.modules.responsiveLayout.update();
			***REMOVED***
		***REMOVED***
	***REMOVED***

	if(this.table.modExists("frozenColumns")){
		this.table.modules.frozenColumns.layout();
	***REMOVED***

	if(this.table.modExists("columnCalcs")){
		this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
	***REMOVED***

	if(force){
		if(this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.columns){
			this.table.modules.persistence.save("columns");
		***REMOVED***

		if(this.table.modExists("columnCalcs")){
			this.table.modules.columnCalcs.redraw();
		***REMOVED***
	***REMOVED***

	this.table.footerManager.redraw();



***REMOVED***;
