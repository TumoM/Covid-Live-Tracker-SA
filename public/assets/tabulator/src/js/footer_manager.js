var FooterManager = function(table){
	this.table = table;
	this.active = false;
	this.element = this.createElement(); //containing element
	this.external = false;
	this.links = [];

	this._initialize();
***REMOVED***;

FooterManager.prototype.createElement = function (){
	var el = document.createElement("div");

	el.classList.add("tabulator-footer");

	return el;
***REMOVED***;

FooterManager.prototype._initialize = function(element){
	if(this.table.options.footerElement){

		switch(typeof this.table.options.footerElement){
			case "string":

			if(this.table.options.footerElement[0] === "<"){
				this.element.innerHTML = this.table.options.footerElement;
			***REMOVED***else{
				this.external = true;
				this.element = document.querySelector(this.table.options.footerElement);
			***REMOVED***
			break;
			default:
			this.element = this.table.options.footerElement;
			break;
		***REMOVED***

	***REMOVED***
***REMOVED***;

FooterManager.prototype.getElement = function(){
	return this.element;
***REMOVED***;


FooterManager.prototype.append = function(element, parent){
	this.activate(parent);

	this.element.appendChild(element);
	this.table.rowManager.adjustTableSize();
***REMOVED***;

FooterManager.prototype.prepend = function(element, parent){
	this.activate(parent);

	this.element.insertBefore(element, this.element.firstChild);
	this.table.rowManager.adjustTableSize();
***REMOVED***;

FooterManager.prototype.remove = function(element){
	element.parentNode.removeChild(element);
	this.deactivate();
***REMOVED***;

FooterManager.prototype.deactivate = function(force){
	if(!this.element.firstChild || force){
		if(!this.external){
			this.element.parentNode.removeChild(this.element);
		***REMOVED***
		this.active = false;
	***REMOVED***

	// this.table.rowManager.adjustTableSize();
***REMOVED***;

FooterManager.prototype.activate = function(parent){
	if(!this.active){
		this.active = true;
		if(!this.external){
			this.table.element.appendChild(this.getElement());
			this.table.element.style.display = '';
		***REMOVED***
	***REMOVED***

	if(parent){
		this.links.push(parent);
	***REMOVED***
***REMOVED***;

FooterManager.prototype.redraw = function(){
	this.links.forEach(function(link){
		link.footerRedraw();
	***REMOVED***);
***REMOVED***;