
//public column object
var ColumnComponent = function (column){
	this._column = column;
	this.type = "ColumnComponent";
***REMOVED***;

ColumnComponent.prototype.getElement = function(){
	return this._column.getElement();
***REMOVED***;

ColumnComponent.prototype.getDefinition = function(){
	return this._column.getDefinition();
***REMOVED***;

ColumnComponent.prototype.getField = function(){
	return this._column.getField();
***REMOVED***;

ColumnComponent.prototype.getCells = function(){
	var cells = [];

	this._column.cells.forEach(function(cell){
		cells.push(cell.getComponent());
	***REMOVED***);

	return cells;
***REMOVED***;

ColumnComponent.prototype.getVisibility = function(){
	return this._column.visible;
***REMOVED***;

ColumnComponent.prototype.show = function(){
	if(this._column.isGroup){
		this._column.columns.forEach(function(column){
			column.show();
		***REMOVED***);
	***REMOVED***else{
		this._column.show();
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.hide = function(){
	if(this._column.isGroup){
		this._column.columns.forEach(function(column){
			column.hide();
		***REMOVED***);
	***REMOVED***else{
		this._column.hide();
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.toggle = function(){
	if(this._column.visible){
		this.hide();
	***REMOVED***else{
		this.show();
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.delete = function(){
	return this._column.delete();
***REMOVED***;

ColumnComponent.prototype.getSubColumns = function(){
	var output = [];

	if(this._column.columns.length){
		this._column.columns.forEach(function(column){
			output.push(column.getComponent());
		***REMOVED***);
	***REMOVED***

	return output;
***REMOVED***;

ColumnComponent.prototype.getParentColumn = function(){
	return this._column.parent instanceof Column ? this._column.parent.getComponent() : false;
***REMOVED***;


ColumnComponent.prototype._getSelf = function(){
	return this._column;
***REMOVED***;

ColumnComponent.prototype.scrollTo = function(){
	return this._column.table.columnManager.scrollToColumn(this._column);
***REMOVED***;

ColumnComponent.prototype.getTable = function(){
	return this._column.table;
***REMOVED***;

ColumnComponent.prototype.headerFilterFocus = function(){
	if(this._column.table.modExists("filter", true)){
		this._column.table.modules.filter.setHeaderFilterFocus(this._column);
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.reloadHeaderFilter = function(){
	if(this._column.table.modExists("filter", true)){
		this._column.table.modules.filter.reloadHeaderFilter(this._column);
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.getHeaderFilterValue = function(){
	if(this._column.table.modExists("filter", true)){
		return this._column.table.modules.filter.getHeaderFilterValue(this._column);
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.setHeaderFilterValue = function(value){
	if(this._column.table.modExists("filter", true)){
		this._column.table.modules.filter.setHeaderFilterValue(this._column, value);
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.move = function(to, after){
	var toColumn = this._column.table.columnManager.findColumn(to);

	if(toColumn){
		this._column.table.columnManager.moveColumn(this._column, toColumn, after)
	***REMOVED***else{
		console.warn("Move Error - No matching column found:", toColumn);
	***REMOVED***
***REMOVED***;

ColumnComponent.prototype.getNextColumn = function(){
	var nextCol = this._column.nextColumn();

	return nextCol ? nextCol.getComponent() : false;
***REMOVED***;

ColumnComponent.prototype.getPrevColumn = function(){
	var prevCol = this._column.prevColumn();

	return prevCol ? prevCol.getComponent() : false;
***REMOVED***;

ColumnComponent.prototype.updateDefinition = function(updates){
	return this._column.updateDefinition(updates);
***REMOVED***;



var Column = function(def, parent){
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
	this.field ="";
	this.fieldStructure = "";
	this.getFieldValue = "";
	this.setFieldValue = "";

	this.titleFormatterRendered = false;

	this.setField(this.definition.field);

	if(this.table.options.invalidOptionWarnings){
		this.checkDefinition();
	***REMOVED***

	this.modules = {***REMOVED***; //hold module variables;

	this.cellEvents = {
		cellClick:false,
		cellDblClick:false,
		cellContext:false,
		cellTap:false,
		cellDblTap:false,
		cellTapHold:false,
		cellMouseEnter:false,
		cellMouseLeave:false,
		cellMouseOver:false,
		cellMouseOut:false,
		cellMouseMove:false,
	***REMOVED***;

	this.width = null; //column width
	this.widthStyled = ""; //column width prestyled to improve render efficiency
	this.minWidth = null; //column minimum width
	this.minWidthStyled = ""; //column minimum prestyled to improve render efficiency
	this.widthFixed = false; //user has specified a width for this column

	this.visible = true; //default visible state

	this._mapDepricatedFunctionality();

	//initialize column
	if(def.columns){

		this.isGroup = true;

		def.columns.forEach(function(def, i){
			var newCol = new Column(def, self);
			self.attachColumn(newCol);
		***REMOVED***);

		self.checkColumnVisibility();
	***REMOVED***else{
		parent.registerColumnField(this);
	***REMOVED***

	if(def.rowHandle && this.table.options.movableRows !== false && this.table.modExists("moveRow")){
		this.table.modules.moveRow.setHandle(true);
	***REMOVED***

	this._buildHeader();

	this.bindModuleColumns();
***REMOVED***;

Column.prototype.createElement = function (){
	var el = document.createElement("div");

	el.classList.add("tabulator-col");
	el.setAttribute("role", "columnheader");
	el.setAttribute("aria-sort", "none");

	return el;
***REMOVED***;

Column.prototype.createGroupElement = function (){
	var el = document.createElement("div");

	el.classList.add("tabulator-col-group-cols");

	return el;
***REMOVED***;

Column.prototype.checkDefinition = function(){
	Object.keys(this.definition).forEach((key) => {
		if(this.defaultOptionList.indexOf(key) === -1){
			console.warn("Invalid column definition option in '" + (this.field || this.definition.title) + "' column:", key)
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Column.prototype.setField = function(field){
	this.field = field;
	this.fieldStructure = field ? (this.table.options.nestedFieldSeparator ? field.split(this.table.options.nestedFieldSeparator) : [field]) : [];
	this.getFieldValue = this.fieldStructure.length > 1 ? this._getNestedData : this._getFlatData;
	this.setFieldValue = this.fieldStructure.length > 1 ? this._setNestedData : this._setFlatData;
***REMOVED***;

//register column position with column manager
Column.prototype.registerColumnPosition = function(column){
	this.parent.registerColumnPosition(column);
***REMOVED***;

//register column position with column manager
Column.prototype.registerColumnField = function(column){
	this.parent.registerColumnField(column);
***REMOVED***;

//trigger position registration
Column.prototype.reRegisterPosition = function(){
	if(this.isGroup){
		this.columns.forEach(function(column){
			column.reRegisterPosition();
		***REMOVED***);
	***REMOVED***else{
		this.registerColumnPosition(this);
	***REMOVED***
***REMOVED***;

Column.prototype._mapDepricatedFunctionality = function(){
	if(typeof this.definition.hideInHtml !== "undefined"){
		this.definition.htmlOutput = !this.definition.hideInHtml;
		console.warn("hideInHtml column definition property is deprecated, you should now use htmlOutput")
	***REMOVED***

	if(typeof this.definition.align !== "undefined"){
		this.definition.hozAlign = this.definition.align;
		console.warn("align column definition property is deprecated, you should now use hozAlign");
	***REMOVED***
***REMOVED***;

Column.prototype.setTooltip = function(){
	var self = this,
	def = self.definition;

	//set header tooltips
	var tooltip = def.headerTooltip || def.tooltip === false  ? def.headerTooltip : self.table.options.tooltipsHeader;

	if(tooltip){
		if(tooltip === true){
			if(def.field){
				self.table.modules.localize.bind("columns|" + def.field, function(value){
					self.element.setAttribute("title", value || def.title);
				***REMOVED***);
			***REMOVED***else{
				self.element.setAttribute("title", def.title);
			***REMOVED***

		***REMOVED***else{
			if(typeof(tooltip) == "function"){
				tooltip = tooltip(self.getComponent());

				if(tooltip === false){
					tooltip = "";
				***REMOVED***
			***REMOVED***

			self.element.setAttribute("title", tooltip);
		***REMOVED***

	***REMOVED***else{
		self.element.setAttribute("title", "");
	***REMOVED***
***REMOVED***;

//build header element
Column.prototype._buildHeader = function(){
	var self = this,
	def = self.definition;

	while(self.element.firstChild) self.element.removeChild(self.element.firstChild);

	if(def.headerVertical){
		self.element.classList.add("tabulator-col-vertical");

		if(def.headerVertical === "flip"){
			self.element.classList.add("tabulator-col-vertical-flip");
		***REMOVED***
	***REMOVED***

	self.contentElement = self._bindEvents();

	self.contentElement = self._buildColumnHeaderContent();

	self.element.appendChild(self.contentElement);

	if(self.isGroup){
		self._buildGroupHeader();
	***REMOVED***else{
		self._buildColumnHeader();
	***REMOVED***

	self.setTooltip();

	//set resizable handles
	if(self.table.options.resizableColumns && self.table.modExists("resizeColumns")){
		self.table.modules.resizeColumns.initializeColumn("header", self, self.element);
	***REMOVED***

	//set resizable handles
	if(def.headerFilter && self.table.modExists("filter") && self.table.modExists("edit")){
		if(typeof def.headerFilterPlaceholder !== "undefined" && def.field){
			self.table.modules.localize.setHeaderFilterColumnPlaceholder(def.field, def.headerFilterPlaceholder);
		***REMOVED***

		self.table.modules.filter.initializeColumn(self);
	***REMOVED***


	//set resizable handles
	if(self.table.modExists("frozenColumns")){
		self.table.modules.frozenColumns.initializeColumn(self);
	***REMOVED***

	//set movable column
	if(self.table.options.movableColumns && !self.isGroup && self.table.modExists("moveColumn")){
		self.table.modules.moveColumn.initializeColumn(self);
	***REMOVED***

	//set calcs column
	if((def.topCalc || def.bottomCalc) && self.table.modExists("columnCalcs")){
		self.table.modules.columnCalcs.initializeColumn(self);
	***REMOVED***

	//handle persistence
	if(self.table.modExists("persistence") && self.table.modules.persistence.config.columns){
		self.table.modules.persistence.initializeColumn(self);
	***REMOVED***


	//update header tooltip on mouse enter
	self.element.addEventListener("mouseenter", function(e){
		self.setTooltip();
	***REMOVED***);
***REMOVED***;

Column.prototype._bindEvents = function(){

	var self = this,
	def = self.definition,
	dblTap,	tapHold, tap;

	//setup header click event bindings
	if(typeof(def.headerClick) == "function"){
		self.element.addEventListener("click", function(e){def.headerClick(e, self.getComponent());***REMOVED***);
	***REMOVED***

	if(typeof(def.headerDblClick) == "function"){
		self.element.addEventListener("dblclick", function(e){def.headerDblClick(e, self.getComponent());***REMOVED***);
	***REMOVED***

	if(typeof(def.headerContext) == "function"){
		self.element.addEventListener("contextmenu", function(e){def.headerContext(e, self.getComponent());***REMOVED***);
	***REMOVED***

	//setup header tap event bindings
	if(typeof(def.headerTap) == "function"){
		tap = false;

		self.element.addEventListener("touchstart", function(e){
			tap = true;
		***REMOVED***, {passive: true***REMOVED***);

		self.element.addEventListener("touchend", function(e){
			if(tap){
				def.headerTap(e, self.getComponent());
			***REMOVED***

			tap = false;
		***REMOVED***);
	***REMOVED***

	if(typeof(def.headerDblTap) == "function"){
		dblTap = null;

		self.element.addEventListener("touchend", function(e){

			if(dblTap){
				clearTimeout(dblTap);
				dblTap = null;

				def.headerDblTap(e, self.getComponent());
			***REMOVED***else{

				dblTap = setTimeout(function(){
					clearTimeout(dblTap);
					dblTap = null;
				***REMOVED***, 300);
			***REMOVED***

		***REMOVED***);
	***REMOVED***

	if(typeof(def.headerTapHold) == "function"){
		tapHold = null;

		self.element.addEventListener("touchstart", function(e){
			clearTimeout(tapHold);

			tapHold = setTimeout(function(){
				clearTimeout(tapHold);
				tapHold = null;
				tap = false;
				def.headerTapHold(e, self.getComponent());
			***REMOVED***, 1000);

		***REMOVED***, {passive: true***REMOVED***);

		self.element.addEventListener("touchend", function(e){
			clearTimeout(tapHold);
			tapHold = null;
		***REMOVED***);
	***REMOVED***

	//store column cell click event bindings
	if(typeof(def.cellClick) == "function"){
		self.cellEvents.cellClick = def.cellClick;
	***REMOVED***

	if(typeof(def.cellDblClick) == "function"){
		self.cellEvents.cellDblClick = def.cellDblClick;
	***REMOVED***

	if(typeof(def.cellContext) == "function"){
		self.cellEvents.cellContext = def.cellContext;
	***REMOVED***

	//store column mouse event bindings
	if(typeof(def.cellMouseEnter) == "function"){
		self.cellEvents.cellMouseEnter = def.cellMouseEnter;
	***REMOVED***

	if(typeof(def.cellMouseLeave) == "function"){
		self.cellEvents.cellMouseLeave = def.cellMouseLeave;
	***REMOVED***

	if(typeof(def.cellMouseOver) == "function"){
		self.cellEvents.cellMouseOver = def.cellMouseOver;
	***REMOVED***

	if(typeof(def.cellMouseOut) == "function"){
		self.cellEvents.cellMouseOut = def.cellMouseOut;
	***REMOVED***

	if(typeof(def.cellMouseMove) == "function"){
		self.cellEvents.cellMouseMove = def.cellMouseMove;
	***REMOVED***

	//setup column cell tap event bindings
	if(typeof(def.cellTap) == "function"){
		self.cellEvents.cellTap = def.cellTap;
	***REMOVED***

	if(typeof(def.cellDblTap) == "function"){
		self.cellEvents.cellDblTap = def.cellDblTap;
	***REMOVED***

	if(typeof(def.cellTapHold) == "function"){
		self.cellEvents.cellTapHold = def.cellTapHold;
	***REMOVED***

	//setup column cell edit callbacks
	if(typeof(def.cellEdited) == "function"){
		self.cellEvents.cellEdited = def.cellEdited;
	***REMOVED***

	if(typeof(def.cellEditing) == "function"){
		self.cellEvents.cellEditing = def.cellEditing;
	***REMOVED***

	if(typeof(def.cellEditCancelled) == "function"){
		self.cellEvents.cellEditCancelled = def.cellEditCancelled;
	***REMOVED***
***REMOVED***;

//build header element for header
Column.prototype._buildColumnHeader = function(){
	var self = this,
	def = self.definition,
	table = self.table,
	sortable;

	//set column sorter
	if(table.modExists("sort")){
		table.modules.sort.initializeColumn(self, self.contentElement);
	***REMOVED***

	//set column header context menu
	if((def.headerContextMenu || def.headerMenu) && table.modExists("menu")){
		table.modules.menu.initializeColumnHeader(self);
	***REMOVED***

	//set column formatter
	if(table.modExists("format")){
		table.modules.format.initializeColumn(self);
	***REMOVED***

	//set column editor
	if(typeof def.editor != "undefined" && table.modExists("edit")){
		table.modules.edit.initializeColumn(self);
	***REMOVED***

	//set colum validator
	if(typeof def.validator != "undefined" && table.modExists("validate")){
		table.modules.validate.initializeColumn(self);
	***REMOVED***


	//set column mutator
	if(table.modExists("mutator")){
		table.modules.mutator.initializeColumn(self);
	***REMOVED***

	//set column accessor
	if(table.modExists("accessor")){
		table.modules.accessor.initializeColumn(self);
	***REMOVED***

	//set respoviveLayout
	if(typeof table.options.responsiveLayout && table.modExists("responsiveLayout")){
		table.modules.responsiveLayout.initializeColumn(self);
	***REMOVED***

	//set column visibility
	if(typeof def.visible != "undefined"){
		if(def.visible){
			self.show(true);
		***REMOVED***else{
			self.hide(true);
		***REMOVED***
	***REMOVED***

	//asign additional css classes to column header
	if(def.cssClass){
		var classeNames = def.cssClass.split(" ");
		classeNames.forEach(function(className) {
			self.element.classList.add(className)
		***REMOVED***);
	***REMOVED***

	if(def.field){
		this.element.setAttribute("tabulator-field", def.field);
	***REMOVED***

	//set min width if present
	self.setMinWidth(typeof def.minWidth == "undefined" ? self.table.options.columnMinWidth : parseInt(def.minWidth));

	self.reinitializeWidth();

	//set tooltip if present
	self.tooltip = self.definition.tooltip || self.definition.tooltip === false ? self.definition.tooltip : self.table.options.tooltips;

	//set orizontal text alignment
	self.hozAlign = typeof(self.definition.hozAlign) == "undefined" ? self.table.options.cellHozAlign : self.definition.hozAlign;
	self.vertAlign = typeof(self.definition.vertAlign) == "undefined" ? self.table.options.cellVertAlign : self.definition.vertAlign;
***REMOVED***;

Column.prototype._buildColumnHeaderContent = function(){
	var def = this.definition,
	table = this.table;

	var contentElement = document.createElement("div");
	contentElement.classList.add("tabulator-col-content");

	this.titleElement = this._buildColumnHeaderTitle();

	contentElement.appendChild(this.titleElement);

	return contentElement;
***REMOVED***;

//build title element of column
Column.prototype._buildColumnHeaderTitle = function(){
	var self = this,
	def = self.definition,
	table = self.table,
	title;

	var titleHolderElement = document.createElement("div");
	titleHolderElement.classList.add("tabulator-col-title");

	if(def.editableTitle){
		var titleElement = document.createElement("input");
		titleElement.classList.add("tabulator-title-editor");

		titleElement.addEventListener("click", function(e){
			e.stopPropagation();
			titleElement.focus();
		***REMOVED***);

		titleElement.addEventListener("change", function(){
			def.title = titleElement.value;
			table.options.columnTitleChanged.call(self.table, self.getComponent());
		***REMOVED***);

		titleHolderElement.appendChild(titleElement);

		if(def.field){
			table.modules.localize.bind("columns|" + def.field, function(text){
				titleElement.value = text || (def.title || "&nbsp;");
			***REMOVED***);
		***REMOVED***else{
			titleElement.value  = def.title || "&nbsp;";
		***REMOVED***

	***REMOVED***else{
		if(def.field){
			table.modules.localize.bind("columns|" + def.field, function(text){
				self._formatColumnHeaderTitle(titleHolderElement, text || (def.title || "&nbsp;"));
			***REMOVED***);
		***REMOVED***else{
			self._formatColumnHeaderTitle(titleHolderElement, def.title || "&nbsp;");
		***REMOVED***
	***REMOVED***

	return titleHolderElement;
***REMOVED***;

Column.prototype._formatColumnHeaderTitle = function(el, title){
	var formatter, contents, params, mockCell, onRendered;

	if(this.definition.titleFormatter && this.table.modExists("format")){

		formatter = this.table.modules.format.getFormatter(this.definition.titleFormatter);

		onRendered = (callback) => {
			this.titleFormatterRendered = callback;
		***REMOVED***;

		mockCell = {
			getValue:function(){
				return title;
			***REMOVED***,
			getElement:function(){
				return el;
			***REMOVED***
		***REMOVED***;

		params = this.definition.titleFormatterParams || {***REMOVED***;

		params = typeof params === "function" ? params() : params;

		contents = formatter.call(this.table.modules.format, mockCell, params, onRendered);

		switch(typeof contents){
			case "object":
			if(contents instanceof Node){
				el.appendChild(contents);
			***REMOVED***else{
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
	***REMOVED***else{
		el.innerHTML = title;
	***REMOVED***
***REMOVED***;


//build header element for column group
Column.prototype._buildGroupHeader = function(){
	this.element.classList.add("tabulator-col-group");
	this.element.setAttribute("role", "columngroup");
	this.element.setAttribute("aria-title", this.definition.title);

	//asign additional css classes to column header
	if(this.definition.cssClass){
		var classeNames = this.definition.cssClass.split(" ");
		classeNames.forEach((className) => {
			this.element.classList.add(className);
		***REMOVED***);
	***REMOVED***

	this.element.appendChild(this.groupElement);
***REMOVED***;

//flat field lookup
Column.prototype._getFlatData = function(data){
	return data[this.field];
***REMOVED***;

//nested field lookup
Column.prototype._getNestedData = function(data){
	var dataObj = data,
	structure = this.fieldStructure,
	length = structure.length,
	output;

	for(let i = 0; i < length; i++){

		dataObj = dataObj[structure[i]];

		output = dataObj;

		if(!dataObj){
			break;
		***REMOVED***
	***REMOVED***

	return output;
***REMOVED***;

//flat field set
Column.prototype._setFlatData = function(data, value){
	if(this.field){
		data[this.field] = value;
	***REMOVED***
***REMOVED***;

//nested field set
Column.prototype._setNestedData = function(data, value){
	var dataObj = data,
	structure = this.fieldStructure,
	length = structure.length;

	for(let i = 0; i < length; i++){

		if(i == length -1){
			dataObj[structure[i]] = value;
		***REMOVED***else{
			if(!dataObj[structure[i]]){
				if(typeof value !== "undefined"){
					dataObj[structure[i]] = {***REMOVED***;
				***REMOVED***else{
					break;
				***REMOVED***
			***REMOVED***

			dataObj = dataObj[structure[i]];
		***REMOVED***
	***REMOVED***
***REMOVED***;


//attach column to this group
Column.prototype.attachColumn = function(column){
	var self = this;

	if(self.groupElement){
		self.columns.push(column);
		self.groupElement.appendChild(column.getElement());
	***REMOVED***else{
		console.warn("Column Warning - Column being attached to another column instead of column group");
	***REMOVED***
***REMOVED***;

//vertically align header in column
Column.prototype.verticalAlign = function(alignment, height){

	//calculate height of column header and group holder element
	var parentHeight = this.parent.isGroup ? this.parent.getGroupElement().clientHeight : (height || this.parent.getHeadersElement().clientHeight);
	// var parentHeight = this.parent.isGroup ? this.parent.getGroupElement().clientHeight : this.parent.getHeadersElement().clientHeight;

	this.element.style.height = parentHeight + "px";

	if(this.isGroup){
		this.groupElement.style.minHeight = (parentHeight - this.contentElement.offsetHeight) + "px";
	***REMOVED***

	//vertically align cell contents
	if(!this.isGroup && alignment !== "top"){
		if(alignment === "bottom"){
			this.element.style.paddingTop = (this.element.clientHeight - this.contentElement.offsetHeight) + "px";
		***REMOVED***else{
			this.element.style.paddingTop = ((this.element.clientHeight - this.contentElement.offsetHeight) / 2) + "px";
		***REMOVED***
	***REMOVED***

	this.columns.forEach(function(column){
		column.verticalAlign(alignment);
	***REMOVED***);
***REMOVED***;

//clear vertical alignmenet
Column.prototype.clearVerticalAlign = function(){
	this.element.style.paddingTop = "";
	this.element.style.height = "";
	this.element.style.minHeight = "";
	this.groupElement.style.minHeight = "";

	this.columns.forEach(function(column){
		column.clearVerticalAlign();
	***REMOVED***);
***REMOVED***;

Column.prototype.bindModuleColumns = function (){
	//check if rownum formatter is being used on a column
	if(this.definition.formatter == "rownum"){
		this.table.rowManager.rowNumColumn = this;
	***REMOVED***
***REMOVED***;


//// Retreive Column Information ////

//return column header element
Column.prototype.getElement = function(){
	return this.element;
***REMOVED***;

//return colunm group element
Column.prototype.getGroupElement = function(){
	return this.groupElement;
***REMOVED***;

//return field name
Column.prototype.getField = function(){
	return this.field;
***REMOVED***;

//return the first column in a group
Column.prototype.getFirstColumn = function(){
	if(!this.isGroup){
		return this;
	***REMOVED***else{
		if(this.columns.length){
			return this.columns[0].getFirstColumn();
		***REMOVED***else{
			return false;
		***REMOVED***
	***REMOVED***
***REMOVED***;

//return the last column in a group
Column.prototype.getLastColumn = function(){
	if(!this.isGroup){
		return this;
	***REMOVED***else{
		if(this.columns.length){
			return this.columns[this.columns.length -1].getLastColumn();
		***REMOVED***else{
			return false;
		***REMOVED***
	***REMOVED***
***REMOVED***;

//return all columns in a group
Column.prototype.getColumns = function(){
	return this.columns;
***REMOVED***;

//return all columns in a group
Column.prototype.getCells = function(){
	return this.cells;
***REMOVED***;

//retreive the top column in a group of columns
Column.prototype.getTopColumn = function(){
	if(this.parent.isGroup){
		return this.parent.getTopColumn();
	***REMOVED***else{
		return this;
	***REMOVED***
***REMOVED***;

//return column definition object
Column.prototype.getDefinition = function(updateBranches){
	var colDefs = [];

	if(this.isGroup && updateBranches){
		this.columns.forEach(function(column){
			colDefs.push(column.getDefinition(true));
		***REMOVED***);

		this.definition.columns = colDefs;
	***REMOVED***

	return this.definition;
***REMOVED***;

//////////////////// Actions ////////////////////

Column.prototype.checkColumnVisibility = function(){
	var visible = false;

	this.columns.forEach(function(column){
		if(column.visible){
			visible = true;
		***REMOVED***
	***REMOVED***);



	if(visible){
		this.show();
		this.parent.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), false);
	***REMOVED***else{
		this.hide();
	***REMOVED***

***REMOVED***;

//show column
Column.prototype.show = function(silent, responsiveToggle){
	if(!this.visible){
		this.visible = true;

		this.element.style.display = "";

		if(this.parent.isGroup){
			this.parent.checkColumnVisibility();
		***REMOVED***

		this.cells.forEach(function(cell){
			cell.show();
		***REMOVED***);

		if(!this.isGroup && this.width === null){
			this.reinitializeWidth();
		***REMOVED***

		this.table.columnManager._verticalAlignHeaders();

		if(this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.columns){
			this.table.modules.persistence.save("columns");
		***REMOVED***

		if(!responsiveToggle && this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
			this.table.modules.responsiveLayout.updateColumnVisibility(this, this.visible);
		***REMOVED***

		if(!silent){
			this.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), true);
		***REMOVED***

		if(this.parent.isGroup){
			this.parent.matchChildWidths();
		***REMOVED***
	***REMOVED***
***REMOVED***;

//hide column
Column.prototype.hide = function(silent, responsiveToggle){
	if(this.visible){
		this.visible = false;

		this.element.style.display = "none";

		this.table.columnManager._verticalAlignHeaders();

		if(this.parent.isGroup){
			this.parent.checkColumnVisibility();
		***REMOVED***

		this.cells.forEach(function(cell){
			cell.hide();
		***REMOVED***);

		if(this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.columns){
			this.table.modules.persistence.save("columns");
		***REMOVED***

		if(!responsiveToggle && this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
			this.table.modules.responsiveLayout.updateColumnVisibility(this, this.visible);
		***REMOVED***

		if(!silent){
			this.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), false);
		***REMOVED***

		if(this.parent.isGroup){
			this.parent.matchChildWidths();
		***REMOVED***
	***REMOVED***
***REMOVED***;

Column.prototype.matchChildWidths = function(){
	var childWidth = 0;

	if(this.contentElement && this.columns.length){
		this.columns.forEach(function(column){
			if(column.visible){
				childWidth += column.getWidth();
			***REMOVED***
		***REMOVED***);

		this.contentElement.style.maxWidth = (childWidth - 1) + "px";

		if(this.parent.isGroup){
			this.parent.matchChildWidths();
		***REMOVED***
	***REMOVED***
***REMOVED***;

Column.prototype.setWidth = function(width){
	this.widthFixed = true;
	this.setWidthActual(width);
***REMOVED***;

Column.prototype.setWidthActual = function(width){
	if(isNaN(width)){
		width = Math.floor((this.table.element.clientWidth/100)***REMOVED*** parseInt(width));
	***REMOVED***

	width = Math.max(this.minWidth, width);

	this.width = width;
	this.widthStyled = width ? width + "px" : "";

	this.element.style.width = this.widthStyled;

	if(!this.isGroup){
		this.cells.forEach(function(cell){
			cell.setWidth();
		***REMOVED***);
	***REMOVED***

	if(this.parent.isGroup){
		this.parent.matchChildWidths();
	***REMOVED***

	//set resizable handles
	if(this.table.modExists("frozenColumns")){
		this.table.modules.frozenColumns.layout();
	***REMOVED***
***REMOVED***;


Column.prototype.checkCellHeights = function(){
	var rows = [];

	this.cells.forEach(function(cell){
		if(cell.row.heightInitialized){
			if(cell.row.getElement().offsetParent !== null){
				rows.push(cell.row);
				cell.row.clearCellHeight();
			***REMOVED***else{
				cell.row.heightInitialized = false;
			***REMOVED***
		***REMOVED***
	***REMOVED***);

	rows.forEach(function(row){
		row.calcHeight();
	***REMOVED***);

	rows.forEach(function(row){
		row.setCellHeight();
	***REMOVED***);
***REMOVED***;

Column.prototype.getWidth = function(){
	var width = 0;

	if(this.isGroup){
		this.columns.forEach(function(column){
			if(column.visible){
				width += column.getWidth();
			***REMOVED***
		***REMOVED***);
	***REMOVED***else{
		width = this.width;
	***REMOVED***

	return width;
***REMOVED***;

Column.prototype.getHeight = function(){
	return this.element.offsetHeight;
***REMOVED***;

Column.prototype.setMinWidth = function(minWidth){
	this.minWidth = minWidth;
	this.minWidthStyled = minWidth ? minWidth + "px" : "";

	this.element.style.minWidth = this.minWidthStyled;

	this.cells.forEach(function(cell){
		cell.setMinWidth();
	***REMOVED***);
***REMOVED***;

Column.prototype.delete = function(){
	return new Promise((resolve, reject) => {

		if(this.isGroup){
			this.columns.forEach(function(column){
				column.delete();
			***REMOVED***);
		***REMOVED***

		//cancel edit if column is currently being edited
		if(this.table.modExists("edit")){
			if(this.table.modules.edit.currentCell.column === this){
				this.table.modules.edit.cancelEdit();
			***REMOVED***
		***REMOVED***

		var cellCount = this.cells.length;

		for(let i = 0; i < cellCount; i++){
			this.cells[0].delete();
		***REMOVED***

		this.element.parentNode.removeChild(this.element);

		this.table.columnManager.deregisterColumn(this);

		resolve();
	***REMOVED***);
***REMOVED***;

Column.prototype.columnRendered = function(){
	if(this.titleFormatterRendered){
		this.titleFormatterRendered();
	***REMOVED***
***REMOVED***;

//////////////// Cell Management /////////////////

//generate cell for this column
Column.prototype.generateCell = function(row){
	var self = this;

	var cell = new Cell(self, row);

	this.cells.push(cell);

	return cell;
***REMOVED***;

Column.prototype.nextColumn = function(){
	var index = this.table.columnManager.findColumnIndex(this);
	return index > -1 ? this._nextVisibleColumn(index + 1) : false;
***REMOVED***;

Column.prototype._nextVisibleColumn = function(index){
	var column = this.table.columnManager.getColumnByIndex(index);
	return !column || column.visible ? column : this._nextVisibleColumn(index + 1);
***REMOVED***;

Column.prototype.prevColumn = function(){
	var index = this.table.columnManager.findColumnIndex(this);
	return index > -1 ? this._prevVisibleColumn(index - 1) : false;
***REMOVED***;

Column.prototype._prevVisibleColumn = function(index){
	var column = this.table.columnManager.getColumnByIndex(index);
	return !column || column.visible ? column : this._prevVisibleColumn(index - 1);
***REMOVED***;

Column.prototype.reinitializeWidth = function(force){
	this.widthFixed = false;

	//set width if present
	if(typeof this.definition.width !== "undefined" && !force){
		this.setWidth(this.definition.width);
	***REMOVED***

	//hide header filters to prevent them altering column width
	if(this.table.modExists("filter")){
		this.table.modules.filter.hideHeaderFilterElements();
	***REMOVED***

	this.fitToData();

	//show header filters again after layout is complete
	if(this.table.modExists("filter")){
		this.table.modules.filter.showHeaderFilterElements();
	***REMOVED***
***REMOVED***;

//set column width to maximum cell width
Column.prototype.fitToData = function(){
	var self = this;

	if(!this.widthFixed){
		this.element.style.width = "";

		self.cells.forEach(function(cell){
			cell.clearWidth();
		***REMOVED***);
	***REMOVED***

	var maxWidth = this.element.offsetWidth;

	if(!self.width || !this.widthFixed){
		self.cells.forEach(function(cell){
			var width = cell.getWidth();

			if(width > maxWidth){
				maxWidth = width;
			***REMOVED***
		***REMOVED***);

		if(maxWidth){
			self.setWidthActual(maxWidth + 1);
		***REMOVED***

	***REMOVED***
***REMOVED***;

Column.prototype.updateDefinition = function(updates){
	return new Promise((resolve, reject) => {
		var definition;

		if(!this.isGroup){
			definition = Object.assign({***REMOVED***, this.getDefinition());
			definition = Object.assign(definition, updates);

			this.table.columnManager.addColumn(definition, false, this)
			.then((column) => {

				if(definition.field == this.field){
					this.field = false; //cleair field name to prevent deletion of duplicate column from arrays
				***REMOVED***

				this.delete()
				.then(() => {
					resolve(column.getComponent());
				***REMOVED***).catch((err) => {
					reject(err);
				***REMOVED***);

			***REMOVED***).catch((err) => {
				reject(err);
			***REMOVED***);
		***REMOVED***else{
			console.warn("Column Update Error - The updateDefintion function is only available on columns, not column groups");
			reject("Column Update Error - The updateDefintion function is only available on columns, not column groups");
		***REMOVED***
	***REMOVED***);
***REMOVED***;


Column.prototype.deleteCell = function(cell){
	var index = this.cells.indexOf(cell);

	if(index > -1){
		this.cells.splice(index, 1);
	***REMOVED***
***REMOVED***;


Column.prototype.defaultOptionList = [
"title",
"field",
"columns",
"visible",
"align",
"hozAlign",
"vertAlign",
"width",
"minWidth",
"widthGrow",
"widthShrink",
"resizable",
"frozen",
"responsive",
"tooltip",
"cssClass",
"rowHandle",
"hideInHtml",
"print",
"htmlOutput",
"sorter",
"sorterParams",
"formatter",
"formatterParams",
"variableHeight",
"editable",
"editor",
"editorParams",
"validator",
"mutator",
"mutatorParams",
"mutatorData",
"mutatorDataParams",
"mutatorEdit",
"mutatorEditParams",
"mutatorClipboard",
"mutatorClipboardParams",
"accessor",
"accessorParams",
"accessorData",
"accessorDataParams",
"accessorDownload",
"accessorDownloadParams",
"accessorClipboard",
"accessorClipboardParams",
"accessorPrint",
"accessorPrintParams",
"accessorHtmlOutput",
"accessorHtmlOutputParams",
"clipboard",
"download",
"downloadTitle",
"topCalc",
"topCalcParams",
"topCalcFormatter",
"topCalcFormatterParams",
"bottomCalc",
"bottomCalcParams",
"bottomCalcFormatter",
"bottomCalcFormatterParams",
"cellClick",
"cellDblClick",
"cellContext",
"cellTap",
"cellDblTap",
"cellTapHold",
"cellMouseEnter",
"cellMouseLeave",
"cellMouseOver",
"cellMouseOut",
"cellMouseMove",
"cellEditing",
"cellEdited",
"cellEditCancelled",
"headerSort",
"headerSortStartingDir",
"headerSortTristate",
"headerClick",
"headerDblClick",
"headerContext",
"headerTap",
"headerDblTap",
"headerTapHold",
"headerTooltip",
"headerVertical",
"editableTitle",
"titleFormatter",
"titleFormatterParams",
"headerFilter",
"headerFilterPlaceholder",
"headerFilterParams",
"headerFilterEmptyCheck",
"headerFilterFunc",
"headerFilterFuncParams",
"headerFilterLiveFilter",
"print",
"headerContextMenu",
"headerMenu",
"contextMenu",
"formatterPrint",
"formatterPrintParams",
"formatterClipboard",
"formatterClipboardParams",
"formatterHtmlOutput",
"formatterHtmlOutputParams",
];

//////////////// Event Bindings /////////////////

//////////////// Object Generation /////////////////
Column.prototype.getComponent = function(){
	return new ColumnComponent(this);
***REMOVED***;
