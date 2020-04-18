/*!
***REMOVED*** jScrollPane - v2.2.1 - 2018-09-27
***REMOVED*** http://jscrollpane.kelvinluck.com/
***REMOVED***
***REMOVED*** Copyright (c) 2014 Kelvin Luck
***REMOVED*** Copyright (c) 2017-2018 Tuukka Pasanen
***REMOVED*** Dual licensed under the MIT or GPL licenses.
***REMOVED***/

// Script: jScrollPane - cross browser customisable scrollbars
//
//***REMOVED***Version: 2.2.1, Last updated: 2018-09-27*
//
// Project Home - http://jscrollpane.kelvinluck.com/
// GitHub       - http://github.com/vitch/jScrollPane
// CND          - https://cdnjs.com/libraries/jScrollPane
// Source       - https://cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.2.1/script/jquery.jscrollpane.min.js
// (Minified)   - https://cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.2.1/script/jquery.jscrollpane.js
// CSS          - https://cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.2.1/style/jquery.jscrollpane.css
// (Minified)   - https://cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.2.1/style/jquery.jscrollpane.min.css
//
// About: License
//
// Copyright (c) 2017 Kelvin Luck
// Copyright (c) 2017-2018 Tuukka Pasanen
// Dual licensed under the MIT or GPL Version 2 licenses.
// http://jscrollpane.kelvinluck.com/MIT-LICENSE.txt
// http://jscrollpane.kelvinluck.com/GPL-LICENSE.txt
//
// About: Examples
//
// All examples and demos are available through the jScrollPane example site at:
// http://jscrollpane.kelvinluck.com/
//
// About: Support and Testing
//
// This plugin is tested on the browsers below and has been found to work reliably on them. If you run
// into a problem on one of the supported browsers then please visit the support section on the jScrollPane
// website (http://jscrollpane.kelvinluck.com/) for more information on getting support. You are also
// welcome to fork the project on GitHub if you can contribute a fix for a given issue.
//
// jQuery Versions - jQuery 3.x. Although script should work from jQuery 1.1 and up but no promises are made.
// Browsers Tested - See jQuery browser support page: https://jquery.com/browser-support/. Only modern
//                   browsers are supported.
//
// About: Release History
//
// 2.2.1       - (2018-09-27) No changed applied to release so same as RC1/2
// 2.2.1-rc.2  - (2018-06-14) Sucked NPM release have to make new Release.. this is 2018!
// 2.2.1-rc.1  - (2018-06-14) Fixed CSSLint warnings which can lead CSS problems in
//                            production! Please report a issue if this breaks something!
//                 ***REMOVED*****REMOVED*****REMOVED*** Merged:
//                            - #360 Register to globally available version of jQuery
// 2.2.0       - (2018-05-16) No changes to RC1
// 2.2.0-rc.1  - (2018-04-28) Merged resize sensor to find out size changes of screen and
//                            again little bit tuned this to support more npm goodies.
//                 ***REMOVED*****REMOVED*****REMOVED*** Merged:
//                            - #361 Event based reinitialising - Resize Sensor
//                            - #359 Use npm scripts and local dev dependencies to build the project
// 2.1.3       - (2018-04-04) No changes from Release Candidate 2 so making release
// 2.1.3-rc.2  - (2018-03-13) Now using 'script/jquery.jscrollpane.min.js' main
//                            in package.json rather than 'Gruntfile.js'
// 2.1.3-rc.1  - (2018-03-05) Moving Gruntfile.js to root and example HTML
//                            to subdirectory examples
// 2.1.2       - (2018-02-16) Just on console.log remove and Release!
//                            This version should play nicely with NPM
// 2.1.2-rc.2  - (2018-02-03) Update package.json main-tag
// 2.1.2-rc.1  - (2018-01-18) Release on NPM.
// 2.1.1       - (2018-01-12) As everyone stays silent then we just release! No changes from RC.1
// 2.1.1-rc.1  - (2017-12-23) Started to slowly merge stuff (HO HO HO Merry Christmas!)
//  ***REMOVED*****REMOVED*****REMOVED*** Merged
//             - #349 - ScrollPane reinitialization should adapt to changed container size
//             - #335 Set drag bar width/height with .css instead of .width/.height
//             - #297 added two settings: always show HScroll and VScroll
//  ***REMOVED*****REMOVED*****REMOVED*** Bugs
//             - #8 Make it possible to tell a scrollbar to be "always on"
// 2.1.0  - (2017-12-16) Update jQuery to version 3.x

