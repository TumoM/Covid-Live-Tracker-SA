var Ajax = function(table){

	this.table = table; //hold Tabulator object
	this.config = false; //hold config object for ajax request
	this.url = ""; //request URL
	this.urlGenerator = false;
	this.params = false; //request parameters

	this.loaderElement = this.createLoaderElement(); //loader message div
	this.msgElement = this.createMsgElement(); //message element
	this.loadingElement = false;
	this.errorElement = false;
	this.loaderPromise = false;

	this.progressiveLoad = false;
	this.loading = false;

	this.requestOrder = 0; //prevent requests comming out of sequence if overridden by another load request
***REMOVED***;

//initialize setup options
Ajax.prototype.initialize = function(){
	var template;

	this.loaderElement.appendChild(this.msgElement);

	if(this.table.options.ajaxLoaderLoading){
		if(typeof this.table.options.ajaxLoaderLoading == "string"){
			template = document.createElement('template');
			template.innerHTML = this.table.options.ajaxLoaderLoading.trim();
			this.loadingElement = template.content.firstChild;
		***REMOVED***else{
			this.loadingElement = this.table.options.ajaxLoaderLoading;
		***REMOVED***
	***REMOVED***

	this.loaderPromise = this.table.options.ajaxRequestFunc || this.defaultLoaderPromise;

	this.urlGenerator = this.table.options.ajaxURLGenerator || this.defaultURLGenerator;

	if(this.table.options.ajaxLoaderError){
		if(typeof this.table.options.ajaxLoaderError == "string"){
			template = document.createElement('template');
			template.innerHTML = this.table.options.ajaxLoaderError.trim();
			this.errorElement = template.content.firstChild;
		***REMOVED***else{
			this.errorElement = this.table.options.ajaxLoaderError;
		***REMOVED***
	***REMOVED***

	if(this.table.options.ajaxParams){
		this.setParams(this.table.options.ajaxParams);
	***REMOVED***

	if(this.table.options.ajaxConfig){
		this.setConfig(this.table.options.ajaxConfig);
	***REMOVED***

	if(this.table.options.ajaxURL){
		this.setUrl(this.table.options.ajaxURL);
	***REMOVED***

	if(this.table.options.ajaxProgressiveLoad){
		if(this.table.options.pagination){
			this.progressiveLoad = false;
			console.error("Progressive Load Error - Pagination and progressive load cannot be used at the same time");
		***REMOVED***else{
			if(this.table.modExists("page")){
				this.progressiveLoad = this.table.options.ajaxProgressiveLoad;
				this.table.modules.page.initializeProgressive(this.progressiveLoad);
			***REMOVED***else{
				console.error("Pagination plugin is required for progressive ajax loading");
			***REMOVED***
		***REMOVED***
	***REMOVED***
***REMOVED***;

Ajax.prototype.createLoaderElement = function (){
	var el = document.createElement("div");
	el.classList.add("tabulator-loader");
	return el;
***REMOVED***;

Ajax.prototype.createMsgElement = function (){
	var el = document.createElement("div");

	el.classList.add("tabulator-loader-msg");
	el.setAttribute("role", "alert");

	return el;
***REMOVED***;

//set ajax params
Ajax.prototype.setParams = function(params, update){
	if(update){
		this.params = this.params || {***REMOVED***;

		for(let key in params){
			this.params[key] = params[key];
		***REMOVED***
	***REMOVED***else{
		this.params = params;
	***REMOVED***
***REMOVED***;

Ajax.prototype.getParams = function(){
	return this.params || {***REMOVED***;
***REMOVED***;

//load config object
Ajax.prototype.setConfig = function(config){
	this._loadDefaultConfig();

	if(typeof config == "string"){
		this.config.method = config;
	***REMOVED***else{
		for(let key in config){
			this.config[key] = config[key];
		***REMOVED***
	***REMOVED***
***REMOVED***;

//create config object from default
Ajax.prototype._loadDefaultConfig = function(force){
	var self = this;
	if(!self.config || force){

		self.config = {***REMOVED***;

		//load base config from defaults
		for(let key in self.defaultConfig){
			self.config[key] = self.defaultConfig[key];
		***REMOVED***
	***REMOVED***
***REMOVED***;

//set request url
Ajax.prototype.setUrl = function(url){
	this.url = url;
***REMOVED***;

//get request url
Ajax.prototype.getUrl = function(){
	return this.url;
***REMOVED***;

//lstandard loading function
Ajax.prototype.loadData = function(inPosition, columnsChanged){
	var self = this;

	if(this.progressiveLoad){
		return this._loadDataProgressive();
	***REMOVED***else{
		return this._loadDataStandard(inPosition, columnsChanged);
	***REMOVED***
***REMOVED***;

Ajax.prototype.nextPage = function(diff){
	var margin;

	if(!this.loading){

		margin = this.table.options.ajaxProgressiveLoadScrollMargin || (this.table.rowManager.getElement().clientHeight***REMOVED*** 2);

		if(diff < margin){
			this.table.modules.page.nextPage()
			.then(()=>{***REMOVED***).catch(()=>{***REMOVED***);
		***REMOVED***
	***REMOVED***
***REMOVED***;

Ajax.prototype.blockActiveRequest = function(){
	this.requestOrder ++;
***REMOVED***;

Ajax.prototype._loadDataProgressive = function(){
	this.table.rowManager.setData([]);
	return this.table.modules.page.setPage(1);
***REMOVED***;

Ajax.prototype._loadDataStandard = function(inPosition, columnsChanged){
	return new Promise((resolve, reject)=>{
		this.sendRequest(inPosition)
		.then((data)=>{
			this.table.rowManager.setData(data, inPosition, columnsChanged)
			.then(()=>{
				resolve();
			***REMOVED***)
			.catch((e)=>{
				reject(e)
			***REMOVED***);
		***REMOVED***)
		.catch((e)=>{
			reject(e)
		***REMOVED***);
	***REMOVED***);
***REMOVED***;

Ajax.prototype.generateParamsList = function(data, prefix){
	var self = this,
	output = [];

	prefix = prefix || "";

	if ( Array.isArray(data) ) {
		data.forEach(function(item, i){
			output = output.concat(self.generateParamsList(item, prefix ? prefix + "[" + i + "]" : i));
		***REMOVED***);
	***REMOVED***else if (typeof data === "object"){
		for (var key in data){
			output = output.concat(self.generateParamsList(data[key], prefix ? prefix + "[" + key + "]" : key));
		***REMOVED***
	***REMOVED***else{
		output.push({key:prefix, value:data***REMOVED***);
	***REMOVED***

	return output;
***REMOVED***;


Ajax.prototype.serializeParams = function(params){
	var output = this.generateParamsList(params),
	encoded = [];

	output.forEach(function(item){
		encoded.push(encodeURIComponent(item.key) + "=" + encodeURIComponent(item.value));
	***REMOVED***);

	return encoded.join("&");
***REMOVED***;


//send ajax request
Ajax.prototype.sendRequest = function(silent){
	var self = this,
	url = self.url,
	requestNo, esc, query;

	self.requestOrder ++;
	requestNo = self.requestOrder;

	self._loadDefaultConfig();

	return new Promise((resolve, reject)=>{
		if(self.table.options.ajaxRequesting.call(this.table, self.url, self.params) !== false){

			self.loading = true;

			if(!silent){
				self.showLoader();
			***REMOVED***

			this.loaderPromise(url, self.config, self.params).then((data)=>{
				if(requestNo === self.requestOrder){
					if(self.table.options.ajaxResponse){
						data = self.table.options.ajaxResponse.call(self.table, self.url, self.params, data);
					***REMOVED***
					resolve(data);

					self.hideLoader();
					self.loading = false;
				***REMOVED***else{
					console.warn("Ajax Response Blocked - An active ajax request was blocked by an attempt to change table data while the request was being made");
				***REMOVED***

			***REMOVED***)
			.catch((error)=>{
				console.error("Ajax Load Error: ", error);
				self.table.options.ajaxError.call(self.table, error);

				self.showError();

				setTimeout(function(){
					self.hideLoader();
				***REMOVED***, 3000);

				self.loading = false;

				reject();
			***REMOVED***);
		***REMOVED***else{
			reject();
		***REMOVED***
	***REMOVED***);


***REMOVED***;

Ajax.prototype.showLoader = function(){
	var shouldLoad = typeof this.table.options.ajaxLoader === "function" ? this.table.options.ajaxLoader() : this.table.options.ajaxLoader;

	if(shouldLoad){

		this.hideLoader();

		while(this.msgElement.firstChild) this.msgElement.removeChild(this.msgElement.firstChild);
		this.msgElement.classList.remove("tabulator-error");
		this.msgElement.classList.add("tabulator-loading");

		if(this.loadingElement){
			this.msgElement.appendChild(this.loadingElement);
		***REMOVED***else{
			this.msgElement.innerHTML = this.table.modules.localize.getText("ajax|loading");
		***REMOVED***

		this.table.element.appendChild(this.loaderElement);
	***REMOVED***
***REMOVED***;

Ajax.prototype.showError = function(){
	this.hideLoader();

	while(this.msgElement.firstChild) this.msgElement.removeChild(this.msgElement.firstChild);
	this.msgElement.classList.remove("tabulator-loading");
	this.msgElement.classList.add("tabulator-error");

	if(this.errorElement){
		this.msgElement.appendChild(this.errorElement);
	***REMOVED***else{
		this.msgElement.innerHTML = this.table.modules.localize.getText("ajax|error");
	***REMOVED***

	this.table.element.appendChild(this.loaderElement);
***REMOVED***;

Ajax.prototype.hideLoader = function(){
	if(this.loaderElement.parentNode){
		this.loaderElement.parentNode.removeChild(this.loaderElement);
	***REMOVED***
***REMOVED***;

//default ajax config object
Ajax.prototype.defaultConfig = {
	method: "GET",
***REMOVED***;

Ajax.prototype.defaultURLGenerator = function(url, config, params){

	if(url){
		if(params && Object.keys(params).length){
			if(!config.method || config.method.toLowerCase() == "get"){
				config.method = "get";

				url += (url.includes("?") ? "&" : "?") + this.serializeParams(params);
			***REMOVED***
		***REMOVED***
	***REMOVED***

	return url;
***REMOVED***;

Ajax.prototype.defaultLoaderPromise = function(url, config, params){
	var self = this, contentType;

	return new Promise(function(resolve, reject){

		//set url
		url = self.urlGenerator(url, config, params);

		//set body content if not GET request
		if(config.method.toUpperCase() != "GET"){
			contentType = typeof self.table.options.ajaxContentType === "object" ?  self.table.options.ajaxContentType : self.contentTypeFormatters[self.table.options.ajaxContentType];
			if(contentType){

				for(var key in contentType.headers){
					if(!config.headers){
						config.headers = {***REMOVED***;
					***REMOVED***

					if(typeof config.headers[key] === "undefined"){
						config.headers[key] = contentType.headers[key];
					***REMOVED***
				***REMOVED***

				config.body = contentType.body.call(self, url, config, params);

			***REMOVED***else{
				console.warn("Ajax Error - Invalid ajaxContentType value:", self.table.options.ajaxContentType);
			***REMOVED***
		***REMOVED***

		if(url){

			//configure headers
			if(typeof config.headers === "undefined"){
				config.headers = {***REMOVED***;
			***REMOVED***

			if(typeof config.headers.Accept === "undefined"){
				config.headers.Accept = "application/json";
			***REMOVED***

			if(typeof config.headers["X-Requested-With"] === "undefined"){
				config.headers["X-Requested-With"] = "XMLHttpRequest";
			***REMOVED***

			if(typeof config.mode === "undefined"){
				config.mode = "cors";
			***REMOVED***

			if(config.mode == "cors"){

				if(typeof config.headers["Access-Control-Allow-Origin"] === "undefined"){
					config.headers["Access-Control-Allow-Origin"] = window.location.origin;
				***REMOVED***

				if(typeof config.credentials === "undefined"){
					config.credentials = 'same-origin';
				***REMOVED***
			***REMOVED***else{
				if(typeof config.credentials === "undefined"){
					config.credentials = 'include';
				***REMOVED***
			***REMOVED***

			//send request
			fetch(url, config)
			.then((response)=>{
				if(response.ok) {
					response.json()
					.then((data)=>{
						resolve(data);
					***REMOVED***).catch((error)=>{
						reject(error);
						console.warn("Ajax Load Error - Invalid JSON returned", error);
					***REMOVED***);
				***REMOVED***else{
					console.error("Ajax Load Error - Connection Error: " + response.status, response.statusText);
					reject(response);
				***REMOVED***
			***REMOVED***)
			.catch((error)=>{
				console.error("Ajax Load Error - Connection Error: ", error);
				reject(error);
			***REMOVED***);
		***REMOVED***else{
			console.warn("Ajax Load Error - No URL Set");
			resolve([]);
		***REMOVED***

	***REMOVED***);
***REMOVED***;

Ajax.prototype.contentTypeFormatters = {
	"json":{
		headers:{
			'Content-Type': 'application/json',
		***REMOVED***,
		body:function(url, config, params){
			return JSON.stringify(params);
		***REMOVED***,
	***REMOVED***,
	"form":{
		headers:{
		***REMOVED***,
		body:function(url, config, params){
			var output = this.generateParamsList(params),
			form = new FormData();

			output.forEach(function(item){
				form.append(item.key, item.value);
			***REMOVED***);

			return form;
		***REMOVED***,
	***REMOVED***,
***REMOVED***

Tabulator.prototype.registerModule("ajax", Ajax);
