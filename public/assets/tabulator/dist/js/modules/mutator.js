var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; ***REMOVED*** : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; ***REMOVED***;

/* Tabulator v4.6.2 (c) Oliver Folkerd***REMOVED***/

var Mutator = function Mutator(table) {
	this.table = table; //hold Tabulator object
	this.allowedTypes = ["", "data", "edit", "clipboard"]; //list of muatation types
	this.enabled = true;
***REMOVED***;

//initialize column mutator
Mutator.prototype.initializeColumn = function (column) {
	var self = this,
	    match = false,
	    config = {***REMOVED***;

	this.allowedTypes.forEach(function (type) {
		var key = "mutator" + (type.charAt(0).toUpperCase() + type.slice(1)),
		    mutator;

		if (column.definition[key]) {
			mutator = self.lookupMutator(column.definition[key]);

			if (mutator) {
				match = true;

				config[key] = {
					mutator: mutator,
					params: column.definition[key + "Params"] || {***REMOVED***
				***REMOVED***;
			***REMOVED***
		***REMOVED***
	***REMOVED***);

	if (match) {
		column.modules.mutate = config;
	***REMOVED***
***REMOVED***;

Mutator.prototype.lookupMutator = function (value) {
	var mutator = false;

	//set column mutator
	switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
		case "string":
			if (this.mutators[value]) {
				mutator = this.mutators[value];
			***REMOVED*** else {
				console.warn("Mutator Error - No such mutator found, ignoring: ", value);
			***REMOVED***
			break;

		case "function":
			mutator = value;
			break;
	***REMOVED***

	return mutator;
***REMOVED***;

//apply mutator to row
Mutator.prototype.transformRow = function (data, type, updatedData) {
	var self = this,
	    key = "mutator" + (type.charAt(0).toUpperCase() + type.slice(1)),
	    value;

	if (this.enabled) {

		self.table.columnManager.traverse(function (column) {
			var mutator, params, component;

			if (column.modules.mutate) {
				mutator = column.modules.mutate[key] || column.modules.mutate.mutator || false;

				if (mutator) {
					value = column.getFieldValue(typeof updatedData !== "undefined" ? updatedData : data);

					if (type == "data" || typeof value !== "undefined") {
						component = column.getComponent();
						params = typeof mutator.params === "function" ? mutator.params(value, data, type, component) : mutator.params;
						column.setFieldValue(data, mutator.mutator(value, data, type, params, component));
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	return data;
***REMOVED***;

//apply mutator to new cell value
Mutator.prototype.transformCell = function (cell, value) {
	var mutator = cell.column.modules.mutate.mutatorEdit || cell.column.modules.mutate.mutator || false,
	    tempData = {***REMOVED***;

	if (mutator) {
		tempData = Object.assign(tempData, cell.row.getData());
		cell.column.setFieldValue(tempData, value);
		return mutator.mutator(value, tempData, "edit", mutator.params, cell.getComponent());
	***REMOVED*** else {
		return value;
	***REMOVED***
***REMOVED***;

Mutator.prototype.enable = function () {
	this.enabled = true;
***REMOVED***;

Mutator.prototype.disable = function () {
	this.enabled = false;
***REMOVED***;

//default mutators
Mutator.prototype.mutators = {***REMOVED***;

Tabulator.prototype.registerModule("mutator", Mutator);