(function (factory) {
  if ( typeof define === 'function' && define.amd ) {
      // AMD. Register as an anonymous module.
      define(['jquery'], factory);
***REMOVED*** else if (typeof exports === 'object') {
      // Node/CommonJS style for Browserify
      module.exports = factory(jQuery || require('jquery'));
***REMOVED*** else {
      // Browser globals
      factory(jQuery);
***REMOVED***
***REMOVED***(function($){

	$.fn.jScrollPane = function(settings)
	{
		// JScrollPane "class" - public methods are available through $('selector').data('jsp')
		function JScrollPane(elem, s)
		{
			var settings, jsp = this, pane, paneWidth, paneHeight, container, contentWidth, contentHeight,
				percentInViewH, percentInViewV, isScrollableV, isScrollableH, verticalDrag, dragMaxY,
				verticalDragPosition, horizontalDrag, dragMaxX, horizontalDragPosition,
				verticalBar, verticalTrack, scrollbarWidth, verticalTrackHeight, verticalDragHeight, arrowUp, arrowDown,
				horizontalBar, horizontalTrack, horizontalTrackWidth, horizontalDragWidth, arrowLeft, arrowRight,
				reinitialiseInterval, originalPadding, originalPaddingTotalWidth, previousContentWidth,
				wasAtTop = true, wasAtLeft = true, wasAtBottom = false, wasAtRight = false,
				originalElement = elem.clone(false, false).empty(), resizeEventsAdded = false,
				mwEvent = $.fn.mwheelIntent ? 'mwheelIntent.jsp' : 'mousewheel.jsp';

			var reinitialiseFn = function() {
				// if size has changed then reinitialise
				if (settings.resizeSensorDelay > 0) {
					setTimeout(function() {
						initialise(settings);
					***REMOVED***, settings.resizeSensorDelay);
				***REMOVED***
				else {
					initialise(settings);
				***REMOVED***
			***REMOVED***;

			if (elem.css('box-sizing') === 'border-box') {
				originalPadding = 0;
				originalPaddingTotalWidth = 0;
			***REMOVED*** else {
				originalPadding = elem.css('paddingTop') + ' ' +
									elem.css('paddingRight') + ' ' +
									elem.css('paddingBottom') + ' ' +
									elem.css('paddingLeft');
				originalPaddingTotalWidth = (parseInt(elem.css('paddingLeft'), 10) || 0) +
											(parseInt(elem.css('paddingRight'), 10) || 0);
			***REMOVED***

			function initialise(s)
			{

				var /*firstChild, lastChild,***REMOVED***/isMaintainingPositon, lastContentX, lastContentY,
						hasContainingSpaceChanged, originalScrollTop, originalScrollLeft,
						newPaneWidth, newPaneHeight, maintainAtBottom = false, maintainAtRight = false;

				settings = s;

				if (pane === undefined) {
					originalScrollTop = elem.scrollTop();
					originalScrollLeft = elem.scrollLeft();

					elem.css(
						{
							overflow: 'hidden',
							padding: 0
						***REMOVED***
					);
					// TODO: Deal with where width/ height is 0 as it probably means the element is hidden and we should
					// come back to it later and check once it is unhidden...
					paneWidth = elem.innerWidth() + originalPaddingTotalWidth;
					paneHeight = elem.innerHeight();

					elem.width(paneWidth);

					pane = $('<div class="jspPane" />').css('padding', originalPadding).append(elem.children());
					container = $('<div class="jspContainer" />')
						.css({
							'width': paneWidth + 'px',
							'height': paneHeight + 'px'
						***REMOVED***
					).append(pane).appendTo(elem);

					/*
					// Move any margins from the first and last children up to the container so they can still
					// collapse with neighbouring elements as they would before jScrollPane
					firstChild = pane.find(':first-child');
					lastChild = pane.find(':last-child');
					elem.css(
						{
							'margin-top': firstChild.css('margin-top'),
							'margin-bottom': lastChild.css('margin-bottom')
						***REMOVED***
					);
					firstChild.css('margin-top', 0);
					lastChild.css('margin-bottom', 0);
					*/
				***REMOVED*** else {
					elem.css('width', '');

					// To measure the required dimensions accurately, temporarily override the CSS positioning
					// of the container and pane.
					container.css({width: 'auto', height: 'auto'***REMOVED***);
					pane.css('position', 'static');

					newPaneWidth = elem.innerWidth() + originalPaddingTotalWidth;
					newPaneHeight = elem.innerHeight();
					pane.css('position', 'absolute');

					maintainAtBottom = settings.stickToBottom && isCloseToBottom();
					maintainAtRight  = settings.stickToRight  && isCloseToRight();

					hasContainingSpaceChanged = newPaneWidth !== paneWidth || newPaneHeight !== paneHeight;

					paneWidth = newPaneWidth;
					paneHeight = newPaneHeight;
					container.css({width: paneWidth, height: paneHeight***REMOVED***);

					// If nothing changed since last check...
					if (!hasContainingSpaceChanged && previousContentWidth == contentWidth && pane.outerHeight() == contentHeight) {
						elem.width(paneWidth);
						return;
					***REMOVED***
					previousContentWidth = contentWidth;

					pane.css('width', '');
					elem.width(paneWidth);

					container.find('>.jspVerticalBar,>.jspHorizontalBar').remove().end();
				***REMOVED***

				pane.css('overflow', 'auto');
				if (s.contentWidth) {
					contentWidth = s.contentWidth;
				***REMOVED*** else {
					contentWidth = pane[0].scrollWidth;
				***REMOVED***
				contentHeight = pane[0].scrollHeight;
				pane.css('overflow', '');

				percentInViewH = contentWidth / paneWidth;
				percentInViewV = contentHeight / paneHeight;
				isScrollableV = percentInViewV > 1 || settings.alwaysShowVScroll;
				isScrollableH = percentInViewH > 1 || settings.alwaysShowHScroll;

				if (!(isScrollableH || isScrollableV)) {
					elem.removeClass('jspScrollable');
					pane.css({
            top: 0,
            left: 0,
						width: container.width() - originalPaddingTotalWidth
					***REMOVED***);
					removeMousewheel();
					removeFocusHandler();
					removeKeyboardNav();
					removeClickOnTrack();
				***REMOVED*** else {
					elem.addClass('jspScrollable');

					isMaintainingPositon = settings.maintainPosition && (verticalDragPosition || horizontalDragPosition);
					if (isMaintainingPositon) {
						lastContentX = contentPositionX();
						lastContentY = contentPositionY();
					***REMOVED***

					initialiseVerticalScroll();
					initialiseHorizontalScroll();
					resizeScrollbars();

					if (isMaintainingPositon) {
						scrollToX(maintainAtRight  ? (contentWidth  - paneWidth ) : lastContentX, false);
						scrollToY(maintainAtBottom ? (contentHeight - paneHeight) : lastContentY, false);
					***REMOVED***

					initFocusHandler();
					initMousewheel();
					initTouch();

					if (settings.enableKeyboardNavigation) {
						initKeyboardNav();
					***REMOVED***
					if (settings.clickOnTrack) {
						initClickOnTrack();
					***REMOVED***

					observeHash();
					if (settings.hijackInternalLinks) {
						hijackInternalLinks();
					***REMOVED***
				***REMOVED***

				if (!settings.resizeSensor && settings.autoReinitialise && !reinitialiseInterval) {
					reinitialiseInterval = setInterval(
						function()
						{
							initialise(settings);
						***REMOVED***,
						settings.autoReinitialiseDelay
					);
				***REMOVED*** else if (!settings.resizeSensor && !settings.autoReinitialise && reinitialiseInterval) {
					clearInterval(reinitialiseInterval);
				***REMOVED***

				if(settings.resizeSensor && !resizeEventsAdded) {
		
					// detect size change in content
					detectSizeChanges(pane, reinitialiseFn);
			
					// detect size changes of scroll element
					detectSizeChanges(elem, reinitialiseFn);
			
					// detect size changes of container
					detectSizeChanges(elem.parent(), reinitialiseFn);

					// add a reinit on window resize also for safety
					window.addEventListener('resize', reinitialiseFn);
			
					resizeEventsAdded = true;
				***REMOVED***

        if(originalScrollTop && elem.scrollTop(0)) {
          scrollToY(originalScrollTop, false);
      ***REMOVED***

				if(originalScrollLeft && elem.scrollLeft(0)) {
          scrollToX(originalScrollLeft, false);
      ***REMOVED***

				elem.trigger('jsp-initialised', [isScrollableH || isScrollableV]);
			***REMOVED***

			function detectSizeChanges(element, callback) {
 
				// create resize event elements - based on resize sensor: https://github.com/flowkey/resize-sensor/
				var resizeWidth, resizeHeight;
				var resizeElement = document.createElement('div');
				var resizeGrowElement = document.createElement('div');
				var resizeGrowChildElement = document.createElement('div');
				var resizeShrinkElement = document.createElement('div');
				var resizeShrinkChildElement = document.createElement('div');
		
				// add necessary styling
				resizeElement.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: scroll; z-index: -1; visibility: hidden;';
				resizeGrowElement.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: scroll; z-index: -1; visibility: hidden;';
				resizeShrinkElement.style.cssText = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: scroll; z-index: -1; visibility: hidden;';
		
				resizeGrowChildElement.style.cssText = 'position: absolute; left: 0; top: 0;';
				resizeShrinkChildElement.style.cssText = 'position: absolute; left: 0; top: 0; width: 200%; height: 200%;';
		
				// Create a function to programmatically update sizes
				var updateSizes = function() {
		
					resizeGrowChildElement.style.width = resizeGrowElement.offsetWidth + 10 + 'px';
					resizeGrowChildElement.style.height = resizeGrowElement.offsetHeight + 10 + 'px';
		
					resizeGrowElement.scrollLeft = resizeGrowElement.scrollWidth;
					resizeGrowElement.scrollTop = resizeGrowElement.scrollHeight;
		
					resizeShrinkElement.scrollLeft = resizeShrinkElement.scrollWidth;
					resizeShrinkElement.scrollTop = resizeShrinkElement.scrollHeight;
		
					resizeWidth = element.width();
					resizeHeight = element.height();
				***REMOVED***;
		
				// create functions to call when content grows
				var onGrow = function() {
		
					// check to see if the content has change size
					if (element.width() > resizeWidth || element.height() > resizeHeight) {
			
						// if size has changed then reinitialise
						callback.apply(this, []);
					***REMOVED***
					// after reinitialising update sizes
					updateSizes();
				***REMOVED***;
		
				// create functions to call when content shrinks
				var onShrink = function() {
		
					// check to see if the content has change size
					if (element.width() < resizeWidth || element.height() < resizeHeight) {
			
						// if size has changed then reinitialise
						callback.apply(this, []);
					***REMOVED***
					// after reinitialising update sizes
					updateSizes();
				***REMOVED***;
		
				// bind to scroll events
				resizeGrowElement.addEventListener('scroll', onGrow.bind(this));
				resizeShrinkElement.addEventListener('scroll', onShrink.bind(this));
		
				// nest elements before adding to pane
				resizeGrowElement.appendChild(resizeGrowChildElement);
				resizeShrinkElement.appendChild(resizeShrinkChildElement);
		
				resizeElement.appendChild(resizeGrowElement);
				resizeElement.appendChild(resizeShrinkElement);
		
				element.append(resizeElement);

				// ensure parent element is not statically positioned
				if(window.getComputedStyle(element[0], null).getPropertyValue('position') === 'static') {
					element[0].style.position = 'relative';
				***REMOVED***
		
				// update sizes initially
				updateSizes();
			***REMOVED***

			function initialiseVerticalScroll()
			{
				if (isScrollableV) {

					container.append(
						$('<div class="jspVerticalBar" />').append(
							$('<div class="jspCap jspCapTop" />'),
							$('<div class="jspTrack" />').append(
								$('<div class="jspDrag" />').append(
									$('<div class="jspDragTop" />'),
									$('<div class="jspDragBottom" />')
								)
							),
							$('<div class="jspCap jspCapBottom" />')
						)
					);

					verticalBar = container.find('>.jspVerticalBar');
					verticalTrack = verticalBar.find('>.jspTrack');
					verticalDrag = verticalTrack.find('>.jspDrag');

					if (settings.showArrows) {
						arrowUp = $('<a class="jspArrow jspArrowUp" />').on(
							'mousedown.jsp', getArrowScroll(0, -1)
						).on('click.jsp', nil);
						arrowDown = $('<a class="jspArrow jspArrowDown" />').on(
							'mousedown.jsp', getArrowScroll(0, 1)
						).on('click.jsp', nil);
						if (settings.arrowScrollOnHover) {
							arrowUp.on('mouseover.jsp', getArrowScroll(0, -1, arrowUp));
							arrowDown.on('mouseover.jsp', getArrowScroll(0, 1, arrowDown));
						***REMOVED***

						appendArrows(verticalTrack, settings.verticalArrowPositions, arrowUp, arrowDown);
					***REMOVED***

					verticalTrackHeight = paneHeight;
					container.find('>.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow').each(
						function()
						{
							verticalTrackHeight -= $(this).outerHeight();
						***REMOVED***
					);


					verticalDrag.on(
                                                "mouseenter",
						function()
						{
							verticalDrag.addClass('jspHover');
						***REMOVED***
                                        ).on(
                                                "mouseleave",
						function()
						{
							verticalDrag.removeClass('jspHover');
						***REMOVED***
					).on(
						'mousedown.jsp',
						function(e)
						{
							// Stop IE from allowing text selection
							$('html').on('dragstart.jsp selectstart.jsp', nil);

							verticalDrag.addClass('jspActive');

							var startY = e.pageY - verticalDrag.position().top;

							$('html').on(
								'mousemove.jsp',
								function(e)
								{
									positionDragY(e.pageY - startY, false);
								***REMOVED***
							).on('mouseup.jsp mouseleave.jsp', cancelDrag);
							return false;
						***REMOVED***
					);
					sizeVerticalScrollbar();
				***REMOVED***
			***REMOVED***

			function sizeVerticalScrollbar()
			{
				verticalTrack.height(verticalTrackHeight + 'px');
				verticalDragPosition = 0;
				scrollbarWidth = settings.verticalGutter + verticalTrack.outerWidth();

				// Make the pane thinner to allow for the vertical scrollbar
				pane.width(paneWidth - scrollbarWidth - originalPaddingTotalWidth);

				// Add margin to the left of the pane if scrollbars are on that side (to position
				// the scrollbar on the left or right set it's left or right property in CSS)
				try {
					if (verticalBar.position().left === 0) {
						pane.css('margin-left', scrollbarWidth + 'px');
					***REMOVED***
				***REMOVED*** catch (err) {
				***REMOVED***
			***REMOVED***

			function initialiseHorizontalScroll()
			{
				if (isScrollableH) {

					container.append(
						$('<div class="jspHorizontalBar" />').append(
							$('<div class="jspCap jspCapLeft" />'),
							$('<div class="jspTrack" />').append(
								$('<div class="jspDrag" />').append(
									$('<div class="jspDragLeft" />'),
									$('<div class="jspDragRight" />')
								)
							),
							$('<div class="jspCap jspCapRight" />')
						)
					);

					horizontalBar = container.find('>.jspHorizontalBar');
					horizontalTrack = horizontalBar.find('>.jspTrack');
					horizontalDrag = horizontalTrack.find('>.jspDrag');

					if (settings.showArrows) {
						arrowLeft = $('<a class="jspArrow jspArrowLeft" />').on(
							'mousedown.jsp', getArrowScroll(-1, 0)
						).on('click.jsp', nil);
						arrowRight = $('<a class="jspArrow jspArrowRight" />').on(
							'mousedown.jsp', getArrowScroll(1, 0)
						).on('click.jsp', nil);
						if (settings.arrowScrollOnHover) {
							arrowLeft.on('mouseover.jsp', getArrowScroll(-1, 0, arrowLeft));
							arrowRight.on('mouseover.jsp', getArrowScroll(1, 0, arrowRight));
						***REMOVED***
						appendArrows(horizontalTrack, settings.horizontalArrowPositions, arrowLeft, arrowRight);
					***REMOVED***

					horizontalDrag.on(
                                                "mouseenter",
						function()
						{
							horizontalDrag.addClass('jspHover');
						***REMOVED***
                                        ).on(
                                                "mouseleave",
						function()
						{
							horizontalDrag.removeClass('jspHover');
						***REMOVED***
					).on(
						'mousedown.jsp',
						function(e)
						{
							// Stop IE from allowing text selection
							$('html').on('dragstart.jsp selectstart.jsp', nil);

							horizontalDrag.addClass('jspActive');

							var startX = e.pageX - horizontalDrag.position().left;

							$('html').on(
								'mousemove.jsp',
								function(e)
								{
									positionDragX(e.pageX - startX, false);
								***REMOVED***
							).on('mouseup.jsp mouseleave.jsp', cancelDrag);
							return false;
						***REMOVED***
					);
					horizontalTrackWidth = container.innerWidth();
					sizeHorizontalScrollbar();
				***REMOVED***
			***REMOVED***

			function sizeHorizontalScrollbar()
			{
				container.find('>.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow').each(
					function()
					{
						horizontalTrackWidth -= $(this).outerWidth();
					***REMOVED***
				);

				horizontalTrack.width(horizontalTrackWidth + 'px');
				horizontalDragPosition = 0;
			***REMOVED***

			function resizeScrollbars()
			{
				if (isScrollableH && isScrollableV) {
					var horizontalTrackHeight = horizontalTrack.outerHeight(),
						verticalTrackWidth = verticalTrack.outerWidth();
					verticalTrackHeight -= horizontalTrackHeight;
					$(horizontalBar).find('>.jspCap:visible,>.jspArrow').each(
						function()
						{
							horizontalTrackWidth += $(this).outerWidth();
						***REMOVED***
					);
					horizontalTrackWidth -= verticalTrackWidth;
					paneHeight -= verticalTrackWidth;
					paneWidth -= horizontalTrackHeight;
					horizontalTrack.parent().append(
						$('<div class="jspCorner" />').css('width', horizontalTrackHeight + 'px')
					);
					sizeVerticalScrollbar();
					sizeHorizontalScrollbar();
				***REMOVED***
				// reflow content
				if (isScrollableH) {
					pane.width((container.outerWidth() - originalPaddingTotalWidth) + 'px');
				***REMOVED***
				contentHeight = pane.outerHeight();
				percentInViewV = contentHeight / paneHeight;

				if (isScrollableH) {
					horizontalDragWidth = Math.ceil(1 / percentInViewH***REMOVED*** horizontalTrackWidth);
					if (horizontalDragWidth > settings.horizontalDragMaxWidth) {
						horizontalDragWidth = settings.horizontalDragMaxWidth;
					***REMOVED*** else if (horizontalDragWidth < settings.horizontalDragMinWidth) {
						horizontalDragWidth = settings.horizontalDragMinWidth;
					***REMOVED***
					horizontalDrag.css('width', horizontalDragWidth + 'px');
					dragMaxX = horizontalTrackWidth - horizontalDragWidth;
					_positionDragX(horizontalDragPosition); // To update the state for the arrow buttons
				***REMOVED***
				if (isScrollableV) {
					verticalDragHeight = Math.ceil(1 / percentInViewV***REMOVED*** verticalTrackHeight);
					if (verticalDragHeight > settings.verticalDragMaxHeight) {
						verticalDragHeight = settings.verticalDragMaxHeight;
					***REMOVED*** else if (verticalDragHeight < settings.verticalDragMinHeight) {
						verticalDragHeight = settings.verticalDragMinHeight;
					***REMOVED***
					verticalDrag.css('height', verticalDragHeight + 'px');
					dragMaxY = verticalTrackHeight - verticalDragHeight;
					_positionDragY(verticalDragPosition); // To update the state for the arrow buttons
				***REMOVED***
			***REMOVED***

			function appendArrows(ele, p, a1, a2)
			{
				var p1 = "before", p2 = "after", aTemp;

				// Sniff for mac... Is there a better way to determine whether the arrows would naturally appear
				// at the top or the bottom of the bar?
				if (p == "os") {
					p = /Mac/.test(navigator.platform) ? "after" : "split";
				***REMOVED***
				if (p == p1) {
					p2 = p;
				***REMOVED*** else if (p == p2) {
					p1 = p;
					aTemp = a1;
					a1 = a2;
					a2 = aTemp;
				***REMOVED***

				ele[p1](a1)[p2](a2);
			***REMOVED***

			function getArrowScroll(dirX, dirY, ele)
			{
				return function()
				{
					arrowScroll(dirX, dirY, this, ele);
					this.blur();
					return false;
				***REMOVED***;
			***REMOVED***

			function arrowScroll(dirX, dirY, arrow, ele)
			{
				arrow = $(arrow).addClass('jspActive');

				var eve,
					scrollTimeout,
					isFirst = true,
					doScroll = function()
					{
						if (dirX !== 0) {
							jsp.scrollByX(dirX***REMOVED*** settings.arrowButtonSpeed);
						***REMOVED***
						if (dirY !== 0) {
							jsp.scrollByY(dirY***REMOVED*** settings.arrowButtonSpeed);
						***REMOVED***
						scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.arrowRepeatFreq);
						isFirst = false;
					***REMOVED***;

				doScroll();

				eve = ele ? 'mouseout.jsp' : 'mouseup.jsp';
				ele = ele || $('html');
				ele.on(
					eve,
					function()
					{
						arrow.removeClass('jspActive');
						if(scrollTimeout) {
              clearTimeout(scrollTimeout);
          ***REMOVED***
						scrollTimeout = null;
						ele.off(eve);
					***REMOVED***
				);
			***REMOVED***

			function initClickOnTrack()
			{
				removeClickOnTrack();
				if (isScrollableV) {
					verticalTrack.on(
						'mousedown.jsp',
						function(e)
						{
							if (e.originalTarget === undefined || e.originalTarget == e.currentTarget) {
								var clickedTrack = $(this),
									offset = clickedTrack.offset(),
									direction = e.pageY - offset.top - verticalDragPosition,
									scrollTimeout,
									isFirst = true,
									doScroll = function()
									{
										var offset = clickedTrack.offset(),
											pos = e.pageY - offset.top - verticalDragHeight / 2,
											contentDragY = paneHeight***REMOVED*** settings.scrollPagePercent,
											dragY = dragMaxY***REMOVED*** contentDragY / (contentHeight - paneHeight);
										if (direction < 0) {
											if (verticalDragPosition - dragY > pos) {
												jsp.scrollByY(-contentDragY);
											***REMOVED*** else {
												positionDragY(pos);
											***REMOVED***
										***REMOVED*** else if (direction > 0) {
											if (verticalDragPosition + dragY < pos) {
												jsp.scrollByY(contentDragY);
											***REMOVED*** else {
												positionDragY(pos);
											***REMOVED***
										***REMOVED*** else {
											cancelClick();
											return;
										***REMOVED***
										scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
										isFirst = false;
									***REMOVED***,
									cancelClick = function()
									{
										if(scrollTimeout) {
                      clearTimeout(scrollTimeout);
                  ***REMOVED***
										scrollTimeout = null;
										$(document).off('mouseup.jsp', cancelClick);
									***REMOVED***;
								doScroll();
								$(document).on('mouseup.jsp', cancelClick);
								return false;
							***REMOVED***
						***REMOVED***
					);
				***REMOVED***

				if (isScrollableH) {
					horizontalTrack.on(
						'mousedown.jsp',
						function(e)
						{
							if (e.originalTarget === undefined || e.originalTarget == e.currentTarget) {
								var clickedTrack = $(this),
									offset = clickedTrack.offset(),
									direction = e.pageX - offset.left - horizontalDragPosition,
									scrollTimeout,
									isFirst = true,
									doScroll = function()
									{
										var offset = clickedTrack.offset(),
											pos = e.pageX - offset.left - horizontalDragWidth / 2,
											contentDragX = paneWidth***REMOVED*** settings.scrollPagePercent,
											dragX = dragMaxX***REMOVED*** contentDragX / (contentWidth - paneWidth);
										if (direction < 0) {
											if (horizontalDragPosition - dragX > pos) {
												jsp.scrollByX(-contentDragX);
											***REMOVED*** else {
												positionDragX(pos);
											***REMOVED***
										***REMOVED*** else if (direction > 0) {
											if (horizontalDragPosition + dragX < pos) {
												jsp.scrollByX(contentDragX);
											***REMOVED*** else {
												positionDragX(pos);
											***REMOVED***
										***REMOVED*** else {
											cancelClick();
											return;
										***REMOVED***
										scrollTimeout = setTimeout(doScroll, isFirst ? settings.initialDelay : settings.trackClickRepeatFreq);
										isFirst = false;
									***REMOVED***,
									cancelClick = function()
									{
										if(scrollTimeout) {
                      clearTimeout(scrollTimeout);
                  ***REMOVED***
										scrollTimeout = null;
										$(document).off('mouseup.jsp', cancelClick);
									***REMOVED***;
								doScroll();
								$(document).on('mouseup.jsp', cancelClick);
								return false;
							***REMOVED***
						***REMOVED***
					);
				***REMOVED***
			***REMOVED***

			function removeClickOnTrack()
			{
				if (horizontalTrack) {
					horizontalTrack.off('mousedown.jsp');
				***REMOVED***
				if (verticalTrack) {
					verticalTrack.off('mousedown.jsp');
				***REMOVED***
			***REMOVED***

			function cancelDrag()
			{
				$('html').off('dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp');

				if (verticalDrag) {
					verticalDrag.removeClass('jspActive');
				***REMOVED***
				if (horizontalDrag) {
					horizontalDrag.removeClass('jspActive');
				***REMOVED***
			***REMOVED***

			function positionDragY(destY, animate)
			{
				if (!isScrollableV) {
					return;
				***REMOVED***
				if (destY < 0) {
					destY = 0;
				***REMOVED*** else if (destY > dragMaxY) {
					destY = dragMaxY;
				***REMOVED***

				// allow for devs to prevent the JSP from being scrolled
				var willScrollYEvent = new $.Event("jsp-will-scroll-y");
				elem.trigger(willScrollYEvent, [destY]);

				if (willScrollYEvent.isDefaultPrevented()) {
					return;
				***REMOVED***

				var tmpVerticalDragPosition = destY || 0;

				var isAtTop = tmpVerticalDragPosition === 0,
					isAtBottom = tmpVerticalDragPosition == dragMaxY,
					percentScrolled = destY/ dragMaxY,
					destTop = -percentScrolled***REMOVED*** (contentHeight - paneHeight);

				// can't just check if(animate) because false is a valid value that could be passed in...
				if (animate === undefined) {
					animate = settings.animateScroll;
				***REMOVED***
				if (animate) {
					jsp.animate(verticalDrag, 'top', destY,	_positionDragY, function() {
						elem.trigger('jsp-user-scroll-y', [-destTop, isAtTop, isAtBottom]);
					***REMOVED***);
				***REMOVED*** else {
					verticalDrag.css('top', destY);
					_positionDragY(destY);
					elem.trigger('jsp-user-scroll-y', [-destTop, isAtTop, isAtBottom]);
				***REMOVED***

			***REMOVED***

			function _positionDragY(destY)
			{
				if (destY === undefined) {
					destY = verticalDrag.position().top;
				***REMOVED***

				container.scrollTop(0);
				verticalDragPosition = destY || 0;

				var isAtTop = verticalDragPosition === 0,
					isAtBottom = verticalDragPosition == dragMaxY,
					percentScrolled = destY/ dragMaxY,
					destTop = -percentScrolled***REMOVED*** (contentHeight - paneHeight);

				if (wasAtTop != isAtTop || wasAtBottom != isAtBottom) {
					wasAtTop = isAtTop;
					wasAtBottom = isAtBottom;
					elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
				***REMOVED***

				updateVerticalArrows(isAtTop, isAtBottom);
				pane.css('top', destTop);
				elem.trigger('jsp-scroll-y', [-destTop, isAtTop, isAtBottom]).trigger('scroll');
			***REMOVED***

			function positionDragX(destX, animate)
			{
				if (!isScrollableH) {
					return;
				***REMOVED***
				if (destX < 0) {
					destX = 0;
				***REMOVED*** else if (destX > dragMaxX) {
					destX = dragMaxX;
				***REMOVED***


				// allow for devs to prevent the JSP from being scrolled
				var willScrollXEvent = new $.Event("jsp-will-scroll-x");
				elem.trigger(willScrollXEvent, [destX]);

				if (willScrollXEvent.isDefaultPrevented()) {
					return;
				***REMOVED***

				var tmpHorizontalDragPosition = destX ||0;

				var isAtLeft = tmpHorizontalDragPosition === 0,
					isAtRight = tmpHorizontalDragPosition == dragMaxX,
					percentScrolled = destX / dragMaxX,
					destLeft = -percentScrolled***REMOVED*** (contentWidth - paneWidth);

				if (animate === undefined) {
					animate = settings.animateScroll;
				***REMOVED***
				if (animate) {
					jsp.animate(horizontalDrag, 'left', destX,	_positionDragX, function() {
						elem.trigger('jsp-user-scroll-x', [-destLeft, isAtLeft, isAtRight]);
					***REMOVED***);
				***REMOVED*** else {
					horizontalDrag.css('left', destX);
					_positionDragX(destX);
					elem.trigger('jsp-user-scroll-x', [-destLeft, isAtLeft, isAtRight]);
				***REMOVED***
			***REMOVED***

			function _positionDragX(destX)
			{
				if (destX === undefined) {
					destX = horizontalDrag.position().left;
				***REMOVED***

				container.scrollTop(0);
				horizontalDragPosition = destX ||0;

				var isAtLeft = horizontalDragPosition === 0,
					isAtRight = horizontalDragPosition == dragMaxX,
					percentScrolled = destX / dragMaxX,
					destLeft = -percentScrolled***REMOVED*** (contentWidth - paneWidth);

				if (wasAtLeft != isAtLeft || wasAtRight != isAtRight) {
					wasAtLeft = isAtLeft;
					wasAtRight = isAtRight;
					elem.trigger('jsp-arrow-change', [wasAtTop, wasAtBottom, wasAtLeft, wasAtRight]);
				***REMOVED***

				updateHorizontalArrows(isAtLeft, isAtRight);
				pane.css('left', destLeft);
				elem.trigger('jsp-scroll-x', [-destLeft, isAtLeft, isAtRight]).trigger('scroll');
			***REMOVED***

			function updateVerticalArrows(isAtTop, isAtBottom)
			{
				if (settings.showArrows) {
					arrowUp[isAtTop ? 'addClass' : 'removeClass']('jspDisabled');
					arrowDown[isAtBottom ? 'addClass' : 'removeClass']('jspDisabled');
				***REMOVED***
			***REMOVED***

			function updateHorizontalArrows(isAtLeft, isAtRight)
			{
				if (settings.showArrows) {
					arrowLeft[isAtLeft ? 'addClass' : 'removeClass']('jspDisabled');
					arrowRight[isAtRight ? 'addClass' : 'removeClass']('jspDisabled');
				***REMOVED***
			***REMOVED***

			function scrollToY(destY, animate)
			{
				var percentScrolled = destY / (contentHeight - paneHeight);
				positionDragY(percentScrolled***REMOVED*** dragMaxY, animate);
			***REMOVED***

			function scrollToX(destX, animate)
			{
				var percentScrolled = destX / (contentWidth - paneWidth);
				positionDragX(percentScrolled***REMOVED*** dragMaxX, animate);
			***REMOVED***

			function scrollToElement(ele, stickToTop, animate)
			{
				var e, eleHeight, eleWidth, eleTop = 0, eleLeft = 0, viewportTop, viewportLeft, maxVisibleEleTop, maxVisibleEleLeft, destY, destX;

				// Legal hash values aren't necessarily legal jQuery selectors so we need to catch any
				// errors from the lookup...
				try {
					e = $(ele);
				***REMOVED*** catch (err) {
					return;
				***REMOVED***
				eleHeight = e.outerHeight();
				eleWidth= e.outerWidth();

				container.scrollTop(0);
				container.scrollLeft(0);

				// loop through parents adding the offset top of any elements that are relatively positioned between
				// the focused element and the jspPane so we can get the true distance from the top
				// of the focused element to the top of the scrollpane...
				while (!e.is('.jspPane')) {
					eleTop += e.position().top;
					eleLeft += e.position().left;
					e = e.offsetParent();
					if (/^body|html$/i.test(e[0].nodeName)) {
						// we ended up too high in the document structure. Quit!
						return;
					***REMOVED***
				***REMOVED***

				viewportTop = contentPositionY();
				maxVisibleEleTop = viewportTop + paneHeight;
				if (eleTop < viewportTop || stickToTop) { // element is above viewport
					destY = eleTop - settings.horizontalGutter;
				***REMOVED*** else if (eleTop + eleHeight > maxVisibleEleTop) { // element is below viewport
					destY = eleTop - paneHeight + eleHeight + settings.horizontalGutter;
				***REMOVED***
				if (!isNaN(destY)) {
					scrollToY(destY, animate);
				***REMOVED***

				viewportLeft = contentPositionX();
	            maxVisibleEleLeft = viewportLeft + paneWidth;
	            if (eleLeft < viewportLeft || stickToTop) { // element is to the left of viewport
	                destX = eleLeft - settings.horizontalGutter;
	          ***REMOVED*** else if (eleLeft + eleWidth > maxVisibleEleLeft) { // element is to the right viewport
	                destX = eleLeft - paneWidth + eleWidth + settings.horizontalGutter;
	          ***REMOVED***
	            if (!isNaN(destX)) {
	                scrollToX(destX, animate);
	          ***REMOVED***

			***REMOVED***

			function contentPositionX()
			{
				return -pane.position().left;
			***REMOVED***

			function contentPositionY()
			{
				return -pane.position().top;
			***REMOVED***

			function isCloseToBottom()
			{
				var scrollableHeight = contentHeight - paneHeight;
				return (scrollableHeight > 20) && (scrollableHeight - contentPositionY() < 10);
			***REMOVED***

			function isCloseToRight()
			{
				var scrollableWidth = contentWidth - paneWidth;
				return (scrollableWidth > 20) && (scrollableWidth - contentPositionX() < 10);
			***REMOVED***

			function initMousewheel()
			{
				container.off(mwEvent).on(
					mwEvent,
					function (event, delta, deltaX, deltaY) {

                        if (!horizontalDragPosition) horizontalDragPosition = 0;
                        if (!verticalDragPosition) verticalDragPosition = 0;

						var dX = horizontalDragPosition, dY = verticalDragPosition, factor = event.deltaFactor || settings.mouseWheelSpeed;
						jsp.scrollBy(deltaX***REMOVED*** factor, -deltaY***REMOVED*** factor, false);
						// return true if there was no movement so rest of screen can scroll
						return dX == horizontalDragPosition && dY == verticalDragPosition;
					***REMOVED***
				);
			***REMOVED***

			function removeMousewheel()
			{
				container.off(mwEvent);
			***REMOVED***

			function nil()
			{
				return false;
			***REMOVED***

			function initFocusHandler()
			{
				pane.find(':input,a').off('focus.jsp').on(
					'focus.jsp',
					function(e)
					{
						scrollToElement(e.target, false);
					***REMOVED***
				);
			***REMOVED***

			function removeFocusHandler()
			{
				pane.find(':input,a').off('focus.jsp');
			***REMOVED***

			function initKeyboardNav()
			{
				var keyDown, elementHasScrolled, validParents = [];
				if(isScrollableH) {
          validParents.push(horizontalBar[0]);
      ***REMOVED***

				if(isScrollableV) {
          validParents.push(verticalBar[0]);
      ***REMOVED***

				// IE also focuses elements that don't have tabindex set.
				pane.on(
					'focus.jsp',
					function()
					{
						elem.focus();
					***REMOVED***
				);

				elem.attr('tabindex', 0)
					.off('keydown.jsp keypress.jsp')
					.on(
						'keydown.jsp',
						function(e)
						{
							if (e.target !== this && !(validParents.length && $(e.target).closest(validParents).length)){
								return;
							***REMOVED***
							var dX = horizontalDragPosition, dY = verticalDragPosition;
							switch(e.keyCode) {
								case 40: // down
								case 38: // up
								case 34: // page down
								case 32: // space
								case 33: // page up
								case 39: // right
								case 37: // left
									keyDown = e.keyCode;
									keyDownHandler();
									break;
								case 35: // end
									scrollToY(contentHeight - paneHeight);
									keyDown = null;
									break;
								case 36: // home
									scrollToY(0);
									keyDown = null;
									break;
							***REMOVED***

							elementHasScrolled = e.keyCode == keyDown && dX != horizontalDragPosition || dY != verticalDragPosition;
							return !elementHasScrolled;
						***REMOVED***
					).on(
						'keypress.jsp', // For FF/ OSX so that we can cancel the repeat key presses if the JSP scrolls...
						function(e)
						{
							if (e.keyCode == keyDown) {
								keyDownHandler();
							***REMOVED***
							// If the keypress is not related to the area, ignore it. Fixes problem with inputs inside scrolled area. Copied from line 955.
							if (e.target !== this && !(validParents.length && $(e.target).closest(validParents).length)){
								return;
							***REMOVED***
							return !elementHasScrolled;
						***REMOVED***
					);

				if (settings.hideFocus) {
					elem.css('outline', 'none');
					if ('hideFocus' in container[0]){
						elem.attr('hideFocus', true);
					***REMOVED***
				***REMOVED*** else {
					elem.css('outline', '');
					if ('hideFocus' in container[0]){
						elem.attr('hideFocus', false);
					***REMOVED***
				***REMOVED***

				function keyDownHandler()
				{
					var dX = horizontalDragPosition, dY = verticalDragPosition;
					switch(keyDown) {
						case 40: // down
							jsp.scrollByY(settings.keyboardSpeed, false);
							break;
						case 38: // up
							jsp.scrollByY(-settings.keyboardSpeed, false);
							break;
						case 34: // page down
						case 32: // space
							jsp.scrollByY(paneHeight***REMOVED*** settings.scrollPagePercent, false);
							break;
						case 33: // page up
							jsp.scrollByY(-paneHeight***REMOVED*** settings.scrollPagePercent, false);
							break;
						case 39: // right
							jsp.scrollByX(settings.keyboardSpeed, false);
							break;
						case 37: // left
							jsp.scrollByX(-settings.keyboardSpeed, false);
							break;
					***REMOVED***

					elementHasScrolled = dX != horizontalDragPosition || dY != verticalDragPosition;
					return elementHasScrolled;
				***REMOVED***
			***REMOVED***

			function removeKeyboardNav()
			{
				elem.attr('tabindex', '-1')
					.removeAttr('tabindex')
					.off('keydown.jsp keypress.jsp');

				pane.off('.jsp');
			***REMOVED***

			function observeHash()
			{
				if (location.hash && location.hash.length > 1) {
					var e,
						retryInt,
						hash = escape(location.hash.substr(1)) // hash must be escaped to prevent XSS
						;
					try {
						e = $('#' + hash + ', a[name="' + hash + '"]');
					***REMOVED*** catch (err) {
						return;
					***REMOVED***

					if (e.length && pane.find(hash)) {
						// nasty workaround but it appears to take a little while before the hash has done its thing
						// to the rendered page so we just wait until the container's scrollTop has been messed up.
						if (container.scrollTop() === 0) {
							retryInt = setInterval(
								function()
								{
									if (container.scrollTop() > 0) {
										scrollToElement(e, true);
										$(document).scrollTop(container.position().top);
										clearInterval(retryInt);
									***REMOVED***
								***REMOVED***,
								50
							);
						***REMOVED*** else {
							scrollToElement(e, true);
							$(document).scrollTop(container.position().top);
						***REMOVED***
					***REMOVED***
				***REMOVED***
			***REMOVED***

			function hijackInternalLinks()
			{
				// only register the link handler once
				if ($(document.body).data('jspHijack')) {
					return;
				***REMOVED***

				// remember that the handler was bound
				$(document.body).data('jspHijack', true);

				// use live handler to also capture newly created links
				$(document.body).delegate('a[href*="#"]', 'click', function(event) {
					// does the link point to the same page?
					// this also takes care of cases with a <base>-Tag or Links not starting with the hash #
					// e.g. <a href="index.html#test"> when the current url already is index.html
					var href = this.href.substr(0, this.href.indexOf('#')),
						locationHref = location.href,
						hash,
						element,
						container,
						jsp,
						scrollTop,
						elementTop;
					if (location.href.indexOf('#') !== -1) {
						locationHref = location.href.substr(0, location.href.indexOf('#'));
					***REMOVED***
					if (href !== locationHref) {
						// the link points to another page
						return;
					***REMOVED***

					// check if jScrollPane should handle this click event
					hash = escape(this.href.substr(this.href.indexOf('#') + 1));

					// find the element on the page
					try {
						element = $('#' + hash + ', a[name="' + hash + '"]');
					***REMOVED*** catch (e) {
						// hash is not a valid jQuery identifier
						return;
					***REMOVED***

					if (!element.length) {
						// this link does not point to an element on this page
						return;
					***REMOVED***

					container = element.closest('.jspScrollable');
					jsp = container.data('jsp');

					// jsp might be another jsp instance than the one, that bound this event
					// remember: this event is only bound once for all instances.
					jsp.scrollToElement(element, true);

					if (container[0].scrollIntoView) {
						// also scroll to the top of the container (if it is not visible)
						scrollTop = $(window).scrollTop();
						elementTop = element.offset().top;
						if (elementTop < scrollTop || elementTop > scrollTop + $(window).height()) {
							container[0].scrollIntoView();
						***REMOVED***
					***REMOVED***

					// jsp handled this event, prevent the browser default (scrolling :P)
					event.preventDefault();
				***REMOVED***);
			***REMOVED***

			// Init touch on iPad, iPhone, iPod, Android
			function initTouch()
			{
				var startX,
					startY,
					touchStartX,
					touchStartY,
					moved,
					moving = false;

				container.off('touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick').on(
					'touchstart.jsp',
					function(e)
					{
						var touch = e.originalEvent.touches[0];
						startX = contentPositionX();
						startY = contentPositionY();
						touchStartX = touch.pageX;
						touchStartY = touch.pageY;
						moved = false;
						moving = true;
					***REMOVED***
				).on(
					'touchmove.jsp',
					function(ev)
					{
						if(!moving) {
							return;
						***REMOVED***

						var touchPos = ev.originalEvent.touches[0],
							dX = horizontalDragPosition, dY = verticalDragPosition;

						jsp.scrollTo(startX + touchStartX - touchPos.pageX, startY + touchStartY - touchPos.pageY);

						moved = moved || Math.abs(touchStartX - touchPos.pageX) > 5 || Math.abs(touchStartY - touchPos.pageY) > 5;

						// return true if there was no movement so rest of screen can scroll
						return dX == horizontalDragPosition && dY == verticalDragPosition;
					***REMOVED***
				).on(
					'touchend.jsp',
					function(e)
					{
						moving = false;
						/*if(moved) {
							return false;
						***REMOVED****/
					***REMOVED***
				).on(
					'click.jsp-touchclick',
					function(e)
					{
						if(moved) {
							moved = false;
							return false;
						***REMOVED***
					***REMOVED***
				);
			***REMOVED***

			function destroy(){
				var currentY = contentPositionY(),
					currentX = contentPositionX();
				elem.removeClass('jspScrollable').off('.jsp');
				pane.off('.jsp');
				elem.replaceWith(originalElement.append(pane.children()));
				originalElement.scrollTop(currentY);
				originalElement.scrollLeft(currentX);

				// clear reinitialize timer if active
				if (reinitialiseInterval) {
					clearInterval(reinitialiseInterval);
				***REMOVED***
			***REMOVED***

			// Public API
			$.extend(
				jsp,
				{
					// Reinitialises the scroll pane (if it's internal dimensions have changed since the last time it
					// was initialised). The settings object which is passed in will override any settings from the
					// previous time it was initialised - if you don't pass any settings then the ones from the previous
					// initialisation will be used.
					reinitialise: function(s)
					{
						s = $.extend({***REMOVED***, settings, s);
						initialise(s);
					***REMOVED***,
					// Scrolls the specified element (a jQuery object, DOM node or jQuery selector string) into view so
					// that it can be seen within the viewport. If stickToTop is true then the element will appear at
					// the top of the viewport, if it is false then the viewport will scroll as little as possible to
					// show the element. You can also specify if you want animation to occur. If you don't provide this
					// argument then the animateScroll value from the settings object is used instead.
					scrollToElement: function(ele, stickToTop, animate)
					{
						scrollToElement(ele, stickToTop, animate);
					***REMOVED***,
					// Scrolls the pane so that the specified co-ordinates within the content are at the top left
					// of the viewport. animate is optional and if not passed then the value of animateScroll from
					// the settings object this jScrollPane was initialised with is used.
					scrollTo: function(destX, destY, animate)
					{
						scrollToX(destX, animate);
						scrollToY(destY, animate);
					***REMOVED***,
					// Scrolls the pane so that the specified co-ordinate within the content is at the left of the
					// viewport. animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					scrollToX: function(destX, animate)
					{
						scrollToX(destX, animate);
					***REMOVED***,
					// Scrolls the pane so that the specified co-ordinate within the content is at the top of the
					// viewport. animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					scrollToY: function(destY, animate)
					{
						scrollToY(destY, animate);
					***REMOVED***,
					// Scrolls the pane to the specified percentage of its maximum horizontal scroll position. animate
					// is optional and if not passed then the value of animateScroll from the settings object this
					// jScrollPane was initialised with is used.
					scrollToPercentX: function(destPercentX, animate)
					{
						scrollToX(destPercentX***REMOVED*** (contentWidth - paneWidth), animate);
					***REMOVED***,
					// Scrolls the pane to the specified percentage of its maximum vertical scroll position. animate
					// is optional and if not passed then the value of animateScroll from the settings object this
					// jScrollPane was initialised with is used.
					scrollToPercentY: function(destPercentY, animate)
					{
						scrollToY(destPercentY***REMOVED*** (contentHeight - paneHeight), animate);
					***REMOVED***,
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollBy: function(deltaX, deltaY, animate)
					{
						jsp.scrollByX(deltaX, animate);
						jsp.scrollByY(deltaY, animate);
					***REMOVED***,
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollByX: function(deltaX, animate)
					{
						var destX = contentPositionX() + Math[deltaX<0 ? 'floor' : 'ceil'](deltaX),
							percentScrolled = destX / (contentWidth - paneWidth);
						positionDragX(percentScrolled***REMOVED*** dragMaxX, animate);
					***REMOVED***,
					// Scrolls the pane by the specified amount of pixels. animate is optional and if not passed then
					// the value of animateScroll from the settings object this jScrollPane was initialised with is used.
					scrollByY: function(deltaY, animate)
					{
						var destY = contentPositionY() + Math[deltaY<0 ? 'floor' : 'ceil'](deltaY),
							percentScrolled = destY / (contentHeight - paneHeight);
						positionDragY(percentScrolled***REMOVED*** dragMaxY, animate);
					***REMOVED***,
					// Positions the horizontal drag at the specified x position (and updates the viewport to reflect
					// this). animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					positionDragX: function(x, animate)
					{
						positionDragX(x, animate);
					***REMOVED***,
					// Positions the vertical drag at the specified y position (and updates the viewport to reflect
					// this). animate is optional and if not passed then the value of animateScroll from the settings
					// object this jScrollPane was initialised with is used.
					positionDragY: function(y, animate)
					{
						positionDragY(y, animate);
					***REMOVED***,
					// This method is called when jScrollPane is trying to animate to a new position. You can override
					// it if you want to provide advanced animation functionality. It is passed the following arguments:
					// ***REMOVED*** ele          - the element whose position is being animated
					// ***REMOVED*** prop         - the property that is being animated
					// ***REMOVED*** value        - the value it's being animated to
					// ***REMOVED*** stepCallback - a function that you must execute each time you update the value of the property
					// ***REMOVED*** completeCallback - a function that will be executed after the animation had finished
					// You can use the default implementation (below) as a starting point for your own implementation.
					animate: function(ele, prop, value, stepCallback, completeCallback)
					{
						var params = {***REMOVED***;
						params[prop] = value;
						ele.animate(
							params,
							{
								'duration'	: settings.animateDuration,
								'easing'	: settings.animateEase,
								'queue'		: false,
								'step'		: stepCallback,
								'complete'	: completeCallback
							***REMOVED***
						);
					***REMOVED***,
					// Returns the current x position of the viewport with regards to the content pane.
					getContentPositionX: function()
					{
						return contentPositionX();
					***REMOVED***,
					// Returns the current y position of the viewport with regards to the content pane.
					getContentPositionY: function()
					{
						return contentPositionY();
					***REMOVED***,
					// Returns the width of the content within the scroll pane.
					getContentWidth: function()
					{
						return contentWidth;
					***REMOVED***,
					// Returns the height of the content within the scroll pane.
					getContentHeight: function()
					{
						return contentHeight;
					***REMOVED***,
					// Returns the horizontal position of the viewport within the pane content.
					getPercentScrolledX: function()
					{
						return contentPositionX() / (contentWidth - paneWidth);
					***REMOVED***,
					// Returns the vertical position of the viewport within the pane content.
					getPercentScrolledY: function()
					{
						return contentPositionY() / (contentHeight - paneHeight);
					***REMOVED***,
					// Returns whether or not this scrollpane has a horizontal scrollbar.
					getIsScrollableH: function()
					{
						return isScrollableH;
					***REMOVED***,
					// Returns whether or not this scrollpane has a vertical scrollbar.
					getIsScrollableV: function()
					{
						return isScrollableV;
					***REMOVED***,
					// Gets a reference to the content pane. It is important that you use this method if you want to
					// edit the content of your jScrollPane as if you access the element directly then you may have some
					// problems (as your original element has had additional elements for the scrollbars etc added into
					// it).
					getContentPane: function()
					{
						return pane;
					***REMOVED***,
					// Scrolls this jScrollPane down as far as it can currently scroll. If animate isn't passed then the
					// animateScroll value from settings is used instead.
					scrollToBottom: function(animate)
					{
						positionDragY(dragMaxY, animate);
					***REMOVED***,
					// Hijacks the links on the page which link to content inside the scrollpane. If you have changed
					// the content of your page (e.g. via AJAX) and want to make sure any new anchor links to the
					// contents of your scroll pane will work then call this function.
					hijackInternalLinks: $.noop,
					// Removes the jScrollPane and returns the page to the state it was in before jScrollPane was
					// initialised.
					destroy: function()
					{
							destroy();
					***REMOVED***
				***REMOVED***
			);

			initialise(s);
		***REMOVED***

		// Pluginifying code...
		settings = $.extend({***REMOVED***, $.fn.jScrollPane.defaults, settings);

		// Apply default speed
		$.each(['arrowButtonSpeed', 'trackClickSpeed', 'keyboardSpeed'], function() {
			settings[this] = settings[this] || settings.speed;
		***REMOVED***);

		return this.each(
			function()
			{
				var elem = $(this), jspApi = elem.data('jsp');
				if (jspApi) {
					jspApi.reinitialise(settings);
				***REMOVED*** else {
					$("script",elem).filter('[type="text/javascript"],:not([type])').remove();
					jspApi = new JScrollPane(elem, settings);
					elem.data('jsp', jspApi);
				***REMOVED***
			***REMOVED***
		);
	***REMOVED***;

	$.fn.jScrollPane.defaults = {
		showArrows					: false,
		maintainPosition			: true,
		stickToBottom				: false,
		stickToRight				: false,
		clickOnTrack				: true,
		autoReinitialise			: false,
		autoReinitialiseDelay		: 500,
		verticalDragMinHeight		: 0,
		verticalDragMaxHeight		: 99999,
		horizontalDragMinWidth		: 0,
		horizontalDragMaxWidth		: 99999,
		contentWidth				: undefined,
		animateScroll				: false,
		animateDuration				: 300,
		animateEase					: 'linear',
		hijackInternalLinks			: false,
		verticalGutter				: 4,
		horizontalGutter			: 4,
		mouseWheelSpeed				: 3,
		arrowButtonSpeed			: 0,
		arrowRepeatFreq				: 50,
		arrowScrollOnHover			: false,
		trackClickSpeed				: 0,
		trackClickRepeatFreq		: 70,
		verticalArrowPositions		: 'split',
		horizontalArrowPositions	: 'split',
		enableKeyboardNavigation	: true,
		hideFocus					: false,
		keyboardSpeed				: 0,
		initialDelay                : 300,        // Delay before starting repeating
		speed						: 30,		// Default speed when others falsey
		scrollPagePercent			: 0.8,		// Percent of visible area scrolled when pageUp/Down or track area pressed
		alwaysShowVScroll			: false,
		alwaysShowHScroll			: false,
		resizeSensor				: false,
		resizeSensorDelay			: 0,
	***REMOVED***;

***REMOVED***));
