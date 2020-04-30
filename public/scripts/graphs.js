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
***REMOVED***;

titleCallback = (tooltipItem, data) => {

    let date2 = data['labels'][tooltipItem[0]['index']].toString()
    date2 = date2.split(" ",5)
    date2 = `${date2[1]***REMOVED*** ${date2[2]***REMOVED***, ${date2[3]***REMOVED***`
    return date2;
***REMOVED***;
labelCallback = (tooltipItem, data) => {
    return String(data['datasets'][0]['data'][tooltipItem['index']]);
***REMOVED***;

Chart.defaults.global.hover.mode = 'x';
Chart.defaults.global.hover.intersect = false;

Chart.defaults.global.tooltips.mode = 'x';
Chart.defaults.global.tooltips.intersect = false;
Chart.scaleService.updateScaleDefaults('logarithmic', {
    ticks: {
        callback: function(value, index) {
            if (value !== 0) return numeral(value).format('0a');
 ***REMOVED*****REMOVED***
        autoSkip: true,
        autoSkipPadding:100,
        min:0,
        minRotation:0,
        drawTicks:false,
        beforeTickToLabelConversion : function(label){
            console.log('Label',label)
            return label
      ***REMOVED***
  ***REMOVED***
***REMOVED***);
Chart.defaults.global.tooltips.callbacks.title = titleCallback;
Chart.defaults.global.tooltips.callbacks.label = labelCallback;
/*Chart.defaults.global.tooltips.callbacks.labelColor = function(tooltipItem, chart) {
                        return {
                            backgroundColor: 'rgb(255, 0, 0)'
                      ***REMOVED***;
***REMOVED****/
// Chart.defaults.global.tooltips.alignments.bodyAlign = 'center';
Chart.defaults.global.tooltips.bodyAlign = 'center';
Chart.defaults.global.tooltips.titleAlign = 'center';
// Chart.defaults.global.tooltips.label = 'Number:';

Chart.scaleService.updateScaleDefaults( "linear", {xAxes: [{ticks:{min:"2020-03-20", max: moment()***REMOVED******REMOVED***]
***REMOVED***)
// Chart.scaleService.updateScaleDefaults( "bar",{ticks:{min:"2020-03-04"***REMOVED******REMOVED***)
// Chart.scaleService.updateScaleDefaults('linear', {
//     ticks:{min:"2020-02-15",max:moment()***REMOVED***
// ***REMOVED***);
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
  ***REMOVED***)
    now = moment();
    // Total Case Count
    ctx = document.getElementById('chart1').getContext('2d');
    chart1 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        responsive: false,
        maintainAspectRatio: false,
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
          ***REMOVED***]
 ***REMOVED*****REMOVED***

        // Configuration options go here
        options: {
            plugins: {
                // datalabels: {
                //     // display: function (context) {
                //     //     return context.dataset.data[context.dataIndex]; // or >= 1 or ...
                //     // ***REMOVED***,
                //     formatter: function (value, index, values) {
                //         if (!value || value == 0) {
                //             return 0;
                //       ***REMOVED*** else {
                //             return value;
                //       ***REMOVED***
                //   ***REMOVED***
                // ***REMOVED***,
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x',

        ***REMOVED*****REMOVED*****REMOVED***
                    zoom: {
                        enabled: false,
                        mode: 'x',
                        drag: dragOptions,
                        speed: 0.05
                  ***REMOVED***
    ***REMOVED*****REMOVED*****REMOVED***
***REMOVED*****REMOVED*****REMOVED***

            elements: {
                point:{
                    radius: 0
              ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            title: {
                display: true,
                text: 'Total Cases ' + typeCases

***REMOVED*****REMOVED*****REMOVED***
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    gridLines: {
                        drawOnChartArea: false
        ***REMOVED*****REMOVED*****REMOVED***

                    ticks: {
                        min: moment('2020-03-01'),
                        
        ***REMOVED*****REMOVED*****REMOVED***
                    time: {
                        // min: "2020-02-15",

                        unit: 'day',
                        displayFormats: {
                            'day': 'MMM DD',
                            'year': 'MMM DD YY'
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***],
                yAxes: [{
                    display: true,
                    labelAutoFit: false,

                    type: typeCases

              ***REMOVED***]
          ***REMOVED***
      ***REMOVED***

  ***REMOVED***);


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
                backgroundColor: 'rgb(109,35,35)',
                borderColor:
                    'rgb(109,35,35)'
                ,
                borderWidth:0,
                maxBarThickness: 100
          ***REMOVED***]
 ***REMOVED*****REMOVED***
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: Math.min.apply(this, dailyNewArr),
                        beginAtZero: true,
                  ***REMOVED***
              ***REMOVED***],
                xAxes: [{
                    type: 'time',
                    gridLines: {
                        drawOnChartArea: false
        ***REMOVED*****REMOVED*****REMOVED***
                    ticks: {
                        min: moment('2020-03-01'),
                        
        ***REMOVED*****REMOVED*****REMOVED***
                    time: {
                        unit: 'day',
                        displayFormats: {
                            'day': 'MMM DD',
                            'year': 'MMM DD YY'
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***]
          ***REMOVED***
      ***REMOVED******REMOVED***);

    // Total Deaths
    ctx = document.getElementById('chart3').getContext('2d');
    chart3 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

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
          ***REMOVED***]
 ***REMOVED*****REMOVED***


        // Configuration options go here
        options: {
            tooltips: {
                mode: 'nearest'
***REMOVED*****REMOVED*****REMOVED***
            title: {
                display: true,
                text: 'Total Deaths ' + typeDeaths
***REMOVED*****REMOVED*****REMOVED***
            elements: {
                point:{
                    radius: 0
              ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        min: moment('2020-03-01'),
                        
        ***REMOVED*****REMOVED*****REMOVED***
                    gridLines: {
                        drawOnChartArea: false
        ***REMOVED*****REMOVED*****REMOVED***
                    type: 'time',
                    time: {
                        unit:'day',
                        displayFormats: {
                            'day': 'MMM DD',
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***],
                yAxes: [{
                    display: true,
                    type: typeDeaths
              ***REMOVED***]
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***);

    // Daily New Deaths
    ctx = document.getElementById('chart4').getContext('2d');
    chart4 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
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
          ***REMOVED***]
 ***REMOVED*****REMOVED***
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: Math.min.apply(this, dailyDeathsArr),
                        beginAtZero: true,
                  ***REMOVED***
              ***REMOVED***],
                xAxes: [{
                    type: 'time',
                    ticks: {
                        min: moment('2020-03-01'),
                        
        ***REMOVED*****REMOVED*****REMOVED***
                    gridLines: {
                        drawOnChartArea: false
        ***REMOVED*****REMOVED*****REMOVED***
                    time: {
                        unit: 'day',
                        displayFormats: {
                            'day': 'MMM DD',
                            'year': 'MMM DD YY'
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***]
          ***REMOVED***
      ***REMOVED******REMOVED***);

    // Active Cases
    ctx = document.getElementById('chart5').getContext('2d');
    chart5 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

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
          ***REMOVED***]
 ***REMOVED*****REMOVED***

        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'Active Cases'
***REMOVED*****REMOVED*****REMOVED***
            elements: {
                point:{
                    radius: 0
              ***REMOVED***
***REMOVED*****REMOVED*****REMOVED***
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    ticks: {
                        min: moment('2020-03-01'),
                        
        ***REMOVED*****REMOVED*****REMOVED***
                    gridLines: {
                        drawOnChartArea: false
        ***REMOVED*****REMOVED*****REMOVED***
                    time: {
                        unit:'day',
                        displayFormats: {
                            'day': 'MMM DD',
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***],
                yAxes: [{
                    display: true,
                    type: 'linear'
              ***REMOVED***]
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***);


    document.getElementById('toggleScaleCases').addEventListener('click', function() {
        typeCases = typeCases === 'linear' ? 'logarithmic' : 'linear';
        chart1.options.title.text = 'Total Cases - ' + typeCases;
        chart1.options.scales.yAxes[0] = {
            display: true,
            type: typeCases
      ***REMOVED***;

        chart1.update();
  ***REMOVED***);
    document.getElementById('toggleScaleDeaths').addEventListener('click', function() {
        typeDeaths = typeDeaths === 'linear' ? 'logarithmic' : 'linear';
        chart3.options.title.text = 'Total Deaths - ' + typeDeaths;
        chart3.options.scales.yAxes[0] = {
            display: true,
            type: typeDeaths
      ***REMOVED***;

        chart3.update();
  ***REMOVED***);
***REMOVED***





