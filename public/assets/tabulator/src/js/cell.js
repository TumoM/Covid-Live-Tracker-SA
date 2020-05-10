
//public row object
var CellComponent = function (cell){
	this._cell = cell;
***REMOVED***;

CellComponent.prototype.getValue = function(){
	return this._cell.getValue();
***REMOVED***;

CellComponent.prototype.getOldValue = function(){
	return this._cell.getOldValue();
***REMOVED***;

CellComponent.prototype.getElement = function(){
	return this._cell.getElement();
***REMOVED***;

CellComponent.prototype.getRow = function(){
	return this._cell.row.getComponent();
***REMOVED***;

CellComponent.prototype.getData = function(){
	return this._cell.row.getData();
***REMOVED***;

CellComponent.prototype.getField = function(){
	return this._cell.column.getField();
***REMOVED***;

CellComponent.prototype.getColumn = function(){
	return this._cell.column.getComponent();
***REMOVED***;

CellComponent.prototype.setValue = function(value, mutate){
	if(typeof mutate == "undefined"){
		mutate = true;
	***REMOVED***

	this._cell.setValue(value, mutate);
***REMOVED***;

CellComponent.prototype.restoreOldValue = function(){
	this._cell.setValueActual(this._cell.getOldValue());
***REMOVED***;

CellComponent.prototype.edit = function(force){
	return this._cell.edit(force);
***REMOVED***;

CellComponent.prototype.cancelEdit = function(){
	this._cell.cancelEdit();
***REMOVED***;


CellComponent.prototype.nav = function(){
	return this._cell.nav();
***REMOVED***;

CellComponent.prototype.checkHeight = function(){
	this._cell.checkHeight();
***REMOVED***;

CellComponent.prototype.getTable = function(){
	return this._cell.table;
***REMOVED***;

CellComponent.prototype._getSelf = function(){
	return this._cell;
***REMOVED***;



var Cell = function(column, row){

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
Cell.prototype.build = function(){
	this.generateElement();

	this.setWidth();

	this._configureCell();

	this.setValueActual(this.column.getFieldValue(this.row.data));
***REMOVED***;

Cell.prototype.generateElement = function(){
	this.element = document.createElement('div');
	this.element.className = "tabulator-cell";
	this.element.setAttribute("role", "gridcell");
	this.element = this.element;
***REMOVED***;


Cell.prototype._configureCell = function(){
	var self = this,
	cellEvents = self.column.cellEvents,
	element = self.element,
	field = this.column.getField(),
	vertAligns = {
		top:"flex-start",
		bottom:"flex-end",
		middle:"center",
	***REMOVED***,
	hozAligns = {
		left:"flex-start",
		right:"flex-end",
		center:"center",
	***REMOVED***;

	//set text alignment
	element.style.textAlign = self.column.hozAlign;

	if(self.column.vertAlign){
		element.style.display = "inline-flex";

		element.style.alignItems = vertAligns[self.column.vertAlign] || "";

		if(self.column.hozAlign){
			element.style.justifyContent = hozAligns[self.column.hozAlign] || "";
		***REMOVED***
	***REMOVED***

	if(field){
		element.setAttribute("tabulator-field", field);
	***REMOVED***

	//add class to cell if needed
	if(self.column.definition.cssClass){
		var classNames = self.column.definition.cssClass.split(" ")
		classNames.forEach(function(className) {
			element.classList.add(className)
		***REMOVED***);
	***REMOVED***

	//update tooltip on mouse enter
	if (this.table.options.tooltipGenerationMode === "hover"){
		element.addEventListener("mouseenter", function(e){
			self._generateTooltip();
		***REMOVED***);
	***REMOVED***

	self._bindClickEvents(cellEvents);

	self._bindTouchEvents(cellEvents);

	self._bindMouseEvents(cellEvents);

	if(self.column.modules.edit){
		self.table.modules.edit.bindEditor(self);
	***REMOVED***

	if(self.column.definition.rowHandle && self.table.options.movableRows !== false && self.table.modExists("moveRow")){
		self.table.modules.moveRow.initializeCell(self);
	***REMOVED***

	//hide cell if not visible
	if(!self.column.visible){
		self.hide();
	***REMOVED***
***REMOVED***;

Cell.prototype._bindClickEvents = function(cellEvents){
	var self = this,
	element = self.element;

	//set event bindings
	if (cellEvents.cellClick || self.table.options.cellClick){
		element.addEventListener("click", function(e){
			var component = self.getComponent();

			if(cellEvents.cellClick){
				cellEvents.cellClick.call(self.table, e, component);
			***REMOVED***

			if(self.table.options.cellClick){
				self.table.options.cellClick.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellDblClick || this.table.options.cellDblClick){
		element.addEventListener("dblclick", function(e){
			var component = self.getComponent();

			if(cellEvents.cellDblClick){
				cellEvents.cellDblClick.call(self.table, e, component);
			***REMOVED***

			if(self.table.options.cellDblClick){
				self.table.options.cellDblClick.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***else{
		element.addEventListener("dblclick", function(e){

			if(self.table.modExists("edit")){
				if (self.table.modules.edit.currentCell === self){
					return; //prevent instant selection of editor content
				***REMOVED***
			***REMOVED***

			e.preventDefault();

			try{
				if (document.selection) { // IE
					var range = document.body.createTextRange();
					range.moveToElementText(self.element);
					range.select();
				***REMOVED*** else if (window.getSelection) {
					var range = document.createRange();
					range.selectNode(self.element);
					window.getSelection().removeAllRanges();
					window.getSelection().addRange(range);
				***REMOVED***
			***REMOVED***catch(e){***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellContext || this.table.options.cellContext){
		element.addEventListener("contextmenu", function(e){
			var component = self.getComponent();

			if(cellEvents.cellContext){
				cellEvents.cellContext.call(self.table, e, component);
			***REMOVED***

			if(self.table.options.cellContext){
				self.table.options.cellContext.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***
***REMOVED***;


Cell.prototype._bindMouseEvents = function(cellEvents){
	var self = this,
	element = self.element;

	if (cellEvents.cellMouseEnter || self.table.options.cellMouseEnter){
		element.addEventListener("mouseenter", function(e){
			var component = self.getComponent();

			if(cellEvents.cellMouseEnter){
				cellEvents.cellMouseEnter.call(self.table, e, component);
			***REMOVED***

			if(self.table.options.cellMouseEnter){
				self.table.options.cellMouseEnter.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellMouseLeave || self.table.options.cellMouseLeave){
		element.addEventListener("mouseleave", function(e){
			var component = self.getComponent();

			if(cellEvents.cellMouseLeave){
				cellEvents.cellMouseLeave.call(self.table, e, component);
			***REMOVED***

			if(self.table.options.cellMouseLeave){
				self.table.options.cellMouseLeave.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellMouseOver || self.table.options.cellMouseOver){
		element.addEventListener("mouseover", function(e){
			var component = self.getComponent();

			if(cellEvents.cellMouseOver){
				cellEvents.cellMouseOver.call(self.table, e, component);
			***REMOVED***

			if(self.table.options.cellMouseOver){
				self.table.options.cellMouseOver.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellMouseOut || self.table.options.cellMouseOut){
		element.addEventListener("mouseout", function(e){
			var component = self.getComponent();

			if(cellEvents.cellMouseOut){
				cellEvents.cellMouseOut.call(self.table, e, component);
			***REMOVED***

			if(self.table.options.cellMouseOut){
				self.table.options.cellMouseOut.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellMouseMove || self.table.options.cellMouseMove){
		element.addEventListener("mousemove", function(e){
			var component = self.getComponent();

			if(cellEvents.cellMouseMove){
				cellEvents.cellMouseMove.call(self.table, e, component);
			***REMOVED***

			if(self.table.options.cellMouseMove){
				self.table.options.cellMouseMove.call(self.table, e, component);
			***REMOVED***
		***REMOVED***);
	***REMOVED***


***REMOVED***;


Cell.prototype._bindTouchEvents = function(cellEvents){
	var self = this,
	element = self.element,
	dblTap,	tapHold, tap;

	if (cellEvents.cellTap || this.table.options.cellTap){
		tap = false;

		element.addEventListener("touchstart", function(e){
			tap = true;
		***REMOVED***, {passive: true***REMOVED***);

		element.addEventListener("touchend", function(e){
			if(tap){
				var component = self.getComponent();

				if(cellEvents.cellTap){
					cellEvents.cellTap.call(self.table, e, component);
				***REMOVED***

				if(self.table.options.cellTap){
					self.table.options.cellTap.call(self.table, e, component);
				***REMOVED***
			***REMOVED***

			tap = false;
		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellDblTap || this.table.options.cellDblTap){
		dblTap = null;

		element.addEventListener("touchend", function(e){

			if(dblTap){
				clearTimeout(dblTap);
				dblTap = null;

				var component = self.getComponent();

				if(cellEvents.cellDblTap){
					cellEvents.cellDblTap.call(self.table, e, component);
				***REMOVED***

				if(self.table.options.cellDblTap){
					self.table.options.cellDblTap.call(self.table, e, component);
				***REMOVED***
			***REMOVED***else{

				dblTap = setTimeout(function(){
					clearTimeout(dblTap);
					dblTap = null;
				***REMOVED***, 300);
			***REMOVED***

		***REMOVED***);
	***REMOVED***

	if (cellEvents.cellTapHold || this.table.options.cellTapHold){
		tapHold = null;

		element.addEventListener("touchstart", function(e){
			clearTimeout(tapHold);

			tapHold = setTimeout(function(){
				clearTimeout(tapHold);
				tapHold = null;
				tap = false;
				var component = self.getComponent();

				if(cellEvents.cellTapHold){
					cellEvents.cellTapHold.call(self.table, e, component);
				***REMOVED***

				if(self.table.options.cellTapHold){
					self.table.options.cellTapHold.call(self.table, e, component);
				***REMOVED***
			***REMOVED***, 1000);

		***REMOVED***, {passive: true***REMOVED***);

		element.addEventListener("touchend", function(e){
			clearTimeout(tapHold);
			tapHold = null;
		***REMOVED***);
	***REMOVED***
***REMOVED***;


//generate cell contents
Cell.prototype._generateContents = function(){
	var val;

	if(this.table.modExists("format")){
		val = this.table.modules.format.formatValue(this);
	***REMOVED***else{
		val = this.element.innerHTML = this.value;
	***REMOVED***

	switch(typeof val){
		case "object":
		if(val instanceof Node){

			//clear previous cell contents
			while(this.element.firstChild) this.element.removeChild(this.element.firstChild);

			this.element.appendChild(val);
		***REMOVED***else{
			this.element.innerHTML = "";

			if(val != null){
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

Cell.prototype.cellRendered = function(){
	if(this.table.modExists("format") && this.table.modules.format.cellRendered){
		this.table.modules.format.cellRendered(this);
	***REMOVED***
***REMOVED***;

//generate tooltip text
Cell.prototype._generateTooltip = function(){
	var tooltip = this.column.tooltip;

	if(tooltip){
		if(tooltip === true){
			tooltip = this.value;
		***REMOVED***else if(typeof(tooltip) == "function"){
			tooltip = tooltip(this.getComponent());

			if(tooltip === false){
				tooltip = "";
			***REMOVED***
		***REMOVED***

		if(typeof tooltip === "undefined"){
			tooltip = "";
		***REMOVED***

		this.element.setAttribute("title", tooltip);
	***REMOVED***else{
		this.element.setAttribute("title", "");
	***REMOVED***
***REMOVED***;


//////////////////// Getters ////////////////////
Cell.prototype.getElement = function(){
	return this.element;
***REMOVED***;

Cell.prototype.getValue = function(){
	return this.value;
***REMOVED***;

Cell.prototype.getOldValue = function(){
	return this.oldValue;
***REMOVED***;

//////////////////// Actions ////////////////////

Cell.prototype.setValue = function(value, mutate){

	var changed = this.setValueProcessData(value, mutate),
	component;

	if(changed){
		if(this.table.options.history && this.table.modExists("history")){
			this.table.modules.history.action("cellEdit", this, {oldValue:this.oldValue, newValue:this.value***REMOVED***);
		***REMOVED***

		component = this.getComponent();

		if(this.column.cellEvents.cellEdited){
			this.column.cellEvents.cellEdited.call(this.table, component);
		***REMOVED***

		this.cellRendered();

		this.table.options.cellEdited.call(this.table, component);

		this.table.options.dataEdited.call(this.table, this.table.rowManager.getData());
	***REMOVED***

***REMOVED***;

Cell.prototype.setValueProcessData = function(value, mutate){
	var changed = false;

	if(this.value != value){

		changed = true;

		if(mutate){
			if(this.column.modules.mutate){
				value = this.table.modules.mutator.transformCell(this, value);
			***REMOVED***
		***REMOVED***
	***REMOVED***

	this.setValueActual(value);

	if(changed && this.table.modExists("columnCalcs")){
		if(this.column.definition.topCalc || this.column.definition.bottomCalc){
			if(this.table.options.groupBy && this.table.modExists("groupRows")){

				if(this.table.options.columnCalcs == "table" || this.table.options.columnCalcs == "both"){
					this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
				***REMOVED***

				if(this.table.options.columnCalcs != "table"){
					this.table.modules.columnCalcs.recalcRowGroup(this.row);
				***REMOVED***

			***REMOVED***else{
				this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return changed;
***REMOVED***;

Cell.prototype.setValueActual = function(value){
	this.oldValue = this.value;

	this.value = value;

	if(this.table.options.reactiveData && this.table.modExists("reactiveData")){
		this.table.modules.reactiveData.block();
	***REMOVED***

	this.column.setFieldValue(this.row.data, value);

	if(this.table.options.reactiveData && this.table.modExists("reactiveData")){
		this.table.modules.reactiveData.unblock();
	***REMOVED***

	this._generateContents();
	this._generateTooltip();

	//set resizable handles
	if(this.table.options.resizableColumns && this.table.modExists("resizeColumns")){
		this.table.modules.resizeColumns.initializeColumn("cell", this.column, this.element);
	***REMOVED***

	//set column menu
	if(this.column.definition.contextMenu && this.table.modExists("menu")){
		this.table.modules.menu.initializeCell(this);
	***REMOVED***

	//handle frozen cells
	if(this.table.modExists("frozenColumns")){
		this.table.modules.frozenColumns.layoutElement(this.element, this.column);
	***REMOVED***
***REMOVED***;

Cell.prototype.setWidth = function(){
	this.width = this.column.width;
	this.element.style.width = this.column.widthStyled;
***REMOVED***;

Cell.prototype.clearWidth = function(){
	this.width = "";
	this.element.style.width = "";
***REMOVED***;

Cell.prototype.getWidth = function(){
	return this.width || this.element.offsetWidth;
***REMOVED***;

Cell.prototype.setMinWidth = function(){
	this.minWidth = this.column.minWidth;
	this.element.style.minWidth = this.column.minWidthStyled;
***REMOVED***;

Cell.prototype.checkHeight = function(){
	// var height = this.element.css("height");
	this.row.reinitializeHeight();
***REMOVED***;

Cell.prototype.clearHeight = function(){
	this.element.style.height = "";
	this.height = null;
***REMOVED***;


Cell.prototype.setHeight = function(){
	this.height = this.row.height;
	this.element.style.height =  this.row.heightStyled;
***REMOVED***;

Cell.prototype.getHeight = function(){
	return this.height || this.element.offsetHeight;
***REMOVED***;

Cell.prototype.show = function(){
	this.element.style.display = "";
***REMOVED***;

Cell.prototype.hide = function(){
	this.element.style.display = "none";
***REMOVED***;

Cell.prototype.edit = function(force){
	if(this.table.modExists("edit", true)){
		return this.table.modules.edit.editCell(this, force);
	***REMOVED***
***REMOVED***;

Cell.prototype.cancelEdit = function(){
	if(this.table.modExists("edit", true)){
		var editing = this.table.modules.edit.getCurrentCell();

		if(editing && editing._getSelf() === this){
			this.table.modules.edit.cancelEdit();
		***REMOVED***else{
			console.warn("Cancel Editor Error - This cell is not currently being edited ");
		***REMOVED***
	***REMOVED***
***REMOVED***;



Cell.prototype.delete = function(){
	if(!this.table.rowManager.redrawBlock){
		this.element.parentNode.removeChild(this.element);
	***REMOVED***
	this.element = false;
	this.column.deleteCell(this);
	this.row.deleteCell(this);
	this.calcs = {***REMOVED***;
***REMOVED***;

//////////////// Navigation /////////////////

Cell.prototype.nav = function(){

	var self = this,
	nextCell = false,
	index = this.row.getCellIndex(this);

	return {
		next:function(){
			var nextCell = this.right(),
			nextRow;

			if(!nextCell){
				nextRow = self.table.rowManager.nextDisplayRow(self.row, true);

				if(nextRow){
					nextCell = nextRow.findNextEditableCell(-1);

					if(nextCell){
						nextCell.edit();
						return true;
					***REMOVED***
				***REMOVED***
			***REMOVED***else{
				return true;
			***REMOVED***

			return false;
		***REMOVED***,
		prev:function(){
			var nextCell = this.left(),
			prevRow;

			if(!nextCell){
				prevRow = self.table.rowManager.prevDisplayRow(self.row, true);

				if(prevRow){
					nextCell = prevRow.findPrevEditableCell(prevRow.cells.length);

					if(nextCell){
						nextCell.edit();
						return true;
					***REMOVED***
				***REMOVED***

			***REMOVED***else{
				return true;
			***REMOVED***

			return false;
		***REMOVED***,
		left:function(){

			nextCell = self.row.findPrevEditableCell(index);

			if(nextCell){
				nextCell.edit();
				return true;
			***REMOVED***else{
				return false;
			***REMOVED***
		***REMOVED***,
		right:function(){
			nextCell = self.row.findNextEditableCell(index);

			if(nextCell){
				nextCell.edit();
				return true;
			***REMOVED***else{
				return false;
			***REMOVED***
		***REMOVED***,
		up:function(){
			var nextRow = self.table.rowManager.prevDisplayRow(self.row, true);

			if(nextRow){
				nextRow.cells[index].edit();
			***REMOVED***
		***REMOVED***,
		down:function(){
			var nextRow = self.table.rowManager.nextDisplayRow(self.row, true);

			if(nextRow){
				nextRow.cells[index].edit();
			***REMOVED***
		***REMOVED***,

	***REMOVED***;

***REMOVED***;

Cell.prototype.getIndex = function(){
	this.row.getCellIndex(this);
***REMOVED***;

//////////////// Object Generation /////////////////
Cell.prototype.getComponent = function(){
	return new CellComponent(this);
***REMOVED***;