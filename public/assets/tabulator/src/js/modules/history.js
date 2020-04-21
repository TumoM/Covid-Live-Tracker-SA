var History = function(table){
	this.table = table; //hold Tabulator object

	this.history = [];
	this.index = -1;
***REMOVED***;


History.prototype.clear = function(){
	this.history = [];
	this.index = -1;
***REMOVED***;

History.prototype.action = function(type, component, data){

	this.history = this.history.slice(0, this.index + 1);

	this.history.push({
		type:type,
		component:component,
		data:data,
	***REMOVED***);

	this.index ++;
***REMOVED***;

History.prototype.getHistoryUndoSize = function(){
	return this.index + 1;
***REMOVED***;

History.prototype.getHistoryRedoSize = function(){
	return this.history.length - (this.index + 1);
***REMOVED***;

History.prototype.undo = function(){

	if(this.index > -1){
		let action = this.history[this.index];

		this.undoers[action.type].call(this, action);

		this.index--;

		this.table.options.historyUndo.call(this.table, action.type, action.component.getComponent(), action.data);

		return true;
	***REMOVED***else{
		console.warn("History Undo Error - No more history to undo");
		return false;
	***REMOVED***
***REMOVED***;

History.prototype.redo = function(){
	if(this.history.length-1 > this.index){

		this.index++;

		let action = this.history[this.index];

		this.redoers[action.type].call(this, action);

		this.table.options.historyRedo.call(this.table, action.type, action.component.getComponent(), action.data);

		return true;
	***REMOVED***else{
		console.warn("History Redo Error - No more history to redo");
		return false;
	***REMOVED***
***REMOVED***;


History.prototype.undoers = {
	cellEdit: function(action){
		action.component.setValueProcessData(action.data.oldValue);
	***REMOVED***,

	rowAdd: function(action){
		action.component.deleteActual();
	***REMOVED***,

	rowDelete: function(action){
		var newRow = this.table.rowManager.addRowActual(action.data.data, action.data.pos, action.data.index);

		if(this.table.options.groupBy && this.table.modExists("groupRows")){
			this.table.modules.groupRows.updateGroupRows(true);
		***REMOVED***

		this._rebindRow(action.component, newRow);
	***REMOVED***,

	rowMove: function(action){
		this.table.rowManager.moveRowActual(action.component, this.table.rowManager.rows[action.data.posFrom], !action.data.after);
		this.table.rowManager.redraw();
	***REMOVED***,
***REMOVED***;


History.prototype.redoers = {
	cellEdit: function(action){
		action.component.setValueProcessData(action.data.newValue);
	***REMOVED***,

	rowAdd: function(action){
		var newRow = this.table.rowManager.addRowActual(action.data.data, action.data.pos, action.data.index);

		if(this.table.options.groupBy && this.table.modExists("groupRows")){
			this.table.modules.groupRows.updateGroupRows(true);
		***REMOVED***

		this._rebindRow(action.component, newRow);
	***REMOVED***,

	rowDelete:function(action){
		action.component.deleteActual();
	***REMOVED***,

	rowMove: function(action){
		this.table.rowManager.moveRowActual(action.component, this.table.rowManager.rows[action.data.posTo], action.data.after);
		this.table.rowManager.redraw();
	***REMOVED***,
***REMOVED***;

//rebind rows to new element after deletion
History.prototype._rebindRow = function(oldRow, newRow){
	this.history.forEach(function(action){
		if(action.component instanceof Row){
			if(action.component === oldRow){
				action.component = newRow;
			***REMOVED***
		***REMOVED***else if(action.component instanceof Cell){
			if(action.component.row === oldRow){
				var field = action.component.column.getField();

				if(field){
					action.component = newRow.getCell(field);
				***REMOVED***

			***REMOVED***
		***REMOVED***
	***REMOVED***);
***REMOVED***;

Tabulator.prototype.registerModule("history", History);