/* Tabulator v4.6.2 (c) Oliver Folkerd***REMOVED***/

var Persistence = function Persistence(table) {
	this.table = table; //hold Tabulator object
	this.mode = "";
	this.id = "";
	// this.persistProps = ["field", "width", "visible"];
	this.defWatcherBlock = false;
	this.config = {***REMOVED***;
	this.readFunc = false;
	this.writeFunc = false;
***REMOVED***;

// Test for whether localStorage is available for use.
Persistence.prototype.localStorageTest = function () {
	var testKey = "_tabulator_test";

	try {
		window.localStorage.setItem(testKey, testKey);
		window.localStorage.removeItem(testKey);
		return true;
	***REMOVED*** catch (e) {
		return false;
	***REMOVED***
***REMOVED***;

//setup parameters
Persistence.prototype.initialize = function () {
	//determine persistent layout storage type

	var mode = this.table.options.persistenceMode,
	    id = this.table.options.persistenceID,
	    retreivedData;

	this.mode = mode !== true ? mode : this.localStorageTest() ? "local" : "cookie";

	if (this.table.options.persistenceReaderFunc) {
		if (typeof this.table.options.persistenceReaderFunc === "function") {
			this.readFunc = this.table.options.persistenceReaderFunc;
		***REMOVED*** else {
			if (this.readers[this.table.options.persistenceReaderFunc]) {
				this.readFunc = this.readers[this.table.options.persistenceReaderFunc];
			***REMOVED*** else {
				console.warn("Persistence Read Error - invalid reader set", this.table.options.persistenceReaderFunc);
			***REMOVED***
		***REMOVED***
	***REMOVED*** else {
		if (this.readers[this.mode]) {
			this.readFunc = this.readers[this.mode];
		***REMOVED*** else {
			console.warn("Persistence Read Error - invalid reader set", this.mode);
		***REMOVED***
	***REMOVED***

	if (this.table.options.persistenceWriterFunc) {
		if (typeof this.table.options.persistenceWriterFunc === "function") {
			this.writeFunc = this.table.options.persistenceWriterFunc;
		***REMOVED*** else {
			if (this.readers[this.table.options.persistenceWriterFunc]) {
				this.writeFunc = this.readers[this.table.options.persistenceWriterFunc];
			***REMOVED*** else {
				console.warn("Persistence Write Error - invalid reader set", this.table.options.persistenceWriterFunc);
			***REMOVED***
		***REMOVED***
	***REMOVED*** else {
		if (this.writers[this.mode]) {
			this.writeFunc = this.writers[this.mode];
		***REMOVED*** else {
			console.warn("Persistence Write Error - invalid writer set", this.mode);
		***REMOVED***
	***REMOVED***

	//set storage tag
	this.id = "tabulator-" + (id || this.table.element.getAttribute("id") || "");

	this.config = {
		sort: this.table.options.persistence === true || this.table.options.persistence.sort,
		filter: this.table.options.persistence === true || this.table.options.persistence.filter,
		group: this.table.options.persistence === true || this.table.options.persistence.group,
		page: this.table.options.persistence === true || this.table.options.persistence.page,
		columns: this.table.options.persistence === true ? ["title", "width", "visible"] : this.table.options.persistence.columns
	***REMOVED***;

	//load pagination data if needed
	if (this.config.page) {
		retreivedData = this.retreiveData("page");

		if (retreivedData) {
			if (typeof retreivedData.paginationSize !== "undefined" && (this.config.page === true || this.config.page.size)) {
				this.table.options.paginationSize = retreivedData.paginationSize;
			***REMOVED***

			if (typeof retreivedData.paginationInitialPage !== "undefined" && (this.config.page === true || this.config.page.page)) {
				this.table.options.paginationInitialPage = retreivedData.paginationInitialPage;
			***REMOVED***
		***REMOVED***
	***REMOVED***

	//load group data if needed
	if (this.config.group) {
		retreivedData = this.retreiveData("group");

		if (retreivedData) {
			if (typeof retreivedData.groupBy !== "undefined" && (this.config.group === true || this.config.group.groupBy)) {
				this.table.options.groupBy = retreivedData.groupBy;
			***REMOVED***
			if (typeof retreivedData.groupStartOpen !== "undefined" && (this.config.group === true || this.config.group.groupStartOpen)) {
				this.table.options.groupStartOpen = retreivedData.groupStartOpen;
			***REMOVED***
			if (typeof retreivedData.groupHeader !== "undefined" && (this.config.group === true || this.config.group.groupHeader)) {
				this.table.options.groupHeader = retreivedData.groupHeader;
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

Persistence.prototype.initializeColumn = function (column) {
	var self = this,
	    def,
	    keys;

	if (this.config.columns) {
		this.defWatcherBlock = true;

		def = column.getDefinition();

		keys = this.config.columns === true ? Object.keys(def) : this.config.columns;

		keys.forEach(function (key) {
			var props = Object.getOwnPropertyDescriptor(def, key);
			var value = def[key];
			if (props) {
				Object.defineProperty(def, key, {
					set: function set(newValue) {
						value = newValue;

						if (!self.defWatcherBlock) {
							self.save("columns");
						***REMOVED***

						if (props.set) {
							props.set(newValue);
						***REMOVED***
					***REMOVED***,
					get: function get() {
						if (props.get) {
							props.get();
						***REMOVED***
						return value;
					***REMOVED***
				***REMOVED***);
			***REMOVED***
		***REMOVED***);

		this.defWatcherBlock = false;
	***REMOVED***
***REMOVED***;

//load saved definitions
Persistence.prototype.load = function (type, current) {
	var data = this.retreiveData(type);

	if (current) {
		data = data ? this.mergeDefinition(current, data) : current;
	***REMOVED***

	return data;
***REMOVED***;

//retreive data from memory
Persistence.prototype.retreiveData = function (type) {
	return this.readFunc ? this.readFunc(this.id, type) : false;
***REMOVED***;

//merge old and new column definitions
Persistence.prototype.mergeDefinition = function (oldCols, newCols) {
	var self = this,
	    output = [];

	// oldCols = oldCols || [];
	newCols = newCols || [];

	newCols.forEach(function (column, to) {

		var from = self._findColumn(oldCols, column),
		    keys;

		if (from) {

			if (self.config.columns === true || self.config.columns == undefined) {
				keys = Object.keys(from);
				keys.push("width");
			***REMOVED*** else {
				keys = self.config.columns;
			***REMOVED***

			keys.forEach(function (key) {
				if (typeof column[key] !== "undefined") {
					from[key] = column[key];
				***REMOVED***
			***REMOVED***);

			if (from.columns) {
				from.columns = self.mergeDefinition(from.columns, column.columns);
			***REMOVED***

			output.push(from);
		***REMOVED***
	***REMOVED***);

	oldCols.forEach(function (column, i) {
		var from = self._findColumn(newCols, column);
		if (!from) {
			if (output.length > i) {
				output.splice(i, 0, column);
			***REMOVED*** else {
				output.push(column);
			***REMOVED***
		***REMOVED***
	***REMOVED***);

	return output;
***REMOVED***;

//find matching columns
Persistence.prototype._findColumn = function (columns, subject) {
	var type = subject.columns ? "group" : subject.field ? "field" : "object";

	return columns.find(function (col) {
		switch (type) {
			case "group":
				return col.title === subject.title && col.columns.length === subject.columns.length;
				break;

			case "field":
				return col.field === subject.field;
				break;

			case "object":
				return col === subject;
				break;
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//save data
Persistence.prototype.save = function (type) {
	var data = {***REMOVED***;

	switch (type) {
		case "columns":
			data = this.parseColumns(this.table.columnManager.getColumns());
			break;

		case "filter":
			data = this.table.modules.filter.getFilters();
			break;

		case "sort":
			data = this.validateSorters(this.table.modules.sort.getSort());
			break;

		case "group":
			data = this.getGroupConfig();
			break;

		case "page":
			data = this.getPageConfig();
			break;
	***REMOVED***

	if (this.writeFunc) {
		this.writeFunc(this.id, type, data);
	***REMOVED***
***REMOVED***;

//ensure sorters contain no function data
Persistence.prototype.validateSorters = function (data) {
	data.forEach(function (item) {
		item.column = item.field;
		delete item.field;
	***REMOVED***);

	return data;
***REMOVED***;

Persistence.prototype.getGroupConfig = function () {
	if (this.config.group) {
		if (this.config.group === true || this.config.group.groupBy) {
			data.groupBy = this.table.options.groupBy;
		***REMOVED***

		if (this.config.group === true || this.config.group.groupStartOpen) {
			data.groupStartOpen = this.table.options.groupStartOpen;
		***REMOVED***

		if (this.config.group === true || this.config.group.groupHeader) {
			data.groupHeader = this.table.options.groupHeader;
		***REMOVED***
	***REMOVED***

	return data;
***REMOVED***;

Persistence.prototype.getPageConfig = function () {
	var data = {***REMOVED***;

	if (this.config.page) {
		if (this.config.page === true || this.config.page.size) {
			data.paginationSize = this.table.modules.page.getPageSize();
		***REMOVED***

		if (this.config.page === true || this.config.page.page) {
			data.paginationInitialPage = this.table.modules.page.getPage();
		***REMOVED***
	***REMOVED***

	return data;
***REMOVED***;

//parse columns for data to store
Persistence.prototype.parseColumns = function (columns) {
	var self = this,
	    definitions = [];

	columns.forEach(function (column) {
		var defStore = {***REMOVED***,
		    colDef = column.getDefinition(),
		    keys;

		if (column.isGroup) {
			defStore.title = colDef.title;
			defStore.columns = self.parseColumns(column.getColumns());
		***REMOVED*** else {
			defStore.field = column.getField();

			if (self.config.columns === true || self.config.columns == undefined) {
				keys = Object.keys(colDef);
				keys.push("width");
			***REMOVED*** else {
				keys = self.config.columns;
			***REMOVED***

			keys.forEach(function (key) {

				switch (key) {
					case "width":
						defStore.width = column.getWidth();
						break;
					case "visible":
						defStore.visible = column.visible;
						break;

					default:
						defStore[key] = colDef[key];
				***REMOVED***
			***REMOVED***);
		***REMOVED***

		definitions.push(defStore);
	***REMOVED***);

	return definitions;
***REMOVED***;

// read peristence information from storage
Persistence.prototype.readers = {
	local: function local(id, type) {
		var data = localStorage.getItem(id + "-" + type);

		return data ? JSON.parse(data) : false;
	***REMOVED***,
	cookie: function cookie(id, type) {
		var cookie = document.cookie,
		    key = id + "-" + type,
		    cookiePos = cookie.indexOf(key + "="),
		    end,
		    data;

		//if cookie exists, decode and load column data into tabulator
		if (cookiePos > -1) {
			cookie = cookie.substr(cookiePos);

			end = cookie.indexOf(";");

			if (end > -1) {
				cookie = cookie.substr(0, end);
			***REMOVED***

			data = cookie.replace(key + "=", "");
		***REMOVED***

		return data ? JSON.parse(data) : false;
	***REMOVED***
***REMOVED***;

//write persistence information to storage
Persistence.prototype.writers = {
	local: function local(id, type, data) {
		localStorage.setItem(id + "-" + type, JSON.stringify(data));
	***REMOVED***,
	cookie: function cookie(id, type, data) {
		var expireDate = new Date();

		expireDate.setDate(expireDate.getDate() + 10000);

		document.cookie = id + "-" + type + "=" + JSON.stringify(data) + "; expires=" + expireDate.toUTCString();
	***REMOVED***
***REMOVED***;

Tabulator.prototype.registerModule("persistence", Persistence);