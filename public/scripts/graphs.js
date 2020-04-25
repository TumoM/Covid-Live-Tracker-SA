let ctx,chart1,chart2,chart3,chart4,chart5;
let data;
let type = 'linear';
let mode = "x";
let intersect = "false";
Chart.defaults.global.hover.mode = 'x';
Chart.defaults.global.hover.intersect = true;
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
// Chart.defaults.global.legend.labels = labels;
let labels = [];
let totalCasesArr = [];
let totalDeathsArr = [];
let activeCasesArr = [];
let dailyNewArr = [];
let dailyDeathsArr = [];

titleCallback = (tooltipItem, data) => {
    let date = data['labels'][tooltipItem[0]['index']].toString()
    date = date.split(" ",5)
    date = `${date[1]} ${date[2]}, ${date[3]}`
    return date;
};
labelCallback = (tooltipItem, data) => {
    return data['datasets'][0]['data'][tooltipItem['index']];
};


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

setGraphs = (graphData)=>{
    graphData.forEach(row=>{
        labels.push(new Date(row.date));
        totalCasesArr.push(row.totalCases)
        totalDeathsArr.push(row.totalDeaths)
        activeCasesArr.push(row.activeCases)
        dailyNewArr.push(row.dailyNew)
        dailyDeathsArr.push(row.dailyDeaths)
    })

    // Total Case Count
    ctx = document.getElementById('chart1').getContext('2d');
    chart1 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels,
            datasets: [{
                label: '# Cases',
                backgroundColor: 'rgb(210,210,210)',
                borderColor: 'rgb(239,23,71)',
                borderWidth:2.5,
               /* backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(239,23,71)',*/
                data: totalCasesArr,
                fill:true
            }]
        },

        // Configuration options go here
        options: {
            /*plugins: {
                datalabels: {
                    display: function (context) {
                        return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
                    },
                    align: 'center',
                    anchor: 'center',
                    formatter: function (value, index, values) {
                        if (value > 0) {
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        } else {
                            value = "";
                            return value;
                        }
                    }
                }
            },*/
            point: {
                pointBackgroundColor:'rgb(64,128,46)',
            },
            title: {
                display: true,
                text: 'Total Cases'
            },
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    gridLines: {
                        drawOnChartArea: false
                    },
                    time: {
                        displayFormats: {
                            'millisecond': 'MMM DD',
                            'second': 'MMM DD',
                            'minute': 'MMM DD',
                            'hour': 'MMM DD',
                            'day': 'MMM DD',
                            'week': 'MMM DD',
                            'month': 'MMM DD',
                            'quarter': 'MMM DD',
                            'year': 'MMM DD',
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    labelAutoFit: true,
                    type: type
                }]
            }
        }

    });


    // Daily New Cases
    ctx = document.getElementById('chart2').getContext('2d');
    chart2 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'New Cases',
                data: dailyNewArr,
                backgroundColor: [
                    'white'
                ],
                borderColor: [
                    'grey'
                ],
                maxBarThickness: 10
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                        unitStepSize: 1,
                        displayFormats: {
                            'day': 'MMM DD'
                        }
                    }
                }]
            }
        }});

    // Active Cases
    ctx = document.getElementById('chart3').getContext('2d');
    chart3 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels,
            datasets: [{
                label: '# of Cases',
                // backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: activeCasesArr,
                fill:false
            }]
        },

        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'Active Cases'
            },
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    time: {
                        displayFormats: {
                            'millisecond': 'MMM DD',
                            'second': 'MMM DD',
                            'minute': 'MMM DD',
                            'hour': 'MMM DD',
                            'day': 'MMM DD',
                            'week': 'MMM DD',
                            'month': 'MMM DD',
                            'quarter': 'MMM DD',
                            'year': 'MMM DD',
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    type: type
                }]
            }
        }
    });

    // Total Deaths
    ctx = document.getElementById('chart4').getContext('2d');
    chart4 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels,
            datasets: [{
                label: '# Deaths',
                // backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: totalDeathsArr,
                fill:false
            }]
        },

        // Configuration options go here
        options: {
            tooltips: {
                mode: 'nearest'
            },
            title: {
                display: true,
                text: 'Total Deaths ' + type
            },
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    time: {
                        displayFormats: {
                            'millisecond': 'MMM DD',
                            'second': 'MMM DD',
                            'minute': 'MMM DD',
                            'hour': 'MMM DD',
                            'day': 'MMM DD',
                            'week': 'MMM DD',
                            'month': 'MMM DD',
                            'quarter': 'MMM DD',
                            'year': 'MMM DD',
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    type: type
                }]
            }
        }
    });

    // Daily Deaths


    //

    document.getElementById('toggleScale').addEventListener('click', function() {
        type = type === 'linear' ? 'logarithmic' : 'linear';
        chart1.options.title.text = 'Total Cases - ' + type;
        chart1.options.scales.yAxes[0] = {
            display: true,
            type: type
        };

        chart1.update();
    });
}

// var ctx = document.getElementById('chart1').getContext('2d');



chart3 = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }});

ctx = document.getElementById('chart3').getContext('2d');
chart4 = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }});



