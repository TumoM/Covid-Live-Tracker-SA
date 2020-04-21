/*
***REMOVED*** This file is part of the Tabulator package.
***REMOVED***
***REMOVED*** (c) Oliver Folkerd <oliver.folkerd@gmail.com>
***REMOVED***
***REMOVED*** For the full copyright and license information, please view the LICENSE
***REMOVED*** file that was distributed with this source code.
***REMOVED***
***REMOVED*** Full Documentation & Demos can be found at: http://olifolkerd.github.io/tabulator/
***REMOVED***
***REMOVED***/

 (function (factory) {
 	"use strict";
 	if (typeof define === 'function' && define.amd) {
 		define(['jquery', 'tabulator', 'jquery-ui'], factory);
 	***REMOVED***
 	else if(typeof module !== 'undefined' && module.exports) {
 		module.exports = factory(
 			require('jquery'),
 			require('tabulator'),
 			require('jquery-ui')
 		);
 	***REMOVED***
 	else {
 		factory(jQuery, Tabulator);
 	***REMOVED***
 ***REMOVED***(function ($, Tabulator) {

 	$.widget("ui.tabulator", {
 		_create:function(){
 			var options = Object.assign({***REMOVED***, this.options);

 			delete options.create;
 			delete options.disabled;

 			this.table = new Tabulator(this.element[0], options);

 			//map tabulator functions to jquery wrapper
 			for(var key in Tabulator.prototype){
 				if(typeof Tabulator.prototype[key] === "function" && key.charAt(0) !== "_"){
 					this[key] = this.table[key].bind(this.table);
 				***REMOVED***
 			***REMOVED***
 		***REMOVED***,

 		_setOption: function(option, value){
 			console.error("Tabulator jQuery wrapper does not support setting options after the table has been instantiated");
 		***REMOVED***,

 		_destroy: function(option, value){
 			this.table.destroy();
 		***REMOVED***,
 	***REMOVED***);
 ***REMOVED***));
