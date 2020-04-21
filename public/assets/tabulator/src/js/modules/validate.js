var Validate = function(table){
	this.table = table;
***REMOVED***;

//validate
Validate.prototype.initializeColumn = function(column){
	var self = this,
	config = [],
	validator;

	if(column.definition.validator){

		if(Array.isArray(column.definition.validator)){
			column.definition.validator.forEach(function(item){
				validator = self._extractValidator(item);

				if(validator){
					config.push(validator);
				***REMOVED***
			***REMOVED***);

		***REMOVED***else{
			validator = this._extractValidator(column.definition.validator);

			if(validator){
				config.push(validator);
			***REMOVED***
		***REMOVED***

		column.modules.validate = config.length ? config : false;
	***REMOVED***
***REMOVED***;

Validate.prototype._extractValidator = function(value){
	var type, params, pos;

	switch(typeof value){
		case "string":
		pos = value.indexOf(':');

		if(pos > -1){
			type = value.substring(0,pos);
			params = value.substring(pos+1);
		***REMOVED***else{
			type = value;
		***REMOVED***

		return this._buildValidator(type, params);
		break;

		case "function":
		return this._buildValidator(value);
		break;

		case "object":
		return this._buildValidator(value.type, value.parameters);
		break;
	***REMOVED***
***REMOVED***;

Validate.prototype._buildValidator = function(type, params){

	var func = typeof type == "function" ? type : this.validators[type];

	if(!func){
		console.warn("Validator Setup Error - No matching validator found:", type);
		return false;
	***REMOVED***else{
		return {
			type:typeof type == "function" ? "function" : type,
			func:func,
			params:params,
		***REMOVED***;
	***REMOVED***
***REMOVED***;


Validate.prototype.validate = function(validators, cell, value){
	var self = this,
	valid = [];

	if(validators){
		validators.forEach(function(item){
			if(!item.func.call(self, cell, value, item.params)){
				valid.push({
					type:item.type,
					parameters:item.params
				***REMOVED***);
			***REMOVED***
		***REMOVED***);
	***REMOVED***

	return valid.length ? valid : true;
***REMOVED***;

Validate.prototype.validators = {

	//is integer
	integer: function(cell, value, parameters){
		if(value === "" || value === null || typeof value === "undefined"){
			return true;
		***REMOVED***
		value = Number(value);
		return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
	***REMOVED***,

	//is float
	float: function(cell, value, parameters){
		if(value === "" || value === null || typeof value === "undefined"){
			return true;
		***REMOVED***
		value = Number(value);
		return typeof value === 'number' && isFinite(value) && value % 1 !== 0;
	***REMOVED***,

	//must be a number
	numeric: function(cell, value, parameters){
		if(value === "" || value === null || typeof value === "undefined"){
			return true;
		***REMOVED***
		return !isNaN(value);
	***REMOVED***,

	//must be a string
	string: function(cell, value, parameters){
		if(value === "" || value === null || typeof value === "undefined"){
			return true;
		***REMOVED***
		return isNaN(value);
	***REMOVED***,

	//maximum value
	max: function(cell, value, parameters){
		if(value === "" || value === null || typeof value === "undefined"){
			return true;
		***REMOVED***
		return parseFloat(value) <= parameters;
	***REMOVED***,

	//minimum value
	min: function(cell, value, parameters){
		if(value === "" || value === null || typeof value === "undefined"){
			return true;
		***REMOVED***
		return parseFloat(value) >= parameters;
	***REMOVED***,

	//minimum string length
	minLength: function(cell, value, parameters){
		if(value === "" || value === null || typeof value === "undefined"){
			return true;
		***REMOVED***
		return String(value).length >= parameters;
	***REMOVED***,

	//maximum string length
	maxLength: function(cell, value, parameters){
		if(value === "" || value === null || typeof value === "undefined"){
			return true;
		***REMOVED***
		return String(value).length <= parameters;
	***REMOVED***,

	//in provided value list
	in: function(cell, value, parameters){
		if(value === "" || value === null || typeof value === "undefined"){
			return true;
		***REMOVED***
		if(typeof parameters == "string"){
			parameters = parameters.split("|");
		***REMOVED***

		return value === "" || parameters.indexOf(value) > -1;
	***REMOVED***,

	//must match provided regex
	regex: function(cell, value, parameters){
		if(value === "" || value === null || typeof value === "undefined"){
			return true;
		***REMOVED***
		var reg = new RegExp(parameters);

		return reg.test(value);
	***REMOVED***,

	//value must be unique in this column
	unique: function(cell, value, parameters){
		if(value === "" || value === null || typeof value === "undefined"){
			return true;
		***REMOVED***
		var unique = true;

		var cellData = cell.getData();
		var column = cell.getColumn()._getSelf();

		this.table.rowManager.rows.forEach(function(row){
			var data = row.getData();

			if(data !== cellData){
				if(value == column.getFieldValue(data)){
					unique = false;
				***REMOVED***
			***REMOVED***
		***REMOVED***);

		return unique;
	***REMOVED***,

	//must have a value
	required:function(cell, value, parameters){
		return value !== "" && value !== null && typeof value !== "undefined";
	***REMOVED***,
***REMOVED***;


Tabulator.prototype.registerModule("validate", Validate);
