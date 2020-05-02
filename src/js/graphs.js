let ctx,chart1,chart2,chart3,chart4,chart5, chart6;
let data;
let typeCases = 'linear';
let typeDeaths = 'linear';
let mode = "x";
let intersect = "false";
// Chart.defaults.global.legend.labels = labels;
let labels = [];
let totalCasesArr = [];
let provinceNameArr = [];
let provinceCaseArr = [];

let totalDeathsArr = [];
let activeCasesArr = [];
let dailyNewArr = [];
let dailyDeathsArr = [];
let timeFormat = 'MM/DD/YYYY HH:mm';
let date = 'MMM DD';
let now;
let dragOptions = {
    animationDuration: 1000
};

titleCallback = (tooltipItem, data) => {

    let date2 = data['labels'][tooltipItem[0]['index']].toString()
    date2 = date2.split(" ",5)
    date2 = `${date2[1]} ${date2[2]}, ${date2[3]}`
    return date2;
};
labelCallback = (tooltipItem, data) => {
    return String(data['datasets'][0]['data'][tooltipItem['index']]);
};

Chart.defaults.global.hover.mode = 'x';
Chart.defaults.global.hover.intersect = false;

Chart.defaults.global.tooltips.mode = 'x';
Chart.defaults.global.tooltips.intersect = false;
Chart.scaleService.updateScaleDefaults('logarithmic', {
    ticks: {
        callback: function(value, index) {
            if (value !== 0) return numeral(value).format('0a');
        },
        autoSkip: true,
        autoSkipPadding:100,
        min:0,
        minRotation:0,
        drawTicks:false,
        beforeTickToLabelConversion : function(label){
            console.log('Label',label)
            return label
        }
    }
});
Chart.defaults.global.tooltips.callbacks.title = titleCallback;
Chart.defaults.global.tooltips.callbacks.label = labelCallback;
/*Chart.defaults.global.tooltips.callbacks.labelColor = function(tooltipItem, chart) {
                        return {
                            backgroundColor: 'rgb(255, 0, 0)'
                        };
}*/
// Chart.defaults.global.tooltips.alignments.bodyAlign = 'center';
Chart.defaults.global.tooltips.bodyAlign = 'center';
Chart.defaults.global.tooltips.titleAlign = 'center';
// Chart.defaults.global.tooltips.label = 'Number:';

Chart.scaleService.updateScaleDefaults( "linear", {xAxes: [{ticks:{min:"2020-03-20", max: moment()}}]
})
// Chart.scaleService.updateScaleDefaults( "bar",{ticks:{min:"2020-03-04"}})
// Chart.scaleService.updateScaleDefaults('linear', {
//     ticks:{min:"2020-02-15",max:moment()}
// });
// Chart.defaults.scales.ticks.min=1;
Chart.defaults.scale.ticks.beginAtZero = true;



