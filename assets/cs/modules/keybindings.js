var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; ***REMOVED*** : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; ***REMOVED***;

/* Tabulator v4.6.2 (c) Oliver Folkerd***REMOVED***/

var Keybindings = function Keybindings(table) {
	this.table = table; //hold Tabulator object
	this.watchKeys = null;
	this.pressedKeys = null;
	this.keyupBinding = false;
	this.keydownBinding = false;
***REMOVED***;

Keybindings.prototype.initialize = function () {
	var bindings = this.table.options.keybindings,
	    mergedBindings = {***REMOVED***;

	this.watchKeys = {***REMOVED***;
	this.pressedKeys = [];

	if (bindings !== false) {

		for (var key in this.bindings) {
			mergedBindings[key] = this.bindings[key];
		***REMOVED***

		if (Object.keys(bindings).length) {

			for (var _key in bindings) {
				mergedBindings[_key] = bindings[_key];
			***REMOVED***
		***REMOVED***

		this.mapBindings(mergedBindings);
		this.bindEvents();
	***REMOVED***
***REMOVED***;

Keybindings.prototype.mapBindings = function (bindings) {
	var _this = this;

	var self = this;

	var _loop = function _loop(key) {

		if (_this.actions[key]) {

			if (bindings[key]) {

				if (_typeof(bindings[key]) !== "object") {
					bindings[key] = [bindings[key]];
				***REMOVED***

				bindings[key].forEach(function (binding) {
					self.mapBinding(key, binding);
				***REMOVED***);
			***REMOVED***
		***REMOVED*** else {
			console.warn("Key Binding Error - no such action:", key);
		***REMOVED***
	***REMOVED***;

	for (var key in bindings) {
		_loop(key);
	***REMOVED***
***REMOVED***;

Keybindings.prototype.mapBinding = function (action, symbolsList) {
	var self = this;

	var binding = {
		action: this.actions[action],
		keys: [],
		ctrl: false,
		shift: false,
		meta: false
	***REMOVED***;

	var symbols = symbolsList.toString().toLowerCase().split(" ").join("").split("+");

	symbols.forEach(function (symbol) {
		switch (symbol) {
			case "ctrl":
				binding.ctrl = true;
				break;

			case "shift":
				binding.shift = true;
				break;

			case "meta":
				binding.meta = true;
				break;

			default:
				symbol = parseInt(symbol);
				binding.keys.push(symbol);

				if (!self.watchKeys[symbol]) {
					self.watchKeys[symbol] = [];
				***REMOVED***

				self.watchKeys[symbol].push(binding);
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Keybindings.prototype.bindEvents = function () {
	var self = this;

	this.keyupBinding = function (e) {
		var code = e.keyCode;
		var bindings = self.watchKeys[code];

		if (bindings) {

			self.pressedKeys.push(code);

			bindings.forEach(function (binding) {
				self.checkBinding(e, binding);
			***REMOVED***);
		***REMOVED***
	***REMOVED***;

	this.keydownBinding = function (e) {
		var code = e.keyCode;
		var bindings = self.watchKeys[code];

		if (bindings) {

			var index = self.pressedKeys.indexOf(code);

			if (index > -1) {
				self.pressedKeys.splice(index, 1);
			***REMOVED***
		***REMOVED***
	***REMOVED***;

	this.table.element.addEventListener("keydown", this.keyupBinding);

	this.table.element.addEventListener("keyup", this.keydownBinding);
***REMOVED***;

Keybindings.prototype.clearBindings = function () {
	if (this.keyupBinding) {
		this.table.element.removeEventListener("keydown", this.keyupBinding);
	***REMOVED***

	if (this.keydownBinding) {
		this.table.element.removeEventListener("keyup", this.keydownBinding);
	***REMOVED***
***REMOVED***;

Keybindings.prototype.checkBinding = function (e, binding) {
	var self = this,
	    match = true;

	if (e.ctrlKey == binding.ctrl && e.shiftKey == binding.shift && e.metaKey == binding.meta) {
		binding.keys.forEach(function (key) {
			var index = self.pressedKeys.indexOf(key);

			if (index == -1) {
				match = false;
			***REMOVED***
		***REMOVED***);

		if (match) {
			binding.action.call(self, e);
		***REMOVED***

		return true;
	***REMOVED***

	return false;
***REMOVED***;

//default bindings
Keybindings.prototype.bindings = {
	navPrev: "shift + 9",
	navNext: 9,
	navUp: 38,
	navDown: 40,
	scrollPageUp: 33,
	scrollPageDown: 34,
	scrollToStart: 36,
	scrollToEnd: 35,
	undo: "ctrl + 90",
	redo: "ctrl + 89",
	copyToClipboard: "ctrl + 67"
***REMOVED***;

//default actions
Keybindings.prototype.actions = {
	keyBlock: function keyBlock(e) {
		e.stopPropagation();
		e.preventDefault();
	***REMOVED***,
	scrollPageUp: function scrollPageUp(e) {
		var rowManager = this.table.rowManager,
		    newPos = rowManager.scrollTop - rowManager.height,
		    scrollMax = rowManager.element.scrollHeight;

		e.preventDefault();

		if (rowManager.displayRowsCount) {
			if (newPos >= 0) {
				rowManager.element.scrollTop = newPos;
			***REMOVED*** else {
				rowManager.scrollToRow(rowManager.getDisplayRows()[0]);
			***REMOVED***
		***REMOVED***

		this.table.element.focus();
	***REMOVED***,
	scrollPageDown: function scrollPageDown(e) {
		var rowManager = this.table.rowManager,
		    newPos = rowManager.scrollTop + rowManager.height,
		    scrollMax = rowManager.element.scrollHeight;

		e.preventDefault();

		if (rowManager.displayRowsCount) {
			if (newPos <= scrollMax) {
				rowManager.element.scrollTop = newPos;
			***REMOVED*** else {
				rowManager.scrollToRow(rowManager.getDisplayRows()[rowManager.displayRowsCount - 1]);
			***REMOVED***
		***REMOVED***

		this.table.element.focus();
	***REMOVED***,
	scrollToStart: function scrollToStart(e) {
		var rowManager = this.table.rowManager;

		e.preventDefault();

		if (rowManager.displayRowsCount) {
			rowManager.scrollToRow(rowManager.getDisplayRows()[0]);
		***REMOVED***

		this.table.element.focus();
	***REMOVED***,
	scrollToEnd: function scrollToEnd(e) {
		var rowManager = this.table.rowManager;

		e.preventDefault();

		if (rowManager.displayRowsCount) {
			rowManager.scrollToRow(rowManager.getDisplayRows()[rowManager.displayRowsCount - 1]);
		***REMOVED***

		this.table.element.focus();
	***REMOVED***,
	navPrev: function navPrev(e) {
		var cell = false;

		if (this.table.modExists("edit")) {
			cell = this.table.modules.edit.currentCell;

			if (cell) {
				e.preventDefault();
				cell.nav().prev();
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	navNext: function navNext(e) {
		var cell = false;
		var newRow = this.table.options.tabEndNewRow;
		var nav;

		if (this.table.modExists("edit")) {
			cell = this.table.modules.edit.currentCell;

			if (cell) {
				e.preventDefault();

				nav = cell.nav();

				if (!nav.next()) {
					if (newRow) {

						cell.getElement().firstChild.blur();

						if (newRow === true) {
							newRow = this.table.addRow({***REMOVED***);
						***REMOVED*** else {
							if (typeof newRow == "function") {
								newRow = this.table.addRow(newRow(cell.row.getComponent()));
							***REMOVED*** else {
								newRow = this.table.addRow(newRow);
							***REMOVED***
						***REMOVED***

						newRow.then(function () {
							setTimeout(function () {
								nav.next();
							***REMOVED***);
						***REMOVED***);
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	navLeft: function navLeft(e) {
		var cell = false;

		if (this.table.modExists("edit")) {
			cell = this.table.modules.edit.currentCell;

			if (cell) {
				e.preventDefault();
				cell.nav().left();
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	navRight: function navRight(e) {
		var cell = false;

		if (this.table.modExists("edit")) {
			cell = this.table.modules.edit.currentCell;

			if (cell) {
				e.preventDefault();
				cell.nav().right();
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	navUp: function navUp(e) {
		var cell = false;

		if (this.table.modExists("edit")) {
			cell = this.table.modules.edit.currentCell;

			if (cell) {
				e.preventDefault();
				cell.nav().up();
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	navDown: function navDown(e) {
		var cell = false;

		if (this.table.modExists("edit")) {
			cell = this.table.modules.edit.currentCell;

			if (cell) {
				e.preventDefault();
				cell.nav().down();
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	undo: function undo(e) {
		var cell = false;
		if (this.table.options.history && this.table.modExists("history") && this.table.modExists("edit")) {

			cell = this.table.modules.edit.currentCell;

			if (!cell) {
				e.preventDefault();
				this.table.modules.history.undo();
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	redo: function redo(e) {
		var cell = false;
		if (this.table.options.history && this.table.modExists("history") && this.table.modExists("edit")) {

			cell = this.table.modules.edit.currentCell;

			if (!cell) {
				e.preventDefault();
				this.table.modules.history.redo();
			***REMOVED***
		***REMOVED***
	***REMOVED***,

	copyToClipboard: function copyToClipboard(e) {
		if (!this.table.modules.edit.currentCell) {
			if (this.table.modExists("clipboard", true)) {
				this.table.modules.clipboard.copy(false, true);
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

Tabulator.prototype.registerModule("keybindings", Keybindings);