var DataTree = function(table){
	this.table = table;
	this.indent = 10;
	this.field = "";
	this.collapseEl = null;
	this.expandEl = null;
	this.branchEl = null;
	this.elementField = false;

	this.startOpen = function(){***REMOVED***;

	this.displayIndex = 0;
***REMOVED***;

DataTree.prototype.initialize = function(){
	var dummyEl = null,
	firstCol = this.table.columnManager.getFirstVisibileColumn(),
	options = this.table.options;

	this.field = options.dataTreeChildField;
	this.indent = options.dataTreeChildIndent;
	this.elementField = options.dataTreeElementColumn || (firstCol ? firstCol.field : false);

	if(options.dataTreeBranchElement){

		if(options.dataTreeBranchElement === true){
			this.branchEl = document.createElement("div");
			this.branchEl.classList.add("tabulator-data-tree-branch");
		***REMOVED***else{
			if(typeof options.dataTreeBranchElement === "string"){
				dummyEl = document.createElement("div");
				dummyEl.innerHTML = options.dataTreeBranchElement;
				this.branchEl = dummyEl.firstChild;
			***REMOVED***else{
				this.branchEl = options.dataTreeBranchElement;
			***REMOVED***
		***REMOVED***
	***REMOVED***

	if(options.dataTreeCollapseElement){
		if(typeof options.dataTreeCollapseElement === "string"){
			dummyEl = document.createElement("div");
			dummyEl.innerHTML = options.dataTreeCollapseElement;
			this.collapseEl = dummyEl.firstChild;
		***REMOVED***else{
			this.collapseEl = options.dataTreeCollapseElement;
		***REMOVED***
	***REMOVED***else{
		this.collapseEl = document.createElement("div");
		this.collapseEl.classList.add("tabulator-data-tree-control");
		this.collapseEl.tabIndex = 0;
		this.collapseEl.innerHTML = "<div class='tabulator-data-tree-control-collapse'></div>";
	***REMOVED***

	if(options.dataTreeExpandElement){
		if(typeof options.dataTreeExpandElement === "string"){
			dummyEl = document.createElement("div");
			dummyEl.innerHTML = options.dataTreeExpandElement;
			this.expandEl = dummyEl.firstChild;
		***REMOVED***else{
			this.expandEl = options.dataTreeExpandElement;
		***REMOVED***
	***REMOVED***else{
		this.expandEl = document.createElement("div");
		this.expandEl.classList.add("tabulator-data-tree-control");
		this.expandEl.tabIndex = 0;
		this.expandEl.innerHTML = "<div class='tabulator-data-tree-control-expand'></div>";
	***REMOVED***


	switch(typeof options.dataTreeStartExpanded){
		case "boolean":
		this.startOpen = function(row, index){
			return options.dataTreeStartExpanded;
		***REMOVED***;
		break;

		case "function":
		this.startOpen = options.dataTreeStartExpanded;
		break;

		default:
		this.startOpen = function(row, index){
			return options.dataTreeStartExpanded[index];
		***REMOVED***;
		break;
	***REMOVED***
***REMOVED***;

DataTree.prototype.initializeRow = function(row){
	var childArray = row.getData()[this.field];
	var isArray = Array.isArray(childArray);

	var children = isArray || (!isArray && typeof childArray === "object" && childArray !== null);

	if(!children && row.modules.dataTree && row.modules.dataTree.branchEl){
		row.modules.dataTree.branchEl.parentNode.removeChild(row.modules.dataTree.branchEl);
	***REMOVED***

	if(!children && row.modules.dataTree && row.modules.dataTree.controlEl){
		row.modules.dataTree.controlEl.parentNode.removeChild(row.modules.dataTree.controlEl);
	***REMOVED***


	row.modules.dataTree = {
		index: row.modules.dataTree ? row.modules.dataTree.index : 0,
		open: children ? (row.modules.dataTree ? row.modules.dataTree.open :this.startOpen(row.getComponent(), 0)) : false,
		controlEl: row.modules.dataTree && children ? row.modules.dataTree.controlEl : false,
		branchEl: row.modules.dataTree && children ? row.modules.dataTree.branchEl : false,
		parent: row.modules.dataTree ? row.modules.dataTree.parent : false,
		children:children,
	***REMOVED***;
***REMOVED***;


DataTree.prototype.layoutRow = function(row){
	var cell = this.elementField ? row.getCell(this.elementField) : row.getCells()[0],
	el = cell.getElement(),
	config = row.modules.dataTree;

	if(config.branchEl){
		if(config.branchEl.parentNode){
			config.branchEl.parentNode.removeChild(config.branchEl);
		***REMOVED***
		config.branchEl = false;
	***REMOVED***

	if(config.controlEl){
		if(config.controlEl.parentNode){
			config.controlEl.parentNode.removeChild(config.controlEl);
		***REMOVED***
		config.controlEl = false;
	***REMOVED***

	this.generateControlElement(row, el);

	row.element.classList.add("tabulator-tree-level-" + config.index);

	if(config.index){
		if(this.branchEl){
			config.branchEl = this.branchEl.cloneNode(true);
			el.insertBefore(config.branchEl, el.firstChild);
			config.branchEl.style.marginLeft = (((config.branchEl.offsetWidth + config.branchEl.style.marginRight)***REMOVED*** (config.index - 1)) + (config.index***REMOVED*** this.indent)) + "px";
		***REMOVED***else{
			el.style.paddingLeft = parseInt(window.getComputedStyle(el, null).getPropertyValue('padding-left')) + (config.index***REMOVED*** this.indent) + "px";
		***REMOVED***
	***REMOVED***
***REMOVED***;

DataTree.prototype.generateControlElement = function(row, el){
	var config = row.modules.dataTree,
	el = el || row.getCells()[0].getElement(),
	oldControl = config.controlEl;

	if(config.children !== false){

		if(config.open){
			config.controlEl = this.collapseEl.cloneNode(true);
			config.controlEl.addEventListener("click", (e) => {
				e.stopPropagation();
				this.collapseRow(row);
			***REMOVED***);
		***REMOVED***else{
			config.controlEl = this.expandEl.cloneNode(true);
			config.controlEl.addEventListener("click", (e) => {
				e.stopPropagation();
				this.expandRow(row);
			***REMOVED***);
		***REMOVED***

		config.controlEl.addEventListener("mousedown", (e) => {
			e.stopPropagation();
		***REMOVED***);

		if(oldControl && oldControl.parentNode === el){
			oldControl.parentNode.replaceChild(config.controlEl,oldControl);
		***REMOVED***else{
			el.insertBefore(config.controlEl, el.firstChild);
		***REMOVED***
	***REMOVED***
***REMOVED***;

DataTree.prototype.setDisplayIndex = function (index) {
	this.displayIndex = index;
***REMOVED***;

DataTree.prototype.getDisplayIndex = function () {
	return this.displayIndex;
***REMOVED***;

DataTree.prototype.getRows = function(rows){
	var output = [];

	rows.forEach((row, i) => {
		var config, children;

		output.push(row);

		if(row instanceof Row){

			config = row.modules.dataTree.children;

			if(!config.index && config.children !== false){
				children = this.getChildren(row);

				children.forEach((child) => {
					output.push(child);
				***REMOVED***);
			***REMOVED***
		***REMOVED***
	***REMOVED***);

	return output;
***REMOVED***;


DataTree.prototype.getChildren = function(row){
	var config = row.modules.dataTree,
	children = [],
	output = [];

	if(config.children !== false && config.open){
		if(!Array.isArray(config.children)){
			config.children = this.generateChildren(row);
		***REMOVED***

		if(this.table.modExists("filter")){
			children = this.table.modules.filter.filter(config.children);
		***REMOVED***else{
			children = config.children;
		***REMOVED***

		if(this.table.modExists("sort")){
			this.table.modules.sort.sort(children);
		***REMOVED***

		children.forEach((child) => {
			output.push(child);

			var subChildren = this.getChildren(child);

			subChildren.forEach((sub) => {
				output.push(sub);
			***REMOVED***);
		***REMOVED***);
	***REMOVED***

	return output;
***REMOVED***;


DataTree.prototype.generateChildren = function(row){
	var children = [];

	var childArray = row.getData()[this.field];

	if(!Array.isArray(childArray)){
		childArray = [childArray];
	***REMOVED***

	childArray.forEach((childData) => {
		var childRow = new Row(childData || {***REMOVED***, this.table.rowManager);
		childRow.modules.dataTree.index = row.modules.dataTree.index + 1;
		childRow.modules.dataTree.parent = row;
		if(childRow.modules.dataTree.children){
			childRow.modules.dataTree.open = this.startOpen(childRow.getComponent(), childRow.modules.dataTree.index);
		***REMOVED***
		children.push(childRow);
	***REMOVED***);

	return children;
***REMOVED***;



DataTree.prototype.expandRow = function(row, silent){
	var config = row.modules.dataTree;

	if(config.children !== false){
		config.open = true;

		row.reinitialize();

		this.table.rowManager.refreshActiveData("tree", false, true);

		this.table.options.dataTreeRowExpanded(row.getComponent(), row.modules.dataTree.index);
	***REMOVED***
***REMOVED***;

DataTree.prototype.collapseRow = function(row){
	var config = row.modules.dataTree;

	if(config.children !== false){
		config.open = false;

		row.reinitialize();

		this.table.rowManager.refreshActiveData("tree", false, true);

		this.table.options.dataTreeRowCollapsed(row.getComponent(), row.modules.dataTree.index);
	***REMOVED***
***REMOVED***;

DataTree.prototype.toggleRow = function(row){
	var config = row.modules.dataTree;

	if(config.children !== false){
		if(config.open){
			this.collapseRow(row);
		***REMOVED***else{
			this.expandRow(row);
		***REMOVED***
	***REMOVED***
***REMOVED***;

DataTree.prototype.getTreeParent = function(row){
	return row.modules.dataTree.parent ? row.modules.dataTree.parent.getComponent() : false;
***REMOVED***;


DataTree.prototype.getFilteredTreeChildren = function(row){
	var config = row.modules.dataTree,
	output = [], children;

	if(config.children){

		if(!Array.isArray(config.children)){
			config.children = this.generateChildren(row);
		***REMOVED***

		if(this.table.modExists("filter")){
			children = this.table.modules.filter.filter(config.children);
		***REMOVED***else{
			children = config.children;
		***REMOVED***

		children.forEach((childRow) => {
			if(childRow instanceof Row){
				output.push(childRow);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	return output;
***REMOVED***;

DataTree.prototype.getTreeChildren = function(row){
	var config = row.modules.dataTree,
	output = [];

	if(config.children){

		if(!Array.isArray(config.children)){
			config.children = this.generateChildren(row);
		***REMOVED***

		config.children.forEach((childRow) => {
			if(childRow instanceof Row){
				output.push(childRow.getComponent());
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	return output;
***REMOVED***;


DataTree.prototype.checkForRestyle = function(cell){
	if(!cell.row.cells.indexOf(cell)){
		cell.row.reinitialize();
	***REMOVED***
***REMOVED***;

DataTree.prototype.getChildField = function(){
	return this.field;
***REMOVED***;

DataTree.prototype.redrawNeeded = function(data){
	return (this.field ? typeof data[this.field] !== "undefined" : false) || (this.elementField ? typeof data[this.elementField] !== "undefined" : false);
***REMOVED***;

Tabulator.prototype.registerModule("dataTree", DataTree);
