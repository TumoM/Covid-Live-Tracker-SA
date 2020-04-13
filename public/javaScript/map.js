function displayName(name) {
    document.getElementById('country-name').firstChild.data = name;
}
console.log("We here boy!!!!!");
var tooltip
(function() {
    tooltip = document.getElementById('country-name');
})();


var triggers = document.getElementsByClassName('tooltip-trigger');
for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener('mousemove', showTooltip);
    triggers[i].addEventListener('mouseout', hideTooltip);
}


function showTooltip(evt) {
    tooltip.setAttributeNS(null, "visibility", "visible");
}

function hideTooltip() {
tooltip.setAttributeNS(null, "visibility", "hidden");
}


// colourCountry('algeria', 2)
function colourCountry(name, colour) {
    var country = document.getElementById(name);
    //country.className += ' colour' + colour;
    country.classList.add('colour' + colour)
    //console.log(country.classList.add('colour' + colour));
    // console.log(country.className);
    
}




var data1 = [[],
['ZA-NW', 'ZA-EC','ZA-FS'],
['ZA-MP', 'ZA-NC', 'ZA-LP'],
['ZA-WC'],
['ZA-GT','ZA-NL']];

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
    'ZA-NW':19,
    'ZA-EC':88,
    'ZA-FS':96,
    'ZA-MP':21,
    'ZA-NC':16,
    'ZA-LP':23,
    'ZA-WC':587,
    'ZA-GT':865,
    'ZA-NL':443,
    'ZA-UN':15
}

const dummyData2 = [{
    'ZA-NW':19,
    'ZA-EC':88,
    'ZA-FS':96,
    'ZA-MP':21,
    'ZA-NC':16,
    'ZA-LP':23,
    'ZA-WC':587,
    'ZA-GT':865,
    'ZA-NL':443,
    'ZA-UN':15
}]

function colourCountries(data) {
    for (var colour = 0; colour < data.length; colour++){    
        for (var country = 0; country < data[colour].length; country++){
            colourCountry(data[colour][country], colour);
        }
    }
}
colourCountries(data1)

function setColours(dummyData, myProvinceList = provinceList) {
    // Vars
    let max = 0, min = Infinity,max2 = 0, min2 = Infinity, range = 0, interval = 0;
    let answers =[ 
        
            [],
            [],
            [],
            [],
            []
    ]
        ;

    let values = [];    
    for (let i in dummyData2) {
      for (let j in dummyData2[i]) {
        if (parseFloat(dummyData2[i][j]) > 0) {
          values.push(parseFloat(dummyData2[i][j]));
        }
      }
    }
    // Get Range
        Object.keys(dummyData).forEach((k) => {                
            if (dummyData[k] !== null) {
                min = Math.min(min, dummyData[k]);
                max = Math.max(max, dummyData[k]);
                min2 = Math.min.apply(null, values);
                max2 = Math.max.apply(null, values);
            }
        });
    max = Math.round(Math.ceil(max / 10)) * 10;
    min = Math.round(Math.floor(min / 10)) * 10;
    range = max-min
    // Divide into 4 or 5
    interval = range / 4;

    console.log(`Min:${min}, Max:${max}`);
    console.log(`Range:${range}\nInterval:${interval}`);
    
    
    // foreach loop.
    Object.keys(dummyData).forEach(prov =>{
        if (prov !== 'ZA-UN'){
            let val = dummyData[prov];
            // console.log("Val:",val);
            console.log(`Max-I:${max-interval}, Val: ${val}, Max ${max}:`);
            console.log((max-interval <= val) && (val< max));

            console.log(`Max-I:${max-interval*2}, Val: ${val}`);
            console.log((max-interval*2) <= val);

            if ((max-interval <= val) && (val < max)) {
                answers[4].push(prov)
            }
            else if (max-(interval*2) < val) {
                answers[3].push(prov)
            }
            else if (max-(interval*3) < val) {
                answers[2].push(prov)
            }
            else if (max-(interval*4) < val) {
                answers[1].push(prov)
            }
        }
    })
    console.log("Final Answer Array of Colours:");
    console.log(answers);
    
        // Use IF Waterfall to calc what to do.
    // Loop and feed to colourCountries(...)

    colourCountries(answers)
}

setColours(dummyData)







