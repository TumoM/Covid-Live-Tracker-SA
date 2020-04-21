var Download = function(table){
	this.table = table; //hold Tabulator object
	this.fields = {***REMOVED***; //hold filed multi dimension arrays
	this.columnsByIndex = []; //hold columns in their order in the table
	this.columnsByField = {***REMOVED***; //hold columns with lookup by field name
	this.config = {***REMOVED***;
	this.active = false;
***REMOVED***;

//trigger file download
Download.prototype.download = function(type, filename, options, active, interceptCallback){
	var self = this,
	downloadFunc = false;
	this.processConfig();
	this.active = active;

	function buildLink(data, mime){
		if(interceptCallback){
			if(interceptCallback === true){
				self.triggerDownload(data, mime, type, filename, true);
			***REMOVED***else{
				interceptCallback(data);
			***REMOVED***

		***REMOVED***else{
			self.triggerDownload(data, mime, type, filename);
		***REMOVED***
	***REMOVED***

	if(typeof type == "function"){
		downloadFunc = type;
	***REMOVED***else{
		if(self.downloaders[type]){
			downloadFunc = self.downloaders[type];
		***REMOVED***else{
			console.warn("Download Error - No such download type found: ", type);
		***REMOVED***
	***REMOVED***

	this.processColumns();

	if(downloadFunc){
		downloadFunc.call(this, self.processDefinitions(), self.processData(active || "active") , options || {***REMOVED***, buildLink, this.config);
	***REMOVED***
***REMOVED***;

Download.prototype.processConfig = function(){
	var config = {	//download config
		columnGroups:true,
		rowGroups:true,
		columnCalcs:true,
		dataTree:true,
	***REMOVED***;

	if(this.table.options.downloadConfig){
		for(var key in this.table.options.downloadConfig){
			config[key] = this.table.options.downloadConfig[key];
		***REMOVED***
	***REMOVED***

	this.config.rowGroups = config.rowGroups && this.table.options.groupBy && this.table.modExists("groupRows");

	if (config.columnGroups && this.table.columnManager.columns.length != this.table.columnManager.columnsByIndex.length){
		this.config.columnGroups = true;
	***REMOVED***

	if (config.columnCalcs && this.table.modExists("columnCalcs")){
		this.config.columnCalcs = true;
	***REMOVED***

	if (config.dataTree && this.table.options.dataTree && this.table.modExists("dataTree")){
		this.config.dataTree = true;
	***REMOVED***
***REMOVED***;

Download.prototype.processColumns = function () {
	var self = this;

	self.columnsByIndex = [];
	self.columnsByField = {***REMOVED***;

	self.table.columnManager.columnsByIndex.forEach(function (column) {

		if (column.field && column.definition.download !== false && (column.visible || (!column.visible && column.definition.download))) {
			self.columnsByIndex.push(column);
			self.columnsByField[column.field] = column;
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Download.prototype.processDefinitions = function(){
	var self = this,
	processedDefinitions = [];

	if(this.config.columnGroups){
		self.table.columnManager.columns.forEach(function(column){
			var colData = self.processColumnGroup(column);

			if(colData){
				processedDefinitions.push(colData);
			***REMOVED***
		***REMOVED***);
	***REMOVED***else{
		self.columnsByIndex.forEach(function(column){
			if(column.download !== false){
				//isolate definiton from defintion object
				processedDefinitions.push(self.processDefinition(column));
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	return  processedDefinitions;
***REMOVED***;

Download.prototype.processColumnGroup = function(column){
	var subGroups = column.columns,
	maxDepth = 0;
	var processedColumn = this.processDefinition(column);
	var groupData = {
		type:"group",
		title:processedColumn.title,
		depth:1,
	***REMOVED***;


	if(subGroups.length){
		groupData.subGroups = [];
		groupData.width = 0;

		subGroups.forEach((subGroup) => {
			var subGroupData = this.processColumnGroup(subGroup);

			if(subGroupData.depth > maxDepth){
				maxDepth = subGroupData.depth;
			***REMOVED***

			if(subGroupData){
				groupData.width += subGroupData.width;
				groupData.subGroups.push(subGroupData);
			***REMOVED***
		***REMOVED***);

		groupData.depth += maxDepth;

		if(!groupData.width){
			return false;
		***REMOVED***
	***REMOVED***else{
		if(column.field && column.definition.download !== false && (column.visible || (!column.visible && column.definition.download))){
			groupData.width = 1;
			groupData.definition = processedColumn;
		***REMOVED***else{
			return false;
		***REMOVED***
	***REMOVED***

	return groupData;
***REMOVED***;

Download.prototype.processDefinition = function(column){
	var def = {***REMOVED***;

	for(var key in column.definition){
		def[key] = column.definition[key];
	***REMOVED***

	if(typeof column.definition.downloadTitle != "undefined"){
		def.title = column.definition.downloadTitle;
	***REMOVED***

	return def;
***REMOVED***;

Download.prototype.processData = function(active){
	var self = this,
	data = [],
	groups = [],
	rows = false,
	calcs =  {***REMOVED***;

	if(this.config.rowGroups){

		if(active == "visible"){

			rows = self.table.rowManager.getRows(active);

			rows.forEach((row) => {
				if(row.type == "row"){
					var group = row.getGroup();

					if(groups.indexOf(group) === -1){
						groups.push(group);
					***REMOVED***
				***REMOVED***
			***REMOVED***);
		***REMOVED***else{
			groups = this.table.modules.groupRows.getGroups();
		***REMOVED***

		groups.forEach((group) => {
			data.push(this.processGroupData(group, rows));
		***REMOVED***);

	***REMOVED***else{
		if(this.config.dataTree){
			active = active = "active" ? "display" : active;
		***REMOVED***
		data = self.table.rowManager.getData(active, "download");
	***REMOVED***


	if(this.config.columnCalcs){
		calcs = this.table.getCalcResults();

		data = {
			calcs: calcs,
			data: data,
		***REMOVED***;
	***REMOVED***

	//bulk data processing
	if(typeof self.table.options.downloadDataFormatter == "function"){
		data = self.table.options.downloadDataFormatter(data);
	***REMOVED***

	return data;
***REMOVED***;


Download.prototype.processGroupData = function(group, visRows){
	var subGroups = group.getSubGroups();

	var groupData = {
		type:"group",
		key:group.key
	***REMOVED***;

	if(subGroups.length){
		groupData.subGroups = [];

		subGroups.forEach((subGroup) => {
			groupData.subGroups.push(this.processGroupData(subGroup, visRows));
		***REMOVED***);
	***REMOVED***else{
		if(visRows){
			groupData.rows = [];

			group.rows.forEach(function(row){
				if(visRows.indexOf(row) > -1){
					groupData.rows.push(row.getData("download"));
				***REMOVED***
			***REMOVED***);
		***REMOVED***else{
			groupData.rows = group.getData(true, "download");
		***REMOVED***

	***REMOVED***

	return groupData;
***REMOVED***;

Download.prototype.triggerDownload = function(data, mime, type, filename, newTab){
	var element = document.createElement('a'),
	blob = new Blob([data],{type:mime***REMOVED***),
	filename = filename || "Tabulator." + (typeof type === "function" ? "txt" : type);

	blob = this.table.options.downloadReady.call(this.table, data, blob);

	if(blob){

		if(newTab){
			window.open(window.URL.createObjectURL(blob));
		***REMOVED***else{
			if(navigator.msSaveOrOpenBlob){
				navigator.msSaveOrOpenBlob(blob, filename);
			***REMOVED***else{
				element.setAttribute('href', window.URL.createObjectURL(blob));

				//set file title
				element.setAttribute('download', filename);

				//trigger download
				element.style.display = 'none';
				document.body.appendChild(element);
				element.click();

				//remove temporary link element
				document.body.removeChild(element);
			***REMOVED***
		***REMOVED***


		if(this.table.options.downloadComplete){
			this.table.options.downloadComplete();
		***REMOVED***
	***REMOVED***

***REMOVED***;

//nested field lookup
Download.prototype.getFieldValue = function(field, data){
	var column = this.columnsByField[field];

	if(column){
		return	column.getFieldValue(data);
	***REMOVED***

	return false;
***REMOVED***;


Download.prototype.commsReceived = function(table, action, data){
	switch(action){
		case "intercept":
		this.download(data.type, "", data.options, data.active, data.intercept);
		break;
	***REMOVED***
***REMOVED***;


//downloaders
Download.prototype.downloaders = {
	csv:function(columns, data, options, setFileContents, config){
		var self = this,
		titles = [],
		fields = [],
		delimiter = options && options.delimiter ? options.delimiter : ",",
		fileContents, output;

		//build column headers
		function parseSimpleTitles(){
			columns.forEach(function(column){
				titles.push('"' + String(column.title).split('"').join('""') + '"');
				fields.push(column.field);
			***REMOVED***);
		***REMOVED***

		function parseColumnGroup(column, level){
			if(column.subGroups){
				column.subGroups.forEach(function(subGroup){
					parseColumnGroup(subGroup, level+1);
				***REMOVED***);
			***REMOVED***else{
				titles.push('"' + String(column.title).split('"').join('""') + '"');
				fields.push(column.definition.field);
			***REMOVED***
		***REMOVED***

		if(config.columnGroups){
			console.warn("Download Warning - CSV downloader cannot process column groups");

			columns.forEach(function(column){
				parseColumnGroup(column,0);
			***REMOVED***);
		***REMOVED***else{
			parseSimpleTitles();
		***REMOVED***


		//generate header row
		fileContents = [titles.join(delimiter)];

		function parseRows(data){
			//generate each row of the table
			data.forEach(function(row){
				var rowData = [];

				fields.forEach(function(field){
					var value = self.getFieldValue(field, row);

					switch(typeof value){
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

					//escape quotation marks
					rowData.push('"' + String(value).split('"').join('""') + '"');
				***REMOVED***);

				fileContents.push(rowData.join(delimiter));
			***REMOVED***);
		***REMOVED***

		function parseGroup(group){
			if(group.subGroups){
				group.subGroups.forEach(function(subGroup){
					parseGroup(subGroup);
				***REMOVED***);
			***REMOVED***else{
				parseRows(group.rows);
			***REMOVED***
		***REMOVED***

		if(config.columnCalcs){
			console.warn("Download Warning - CSV downloader cannot process column calculations");
			data = data.data;
		***REMOVED***

		if(config.rowGroups){
			console.warn("Download Warning - CSV downloader cannot process row groups");

			data.forEach(function(group){
				parseGroup(group);
			***REMOVED***);
		***REMOVED***else{
			parseRows(data);
		***REMOVED***

		output = fileContents.join("\n");

		if(options.bom){
			output = "\ufeff" + output;
		***REMOVED***

		setFileContents(output, "text/csv");
	***REMOVED***,

	json:function(columns, data, options, setFileContents, config){
		var fileContents;

		if(config.columnCalcs){
			console.warn("Download Warning - CSV downloader cannot process column calculations");
			data = data.data;
		***REMOVED***

		fileContents = JSON.stringify(data, null, '\t');

		setFileContents(fileContents, "application/json");
	***REMOVED***,

	pdf:function(columns, data, options, setFileContents, config){
		var self = this,
		fields = [],
		header = [],
		body = [],
		calcs = {***REMOVED***,
		headerDepth = 1,
		table = "",
		autoTableParams = {***REMOVED***,
		rowGroupStyles = options.rowGroupStyles || {
			fontStyle: "bold",
			fontSize: 12,
			cellPadding: 6,
			fillColor: 220,
		***REMOVED***,
		rowCalcStyles = options.rowCalcStyles || {
			fontStyle: "bold",
			fontSize: 10,
			cellPadding: 4,
			fillColor: 232,
		***REMOVED***,
		jsPDFParams = options.jsPDF || {***REMOVED***,
		title = options && options.title ? options.title : "";

		if(config.columnCalcs){
			calcs = data.calcs;
			data = data.data;
		***REMOVED***

		if(!jsPDFParams.orientation){
			jsPDFParams.orientation = options.orientation || "landscape";
		***REMOVED***

		if(!jsPDFParams.unit){
			jsPDFParams.unit = "pt";
		***REMOVED***

		//build column headers
		function parseSimpleTitles(){
			columns.forEach(function(column){
				if(column.field){
					header.push(column.title || "");
					fields.push(column.field);
				***REMOVED***
			***REMOVED***);

			header = [header];
		***REMOVED***

		function parseColumnGroup(column, level){
			var colSpan = column.width,
			rowSpan = 1,
			col = {
				content:column.title || "",
			***REMOVED***;

			if(column.subGroups){
				column.subGroups.forEach(function(subGroup){
					parseColumnGroup(subGroup, level+1);
				***REMOVED***);
				rowSpan = 1;
			***REMOVED***else{
				fields.push(column.definition.field);
				rowSpan = headerDepth - level;
			***REMOVED***

			col.rowSpan = rowSpan;
			// col.colSpan = colSpan;

			header[level].push(col);

			colSpan--;

			if(rowSpan > 1){
				for(var i = level + 1; i < headerDepth; i++){
					header[i].push("");
				***REMOVED***
			***REMOVED***

			for(var i = 0; i < colSpan; i++){
				header[level].push("");
			***REMOVED***
		***REMOVED***

		if(config.columnGroups){
			columns.forEach(function(column){
				if(column.depth > headerDepth){
					headerDepth = column.depth;
				***REMOVED***
			***REMOVED***);

			for(var i=0; i < headerDepth; i++){
				header.push([]);
			***REMOVED***

			columns.forEach(function(column){
				parseColumnGroup(column,0);
			***REMOVED***);

		***REMOVED***else{
			parseSimpleTitles();
		***REMOVED***

		function parseValue(value){
			switch(typeof value){
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

			return value;
		***REMOVED***

		function parseRows(data){
			//build table rows
			data.forEach(function(row){
				body.push(parseRow(row));
			***REMOVED***);
		***REMOVED***

		function parseRow(row, styles){
			var rowData = [];

			fields.forEach(function(field){
				var value = self.getFieldValue(field, row);
				value = parseValue(value);

				if(styles){
					rowData.push({
						content:value,
						styles:styles,
					***REMOVED***);
				***REMOVED***else{
					rowData.push(value);
				***REMOVED***
			***REMOVED***);

			return rowData;
		***REMOVED***

		function parseGroup(group, calcObj){
			var groupData = [];

			groupData.push({content:parseValue(group.key), colSpan:fields.length, styles:rowGroupStyles***REMOVED***);

			body.push(groupData);

			if(group.subGroups){
				group.subGroups.forEach(function(subGroup){
					parseGroup(subGroup,  calcObj[group.key] ? calcObj[group.key].groups || {***REMOVED*** : {***REMOVED***);
				***REMOVED***);
			***REMOVED***else{

				if(config.columnCalcs){
					addCalcRow(calcObj, group.key, "top");
				***REMOVED***

				parseRows(group.rows);

				if(config.columnCalcs){
					addCalcRow(calcObj, group.key, "bottom");
				***REMOVED***
			***REMOVED***
		***REMOVED***

		function addCalcRow(calcs, selector, pos){
			var calcData = calcs[selector];

			if(calcData){
				if(pos){
					calcData = calcData[pos];
				***REMOVED***

				if(Object.keys(calcData).length){
					body.push(parseRow(calcData, rowCalcStyles));
				***REMOVED***
			***REMOVED***
		***REMOVED***

		if(config.rowGroups){
			data.forEach(function(group){
				parseGroup(group, calcs);
			***REMOVED***);
		***REMOVED***else{
			if(config.columnCalcs){
				addCalcRow(calcs, "top");
			***REMOVED***

			parseRows(data);

			if(config.columnCalcs){
				addCalcRow(calcs, "bottom");
			***REMOVED***
		***REMOVED***

		var doc = new jsPDF(jsPDFParams); //set document to landscape, better for most tables

		if(options && options.autoTable){
			if(typeof options.autoTable === "function"){
				autoTableParams = options.autoTable(doc) || {***REMOVED***;
			***REMOVED***else{
				autoTableParams = options.autoTable;
			***REMOVED***
		***REMOVED***

		if(title){
			autoTableParams.addPageContent = function(data) {
				doc.text(title, 40, 30);
			***REMOVED***;
		***REMOVED***

		autoTableParams.head = header;
		autoTableParams.body = body;

		doc.autoTable(autoTableParams);

		if(options && options.documentProcessing){
			options.documentProcessing(doc);
		***REMOVED***

		setFileContents(doc.output("arraybuffer"), "application/pdf");
	***REMOVED***,

	xlsx:function(columns, data, options, setFileContents, config){
		var self = this,
		sheetName = options.sheetName || "Sheet1",
		workbook = XLSX.utils.book_new(),
		calcs = {***REMOVED***,
		groupRowIndexs = [],
		groupColumnIndexs = [],
		calcRowIndexs = [],
		output;

		workbook.SheetNames = [];
		workbook.Sheets = {***REMOVED***;

		if(config.columnCalcs){
			calcs = data.calcs;
			data = data.data;
		***REMOVED***

		function generateSheet(){
			var titles = [],
			fields = [],
			rows = [],
			worksheet;

			//convert rows to worksheet
			function rowsToSheet(){
				var sheet = {***REMOVED***;
				var range = {s: {c:0, r:0***REMOVED***, e: {c:fields.length, r:rows.length ***REMOVED******REMOVED***;

				XLSX.utils.sheet_add_aoa(sheet, rows);

				sheet['!ref'] = XLSX.utils.encode_range(range);

				var merges = generateMerges();

				if(merges.length){
					sheet["!merges"] = merges;
				***REMOVED***

				return sheet;
			***REMOVED***

			function parseSimpleTitles(){
				//get field lists
				columns.forEach(function(column){
					titles.push(column.title);
					fields.push(column.field);
				***REMOVED***);

				rows.push(titles);
			***REMOVED***

			function parseColumnGroup(column, level){

				if(typeof titles[level] === "undefined"){
					titles[level] = [];
				***REMOVED***

				if(typeof groupColumnIndexs[level] === "undefined"){
					groupColumnIndexs[level] = [];
				***REMOVED***

				if(column.width > 1){

					groupColumnIndexs[level].push({
						type:"hoz",
						start:titles[level].length,
						end:titles[level].length + column.width - 1,
					***REMOVED***);
				***REMOVED***

				titles[level].push(column.title);

				if(column.subGroups){
					column.subGroups.forEach(function(subGroup){
						parseColumnGroup(subGroup, level+1);
					***REMOVED***);
				***REMOVED***else{
					fields.push(column.definition.field);
					padColumnTitles(fields.length - 1, level);

					groupColumnIndexs[level].push({
						type:"vert",
						start:fields.length - 1,
					***REMOVED***);

				***REMOVED***
			***REMOVED***


			function padColumnTitles(){
				var max = 0;

				titles.forEach(function(title){
					var len = title.length;
					if(len > max){
						max = len;
					***REMOVED***
				***REMOVED***);

				titles.forEach(function(title){
					var len = title.length;
					if(len < max){
						for(var i = len; i < max; i++){
							title.push("");
						***REMOVED***
					***REMOVED***
				***REMOVED***);
			***REMOVED***

			if(config.columnGroups){
				columns.forEach(function(column){
					parseColumnGroup(column,0);
				***REMOVED***);

				titles.forEach(function(title){
					rows.push(title);
				***REMOVED***);
			***REMOVED***else{
				parseSimpleTitles();
			***REMOVED***

			function generateMerges(){
				var output = [];

				groupRowIndexs.forEach(function(index){
					output.push({s:{r:index,c:0***REMOVED***,e:{r:index,c:fields.length - 1***REMOVED******REMOVED***);
				***REMOVED***);

				groupColumnIndexs.forEach(function(merges, level){
					merges.forEach(function(merge){
						if(merge.type === "hoz"){
							output.push({s:{r:level,c:merge.start***REMOVED***,e:{r:level,c:merge.end***REMOVED******REMOVED***);
						***REMOVED***else{
							if(level != titles.length - 1){
								output.push({s:{r:level,c:merge.start***REMOVED***,e:{r:titles.length - 1,c:merge.start***REMOVED******REMOVED***);
							***REMOVED***
						***REMOVED***
					***REMOVED***);
				***REMOVED***);

				return output;
			***REMOVED***

			//generate each row of the table
			function parseRows(data){
				data.forEach(function(row){
					rows.push(parseRow(row));
				***REMOVED***);
			***REMOVED***

			function parseRow(row){
				var rowData = [];

				fields.forEach(function(field){
					var value = self.getFieldValue(field, row);
					rowData.push(!(value instanceof Date) && typeof value === "object" ? JSON.stringify(value) : value);
				***REMOVED***);

				return rowData;
			***REMOVED***


			function addCalcRow(calcs, selector, pos){
				var calcData = calcs[selector];

				if(calcData){
					if(pos){
						calcData = calcData[pos];
					***REMOVED***

					if(Object.keys(calcData).length){
						calcRowIndexs.push(rows.length);
						rows.push(parseRow(calcData));
					***REMOVED***
				***REMOVED***
			***REMOVED***

			function parseGroup(group, calcObj){
				var groupData = [];

				groupData.push(group.key);

				groupRowIndexs.push(rows.length);

				rows.push(groupData);

				if(group.subGroups){
					group.subGroups.forEach(function(subGroup){
						parseGroup(subGroup, calcObj[group.key] ? calcObj[group.key].groups || {***REMOVED*** : {***REMOVED***);
					***REMOVED***);
				***REMOVED***else{

					if(config.columnCalcs){
						addCalcRow(calcObj, group.key, "top");
					***REMOVED***

					parseRows(group.rows);

					if(config.columnCalcs){
						addCalcRow(calcObj, group.key, "bottom");
					***REMOVED***
				***REMOVED***


			***REMOVED***

			if(config.rowGroups){
				data.forEach(function(group){
					parseGroup(group, calcs);
				***REMOVED***);
			***REMOVED***else{
				if(config.columnCalcs){
					addCalcRow(calcs, "top");
				***REMOVED***

				parseRows(data);

				if(config.columnCalcs){
					addCalcRow(calcs, "bottom");
				***REMOVED***
			***REMOVED***

			worksheet = rowsToSheet();

			return worksheet;
		***REMOVED***

		if(options.sheetOnly){
			setFileContents(generateSheet());
			return;
		***REMOVED***

		if(options.sheets){
			for(var sheet in options.sheets){

				if(options.sheets[sheet] === true){
					workbook.SheetNames.push(sheet);
					workbook.Sheets[sheet] = generateSheet();
				***REMOVED***else{

					workbook.SheetNames.push(sheet);

					this.table.modules.comms.send(options.sheets[sheet], "download", "intercept",{
						type:"xlsx",
						options:{sheetOnly:true***REMOVED***,
						active:self.active,
						intercept:function(data){
							workbook.Sheets[sheet] = data;
						***REMOVED***
					***REMOVED***);
				***REMOVED***
			***REMOVED***
		***REMOVED***else{
			workbook.SheetNames.push(sheetName);
			workbook.Sheets[sheetName] = generateSheet();
		***REMOVED***

		if(options.documentProcessing){
			workbook = options.documentProcessing(workbook);
		***REMOVED***

		//convert workbook to binary array
		function s2ab(s) {
			var buf = new ArrayBuffer(s.length);
			var view = new Uint8Array(buf);
			for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
				return buf;
		***REMOVED***

		output = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type: 'binary'***REMOVED***);

		setFileContents(s2ab(output), "application/octet-stream");
	***REMOVED***,

	html:function(columns, data, options, setFileContents, config){
		if(this.table.modExists("export", true)){
			setFileContents(this.table.modules.export.getHtml(true, options.style, config), "text/html");
		***REMOVED***
	***REMOVED***

***REMOVED***;


Tabulator.prototype.registerModule("download", Download);
