var FrozenRows = function(table){
	this.table = table; //hold Tabulator object
	this.topElement = document.createElement("div");
	this.rows = [];
	this.displayIndex = 0; //index in display pipeline
***REMOVED***;

FrozenRows.prototype.initialize = function(){
	this.rows = [];

	this.topElement.classList.add("tabulator-frozen-rows-holder");

	// this.table.columnManager.element.append(this.topElement);
	this.table.columnManager.getElement().insertBefore(this.topElement, this.table.columnManager.headersElement.nextSibling);
***REMOVED***;

FrozenRows.prototype.setDisplayIndex = function(index){
	this.displayIndex = index;
***REMOVED***;

FrozenRows.prototype.getDisplayIndex = function(){
	return this.displayIndex;
***REMOVED***;

FrozenRows.prototype.isFrozen = function(){
	return !!this.rows.length;
***REMOVED***;

//filter frozen rows out of display data
FrozenRows.prototype.getRows = function(rows){
	var self = this,
	frozen = [],
	output = rows.slice(0);

	this.rows.forEach(function(row){
		var index = output.indexOf(row);

		if(index > -1){
			output.splice(index, 1);
		***REMOVED***
	***REMOVED***);

	return output;
***REMOVED***;

FrozenRows.prototype.freezeRow = function(row){
	if(!row.modules.frozen){
		row.modules.frozen = true;
		this.topElement.appendChild(row.getElement());
		row.initialize();
		row.normalizeHeight();
		this.table.rowManager.adjustTableSize();

		this.rows.push(row);

		this.table.rowManager.refreshActiveData("display");

		this.styleRows();

	***REMOVED***else{
		console.warn("Freeze Error - Row is already frozen");
	***REMOVED***
***REMOVED***;

FrozenRows.prototype.unfreezeRow = function(row){
	var index = this.rows.indexOf(row);

	if(row.modules.frozen){

		row.modules.frozen = false;

		var rowEl = row.getElement();
		rowEl.parentNode.removeChild(rowEl);

		this.table.rowManager.adjustTableSize();

		this.rows.splice(index, 1);

		this.table.rowManager.refreshActiveData("display");

		if(this.rows.length){
			this.styleRows();
		***REMOVED***

	***REMOVED***else{
		console.warn("Freeze Error - Row is already unfrozen");
	***REMOVED***
***REMOVED***;

FrozenRows.prototype.styleRows = function(row){
	var self = this;

	this.rows.forEach(function(row, i){
		self.table.rowManager.styleRow(row, i);
	***REMOVED***);
***REMOVED***


Tabulator.prototype.registerModule("frozenRows", FrozenRows);