var Sort = function(table){
 	this.table = table; //hold Tabulator object
 	this.sortList = []; //holder current sort
 	this.changed = false; //has the sort changed since last render
 ***REMOVED***;

//initialize column header for sorting
Sort.prototype.initializeColumn = function(column, content){
	var self = this,
	sorter = false,
	colEl,
	arrowEl;


	switch(typeof column.definition.sorter){
		case "string":
		if(self.sorters[column.definition.sorter]){
			sorter = self.sorters[column.definition.sorter];
		***REMOVED***else{
			console.warn("Sort Error - No such sorter found: ", column.definition.sorter);
		***REMOVED***
		break;

		case "function":
		sorter = column.definition.sorter;
		break;
	***REMOVED***

	column.modules.sort = {
		sorter:sorter, dir:"none",
		params:column.definition.sorterParams || {***REMOVED***,
		startingDir:column.definition.headerSortStartingDir || "asc",
		tristate: typeof column.definition.headerSortTristate !== "undefined" ? column.definition.headerSortTristate : this.table.options.headerSortTristate,
	***REMOVED***;

	if(typeof column.definition.headerSort === "undefined" ? (this.table.options.headerSort !== false) : column.definition.headerSort !== false){

		colEl = column.getElement();

		colEl.classList.add("tabulator-sortable");


		arrowEl = document.createElement("div");
		arrowEl.classList.add("tabulator-arrow");
		//create sorter arrow
		content.appendChild(arrowEl);

		//sort on click
		colEl.addEventListener("click", function(e){
			var dir = "",
			sorters=[],
			match = false;

			if(column.modules.sort){
				if(column.modules.sort.tristate){
					if(column.modules.sort.dir == "none"){
						dir = column.modules.sort.startingDir;
					***REMOVED***else{
						if(column.modules.sort.dir == column.modules.sort.startingDir){
							dir = column.modules.sort.dir == "asc" ? "desc" : "asc";
						***REMOVED***else{
							dir = "none";
						***REMOVED***
					***REMOVED***
				***REMOVED***else{
					switch(column.modules.sort.dir){
						case "asc":
						dir = "desc";
						break;

						case "desc":
						dir = "asc";
						break;

						default:
						dir = column.modules.sort.startingDir;
					***REMOVED***
				***REMOVED***


				if (self.table.options.columnHeaderSortMulti && (e.shiftKey || e.ctrlKey)) {
					sorters = self.getSort();

					match = sorters.findIndex(function(sorter){
						return sorter.field === column.getField();
					***REMOVED***);

					if(match > -1){
						sorters[match].dir = dir;

						if(match != sorters.length -1){
							match = sorters.splice(match, 1)[0];
							if(dir != "none"){
								sorters.push(match);
							***REMOVED***
						***REMOVED***
					***REMOVED***else{
						if(dir != "none"){
							sorters.push({column:column, dir:dir***REMOVED***);
						***REMOVED***
					***REMOVED***

					//add to existing sort
					self.setSort(sorters);
				***REMOVED***else{
					if(dir == "none"){
						self.clear();
					***REMOVED***else{
						//sort by column only
						self.setSort(column, dir);
					***REMOVED***

				***REMOVED***

				self.table.rowManager.sorterRefresh(!self.sortList.length);
			***REMOVED***
		***REMOVED***);
	***REMOVED***
***REMOVED***;

//check if the sorters have changed since last use
Sort.prototype.hasChanged = function(){
	var changed = this.changed;
	this.changed = false;
	return changed;
***REMOVED***;

//return current sorters
Sort.prototype.getSort = function(){
	var self = this,
	sorters = [];

	self.sortList.forEach(function(item){
		if(item.column){
			sorters.push({column:item.column.getComponent(), field:item.column.getField(), dir:item.dir***REMOVED***);
		***REMOVED***
	***REMOVED***);

	return sorters;
***REMOVED***;

//change sort list and trigger sort
Sort.prototype.setSort = function(sortList, dir){
	var self = this,
	newSortList = [];

	if(!Array.isArray(sortList)){
		sortList = [{column: sortList, dir:dir***REMOVED***];
	***REMOVED***

	sortList.forEach(function(item){
		var column;

		column = self.table.columnManager.findColumn(item.column);

		if(column){
			item.column = column;
			newSortList.push(item);
			self.changed = true;
		***REMOVED***else{
			console.warn("Sort Warning - Sort field does not exist and is being ignored: ", item.column);
		***REMOVED***

	***REMOVED***);

	self.sortList = newSortList;

	if(this.table.options.persistence && this.table.modExists("persistence", true) && this.table.modules.persistence.config.sort){
		this.table.modules.persistence.save("sort");
	***REMOVED***
***REMOVED***;

//clear sorters
Sort.prototype.clear = function(){
	this.setSort([]);
***REMOVED***;

//find appropriate sorter for column
Sort.prototype.findSorter = function(column){
	var row = this.table.rowManager.activeRows[0],
	sorter = "string",
	field, value;

	if(row){
		row = row.getData();
		field = column.getField();

		if(field){

			value = column.getFieldValue(row);

			switch(typeof value){
				case "undefined":
				sorter = "string";
				break;

				case "boolean":
				sorter = "boolean";
				break;

				default:
				if(!isNaN(value) && value !== ""){
					sorter = "number";
				***REMOVED***else{
					if(value.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i)){
						sorter = "alphanum";
					***REMOVED***
				***REMOVED***
				break;
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return this.sorters[sorter];
***REMOVED***;

//work through sort list sorting data
Sort.prototype.sort = function(data){
	var self = this,
	sortList = this.table.options.sortOrderReverse ? self.sortList.slice().reverse() : self.sortList,
	sortListActual = [],
	lastSort;

	if(self.table.options.dataSorting){
		self.table.options.dataSorting.call(self.table, self.getSort());
	***REMOVED***

	self.clearColumnHeaders();

	if(!self.table.options.ajaxSorting){

		//build list of valid sorters and trigger column specific callbacks before sort begins
		sortList.forEach(function(item, i){
			var sortObj = item.column.modules.sort;

			if(item.column && sortObj){

				//if no sorter has been defined, take a guess
				if(!sortObj.sorter){
					sortObj.sorter = self.findSorter(item.column);
				***REMOVED***

				item.params = typeof sortObj.params === "function" ? sortObj.params(item.column.getComponent(), item.dir) : sortObj.params;

				sortListActual.push(item);
			***REMOVED***

			self.setColumnHeader(item.column, item.dir);
		***REMOVED***);

		//sort data
		if (sortListActual.length) {
			self._sortItems(data, sortListActual);
		***REMOVED***

	***REMOVED***else{
		sortList.forEach(function(item, i){
			self.setColumnHeader(item.column, item.dir);
		***REMOVED***);
	***REMOVED***

	if(self.table.options.dataSorted){
		self.table.options.dataSorted.call(self.table, self.getSort(), self.table.rowManager.getComponents("active"));
	***REMOVED***

***REMOVED***;

//clear sort arrows on columns
Sort.prototype.clearColumnHeaders = function(){
	this.table.columnManager.getRealColumns().forEach(function(column){
		if(column.modules.sort){
			column.modules.sort.dir = "none";
			column.getElement().setAttribute("aria-sort", "none");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//set the column header sort direction
Sort.prototype.setColumnHeader = function(column, dir){
	column.modules.sort.dir = dir;
	column.getElement().setAttribute("aria-sort", dir);
***REMOVED***;

//sort each item in sort list
Sort.prototype._sortItems = function(data, sortList){
	var sorterCount = sortList.length - 1;

	data.sort((a, b) => {
		var result;

		for(var i = sorterCount; i>= 0; i--){
			let sortItem = sortList[i];

			result = this._sortRow(a, b, sortItem.column, sortItem.dir, sortItem.params);

			if(result !== 0){
				break;
			***REMOVED***
		***REMOVED***

		return result;
	***REMOVED***);
***REMOVED***;

//process individual rows for a sort function on active data
Sort.prototype._sortRow = function(a, b, column, dir, params){
	var el1Comp, el2Comp, colComp;

	//switch elements depending on search direction
	var el1 = dir == "asc" ? a : b;
	var el2 = dir == "asc" ? b : a;

	a = column.getFieldValue(el1.getData());
	b = column.getFieldValue(el2.getData());

	a = typeof a !== "undefined" ? a : "";
	b = typeof b !== "undefined" ? b : "";

	el1Comp = el1.getComponent();
	el2Comp = el2.getComponent();

	return column.modules.sort.sorter.call(this, a, b, el1Comp, el2Comp, column.getComponent(), dir, params);
***REMOVED***;


//default data sorters
Sort.prototype.sorters = {

	//sort numbers
	number:function(a, b, aRow, bRow, column, dir, params){
		var alignEmptyValues = params.alignEmptyValues;
		var decimal = params.decimalSeparator || ".";
		var thousand = params.thousandSeparator || ",";
		var emptyAlign = 0;

		a = parseFloat(String(a).split(thousand).join("").split(decimal).join("."));
		b = parseFloat(String(b).split(thousand).join("").split(decimal).join("."));

		//handle non numeric values
		if(isNaN(a)){
			emptyAlign =  isNaN(b) ? 0 : -1;
		***REMOVED***else if(isNaN(b)){
			emptyAlign =  1;
		***REMOVED***else{
			//compare valid values
			return a - b;
		***REMOVED***

		//fix empty values in position
		if((alignEmptyValues === "top" && dir === "desc") || (alignEmptyValues === "bottom" && dir === "asc")){
			emptyAlign***REMOVED***= -1;
		***REMOVED***

		return emptyAlign;
	***REMOVED***,

	//sort strings
	string:function(a, b, aRow, bRow, column, dir, params){
		var alignEmptyValues = params.alignEmptyValues;
		var emptyAlign = 0;
		var locale;

		//handle empty values
		if(!a){
			emptyAlign =  !b ? 0 : -1;
		***REMOVED***else if(!b){
			emptyAlign =  1;
		***REMOVED***else{
			//compare valid values
			switch(typeof params.locale){
				case "boolean":
				if(params.locale){
					locale = this.table.modules.localize.getLocale();
				***REMOVED***
				break;
				case "string":
				locale = params.locale;
				break;
			***REMOVED***

			return String(a).toLowerCase().localeCompare(String(b).toLowerCase(), locale);
		***REMOVED***

		//fix empty values in position
		if((alignEmptyValues === "top" && dir === "desc") || (alignEmptyValues === "bottom" && dir === "asc")){
			emptyAlign***REMOVED***= -1;
		***REMOVED***

		return emptyAlign;
	***REMOVED***,

	//sort date
	date:function(a, b, aRow, bRow, column, dir, params){
		if(!params.format){
			params.format = "DD/MM/YYYY";
		***REMOVED***

		return this.sorters.datetime.call(this, a, b, aRow, bRow, column, dir, params);
	***REMOVED***,

	//sort hh:mm formatted times
	time:function(a, b, aRow, bRow, column, dir, params){
		if(!params.format){
			params.format = "hh:mm";
		***REMOVED***

		return this.sorters.datetime.call(this, a, b, aRow, bRow, column, dir, params);
	***REMOVED***,

	//sort datetime
	datetime:function(a, b, aRow, bRow, column, dir, params){
		var format = params.format || "DD/MM/YYYY hh:mm:ss",
		alignEmptyValues = params.alignEmptyValues,
		emptyAlign = 0;

		if(typeof moment != "undefined"){
			a = moment(a, format);
			b = moment(b, format);

			if(!a.isValid()){
				emptyAlign = !b.isValid() ? 0 : -1;
			***REMOVED***else if(!b.isValid()){
				emptyAlign =  1;
			***REMOVED***else{
				//compare valid values
				return a - b;
			***REMOVED***

			//fix empty values in position
			if((alignEmptyValues === "top" && dir === "desc") || (alignEmptyValues === "bottom" && dir === "asc")){
				emptyAlign***REMOVED***= -1;
			***REMOVED***

			return emptyAlign;

		***REMOVED***else{
			console.error("Sort Error - 'datetime' sorter is dependant on moment.js");
		***REMOVED***
	***REMOVED***,

	//sort booleans
	boolean:function(a, b, aRow, bRow, column, dir, params){
		var el1 = a === true || a === "true" || a === "True" || a === 1 ? 1 : 0;
		var el2 = b === true || b === "true" || b === "True" || b === 1 ? 1 : 0;

		return el1 - el2;
	***REMOVED***,

	//sort if element contains any data
	array:function(a, b, aRow, bRow, column, dir, params){
		var el1 = 0;
		var el2 = 0;
		var type = params.type || "length";
		var alignEmptyValues = params.alignEmptyValues;
		var emptyAlign = 0;

		function calc(value){

			switch(type){
				case "length":
				return value.length;
				break;

				case "sum":
				return value.reduce(function(c, d){
					return c + d;
				***REMOVED***);
				break;

				case "max":
				return Math.max.apply(null, value) ;
				break;

				case "min":
				return Math.min.apply(null, value) ;
				break;

				case "avg":
				return value.reduce(function(c, d){
					return c + d;
				***REMOVED***) / value.length;
				break;
			***REMOVED***
		***REMOVED***

		//handle non array values
		if(!Array.isArray(a)){
			alignEmptyValues = !Array.isArray(b) ? 0 : -1;
		***REMOVED***else if(!Array.isArray(b)){
			alignEmptyValues = 1;
		***REMOVED***else{

			//compare valid values
			el1 = a ? calc(a) : 0;
			el2 = b ? calc(b) : 0;

			return el1 - el2;
		***REMOVED***

		//fix empty values in position
		if((alignEmptyValues === "top" && dir === "desc") || (alignEmptyValues === "bottom" && dir === "asc")){
			emptyAlign***REMOVED***= -1;
		***REMOVED***

		return emptyAlign;
	***REMOVED***,


	//sort if element contains any data
	exists:function(a, b, aRow, bRow, column, dir, params){
		var el1 = typeof a == "undefined" ? 0 : 1;
		var el2 = typeof b == "undefined" ? 0 : 1;

		return el1 - el2;
	***REMOVED***,

	//sort alpha numeric strings
	alphanum:function(as, bs, aRow, bRow, column, dir, params){
		var a, b, a1, b1, i= 0, L, rx = /(\d+)|(\D+)/g, rd = /\d/;
		var alignEmptyValues = params.alignEmptyValues;
		var emptyAlign = 0;

		//handle empty values
		if(!as && as!== 0){
			emptyAlign =  !bs && bs!== 0 ? 0 : -1;
		***REMOVED***else if(!bs && bs!== 0){
			emptyAlign =  1;
		***REMOVED***else{

			if(isFinite(as) && isFinite(bs)) return as - bs;
			a = String(as).toLowerCase();
			b = String(bs).toLowerCase();
			if(a === b) return 0;
			if(!(rd.test(a) && rd.test(b))) return a > b ? 1 : -1;
			a = a.match(rx);
			b = b.match(rx);
			L = a.length > b.length ? b.length : a.length;
			while(i < L){
				a1= a[i];
				b1= b[i++];
				if(a1 !== b1){
					if(isFinite(a1) && isFinite(b1)){
						if(a1.charAt(0) === "0") a1 = "." + a1;
						if(b1.charAt(0) === "0") b1 = "." + b1;
						return a1 - b1;
					***REMOVED***
					else return a1 > b1 ? 1 : -1;
				***REMOVED***
			***REMOVED***

			return a.length > b.length;
		***REMOVED***

		//fix empty values in position
		if((alignEmptyValues === "top" && dir === "desc") || (alignEmptyValues === "bottom" && dir === "asc")){
			emptyAlign***REMOVED***= -1;
		***REMOVED***

		return emptyAlign;
	***REMOVED***,
***REMOVED***;

Tabulator.prototype.registerModule("sort", Sort);
