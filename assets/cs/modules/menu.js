/* Tabulator v4.6.2 (c) Oliver Folkerd***REMOVED***/

var Menu = function Menu(table) {
	this.table = table; //hold Tabulator object
	this.menuEl = false;
	this.blurEvent = this.hideMenu.bind(this);
***REMOVED***;

Menu.prototype.initializeColumnHeader = function (column) {
	var _this = this;

	var headerMenuEl;

	if (column.definition.headerContextMenu) {
		column.getElement().addEventListener("contextmenu", function (e) {
			var menu = typeof column.definition.headerContextMenu == "function" ? column.definition.headerContextMenu() : column.definition.headerContextMenu;

			e.preventDefault();

			_this.loadMenu(e, column, menu);
		***REMOVED***);
	***REMOVED***

	if (column.definition.headerMenu) {

		headerMenuEl = document.createElement("span");
		headerMenuEl.classList.add("tabulator-header-menu-button");
		headerMenuEl.innerHTML = "&vellip;";

		headerMenuEl.addEventListener("click", function (e) {
			var menu = typeof column.definition.headerMenu == "function" ? column.definition.headerMenu() : column.definition.headerMenu;
			e.stopPropagation();
			e.preventDefault();

			_this.loadMenu(e, column, menu);
		***REMOVED***);

		column.titleElement.insertBefore(headerMenuEl, column.titleElement.firstChild);
	***REMOVED***
***REMOVED***;

Menu.prototype.initializeCell = function (cell) {
	var _this2 = this;

	cell.getElement().addEventListener("contextmenu", function (e) {
		var menu = typeof cell.column.definition.contextMenu == "function" ? cell.column.definition.contextMenu() : cell.column.definition.contextMenu;

		e.preventDefault();

		_this2.loadMenu(e, cell, menu);
	***REMOVED***);
***REMOVED***;

Menu.prototype.initializeRow = function (row) {
	var _this3 = this;

	row.getElement().addEventListener("contextmenu", function (e) {
		var menu = typeof _this3.table.options.rowContextMenu == "function" ? _this3.table.options.rowContextMenu() : _this3.table.options.rowContextMenu;

		e.preventDefault();

		_this3.loadMenu(e, row, menu);
	***REMOVED***);
***REMOVED***;

Menu.prototype.loadMenu = function (e, component, menu) {
	var _this4 = this;

	var docHeight = Math.max(document.body.offsetHeight, window.innerHeight);

	//abort if no menu set
	if (!menu || !menu.length) {
		return;
	***REMOVED***

	this.hideMenu();

	this.menuEl = document.createElement("div");
	this.menuEl.classList.add("tabulator-menu");

	menu.forEach(function (item) {
		var itemEl = document.createElement("div");
		var label = item.label;
		var disabled = item.disabled;

		if (item.separator) {
			itemEl.classList.add("tabulator-menu-separator");
		***REMOVED*** else {
			itemEl.classList.add("tabulator-menu-item");

			if (typeof label == "function") {
				label = label(component.getComponent());
			***REMOVED***

			if (label instanceof Node) {
				itemEl.appendChild(label);
			***REMOVED*** else {
				itemEl.innerHTML = label;
			***REMOVED***

			if (typeof disabled == "function") {
				disabled = disabled(component.getComponent());
			***REMOVED***

			if (disabled) {
				itemEl.classList.add("tabulator-menu-item-disabled");
				itemEl.addEventListener("click", function (e) {
					e.stopPropagation();
				***REMOVED***);
			***REMOVED*** else {
				itemEl.addEventListener("click", function (e) {
					_this4.hideMenu();
					item.action(e, component.getComponent());
				***REMOVED***);
			***REMOVED***
		***REMOVED***

		_this4.menuEl.appendChild(itemEl);
	***REMOVED***);

	this.menuEl.style.top = e.pageY + "px";
	this.menuEl.style.left = e.pageX + "px";

	document.body.addEventListener("click", this.blurEvent);
	this.table.rowManager.element.addEventListener("scroll", this.blurEvent);

	setTimeout(function () {
		document.body.addEventListener("contextmenu", _this4.blurEvent);
	***REMOVED***, 100);

	document.body.appendChild(this.menuEl);

	//move menu to start on right edge if it is too close to the edge of the screen
	if (e.pageX + this.menuEl.offsetWidth >= document.body.offsetWidth) {
		this.menuEl.style.left = "";
		this.menuEl.style.right = document.body.offsetWidth - e.pageX + "px";
	***REMOVED***

	//move menu to start on bottom edge if it is too close to the edge of the screen
	if (e.pageY + this.menuEl.offsetHeight >= docHeight) {
		this.menuEl.style.top = "";
		this.menuEl.style.bottom = docHeight - e.pageY + "px";
	***REMOVED***
***REMOVED***;

Menu.prototype.hideMenu = function () {
	if (this.menuEl.parentNode) {
		this.menuEl.parentNode.removeChild(this.menuEl);
	***REMOVED***

	if (this.blurEvent) {
		document.body.removeEventListener("click", this.blurEvent);
		document.body.removeEventListener("contextmenu", this.blurEvent);
		this.table.rowManager.element.removeEventListener("scroll", this.blurEvent);
	***REMOVED***
***REMOVED***;

//default accessors
Menu.prototype.menus = {***REMOVED***;

Tabulator.prototype.registerModule("menu", Menu);