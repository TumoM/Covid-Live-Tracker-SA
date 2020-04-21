var ResizeRows = function(table){
	this.table = table; //hold Tabulator object
	this.startColumn = false;
	this.startY = false;
	this.startHeight = false;
	this.handle = null;
	this.prevHandle = null;
***REMOVED***;

ResizeRows.prototype.initializeRow = function(row){
	var self = this,
	rowEl = row.getElement();

	var handle = document.createElement('div');
	handle.className = "tabulator-row-resize-handle";

	var prevHandle = document.createElement('div');
	prevHandle.className = "tabulator-row-resize-handle prev";

	handle.addEventListener("click", function(e){
		e.stopPropagation();
	***REMOVED***);

	var handleDown = function(e){
		self.startRow = row;
		self._mouseDown(e, row, handle);
	***REMOVED***;

	handle.addEventListener("mousedown", handleDown);
	handle.addEventListener("touchstart", handleDown, {passive: true***REMOVED***);

	prevHandle.addEventListener("click", function(e){
		e.stopPropagation();
	***REMOVED***);


	var prevHandleDown =  function(e){
		var prevRow = self.table.rowManager.prevDisplayRow(row);

		if(prevRow){
			self.startRow = prevRow;
			self._mouseDown(e, prevRow, prevHandle);
		***REMOVED***
	***REMOVED***;

	prevHandle.addEventListener("mousedown",prevHandleDown);
	prevHandle.addEventListener("touchstart",prevHandleDown, {passive: true***REMOVED***);

	rowEl.appendChild(handle);
	rowEl.appendChild(prevHandle);
***REMOVED***;

ResizeRows.prototype._mouseDown = function(e, row, handle){
	var self = this;

	self.table.element.classList.add("tabulator-block-select");

	function mouseMove(e){
		row.setHeight(self.startHeight + ((typeof e.screenY === "undefined" ? e.touches[0].screenY : e.screenY) - self.startY));
	***REMOVED***

	function mouseUp(e){

		// //block editor from taking action while resizing is taking place
		// if(self.startColumn.modules.edit){
		// 	self.startColumn.modules.edit.blocked = false;
		// ***REMOVED***

		document.body.removeEventListener("mouseup", mouseMove);
		document.body.removeEventListener("mousemove", mouseMove);

		handle.removeEventListener("touchmove", mouseMove);
		handle.removeEventListener("touchend", mouseUp);

		self.table.element.classList.remove("tabulator-block-select");

		self.table.options.rowResized.call(this.table, row.getComponent());
	***REMOVED***

	e.stopPropagation(); //prevent resize from interfereing with movable columns

	//block editor from taking action while resizing is taking place
	// if(self.startColumn.modules.edit){
	// 	self.startColumn.modules.edit.blocked = true;
	// ***REMOVED***

	self.startY = typeof e.screenY === "undefined" ? e.touches[0].screenY : e.screenY;
	self.startHeight = row.getHeight();

	document.body.addEventListener("mousemove", mouseMove);
	document.body.addEventListener("mouseup", mouseUp);

	handle.addEventListener("touchmove", mouseMove, {passive: true***REMOVED***);
	handle.addEventListener("touchend", mouseUp);
***REMOVED***;

Tabulator.prototype.registerModule("resizeRows", ResizeRows);