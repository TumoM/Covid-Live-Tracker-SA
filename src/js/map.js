var provinceList = {
    "NORTH WEST": 'ZA-NW',
    "EASTERN CAPE": 'ZA-EC',
    "FREE TATE": 'ZA-FS',
    "MPUMALANGA": 'ZA-MP',
    "NORTHERN CAPE": 'ZA-NC',
    "LIMPOPO": 'ZA-LP',
    "WESTERN CAPE": 'ZA-WC',
    "GAUTENG": 'ZA-GT',
    "KWAZULU-NATAL": 'ZA-NL',
    "UNALLOCATED": 'ZA-UN'
***REMOVED***

var tooltip
var tooltipText
var tooltipRects
var width = 415;
var legendTitle = $('#legTitle')[0];
var xPen = 92;
var yPen = 220;
var legendSet=false;
var colourVal=1;

var provCase = {***REMOVED***;
var provDeath = {***REMOVED***;
var provActive = {***REMOVED***;
var provRecoveries = {***REMOVED***;
var cardList = [];

(function main() {
	console.log('In Main');
	cardList = [];
***REMOVED***());

***REMOVED***
***REMOVED*** @param {string***REMOVED*** name
***REMOVED***/
function displayName(name) {
	document.getElementById('country-name').firstChild.data = name;
***REMOVED***


(function () {
	tooltip = document.getElementById('country-name');
	tooltipText = tooltip.getElementsByTagName('text')[0];
	tooltipRects = tooltip.getElementsByTagName('rect');
	
	for (let i = 0; i < tooltipRects.length; i++) {
		tooltipRects[i].setAttributeNS(null, 'width', width);
	***REMOVED***
***REMOVED***());

const svg = document.getElementById('svg-1');

let triggers = document.getElementsByClassName('tooltip-trigger');
for (let i = 0; i < triggers.length; i++) {
	triggers[i].addEventListener('mousemove', showTooltip);
	triggers[i].addEventListener('mouseout', hideTooltip);
***REMOVED***

let x;
let
	y;

// Setup Legend
triggers = document.getElementsByClassName('keyText');
Object.values(triggers)
	.forEach((text) => {
		x = text.getAttribute('x');
		y = text.getAttribute('y');
		text.setAttribute('x', x - xPen);
		text.setAttribute('y', y - yPen);
	***REMOVED***);

triggers = document.getElementsByClassName('key legend');
Object.values(triggers)
	.forEach((text) => {
		x = text.getAttribute('x');
		y = text.getAttribute('y');
		text.setAttribute('x', x - xPen);
		text.setAttribute('y', y - yPen);
	***REMOVED***);

x = $('#legTitle')
	.attr('x');
y = $('#legTitle')
	.attr('y');
$('#legTitle')
	.attr({
		x: -x - xPen,
		y: y - yPen,
	***REMOVED***);

x = $('.lightBack')
	.attr('x');
y = $('.lightBack')
	.attr('y');
$('.lightBack')
	.attr({
		x: x - xPen,
		y: y - yPen,
	***REMOVED***);

function showTooltip(evt) {
	const CTM = svg.getScreenCTM();
	const x = 10;
	const y = 390;
	const id = evt.target.getAttributeNS(null, 'id');
	
	tooltipText.firstChild.data = evt.target.getAttributeNS(null, 'title');
	tooltip.setAttributeNS(null, 'transform', `translate(${x***REMOVED*** ${y***REMOVED***)`);
	const length = tooltipText.getComputedTextLength();
	tooltipText.setAttributeNS(null, 'x', (width - length) / 2);
	$('#casesTooltip')
		.text(CommaFormatted(provCase[id]));
	$('#deathsTooltip')
		.text(CommaFormatted(provDeath[id]));
	$('#recoveryTooltip')
		.text(CommaFormatted(provRecoveries[id]));
	tooltip.style.opacity = 1;
	// tooltip.setAttributeNS(null, "visibility", "visible");
***REMOVED***

function hideTooltip() {
	// TODO Un-hide
	tooltip.style.opacity = 0;
	// tooltip.setAttributeNS(null, "visibility", "hidden");
***REMOVED***

***REMOVED***
***REMOVED*** @param {string***REMOVED*** name
***REMOVED*** @param {number|string***REMOVED*** colour
***REMOVED***/
function colourCountry(name, colour, colourTag) {
	const country = document.getElementById(name);
	// country.className += ' colour' + colour;
	$(`#${name***REMOVED***`)
		.removeClass();
	$(`#${name***REMOVED***`)
		.addClass('land tooltip-trigger valid');
	country.classList.add(`colour${colourTag***REMOVED***${colour***REMOVED***`);
***REMOVED***


***REMOVED***
***REMOVED*** @param {[][]***REMOVED*** data
***REMOVED***/
function colourCountries(data, colourTag = 1) {
	for (let colour = 0; colour < data.length; colour++) {
		for (let country = 0; country < data[colour].length; country++) {
			colourCountry(data[colour][country], colour, colourTag);
		***REMOVED***
	***REMOVED***
***REMOVED***

function legendSetup(max, min, interval) {
	// setup text labels
	interval = Math.round(interval);
	const legendTexts = $('.keyText');
	const legendCol = $('.key.legend');
	legendCol.removeClass();
	legendCol.addClass('key legend');
	for (let i = 0; i < 5; i++) {
		legendCol[i].classList.add(`colour${colourVal***REMOVED***${i***REMOVED***`);
	***REMOVED***
	legendTexts[0].textContent = `0 to ${CommaFormatted(min)***REMOVED***`;
	legendTexts[1].textContent = `${CommaFormatted(min + 1)***REMOVED*** to ${CommaFormatted(min + interval)***REMOVED***`;
	legendTexts[2].textContent = `${CommaFormatted(max - interval***REMOVED*** 3 + 1)***REMOVED*** to ${CommaFormatted(max - interval***REMOVED*** 2)***REMOVED***`;
	legendTexts[3].textContent = `${CommaFormatted(max - interval***REMOVED*** 2 + 1)***REMOVED*** to ${CommaFormatted(max - interval)***REMOVED***`;
	legendTexts[4].textContent = `${CommaFormatted(max - interval + 1)***REMOVED*** to ${CommaFormatted(max)***REMOVED***`;
	// setup width
	console.log('Legend Set:', legendSet);
	if (!legendSet) {
		const width = $('rect.key:nth-child(7)')[0].getBoundingClientRect().width + $('text.keyText:nth-child(12)')[0].getBoundingClientRect().width;
		console.log('WIDTH:', width);
		$('.lightBack')
			.width('55%');
		const length = legendTitle.getComputedTextLength();
		legendTitle.setAttributeNS(null, 'x', (width - length) / 2 - xPen);
		legendSet = true;
	***REMOVED***
***REMOVED***
// colourCountries(data1)

function setColours(dummyData,colour=1,) {
    colourVal = colour;
    // Vars
    console.log('Setting Vars');
    let max = 0,
        min = Infinity,
        range = 0,
        interval = 0;
    let answers = [
        [],
        [],
        [],
        [],
        []
***REMOVED***;
    
    console.log('Setting Range');
    // Get Range
    Object.keys(dummyData).forEach((k) => {
        if (dummyData[k] !== null) {
            min = Math.min(min, dummyData[k]);
            max = Math.max(max, dummyData[k]);
      ***REMOVED***
  ***REMOVED***);
    max = Math.round(Math.ceil(max / 10))***REMOVED*** 10;
    min = Math.round(Math.floor(min / 10))***REMOVED*** 10;
    range = max - min
    // Divide into 4 or 5
    interval = range / 4;
    
    console.log('For Each Loop');
    // foreach loop.
    Object.keys(dummyData).forEach(prov => {
        if (prov !== 'ZA-UN') {
            let val = dummyData[prov];
            if ((max - interval < val) && (val <= max)) {
                answers[4].push(prov)
          ***REMOVED*** else if (max - (interval***REMOVED*** 2) <= val) {
                answers[3].push(prov)
          ***REMOVED*** else if (max - (interval***REMOVED*** 3) <= val) {
                answers[2].push(prov)
          ***REMOVED*** else if (max - (interval***REMOVED*** 4) < val) {
                answers[1].push(prov)
          ***REMOVED***
            else {
                answers[0].push(prov)
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***)
    console.log("ANSWERS:",answers)
    colourCountries(answers,colour)
    legendSetup(max,min,interval)
***REMOVED***

function setProvs(cases,deaths,recoveries, active) {
    provCase = cases;
    provDeath = deaths;
    provRecoveries = recoveries;
    provActive = active
    console.log("Recovs 1:",recoveries)
    setupSideBCards()
***REMOVED***

function CommaFormatted(amount) {
	const delimiter = ','; // replace comma if desired
	if (typeof amount === 'string' && amount.includes(delimiter) && !amount.includes(" ")){
		return(amount);
	***REMOVED***
	let i = parseInt(amount);
	if (isNaN(i)) { return 'N/A'; ***REMOVED***
	let minus = '';
	if (i < 0) { minus = '-'; ***REMOVED***
	i = Math.abs(i);
	let n = String(i);
	const a = [];
	while (n.length > 3) {
		const nn = n.substr(n.length - 3);
		a.unshift(nn);
		n = n.substr(0, n.length - 3);
	***REMOVED***
	if (n.length > 0) { a.unshift(n); ***REMOVED***
	n = a.join(delimiter);
	amount = n;
	amount = minus + amount;
	return amount;
***REMOVED***

function compareValues(key, order = 'desc') {
	return function innerSort(a, b) {
		if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			// property doesn't exist on either object
			return 0;
		***REMOVED***
		
		const varA = (typeof a[key] === 'string')
			? a[key].toUpperCase() : a[key];
		const varB = (typeof b[key] === 'string')
			? b[key].toUpperCase() : b[key];
		
		let comparison = 0;
		try {
			if (varA > varB) {
				comparison = 1;
			***REMOVED*** else if (varA < varB) {
				comparison = -1;
			***REMOVED***
		***REMOVED*** catch (e) {
			console.log('Error', e);
			console.log('-', varA);
		***REMOVED***
		return (
			(order === 'desc') ? (comparison***REMOVED*** -1) : comparison
		);
	***REMOVED***;
***REMOVED***
function setupSideBCards(){
    let province;

    for (const [nameFull, id] of Object.entries(provinceList)) {
        province = {name: nameFull,cases: provCase[id],deaths: provDeath[id],recoveries:provRecoveries[id],active:provActive[id]***REMOVED***
        cardList.push(province);
  ***REMOVED***
    // populateSideCards(cardList.sort(compareValues('cases')))
***REMOVED***

***REMOVED***
***REMOVED*** @param {Array***REMOVED*** cardList
***REMOVED***/
function populateSideCards(cardList){
    // console.log("Card List:",cardList)
    let counter = 0;
    let cards = $("#mapContainer .card");
    let figures;

    console.log('Cards',cards)
    cardList.forEach(item=>{
        console.log('Counter',counter)
        // the html block containing the spans and br tags
        figures = cards[counter].children[1].children[0].children;
        cards[counter].firstElementChild.firstElementChild.innerText=item.name // sets Card Heading.
        figures[0].innerText=CommaFormatted(item.cases);
        figures[2].innerText=CommaFormatted(item.deaths);
        figures[4].innerText=CommaFormatted(item.recoveries);
        figures[6].innerText=CommaFormatted(item.recoveries);
        counter++
  ***REMOVED***)
***REMOVED***

console.log('MAX HEIGHT:', $('#svg-1')
	.height() + Number($('#svgColumn')
	.css('padding-top')
	.split(/\D/)[0]));

// Sets the height of the left sidebar using the svg + padding on top and bot.
$('#provStatsContainer')
	.css('max-height', $('#svg-1')
		.height() + parseInt($('#svgColumn')
		.css('padding-top'))***REMOVED*** 2);

// Resets the container height as the window size changes. i.e when svg-1 and padding changes.
$(window).resize(()=>{
    $("#provStatsContainer").css("max-height",$("#svg-1").height() + parseInt($("#svgColumn").css('padding-top'))*2)
***REMOVED***)
$(document).ready(()=>{
    $(function()
    {
        $('.scroll-pane').jScrollPane(
            {
                showArrows: true,
                resizeSensor: true
          ***REMOVED***
        );
  ***REMOVED***);
    $('.toggle.button.map')
        .click((event)=>{
            console.log("you clicked me!")
            // $("#provStatsContainer").transition('slide right')
            $("#svgColumn").toggleClass("ten wide");
            $("#svgColumn").toggleClass("fourteen wide svgFocus");
            $("#provStatsContainer").toggleClass("sidebarHidden");

            $("#hideIcon").toggleClass("fa-rotate-180");



      ***REMOVED***)

    $('#filterC')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provCase,1)
            populateSideCards(cardList.sort(compareValues('cases')))


      ***REMOVED***)
    $('#filterD')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provDeath,2)
            populateSideCards(cardList.sort(compareValues('deaths')))



      ***REMOVED***)
    $('#filterR')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provRecoveries,3)
            populateSideCards(cardList.sort(compareValues('recoveries')))


      ***REMOVED***)
    $('#filterA')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provRecoveries,3)
            populateSideCards(cardList.sort(compareValues('active')))


      ***REMOVED***)
    $('#filterC2')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provCase,1)
            populateSideCards(cardList.sort(compareValues('cases')))


      ***REMOVED***)
    $('#filterD2')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provDeath,2)
            populateSideCards(cardList.sort(compareValues('deaths')))



      ***REMOVED***)
    $('#filterR2')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provRecoveries,3)
            populateSideCards(cardList.sort(compareValues('recoveries')))


      ***REMOVED***)
***REMOVED***)

//
// setColours(dummyData)
