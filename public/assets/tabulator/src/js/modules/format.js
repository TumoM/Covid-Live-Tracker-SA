var Format = function(table){
	this.table = table; //hold Tabulator object
***REMOVED***;

//initialize column formatter
Format.prototype.initializeColumn = function(column){
	column.modules.format = this.lookupFormatter(column, "");

	if(typeof column.definition.formatterPrint !== "undefined"){
		column.modules.format.print = this.lookupFormatter(column, "Print");
	***REMOVED***

	if(typeof column.definition.formatterClipboard !== "undefined"){
		column.modules.format.clipboard = this.lookupFormatter(column, "Clipboard");
	***REMOVED***

	if(typeof column.definition.formatterHtmlOutput !== "undefined"){
		column.modules.format.htmlOutput = this.lookupFormatter(column, "HtmlOutput");
	***REMOVED***
***REMOVED***;


Format.prototype.lookupFormatter = function(column, type){
	var config = {params:column.definition["formatter" + type + "Params"] || {***REMOVED******REMOVED***,
	formatter = column.definition["formatter" + type];

	//set column formatter
	switch(typeof formatter){
		case "string":

		if(formatter === "tick"){
			formatter = "tickCross";

			if(typeof config.params.crossElement == "undefined"){
				config.params.crossElement = false;
			***REMOVED***

			console.warn("DEPRECATION WARNING - the tick formatter has been deprecated, please use the tickCross formatter with the crossElement param set to false");
		***REMOVED***

		if(this.formatters[formatter]){
			config.formatter = this.formatters[formatter];
		***REMOVED***else{
			console.warn("Formatter Error - No such formatter found: ", formatter);
			config.formatter = this.formatters.plaintext;
		***REMOVED***
		break;

		case "function":
		config.formatter = formatter;
		break;

		default:
		config.formatter = this.formatters.plaintext;
		break;
	***REMOVED***

	return config;
***REMOVED***;

Format.prototype.cellRendered = function(cell){
	if(cell.modules.format && cell.modules.format.renderedCallback){
		cell.modules.format.renderedCallback();
	***REMOVED***
***REMOVED***;

//return a formatted value for a cell
Format.prototype.formatValue = function(cell){
	var component = cell.getComponent(),
	params = typeof cell.column.modules.format.params === "function" ? cell.column.modules.format.params(component) : cell.column.modules.format.params;

	function onRendered(callback){
		if(!cell.modules.format){
			cell.modules.format = {***REMOVED***;
		***REMOVED***

		cell.modules.format.renderedCallback = callback;
	***REMOVED***

	return cell.column.modules.format.formatter.call(this, component, params, onRendered);
***REMOVED***;


Format.prototype.formatExportValue = function(cell, type){
	var formatter = cell.column.modules.format[type],
	params;

	if(formatter){
		params = typeof formatter.params === "function" ? formatter.params(component) : formatter.params;

		function onRendered(callback){
			if(!cell.modules.format){
				cell.modules.format = {***REMOVED***;
			***REMOVED***

			cell.modules.format.renderedCallback = callback;
		***REMOVED***

		return formatter.formatter.call(this, cell.getComponent(), params, onRendered);

	***REMOVED***else{
		return this.formatValue(cell);
	***REMOVED***
***REMOVED***;

Format.prototype.sanitizeHTML = function(value){
	if(value){
		var entityMap = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
			'/': '&#x2F;',
			'`': '&#x60;',
			'=': '&#x3D;'
		***REMOVED***;

		return String(value).replace(/[&<>"'`=\/]/g, function (s) {
			return entityMap[s];
		***REMOVED***);
	***REMOVED***else{
		return value;
	***REMOVED***
***REMOVED***;

Format.prototype.emptyToSpace = function(value){
	return value === null || typeof value === "undefined" ? "&nbsp;" : value;
***REMOVED***;

//get formatter for cell
Format.prototype.getFormatter = function(formatter){
	var formatter;

	switch(typeof formatter){
		case "string":
		if(this.formatters[formatter]){
			formatter = this.formatters[formatter]
		***REMOVED***else{
			console.warn("Formatter Error - No such formatter found: ", formatter);
			formatter = this.formatters.plaintext;
		***REMOVED***
		break;

		case "function":
		formatter = formatter;
		break;

		default:
		formatter = this.formatters.plaintext;
		break;
	***REMOVED***

	return formatter;

***REMOVED***;

//default data formatters
Format.prototype.formatters = {
	//plain text value
	plaintext:function(cell, formatterParams, onRendered){
		return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
	***REMOVED***,

	//html text value
	html:function(cell, formatterParams, onRendered){
		return cell.getValue();
	***REMOVED***,

	//multiline text area
	textarea:function(cell, formatterParams, onRendered){
		cell.getElement().style.whiteSpace = "pre-wrap";
		return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
	***REMOVED***,

	//currency formatting
	money:function(cell, formatterParams, onRendered){
		var floatVal = parseFloat(cell.getValue()),
		number, integer, decimal, rgx;

		var decimalSym = formatterParams.decimal || ".";
		var thousandSym = formatterParams.thousand || ",";
		var symbol = formatterParams.symbol || "";
		var after = !!formatterParams.symbolAfter;
		var precision = typeof formatterParams.precision !== "undefined" ? formatterParams.precision : 2;

		if(isNaN(floatVal)){
			return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
		***REMOVED***

		number = precision !== false ? floatVal.toFixed(precision) : floatVal;
		number = String(number).split(".");

		integer = number[0];
		decimal = number.length > 1 ? decimalSym + number[1] : "";

		rgx = /(\d+)(\d{3***REMOVED***)/;

		while (rgx.test(integer)){
			integer = integer.replace(rgx, "$1" + thousandSym + "$2");
		***REMOVED***

		return after ? integer + decimal + symbol : symbol + integer + decimal;
	***REMOVED***,

	//clickable anchor tag
	link:function(cell, formatterParams, onRendered){
		var value = cell.getValue(),
		urlPrefix = formatterParams.urlPrefix || "",
		download = formatterParams.download,
		label = value,
		el = document.createElement("a"),
		data;

		if(formatterParams.labelField){
			data = cell.getData();
			label = data[formatterParams.labelField];
		***REMOVED***

		if(formatterParams.label){
			switch(typeof formatterParams.label){
				case "string":
				label = formatterParams.label;
				break;

				case "function":
				label = formatterParams.label(cell);
				break;
			***REMOVED***
		***REMOVED***

		if(label){
			if(formatterParams.urlField){
				data = cell.getData();
				value = data[formatterParams.urlField];
			***REMOVED***

			if(formatterParams.url){
				switch(typeof formatterParams.url){
					case "string":
					value = formatterParams.url;
					break;

					case "function":
					value = formatterParams.url(cell);
					break;
				***REMOVED***
			***REMOVED***

			el.setAttribute("href", urlPrefix + value);

			if(formatterParams.target){
				el.setAttribute("target", formatterParams.target);
			***REMOVED***

			if(formatterParams.download){

				if(typeof download == "function"){
					download = download(cell);
				***REMOVED***else{
					download = download === true ? "" : download;
				***REMOVED***

				el.setAttribute("download", download);
			***REMOVED***

			el.innerHTML = this.emptyToSpace(this.sanitizeHTML(label));

			return el;
		***REMOVED***else{
			return "&nbsp;";
		***REMOVED***
	***REMOVED***,

	//image element
	image:function(cell, formatterParams, onRendered){
		var el = document.createElement("img");
		el.setAttribute("src", cell.getValue());

		switch(typeof formatterParams.height){
			case "number":
			el.style.height = formatterParams.height + "px";
			break;

			case "string":
			el.style.height = formatterParams.height;
			break;
		***REMOVED***

		switch(typeof formatterParams.width){
			case "number":
			el.style.width = formatterParams.width + "px";
			break;

			case "string":
			el.style.width = formatterParams.width;
			break;
		***REMOVED***

		el.addEventListener("load", function(){
			cell.getRow().normalizeHeight();
		***REMOVED***);

		return el;
	***REMOVED***,

	//tick or cross
	tickCross:function(cell, formatterParams, onRendered){
		var value = cell.getValue(),
		element = cell.getElement(),
		empty = formatterParams.allowEmpty,
		truthy = formatterParams.allowTruthy,
		tick = typeof formatterParams.tickElement !== "undefined" ? formatterParams.tickElement : '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>',
		cross = typeof formatterParams.crossElement !== "undefined" ? formatterParams.crossElement : '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';

		if((truthy && value) || (value === true || value === "true" || value === "True" || value === 1 || value === "1")){
			element.setAttribute("aria-checked", true);
			return tick || "";
		***REMOVED***else{
			if(empty && (value === "null" || value === "" || value === null || typeof value === "undefined")){
				element.setAttribute("aria-checked", "mixed");
				return "";
			***REMOVED***else{
				element.setAttribute("aria-checked", false);
				return cross || "";
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	datetime:function(cell, formatterParams, onRendered){
		var inputFormat = formatterParams.inputFormat || "YYYY-MM-DD hh:mm:ss";
		var	outputFormat = formatterParams.outputFormat || "DD/MM/YYYY hh:mm:ss";
		var	invalid = typeof formatterParams.invalidPlaceholder !== "undefined" ? formatterParams.invalidPlaceholder : "";
		var value = cell.getValue();

		var newDatetime = moment(value, inputFormat);

		if(newDatetime.isValid()){
			return newDatetime.format(outputFormat);
		***REMOVED***else{

			if(invalid === true){
				return value;
			***REMOVED***else if(typeof invalid === "function"){
				return invalid(value);
			***REMOVED***else{
				return invalid;
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	datetimediff: function datetime(cell, formatterParams, onRendered) {
		var inputFormat = formatterParams.inputFormat || "YYYY-MM-DD hh:mm:ss";
		var invalid = typeof formatterParams.invalidPlaceholder !== "undefined" ? formatterParams.invalidPlaceholder : "";
		var suffix = typeof formatterParams.suffix !== "undefined" ? formatterParams.suffix : false;
		var unit = typeof formatterParams.unit !== "undefined" ? formatterParams.unit : undefined;
		var humanize = typeof formatterParams.humanize !== "undefined" ? formatterParams.humanize : false;
		var date = typeof formatterParams.date !== "undefined" ? formatterParams.date : moment();
		var value = cell.getValue();

		var newDatetime = moment(value, inputFormat);

		if (newDatetime.isValid()) {
			if(humanize){
				return moment.duration(newDatetime.diff(date)).humanize(suffix);
			***REMOVED***else{
				return newDatetime.diff(date, unit) + (suffix ? " " + suffix : "");
			***REMOVED***

		***REMOVED*** else {

			if (invalid === true) {
				return value;
			***REMOVED*** else if (typeof invalid === "function") {
				return invalid(value);
			***REMOVED*** else {
				return invalid;
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	//select
	lookup: function (cell, formatterParams, onRendered) {
		var value = cell.getValue();

		if (typeof formatterParams[value] === "undefined") {
			console.warn('Missing display value for ' + value);
			return value;
		***REMOVED***

		return formatterParams[value];
	***REMOVED***,

	//star rating
	star:function(cell, formatterParams, onRendered){
		var value = cell.getValue(),
		element = cell.getElement(),
		maxStars = formatterParams && formatterParams.stars ? formatterParams.stars : 5,
		stars = document.createElement("span"),
		star = document.createElementNS('http://www.w3.org/2000/svg', "svg"),
		starActive = '<polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>',
		starInactive = '<polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';

		//style stars holder
		stars.style.verticalAlign = "middle";

		//style star
		star.setAttribute("width", "14");
		star.setAttribute("height", "14");
		star.setAttribute("viewBox", "0 0 512 512");
		star.setAttribute("xml:space", "preserve");
		star.style.padding = "0 1px";

		value = value && !isNaN(value) ? parseInt(value) : 0;

		value = Math.max(0, Math.min(value, maxStars));

		for(var i=1;i<= maxStars;i++){
			var nextStar = star.cloneNode(true);
			nextStar.innerHTML = i <= value ? starActive : starInactive;

			stars.appendChild(nextStar);
		***REMOVED***

		element.style.whiteSpace = "nowrap";
		element.style.overflow = "hidden";
		element.style.textOverflow = "ellipsis";

		element.setAttribute("aria-label", value);

		return stars;
	***REMOVED***,

	traffic:function(cell, formatterParams, onRendered){
		var value = this.sanitizeHTML(cell.getValue()) || 0,
		el = document.createElement("span"),
		max = formatterParams && formatterParams.max ? formatterParams.max : 100,
		min = formatterParams && formatterParams.min ? formatterParams.min : 0,
		colors = formatterParams && typeof formatterParams.color !== "undefined" ? formatterParams.color : ["red", "orange", "green"],
		color = "#666666",
		percent, percentValue;

		if(isNaN(value) || typeof cell.getValue() === "undefined"){
			return;
		***REMOVED***

		el.classList.add("tabulator-traffic-light");

		//make sure value is in range
		percentValue = parseFloat(value) <= max ? parseFloat(value) : max;
		percentValue = parseFloat(percentValue) >= min ? parseFloat(percentValue) : min;

		//workout percentage
		percent = (max - min) / 100;
		percentValue = Math.round((percentValue - min) / percent);

		//set color
		switch(typeof colors){
			case "string":
			color = colors;
			break;
			case "function":
			color = colors(value);
			break;
			case "object":
			if(Array.isArray(colors)){
				var unit = 100 / colors.length;
				var index = Math.floor(percentValue / unit);

				index = Math.min(index, colors.length - 1);
				index = Math.max(index, 0);
				color = colors[index];
				break;
			***REMOVED***
		***REMOVED***

		el.style.backgroundColor = color;

		return el;
	***REMOVED***,

	//progress bar
	progress:function(cell, formatterParams, onRendered){ //progress bar
		var value = this.sanitizeHTML(cell.getValue()) || 0,
		element = cell.getElement(),
		max = formatterParams && formatterParams.max ? formatterParams.max : 100,
		min = formatterParams && formatterParams.min ? formatterParams.min : 0,
		legendAlign = formatterParams && formatterParams.legendAlign ? formatterParams.legendAlign : "center",
		percent, percentValue, color, legend, legendColor, top, left, right, bottom;

		//make sure value is in range
		percentValue = parseFloat(value) <= max ? parseFloat(value) : max;
		percentValue = parseFloat(percentValue) >= min ? parseFloat(percentValue) : min;

		//workout percentage
		percent = (max - min) / 100;
		percentValue = Math.round((percentValue - min) / percent);

		//set bar color
		switch(typeof formatterParams.color){
			case "string":
			color = formatterParams.color;
			break;
			case "function":
			color = formatterParams.color(value);
			break;
			case "object":
			if(Array.isArray(formatterParams.color)){
				var unit = 100 / formatterParams.color.length;
				var index = Math.floor(percentValue / unit);

				index = Math.min(index, formatterParams.color.length - 1);
				index = Math.max(index, 0);
				color = formatterParams.color[index];
				break;
			***REMOVED***
			default:
			color = "#2DC214";
		***REMOVED***

		//generate legend
		switch(typeof formatterParams.legend){
			case "string":
			legend = formatterParams.legend;
			break;
			case "function":
			legend = formatterParams.legend(value);
			break;
			case "boolean":
			legend = value;
			break;
			default:
			legend = false;
		***REMOVED***

		//set legend color
		switch(typeof formatterParams.legendColor){
			case "string":
			legendColor = formatterParams.legendColor;
			break;
			case "function":
			legendColor = formatterParams.legendColor(value);
			break;
			case "object":
			if(Array.isArray(formatterParams.legendColor)){
				var unit = 100 / formatterParams.legendColor.length;
				var index = Math.floor(percentValue / unit);

				index = Math.min(index, formatterParams.legendColor.length - 1);
				index = Math.max(index, 0);
				legendColor = formatterParams.legendColor[index];
			***REMOVED***
			break;
			default:
			legendColor = "#000";
		***REMOVED***

		element.style.minWidth = "30px";
		element.style.position = "relative";

		element.setAttribute("aria-label", percentValue);

		var barEl = document.createElement("div");
		barEl.style.display = "inline-block";
		barEl.style.position = "relative";
		barEl.style.width = percentValue + "%";
		barEl.style.backgroundColor = color;
		barEl.style.height = "100%";

		barEl.setAttribute('data-max', max);
		barEl.setAttribute('data-min', min);


		if(legend){
			var legendEl = document.createElement("div");
			legendEl.style.position = "absolute";
			legendEl.style.top = "4px";
			legendEl.style.left = 0;
			legendEl.style.textAlign = legendAlign;
			legendEl.style.width = "100%";
			legendEl.style.color = legendColor;
			legendEl.innerHTML = legend;
		***REMOVED***

		onRendered(function(){

			//handle custom element needed if formatter is to be included in printed/downloaded output
			if(!(cell instanceof CellComponent)){
				var holderEl = document.createElement("div");
				holderEl.style.position = "absolute";
				holderEl.style.top = "4px";
				holderEl.style.bottom = "4px";
				holderEl.style.left = "4px";
				holderEl.style.right = "4px";

				element.appendChild(holderEl);

				element = holderEl;
			***REMOVED***

			element.appendChild(barEl);

			if(legend){
				element.appendChild(legendEl);
			***REMOVED***
		***REMOVED***);

		return "";
	***REMOVED***,

	//background color
	color:function(cell, formatterParams, onRendered){
		cell.getElement().style.backgroundColor = this.sanitizeHTML(cell.getValue());
		return "";
	***REMOVED***,

	//tick icon
	buttonTick:function(cell, formatterParams, onRendered){
		return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
	***REMOVED***,

	//cross icon
	buttonCross:function(cell, formatterParams, onRendered){
		return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';
	***REMOVED***,

	//current row number
	rownum:function(cell, formatterParams, onRendered){
		return this.table.rowManager.activeRows.indexOf(cell.getRow()._getSelf()) + 1;
	***REMOVED***,

	//row handle
	handle:function(cell, formatterParams, onRendered){
		cell.getElement().classList.add("tabulator-row-handle");
		return "<div class='tabulator-row-handle-box'><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div></div>";
	***REMOVED***,

	responsiveCollapse:function(cell, formatterParams, onRendered){
		var self = this,
		open = false,
		el = document.createElement("div"),
		config = cell.getRow()._row.modules.responsiveLayout;

		el.classList.add("tabulator-responsive-collapse-toggle");
		el.innerHTML = "<span class='tabulator-responsive-collapse-toggle-open'>+</span><span class='tabulator-responsive-collapse-toggle-close'>-</span>";

		cell.getElement().classList.add("tabulator-row-handle");

		function toggleList(isOpen){
			var collapseEl = config.element;

			config.open = isOpen;

			if(collapseEl){

				if(config.open){
					el.classList.add("open");
					collapseEl.style.display = '';
				***REMOVED***else{
					el.classList.remove("open");
					collapseEl.style.display = 'none';
				***REMOVED***
			***REMOVED***
		***REMOVED***

		el.addEventListener("click", function(e){
			e.stopImmediatePropagation();
			toggleList(!config.open);
		***REMOVED***);

		toggleList(config.open);

		return el;
	***REMOVED***,

	rowSelection:function(cell){
		var checkbox = document.createElement("input");

		checkbox.type = 'checkbox';

		if(this.table.modExists("selectRow", true)){

			checkbox.addEventListener("click", (e) => {
				e.stopPropagation();
			***REMOVED***);

			if(typeof cell.getRow == 'function'){
				var row = cell.getRow();

				checkbox.addEventListener("change", (e) => {
					row.toggleSelect();
				***REMOVED***);

				checkbox.checked = row.isSelected();
				this.table.modules.selectRow.registerRowSelectCheckbox(row, checkbox);
			***REMOVED***else {
				checkbox.addEventListener("change", (e) => {
					if(this.table.modules.selectRow.selectedRows.length){
						this.table.deselectRow();
					***REMOVED***else {
						this.table.selectRow();
					***REMOVED***
				***REMOVED***);

				this.table.modules.selectRow.registerHeaderSelectCheckbox(checkbox);
			***REMOVED***
		***REMOVED***
		return checkbox;
	***REMOVED***,
***REMOVED***;

Tabulator.prototype.registerModule("format", Format);