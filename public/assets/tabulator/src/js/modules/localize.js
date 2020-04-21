var Localize = function(table){
	this.table = table; //hold Tabulator object
	this.locale = "default"; //current locale
	this.lang = false; //current language
	this.bindings = {***REMOVED***; //update events to call when locale is changed
***REMOVED***;

//set header placehoder
Localize.prototype.setHeaderFilterPlaceholder = function(placeholder){
	this.langs.default.headerFilters.default = placeholder;
***REMOVED***;

//set header filter placeholder by column
Localize.prototype.setHeaderFilterColumnPlaceholder = function(column, placeholder){
	this.langs.default.headerFilters.columns[column] = placeholder;

	if(this.lang && !this.lang.headerFilters.columns[column]){
		this.lang.headerFilters.columns[column] = placeholder;
	***REMOVED***
***REMOVED***;

//setup a lang description object
Localize.prototype.installLang = function(locale, lang){
	if(this.langs[locale]){
		this._setLangProp(this.langs[locale], lang);
	***REMOVED***else{
		this.langs[locale] = lang;
	***REMOVED***
***REMOVED***;

Localize.prototype._setLangProp = function(lang, values){
	for(let key in values){
		if(lang[key] && typeof lang[key] == "object"){
			this._setLangProp(lang[key], values[key])
		***REMOVED***else{
			lang[key] = values[key];
		***REMOVED***
	***REMOVED***
***REMOVED***;


//set current locale
Localize.prototype.setLocale = function(desiredLocale){
	var self = this;

	desiredLocale = desiredLocale || "default";

	//fill in any matching languge values
	function traverseLang(trans, path){
		for(var prop in trans){

			if(typeof trans[prop] == "object"){
				if(!path[prop]){
					path[prop] = {***REMOVED***;
				***REMOVED***
				traverseLang(trans[prop], path[prop]);
			***REMOVED***else{
				path[prop] = trans[prop];
			***REMOVED***
		***REMOVED***
	***REMOVED***

	//determing correct locale to load
	if(desiredLocale === true && navigator.language){
		//get local from system
		desiredLocale = navigator.language.toLowerCase();
	***REMOVED***

	if(desiredLocale){

		//if locale is not set, check for matching top level locale else use default
		if(!self.langs[desiredLocale]){
			let prefix = desiredLocale.split("-")[0];

			if(self.langs[prefix]){
				console.warn("Localization Error - Exact matching locale not found, using closest match: ", desiredLocale, prefix);
				desiredLocale = prefix;
			***REMOVED***else{
				console.warn("Localization Error - Matching locale not found, using default: ", desiredLocale);
				desiredLocale = "default";
			***REMOVED***
		***REMOVED***
	***REMOVED***

	self.locale = desiredLocale;

	//load default lang template
	self.lang = Tabulator.prototype.helpers.deepClone(self.langs.default || {***REMOVED***);

	if(desiredLocale != "default"){
		traverseLang(self.langs[desiredLocale], self.lang);
	***REMOVED***

	self.table.options.localized.call(self.table, self.locale, self.lang);

	self._executeBindings();
***REMOVED***;

//get current locale
Localize.prototype.getLocale = function(locale){
	return self.locale;
***REMOVED***;

//get lang object for given local or current if none provided
Localize.prototype.getLang = function(locale){
	return locale ? this.langs[locale] : this.lang;
***REMOVED***;

//get text for current locale
Localize.prototype.getText = function(path, value){
	var path = value ? path + "|" + value : path,
	pathArray = path.split("|"),
	text = this._getLangElement(pathArray, this.locale);

	// if(text === false){
	// 	console.warn("Localization Error - Matching localized text not found for given path: ", path);
	// ***REMOVED***

	return text || "";
***REMOVED***;

//traverse langs object and find localized copy
Localize.prototype._getLangElement = function(path, locale){
	var self = this;
	var root = self.lang;

	path.forEach(function(level){
		var rootPath;

		if(root){
			rootPath = root[level];

			if(typeof rootPath != "undefined"){
				root = rootPath;
			***REMOVED***else{
				root = false;
			***REMOVED***
		***REMOVED***
	***REMOVED***);

	return root;
***REMOVED***;

//set update binding
Localize.prototype.bind = function(path, callback){
	if(!this.bindings[path]){
		this.bindings[path] = [];
	***REMOVED***

	this.bindings[path].push(callback);

	callback(this.getText(path), this.lang);
***REMOVED***;

//itterate through bindings and trigger updates
Localize.prototype._executeBindings = function(){
	var self = this;

	for(let path in self.bindings){
		self.bindings[path].forEach(function(binding){
			binding(self.getText(path), self.lang);
		***REMOVED***);
	***REMOVED***
***REMOVED***;

//Localized text listings
Localize.prototype.langs = {
	"default":{ //hold default locale text
		"groups":{
			"item":"item",
			"items":"items",
		***REMOVED***,
		"columns":{
		***REMOVED***,
		"ajax":{
			"loading":"Loading",
			"error":"Error",
		***REMOVED***,
		"pagination":{
			"page_size":"Page Size",
			"first":"First",
			"first_title":"First Page",
			"last":"Last",
			"last_title":"Last Page",
			"prev":"Prev",
			"prev_title":"Prev Page",
			"next":"Next",
			"next_title":"Next Page",
		***REMOVED***,
		"headerFilters":{
			"default":"filter column...",
			"columns":{***REMOVED***
		***REMOVED***
	***REMOVED***,
***REMOVED***;

Tabulator.prototype.registerModule("localize", Localize);