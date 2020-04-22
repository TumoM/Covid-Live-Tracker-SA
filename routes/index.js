var express = require("express");
var router = express.Router();
const numeral = require('numeral');

let connection = process.env.DATABASE_URL || {
    host: process.env.PG_HOST||'127.0.0.1',
    user: process.env.PG_USER||'test_user',
    password: process.env.PG_PASS||'temp_pass',
    database: process.env.DB_NAME||'covid-tracker-sa2'
***REMOVED***

console.log("Connection:",connection)
const knex = require('knex')({
    client: 'pg',
    pool: {
        "min": 2,
        "max": 30,
        "createTimeoutMillis": 3000,
        "acquireTimeoutMillis": 30000,
        "idleTimeoutMillis": 30000,
        "reapIntervalMillis": 1000,
        "createRetryIntervalMillis": 100,
        "propagateCreateError": false // <- default is true, set to false
  ***REMOVED***
    connection
***REMOVED***)

const provinceList = {
    "NORTH WEST": 'ZA-NW',
    "EASTERN CAPE": 'ZA-EC',
    "FREE STATE": 'ZA-FS',
    "MPUMALANGA": 'ZA-MP',
    "NORTHERN CAPE": 'ZA-NC',
    "LIMPOPO": 'ZA-LP',
    "WESTERN CAPE": 'ZA-WC',
    "GAUTENG": 'ZA-GT',
    "KWAZULU-NATAL": 'ZA-NL',
    "UNALLOCATED": 'ZA-UN'
***REMOVED***;


router.get("/", function (req, res) {
    // TODO Load data for the day.
    getSummary()
        .then(value => {
            value.totalCases = numeral(value.totalCases).format('0,0');
            value.totalDeaths = numeral(value.totalDeaths).format('0,0');
            value.totalRecoveries = numeral(value.totalRecoveries).format('0,0');
            value.totalTests = numeral(value.totalTests).format('0,0');
            // console.log("Sending these stats:",value)
            getProvinces().then(value1 => {
                let provCases = {***REMOVED***
                let provDeaths = {***REMOVED***
                let provRecoveries = {***REMOVED***
                value1.forEach(province =>{
                    provCases[provinceList[province.provinceName.toUpperCase()]] = province.caseCount
                    provDeaths[provinceList[province.provinceName.toUpperCase()]] = province.deathCount
                    provRecoveries[provinceList[province.provinceName.toUpperCase()]] = province.recovered
                    // console.log("Province:",province)
              ***REMOVED***)
                //
                // console.log("Prov Cases:",provCases)
                // console.log("Prov Deaths:",provDeaths)
                // console.log("Prov Recovs:",provRecoveries)
                getGraphData().then(graphData => {
                    // console.log("Graph Data",graphData)
                        res.render("index",{data:value,provCases,provDeaths,provRecoveries,graphData***REMOVED***);
              ***REMOVED***)
          ***REMOVED***)
            .catch(function (err) {
                // Crawling failed...
          ***REMOVED***);
      ***REMOVED***)
***REMOVED***)
let getSummary = function() {
    return knex('dates')
        .select('date',"totalCases","totalDeaths","totalTests","totalRecoveries")
        .whereNotNull("totalCases")
        .whereNotNull("totalDeaths")
        .orderBy("date",'desc')
        .limit(1)
        .then(function(res1) {
            if (res1[0].totalTests === null){
                return knex('dates')
                    .select('date','totalTests')
                    .whereNotNull('totalTests')
                    .limit(1)
                    .orderBy('date','desc')
                    .then(value => {
                        res1[0].date2 = value[0].date;
                        res1[0].totalTests = value[0].totalTests;
                        return res1[0]
                  ***REMOVED***)
          ***REMOVED***
            else {
                return res1[0];
          ***REMOVED***
      ***REMOVED***)
        .catch(reason => {
            console.log("You messed up?",reason)
      ***REMOVED***);
***REMOVED***

let getProvinces = function() {
    return knex('provinceDays')
        .select("provinceName","provDate","caseCount","deathCount","recovered")
        .orderBy("provDate",'desc')
        .limit(10)
        .then(function(res) {
            return res
      ***REMOVED***)
        .catch(reason => {
            console.log("You messed up?",reason)
      ***REMOVED***);
***REMOVED***

let getGraphData = function() {
    return knex('dates')
        .select("date","totalCases",
            "totalDeaths","totalRecoveries",
            "activeCases","totalTests",
            "dailyNew","dailyDeaths")
        .orderBy("date",'asc')
        .then(function(res) {
            return res
      ***REMOVED***)
        .catch(reason => {
            console.log("You messed up?",reason)
      ***REMOVED***);
***REMOVED***

module.exports = router;
