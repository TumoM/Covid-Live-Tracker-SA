/* Tabulator v4.6.2 (c) Oliver Folkerd***REMOVED***/

var ResizeTable = function ResizeTable(table) {
	this.table = table; //hold Tabulator object
	this.binding = false;
	this.observer = false;
	this.containerObserver = false;

	this.tableHeight = 0;
	this.tableWidth = 0;
	this.containerHeight = 0;
	this.containerWidth = 0;

	this.autoResize = false;
***REMOVED***;

ResizeTable.prototype.initialize = function (row) {
	var _this = this;

	var table = this.table,
	    tableStyle;

	this.tableHeight = table.element.clientHeight;
	this.tableWidth = table.element.clientWidth;

	if (table.element.parentNode) {
		this.containerHeight = table.element.parentNode.clientHeight;
		this.containerWidth = table.element.parentNode.clientWidth;
	***REMOVED***

	if (typeof ResizeObserver !== "undefined" && table.rowManager.getRenderMode() === "virtual") {

		this.autoResize = true;

		this.observer = new ResizeObserver(function (entry) {
			if (!table.browserMobile || table.browserMobile && !table.modules.edit.currentCell) {

				var nodeHeight = Math.floor(entry[0].contentRect.height);
				var nodeWidth = Math.floor(entry[0].contentRect.width);

				if (_this.tableHeight != nodeHeight || _this.tableWidth != nodeWidth) {
					_this.tableHeight = nodeHeight;
					_this.tableWidth = nodeWidth;

					if (table.element.parentNode) {
						_this.containerHeight = table.element.parentNode.clientHeight;
						_this.containerWidth = table.element.parentNode.clientWidth;
					***REMOVED***

					table.redraw();
				***REMOVED***
			***REMOVED***
		***REMOVED***);

		this.observer.observe(table.element);

		tableStyle = window.getComputedStyle(table.element);

		if (this.table.element.parentNode && !this.table.rowManager.fixedHeight && (tableStyle.getPropertyValue("max-height") || tableStyle.getPropertyValue("min-height"))) {

			this.containerObserver = new ResizeObserver(function (entry) {
				if (!table.browserMobile || table.browserMobile && !table.modules.edit.currentCell) {

					var nodeHeight = Math.floor(entry[0].contentRect.height);
					var nodeWidth = Math.floor(entry[0].contentRect.width);

					if (_this.containerHeight != nodeHeight || _this.containerWidth != nodeWidth) {
						_this.containerHeight = nodeHeight;
						_this.containerWidth = nodeWidth;
						_this.tableHeight = table.element.clientHeight;
						_this.tableWidth = table.element.clientWidth;

						table.redraw();
					***REMOVED***

					table.redraw();
				***REMOVED***
			***REMOVED***);

			this.containerObserver.observe(this.table.element.parentNode);
		***REMOVED***
	***REMOVED*** else {
		this.binding = function () {
			if (!table.browserMobile || table.browserMobile && !table.modules.edit.currentCell) {
				table.redraw();
			***REMOVED***
		***REMOVED***;

		window.addEventListener("resize", this.binding);
	***REMOVED***
***REMOVED***;

ResizeTable.prototype.clearBindings = function (row) {
	if (this.binding) {
		window.removeEventListener("resize", this.binding);
	***REMOVED***

	if (this.observer) {
		this.observer.unobserve(this.table.element);
	***REMOVED***

	if (this.containerObserver) {
		this.containerObserver.unobserve(this.table.element.parentNode);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.registerModule("resizeTable", ResizeTable);