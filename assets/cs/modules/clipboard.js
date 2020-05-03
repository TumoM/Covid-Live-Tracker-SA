var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; ***REMOVED*** : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; ***REMOVED***;

/* Tabulator v4.6.2 (c) Oliver Folkerd***REMOVED***/

var Clipboard = function Clipboard(table) {
	this.table = table;
	this.mode = true;

	this.pasteParser = function () {***REMOVED***;
	this.pasteAction = function () {***REMOVED***;
	this.customSelection = false;
	this.rowRange = false;
	this.blocked = true; //block copy actions not originating from this command
***REMOVED***;

Clipboard.prototype.initialize = function () {
	var _this = this;

	this.mode = this.table.options.clipboard;

	this.rowRange = this.table.options.clipboardCopyRowRange;

	if (this.mode === true || this.mode === "copy") {
		this.table.element.addEventListener("copy", function (e) {
			var plain, html;

			if (!_this.blocked) {
				e.preventDefault();

				if (_this.customSelection) {
					plain = _this.customSelection;

					if (_this.table.options.clipboardCopyFormatter) {
						plain = _this.table.options.clipboardCopyFormatter("plain", plain);
					***REMOVED***
				***REMOVED*** else {
					html = _this.table.modules.export.getHtml(_this.rowRange, _this.table.options.clipboardCopyStyled, _this.table.options.clipboardCopyConfig, "clipboard");
					plain = html ? _this.generatePlainContent(html) : "";

					if (_this.table.options.clipboardCopyFormatter) {
						plain = _this.table.options.clipboardCopyFormatter("plain", plain);
						html = _this.table.options.clipboardCopyFormatter("html", html);
					***REMOVED***
				***REMOVED***

				if (window.clipboardData && window.clipboardData.setData) {
					window.clipboardData.setData('Text', plain);
				***REMOVED*** else if (e.clipboardData && e.clipboardData.setData) {
					e.clipboardData.setData('text/plain', plain);
					if (html) {
						e.clipboardData.setData('text/html', html);
					***REMOVED***
				***REMOVED*** else if (e.originalEvent && e.originalEvent.clipboardData.setData) {
					e.originalEvent.clipboardData.setData('text/plain', plain);
					if (html) {
						e.originalEvent.clipboardData.setData('text/html', html);
					***REMOVED***
				***REMOVED***

				_this.table.options.clipboardCopied.call(_this.table, plain, html);

				_this.reset();
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	if (this.mode === true || this.mode === "paste") {
		this.table.element.addEventListener("paste", function (e) {
			_this.paste(e);
		***REMOVED***);
	***REMOVED***

	this.setPasteParser(this.table.options.clipboardPasteParser);
	this.setPasteAction(this.table.options.clipboardPasteAction);
***REMOVED***;

Clipboard.prototype.reset = function () {
	this.blocked = false;
	this.originalSelectionText = "";
***REMOVED***;

Clipboard.prototype.generatePlainContent = function (html) {
	var output = [];

	var holder = document.createElement("div");
	holder.innerHTML = html;

	var table = holder.getElementsByTagName("table")[0];
	var rows = Array.prototype.slice.call(table.getElementsByTagName("tr"));

	rows.forEach(function (row) {
		var rowData = [];

		var headers = Array.prototype.slice.call(row.getElementsByTagName("th"));
		var cells = Array.prototype.slice.call(row.getElementsByTagName("td"));

		cells = cells.concat(headers);

		cells.forEach(function (cell) {
			var val = cell.innerHTML;

			val = val == "&nbsp;" ? "" : val;

			rowData.push(val);
		***REMOVED***);

		output.push(rowData.join("\t"));
	***REMOVED***);

	return output.join("\n");
***REMOVED***;

Clipboard.prototype.copy = function (range, internal) {
	var range, sel, textRange;
	this.blocked = false;
	this.customSelection = false;

	if (this.mode === true || this.mode === "copy") {

		this.rowRange = range || this.table.options.clipboardCopyRowRange;

		if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
			range = document.createRange();
			range.selectNodeContents(this.table.element);
			sel = window.getSelection();

			if (sel.toString() && internal) {
				this.customSelection = sel.toString();
			***REMOVED***

			sel.removeAllRanges();
			sel.addRange(range);
		***REMOVED*** else if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
			textRange = document.body.createTextRange();
			textRange.moveToElementText(this.table.element);
			textRange.select();
		***REMOVED***

		document.execCommand('copy');

		if (sel) {
			sel.removeAllRanges();
		***REMOVED***
	***REMOVED***
***REMOVED***;

//PASTE EVENT HANDLING

Clipboard.prototype.setPasteAction = function (action) {

	switch (typeof action === "undefined" ? "undefined" : _typeof(action)) {
		case "string":
			this.pasteAction = this.pasteActions[action];

			if (!this.pasteAction) {
				console.warn("Clipboard Error - No such paste action found:", action);
			***REMOVED***
			break;

		case "function":
			this.pasteAction = action;
			break;
	***REMOVED***
***REMOVED***;

Clipboard.prototype.setPasteParser = function (parser) {
	switch (typeof parser === "undefined" ? "undefined" : _typeof(parser)) {
		case "string":
			this.pasteParser = this.pasteParsers[parser];

			if (!this.pasteParser) {
				console.warn("Clipboard Error - No such paste parser found:", parser);
			***REMOVED***
			break;

		case "function":
			this.pasteParser = parser;
			break;
	***REMOVED***
***REMOVED***;

Clipboard.prototype.paste = function (e) {
	var data, rowData, rows;

	if (this.checkPaseOrigin(e)) {

		data = this.getPasteData(e);

		rowData = this.pasteParser.call(this, data);

		if (rowData) {
			e.preventDefault();

			if (this.table.modExists("mutator")) {
				rowData = this.mutateData(rowData);
			***REMOVED***

			rows = this.pasteAction.call(this, rowData);
			this.table.options.clipboardPasted.call(this.table, data, rowData, rows);
		***REMOVED*** else {
			this.table.options.clipboardPasteError.call(this.table, data);
		***REMOVED***
	***REMOVED***
***REMOVED***;

Clipboard.prototype.mutateData = function (data) {
	var self = this,
	    output = [];

	if (Array.isArray(data)) {
		data.forEach(function (row) {
			output.push(self.table.modules.mutator.transformRow(row, "clipboard"));
		***REMOVED***);
	***REMOVED*** else {
		output = data;
	***REMOVED***

	return output;
***REMOVED***;

Clipboard.prototype.checkPaseOrigin = function (e) {
	var valid = true;

	if (e.target.tagName != "DIV" || this.table.modules.edit.currentCell) {
		valid = false;
	***REMOVED***

	return valid;
***REMOVED***;

Clipboard.prototype.getPasteData = function (e) {
	var data;

	if (window.clipboardData && window.clipboardData.getData) {
		data = window.clipboardData.getData('Text');
	***REMOVED*** else if (e.clipboardData && e.clipboardData.getData) {
		data = e.clipboardData.getData('text/plain');
	***REMOVED*** else if (e.originalEvent && e.originalEvent.clipboardData.getData) {
		data = e.originalEvent.clipboardData.getData('text/plain');
	***REMOVED***

	return data;
***REMOVED***;

Clipboard.prototype.pasteParsers = {
	table: function table(clipboard) {
		var data = [],
		    success = false,
		    headerFindSuccess = true,
		    columns = this.table.columnManager.columns,
		    columnMap = [],
		    rows = [];

		//get data from clipboard into array of columns and rows.
		clipboard = clipboard.split("\n");

		clipboard.forEach(function (row) {
			data.push(row.split("\t"));
		***REMOVED***);

		if (data.length && !(data.length === 1 && data[0].length < 2)) {
			success = true;

			//check if headers are present by title
			data[0].forEach(function (value) {
				var column = columns.find(function (column) {
					return value && column.definition.title && value.trim() && column.definition.title.trim() === value.trim();
				***REMOVED***);

				if (column) {
					columnMap.push(column);
				***REMOVED*** else {
					headerFindSuccess = false;
				***REMOVED***
			***REMOVED***);

			//check if column headers are present by field
			if (!headerFindSuccess) {
				headerFindSuccess = true;
				columnMap = [];

				data[0].forEach(function (value) {
					var column = columns.find(function (column) {
						return value && column.field && value.trim() && column.field.trim() === value.trim();
					***REMOVED***);

					if (column) {
						columnMap.push(column);
					***REMOVED*** else {
						headerFindSuccess = false;
					***REMOVED***
				***REMOVED***);

				if (!headerFindSuccess) {
					columnMap = this.table.columnManager.columnsByIndex;
				***REMOVED***
			***REMOVED***

			//remove header row if found
			if (headerFindSuccess) {
				data.shift();
			***REMOVED***

			data.forEach(function (item) {
				var row = {***REMOVED***;

				item.forEach(function (value, i) {
					if (columnMap[i]) {
						row[columnMap[i].field] = value;
					***REMOVED***
				***REMOVED***);

				rows.push(row);
			***REMOVED***);

			return rows;
		***REMOVED*** else {
			return false;
		***REMOVED***
	***REMOVED***
***REMOVED***;

Clipboard.prototype.pasteActions = {
	replace: function replace(rows) {
		return this.table.setData(rows);
	***REMOVED***,
	update: function update(rows) {
		return this.table.updateOrAddData(rows);
	***REMOVED***,
	insert: function insert(rows) {
		return this.table.addData(rows);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.registerModule("clipboard", Clipboard);