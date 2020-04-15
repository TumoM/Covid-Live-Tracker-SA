var tooltip
var tooltipText
var tooltipRects
let width = 415;
let legendTitle = $('#legTitle')[0];
const xPen = 42,
    yPen = 220;

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

let x,y;

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
    
    tooltipText.firstChild.data = evt.target.getAttributeNS(null, "title");
    tooltip.setAttributeNS(null, "transform", "translate(" + x + " " + y + ")");
    var length = tooltipText.getComputedTextLength();
    tooltipText.setAttributeNS(null,"x",(width-length)/2);
    tooltip.style.opacity=1;
    // tooltip.setAttributeNS(null, "visibility", "visible");


***REMOVED***


function hideTooltip() {
    // TODO Un-hide
    tooltip.style.opacity=0;
    // tooltip.setAttributeNS(null, "visibility", "hidden");

***REMOVED***


// colourCountry('algeria', 2)
function colourCountry(name, colour) {
    var country = document.getElementById(name);
    //country.className += ' colour' + colour;
    country.classList.add('colour' + colour)

***REMOVED***




var data1 = [
    [],
    ['ZA-NW', 'ZA-EC', 'ZA-FS'],
    ['ZA-MP', 'ZA-NC', 'ZA-LP'],
    ['ZA-WC'],
    ['ZA-GT', 'ZA-NL']
];

const provinceList = [
    'ZA-NW',
    'ZA-EC',
    'ZA-FS',
    'ZA-MP',
    'ZA-NC',
    'ZA-LP',
    'ZA-WC',
    'ZA-GT',
    'ZA-NL',
    'ZA-UN'
]

const dummyData = {
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
***REMOVED***

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
***REMOVED***]

function colourCountries(data) {
    for (var colour = 0; colour < data.length; colour++) {
        for (var country = 0; country < data[colour].length; country++) {
            colourCountry(data[colour][country], colour);
      ***REMOVED***
  ***REMOVED***
***REMOVED***

function legendSetup() {
    let width = $('#key')[0].getBoundingClientRect().width;
    $('.lightBack').width(width)
    let length = legendTitle.getComputedTextLength()
    legendTitle.setAttributeNS(null,"x",(width-length)/2-xPen);
***REMOVED***

colourCountries(data1)

function setColours(dummyData, myProvinceList = provinceList) {
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

    let values = [];
    for (let i in dummyData2) {
        for (let j in dummyData2[i]) {
            if (parseFloat(dummyData2[i][j]) > 0) {
                values.push(parseFloat(dummyData2[i][j]));
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***
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
            console.log(`Max-I:${max-interval*2***REMOVED***, Val: ${val***REMOVED***`);
            console.log((max - interval***REMOVED*** 2) <= val);

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
    colourCountries(answers)
    legendSetup()
***REMOVED***

setColours(dummyData)