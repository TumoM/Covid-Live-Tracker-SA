
/*var data1 = [
    [],
    ['ZA-NW', 'ZA-EC', 'ZA-FS'],
    ['ZA-MP', 'ZA-NC', 'ZA-LP'],
    ['ZA-WC'],
    ['ZA-GT', 'ZA-NL']
];





const dummyData2 = [{
    'ZA-NW': 19,
    'ZA-EC': 88,
    'ZA-FS': 96,
    'ZA-MP': 21,
    'ZA-NC': 16,
    'ZA-LP': 23,
    'ZA-WC': 587,
    'ZA-GT': 865,
    'ZA-NL': 443,
    'ZA-UN': 15
***REMOVED***]*/

const provinceList = {
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
let width = 415;
let legendTitle = $('#legTitle')[0];
const xPen = 92,
    yPen = 220;
let legendSet=false;

let provCase = {***REMOVED***
let provDeath = {***REMOVED***
let provRecoveries = {***REMOVED***
let cardList = []


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

    for (var i = 0; i < tooltipRects.length; i++) {
        tooltipRects[i].setAttributeNS(null, "width", width);
  ***REMOVED***

***REMOVED***)();

var svg = document.getElementById('svg-1');

var triggers = document.getElementsByClassName('tooltip-trigger');
for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener('mousemove', showTooltip);
    triggers[i].addEventListener('mouseout', hideTooltip);
***REMOVED***

let x, y;

// Setup Legend
triggers = document.getElementsByClassName('keyText');
Object.values(triggers).forEach((text) =>{
    x = text.getAttribute('x');
    y = text.getAttribute('y');
    text.setAttribute('x',x-xPen);
    text.setAttribute('y',y-yPen);
***REMOVED***)

triggers = document.getElementsByClassName('key legend');
Object.values(triggers).forEach((text) =>{
    x = text.getAttribute('x');
    y = text.getAttribute('y');
    text.setAttribute('x',x-xPen);
    text.setAttribute('y',y-yPen);
***REMOVED***)

x = $('#legTitle').attr('x');
y = $('#legTitle').attr('y');
$('#legTitle').attr({'x':-x-xPen,'y':y-yPen***REMOVED***)

x = $('.lightBack').attr('x');
y = $('.lightBack').attr('y');
$('.lightBack').attr({'x':x-xPen,'y':y-yPen***REMOVED***)



function showTooltip(evt) {
    var CTM = svg.getScreenCTM();
    var x = 10;
    var y = 390;
    let id = evt.target.getAttributeNS(null, "id");
    
    tooltipText.firstChild.data = evt.target.getAttributeNS(null, "title");
    tooltip.setAttributeNS(null, "transform", "translate(" + x + " " + y + ")");
    var length = tooltipText.getComputedTextLength();
    tooltipText.setAttributeNS(null,"x",(width-length)/2);
    $("#casesTooltip").text(CommaFormatted(provCase[id]))
    $("#deathsTooltip").text(CommaFormatted(provDeath[id]))
    $("#recoveryTooltip").text(CommaFormatted(provRecoveries[id]))
    tooltip.style.opacity=1;
    // tooltip.setAttributeNS(null, "visibility", "visible");


***REMOVED***

function hideTooltip() {
    // TODO Un-hide
    // tooltip.style.opacity=0;
    // tooltip.setAttributeNS(null, "visibility", "hidden");

***REMOVED***

***REMOVED***
***REMOVED*** @param {string***REMOVED*** name
***REMOVED*** @param {number|string***REMOVED*** colour
***REMOVED***/
function colourCountry(name, colour) {
    var country = document.getElementById(name);
    //country.className += ' colour' + colour;
    $("#"+name).removeClass()
    $("#"+name).addClass("land tooltip-trigger valid")
    country.classList.add('colour' + colour)

***REMOVED***






***REMOVED***
***REMOVED*** @param {[][]***REMOVED*** data
***REMOVED***/
function colourCountries(data) {
    for (var colour = 0; colour < data.length; colour++) {
        for (var country = 0; country < data[colour].length; country++) {
            colourCountry(data[colour][country], colour);
      ***REMOVED***
  ***REMOVED***
***REMOVED***

function legendSetup(max,min,interval) {
    // setup text labels
    interval = Math.round(interval)
    let legendTexts = $('.keyText')
    legendTexts[0].textContent=`0 to ${CommaFormatted(min-1)***REMOVED***`
    legendTexts[1].textContent=`${CommaFormatted(min)***REMOVED*** to ${CommaFormatted(min+interval-1)***REMOVED***`
    legendTexts[2].textContent=`${CommaFormatted(max-interval*3)***REMOVED*** to ${CommaFormatted(max-interval*2-1)***REMOVED***`
    legendTexts[3].textContent=`${CommaFormatted(max-interval*2)***REMOVED*** to ${CommaFormatted(max-interval-1)***REMOVED***`
    legendTexts[4].textContent=`${CommaFormatted(max-interval)***REMOVED*** to ${CommaFormatted(max)***REMOVED***`
    // setup width
    console.log("Legend Set:",legendSet)
    if (!legendSet) {
        let width = $('#key')[0].getBoundingClientRect().width;
        $('.lightBack').width(width)
        let length = legendTitle.getComputedTextLength()
        legendTitle.setAttributeNS(null, "x", (width - length) / 2 - xPen);
        legendSet = true;
  ***REMOVED***
***REMOVED***
// colourCountries(data1)
function setColours(dummyData) {
    // Vars
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

    // foreach loop.
    Object.keys(dummyData).forEach(prov => {
        if (prov !== 'ZA-UN') {
            let val = dummyData[prov];
            if ((max - interval <= val) && (val < max)) {
                answers[4].push(prov)
          ***REMOVED*** else if (max - (interval***REMOVED*** 2) < val) {
                answers[3].push(prov)
          ***REMOVED*** else if (max - (interval***REMOVED*** 3) < val) {
                answers[2].push(prov)
          ***REMOVED*** else if (max - (interval***REMOVED*** 4) < val) {
                answers[1].push(prov)
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***)
    console.log("ANSWERS:",answers)
    colourCountries(answers)
    legendSetup(max,min,interval)
***REMOVED***

function setProvs(cases,deaths,recoveries  ) {
    provCase = cases;
    provDeath = deaths;
    provRecoveries = recoveries;
    console.log("Recovs 1:",recoveries)
    setupSideBCards()
***REMOVED***

function CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired
    var i = parseInt(amount);
    if(isNaN(i)) { return 'N/A'; ***REMOVED***
    var minus = '';
    if(i < 0) { minus = '-'; ***REMOVED***
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while(n.length > 3) {
        var nn = n.substr(n.length-3);
        a.unshift(nn);
        n = n.substr(0,n.length-3);
  ***REMOVED***
    if(n.length > 0) { a.unshift(n); ***REMOVED***
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
        try{
        if ( varA >  varB) {
            comparison = 1;
      ***REMOVED*** else if (varA < varB) {
            comparison = -1;
      ***REMOVED***
      ***REMOVED***catch (e) {
            console.log("Error",e);
            console.log("-",varA)
      ***REMOVED***
        return (
            (order === 'desc') ? (comparison***REMOVED*** -1) : comparison
        );
  ***REMOVED***;
***REMOVED***

function setupSideBCards(){
    let province;

    for (const [nameFull, id] of Object.entries(provinceList)) {
        province = {name: nameFull,cases: provCase[id],deaths: provDeath[id],recoveries:provRecoveries[id]***REMOVED***
        cardList.push(province);
  ***REMOVED***
    populateSideCards(cardList.sort(compareValues('cases')))

***REMOVED***

***REMOVED***
***REMOVED*** @param {Array***REMOVED*** cardList
***REMOVED***/
function populateSideCards(cardList){
    // console.log("Card List:",cardList)
    let counter = 0;
    let cards = $(".card");
    let figures;

    cardList.forEach(item=>{
        // the html block containing the spans and br tags
        figures = cards[counter].children[1].children[0].children;
        cards[counter].firstElementChild.firstElementChild.innerText=item.name // sets Card Heading.
        figures[0].innerText=CommaFormatted(item.cases);
        figures[2].innerText=CommaFormatted(item.deaths);
        figures[4].innerText=CommaFormatted(item.recoveries);
        counter++
  ***REMOVED***)
***REMOVED***

console.log("MAX HEIGHT:",$("#svg-1").height() + Number($("#svgColumn").css('padding-top').split(/\D/)[0])  )

// Sets the height of the left sidebar using the svg + padding on top and bot.
$("#provStatsContainer").css("max-height",$("#svg-1").height() + parseInt($("#svgColumn").css('padding-top'))*2)

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
    $('.toggle.button')
        .click((event)=>{
            console.log("you clicked me!")
            // $("#provStatsContainer").transition('slide right')
            $("#provStatsContainer").toggleClass("sidebarHidden");
            $("#svgColumn").toggleClass("ten wide");
            $("#svgColumn").toggleClass("fourteen wide svgFocus");
            $("#hideIcon").toggleClass("left long arrow icon");
            $("#hideIcon").toggleClass("right long arrow icon");


      ***REMOVED***)
    $('#filterC')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provCase)
            populateSideCards(cardList.sort(compareValues('cases')))


      ***REMOVED***)
    $('#filterD')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provDeath)
            populateSideCards(cardList.sort(compareValues('deaths')))



      ***REMOVED***)
    $('#filterR')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provRecoveries)
            populateSideCards(cardList.sort(compareValues('recoveries')))


      ***REMOVED***)
***REMOVED***)

//
// setColours(dummyData)