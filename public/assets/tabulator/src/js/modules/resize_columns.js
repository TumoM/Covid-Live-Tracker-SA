var ResizeColumns = function(table){
	this.table = table; //hold Tabulator object
	this.startColumn = false;
	this.startX = false;
	this.startWidth = false;
	this.handle = null;
	this.prevHandle = null;
***REMOVED***;

ResizeColumns.prototype.initializeColumn = function(type, column, element){
	var self = this,
	variableHeight =false,
	mode = this.table.options.resizableColumns;

	//set column resize mode
	if(type === "header"){
		variableHeight = column.definition.formatter == "textarea" || column.definition.variableHeight;
		column.modules.resize = {variableHeight:variableHeight***REMOVED***;
	***REMOVED***

	if(mode === true || mode == type){

		var handle = document.createElement('div');
		handle.className = "tabulator-col-resize-handle";


		var prevHandle = document.createElement('div');
		prevHandle.className = "tabulator-col-resize-handle prev";

		handle.addEventListener("click", function(e){
			e.stopPropagation();
		***REMOVED***);

		var handleDown = function(e){
			var nearestColumn = column.getLastColumn();

			if(nearestColumn && self._checkResizability(nearestColumn)){
				self.startColumn = column;
				self._mouseDown(e, nearestColumn, handle);
			***REMOVED***
		***REMOVED***;

		handle.addEventListener("mousedown", handleDown);
		handle.addEventListener("touchstart", handleDown, {passive: true***REMOVED***);

		//reszie column on  double click
		handle.addEventListener("dblclick", function(e){
			var col = column.getLastColumn();

			if(col && self._checkResizability(col)){
				e.stopPropagation();
				col.reinitializeWidth(true);
			***REMOVED***
		***REMOVED***);


		prevHandle.addEventListener("click", function(e){
			e.stopPropagation();
		***REMOVED***);

		var prevHandleDown = function(e){
			var nearestColumn, colIndex, prevColumn;

			nearestColumn = column.getFirstColumn();

			if(nearestColumn){
				colIndex = self.table.columnManager.findColumnIndex(nearestColumn);
				prevColumn = colIndex > 0 ? self.table.columnManager.getColumnByIndex(colIndex - 1) : false;

				if(prevColumn && self._checkResizability(prevColumn)){
					self.startColumn = column;
					self._mouseDown(e, prevColumn, prevHandle);
				***REMOVED***
			***REMOVED***
		***REMOVED***;

		prevHandle.addEventListener("mousedown", prevHandleDown);
		prevHandle.addEventListener("touchstart", prevHandleDown, {passive: true***REMOVED***);

		//resize column on double click
		prevHandle.addEventListener("dblclick", function(e){
			var nearestColumn, colIndex, prevColumn;

			nearestColumn = column.getFirstColumn();

			if(nearestColumn){
				colIndex = self.table.columnManager.findColumnIndex(nearestColumn);
				prevColumn = colIndex > 0 ? self.table.columnManager.getColumnByIndex(colIndex - 1) : false;

				if(prevColumn && self._checkResizability(prevColumn)){
					e.stopPropagation();
					prevColumn.reinitializeWidth(true);
				***REMOVED***
			***REMOVED***
		***REMOVED***);

		element.appendChild(handle);
		element.appendChild(prevHandle);
	***REMOVED***
***REMOVED***;


ResizeColumns.prototype._checkResizability = function(column){
	return typeof column.definition.resizable != "undefined" ? column.definition.resizable : this.table.options.resizableColumns;
***REMOVED***;

ResizeColumns.prototype._mouseDown = function(e, column, handle){
	var self = this;

	self.table.element.classList.add("tabulator-block-select");

	function mouseMove(e){
		// self.table.columnManager.tempScrollBlock();

		column.setWidth(self.startWidth + ((typeof e.screenX === "undefined" ? e.touches[0].screenX : e.screenX) - self.startX));

		if(!self.table.browserSlow && column.modules.resize && column.modules.resize.variableHeight){
			column.checkCellHeights();
		***REMOVED***
	***REMOVED***

	function mouseUp(e){

		//block editor from taking action while resizing is taking place
		if(self.startColumn.modules.edit){
			self.startColumn.modules.edit.blocked = false;
		***REMOVED***

		if(self.table.browserSlow && column.modules.resize && column.modules.resize.variableHeight){
			column.checkCellHeights();
		***REMOVED***

		document.body.removeEventListener("mouseup", mouseUp);
		document.body.removeEventListener("mousemove", mouseMove);

		handle.removeEventListener("touchmove", mouseMove);
		handle.removeEventListener("touchend", mouseUp);

		self.table.element.classList.remove("tabulator-block-select");

		if(self.table.options.persistence && self.table.modExists("persistence", true) && self.table.modules.persistence.config.columns){
			self.table.modules.persistence.save("columns");
		***REMOVED***

		self.table.options.columnResized.call(self.table, column.getComponent());
	***REMOVED***

	e.stopPropagation(); //prevent resize from interfereing with movable columns

	//block editor from taking action while resizing is taking place
	if(self.startColumn.modules.edit){
		self.startColumn.modules.edit.blocked = true;
	***REMOVED***

	self.startX = typeof e.screenX === "undefined" ? e.touches[0].screenX : e.screenX;
	self.startWidth = column.getWidth();

	document.body.addEventListener("mousemove", mouseMove);
	document.body.addEventListener("mouseup", mouseUp);
	handle.addEventListener("touchmove", mouseMove, {passive: true***REMOVED***);
	handle.addEventListener("touchend", mouseUp);
***REMOVED***;

Tabulator.prototype.registerModule("resizeColumns", ResizeColumns);