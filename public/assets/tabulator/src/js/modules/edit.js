var Edit = function(table){
	this.table = table; //hold Tabulator object
	this.currentCell = false; //hold currently editing cell
	this.mouseClick = false; //hold mousedown state to prevent click binding being overriden by editor opening
	this.recursionBlock = false; //prevent focus recursion
	this.invalidEdit = false;
***REMOVED***;


//initialize column editor
Edit.prototype.initializeColumn = function(column){
	var self = this,
	config = {
		editor:false,
		blocked:false,
		check:column.definition.editable,
		params:column.definition.editorParams || {***REMOVED***
	***REMOVED***;

	//set column editor
	switch(typeof column.definition.editor){
		case "string":

		if(column.definition.editor === "tick"){
			column.definition.editor = "tickCross";
			console.warn("DEPRECATION WARNING - the tick editor has been deprecated, please use the tickCross editor");
		***REMOVED***

		if(self.editors[column.definition.editor]){
			config.editor = self.editors[column.definition.editor];
		***REMOVED***else{
			console.warn("Editor Error - No such editor found: ", column.definition.editor);
		***REMOVED***
		break;

		case "function":
		config.editor = column.definition.editor;
		break;

		case "boolean":

		if(column.definition.editor === true){

			if(typeof column.definition.formatter !== "function"){

				if(column.definition.formatter === "tick"){
					column.definition.formatter = "tickCross";
					console.warn("DEPRECATION WARNING - the tick editor has been deprecated, please use the tickCross editor");
				***REMOVED***

				if(self.editors[column.definition.formatter]){
					config.editor = self.editors[column.definition.formatter];
				***REMOVED***else{
					config.editor = self.editors["input"];
				***REMOVED***
			***REMOVED***else{
				console.warn("Editor Error - Cannot auto lookup editor for a custom formatter: ", column.definition.formatter);
			***REMOVED***
		***REMOVED***
		break;
	***REMOVED***

	if(config.editor){
		column.modules.edit = config;
	***REMOVED***
***REMOVED***;

Edit.prototype.getCurrentCell = function(){
	return this.currentCell ? this.currentCell.getComponent() : false;
***REMOVED***;

Edit.prototype.clearEditor = function(){
	var cell = this.currentCell,
	cellEl;

	this.invalidEdit = false;

	if(cell){
		this.currentCell = false;

		cellEl = cell.getElement();
		cellEl.classList.remove("tabulator-validation-fail");
		cellEl.classList.remove("tabulator-editing");
		while(cellEl.firstChild) cellEl.removeChild(cellEl.firstChild);

		cell.row.getElement().classList.remove("tabulator-row-editing");
	***REMOVED***
***REMOVED***;

Edit.prototype.cancelEdit = function(){

	if(this.currentCell){
		var cell = this.currentCell;
		var component = this.currentCell.getComponent();

		this.clearEditor();
		cell.setValueActual(cell.getValue());
		cell.cellRendered();

		if(cell.column.cellEvents.cellEditCancelled){
			cell.column.cellEvents.cellEditCancelled.call(this.table, component);
		***REMOVED***

		this.table.options.cellEditCancelled.call(this.table, component);
	***REMOVED***
***REMOVED***;

//return a formatted value for a cell
Edit.prototype.bindEditor = function(cell){
	var self = this,
	element = cell.getElement();

	element.setAttribute("tabindex", 0);

	element.addEventListener("click", function(e){
		if(!element.classList.contains("tabulator-editing")){
			element.focus({preventScroll: true***REMOVED***);
		***REMOVED***
	***REMOVED***);

	element.addEventListener("mousedown", function(e){
		self.mouseClick = true;
	***REMOVED***);

	element.addEventListener("focus", function(e){
		if(!self.recursionBlock){
			self.edit(cell, e, false);
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Edit.prototype.focusCellNoEvent = function(cell, block){
	this.recursionBlock = true;
	if(!(block && this.table.browser === "ie")){
		cell.getElement().focus({preventScroll: true***REMOVED***);
	***REMOVED***
	this.recursionBlock = false;
***REMOVED***;

Edit.prototype.editCell = function(cell, forceEdit){
	this.focusCellNoEvent(cell);
	this.edit(cell, false, forceEdit);
***REMOVED***;


Edit.prototype.focusScrollAdjust = function(cell){
	if(this.table.rowManager.getRenderMode() == "virtual"){
		var topEdge = this.table.rowManager.element.scrollTop,
		bottomEdge = this.table.rowManager.element.clientHeight + this.table.rowManager.element.scrollTop,
		rowEl = cell.row.getElement(),
		offset = rowEl.offsetTop;

		if(rowEl.offsetTop < topEdge){
			this.table.rowManager.element.scrollTop -= (topEdge - rowEl.offsetTop);
		***REMOVED***else{
			if(rowEl.offsetTop + rowEl.offsetHeight  > bottomEdge){
				this.table.rowManager.element.scrollTop += (rowEl.offsetTop + rowEl.offsetHeight - bottomEdge);
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;


Edit.prototype.edit = function(cell, e, forceEdit){
	var self = this,
	allowEdit = true,
	rendered = function(){***REMOVED***,
	element = cell.getElement(),
	cellEditor, component, params;

	//prevent editing if another cell is refusing to leave focus (eg. validation fail)
	if(this.currentCell){
		if(!this.invalidEdit){
			this.cancelEdit();
		***REMOVED***
		return;
	***REMOVED***

	//handle successfull value change
	function success(value){
		if(self.currentCell === cell){
			var valid = true;

			if(cell.column.modules.validate && self.table.modExists("validate")){
				valid = self.table.modules.validate.validate(cell.column.modules.validate, cell.getComponent(), value);
			***REMOVED***

			if(valid === true){
				self.clearEditor();
				cell.setValue(value, true);

				if(self.table.options.dataTree && self.table.modExists("dataTree")){
					self.table.modules.dataTree.checkForRestyle(cell);
				***REMOVED***

				return true;
			***REMOVED***else{
				self.invalidEdit = true;
				element.classList.add("tabulator-validation-fail");
				self.focusCellNoEvent(cell, true);
				rendered();
				self.table.options.validationFailed.call(self.table, cell.getComponent(), value, valid);

				return false;
			***REMOVED***
		***REMOVED***else{
			// console.warn("Edit Success Error - cannot call success on a cell that is no longer being edited");
		***REMOVED***
	***REMOVED***

	//handle aborted edit
	function cancel(){
		if(self.currentCell === cell){
			self.cancelEdit();

			if(self.table.options.dataTree && self.table.modExists("dataTree")){
				self.table.modules.dataTree.checkForRestyle(cell);
			***REMOVED***
		***REMOVED***else{
			// console.warn("Edit Success Error - cannot call cancel on a cell that is no longer being edited");
		***REMOVED***
	***REMOVED***

	function onRendered(callback){
		rendered = callback;
	***REMOVED***

	if(!cell.column.modules.edit.blocked){
		if(e){
			e.stopPropagation();
		***REMOVED***

		switch(typeof cell.column.modules.edit.check){
			case "function":
			allowEdit = cell.column.modules.edit.check(cell.getComponent());
			break;

			case "boolean":
			allowEdit = cell.column.modules.edit.check;
			break;
		***REMOVED***

		if(allowEdit || forceEdit){

			self.cancelEdit();

			self.currentCell = cell;

			this.focusScrollAdjust(cell);

			component = cell.getComponent();

			if(this.mouseClick){
				this.mouseClick = false;

				if(cell.column.cellEvents.cellClick){
					cell.column.cellEvents.cellClick.call(this.table, e, component);
				***REMOVED***
			***REMOVED***

			if(cell.column.cellEvents.cellEditing){
				cell.column.cellEvents.cellEditing.call(this.table, component);
			***REMOVED***

			self.table.options.cellEditing.call(this.table, component);

			params = typeof cell.column.modules.edit.params === "function" ? cell.column.modules.edit.params(component) : cell.column.modules.edit.params;

			cellEditor = cell.column.modules.edit.editor.call(self, component, onRendered, success, cancel, params);

			//if editor returned, add to DOM, if false, abort edit
			if(cellEditor !== false){

				if(cellEditor instanceof Node){
					element.classList.add("tabulator-editing");
					cell.row.getElement().classList.add("tabulator-row-editing");
					while(element.firstChild) element.removeChild(element.firstChild);
					element.appendChild(cellEditor);

					//trigger onRendered Callback
					rendered();

					//prevent editing from triggering rowClick event
					var children = element.children;

					for (var i = 0; i < children.length; i++) {
						children[i].addEventListener("click", function(e){
							e.stopPropagation();
						***REMOVED***);
					***REMOVED***
				***REMOVED***else{
					console.warn("Edit Error - Editor should return an instance of Node, the editor returned:", cellEditor);
					element.blur();
					return false;
				***REMOVED***

			***REMOVED***else{
				element.blur();
				return false;
			***REMOVED***

			return true;
		***REMOVED***else{
			this.mouseClick = false;
			element.blur();
			return false;
		***REMOVED***
	***REMOVED***else{
		this.mouseClick = false;
		element.blur();
		return false;
	***REMOVED***
***REMOVED***;

Edit.prototype.maskInput = function(el, options){
	var mask = options.mask,
	maskLetter = typeof options.maskLetterChar !== "undefined" ? options.maskLetterChar : "A",
	maskNumber = typeof options.maskNumberChar !== "undefined" ? options.maskNumberChar : "9",
	maskWildcard = typeof options.maskWildcardChar !== "undefined" ? options.maskWildcardChar : "*",
	success = false;

	function fillSymbols(index){
		var symbol = mask[index];
		if(typeof symbol !== "undefined" && symbol !== maskWildcard && symbol !== maskLetter && symbol !== maskNumber){
			el.value = el.value + "" + symbol;
			fillSymbols(index+1);
		***REMOVED***
	***REMOVED***

	el.addEventListener("keydown", (e) => {
		var index = el.value.length,
		char = e.key;

		if(e.keyCode > 46){
			if(index >= mask.length){
				e.preventDefault();
				e.stopPropagation();
				success = false;
				return false;
			***REMOVED***else{
				switch(mask[index]){
					case maskLetter:
					if(char.toUpperCase() == char.toLowerCase()){
						e.preventDefault();
						e.stopPropagation();
						success = false;
						return false;
					***REMOVED***
					break;

					case maskNumber:
					if(isNaN(char)){
						e.preventDefault();
						e.stopPropagation();
						success = false;
						return false;
					***REMOVED***
					break;

					case maskWildcard:
					break;

					default:
					if(char !== mask[index]){
						e.preventDefault();
						e.stopPropagation();
						success = false;
						return false;
					***REMOVED***
				***REMOVED***
			***REMOVED***

			success = true;
		***REMOVED***

		return;
	***REMOVED***);

	el.addEventListener("keyup", (e) => {
		if(e.keyCode > 46){
			if(options.maskAutoFill){
				fillSymbols(el.value.length);
			***REMOVED***
		***REMOVED***
	***REMOVED***);


	if(!el.placeholder){
		el.placeholder = mask;
	***REMOVED***

	if(options.maskAutoFill){
		fillSymbols(el.value.length);
	***REMOVED***
***REMOVED***;

//default data editors
Edit.prototype.editors = {

	//input element
	input:function(cell, onRendered, success, cancel, editorParams){

		//create and style input
		var cellValue = cell.getValue(),
		input = document.createElement("input");

		input.setAttribute("type", editorParams.search ? "search" : "text");

		input.style.padding = "4px";
		input.style.width = "100%";
		input.style.boxSizing = "border-box";

		if(editorParams.elementAttributes && typeof editorParams.elementAttributes == "object"){
			for (let key in editorParams.elementAttributes){
				if(key.charAt(0) == "+"){
					key = key.slice(1);
					input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
				***REMOVED***else{
					input.setAttribute(key, editorParams.elementAttributes[key]);
				***REMOVED***
			***REMOVED***
		***REMOVED***

		input.value = typeof cellValue !== "undefined" ? cellValue : "";

		onRendered(function(){
			input.focus({preventScroll: true***REMOVED***);
			input.style.height = "100%";
		***REMOVED***);

		function onChange(e){
			if(((cellValue === null || typeof cellValue === "undefined") && input.value !== "") || input.value !== cellValue){
				if(success(input.value)){
					cellValue = input.value; //persist value if successfully validated incase editor is used as header filter
				***REMOVED***
			***REMOVED***else{
				cancel();
			***REMOVED***
		***REMOVED***

		//submit new value on blur or change
		input.addEventListener("change", onChange);
		input.addEventListener("blur", onChange);

		//submit new value on enter
		input.addEventListener("keydown", function(e){
			switch(e.keyCode){
				// case 9:
				case 13:
				onChange(e);
				break;

				case 27:
				cancel();
				break;
			***REMOVED***
		***REMOVED***);

		if(editorParams.mask){
			this.table.modules.edit.maskInput(input, editorParams);
		***REMOVED***

		return input;
	***REMOVED***,

	//resizable text area element
	textarea:function(cell, onRendered, success, cancel, editorParams){
		var self = this,
		cellValue = cell.getValue(),
		vertNav = editorParams.verticalNavigation || "hybrid",
		value = String(cellValue !== null && typeof cellValue !== "undefined"  ? cellValue : ""),
		count = (value.match(/(?:\r\n|\r|\n)/g) || []).length + 1,
		input = document.createElement("textarea"),
		scrollHeight = 0;

        //create and style input
        input.style.display = "block";
        input.style.padding = "2px";
        input.style.height = "100%";
        input.style.width = "100%";
        input.style.boxSizing = "border-box";
        input.style.whiteSpace = "pre-wrap";
        input.style.resize = "none";

        if(editorParams.elementAttributes && typeof editorParams.elementAttributes == "object"){
        	for (let key in editorParams.elementAttributes){
        		if(key.charAt(0) == "+"){
        			key = key.slice(1);
        			input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
        		***REMOVED***else{
        			input.setAttribute(key, editorParams.elementAttributes[key]);
        		***REMOVED***
        	***REMOVED***
      ***REMOVED***

        input.value = value;

        onRendered(function(){
        	input.focus({preventScroll: true***REMOVED***);
        	input.style.height = "100%";
      ***REMOVED***);

        function onChange(e){

        	if(((cellValue === null || typeof cellValue === "undefined") && input.value !== "") || input.value !== cellValue){

        		if(success(input.value)){
        			cellValue = input.value; //persist value if successfully validated incase editor is used as header filter
        		***REMOVED***

        		setTimeout(function(){
        			cell.getRow().normalizeHeight();
        		***REMOVED***,300)
        	***REMOVED***else{
        		cancel();
        	***REMOVED***
      ***REMOVED***

        //submit new value on blur or change
        input.addEventListener("change", onChange);
        input.addEventListener("blur", onChange);

        input.addEventListener("keyup", function(){

        	input.style.height = "";

        	var heightNow = input.scrollHeight;

        	input.style.height = heightNow + "px";

        	if(heightNow != scrollHeight){
        		scrollHeight = heightNow;
        		cell.getRow().normalizeHeight();
        	***REMOVED***
      ***REMOVED***);

        input.addEventListener("keydown", function(e){

        	switch(e.keyCode){
        		case 27:
        		cancel();
        		break;

        		case 38: //up arrow
        		if(vertNav == "editor" || (vertNav == "hybrid" && input.selectionStart)){
        			e.stopImmediatePropagation();
        			e.stopPropagation();
        		***REMOVED***

        		break;

        		case 40: //down arrow
        		if(vertNav == "editor" || (vertNav == "hybrid" && input.selectionStart !== input.value.length)){
        			e.stopImmediatePropagation();
        			e.stopPropagation();
        		***REMOVED***
        		break;
        	***REMOVED***
      ***REMOVED***);

        if(editorParams.mask){
        	this.table.modules.edit.maskInput(input, editorParams);
      ***REMOVED***

        return input;
  ***REMOVED***

    //input element with type of number
    number:function(cell, onRendered, success, cancel, editorParams){

    	var cellValue = cell.getValue(),
    	vertNav = editorParams.verticalNavigation || "editor",
    	input = document.createElement("input");

    	input.setAttribute("type", "number");

    	if(typeof editorParams.max != "undefined"){
    		input.setAttribute("max", editorParams.max);
    	***REMOVED***

    	if(typeof editorParams.min != "undefined"){
    		input.setAttribute("min", editorParams.min);
    	***REMOVED***

    	if(typeof editorParams.step != "undefined"){
    		input.setAttribute("step", editorParams.step);
    	***REMOVED***

		//create and style input
		input.style.padding = "4px";
		input.style.width = "100%";
		input.style.boxSizing = "border-box";

		if(editorParams.elementAttributes && typeof editorParams.elementAttributes == "object"){
			for (let key in editorParams.elementAttributes){
				if(key.charAt(0) == "+"){
					key = key.slice(1);
					input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
				***REMOVED***else{
					input.setAttribute(key, editorParams.elementAttributes[key]);
				***REMOVED***
			***REMOVED***
		***REMOVED***

		input.value = cellValue;

		var blurFunc = function(e){
			onChange();
		***REMOVED***;

		onRendered(function () {
			//submit new value on blur
			input.removeEventListener("blur", blurFunc);

			input.focus({preventScroll: true***REMOVED***);
			input.style.height = "100%";

			//submit new value on blur
			input.addEventListener("blur", blurFunc);
		***REMOVED***);

		function onChange(){
			var value = input.value;

			if(!isNaN(value) && value !==""){
				value = Number(value);
			***REMOVED***

			if(value !== cellValue){
				if(success(value)){
					cellValue = value; //persist value if successfully validated incase editor is used as header filter
				***REMOVED***
			***REMOVED***else{
				cancel();
			***REMOVED***
		***REMOVED***

		//submit new value on enter
		input.addEventListener("keydown", function(e){
			switch(e.keyCode){
				case 13:
				// case 9:
				onChange();
				break;

				case 27:
				cancel();
				break;

				case 38: //up arrow
				case 40: //down arrow
				if(vertNav == "editor"){
					e.stopImmediatePropagation();
					e.stopPropagation();
				***REMOVED***
				break;
			***REMOVED***
		***REMOVED***);

		if(editorParams.mask){
			this.table.modules.edit.maskInput(input, editorParams);
		***REMOVED***

		return input;
	***REMOVED***,

    //input element with type of number
    range:function(cell, onRendered, success, cancel, editorParams){

    	var cellValue = cell.getValue(),
    	input = document.createElement("input");

    	input.setAttribute("type", "range");

    	if (typeof editorParams.max != "undefined") {
    		input.setAttribute("max", editorParams.max);
    	***REMOVED***

    	if (typeof editorParams.min != "undefined") {
    		input.setAttribute("min", editorParams.min);
    	***REMOVED***

    	if (typeof editorParams.step != "undefined") {
    		input.setAttribute("step", editorParams.step);
    	***REMOVED***

    	//create and style input
    	input.style.padding = "4px";
    	input.style.width = "100%";
    	input.style.boxSizing = "border-box";

    	if(editorParams.elementAttributes && typeof editorParams.elementAttributes == "object"){
    		for (let key in editorParams.elementAttributes){
    			if(key.charAt(0) == "+"){
    				key = key.slice(1);
    				input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
    			***REMOVED***else{
    				input.setAttribute(key, editorParams.elementAttributes[key]);
    			***REMOVED***
    		***REMOVED***
    	***REMOVED***

    	input.value = cellValue;

    	onRendered(function () {
    		input.focus({preventScroll: true***REMOVED***);
    		input.style.height = "100%";
    	***REMOVED***);

    	function onChange(){
    		var value = input.value;

    		if(!isNaN(value) && value !==""){
    			value = Number(value);
    		***REMOVED***

    		if(value != cellValue){
    			if(success(value)){
    				cellValue = value; //persist value if successfully validated incase editor is used as header filter
    			***REMOVED***
    		***REMOVED***else{
    			cancel();
    		***REMOVED***
    	***REMOVED***

		//submit new value on blur
		input.addEventListener("blur", function(e){
			onChange();
		***REMOVED***);

		//submit new value on enter
		input.addEventListener("keydown", function(e){
			switch(e.keyCode){
				case 13:
				case 9:
				onChange();
				break;

				case 27:
				cancel();
				break;
			***REMOVED***
		***REMOVED***);

		return input;
	***REMOVED***,

	//select
	select:function(cell, onRendered, success, cancel, editorParams){
		var self = this,
		cellEl = cell.getElement(),
		initialValue = cell.getValue(),
		vertNav = editorParams.verticalNavigation || "editor",
		initialDisplayValue = typeof initialValue !== "undefined" || initialValue === null ? initialValue : (typeof editorParams.defaultValue !== "undefined" ? editorParams.defaultValue : ""),
		input = document.createElement("input"),
		listEl = document.createElement("div"),
		dataItems = [],
		displayItems = [],
		currentItem = {***REMOVED***,
		blurable = true;

		this.table.rowManager.element.addEventListener("scroll", cancelItem);

		if(Array.isArray(editorParams) || (!Array.isArray(editorParams) && typeof editorParams === "object" && !editorParams.values)){
			console.warn("DEPRECATION WANRING - values for the select editor must now be passed into the values property of the editorParams object, not as the editorParams object");
			editorParams = {values:editorParams***REMOVED***;
		***REMOVED***

		function getUniqueColumnValues(field){
			var output = {***REMOVED***,
			data = self.table.getData(),
			column;

			if(field){
				column = self.table.columnManager.getColumnByField(field);
			***REMOVED***else{
				column = cell.getColumn()._getSelf();
			***REMOVED***

			if(column){
				data.forEach(function(row){
					var val = column.getFieldValue(row);

					if(val !== null && typeof val !== "undefined" && val !== ""){
						output[val] = true;
					***REMOVED***
				***REMOVED***);

				if(editorParams.sortValuesList){
					if(editorParams.sortValuesList == "asc"){
						output = Object.keys(output).sort();
					***REMOVED***else{
						output = Object.keys(output).sort().reverse();
					***REMOVED***
				***REMOVED***else{
					output = Object.keys(output);
				***REMOVED***
			***REMOVED***else{
				console.warn("unable to find matching column to create select lookup list:", field);
			***REMOVED***

			return output;
		***REMOVED***

		function parseItems(inputValues, curentValue){
			var dataList = [];
			var displayList = [];

			function processComplexListItem(item){
				var item = {
					label:editorParams.listItemFormatter ? editorParams.listItemFormatter(item.value, item.label) : item.label,
					value:item.value,
					element:false,
				***REMOVED***;

				if(item.value === curentValue || (!isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue))){
					setCurrentItem(item);
				***REMOVED***

				dataList.push(item);
				displayList.push(item);

				return item;
			***REMOVED***

			if(typeof inputValues == "function"){
				inputValues = inputValues(cell);
			***REMOVED***

			if(Array.isArray(inputValues)){
				inputValues.forEach(function(value){
					var item;

					if(typeof value === "object"){

						if(value.options){
							item = {
								label:value.label,
								group:true,
								element:false,
							***REMOVED***;

							displayList.push(item);

							value.options.forEach(function(item){
								processComplexListItem(item);
							***REMOVED***);
						***REMOVED***else{
							processComplexListItem(value);
						***REMOVED***

					***REMOVED***else{

						item = {
							label:editorParams.listItemFormatter ? editorParams.listItemFormatter(value, value) : value,
							value:value,
							element:false,
						***REMOVED***;

						if(item.value === curentValue || (!isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue))){
							setCurrentItem(item);
						***REMOVED***

						dataList.push(item);
						displayList.push(item);
					***REMOVED***
				***REMOVED***);
			***REMOVED***else{
				for(var key in inputValues){
					var item = {
						label:editorParams.listItemFormatter ? editorParams.listItemFormatter(key, inputValues[key]) : inputValues[key],
						value:key,
						element:false,
					***REMOVED***;

					if(item.value === curentValue || (!isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue))){
						setCurrentItem(item);
					***REMOVED***

					dataList.push(item);
					displayList.push(item);
				***REMOVED***
			***REMOVED***

			dataItems = dataList;
			displayItems = displayList;

			fillList();
		***REMOVED***

		function fillList(){
			while(listEl.firstChild) listEl.removeChild(listEl.firstChild);

			displayItems.forEach(function(item){
				var el = item.element;

				if(!el){

					if(item.group){
						el = document.createElement("div");
						el.classList.add("tabulator-edit-select-list-group");
						el.tabIndex = 0;
						el.innerHTML = item.label === "" ? "&nbsp;" : item.label;
					***REMOVED***else{
						el = document.createElement("div");
						el.classList.add("tabulator-edit-select-list-item");
						el.tabIndex = 0;
						el.innerHTML = item.label === "" ? "&nbsp;" : item.label;

						el.addEventListener("click", function(){
							setCurrentItem(item);
							chooseItem();
						***REMOVED***);

						if(item === currentItem){
							el.classList.add("active");
						***REMOVED***
					***REMOVED***

					el.addEventListener("mousedown", function(){
						blurable = false;

						setTimeout(function(){
							blurable = true;
						***REMOVED***, 10);
					***REMOVED***);

					item.element = el;


				***REMOVED***

				listEl.appendChild(el);
			***REMOVED***);
		***REMOVED***


		function setCurrentItem(item){

			if(currentItem && currentItem.element){
				currentItem.element.classList.remove("active");
			***REMOVED***


			currentItem = item;
			input.value = item.label === "&nbsp;" ? "" : item.label;

			if(item.element){
				item.element.classList.add("active");
			***REMOVED***
		***REMOVED***


		function chooseItem(){
			hideList();

			if(initialValue !== currentItem.value){
				initialValue = currentItem.value;
				success(currentItem.value);
			***REMOVED***else{
				cancel();
			***REMOVED***
		***REMOVED***

		function cancelItem(){
			hideList();
			cancel();
		***REMOVED***

		function showList(){
			if(!listEl.parentNode){

				if(editorParams.values === true){
					parseItems(getUniqueColumnValues(), initialDisplayValue);
				***REMOVED***else if(typeof editorParams.values === "string"){
					parseItems(getUniqueColumnValues(editorParams.values), initialDisplayValue);
				***REMOVED***else{
					parseItems(editorParams.values || [], initialDisplayValue);
				***REMOVED***


				var offset = Tabulator.prototype.helpers.elOffset(cellEl);

				listEl.style.minWidth = cellEl.offsetWidth + "px";

				listEl.style.top = (offset.top + cellEl.offsetHeight) + "px";
				listEl.style.left = offset.left + "px";


				listEl.addEventListener("mousedown", function(e){
					blurable = false;

					setTimeout(function(){
						blurable = true;
					***REMOVED***, 10);
				***REMOVED***);

				document.body.appendChild(listEl);
			***REMOVED***
		***REMOVED***

		function hideList(){
			if(listEl.parentNode){
				listEl.parentNode.removeChild(listEl);
			***REMOVED***

			removeScrollListener();
		***REMOVED***

		function removeScrollListener() {
			self.table.rowManager.element.removeEventListener("scroll", cancelItem);
		***REMOVED***

		//style input
		input.setAttribute("type", "text");

		input.style.padding = "4px";
		input.style.width = "100%";
		input.style.boxSizing = "border-box";
		input.style.cursor = "default";
		input.readOnly = (this.currentCell != false);

		if(editorParams.elementAttributes && typeof editorParams.elementAttributes == "object"){
			for (let key in editorParams.elementAttributes){
				if(key.charAt(0) == "+"){
					key = key.slice(1);
					input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
				***REMOVED***else{
					input.setAttribute(key, editorParams.elementAttributes[key]);
				***REMOVED***
			***REMOVED***
		***REMOVED***

		input.value = typeof initialValue !== "undefined" || initialValue === null ? initialValue : "";

		// if(editorParams.values === true){
		// 	parseItems(getUniqueColumnValues(), initialValue);
		// ***REMOVED***else if(typeof editorParams.values === "string"){
		// 	parseItems(getUniqueColumnValues(editorParams.values), initialValue);
		// ***REMOVED***else{
		// 	parseItems(editorParams.values || [], initialValue);
		// ***REMOVED***

		//allow key based navigation
		input.addEventListener("keydown", function(e){
			var index;

			switch(e.keyCode){
				case 38: //up arrow
				index = dataItems.indexOf(currentItem);

				if(vertNav == "editor" || (vertNav == "hybrid" && index)){
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if(index > 0){
						setCurrentItem(dataItems[index - 1]);
					***REMOVED***
				***REMOVED***
				break;

				case 40: //down arrow
				index = dataItems.indexOf(currentItem);

				if(vertNav == "editor" || (vertNav == "hybrid" && index < dataItems.length - 1)){
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if(index < dataItems.length - 1){
						if(index == -1){
							setCurrentItem(dataItems[0]);
						***REMOVED***else{
							setCurrentItem(dataItems[index + 1]);
						***REMOVED***
					***REMOVED***
				***REMOVED***
				break;

				case 37: //left arrow
				case 39: //right arrow
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();
				break;

				case 13: //enter
				chooseItem();
				break;

				case 27: //escape
				cancelItem();
				break;
			***REMOVED***
		***REMOVED***);

		input.addEventListener("blur", function(e){
			if(blurable){
				cancelItem();
			***REMOVED***
		***REMOVED***);

		input.addEventListener("focus", function(e){
			showList();
		***REMOVED***);

		//style list element
		listEl = document.createElement("div");
		listEl.classList.add("tabulator-edit-select-list");

		onRendered(function(){
			input.style.height = "100%";
			input.focus({preventScroll: true***REMOVED***);
		***REMOVED***);

		return input;
	***REMOVED***,


	//autocomplete
	autocomplete:function(cell, onRendered, success, cancel, editorParams){
		var self = this,
		cellEl = cell.getElement(),
		initialValue = cell.getValue(),
		vertNav = editorParams.verticalNavigation || "editor",
		initialDisplayValue = typeof initialValue !== "undefined" || initialValue === null ? initialValue : (typeof editorParams.defaultValue !== "undefined" ? editorParams.defaultValue : ""),
		input = document.createElement("input"),
		listEl = document.createElement("div"),
		allItems = [],
		displayItems = [],
		values = [],
		currentItem = false,
		blurable = true;

		this.table.rowManager.element.addEventListener("scroll", cancelItem);

		//style input
		input.setAttribute("type", "search");

		input.style.padding = "4px";
		input.style.width = "100%";
		input.style.boxSizing = "border-box";

		if(editorParams.elementAttributes && typeof editorParams.elementAttributes == "object"){
			for (let key in editorParams.elementAttributes){
				if(key.charAt(0) == "+"){
					key = key.slice(1);
					input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
				***REMOVED***else{
					input.setAttribute(key, editorParams.elementAttributes[key]);
				***REMOVED***
			***REMOVED***
		***REMOVED***

		//style list element
		listEl.classList.add("tabulator-edit-select-list");

		listEl.addEventListener("mousedown", function(e){
			blurable = false;

			setTimeout(function(){
				blurable = true;
			***REMOVED***, 10);
		***REMOVED***);

		function getUniqueColumnValues(field){
			var output = {***REMOVED***,
			data = self.table.getData(),
			column;

			if(field){
				column = self.table.columnManager.getColumnByField(field);
			***REMOVED***else{
				column = cell.getColumn()._getSelf();
			***REMOVED***

			if(column){
				data.forEach(function(row){
					var val = column.getFieldValue(row);

					if(val !== null && typeof val !== "undefined" && val !== ""){
						output[val] = true;
					***REMOVED***
				***REMOVED***);

				if(editorParams.sortValuesList){
					if(editorParams.sortValuesList == "asc"){
						output = Object.keys(output).sort();
					***REMOVED***else{
						output = Object.keys(output).sort().reverse();
					***REMOVED***
				***REMOVED***else{
					output = Object.keys(output);
				***REMOVED***
			***REMOVED***else{
				console.warn("unable to find matching column to create autocomplete lookup list:", field);
			***REMOVED***


			return output;
		***REMOVED***

		function filterList(term, intialLoad){
			var matches = [],
			values, items, searchEl;

			//lookup base values list
			if(editorParams.values === true){
				values = getUniqueColumnValues();
			***REMOVED***else if(typeof editorParams.values === "string"){
				values = getUniqueColumnValues(editorParams.values);
			***REMOVED***else{
				values = editorParams.values || [];
			***REMOVED***

			if(editorParams.searchFunc){
				matches = editorParams.searchFunc(term, values);

				if(matches instanceof Promise){

					addNotice(typeof editorParams.searchingPlaceholder !== "undefined" ? editorParams.searchingPlaceholder : "Searching...");

					matches.then((result) => {
						fillListIfNotEmpty(parseItems(result), intialLoad);
					***REMOVED***).catch((err) => {
						console.err("error in autocomplete search promise:", err);
					***REMOVED***);

				***REMOVED***else{
					fillListIfNotEmpty(parseItems(matches), intialLoad);
				***REMOVED***
			***REMOVED***else{
				items = parseItems(values);

				if(term === ""){
					if(editorParams.showListOnEmpty){
						matches = items;
					***REMOVED***
				***REMOVED***else{
					items.forEach(function(item){
						if(item.value !== null || typeof item.value !== "undefined"){
							if(String(item.value).toLowerCase().indexOf(String(term).toLowerCase()) > -1 || String(item.title).toLowerCase().indexOf(String(term).toLowerCase()) > -1){
								matches.push(item);
							***REMOVED***
						***REMOVED***
					***REMOVED***);
				***REMOVED***

				fillListIfNotEmpty(matches, intialLoad);
			***REMOVED***
		***REMOVED***

		function addNotice(notice){
			var searchEl = document.createElement("div");

			clearList();

			if(notice !== false){
				searchEl.classList.add("tabulator-edit-select-list-notice");
				searchEl.tabIndex = 0;

				if(notice instanceof Node){
					searchEl.appendChild(notice);
				***REMOVED***else{
					searchEl.innerHTML = notice;
				***REMOVED***

				listEl.appendChild(searchEl);
			***REMOVED***
		***REMOVED***

		function parseItems(inputValues){
			var itemList = [];

			if(Array.isArray(inputValues)){
				inputValues.forEach(function(value){
					var item = {
						title:editorParams.listItemFormatter ? editorParams.listItemFormatter(value, value) : value,
						value:value,
					***REMOVED***;

					itemList.push(item);
				***REMOVED***);
			***REMOVED***else{
				for(var key in inputValues){
					var item = {
						title:editorParams.listItemFormatter ? editorParams.listItemFormatter(key, inputValues[key]) : inputValues[key],
						value:key,
					***REMOVED***;

					itemList.push(item);
				***REMOVED***
			***REMOVED***

			return itemList;
		***REMOVED***

		function clearList(){
			while(listEl.firstChild) listEl.removeChild(listEl.firstChild);
		***REMOVED***

		function fillListIfNotEmpty(items, intialLoad){
			if(items.length){
				fillList(items, intialLoad);
			***REMOVED***else{
				if(editorParams.emptyPlaceholder){
					addNotice(editorParams.emptyPlaceholder);
				***REMOVED***
			***REMOVED***
		***REMOVED***

		function fillList(items, intialLoad){
			var current = false;

			clearList();

			displayItems = items;

			displayItems.forEach(function(item){
				var el = item.element;

				if(!el){
					el = document.createElement("div");
					el.classList.add("tabulator-edit-select-list-item");
					el.tabIndex = 0;
					el.innerHTML = item.title;

					el.addEventListener("click", function(e){
						setCurrentItem(item);
						chooseItem();
					***REMOVED***);

					el.addEventListener("mousedown", function(e){
						blurable = false;

						setTimeout(function(){
							blurable = true;
						***REMOVED***, 10);
					***REMOVED***);

					item.element = el;

					if(intialLoad && item.value == initialValue){
						input.value = item.title;
						item.element.classList.add("active");
						current = true;
					***REMOVED***

					if(item === currentItem){
						item.element.classList.add("active");
						current = true;
					***REMOVED***
				***REMOVED***

				listEl.appendChild(el);
			***REMOVED***);

			if(!current){
				setCurrentItem(false);
			***REMOVED***
		***REMOVED***

		function chooseItem(){
			hideList();

			if(currentItem){
				if(initialValue !== currentItem.value){
					initialValue = currentItem.value;
					input.value = currentItem.title;
					success(currentItem.value);
				***REMOVED***else{
					cancel();
				***REMOVED***
			***REMOVED***else{
				if(editorParams.freetext){
					initialValue = input.value;
					success(input.value);
				***REMOVED***else{
					if(editorParams.allowEmpty && input.value === ""){
						initialValue = input.value;
						success(input.value);
					***REMOVED***else{
						cancel();
					***REMOVED***
				***REMOVED***
			***REMOVED***
		***REMOVED***

		function showList(){
			if(!listEl.parentNode){
				while(listEl.firstChild) listEl.removeChild(listEl.firstChild);

				var offset = Tabulator.prototype.helpers.elOffset(cellEl);

				listEl.style.minWidth = cellEl.offsetWidth + "px";

				listEl.style.top = (offset.top + cellEl.offsetHeight) + "px";
				listEl.style.left = offset.left + "px";
				document.body.appendChild(listEl);
			***REMOVED***
		***REMOVED***

		function setCurrentItem(item, showInputValue){
			if(currentItem && currentItem.element){
				currentItem.element.classList.remove("active");
			***REMOVED***

			currentItem = item;

			if(item && item.element){
				item.element.classList.add("active");
			***REMOVED***
		***REMOVED***

		function hideList(){
			if(listEl.parentNode){
				listEl.parentNode.removeChild(listEl);
			***REMOVED***

			removeScrollListener();
		***REMOVED***


		function cancelItem(){
			hideList();
			cancel();
		***REMOVED***

		function removeScrollListener() {
			self.table.rowManager.element.removeEventListener("scroll", cancelItem);
		***REMOVED***

		//allow key based navigation
		input.addEventListener("keydown", function(e){
			var index;

			switch(e.keyCode){
				case 38: //up arrow
				index = displayItems.indexOf(currentItem);

				if(vertNav == "editor" || (vertNav == "hybrid" && index)){
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if(index > 0){
						setCurrentItem(displayItems[index - 1]);
					***REMOVED***else{
						setCurrentItem(false);
					***REMOVED***
				***REMOVED***
				break;

				case 40: //down arrow

				index = displayItems.indexOf(currentItem);

				if(vertNav == "editor" || (vertNav == "hybrid" && index < displayItems.length - 1)){

					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					if(index < displayItems.length - 1){
						if(index == -1){
							setCurrentItem(displayItems[0]);
						***REMOVED***else{
							setCurrentItem(displayItems[index + 1]);
						***REMOVED***
					***REMOVED***
				***REMOVED***
				break;


				case 37: //left arrow
				case 39: //right arrow
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();
				break;

				case 13: //enter
				chooseItem();
				break;

				case 27: //escape
				cancelItem();
				break;

				case 36: //home
				case 35: //end
				//prevent table navigation while using input element
				e.stopImmediatePropagation();
				break;
			***REMOVED***
		***REMOVED***);

		input.addEventListener("keyup", function(e){

			switch(e.keyCode){
				case 38: //up arrow
				case 37: //left arrow
				case 39: //up arrow
				case 40: //right arrow
				case 13: //enter
				case 27: //escape
				break;

				default:
				filterList(input.value);
			***REMOVED***

		***REMOVED***);

		input.addEventListener("search", function(e){
			filterList(input.value);
		***REMOVED***);

		input.addEventListener("blur", function(e){
			if(blurable){
				chooseItem();
			***REMOVED***
		***REMOVED***);

		input.addEventListener("focus", function(e){
			var value = initialDisplayValue;
			showList();
			input.value = value;
			filterList(value, true);
		***REMOVED***);


		onRendered(function(){
			input.style.height = "100%";
			input.focus({preventScroll: true***REMOVED***);
		***REMOVED***);

		if(editorParams.mask){
			this.table.modules.edit.maskInput(input, editorParams);
		***REMOVED***

		return input;
	***REMOVED***,

	//start rating
	star:function(cell, onRendered, success, cancel, editorParams){
		var self = this,
		element = cell.getElement(),
		value = cell.getValue(),
		maxStars = element.getElementsByTagName("svg").length || 5,
		size = element.getElementsByTagName("svg")[0] ? element.getElementsByTagName("svg")[0].getAttribute("width") : 14,
		stars = [],
		starsHolder = document.createElement("div"),
		star = document.createElementNS('http://www.w3.org/2000/svg', "svg");


		//change star type
		function starChange(val){
			stars.forEach(function(star, i){
				if(i < val){
					if(self.table.browser == "ie"){
						star.setAttribute("class", "tabulator-star-active");
					***REMOVED***else{
						star.classList.replace("tabulator-star-inactive", "tabulator-star-active");
					***REMOVED***

					star.innerHTML = '<polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';
				***REMOVED***else{
					if(self.table.browser == "ie"){
						star.setAttribute("class", "tabulator-star-inactive");
					***REMOVED***else{
						star.classList.replace("tabulator-star-active", "tabulator-star-inactive");
					***REMOVED***

					star.innerHTML = '<polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';
				***REMOVED***
			***REMOVED***);
		***REMOVED***

		//build stars
		function buildStar(i){

			var starHolder =  document.createElement("span");
			var nextStar = star.cloneNode(true);

			stars.push(nextStar);

			starHolder.addEventListener("mouseenter", function(e){
				e.stopPropagation();
				e.stopImmediatePropagation();
				starChange(i);
			***REMOVED***);

			starHolder.addEventListener("mousemove", function(e){
				e.stopPropagation();
				e.stopImmediatePropagation();
			***REMOVED***);

			starHolder.addEventListener("click", function(e){
				e.stopPropagation();
				e.stopImmediatePropagation();
				success(i);
			***REMOVED***);

			starHolder.appendChild(nextStar);
			starsHolder.appendChild(starHolder);

		***REMOVED***

		//handle keyboard navigation value change
		function changeValue(val){
			value = val;
			starChange(val);
		***REMOVED***

		//style cell
		element.style.whiteSpace = "nowrap";
		element.style.overflow = "hidden";
		element.style.textOverflow = "ellipsis";

		//style holding element
		starsHolder.style.verticalAlign = "middle";
		starsHolder.style.display = "inline-block";
		starsHolder.style.padding = "4px";

		//style star
		star.setAttribute("width", size);
		star.setAttribute("height", size);
		star.setAttribute("viewBox", "0 0 512 512");
		star.setAttribute("xml:space", "preserve");
		star.style.padding = "0 1px";

		if(editorParams.elementAttributes && typeof editorParams.elementAttributes == "object"){
			for (let key in editorParams.elementAttributes){
				if(key.charAt(0) == "+"){
					key = key.slice(1);
					starsHolder.setAttribute(key, starsHolder.getAttribute(key) + editorParams.elementAttributes["+" + key]);
				***REMOVED***else{
					starsHolder.setAttribute(key, editorParams.elementAttributes[key]);
				***REMOVED***
			***REMOVED***
		***REMOVED***

		//create correct number of stars
		for(var i=1;i<= maxStars;i++){
			buildStar(i);
		***REMOVED***

		//ensure value does not exceed number of stars
		value = Math.min(parseInt(value), maxStars);

		// set initial styling of stars
		starChange(value);

		starsHolder.addEventListener("mousemove", function(e){
			starChange(0);
		***REMOVED***);

		starsHolder.addEventListener("click", function(e){
			success(0);
		***REMOVED***);

		element.addEventListener("blur", function(e){
			cancel();
		***REMOVED***);

		//allow key based navigation
		element.addEventListener("keydown", function(e){
			switch(e.keyCode){
				case 39: //right arrow
				changeValue(value + 1);
				break;

				case 37: //left arrow
				changeValue(value - 1);
				break;

				case 13: //enter
				success(value);
				break;

				case 27: //escape
				cancel();
				break;
			***REMOVED***
		***REMOVED***);

		return starsHolder;
	***REMOVED***,

	//draggable progress bar
	progress:function(cell, onRendered, success, cancel, editorParams){
		var element = cell.getElement(),
		max = typeof editorParams.max === "undefined" ? ( element.getElementsByTagName("div")[0].getAttribute("max") || 100) : editorParams.max,
		min = typeof editorParams.min === "undefined" ? ( element.getElementsByTagName("div")[0].getAttribute("min") || 0) : editorParams.min,
		percent = (max - min) / 100,
		value = cell.getValue() || 0,
		handle = document.createElement("div"),
		bar = document.createElement("div"),
		mouseDrag, mouseDragWidth;

		//set new value
		function updateValue(){
			var calcVal = (percent***REMOVED*** Math.round(bar.offsetWidth / (element.clientWidth/100))) + min;
			success(calcVal);
			element.setAttribute("aria-valuenow", calcVal);
			element.setAttribute("aria-label", value);
		***REMOVED***

		//style handle
		handle.style.position = "absolute";
		handle.style.right = "0";
		handle.style.top = "0";
		handle.style.bottom = "0";
		handle.style.width = "5px";
		handle.classList.add("tabulator-progress-handle");

		//style bar
		bar.style.display = "inline-block";
		bar.style.position = "relative";
		// bar.style.top = "8px";
		// bar.style.bottom = "8px";
		// bar.style.left = "4px";
		// bar.style.marginRight = "4px";
		bar.style.height = "100%";
		bar.style.backgroundColor = "#488CE9";
		bar.style.maxWidth = "100%";
		bar.style.minWidth = "0%";

		if(editorParams.elementAttributes && typeof editorParams.elementAttributes == "object"){
			for (let key in editorParams.elementAttributes){
				if(key.charAt(0) == "+"){
					key = key.slice(1);
					bar.setAttribute(key, bar.getAttribute(key) + editorParams.elementAttributes["+" + key]);
				***REMOVED***else{
					bar.setAttribute(key, editorParams.elementAttributes[key]);
				***REMOVED***
			***REMOVED***
		***REMOVED***

		//style cell
		element.style.padding = "4px 4px";

		//make sure value is in range
		value = Math.min(parseFloat(value), max);
		value = Math.max(parseFloat(value), min);

		//workout percentage
		value = Math.round((value - min) / percent);
		// bar.style.right = value + "%";
		bar.style.width = value + "%";

		element.setAttribute("aria-valuemin", min);
		element.setAttribute("aria-valuemax", max);

		bar.appendChild(handle);

		handle.addEventListener("mousedown", function(e){
			mouseDrag = e.screenX;
			mouseDragWidth = bar.offsetWidth;
		***REMOVED***);

		handle.addEventListener("mouseover", function(){
			handle.style.cursor = "ew-resize";
		***REMOVED***);

		element.addEventListener("mousemove", function(e){
			if(mouseDrag){
				bar.style.width = (mouseDragWidth + e.screenX - mouseDrag) + "px";
			***REMOVED***
		***REMOVED***);

		element.addEventListener("mouseup", function(e){
			if(mouseDrag){
				e.stopPropagation();
				e.stopImmediatePropagation();

				mouseDrag = false;
				mouseDragWidth = false;

				updateValue();
			***REMOVED***
		***REMOVED***);

		//allow key based navigation
		element.addEventListener("keydown", function(e){
			switch(e.keyCode){
				case 39: //right arrow
				e.preventDefault();
				bar.style.width = (bar.clientWidth + element.clientWidth/100) + "px";
				break;

				case 37: //left arrow
				e.preventDefault();
				bar.style.width = (bar.clientWidth - element.clientWidth/100) + "px";
				break;

				case 9: //tab
				case 13: //enter
				updateValue();
				break;

				case 27: //escape
				cancel();
				break;

			***REMOVED***
		***REMOVED***);

		element.addEventListener("blur", function(){
			cancel();
		***REMOVED***);

		return bar;
	***REMOVED***,

	//checkbox
	tickCross:function(cell, onRendered, success, cancel, editorParams){
		var value = cell.getValue(),
		input = document.createElement("input"),
		tristate = editorParams.tristate,
		indetermValue = typeof editorParams.indeterminateValue === "undefined" ? null : editorParams.indeterminateValue,
		indetermState = false;

		input.setAttribute("type", "checkbox");
		input.style.marginTop = "5px";
		input.style.boxSizing = "border-box";

		if(editorParams.elementAttributes && typeof editorParams.elementAttributes == "object"){
			for (let key in editorParams.elementAttributes){
				if(key.charAt(0) == "+"){
					key = key.slice(1);
					input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
				***REMOVED***else{
					input.setAttribute(key, editorParams.elementAttributes[key]);
				***REMOVED***
			***REMOVED***
		***REMOVED***

		input.value = value;

		if(tristate && (typeof value === "undefined" || value === indetermValue || value === "")){
			indetermState = true;
			input.indeterminate = true;
		***REMOVED***

		if(this.table.browser != "firefox"){ //prevent blur issue on mac firefox
			onRendered(function(){
				input.focus({preventScroll: true***REMOVED***);
			***REMOVED***);
		***REMOVED***

		input.checked = value === true || value === "true" || value === "True" || value === 1;

		function setValue(blur){
			if(tristate){
				if(!blur){
					if(input.checked && !indetermState){
						input.checked = false;
						input.indeterminate = true;
						indetermState = true;
						return indetermValue;
					***REMOVED***else{
						indetermState = false;
						return input.checked;
					***REMOVED***
				***REMOVED***else{
					if(indetermState){
						return indetermValue;
					***REMOVED***else{
						return input.checked;
					***REMOVED***
				***REMOVED***
			***REMOVED***else{
				return input.checked;
			***REMOVED***
		***REMOVED***

		//submit new value on blur
		input.addEventListener("change", function(e){
			success(setValue());
		***REMOVED***);

		input.addEventListener("blur", function(e){
			success(setValue(true));
		***REMOVED***);

		//submit new value on enter
		input.addEventListener("keydown", function(e){
			if(e.keyCode == 13){
				success(setValue());
			***REMOVED***
			if(e.keyCode == 27){
				cancel();
			***REMOVED***
		***REMOVED***);

		return input;
	***REMOVED***,
***REMOVED***;

Tabulator.prototype.registerModule("edit", Edit);
