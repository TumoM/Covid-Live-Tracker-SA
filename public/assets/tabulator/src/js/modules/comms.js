var Comms = function(table){
	this.table = table;
***REMOVED***;


Comms.prototype.getConnections = function(selectors){
	var self = this,
	connections = [],
	connection;

	connection = Tabulator.prototype.comms.lookupTable(selectors);

	connection.forEach(function(con){
		if(self.table !== con){
			connections.push(con);
		***REMOVED***
	***REMOVED***);

	return connections;
***REMOVED***;

Comms.prototype.send = function(selectors, module, action, data){
	var self = this,
	connections = this.getConnections(selectors);

	connections.forEach(function(connection){
		connection.tableComms(self.table.element, module, action, data);
	***REMOVED***);

	if(!connections.length && selectors){
		console.warn("Table Connection Error - No tables matching selector found", selectors);
	***REMOVED***
***REMOVED***;


Comms.prototype.receive = function(table, module, action, data){
	if(this.table.modExists(module)){
		return this.table.modules[module].commsReceived(table, action, data);
	***REMOVED***else{
		console.warn("Inter-table Comms Error - no such module:", module);
	***REMOVED***
***REMOVED***;


Tabulator.prototype.registerModule("comms", Comms);