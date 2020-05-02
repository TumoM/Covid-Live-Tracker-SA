var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; ***REMOVED*** : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; ***REMOVED***;

/* Tabulator v4.6.2 (c) Oliver Folkerd***REMOVED***/

var Export = function Export(table) {
	this.table = table; //hold Tabulator object
	this.config = {***REMOVED***;
	this.cloneTableStyle = true;
	this.colVisProp = "";
***REMOVED***;

Export.prototype.genereateTable = function (config, style, range, colVisProp) {
	this.cloneTableStyle = style;
	this.config = config || {***REMOVED***;
	this.colVisProp = colVisProp;

	var table = document.createElement("table");
	table.classList.add("tabulator-print-table");

	if (this.config.columnHeaders !== false) {
		table.appendChild(this.generateHeaderElements());
	***REMOVED***

	table.appendChild(this.generateBodyElements(this.rowLookup(range)));

	this.mapElementStyles(this.table.element, table, ["border-top", "border-left", "border-right", "border-bottom"]);

	return table;
***REMOVED***;

Export.prototype.rowLookup = function (range) {
	var _this = this;

	var rows = [];

	if (typeof range == "function") {
		range.call(this.table).forEach(function (row) {
			row = _this.table.rowManager.findRow(row);

			if (row) {
				rows.push(row);
			***REMOVED***
		***REMOVED***);
	***REMOVED*** else {
		switch (range) {
			case true:
			case "visible":
				rows = this.table.rowManager.getVisibleRows(true);
				break;

			case "all":
				rows = this.table.rowManager.rows;
				break;

			case "selected":
				rows = this.modules.selectRow.selectedRows;
				break;

			case "active":
			default:
				rows = this.table.rowManager.getDisplayRows();
		***REMOVED***
	***REMOVED***

	return Object.assign([], rows);
***REMOVED***;

Export.prototype.generateColumnGroupHeaders = function () {
	var _this2 = this;

	var output = [];

	var columns = this.config.columnGroups !== false ? this.table.columnManager.columns : this.table.columnManager.columnsByIndex;

	columns.forEach(function (column) {
		var colData = _this2.processColumnGroup(column);

		if (colData) {
			output.push(colData);
		***REMOVED***
	***REMOVED***);

	return output;
***REMOVED***;

Export.prototype.processColumnGroup = function (column) {
	var _this3 = this;

	var subGroups = column.columns,
	    maxDepth = 0;

	var groupData = {
		title: column.definition.title,
		column: column,
		depth: 1
	***REMOVED***;

	if (subGroups.length) {
		groupData.subGroups = [];
		groupData.width = 0;

		subGroups.forEach(function (subGroup) {
			var subGroupData = _this3.processColumnGroup(subGroup);

			if (subGroupData) {
				groupData.width += subGroupData.width;
				groupData.subGroups.push(subGroupData);

				if (subGroupData.depth > maxDepth) {
					maxDepth = subGroupData.depth;
				***REMOVED***
			***REMOVED***
		***REMOVED***);

		groupData.depth += maxDepth;

		if (!groupData.width) {
			return false;
		***REMOVED***
	***REMOVED*** else {
		if (this.columnVisCheck(column)) {
			groupData.width = 1;
		***REMOVED*** else {
			return false;
		***REMOVED***
	***REMOVED***

	return groupData;
***REMOVED***;

Export.prototype.groupHeadersToRows = function (columns) {

	var headers = [],
	    headerDepth = 0;

	function parseColumnGroup(column, level) {

		var depth = headerDepth - level;

		if (typeof headers[level] === "undefined") {
			headers[level] = [];
		***REMOVED***

		column.height = column.subGroups ? 1 : depth - column.depth + 1;

		headers[level].push(column);

		if (column.subGroups) {
			column.subGroups.forEach(function (subGroup) {
				parseColumnGroup(subGroup, level + 1);
			***REMOVED***);
		***REMOVED***
	***REMOVED***

	//calculate maximum header debth
	columns.forEach(function (column) {
		if (column.depth > headerDepth) {
			headerDepth = column.depth;
		***REMOVED***
	***REMOVED***);

	columns.forEach(function (column) {
		parseColumnGroup(column, 0);
	***REMOVED***);

	return headers;
***REMOVED***;

Export.prototype.generateHeaderElements = function () {
	var _this4 = this;

	var headerEl = document.createElement("thead");

	var rows = this.groupHeadersToRows(this.generateColumnGroupHeaders());

	rows.forEach(function (row) {
		var rowEl = document.createElement("tr");

		_this4.mapElementStyles(_this4.table.columnManager.getHeadersElement(), headerEl, ["border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]);

		row.forEach(function (column) {
			var cellEl = document.createElement("th");
			var classNames = column.column.definition.cssClass ? column.column.definition.cssClass.split(" ") : [];

			cellEl.colSpan = column.width;
			cellEl.rowSpan = column.height;

			cellEl.innerHTML = column.column.definition.title;

			if (_this4.cloneTableStyle) {
				cellEl.style.boxSizing = "border-box";
			***REMOVED***

			classNames.forEach(function (className) {
				cellEl.classList.add(className);
			***REMOVED***);

			_this4.mapElementStyles(column.column.getElement(), cellEl, ["text-align", "border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]);
			_this4.mapElementStyles(column.column.contentElement, cellEl, ["padding-top", "padding-left", "padding-right", "padding-bottom"]);

			if (column.column.visible) {
				_this4.mapElementStyles(column.column.getElement(), cellEl, ["width"]);
			***REMOVED*** else {
				if (column.column.definition.width) {
					cellEl.style.width = column.column.definition.width + "px";
				***REMOVED***
			***REMOVED***

			if (column.column.parent) {
				_this4.mapElementStyles(column.column.parent.groupElement, cellEl, ["border-top"]);
			***REMOVED***

			rowEl.appendChild(cellEl);
		***REMOVED***);

		headerEl.appendChild(rowEl);
	***REMOVED***);

	return headerEl;
***REMOVED***;

Export.prototype.generateBodyElements = function (rows) {***REMOVED***;

Export.prototype.generateBodyElements = function (rows) {
	var _this5 = this;

	var oddRow, evenRow, calcRow, firstRow, firstCell, firstGroup, lastCell, styleCells, styleRow, treeElementField, rowFormatter;

	//assign row formatter
	rowFormatter = this.table.options["rowFormatter" + (this.colVisProp.charAt(0).toUpperCase() + this.colVisProp.slice(1))];
	rowFormatter = rowFormatter !== null ? rowFormatter : this.table.options.rowFormatter;

	//lookup row styles
	if (this.cloneTableStyle && window.getComputedStyle) {
		oddRow = this.table.element.querySelector(".tabulator-row-odd:not(.tabulator-group):not(.tabulator-calcs)");
		evenRow = this.table.element.querySelector(".tabulator-row-even:not(.tabulator-group):not(.tabulator-calcs)");
		calcRow = this.table.element.querySelector(".tabulator-row.tabulator-calcs");
		firstRow = this.table.element.querySelector(".tabulator-row:not(.tabulator-group):not(.tabulator-calcs)");
		firstGroup = this.table.element.getElementsByClassName("tabulator-group")[0];

		if (firstRow) {
			styleCells = firstRow.getElementsByClassName("tabulator-cell");
			firstCell = styleCells[0];
			lastCell = styleCells[styleCells.length - 1];
		***REMOVED***
	***REMOVED***

	var bodyEl = document.createElement("tbody");

	var columns = [];

	if (this.config.columnCalcs !== false && this.table.modExists("columnCalcs")) {
		if (this.table.modules.columnCalcs.topInitialized) {
			rows.unshift(this.table.modules.columnCalcs.topRow);
		***REMOVED***

		if (this.table.modules.columnCalcs.botInitialized) {
			rows.push(this.table.modules.columnCalcs.botRow);
		***REMOVED***
	***REMOVED***

	this.table.columnManager.columnsByIndex.forEach(function (column) {
		if (_this5.columnVisCheck(column)) {
			columns.push(column);
		***REMOVED***
	***REMOVED***);

	if (this.table.options.dataTree && this.config.dataTree !== false && this.table.modExists("columnCalcs")) {
		treeElementField = this.table.modules.dataTree.elementField;
	***REMOVED***

	rows = rows.filter(function (row) {
		switch (row.type) {
			case "group":
				return _this5.config.rowGroups !== false;
				break;

			case "calc":
				return _this5.config.columnCalcs !== false;
				break;
		***REMOVED***

		return true;
	***REMOVED***);

	if (rows.length > 1000) {
		console.warn("It may take a long time to render an HTML table with more than 1000 rows");
	***REMOVED***

	rows.forEach(function (row, i) {
		var rowData = row.getData(_this5.colVisProp);

		var rowEl = document.createElement("tr");
		rowEl.classList.add("tabulator-print-table-row");

		switch (row.type) {
			case "group":
				var cellEl = document.createElement("td");
				cellEl.colSpan = columns.length;
				cellEl.innerHTML = row.key;

				rowEl.classList.add("tabulator-print-table-group");

				_this5.mapElementStyles(firstGroup, rowEl, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]);
				_this5.mapElementStyles(firstGroup, cellEl, ["padding-top", "padding-left", "padding-right", "padding-bottom"]);
				rowEl.appendChild(cellEl);
				break;

			case "calc":
				rowEl.classList.add("tabulator-print-table-calcs");

			case "row":

				if (_this5.table.options.dataTree && _this5.config.dataTree === false && row.modules.dataTree.parent) {
					return;
				***REMOVED***

				columns.forEach(function (column, i) {
					var cellEl = document.createElement("td");

					var value = column.getFieldValue(rowData);

					var cellWrapper = {
						modules: {***REMOVED***,
						getValue: function getValue() {
							return value;
						***REMOVED***,
						getField: function getField() {
							return column.definition.field;
						***REMOVED***,
						getElement: function getElement() {
							return cellEl;
						***REMOVED***,
						getColumn: function getColumn() {
							return column.getComponent();
						***REMOVED***,
						getData: function getData() {
							return rowData;
						***REMOVED***,
						getRow: function getRow() {
							return row.getComponent();
						***REMOVED***,
						getComponent: function getComponent() {
							return cellWrapper;
						***REMOVED***,
						column: column
					***REMOVED***;

					var classNames = column.definition.cssClass ? column.definition.cssClass.split(" ") : [];

					classNames.forEach(function (className) {
						cellEl.classList.add(className);
					***REMOVED***);

					if (_this5.table.modExists("format") && _this5.config.formatCells !== false) {
						value = _this5.table.modules.format.formatExportValue(cellWrapper, _this5.colVisProp);
					***REMOVED*** else {
						switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
							case "object":
								value = JSON.stringify(value);
								break;

							case "undefined":
							case "null":
								value = "";
								break;

							default:
								value = value;
						***REMOVED***
					***REMOVED***

					if (value instanceof Node) {
						cellEl.appendChild(value);
					***REMOVED*** else {
						cellEl.innerHTML = value;
					***REMOVED***

					if (firstCell) {
						_this5.mapElementStyles(firstCell, cellEl, ["padding-top", "padding-left", "padding-right", "padding-bottom", "border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size"]);

						if (column.definition.align) {
							cellEl.style.textAlign = column.definition.align;
						***REMOVED***
					***REMOVED***

					if (_this5.table.options.dataTree && _this5.config.dataTree !== false) {
						if (treeElementField && treeElementField == column.field || !treeElementField && i == 0) {
							if (row.modules.dataTree.controlEl) {
								cellEl.insertBefore(row.modules.dataTree.controlEl.cloneNode(true), cellEl.firstChild);
							***REMOVED***
							if (row.modules.dataTree.branchEl) {
								cellEl.insertBefore(row.modules.dataTree.branchEl.cloneNode(true), cellEl.firstChild);
							***REMOVED***
						***REMOVED***
					***REMOVED***

					rowEl.appendChild(cellEl);

					if (cellWrapper.modules.format && cellWrapper.modules.format.renderedCallback) {
						cellWrapper.modules.format.renderedCallback();
					***REMOVED***
				***REMOVED***);

				styleRow = row.type == "calc" ? calcRow : i % 2 && evenRow ? evenRow : oddRow;

				_this5.mapElementStyles(styleRow, rowEl, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]);

				if (rowFormatter && _this5.config.formatCells !== false) {
					var rowComponent = row.getComponent();

					rowComponent.getElement = function () {
						return rowEl;
					***REMOVED***;

					rowFormatter(rowComponent);
				***REMOVED***

				break;
		***REMOVED***

		bodyEl.appendChild(rowEl);
	***REMOVED***);

	return bodyEl;
***REMOVED***;

Export.prototype.columnVisCheck = function (column) {
	return column.definition[this.colVisProp] !== false && (column.visible || !column.visible && column.definition[this.colVisProp]);
***REMOVED***;

Export.prototype.getHtml = function (visible, style, config, colVisProp) {
	var holder = document.createElement("div");

	holder.appendChild(this.genereateTable(config || this.table.options.htmlOutputConfig, style, visible, colVisProp || "htmlOutput"));

	return holder.innerHTML;
***REMOVED***;

Export.prototype.mapElementStyles = function (from, to, props) {
	if (this.cloneTableStyle && from && to) {

		var lookup = {
			"background-color": "backgroundColor",
			"color": "fontColor",
			"width": "width",
			"font-weight": "fontWeight",
			"font-family": "fontFamily",
			"font-size": "fontSize",
			"text-align": "textAlign",
			"border-top": "borderTop",
			"border-left": "borderLeft",
			"border-right": "borderRight",
			"border-bottom": "borderBottom",
			"padding-top": "paddingTop",
			"padding-left": "paddingLeft",
			"padding-right": "paddingRight",
			"padding-bottom": "paddingBottom"
		***REMOVED***;

		if (window.getComputedStyle) {
			var fromStyle = window.getComputedStyle(from);

			props.forEach(function (prop) {
				to.style[lookup[prop]] = fromStyle.getPropertyValue(prop);
			***REMOVED***);
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.registerModule("export", Export);