var Layout = function(table){
	this.table = table;
	this.mode = null;
***REMOVED***;

//initialize layout system
Layout.prototype.initialize = function(layout){

	if(this.modes[layout]){
		this.mode = layout;
	***REMOVED***else{
		console.warn("Layout Error - invalid mode set, defaulting to 'fitData' : " + layout);
		this.mode = 'fitData';
	***REMOVED***

	this.table.element.setAttribute("tabulator-layout", this.mode);
***REMOVED***;

Layout.prototype.getMode = function(){
	return this.mode;
***REMOVED***;

//trigger table layout
Layout.prototype.layout = function(){
	this.modes[this.mode].call(this, this.table.columnManager.columnsByIndex);
***REMOVED***;

//layout render functions
Layout.prototype.modes = {

	//resize columns to fit data the contain
	"fitData": function(columns){
		columns.forEach(function(column){
			column.reinitializeWidth();
		***REMOVED***);

		if(this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
			this.table.modules.responsiveLayout.update();
		***REMOVED***
	***REMOVED***,

	//resize columns to fit data the contain and stretch row to fill table
	"fitDataFill": function(columns){
		columns.forEach(function(column){
			column.reinitializeWidth();
		***REMOVED***);

		if(this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
			this.table.modules.responsiveLayout.update();
		***REMOVED***
	***REMOVED***,

	//resize columns to fit data the contain and stretch last column to fill table
	"fitDataStretch": function(columns){
		var colsWidth = 0,
		tableWidth = this.table.rowManager.element.clientWidth,
		gap = 0,
		lastCol = false;

		columns.forEach((column, i) => {
			if(!column.widthFixed){
				column.reinitializeWidth();
			***REMOVED***

			if(this.table.options.responsiveLayout ? column.modules.responsive.visible : column.visible){
				lastCol = column;
			***REMOVED***

			if(column.visible){
				colsWidth += column.getWidth();
			***REMOVED***
		***REMOVED***);

		if(lastCol){
			gap = tableWidth - colsWidth + lastCol.getWidth();

			if(this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
				lastCol.setWidth(0);
				this.table.modules.responsiveLayout.update();
			***REMOVED***

			if(gap > 0){
				lastCol.setWidth(gap);
			***REMOVED***else{
				lastCol.reinitializeWidth();
			***REMOVED***
		***REMOVED***else{
			if(this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
				this.table.modules.responsiveLayout.update();
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	//resize columns to fit
	"fitColumns": function(columns){
		var self = this;

		var totalWidth = self.table.element.clientWidth; //table element width
		var fixedWidth = 0; //total width of columns with a defined width
		var flexWidth = 0; //total width available to flexible columns
		var flexGrowUnits = 0; //total number of widthGrow blocks accross all columns
		var flexColWidth = 0; //desired width of flexible columns
		var flexColumns = []; //array of flexible width columns
		var fixedShrinkColumns = []; //array of fixed width columns that can shrink
		var flexShrinkUnits = 0; //total number of widthShrink blocks accross all columns
		var overflowWidth = 0; //horizontal overflow width
		var gapFill=0; //number of pixels to be added to final column to close and half pixel gaps

		function calcWidth(width){
			var colWidth;

			if(typeof(width) == "string"){
				if(width.indexOf("%") > -1){
					colWidth = (totalWidth / 100)***REMOVED*** parseInt(width);
				***REMOVED***else{
					colWidth = parseInt(width);
				***REMOVED***
			***REMOVED***else{
				colWidth = width;
			***REMOVED***

			return colWidth;
		***REMOVED***

		//ensure columns resize to take up the correct amount of space
		function scaleColumns(columns, freeSpace, colWidth, shrinkCols){

			var oversizeCols = [],
			oversizeSpace = 0,
			remainingSpace = 0,
			nextColWidth = 0,
			gap = 0,
			changeUnits = 0,
			undersizeCols = [];

			function calcGrow(col){
				return (colWidth***REMOVED*** (col.column.definition.widthGrow || 1));
			***REMOVED***

			function calcShrink(col){
				return  (calcWidth(col.width) - (colWidth***REMOVED*** (col.column.definition.widthShrink || 0)))
			***REMOVED***

			columns.forEach(function(col, i){
				var width = shrinkCols ? calcShrink(col) : calcGrow(col);
				if(col.column.minWidth >= width){
					oversizeCols.push(col);
				***REMOVED***else{
					undersizeCols.push(col);
					changeUnits += shrinkCols ? (col.column.definition.widthShrink || 1) : (col.column.definition.widthGrow || 1);
				***REMOVED***
			***REMOVED***);

			if(oversizeCols.length){
				oversizeCols.forEach(function(col){
					oversizeSpace += shrinkCols ?  col.width - col.column.minWidth : col.column.minWidth;
					col.width = col.column.minWidth;
				***REMOVED***);

				remainingSpace = freeSpace - oversizeSpace;

				nextColWidth = changeUnits ? Math.floor(remainingSpace/changeUnits) : remainingSpace;

				gap = remainingSpace - (nextColWidth***REMOVED*** changeUnits);

				gap += scaleColumns(undersizeCols, remainingSpace, nextColWidth, shrinkCols);
			***REMOVED***else{
				gap = changeUnits ? freeSpace - (Math.floor(freeSpace/changeUnits)***REMOVED*** changeUnits) : freeSpace;

				undersizeCols.forEach(function(column){
					column.width = shrinkCols ? calcShrink(column) : calcGrow(column);
				***REMOVED***);
			***REMOVED***

			return gap;
		***REMOVED***


		if(this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
			this.table.modules.responsiveLayout.update();
		***REMOVED***

		//adjust for vertical scrollbar if present
		if(this.table.rowManager.element.scrollHeight > this.table.rowManager.element.clientHeight){
			totalWidth -= this.table.rowManager.element.offsetWidth - this.table.rowManager.element.clientWidth;
		***REMOVED***

		columns.forEach(function(column){
			var width, minWidth, colWidth;

			if(column.visible){

				width = column.definition.width;
				minWidth =  parseInt(column.minWidth);

				if(width){

					colWidth = calcWidth(width);

					fixedWidth += colWidth > minWidth ? colWidth : minWidth;

					if(column.definition.widthShrink){
						fixedShrinkColumns.push({
							column:column,
							width:colWidth > minWidth ? colWidth : minWidth
						***REMOVED***);
						flexShrinkUnits += column.definition.widthShrink;
					***REMOVED***

				***REMOVED***else{
					flexColumns.push({
						column:column,
						width:0,
					***REMOVED***);
					flexGrowUnits += column.definition.widthGrow || 1;
				***REMOVED***
			***REMOVED***
		***REMOVED***);


		//calculate available space
		flexWidth = totalWidth - fixedWidth;

		//calculate correct column size
		flexColWidth = Math.floor(flexWidth / flexGrowUnits)

		//generate column widths
		var gapFill = scaleColumns(flexColumns, flexWidth, flexColWidth, false);

		//increase width of last column to account for rounding errors
		if(flexColumns.length && gapFill > 0){
			flexColumns[flexColumns.length-1].width += + gapFill;
		***REMOVED***

		//caculate space for columns to be shrunk into
		flexColumns.forEach(function(col){
			flexWidth -= col.width;
		***REMOVED***)

		overflowWidth = Math.abs(gapFill) + flexWidth;


		//shrink oversize columns if there is no available space
		if(overflowWidth > 0 && flexShrinkUnits){
			gapFill = scaleColumns(fixedShrinkColumns, overflowWidth, Math.floor(overflowWidth / flexShrinkUnits), true);
		***REMOVED***

		//decrease width of last column to account for rounding errors
		if(fixedShrinkColumns.length){
			fixedShrinkColumns[fixedShrinkColumns.length-1].width -= gapFill;
		***REMOVED***


		flexColumns.forEach(function(col){
			col.column.setWidth(col.width);
		***REMOVED***);

		fixedShrinkColumns.forEach(function(col){
			col.column.setWidth(col.width);
		***REMOVED***);

	***REMOVED***,
***REMOVED***;


Tabulator.prototype.registerModule("layout", Layout);