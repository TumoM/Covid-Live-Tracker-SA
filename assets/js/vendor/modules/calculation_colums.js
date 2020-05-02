var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; ***REMOVED*** : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; ***REMOVED***;

/* Tabulator v4.6.2 (c) Oliver Folkerd***REMOVED***/

var ColumnCalcs = function ColumnCalcs(table) {
	this.table = table; //hold Tabulator object
	this.topCalcs = [];
	this.botCalcs = [];
	this.genColumn = false;
	this.topElement = this.createElement();
	this.botElement = this.createElement();
	this.topRow = false;
	this.botRow = false;
	this.topInitialized = false;
	this.botInitialized = false;

	this.initialize();
***REMOVED***;

ColumnCalcs.prototype.createElement = function () {
	var el = document.createElement("div");
	el.classList.add("tabulator-calcs-holder");
	return el;
***REMOVED***;

ColumnCalcs.prototype.initialize = function () {
	this.genColumn = new Column({ field: "value" ***REMOVED***, this);
***REMOVED***;

//dummy functions to handle being mock column manager
ColumnCalcs.prototype.registerColumnField = function () {***REMOVED***;

//initialize column calcs
ColumnCalcs.prototype.initializeColumn = function (column) {
	var def = column.definition;

	var config = {
		topCalcParams: def.topCalcParams || {***REMOVED***,
		botCalcParams: def.bottomCalcParams || {***REMOVED***
	***REMOVED***;

	if (def.topCalc) {

		switch (_typeof(def.topCalc)) {
			case "string":
				if (this.calculations[def.topCalc]) {
					config.topCalc = this.calculations[def.topCalc];
				***REMOVED*** else {
					console.warn("Column Calc Error - No such calculation found, ignoring: ", def.topCalc);
				***REMOVED***
				break;

			case "function":
				config.topCalc = def.topCalc;
				break;

		***REMOVED***

		if (config.topCalc) {
			column.modules.columnCalcs = config;
			this.topCalcs.push(column);

			if (this.table.options.columnCalcs != "group") {
				this.initializeTopRow();
			***REMOVED***
		***REMOVED***
	***REMOVED***

	if (def.bottomCalc) {
		switch (_typeof(def.bottomCalc)) {
			case "string":
				if (this.calculations[def.bottomCalc]) {
					config.botCalc = this.calculations[def.bottomCalc];
				***REMOVED*** else {
					console.warn("Column Calc Error - No such calculation found, ignoring: ", def.bottomCalc);
				***REMOVED***
				break;

			case "function":
				config.botCalc = def.bottomCalc;
				break;

		***REMOVED***

		if (config.botCalc) {
			column.modules.columnCalcs = config;
			this.botCalcs.push(column);

			if (this.table.options.columnCalcs != "group") {
				this.initializeBottomRow();
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

ColumnCalcs.prototype.removeCalcs = function () {
	var changed = false;

	if (this.topInitialized) {
		this.topInitialized = false;
		this.topElement.parentNode.removeChild(this.topElement);
		changed = true;
	***REMOVED***

	if (this.botInitialized) {
		this.botInitialized = false;
		this.table.footerManager.remove(this.botElement);
		changed = true;
	***REMOVED***

	if (changed) {
		this.table.rowManager.adjustTableSize();
	***REMOVED***
***REMOVED***;

ColumnCalcs.prototype.initializeTopRow = function () {
	if (!this.topInitialized) {
		// this.table.columnManager.headersElement.after(this.topElement);
		this.table.columnManager.getElement().insertBefore(this.topElement, this.table.columnManager.headersElement.nextSibling);
		this.topInitialized = true;
	***REMOVED***
***REMOVED***;

ColumnCalcs.prototype.initializeBottomRow = function () {
	if (!this.botInitialized) {
		this.table.footerManager.prepend(this.botElement);
		this.botInitialized = true;
	***REMOVED***
***REMOVED***;

ColumnCalcs.prototype.scrollHorizontal = function (left) {
	var hozAdjust = 0,
	    scrollWidth = this.table.columnManager.getElement().scrollWidth - this.table.element.clientWidth;

	if (this.botInitialized) {
		this.botRow.getElement().style.marginLeft = -left + "px";
	***REMOVED***
***REMOVED***;

ColumnCalcs.prototype.recalc = function (rows) {
	var data, row;

	if (this.topInitialized || this.botInitialized) {
		data = this.rowsToData(rows);

		if (this.topInitialized) {
			if (this.topRow) {
				this.topRow.deleteCells();
			***REMOVED***

			row = this.generateRow("top", this.rowsToData(rows));
			this.topRow = row;
			while (this.topElement.firstChild) {
				this.topElement.removeChild(this.topElement.firstChild);
			***REMOVED***this.topElement.appendChild(row.getElement());
			row.initialize(true);
		***REMOVED***

		if (this.botInitialized) {
			if (this.botRow) {
				this.botRow.deleteCells();
			***REMOVED***

			row = this.generateRow("bottom", this.rowsToData(rows));
			this.botRow = row;
			while (this.botElement.firstChild) {
				this.botElement.removeChild(this.botElement.firstChild);
			***REMOVED***this.botElement.appendChild(row.getElement());
			row.initialize(true);
		***REMOVED***

		this.table.rowManager.adjustTableSize();

		//set resizable handles
		if (this.table.modExists("frozenColumns")) {
			this.table.modules.frozenColumns.layout();
		***REMOVED***
	***REMOVED***
***REMOVED***;

ColumnCalcs.prototype.recalcRowGroup = function (row) {
	this.recalcGroup(this.table.modules.groupRows.getRowGroup(row));
***REMOVED***;

ColumnCalcs.prototype.recalcAll = function () {
	var _this = this;

	if (this.topCalcs.length || this.botCalcs.length) {
		if (this.table.options.columnCalcs !== "group") {
			this.recalc(this.table.rowManager.activeRows);
		***REMOVED***

		if (this.table.options.groupBy && this.table.options.columnCalcs !== "table") {

			var groups = table.modules.groupRows.getChildGroups();

			groups.forEach(function (group) {
				_this.recalcGroup(group);
			***REMOVED***);
		***REMOVED***
	***REMOVED***
***REMOVED***;

ColumnCalcs.prototype.recalcGroup = function (group) {
	var data, rowData;

	if (group) {
		if (group.calcs) {
			if (group.calcs.bottom) {
				data = this.rowsToData(group.rows);
				rowData = this.generateRowData("bottom", data);

				group.calcs.bottom.updateData(rowData);
				group.calcs.bottom.reinitialize();
			***REMOVED***

			if (group.calcs.top) {
				data = this.rowsToData(group.rows);
				rowData = this.generateRowData("top", data);

				group.calcs.top.updateData(rowData);
				group.calcs.top.reinitialize();
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

//generate top stats row
ColumnCalcs.prototype.generateTopRow = function (rows) {
	return this.generateRow("top", this.rowsToData(rows));
***REMOVED***;
//generate bottom stats row
ColumnCalcs.prototype.generateBottomRow = function (rows) {
	return this.generateRow("bottom", this.rowsToData(rows));
***REMOVED***;

ColumnCalcs.prototype.rowsToData = function (rows) {
	var _this2 = this;

	var data = [];

	rows.forEach(function (row) {
		data.push(row.getData());

		if (_this2.table.options.dataTree && _this2.table.options.dataTreeChildColumnCalcs) {
			if (row.modules.dataTree.open) {
				var children = _this2.rowsToData(_this2.table.modules.dataTree.getFilteredTreeChildren(row));
				data = data.concat(children);
			***REMOVED***
		***REMOVED***
	***REMOVED***);

	return data;
***REMOVED***;

//generate stats row
ColumnCalcs.prototype.generateRow = function (pos, data) {
	var self = this,
	    rowData = this.generateRowData(pos, data),
	    row;

	if (self.table.modExists("mutator")) {
		self.table.modules.mutator.disable();
	***REMOVED***

	row = new Row(rowData, this, "calc");

	if (self.table.modExists("mutator")) {
		self.table.modules.mutator.enable();
	***REMOVED***

	row.getElement().classList.add("tabulator-calcs", "tabulator-calcs-" + pos);

	row.generateCells = function () {

		var cells = [];

		self.table.columnManager.columnsByIndex.forEach(function (column) {

			//set field name of mock column
			self.genColumn.setField(column.getField());
			self.genColumn.hozAlign = column.hozAlign;

			if (column.definition[pos + "CalcFormatter"] && self.table.modExists("format")) {

				self.genColumn.modules.format = {
					formatter: self.table.modules.format.getFormatter(column.definition[pos + "CalcFormatter"]),
					params: column.definition[pos + "CalcFormatterParams"]
				***REMOVED***;
			***REMOVED*** else {
				self.genColumn.modules.format = {
					formatter: self.table.modules.format.getFormatter("plaintext"),
					params: {***REMOVED***
				***REMOVED***;
			***REMOVED***

			//ensure css class defintion is replicated to calculation cell
			self.genColumn.definition.cssClass = column.definition.cssClass;

			//generate cell and assign to correct column
			var cell = new Cell(self.genColumn, row);
			cell.column = column;
			cell.setWidth();

			column.cells.push(cell);
			cells.push(cell);

			if (!column.visible) {
				cell.hide();
			***REMOVED***
		***REMOVED***);

		this.cells = cells;
	***REMOVED***;

	return row;
***REMOVED***;

//generate stats row
ColumnCalcs.prototype.generateRowData = function (pos, data) {
	var rowData = {***REMOVED***,
	    calcs = pos == "top" ? this.topCalcs : this.botCalcs,
	    type = pos == "top" ? "topCalc" : "botCalc",
	    params,
	    paramKey;

	calcs.forEach(function (column) {
		var values = [];

		if (column.modules.columnCalcs && column.modules.columnCalcs[type]) {
			data.forEach(function (item) {
				values.push(column.getFieldValue(item));
			***REMOVED***);

			paramKey = type + "Params";
			params = typeof column.modules.columnCalcs[paramKey] === "function" ? column.modules.columnCalcs[paramKey](values, data) : column.modules.columnCalcs[paramKey];

			column.setFieldValue(rowData, column.modules.columnCalcs[type](values, data, params));
		***REMOVED***
	***REMOVED***);

	return rowData;
***REMOVED***;

ColumnCalcs.prototype.hasTopCalcs = function () {
	return !!this.topCalcs.length;
***REMOVED***;

ColumnCalcs.prototype.hasBottomCalcs = function () {
	return !!this.botCalcs.length;
***REMOVED***;

//handle table redraw
ColumnCalcs.prototype.redraw = function () {
	if (this.topRow) {
		this.topRow.normalizeHeight(true);
	***REMOVED***
	if (this.botRow) {
		this.botRow.normalizeHeight(true);
	***REMOVED***
***REMOVED***;

//return the calculated
ColumnCalcs.prototype.getResults = function () {
	var self = this,
	    results = {***REMOVED***,
	    groups;

	if (this.table.options.groupBy && this.table.modExists("groupRows")) {
		groups = this.table.modules.groupRows.getGroups(true);

		groups.forEach(function (group) {
			results[group.getKey()] = self.getGroupResults(group);
		***REMOVED***);
	***REMOVED*** else {
		results = {
			top: this.topRow ? this.topRow.getData() : {***REMOVED***,
			bottom: this.botRow ? this.botRow.getData() : {***REMOVED***
		***REMOVED***;
	***REMOVED***

	return results;
***REMOVED***;

//get results from a group
ColumnCalcs.prototype.getGroupResults = function (group) {
	var self = this,
	    groupObj = group._getSelf(),
	    subGroups = group.getSubGroups(),
	    subGroupResults = {***REMOVED***,
	    results = {***REMOVED***;

	subGroups.forEach(function (subgroup) {
		subGroupResults[subgroup.getKey()] = self.getGroupResults(subgroup);
	***REMOVED***);

	results = {
		top: groupObj.calcs.top ? groupObj.calcs.top.getData() : {***REMOVED***,
		bottom: groupObj.calcs.bottom ? groupObj.calcs.bottom.getData() : {***REMOVED***,
		groups: subGroupResults
	***REMOVED***;

	return results;
***REMOVED***;

//default calculations
ColumnCalcs.prototype.calculations = {
	"avg": function avg(values, data, calcParams) {
		var output = 0,
		    precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : 2;

		if (values.length) {
			output = values.reduce(function (sum, value) {
				value = Number(value);
				return sum + value;
			***REMOVED***);

			output = output / values.length;

			output = precision !== false ? output.toFixed(precision) : output;
		***REMOVED***

		return parseFloat(output).toString();
	***REMOVED***,
	"max": function max(values, data, calcParams) {
		var output = null,
		    precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : false;

		values.forEach(function (value) {

			value = Number(value);

			if (value > output || output === null) {
				output = value;
			***REMOVED***
		***REMOVED***);

		return output !== null ? precision !== false ? output.toFixed(precision) : output : "";
	***REMOVED***,
	"min": function min(values, data, calcParams) {
		var output = null,
		    precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : false;

		values.forEach(function (value) {

			value = Number(value);

			if (value < output || output === null) {
				output = value;
			***REMOVED***
		***REMOVED***);

		return output !== null ? precision !== false ? output.toFixed(precision) : output : "";
	***REMOVED***,
	"sum": function sum(values, data, calcParams) {
		var output = 0,
		    precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : false;

		if (values.length) {
			values.forEach(function (value) {
				value = Number(value);

				output += !isNaN(value) ? Number(value) : 0;
			***REMOVED***);
		***REMOVED***

		return precision !== false ? output.toFixed(precision) : output;
	***REMOVED***,
	"concat": function concat(values, data, calcParams) {
		var output = 0;

		if (values.length) {
			output = values.reduce(function (sum, value) {
				return String(sum) + String(value);
			***REMOVED***);
		***REMOVED***

		return output;
	***REMOVED***,
	"count": function count(values, data, calcParams) {
		var output = 0;

		if (values.length) {
			values.forEach(function (value) {
				if (value) {
					output++;
				***REMOVED***
			***REMOVED***);
		***REMOVED***

		return output;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.registerModule("columnCalcs", ColumnCalcs);