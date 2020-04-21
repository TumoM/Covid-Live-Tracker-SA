Chart.defaults.global.hover.mode = 'nearest';
let type = 'logarithmic';
var ctx = document.getElementById('chart1').getContext('2d');
var chart1 = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: '# Cases',
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
            fill:false
      ***REMOVED***]
  ***REMOVED***

    // Configuration options go here
    options: {
        tooltips: {
            mode: 'nearest'
 ***REMOVED*****REMOVED***
        title: {
            display: true,
            text: 'Chart.js Line Chart - ' + type
 ***REMOVED*****REMOVED***
        scales: {
            xAxes: [{
                display: true,
          ***REMOVED***],
            yAxes: [{
                display: true,
                type: type
          ***REMOVED***]
      ***REMOVED***
  ***REMOVED***
***REMOVED***);

ctx = document.getElementById('chart2').getContext('2d');
var chart2 = new Chart(ctx, {
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

ctx = document.getElementById('chart4').getContext('2d');
var chart3 = new Chart(ctx, {
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
var chart4 = new Chart(ctx, {
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

document.getElementById('toggleScale').addEventListener('click', function() {
    type = type === 'linear' ? 'logarithmic' : 'linear';
    window.chart1.options.title.text = 'Total Cases - ' + type;
    window.chart1.options.scales.yAxes[0] = {
        display: true,
        type: type
  ***REMOVED***;

    window.chart1.update();
***REMOVED***);