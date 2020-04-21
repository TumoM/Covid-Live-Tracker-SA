***REMOVED***;

/*=include polyfills.js***REMOVED***/

/*=include column_manager.js***REMOVED***/
/*=include column.js***REMOVED***/
/*=include row_manager.js***REMOVED***/
/*=include row.js***REMOVED***/
/*=include cell.js***REMOVED***/
/*=include footer_manager.js***REMOVED***/

var Tabulator = function(element, options){

	this.options = {***REMOVED***;

	this.columnManager = null; // hold Column Manager
	this.rowManager = null; //hold Row Manager
	this.footerManager = null; //holder Footer Manager
	this.browser = ""; //hold current browser type
	this.browserSlow = false; //handle reduced functionality for slower browsers
	this.browserMobile = false; //check if running on moble, prevent resize cancelling edit on keyboard appearence

	this.modules = {***REMOVED***; //hold all modules bound to this table

	this.initializeElement(element);
	this.initializeOptions(options || {***REMOVED***);
	this._create();

	Tabulator.prototype.comms.register(this); //register table for inderdevice communication
***REMOVED***;

//default setup options
Tabulator.prototype.defaultOptions = {

	height:false, //height of tabulator
	minHeight:false, //minimum height of tabulator
	maxHeight:false, //maximum height of tabulator

	layout:"fitData", ///layout type "fitColumns" | "fitData"
	layoutColumnsOnNewData:false, //update column widths on setData

	columnMinWidth:40, //minimum global width for a column
	columnHeaderVertAlign:"top", //vertical alignment of column headers
	columnVertAlign:false, // DEPRECATED - Left to allow warning

	resizableColumns:true, //resizable columns
	resizableRows:false, //resizable rows
	autoResize:true, //auto resize table

	columns:[],//store for colum header info

	cellHozAlign:"", //horizontal align columns
	cellVertAlign:"", //certical align columns


	data:[], //default starting data

	autoColumns:false, //build columns from data row structure

	reactiveData:false, //enable data reactivity

	nestedFieldSeparator:".", //seperatpr for nested data

	tooltips: false, //Tool tip value
	tooltipsHeader: false, //Tool tip for headers
	tooltipGenerationMode:"load", //when to generate tooltips

	initialSort:false, //initial sorting criteria
	initialFilter:false, //initial filtering criteria
	initialHeaderFilter:false, //initial header filtering criteria

	columnHeaderSortMulti: true, //multiple or single column sorting

	sortOrderReverse:false, //reverse internal sort ordering

	headerSort:true, //set default global header sort
	headerSortTristate:false, //set default tristate header sorting

	footerElement:false, //hold footer element

	index:"id", //filed for row index

	keybindings:[], //array for keybindings

	tabEndNewRow:false, //create new row when tab to end of table

	invalidOptionWarnings:true, //allow toggling of invalid option warnings

	clipboard:false, //enable clipboard
	clipboardCopyStyled:true, //formatted table data
	clipboardCopyConfig:false, //clipboard config
	clipboardCopyFormatter:false, //DEPRICATED - REMOVE in 5.0
	clipboardCopyRowRange:"active", //restrict clipboard to visible rows only
	clipboardPasteParser:"table", //convert pasted clipboard data to rows
	clipboardPasteAction:"insert", //how to insert pasted data into the table

	clipboardCopied:function(){***REMOVED***, //data has been copied to the clipboard
	clipboardPasted:function(){***REMOVED***, //data has been pasted into the table
	clipboardPasteError:function(){***REMOVED***, //data has not successfully been pasted into the table

	downloadDataFormatter:false, //function to manipulate table data before it is downloaded
	downloadReady:function(data, blob){return blob;***REMOVED***, //function to manipulate download data
	downloadComplete:false, //function to manipulate download data
	downloadConfig:false,	//download config

	dataTree:false, //enable data tree
	dataTreeElementColumn:false,
	dataTreeBranchElement: true, //show data tree branch element
	dataTreeChildIndent:9, //data tree child indent in px
	dataTreeChildField:"_children", //data tre column field to look for child rows
	dataTreeCollapseElement:false, //data tree row collapse element
	dataTreeExpandElement:false, //data tree row expand element
	dataTreeStartExpanded:false,
	dataTreeRowExpanded:function(){***REMOVED***, //row has been expanded
	dataTreeRowCollapsed:function(){***REMOVED***, //row has been collapsed
	dataTreeChildColumnCalcs:false, //include visible data tree rows in column calculations
	dataTreeSelectPropagate:false, //seleccting a parent row selects its children

	printAsHtml:false, //enable print as html
	printFormatter:false, //printing page formatter
	printHeader:false, //page header contents
	printFooter:false, //page footer contents
	printCopyStyle:true, //DEPRICATED - REMOVE in 5.0
	printStyled:true, //enable print as html styling
	printVisibleRows:true,  //DEPRICATED - REMOVE in 5.0
	printRowRange:"visible", //restrict print to visible rows only
	printConfig:{***REMOVED***, //print config options

	addRowPos:"bottom", //position to insert blank rows, top|bottom

	selectable:"highlight", //highlight rows on hover
	selectableRangeMode: "drag", //highlight rows on hover
	selectableRollingSelection:true, //roll selection once maximum number of selectable rows is reached
	selectablePersistence:true, // maintain selection when table view is updated
	selectableCheck:function(data, row){return true;***REMOVED***, //check wheather row is selectable

	headerFilterLiveFilterDelay: 300, //delay before updating column after user types in header filter
	headerFilterPlaceholder: false, //placeholder text to display in header filters

	headerVisible:true, //hide header

	history:false, //enable edit history

	locale:false, //current system language
	langs:{***REMOVED***,

	virtualDom:true, //enable DOM virtualization
    virtualDomBuffer:0, // set virtual DOM buffer size

    persistentLayout:false, //DEPRICATED - REMOVE in 5.0
    persistentSort:false, //DEPRICATED - REMOVE in 5.0
    persistentFilter:false, //DEPRICATED - REMOVE in 5.0
	persistenceID:"", //key for persistent storage
	persistenceMode:true, //mode for storing persistence information
	persistenceReaderFunc:false, //function for handling persistence data reading
	persistenceWriterFunc:false, //function for handling persistence data writing

	persistence:false,

	responsiveLayout:false, //responsive layout flags
	responsiveLayoutCollapseStartOpen:true, //start showing collapsed data
	responsiveLayoutCollapseUseFormatters:true, //responsive layout collapse formatter
	responsiveLayoutCollapseFormatter:false, //responsive layout collapse formatter

	pagination:false, //set pagination type
	paginationSize:false, //set number of rows to a page
	paginationInitialPage:1, //initail page to show on load
	paginationButtonCount: 5, // set count of page button
	paginationSizeSelector:false, //add pagination size selector element
	paginationElement:false, //element to hold pagination numbers
	paginationDataSent:{***REMOVED***, //pagination data sent to the server
	paginationDataReceived:{***REMOVED***, //pagination data received from the server
	paginationAddRow: "page", //add rows on table or page

	ajaxURL:false, //url for ajax loading
	ajaxURLGenerator:false,
	ajaxParams:{***REMOVED***, //params for ajax loading
	ajaxConfig:"get", //ajax request type
	ajaxContentType:"form", //ajax request type
	ajaxRequestFunc:false, //promise function
	ajaxLoader:true, //show loader
	ajaxLoaderLoading:false, //loader element
	ajaxLoaderError:false, //loader element
	ajaxFiltering:false,
	ajaxSorting:false,
	ajaxProgressiveLoad:false, //progressive loading
	ajaxProgressiveLoadDelay:0, //delay between requests
	ajaxProgressiveLoadScrollMargin:0, //margin before scroll begins

	groupBy:false, //enable table grouping and set field to group by
	groupStartOpen:true, //starting state of group
	groupValues:false,

	groupHeader:false, //header generation function

	htmlOutputConfig:false, //html outypu config

	movableColumns:false, //enable movable columns

	movableRows:false, //enable movable rows
	movableRowsConnectedTables:false, //tables for movable rows to be connected to
	movableRowsSender:false,
	movableRowsReceiver:"insert",
	movableRowsSendingStart:function(){***REMOVED***,
	movableRowsSent:function(){***REMOVED***,
	movableRowsSentFailed:function(){***REMOVED***,
	movableRowsSendingStop:function(){***REMOVED***,
	movableRowsReceivingStart:function(){***REMOVED***,
	movableRowsReceived:function(){***REMOVED***,
	movableRowsReceivedFailed:function(){***REMOVED***,
	movableRowsReceivingStop:function(){***REMOVED***,

	scrollToRowPosition:"top",
	scrollToRowIfVisible:true,

	scrollToColumnPosition:"left",
	scrollToColumnIfVisible:true,

	rowFormatter:false,
	rowFormatterPrint:null,
	rowFormatterClipboard:null,
	rowFormatterHtmlOutput:null,

	placeholder:false,

	//table building callbacks
	tableBuilding:function(){***REMOVED***,
	tableBuilt:function(){***REMOVED***,

	//render callbacks
	renderStarted:function(){***REMOVED***,
	renderComplete:function(){***REMOVED***,

	//row callbacks
	rowClick:false,
	rowDblClick:false,
	rowContext:false,
	rowTap:false,
	rowDblTap:false,
	rowTapHold:false,
	rowMouseEnter:false,
	rowMouseLeave:false,
	rowMouseOver:false,
	rowMouseOut:false,
	rowMouseMove:false,
	rowContextMenu:false,
	rowAdded:function(){***REMOVED***,
	rowDeleted:function(){***REMOVED***,
	rowMoved:function(){***REMOVED***,
	rowUpdated:function(){***REMOVED***,
	rowSelectionChanged:function(){***REMOVED***,
	rowSelected:function(){***REMOVED***,
	rowDeselected:function(){***REMOVED***,
	rowResized:function(){***REMOVED***,

	//cell callbacks
	//row callbacks
	cellClick:false,
	cellDblClick:false,
	cellContext:false,
	cellTap:false,
	cellDblTap:false,
	cellTapHold:false,
	cellMouseEnter:false,
	cellMouseLeave:false,
	cellMouseOver:false,
	cellMouseOut:false,
	cellMouseMove:false,
	cellEditing:function(){***REMOVED***,
	cellEdited:function(){***REMOVED***,
	cellEditCancelled:function(){***REMOVED***,

	//column callbacks
	columnMoved:false,
	columnResized:function(){***REMOVED***,
	columnTitleChanged:function(){***REMOVED***,
	columnVisibilityChanged:function(){***REMOVED***,

	//HTML iport callbacks
	htmlImporting:function(){***REMOVED***,
	htmlImported:function(){***REMOVED***,

	//data callbacks
	dataLoading:function(){***REMOVED***,
	dataLoaded:function(){***REMOVED***,
	dataEdited:function(){***REMOVED***,

	//ajax callbacks
	ajaxRequesting:function(){***REMOVED***,
	ajaxResponse:false,
	ajaxError:function(){***REMOVED***,

	//filtering callbacks
	dataFiltering:false,
	dataFiltered:false,

	//sorting callbacks
	dataSorting:function(){***REMOVED***,
	dataSorted:function(){***REMOVED***,

	//grouping callbacks
	groupToggleElement:"arrow",
	groupClosedShowCalcs:false,
	dataGrouping:function(){***REMOVED***,
	dataGrouped:false,
	groupVisibilityChanged:function(){***REMOVED***,
	groupClick:false,
	groupDblClick:false,
	groupContext:false,
	groupTap:false,
	groupDblTap:false,
	groupTapHold:false,

	columnCalcs:true,

	//pagination callbacks
	pageLoaded:function(){***REMOVED***,

	//localization callbacks
	localized:function(){***REMOVED***,

	//validation has failed
	validationFailed:function(){***REMOVED***,

	//history callbacks
	historyUndo:function(){***REMOVED***,
	historyRedo:function(){***REMOVED***,

	//scroll callbacks
	scrollHorizontal:function(){***REMOVED***,
	scrollVertical:function(){***REMOVED***,

***REMOVED***;

Tabulator.prototype.initializeOptions = function(options){

	//warn user if option is not available
	if(options.invalidOptionWarnings !== false){
		for (var key in options){
			if(typeof this.defaultOptions[key] === "undefined"){
				console.warn("Invalid table constructor option:", key)
			***REMOVED***
		***REMOVED***
	***REMOVED***

	//assign options to table
	for (var key in this.defaultOptions){
		if(key in options){
			this.options[key] = options[key];
		***REMOVED***else{
			if(Array.isArray(this.defaultOptions[key])){
				this.options[key] = [];
			***REMOVED***else if(typeof this.defaultOptions[key] === "object" && this.defaultOptions[key] !== null){
				this.options[key] = {***REMOVED***;
			***REMOVED***else{
				this.options[key] = this.defaultOptions[key];
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.initializeElement = function(element){

	if(typeof HTMLElement !== "undefined" && element instanceof HTMLElement){
		this.element = element;
		return true;
	***REMOVED***else if(typeof element === "string"){
		this.element = document.querySelector(element);

		if(this.element){
			return true;
		***REMOVED***else{
			console.error("Tabulator Creation Error - no element found matching selector: ", element);
			return false;
		***REMOVED***
	***REMOVED***else{
		console.error("Tabulator Creation Error - Invalid element provided:", element);
		return false;
	***REMOVED***

***REMOVED***;


//convert depricated functionality to new functions
Tabulator.prototype._mapDepricatedFunctionality = function(){

	//map depricated persistance setup options
	if(this.options.persistentLayout || this.options.persistentSort || this.options.persistentFilter){
		if(!this.options.persistence){
			this.options.persistence = {***REMOVED***;
		***REMOVED***
	***REMOVED***

	if(typeof this.options.clipboardCopyHeader !== "undefined"){
		this.options.columnHeaders = this.options.clipboardCopyHeader;
		console.warn("DEPRECATION WARNING - clipboardCopyHeader option has been deprecated, please use the columnHeaders property on the clipboardCopyConfig option");
	***REMOVED***

	if(this.options.printVisibleRows !== true){
		console.warn("printVisibleRows option is deprecated, you should now use the printRowRange option");

		this.options.persistence.printRowRange = "active";
	***REMOVED***

	if(this.options.printCopyStyle !== true){
		console.warn("printCopyStyle option is deprecated, you should now use the printStyled option");

		this.options.persistence.printStyled = this.options.printCopyStyle;
	***REMOVED***

	if(this.options.persistentLayout){
		console.warn("persistentLayout option is deprecated, you should now use the persistence option");

		if(this.options.persistence !== true && typeof this.options.persistence.columns === "undefined"){
			this.options.persistence.columns = true;
		***REMOVED***
	***REMOVED***

	if(this.options.persistentSort){
		console.warn("persistentSort option is deprecated, you should now use the persistence option");

		if(this.options.persistence !== true  && typeof this.options.persistence.sort === "undefined"){
			this.options.persistence.sort = true;
		***REMOVED***
	***REMOVED***

	if(this.options.persistentFilter){
		console.warn("persistentFilter option is deprecated, you should now use the persistence option");

		if(this.options.persistence !== true  && typeof this.options.persistence.filter === "undefined"){
			this.options.persistence.filter = true;
		***REMOVED***
	***REMOVED***

	if(this.options.columnVertAlign){
		console.warn("columnVertAlign option is deprecated, you should now use the columnHeaderVertAlign option");

		this.options.columnHeaderVertAlign = this.options.columnVertAlign;
	***REMOVED***
***REMOVED***;

Tabulator.prototype._clearSelection = function(){

	this.element.classList.add("tabulator-block-select");

	if (window.getSelection) {
	  if (window.getSelection().empty) {  // Chrome
	  	window.getSelection().empty();
	***REMOVED*** else if (window.getSelection().removeAllRanges) {  // Firefox
	  	window.getSelection().removeAllRanges();
	***REMOVED***
	***REMOVED*** else if (document.selection) {  // IE?
		document.selection.empty();
	***REMOVED***

	this.element.classList.remove("tabulator-block-select");
***REMOVED***;


//concreate table
Tabulator.prototype._create = function(){
	this._clearObjectPointers();

	this._mapDepricatedFunctionality();

	this.bindModules();

	if(this.element.tagName === "TABLE"){
		if(this.modExists("htmlTableImport", true)){
			this.modules.htmlTableImport.parseTable();
		***REMOVED***
	***REMOVED***

	this.columnManager = new ColumnManager(this);
	this.rowManager = new RowManager(this);
	this.footerManager = new FooterManager(this);

	this.columnManager.setRowManager(this.rowManager);
	this.rowManager.setColumnManager(this.columnManager);

	this._buildElement();

	this._loadInitialData();
***REMOVED***;

//clear pointers to objects in default config object
Tabulator.prototype._clearObjectPointers = function(){
	this.options.columns = this.options.columns.slice(0);

	if(!this.options.reactiveData){
		this.options.data = this.options.data.slice(0);
	***REMOVED***
***REMOVED***;


//build tabulator element
Tabulator.prototype._buildElement = function(){
	var element = this.element,
	mod = this.modules,
	options = this.options;

	options.tableBuilding.call(this);

	element.classList.add("tabulator");
	element.setAttribute("role", "grid");

	//empty element
	while(element.firstChild) element.removeChild(element.firstChild);

	//set table height
	if(options.height){
		options.height = isNaN(options.height) ? options.height : options.height + "px";
		element.style.height = options.height;
	***REMOVED***

	//set table min height
	if(options.minHeight !== false){
		options.minHeight = isNaN(options.minHeight) ? options.minHeight : options.minHeight + "px";
		element.style.minHeight = options.minHeight;
	***REMOVED***

	//set table maxHeight
	if(options.maxHeight !== false){
		options.maxHeight = isNaN(options.maxHeight) ? options.maxHeight : options.maxHeight + "px";
		element.style.maxHeight = options.maxHeight;
	***REMOVED***

	this.columnManager.initialize();
	this.rowManager.initialize();

	this._detectBrowser();

	if(this.modExists("layout", true)){
		mod.layout.initialize(options.layout);
	***REMOVED***

	//set localization
	if(options.headerFilterPlaceholder !== false){
		mod.localize.setHeaderFilterPlaceholder(options.headerFilterPlaceholder);
	***REMOVED***

	for(let locale in options.langs){
		mod.localize.installLang(locale, options.langs[locale]);
	***REMOVED***

	mod.localize.setLocale(options.locale);

	//configure placeholder element
	if(typeof options.placeholder == "string"){

		var el = document.createElement("div");
		el.classList.add("tabulator-placeholder");

		var span = document.createElement("span");
		span.innerHTML = options.placeholder;

		el.appendChild(span);

		options.placeholder = el;
	***REMOVED***

	//build table elements
	element.appendChild(this.columnManager.getElement());
	element.appendChild(this.rowManager.getElement());


	if(options.footerElement){
		this.footerManager.activate();
	***REMOVED***

	if(options.persistence && this.modExists("persistence", true)){
		mod.persistence.initialize();
	***REMOVED***

	if(options.persistence && this.modExists("persistence", true) && mod.persistence.config.columns){
		options.columns = mod.persistence.load("columns", options.columns) ;
	***REMOVED***

	if(options.movableRows && this.modExists("moveRow")){
		mod.moveRow.initialize();
	***REMOVED***

	if(options.autoColumns && this.options.data){
		this.columnManager.generateColumnsFromRowData(this.options.data);
	***REMOVED***

	if(this.modExists("columnCalcs")){
		mod.columnCalcs.initialize();
	***REMOVED***

	this.columnManager.setColumns(options.columns);

	if(options.dataTree && this.modExists("dataTree", true)){
		mod.dataTree.initialize();
	***REMOVED***

	if(this.modExists("frozenRows")){
		this.modules.frozenRows.initialize();
	***REMOVED***

	if(((options.persistence && this.modExists("persistence", true) && mod.persistence.config.sort) || options.initialSort) && this.modExists("sort", true)){
		var sorters = [];

		if(options.persistence && this.modExists("persistence", true) && mod.persistence.config.sort){
			sorters = mod.persistence.load("sort");

			if(sorters === false && options.initialSort){
				sorters = options.initialSort;
			***REMOVED***
		***REMOVED***else if(options.initialSort){
			sorters = options.initialSort;
		***REMOVED***

		mod.sort.setSort(sorters);
	***REMOVED***

	if(((options.persistence && this.modExists("persistence", true) && mod.persistence.config.filter) || options.initialFilter) && this.modExists("filter", true)){
		var filters = [];


		if(options.persistence && this.modExists("persistence", true) && mod.persistence.config.filter){
			filters = mod.persistence.load("filter");

			if(filters === false && options.initialFilter){
				filters = options.initialFilter;
			***REMOVED***
		***REMOVED***else if(options.initialFilter){
			filters = options.initialFilter;
		***REMOVED***

		mod.filter.setFilter(filters);
	***REMOVED***

	if(options.initialHeaderFilter && this.modExists("filter", true)){
		options.initialHeaderFilter.forEach((item) => {

			var column = this.columnManager.findColumn(item.field);

			if(column){
				mod.filter.setHeaderFilterValue(column, item.value);
			***REMOVED***else{
				console.warn("Column Filter Error - No matching column found:", item.field);
				return false;
			***REMOVED***
		***REMOVED***);
	***REMOVED***


	if(this.modExists("ajax")){
		mod.ajax.initialize();
	***REMOVED***

	if(options.pagination && this.modExists("page", true)){
		mod.page.initialize();
	***REMOVED***

	if(options.groupBy && this.modExists("groupRows", true)){
		mod.groupRows.initialize();
	***REMOVED***

	if(this.modExists("keybindings")){
		mod.keybindings.initialize();
	***REMOVED***

	if(this.modExists("selectRow")){
		mod.selectRow.clearSelectionData(true);
	***REMOVED***

	if(options.autoResize && this.modExists("resizeTable")){
		mod.resizeTable.initialize();
	***REMOVED***

	if(this.modExists("clipboard")){
		mod.clipboard.initialize();
	***REMOVED***

	if(options.printAsHtml && this.modExists("print")){
		mod.print.initialize();
	***REMOVED***

	options.tableBuilt.call(this);
***REMOVED***;

Tabulator.prototype._loadInitialData = function(){
	var self = this;

	if(self.options.pagination && self.modExists("page")){
		self.modules.page.reset(true, true);

		if(self.options.pagination == "local"){
			if(self.options.data.length){
				self.rowManager.setData(self.options.data, false, true);
			***REMOVED***else{
				if((self.options.ajaxURL || self.options.ajaxURLGenerator) && self.modExists("ajax")){
					self.modules.ajax.loadData(false, true).then(()=>{***REMOVED***).catch(()=>{
						if(self.options.paginationInitialPage){
							self.modules.page.setPage(self.options.paginationInitialPage);
						***REMOVED***
					***REMOVED***);

					return;
				***REMOVED***else{
					self.rowManager.setData(self.options.data, false, true);
				***REMOVED***
			***REMOVED***

			if(self.options.paginationInitialPage){
				self.modules.page.setPage(self.options.paginationInitialPage);
			***REMOVED***
		***REMOVED***else{
			if(self.options.ajaxURL){
				self.modules.page.setPage(self.options.paginationInitialPage).then(()=>{***REMOVED***).catch(()=>{***REMOVED***);
			***REMOVED***else{
				self.rowManager.setData([], false, true);
			***REMOVED***
		***REMOVED***
	***REMOVED***else{
		if(self.options.data.length){
			self.rowManager.setData(self.options.data);
		***REMOVED***else{
			if((self.options.ajaxURL || self.options.ajaxURLGenerator) && self.modExists("ajax")){
				self.modules.ajax.loadData(false, true).then(()=>{***REMOVED***).catch(()=>{***REMOVED***);
			***REMOVED***else{
				self.rowManager.setData(self.options.data, false, true);
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

//deconstructor
Tabulator.prototype.destroy = function(){
	var element = this.element;

	Tabulator.prototype.comms.deregister(this); //deregister table from inderdevice communication

	if(this.options.reactiveData && this.modExists("reactiveData", true)){
		this.modules.reactiveData.unwatchData();
	***REMOVED***

	//clear row data
	this.rowManager.rows.forEach(function(row){
		row.wipe();
	***REMOVED***);

	this.rowManager.rows = [];
	this.rowManager.activeRows = [];
	this.rowManager.displayRows = [];

	//clear event bindings
	if(this.options.autoResize && this.modExists("resizeTable")){
		this.modules.resizeTable.clearBindings();
	***REMOVED***

	if(this.modExists("keybindings")){
		this.modules.keybindings.clearBindings();
	***REMOVED***

	//clear DOM
	while(element.firstChild) element.removeChild(element.firstChild);
	element.classList.remove("tabulator");
***REMOVED***;

Tabulator.prototype._detectBrowser = function(){
	var ua = navigator.userAgent||navigator.vendor||window.opera;

	if(ua.indexOf("Trident") > -1){
		this.browser = "ie";
		this.browserSlow = true;
	***REMOVED***else if(ua.indexOf("Edge") > -1){
		this.browser = "edge";
		this.browserSlow = true;
	***REMOVED***else if(ua.indexOf("Firefox") > -1){
		this.browser = "firefox";
		this.browserSlow = false;
	***REMOVED***else{
		this.browser = "other";
		this.browserSlow = false;
	***REMOVED***

	this.browserMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4));
***REMOVED***;

////////////////// Data Handling //////////////////

//block table redrawing
Tabulator.prototype.blockRedraw = function(){
	return this.rowManager.blockRedraw();
***REMOVED***;

//restore table redrawing
Tabulator.prototype.restoreRedraw = function(){
	return this.rowManager.restoreRedraw();
***REMOVED***;


//local data from local file
Tabulator.prototype.setDataFromLocalFile = function(extensions){

	return new Promise((resolve, reject) => {
		var input = document.createElement("input");
		input.type = "file";
		input.accept = extensions || ".json,application/json";

		input.addEventListener("change", (e) => {
			var file = input.files[0],
			reader = new FileReader(),
			data;

			reader.readAsText(file);

			reader.onload = (e) => {

				try {
					data = JSON.parse(reader.result);
				***REMOVED*** catch(e) {
					console.warn("File Load Error - File contents is invalid JSON", e);
					reject(e);
					return;
				***REMOVED***

				this._setData(data)
				.then((data) => {
					resolve(data);
				***REMOVED***)
				.catch((err) => {
					resolve(err);
				***REMOVED***);
			***REMOVED***;

			reader.onerror = (e) => {
				console.warn("File Load Error - Unable to read file");
				reject();
			***REMOVED***;
		***REMOVED***);

		input.click();
	***REMOVED***);
***REMOVED***;


//load data
Tabulator.prototype.setData = function(data, params, config){
	if(this.modExists("ajax")){
		this.modules.ajax.blockActiveRequest();
	***REMOVED***

	return this._setData(data, params, config, false, true);
***REMOVED***;

Tabulator.prototype._setData = function(data, params, config, inPosition, columnsChanged){
	var self = this;

	if(typeof(data) === "string"){
		if (data.indexOf("{") == 0 || data.indexOf("[") == 0){
			//data is a json encoded string
			return self.rowManager.setData(JSON.parse(data), inPosition, columnsChanged);
		***REMOVED***else{

			if(self.modExists("ajax", true)){
				if(params){
					self.modules.ajax.setParams(params);
				***REMOVED***

				if(config){
					self.modules.ajax.setConfig(config);
				***REMOVED***

				self.modules.ajax.setUrl(data);

				if(self.options.pagination == "remote" && self.modExists("page", true)){
					self.modules.page.reset(true, true);
					return self.modules.page.setPage(1);
				***REMOVED***else{
					//assume data is url, make ajax call to url to get data
					return self.modules.ajax.loadData(inPosition, columnsChanged);
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***else{
		if(data){
			//asume data is already an object
			return self.rowManager.setData(data, inPosition, columnsChanged);
		***REMOVED***else{

			//no data provided, check if ajaxURL is present;
			if(self.modExists("ajax") && (self.modules.ajax.getUrl || self.options.ajaxURLGenerator)){

				if(self.options.pagination == "remote" && self.modExists("page", true)){
					self.modules.page.reset(true, true);
					return self.modules.page.setPage(1);
				***REMOVED***else{
					return self.modules.ajax.loadData(inPosition, columnsChanged);
				***REMOVED***

			***REMOVED***else{
				//empty data
				return self.rowManager.setData([], inPosition, columnsChanged);
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

//clear data
Tabulator.prototype.clearData = function(){
	if(this.modExists("ajax")){
		this.modules.ajax.blockActiveRequest();
	***REMOVED***

	this.rowManager.clearData();
***REMOVED***;

//get table data array
Tabulator.prototype.getData = function(active){

	if(active === true){
		console.warn("passing a boolean to the getData function is deprecated, you should now pass the string 'active'");
		active = "active";
	***REMOVED***

	return this.rowManager.getData(active);
***REMOVED***;

//get table data array count
Tabulator.prototype.getDataCount = function(active){

	if(active === true){
		console.warn("passing a boolean to the getDataCount function is deprecated, you should now pass the string 'active'");
		active = "active";
	***REMOVED***

	return this.rowManager.getDataCount(active);
***REMOVED***;

//search for specific row components
Tabulator.prototype.searchRows = function(field, type, value){
	if(this.modExists("filter", true)){
		return this.modules.filter.search("rows", field, type, value);
	***REMOVED***
***REMOVED***;

//search for specific data
Tabulator.prototype.searchData = function(field, type, value){
	if(this.modExists("filter", true)){
		return this.modules.filter.search("data", field, type, value);
	***REMOVED***
***REMOVED***;

//get table html
Tabulator.prototype.getHtml = function(visible, style, config){
	if(this.modExists("export", true)){
		return this.modules.export.getHtml(visible, style, config);
	***REMOVED***
***REMOVED***;

//get print html
Tabulator.prototype.print = function(visible, style, config){
	if(this.modExists("print", true)){
		return this.modules.print.printFullscreen(visible, style, config);
	***REMOVED***
***REMOVED***;

//retrieve Ajax URL
Tabulator.prototype.getAjaxUrl = function(){
	if(this.modExists("ajax", true)){
		return this.modules.ajax.getUrl();
	***REMOVED***
***REMOVED***;

//replace data, keeping table in position with same sort
Tabulator.prototype.replaceData = function(data, params, config){
	if(this.modExists("ajax")){
		this.modules.ajax.blockActiveRequest();
	***REMOVED***

	return this._setData(data, params, config, true);
***REMOVED***;


//update table data
Tabulator.prototype.updateData = function(data){
	var self = this;
	var responses = 0;

	return new Promise((resolve, reject) => {
		if(this.modExists("ajax")){
			this.modules.ajax.blockActiveRequest();
		***REMOVED***

		if(typeof data === "string"){
			data = JSON.parse(data);
		***REMOVED***

		if(data){
			data.forEach(function(item){
				var row = self.rowManager.findRow(item[self.options.index]);

				if(row){
					responses++;

					row.updateData(item)
					.then(()=>{
						responses--;

						if(!responses){
							resolve();
						***REMOVED***
					***REMOVED***);
				***REMOVED***
			***REMOVED***);
		***REMOVED***else{
			console.warn("Update Error - No data provided");
			reject("Update Error - No data provided");
		***REMOVED***
	***REMOVED***);

***REMOVED***;

Tabulator.prototype.addData = function(data, pos, index){
	return new Promise((resolve, reject) => {
		if(this.modExists("ajax")){
			this.modules.ajax.blockActiveRequest();
		***REMOVED***

		if(typeof data === "string"){
			data = JSON.parse(data);
		***REMOVED***

		if(data){
			this.rowManager.addRows(data, pos, index)
			.then((rows) => {
				var output = [];

				rows.forEach(function(row){
					output.push(row.getComponent());
				***REMOVED***);

				resolve(output);
			***REMOVED***);
		***REMOVED***else{
			console.warn("Update Error - No data provided");
			reject("Update Error - No data provided");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//update table data
Tabulator.prototype.updateOrAddData = function(data){
	var self = this,
	rows = [],
	responses = 0;

	return new Promise((resolve, reject) => {
		if(this.modExists("ajax")){
			this.modules.ajax.blockActiveRequest();
		***REMOVED***

		if(typeof data === "string"){
			data = JSON.parse(data);
		***REMOVED***

		if(data){
			data.forEach(function(item){
				var row = self.rowManager.findRow(item[self.options.index]);

				responses++;

				if(row){
					row.updateData(item)
					.then(()=>{
						responses--;
						rows.push(row.getComponent());

						if(!responses){
							resolve(rows);
						***REMOVED***
					***REMOVED***);
				***REMOVED***else{
					self.rowManager.addRows(item)
					.then((newRows)=>{
						responses--;
						rows.push(newRows[0].getComponent());

						if(!responses){
							resolve(rows);
						***REMOVED***
					***REMOVED***);
				***REMOVED***
			***REMOVED***);
		***REMOVED***else{
			console.warn("Update Error - No data provided");
			reject("Update Error - No data provided");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//get row object
Tabulator.prototype.getRow = function(index){
	var row = this.rowManager.findRow(index);

	if(row){
		return row.getComponent();
	***REMOVED***else{
		console.warn("Find Error - No matching row found:", index);
		return false;
	***REMOVED***
***REMOVED***;

//get row object
Tabulator.prototype.getRowFromPosition = function(position, active){
	var row = this.rowManager.getRowFromPosition(position, active);

	if(row){
		return row.getComponent();
	***REMOVED***else{
		console.warn("Find Error - No matching row found:", position);
		return false;
	***REMOVED***
***REMOVED***;

//delete row from table
Tabulator.prototype.deleteRow = function(index){
	return new Promise((resolve, reject) => {
		var self = this,
		count = 0,
		successCount = 0,
		foundRows = [];

		function doneCheck(){
			count++;

			if(count == index.length){
				if(successCount){
					self.rowManager.reRenderInPosition();
					resolve();
				***REMOVED***
			***REMOVED***
		***REMOVED***

		if(!Array.isArray(index)){
			index = [index];
		***REMOVED***

		//find matching rows
		index.forEach((item) =>{
			var row = this.rowManager.findRow(item, true);

			if(row){
				foundRows.push(row);
			***REMOVED***else{
				console.warn("Delete Error - No matching row found:", item);
				reject("Delete Error - No matching row found")
				doneCheck();
			***REMOVED***
		***REMOVED***);

		//sort rows into correct order to ensure smooth delete from table
		foundRows.sort((a, b) => {
			return this.rowManager.rows.indexOf(a) > this.rowManager.rows.indexOf(b) ? 1 : -1;
		***REMOVED***);

		foundRows.forEach((row) =>{
			row.delete()
			.then(() => {
				successCount++;
				doneCheck();
			***REMOVED***)
			.catch((err) => {
				doneCheck();
				reject(err);
			***REMOVED***);
		***REMOVED***);
	***REMOVED***);
***REMOVED***;

//add row to table
Tabulator.prototype.addRow = function(data, pos, index){
	return new Promise((resolve, reject) => {
		if(typeof data === "string"){
			data = JSON.parse(data);
		***REMOVED***

		this.rowManager.addRows(data, pos, index)
		.then((rows)=>{
			//recalc column calculations if present
			if(this.modExists("columnCalcs")){
				this.modules.columnCalcs.recalc(this.rowManager.activeRows);
			***REMOVED***

			resolve(rows[0].getComponent());
		***REMOVED***);
	***REMOVED***);
***REMOVED***;

//update a row if it exitsts otherwise create it
Tabulator.prototype.updateOrAddRow = function(index, data){
	return new Promise((resolve, reject) => {
		var row = this.rowManager.findRow(index);

		if(typeof data === "string"){
			data = JSON.parse(data);
		***REMOVED***

		if(row){
			row.updateData(data)
			.then(()=>{
				//recalc column calculations if present
				if(this.modExists("columnCalcs")){
					this.modules.columnCalcs.recalc(this.rowManager.activeRows);
				***REMOVED***

				resolve(row.getComponent());
			***REMOVED***)
			.catch((err)=>{
				reject(err);
			***REMOVED***);
		***REMOVED***else{
			row = this.rowManager.addRows(data)
			.then((rows)=>{
				//recalc column calculations if present
				if(this.modExists("columnCalcs")){
					this.modules.columnCalcs.recalc(this.rowManager.activeRows);
				***REMOVED***

				resolve(rows[0].getComponent());
			***REMOVED***)
			.catch((err)=>{
				reject(err);
			***REMOVED***);
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//update row data
Tabulator.prototype.updateRow = function(index, data){
	return new Promise((resolve, reject) => {
		var row = this.rowManager.findRow(index);

		if(typeof data === "string"){
			data = JSON.parse(data);
		***REMOVED***

		if(row){
			row.updateData(data).then(()=>{
				resolve(row.getComponent());
			***REMOVED***)
			.catch((err)=>{
				reject(err);
			***REMOVED***);
		***REMOVED***else{
			console.warn("Update Error - No matching row found:", index);
			reject("Update Error - No matching row found");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

//scroll to row in DOM
Tabulator.prototype.scrollToRow = function(index, position, ifVisible){
	return new Promise((resolve, reject) => {
		var row = this.rowManager.findRow(index);

		if(row){
			this.rowManager.scrollToRow(row, position, ifVisible)
			.then(()=>{
				resolve();
			***REMOVED***)
			.catch((err)=>{
				reject(err);
			***REMOVED***);
		***REMOVED***else{
			console.warn("Scroll Error - No matching row found:", index);
			reject("Scroll Error - No matching row found");
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Tabulator.prototype.moveRow = function(from, to, after){
	var fromRow = this.rowManager.findRow(from);

	if(fromRow){
		fromRow.moveToRow(to, after);
	***REMOVED***else{
		console.warn("Move Error - No matching row found:", from);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getRows = function(active){

	if(active === true){
		console.warn("passing a boolean to the getRows function is deprecated, you should now pass the string 'active'");
		active = "active";
	***REMOVED***

	return this.rowManager.getComponents(active);
***REMOVED***;

//get position of row in table
Tabulator.prototype.getRowPosition = function(index, active){
	var row = this.rowManager.findRow(index);

	if(row){
		return this.rowManager.getRowPosition(row, active);
	***REMOVED***else{
		console.warn("Position Error - No matching row found:", index);
		return false;
	***REMOVED***
***REMOVED***;

//copy table data to clipboard
Tabulator.prototype.copyToClipboard = function(selector){
	if(this.modExists("clipboard", true)){
		this.modules.clipboard.copy(selector);
	***REMOVED***
***REMOVED***;

/////////////// Column Functions  ///////////////

Tabulator.prototype.setColumns = function(definition){
	this.columnManager.setColumns(definition);
***REMOVED***;

Tabulator.prototype.getColumns = function(structured){
	return this.columnManager.getComponents(structured);
***REMOVED***;

Tabulator.prototype.getColumn = function(field){
	var col = this.columnManager.findColumn(field);

	if(col){
		return col.getComponent();
	***REMOVED***else{
		console.warn("Find Error - No matching column found:", field);
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getColumnDefinitions = function(){
	return this.columnManager.getDefinitionTree();
***REMOVED***;

Tabulator.prototype.getColumnLayout = function(){
	if(this.modExists("persistence", true)){
		return this.modules.persistence.parseColumns(this.columnManager.getColumns());
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setColumnLayout = function(layout){
	if(this.modExists("persistence", true)){
		this.columnManager.setColumns(this.modules.persistence.mergeDefinition(this.options.columns, layout))
		return true;
	***REMOVED***
	return false;
***REMOVED***;

Tabulator.prototype.showColumn = function(field){
	var column = this.columnManager.findColumn(field);

	if(column){
		column.show();

		if(this.options.responsiveLayout && this.modExists("responsiveLayout", true)){
			this.modules.responsiveLayout.update();
		***REMOVED***
	***REMOVED***else{
		console.warn("Column Show Error - No matching column found:", field);
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.hideColumn = function(field){
	var column = this.columnManager.findColumn(field);

	if(column){
		column.hide();

		if(this.options.responsiveLayout && this.modExists("responsiveLayout", true)){
			this.modules.responsiveLayout.update();
		***REMOVED***
	***REMOVED***else{
		console.warn("Column Hide Error - No matching column found:", field);
		return false;
	***REMOVED***
***REMOVED***;


Tabulator.prototype.toggleColumn = function(field){
	var column = this.columnManager.findColumn(field);

	if(column){
		if(column.visible){
			column.hide();
		***REMOVED***else{
			column.show();
		***REMOVED***
	***REMOVED***else{
		console.warn("Column Visibility Toggle Error - No matching column found:", field);
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.addColumn = function(definition, before, field){
	return new Promise((resolve, reject) => {
		var column = this.columnManager.findColumn(field);

		this.columnManager.addColumn(definition, before, column)
		.then((column) => {
			resolve(column.getComponent());
		***REMOVED***).catch((err) => {
			reject(err);
		***REMOVED***);
	***REMOVED***);
***REMOVED***;

Tabulator.prototype.deleteColumn = function(field){
	return new Promise((resolve, reject) => {
		var column = this.columnManager.findColumn(field);

		if(column){
			column.delete()
			.then(() => {
				resolve();
			***REMOVED***).catch((err) => {
				reject(err);
			***REMOVED***);
		***REMOVED***else{
			console.warn("Column Delete Error - No matching column found:", field);
			reject();
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Tabulator.prototype.updateColumnDefinition = function(field, definition){
	return new Promise((resolve, reject) => {
		var column = this.columnManager.findColumn(field);

		if(column){
			column.updateDefinition(definition)
			.then((col) => {
				resolve(col);
			***REMOVED***).catch((err) => {
				reject(err);
			***REMOVED***);
		***REMOVED***else{
			console.warn("Column Update Error - No matching column found:", field);
			reject();
		***REMOVED***
	***REMOVED***);
***REMOVED***;


Tabulator.prototype.moveColumn = function(from, to, after){
	var fromColumn = this.columnManager.findColumn(from);
	var toColumn = this.columnManager.findColumn(to);

	if(fromColumn){
		if(toColumn){
			this.columnManager.moveColumn(fromColumn, toColumn, after)
		***REMOVED***else{
			console.warn("Move Error - No matching column found:", toColumn);
		***REMOVED***
	***REMOVED***else{
		console.warn("Move Error - No matching column found:", from);
	***REMOVED***
***REMOVED***;

//scroll to column in DOM
Tabulator.prototype.scrollToColumn = function(field, position, ifVisible){

	return new Promise((resolve, reject) => {
		var column = this.columnManager.findColumn(field);

		if(column){
			this.columnManager.scrollToColumn(column, position, ifVisible)
			.then(()=>{
				resolve();
			***REMOVED***)
			.catch((err)=>{
				reject(err);
			***REMOVED***);
		***REMOVED***else{
			console.warn("Scroll Error - No matching column found:", field);
			reject("Scroll Error - No matching column found");
		***REMOVED***
	***REMOVED***);

***REMOVED***;


//////////// Localization Functions  ////////////
Tabulator.prototype.setLocale = function(locale){
	this.modules.localize.setLocale(locale);
***REMOVED***;

Tabulator.prototype.getLocale = function(){
	return this.modules.localize.getLocale();
***REMOVED***;

Tabulator.prototype.getLang = function(locale){
	return this.modules.localize.getLang(locale);
***REMOVED***;

//////////// General Public Functions ////////////

//redraw list without updating data
Tabulator.prototype.redraw = function(force){
	this.columnManager.redraw(force);
	this.rowManager.redraw(force);
***REMOVED***;

Tabulator.prototype.setHeight = function(height){

	if(this.rowManager.renderMode !== "classic"){
		this.options.height = isNaN(height) ? height : height + "px";
		this.element.style.height = this.options.height;
		this.rowManager.setRenderMode();
		this.rowManager.redraw();
	***REMOVED***else{
		console.warn("setHeight function is not available in classic render mode");
	***REMOVED***

***REMOVED***;

///////////////////// Sorting ////////////////////

//trigger sort
Tabulator.prototype.setSort = function(sortList, dir){
	if(this.modExists("sort", true)){
		this.modules.sort.setSort(sortList, dir);
		this.rowManager.sorterRefresh();
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getSorters = function(){
	if(this.modExists("sort", true)){
		return this.modules.sort.getSort();
	***REMOVED***
***REMOVED***;

Tabulator.prototype.clearSort = function(){
	if(this.modExists("sort", true)){
		this.modules.sort.clear();
		this.rowManager.sorterRefresh();
	***REMOVED***
***REMOVED***;


///////////////////// Filtering ////////////////////

//set standard filters
Tabulator.prototype.setFilter = function(field, type, value){
	if(this.modExists("filter", true)){
		this.modules.filter.setFilter(field, type, value);
		this.rowManager.filterRefresh();
	***REMOVED***
***REMOVED***;

//add filter to array
Tabulator.prototype.addFilter = function(field, type, value){
	if(this.modExists("filter", true)){
		this.modules.filter.addFilter(field, type, value);
		this.rowManager.filterRefresh();
	***REMOVED***
***REMOVED***;

//get all filters
Tabulator.prototype.getFilters = function(all){
	if(this.modExists("filter", true)){
		return this.modules.filter.getFilters(all);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setHeaderFilterFocus = function(field){
	if(this.modExists("filter", true)){
		var column = this.columnManager.findColumn(field);

		if(column){
			this.modules.filter.setHeaderFilterFocus(column);
		***REMOVED***else{
			console.warn("Column Filter Focus Error - No matching column found:", field);
			return false;
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getHeaderFilterValue = function(field) {
	if(this.modExists("filter", true)){
		var column = this.columnManager.findColumn(field);

		if(column){
			return this.modules.filter.getHeaderFilterValue(column);
		***REMOVED***else{
			console.warn("Column Filter Error - No matching column found:", field);
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setHeaderFilterValue = function(field, value){
	if(this.modExists("filter", true)){
		var column = this.columnManager.findColumn(field);

		if(column){
			this.modules.filter.setHeaderFilterValue(column, value);
		***REMOVED***else{
			console.warn("Column Filter Error - No matching column found:", field);
			return false;
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getHeaderFilters = function(){
	if(this.modExists("filter", true)){
		return this.modules.filter.getHeaderFilters();
	***REMOVED***
***REMOVED***;


//remove filter from array
Tabulator.prototype.removeFilter = function(field, type, value){
	if(this.modExists("filter", true)){
		this.modules.filter.removeFilter(field, type, value);
		this.rowManager.filterRefresh();
	***REMOVED***
***REMOVED***;

//clear filters
Tabulator.prototype.clearFilter = function(all){
	if(this.modExists("filter", true)){
		this.modules.filter.clearFilter(all);
		this.rowManager.filterRefresh();
	***REMOVED***
***REMOVED***;

//clear header filters
Tabulator.prototype.clearHeaderFilter = function(){
	if(this.modExists("filter", true)){
		this.modules.filter.clearHeaderFilter();
		this.rowManager.filterRefresh();
	***REMOVED***
***REMOVED***;

///////////////////// Filtering ////////////////////
Tabulator.prototype.selectRow = function(rows){
	if(this.modExists("selectRow", true)){
		if(rows === true){
			console.warn("passing a boolean to the selectRowselectRow function is deprecated, you should now pass the string 'active'");
			rows = "active";
		***REMOVED***
		this.modules.selectRow.selectRows(rows);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.deselectRow = function(rows){
	if(this.modExists("selectRow", true)){
		this.modules.selectRow.deselectRows(rows);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.toggleSelectRow = function(row){
	if(this.modExists("selectRow", true)){
		this.modules.selectRow.toggleRow(row);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getSelectedRows = function(){
	if(this.modExists("selectRow", true)){
		return this.modules.selectRow.getSelectedRows();
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getSelectedData = function(){
	if(this.modExists("selectRow", true)){
		return this.modules.selectRow.getSelectedData();
	***REMOVED***
***REMOVED***;

//////////// Pagination Functions  ////////////

Tabulator.prototype.setMaxPage = function(max){
	if(this.options.pagination && this.modExists("page")){
		this.modules.page.setMaxPage(max);
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setPage = function(page){
	if(this.options.pagination && this.modExists("page")){
		return this.modules.page.setPage(page);
	***REMOVED***else{
		return new Promise((resolve, reject) => { reject() ***REMOVED***);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setPageToRow = function(row){
	return new Promise((resolve, reject) => {
		if(this.options.pagination && this.modExists("page")){
			row = this.rowManager.findRow(row);

			if(row){
				this.modules.page.setPageToRow(row)
				.then(()=>{
					resolve();
				***REMOVED***)
				.catch(()=>{
					reject();
				***REMOVED***);
			***REMOVED***else{
				reject();
			***REMOVED***
		***REMOVED***else{
			reject();
		***REMOVED***
	***REMOVED***);
***REMOVED***;


Tabulator.prototype.setPageSize = function(size){
	if(this.options.pagination && this.modExists("page")){
		this.modules.page.setPageSize(size);
		this.modules.page.setPage(1).then(()=>{***REMOVED***).catch(()=>{***REMOVED***);
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getPageSize = function(){
	if(this.options.pagination && this.modExists("page", true)){
		return this.modules.page.getPageSize();
	***REMOVED***
***REMOVED***;

Tabulator.prototype.previousPage = function(){
	if(this.options.pagination && this.modExists("page")){
		this.modules.page.previousPage();
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.nextPage = function(){
	if(this.options.pagination && this.modExists("page")){
		this.modules.page.nextPage();
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getPage = function(){
	if(this.options.pagination && this.modExists("page")){
		return this.modules.page.getPage();
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getPageMax = function(){
	if(this.options.pagination && this.modExists("page")){
		return this.modules.page.getPageMax();
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

///////////////// Grouping Functions ///////////////

Tabulator.prototype.setGroupBy = function(groups){
	if(this.modExists("groupRows", true)){
		this.options.groupBy = groups;
		this.modules.groupRows.initialize();
		this.rowManager.refreshActiveData("display");

		if(this.options.persistence && this.modExists("persistence", true) && this.modules.persistence.config.group){
			this.modules.persistence.save("group");
		***REMOVED***
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setGroupStartOpen = function(values){
	if(this.modExists("groupRows", true)){
		this.options.groupStartOpen = values;
		this.modules.groupRows.initialize();
		if(this.options.groupBy){
			this.rowManager.refreshActiveData("group");

			if(this.options.persistence && this.modExists("persistence", true) && this.modules.persistence.config.group){
				this.modules.persistence.save("group");
			***REMOVED***
		***REMOVED***else{
			console.warn("Grouping Update - cant refresh view, no groups have been set");
		***REMOVED***
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.setGroupHeader = function(values){
	if(this.modExists("groupRows", true)){
		this.options.groupHeader = values;
		this.modules.groupRows.initialize();
		if(this.options.groupBy){
			this.rowManager.refreshActiveData("group");

			if(this.options.persistence && this.modExists("persistence", true) && this.modules.persistence.config.group){
				this.modules.persistence.save("group");
			***REMOVED***
		***REMOVED***else{
			console.warn("Grouping Update - cant refresh view, no groups have been set");
		***REMOVED***
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getGroups = function(values){
	if(this.modExists("groupRows", true)){
		return this.modules.groupRows.getGroups(true);
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

// get grouped table data in the same format as getData()
Tabulator.prototype.getGroupedData = function(){
	if (this.modExists("groupRows", true)){
		return this.options.groupBy ?
		this.modules.groupRows.getGroupedData() : this.getData()
	***REMOVED***
***REMOVED***

///////////////// Column Calculation Functions ///////////////
Tabulator.prototype.getCalcResults = function(){
	if(this.modExists("columnCalcs", true)){
		return this.modules.columnCalcs.getResults();
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.recalc = function(){
	if(this.modExists("columnCalcs", true)){
		this.modules.columnCalcs.recalcAll(this.rowManager.activeRows);
	***REMOVED***
***REMOVED***;


/////////////// Navigation Management //////////////

Tabulator.prototype.navigatePrev = function(){
	var cell = false;

	if(this.modExists("edit", true)){
		cell = this.modules.edit.currentCell;

		if(cell){
			return cell.nav().prev();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

Tabulator.prototype.navigateNext = function(){
	var cell = false;

	if(this.modExists("edit", true)){
		cell = this.modules.edit.currentCell;

		if(cell){
			return cell.nav().next();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

Tabulator.prototype.navigateLeft = function(){
	var cell = false;

	if(this.modExists("edit", true)){
		cell = this.modules.edit.currentCell;

		if(cell){
			e.preventDefault();
			return cell.nav().left();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

Tabulator.prototype.navigateRight = function(){
	var cell = false;

	if(this.modExists("edit", true)){
		cell = this.modules.edit.currentCell;

		if(cell){
			e.preventDefault();
			return cell.nav().right();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

Tabulator.prototype.navigateUp = function(){
	var cell = false;

	if(this.modExists("edit", true)){
		cell = this.modules.edit.currentCell;

		if(cell){
			e.preventDefault();
			return cell.nav().up();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;

Tabulator.prototype.navigateDown = function(){
	var cell = false;

	if(this.modExists("edit", true)){
		cell = this.modules.edit.currentCell;

		if(cell){
			e.preventDefault();
			return cell.nav().down();
		***REMOVED***
	***REMOVED***

	return false;
***REMOVED***;


/////////////// History Management //////////////
Tabulator.prototype.undo = function(){
	if(this.options.history && this.modExists("history", true)){
		return this.modules.history.undo();
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.redo = function(){
	if(this.options.history && this.modExists("history", true)){
		return this.modules.history.redo();
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getHistoryUndoSize = function(){
	if(this.options.history && this.modExists("history", true)){
		return this.modules.history.getHistoryUndoSize();
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.getHistoryRedoSize = function(){
	if(this.options.history && this.modExists("history", true)){
		return this.modules.history.getHistoryRedoSize();
	***REMOVED***else{
		return false;
	***REMOVED***
***REMOVED***;

/////////////// Download Management //////////////

Tabulator.prototype.download = function(type, filename, options, active){
	if(this.modExists("download", true)){
		this.modules.download.download(type, filename, options, active);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.downloadToTab = function(type, filename, options, active){
	if(this.modExists("download", true)){
		this.modules.download.download(type, filename, options, active, true);
	***REMOVED***
***REMOVED***;


/////////// Inter Table Communications ///////////

Tabulator.prototype.tableComms = function(table, module, action, data){
	this.modules.comms.receive(table, module, action, data);
***REMOVED***;

////////////// Extension Management //////////////

//object to hold module
Tabulator.prototype.moduleBindings = {***REMOVED***;

//extend module
Tabulator.prototype.extendModule = function(name, property, values){

	if(Tabulator.prototype.moduleBindings[name]){
		var source = Tabulator.prototype.moduleBindings[name].prototype[property];

		if(source){
			if(typeof values == "object"){
				for(let key in values){
					source[key] = values[key];
				***REMOVED***
			***REMOVED***else{
				console.warn("Module Error - Invalid value type, it must be an object");
			***REMOVED***
		***REMOVED***else{
			console.warn("Module Error - property does not exist:", property);
		***REMOVED***
	***REMOVED***else{
		console.warn("Module Error - module does not exist:", name);
	***REMOVED***

***REMOVED***;

//add module to tabulator
Tabulator.prototype.registerModule = function(name, module){
	var self = this;
	Tabulator.prototype.moduleBindings[name] = module;
***REMOVED***;

//ensure that module are bound to instantiated function
Tabulator.prototype.bindModules = function(){
	this.modules = {***REMOVED***;

	for(var name in Tabulator.prototype.moduleBindings){
		this.modules[name] = new Tabulator.prototype.moduleBindings[name](this);
	***REMOVED***
***REMOVED***;

//Check for module
Tabulator.prototype.modExists = function(plugin, required){
	if(this.modules[plugin]){
		return true;
	***REMOVED***else{
		if(required){
			console.error("Tabulator Module Not Installed: " + plugin);
		***REMOVED***
		return false;
	***REMOVED***
***REMOVED***;


Tabulator.prototype.helpers = {

	elVisible: function(el){
		return !(el.offsetWidth <= 0 && el.offsetHeight <= 0);
	***REMOVED***,

	elOffset: function(el){
		var box = el.getBoundingClientRect();

		return {
			top: box.top + window.pageYOffset - document.documentElement.clientTop,
			left: box.left + window.pageXOffset - document.documentElement.clientLeft
		***REMOVED***;
	***REMOVED***,

	deepClone: function(obj){
		var clone = Array.isArray(obj) ? [] : {***REMOVED***;

		for(var i in obj) {
			if(obj[i] != null && typeof(obj[i])  === "object"){
				if (obj[i] instanceof Date) {
					clone[i] = new Date(obj[i]);
				***REMOVED*** else {
					clone[i] = this.deepClone(obj[i]);
				***REMOVED***
			***REMOVED***
			else{
				clone[i] = obj[i];
			***REMOVED***
		***REMOVED***
		return clone;
	***REMOVED***
***REMOVED***;

Tabulator.prototype.comms = {
	tables:[],
	register:function(table){
		Tabulator.prototype.comms.tables.push(table);
	***REMOVED***,
	deregister:function(table){
		var index = Tabulator.prototype.comms.tables.indexOf(table);

		if(index > -1){
			Tabulator.prototype.comms.tables.splice(index, 1);
		***REMOVED***
	***REMOVED***,
	lookupTable:function(query, silent){
		var results = [],
		matches, match;

		if(typeof query === "string"){
			matches = document.querySelectorAll(query);

			if(matches.length){
				for(var i = 0; i < matches.length; i++){
					match = Tabulator.prototype.comms.matchElement(matches[i]);

					if(match){
						results.push(match);
					***REMOVED***
				***REMOVED***
			***REMOVED***

		***REMOVED***else if((typeof HTMLElement !== "undefined" && query instanceof HTMLElement) || query instanceof Tabulator){
			match = Tabulator.prototype.comms.matchElement(query);

			if(match){
				results.push(match);
			***REMOVED***
		***REMOVED***else if(Array.isArray(query)){
			query.forEach(function(item){
				results = results.concat(Tabulator.prototype.comms.lookupTable(item));
			***REMOVED***);
		***REMOVED***else{
			if(!silent){
				console.warn("Table Connection Error - Invalid Selector", query);
			***REMOVED***
		***REMOVED***

		return results;
	***REMOVED***,
	matchElement:function(element){
		return Tabulator.prototype.comms.tables.find(function(table){
			return element instanceof Tabulator ? table === element : table.element === element;
		***REMOVED***);
	***REMOVED***
***REMOVED***;

Tabulator.prototype.findTable = function(query){
	var results = Tabulator.prototype.comms.lookupTable(query, true);
	return Array.isArray(results) && !results.length ? false : results;
***REMOVED***

/*=include modules/layout.js***REMOVED***/
/*=include modules/localize.js***REMOVED***/
/*=include modules/comms.js***REMOVED***/
