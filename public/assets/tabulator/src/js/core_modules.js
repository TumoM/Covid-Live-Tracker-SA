;(function (global, factory) {
	if(typeof exports === 'object' && typeof module !== 'undefined'){
		module.exports = factory();
	***REMOVED***else if(typeof define === 'function' && define.amd){
		define(factory);
	***REMOVED***else{
		global.Tabulator = factory();
	***REMOVED***
***REMOVED***(this, (function () {

	/*=include core.js***REMOVED***/
	/*=include modules_enabled.js***REMOVED***/

	return Tabulator;

***REMOVED***)));