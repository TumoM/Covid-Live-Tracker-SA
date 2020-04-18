
/*var data1 = [
    [],
    ['ZA-NW', 'ZA-EC', 'ZA-FS'],
    ['ZA-MP', 'ZA-NC', 'ZA-LP'],
    ['ZA-WC'],
    ['ZA-GT', 'ZA-NL']
];

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
}

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
}

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
}]*/


var tooltip
var tooltipText
var tooltipRects
let width = 415;
let legendTitle = $('#legTitle')[0];
const xPen = 92,
    yPen = 220;

let provCase = {}
let provDeath = {}
let provRecoveries = {}

function displayName(name) {
    document.getElementById('country-name').firstChild.data = name;
}


(function () {
    tooltip = document.getElementById('country-name');
    tooltipText = tooltip.getElementsByTagName('text')[0];
    tooltipRects = tooltip.getElementsByTagName('rect');

    for (var i = 0; i < tooltipRects.length; i++) {
        tooltipRects[i].setAttributeNS(null, "width", width);
    }

})();

var svg = document.getElementById('svg-1');

var triggers = document.getElementsByClassName('tooltip-trigger');
for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener('mousemove', showTooltip);
    triggers[i].addEventListener('mouseout', hideTooltip);
}

let x, y;

// Setup Legend
triggers = document.getElementsByClassName('keyText');
Object.values(triggers).forEach((text) =>{
    x = text.getAttribute('x');
    y = text.getAttribute('y');
    text.setAttribute('x',x-xPen);
    text.setAttribute('y',y-yPen);
})

triggers = document.getElementsByClassName('key legend');
Object.values(triggers).forEach((text) =>{
    x = text.getAttribute('x');
    y = text.getAttribute('y');
    text.setAttribute('x',x-xPen);
    text.setAttribute('y',y-yPen);
})

x = $('#legTitle').attr('x');
y = $('#legTitle').attr('y');
$('#legTitle').attr({'x':-x-xPen,'y':y-yPen})

x = $('.lightBack').attr('x');
y = $('.lightBack').attr('y');
$('.lightBack').attr({'x':x-xPen,'y':y-yPen})



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


}

function hideTooltip() {
    // TODO Un-hide
    // tooltip.style.opacity=0;
    // tooltip.setAttributeNS(null, "visibility", "hidden");

}


// colourCountry('algeria', 2)
function colourCountry(name, colour) {
    var country = document.getElementById(name);
    //country.className += ' colour' + colour;
    country.classList.add('colour' + colour)

}






function colourCountries(data) {
    for (var colour = 0; colour < data.length; colour++) {
        for (var country = 0; country < data[colour].length; country++) {
            colourCountry(data[colour][country], colour);
        }
    }
}

function legendSetup(max,min,interval) {
    // setup text labels
    interval = Math.round(interval)
    let legendTexts = $('.keyText')
    legendTexts[0].textContent=`0 to ${CommaFormatted(min-1)}`
    legendTexts[1].textContent=`${CommaFormatted(min)} to ${CommaFormatted(min+interval-1)}`
    legendTexts[2].textContent=`${CommaFormatted(max-interval*3)} to ${CommaFormatted(max-interval*2-1)}`
    legendTexts[3].textContent=`${CommaFormatted(max-interval*2)} to ${CommaFormatted(max-interval-1)}`
    legendTexts[4].textContent=`${CommaFormatted(max-interval)} to ${CommaFormatted(max)}`
    // setup width
    let width = $('#key')[0].getBoundingClientRect().width;
    $('.lightBack').width(width)
    let length = legendTitle.getComputedTextLength()
    legendTitle.setAttributeNS(null,"x",(width-length)/2-xPen);
}
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
    ];

    // Get Range
    Object.keys(dummyData).forEach((k) => {
        if (dummyData[k] !== null) {
            min = Math.min(min, dummyData[k]);
            max = Math.max(max, dummyData[k]);
        }
    });
    max = Math.round(Math.ceil(max / 10)) * 10;
    min = Math.round(Math.floor(min / 10)) * 10;
    range = max - min
    // Divide into 4 or 5
    interval = range / 4;

    // foreach loop.
    Object.keys(dummyData).forEach(prov => {
        if (prov !== 'ZA-UN') {
            let val = dummyData[prov];
            if ((max - interval <= val) && (val < max)) {
                answers[4].push(prov)
            } else if (max - (interval * 2) < val) {
                answers[3].push(prov)
            } else if (max - (interval * 3) < val) {
                answers[2].push(prov)
            } else if (max - (interval * 4) < val) {
                answers[1].push(prov)
            }
        }
    })
    console.log("ANSWERS:",answers)
    colourCountries(answers)
    legendSetup(max,min,interval)
}

function setProvs(cases,deaths,recoveries  ) {
    provCase = cases;
    provDeath = deaths;
    provRecoveries = recoveries;
    console.log("Recovs 1:",recoveries)
}

function CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired
    var i = parseInt(amount);
    if(isNaN(i)) { return 'N/A'; }
    var minus = '';
    if(i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while(n.length > 3) {
        var nn = n.substr(n.length-3);
        a.unshift(nn);
        n = n.substr(0,n.length-3);
    }
    if(n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    amount = n;
    amount = minus + amount;
    return amount;
}

console.log("Sidebar",$('.left.sidebar'))
$('.ui.sidebar')
    .sidebar({
        dimPage: true,
        context: $('.sidebar.items')
    })
    .sidebar('attach events', '.toggle.button')
;
$('.toggle.button')
    .removeClass('disabled')
    .click((event)=>{
        console.log("you clicked me!")
        $('.ui.sidebar').removeClass("animating")
})
;
console.log("MAX HEIGHT:",$("#svg-1").height() + Number($("#svgColumn").css('padding-top').split(/\D/)[0])  )
$("#provStatsContainer").css("max-height",$("#svg-1").height() + parseInt($("#svgColumn").css('padding-top'))*2)
$(window).resize(()=>{
    $("#provStatsContainer").css("max-height",$("#svg-1").height() + parseInt($("#svgColumn").css('padding-top'))*2)
})

$(document).ready(()=>{
    $(function()
    {
        $('.scroll-pane').jScrollPane(
            {
                showArrows: true,
                resizeSensor: true
            }
        );
    });
})

//
// setColours(dummyData)