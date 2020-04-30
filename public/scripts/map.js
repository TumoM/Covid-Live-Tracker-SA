
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
}]*/

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

var tooltip
var tooltipText
var tooltipRects
let width = 415;
let legendTitle = $('#legTitle')[0];
const xPen = 92,
    yPen = 220;
let legendSet=false;
let colourVal=1;

let provCase = {}
let provDeath = {}
let provRecoveries = {}
let cardList = []


/**
 * @param {string} name
 */
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
    tooltip.style.opacity=0;
    // tooltip.setAttributeNS(null, "visibility", "hidden");

}

/**
 * @param {string} name
 * @param {number|string} colour
 */
function colourCountry(name, colour,colourTag) {
    var country = document.getElementById(name);
    //country.className += ' colour' + colour;
    $("#"+name).removeClass()
    $("#"+name).addClass("land tooltip-trigger valid")
    country.classList.add('colour' + colourTag+""+colour)
}


/**
 * @param {[][]} data
 */
function colourCountries(data,colourTag=1) {
    for (var colour = 0; colour < data.length; colour++) {
        for (var country = 0; country < data[colour].length; country++) {
            colourCountry(data[colour][country], colour,colourTag);
        }
    }
}

function legendSetup(max,min,interval) {
    // setup text labels
    interval = Math.round(interval)
    let legendTexts = $('.keyText')
    let legendCol = $('.key.legend')
    legendCol.removeClass()
    legendCol.addClass("key legend")
    for (let i = 0; i < 5; i++) {
        legendCol[i].classList.add('colour' + colourVal+""+i);
    }
    legendTexts[0].textContent=`0 to ${CommaFormatted(min)}`
    legendTexts[1].textContent=`${CommaFormatted(min+1)} to ${CommaFormatted(min+interval)}`
    legendTexts[2].textContent=`${CommaFormatted(max-interval*3+1)} to ${CommaFormatted(max-interval*2)}`
    legendTexts[3].textContent=`${CommaFormatted(max-interval*2+1)} to ${CommaFormatted(max-interval)}`
    legendTexts[4].textContent=`${CommaFormatted(max-interval+1)} to ${CommaFormatted(max)}`
    // setup width
    console.log("Legend Set:",legendSet)
    if (!legendSet) {
        let width = $('#key')[0].getBoundingClientRect().width;
        $('.lightBack').width(width)
        let length = legendTitle.getComputedTextLength()
        legendTitle.setAttributeNS(null, "x", (width - length) / 2 - xPen);
        legendSet = true;
    }
}
// colourCountries(data1)
function setColours(dummyData,colour=1) {
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
            if ((max - interval < val) && (val <= max)) {
                answers[4].push(prov)
            } else if (max - (interval * 2) <= val) {
                answers[3].push(prov)
            } else if (max - (interval * 3) <= val) {
                answers[2].push(prov)
            } else if (max - (interval * 4) < val) {
                answers[1].push(prov)
            }
            else {
                answers[0].push(prov)
            }
        }
    })
    console.log("ANSWERS:",answers)
    colourVal = colour
    colourCountries(answers,colour)
    legendSetup(max,min,interval)
}

function setProvs(cases,deaths,recoveries  ) {
    provCase = cases;
    provDeath = deaths;
    provRecoveries = recoveries;
    console.log("Recovs 1:",recoveries)
    setupSideBCards()
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

function compareValues(key, order = 'desc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        try{
        if ( varA >  varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        }catch (e) {
            console.log("Error",e);
            console.log("-",varA)
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

function setupSideBCards(){
    let province;

    for (const [nameFull, id] of Object.entries(provinceList)) {
        province = {name: nameFull,cases: provCase[id],deaths: provDeath[id],recoveries:provRecoveries[id]}
        cardList.push(province);
    }
    populateSideCards(cardList.sort(compareValues('cases')))

}

/**
 * @param {Array} cardList
 */
function populateSideCards(cardList){
    // console.log("Card List:",cardList)
    let counter = 0;
    let cards = $(".card");
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
        counter++
    })
}

console.log("MAX HEIGHT:",$("#svg-1").height() + Number($("#svgColumn").css('padding-top').split(/\D/)[0])  )

// Sets the height of the left sidebar using the svg + padding on top and bot.
$("#provStatsContainer").css("max-height",$("#svg-1").height() + parseInt($("#svgColumn").css('padding-top'))*2)

// Resets the container height as the window size changes. i.e when svg-1 and padding changes.
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
    $('.toggle.button')
        .click((event)=>{
            console.log("you clicked me!")
            // $("#provStatsContainer").transition('slide right')
            $("#svgColumn").toggleClass("ten wide");
            $("#svgColumn").toggleClass("fourteen wide svgFocus");
            $("#provStatsContainer").toggleClass("sidebarHidden");

            $("#hideIcon").toggleClass("left long arrow icon");
            $("#hideIcon").toggleClass("right long arrow icon");


        })
    $('#filterC')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provCase,1)
            populateSideCards(cardList.sort(compareValues('cases')))


        })
    $('#filterD')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provDeath,2)
            populateSideCards(cardList.sort(compareValues('deaths')))



        })
    $('#filterR')
        .click((event)=>{
            console.log("you clicked me to filter!")
            // $("#provStatsContainer").transition('slide right')
            setColours(provRecoveries,3)
            populateSideCards(cardList.sort(compareValues('recoveries')))


        })
})

//
// setColours(dummyData)