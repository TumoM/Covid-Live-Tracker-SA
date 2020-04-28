let ctx,chart1,chart2,chart3,chart4,chart5;
let data;
let type = 'linear';
let mode = "x";
let intersect = "false";
// Chart.defaults.global.legend.labels = labels;
let labels = [];
let totalCasesArr = [];
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
Chart.defaults.global.hover.intersect = true;
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
Chart.scaleService.updateScaleDefaults( "linear",{time:{min:"2020-03-04"***REMOVED******REMOVED***)
// Chart.scaleService.updateScaleDefaults( "bar",{ticks:{min:"2020-03-04"***REMOVED******REMOVED***)
Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0
  ***REMOVED***
***REMOVED***);
// Chart.defaults.scales.ticks.min=1;
Chart.defaults.scale.ticks.beginAtZero = true;


setGraphs = (graphData)=>{
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
        responsive: true,
        // The data for our dataset
        data: {
            labels,
            datasets: [{
                label: '# Cases',
                backgroundColor: 'rgb(210,210,210)',
                borderColor: 'rgb(239,23,71)',
                borderWidth: 2,
                pointBackgroundColor:'rgb(64,128,46)',
                pointBorderColor:'rgb(108,13,147)',

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
            point: {
***REMOVED*****REMOVED*****REMOVED***
            title: {
                display: true,
                text: 'Total Cases'
***REMOVED*****REMOVED*****REMOVED***
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    gridLines: {
                        drawOnChartArea: false
        ***REMOVED*****REMOVED*****REMOVED***
                    time: {
                        min: "2020-02-15",
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
                    type: type
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
                    time: {
                        min: "2020-03-04",
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
          ***REMOVED***]
 ***REMOVED*****REMOVED***

        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'Active Cases'
***REMOVED*****REMOVED*****REMOVED***
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    time: {
                        min:"2020-03-04",
                        unit:'day',
                        displayFormats: {
                            'day': 'MMM DD',
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***],
                yAxes: [{
                    display: true,
                    type: type
              ***REMOVED***]
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***);

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
          ***REMOVED***]
 ***REMOVED*****REMOVED***

        // Configuration options go here
        options: {
            tooltips: {
                mode: 'nearest'
***REMOVED*****REMOVED*****REMOVED***
            title: {
                display: true,
                text: 'Total Deaths ' + type
***REMOVED*****REMOVED*****REMOVED***
            scales: {
                xAxes: [{
                    display: true,
                    type: 'time',
                    time: {
                        min:"2020-03-04",
                        unit:'day',
                        displayFormats: {
                            'day': 'MMM DD',
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***],
                yAxes: [{
                    display: true,
                    type: type
              ***REMOVED***]
          ***REMOVED***
      ***REMOVED***
  ***REMOVED***);

    // Daily Deaths


    //

    document.getElementById('toggleScale').addEventListener('click', function() {
        type = type === 'linear' ? 'logarithmic' : 'linear';
        chart1.options.title.text = 'Total Cases - ' + type;
        chart1.options.scales.yAxes[0] = {
            display: true,
            type: type
      ***REMOVED***;

        chart1.update();
  ***REMOVED***);
***REMOVED***

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
        ***REMOVED***,
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
        ***REMOVED***,
            borderWidth: 1
      ***REMOVED***]
  ***REMOVED***
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
              ***REMOVED***
          ***REMOVED***]
      ***REMOVED***
  ***REMOVED******REMOVED***);

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
        ***REMOVED***,
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
        ***REMOVED***,
            borderWidth: 1
      ***REMOVED***]
  ***REMOVED***
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
              ***REMOVED***
          ***REMOVED***]
      ***REMOVED***
  ***REMOVED******REMOVED***);