setGraphs = (graphData,provinceCaseData)=>{
    graphData.forEach(row=>{
        labels.push(new Date(row.date));
        totalCasesArr.push(row.totalCases)
        totalDeathsArr.push(row.totalDeaths)
        activeCasesArr.push(row.activeCases)
        dailyNewArr.push(row.dailyNew)
        dailyDeathsArr.push(row.dailyDeaths)
    })
    now = moment();
    // Total Case Count
    ctx = document.getElementById('chart1').getContext('2d');
    chart1 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        responsive: true,
        maintainAspectRatio: true,
        // The data for our dataset
        data: {
            labels,
            datasets: [{
                label: '# Cases',
                backgroundColor: 'rgb(210,210,210)',
                borderColor: 'rgb(102,0,80)',

                // pointBackgroundColor:'rgb(64,128,46)',
                // pointBorderColor:'rgb(108,13,147)',


                /* backgroundColor: 'rgb(255, 99, 132)',
                 borderColor: 'rgb(239,23,71)',*/
                data: totalCasesArr,
                fill:true
            }]
        },

        // Configuration options go here
        options: {
            plugins: {
                // datalabels: {
                //     // display: function (context) {
                //     //     return context.dataset.data[context.dataIndex]; // or >= 1 or ...
                //     // },
                //     formatter: function (value, index, values) {
                //         if (!value || value == 0) {
                //             return 0;
                //         } else {
                //             return value;
                //         }
                //     }
                // },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x',

                    },
                    zoom: {
                        enabled: false,
                        mode: 'x',
                        drag: dragOptions,
                        speed: 0.05
                    }
                },
            },

            elements: {
                point:{
                    radius: 0
                }
            },
            title: {
                display: true,
                text: 'Total Cases ' + typeCases

            },
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    gridLines: {
                        drawOnChartArea: false
                    },

                    ticks: {
                        min: moment('2020-03-01'),
                        
                    },
                    time: {
                        // min: "2020-02-15",

                        unit: 'day',
                        displayFormats: {
                            'day': 'MMM DD',
                            'year': 'MMM DD YY'
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    labelAutoFit: false,

                    type: typeCases

                }]
            }
        }

    });


    // Daily New Cases
    ctx = document.getElementById('chart2').getContext('2d');
    chart2 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        responsive: true,
        maintainAspectRatio: true,
        data: {
            labels,
            datasets: [{
                label: 'New Cases',
                data: dailyNewArr,
                backgroundColor: 'rgb(109,35,35)',
                borderColor:
                    'rgb(109,35,35)'
                ,
                borderWidth:0,
                maxBarThickness: 100
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: Math.min.apply(this, dailyNewArr),
                        beginAtZero: true,
                    }
                }],
                xAxes: [{
                    type: 'time',
                    gridLines: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        min: moment('2020-03-01'),
                        
                    },
                    time: {
                        unit: 'day',
                        displayFormats: {
                            'day': 'MMM DD',
                            'year': 'MMM DD YY'
                        }
                    }
                }]
            }
        }});

    // Total Deaths
    ctx = document.getElementById('chart3').getContext('2d');
    chart3 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        responsive: true,
        maintainAspectRatio: true,
        // The data for our dataset
        data: {
            labels,
            datasets: [{
                label: '# Deaths',
                backgroundColor: 'rgb(210,210,210)',
                // backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(139,51,67)',
                data: totalDeathsArr,
                fill:true
            }]
        },


        // Configuration options go here
        options: {
            tooltips: {
                mode: 'nearest'
            },
            title: {
                display: true,
                text: 'Total Deaths ' + typeDeaths
            },
            elements: {
                point:{
                    radius: 0
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        min: moment('2020-03-01'),
                        
                    },
                    gridLines: {
                        drawOnChartArea: false
                    },
                    type: 'time',
                    time: {
                        unit:'day',
                        displayFormats: {
                            'day': 'MMM DD',
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    type: typeDeaths
                }]
            }
        }
    });

    // Daily New Deaths
    ctx = document.getElementById('chart4').getContext('2d');
    chart4 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        responsive: true,
        maintainAspectRatio: true,
        data: {
            labels,
            datasets: [{
                label: 'Daily Deaths',
                data: dailyDeathsArr,
                backgroundColor: 'rgb(109,35,35)',
                borderColor:
                    'rgb(109,35,35)'
                ,
                borderWidth:0,
                maxBarThickness: 100
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: Math.min.apply(this, dailyDeathsArr),
                        beginAtZero: true,
                    }
                }],
                xAxes: [{
                    type: 'time',
                    ticks: {
                        min: moment('2020-03-01'),
                        
                    },
                    gridLines: {
                        drawOnChartArea: false
                    },
                    time: {
                        unit: 'day',
                        displayFormats: {
                            'day': 'MMM DD',
                            'year': 'MMM DD YY'
                        }
                    }
                }]
            }
        }});

    // Active Cases
    ctx = document.getElementById('chart5').getContext('2d');
    chart5 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        responsive: true,
        maintainAspectRatio: true,
        // The data for our dataset
        data: {
            labels,
            datasets: [{
                label: '# of Cases',
                backgroundColor: 'rgb(210,210,210)',
                // backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(31,206,102)',
                data: activeCasesArr,
                fill:true
            }]
        },

        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'Active Cases'
            },
            elements: {
                point:{
                    radius: 0
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    ticks: {
                        min: moment('2020-03-01'),
                        
                    },
                    gridLines: {
                        drawOnChartArea: false
                    },
                    time: {
                        unit:'day',
                        displayFormats: {
                            'day': 'MMM DD',
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    type: 'linear'
                }]
            }
        }
    });


    document.getElementById('toggleScaleCases').addEventListener('click', function() {
        typeCases = typeCases === 'linear' ? 'logarithmic' : 'linear';
        chart1.options.title.text = 'Total Cases - ' + typeCases;
        chart1.options.scales.yAxes[0] = {
            display: true,
            type: typeCases
        };

        chart1.update();
    });
    document.getElementById('toggleScaleDeaths').addEventListener('click', function() {
        typeDeaths = typeDeaths === 'linear' ? 'logarithmic' : 'linear';
        chart3.options.title.text = 'Total Deaths - ' + typeDeaths;
        chart3.options.scales.yAxes[0] = {
            display: true,
            type: typeDeaths
        };

        chart3.update();
    });
}





