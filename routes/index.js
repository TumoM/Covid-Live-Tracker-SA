var express = require("express");
var router = express.Router();
const numeral = require('numeral');
const rp = require("request-promise");
const Chart = require('chart.js');
const HTMLParser = require('node-html-parser');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'test_user',
        password: 'temp_pass',
        database: 'covid-tracker-sa2'
  ***REMOVED***
***REMOVED***);

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
            console.log("Sending these stats:",value)
            getProvinces().then(value1 => {
                let provCases = {***REMOVED***
                let provDeaths = {***REMOVED***
                let provRecoveries = {***REMOVED***
                value1.forEach(province =>{
                    provCases[provinceList[province.provinceName.toUpperCase()]] = province.caseCount
                    provDeaths[provinceList[province.provinceName.toUpperCase()]] = province.deathCount
                    provRecoveries[provinceList[province.provinceName.toUpperCase()]] = province.recovered
                    console.log("Province:",province)
/*
                    provCases[provinceList[province.provinceName.toUpperCase()]] = numeral(province.caseCount).format('0,0');
                    provDeaths[provinceList[province.provinceName.toUpperCase()]] = numeral(province.deathCount).format('0,0');*/
              ***REMOVED***)

                console.log("Prov Cases:",provCases)
                console.log("Prov Deaths:",provDeaths)
                console.log("Prov Recovs:",provRecoveries)

                let urlSA = "https://www.worldometers.info/coronavirus/country/south-africa/"
                rp(urlSA)
                    .then(function (data) {
                        let title,style,div,script
                        const root = HTMLParser.parse(data);
                        const table1 = root.querySelector(".col-md-12")

                        // [title,style,div,script] = table1.childNodes
                        // console.log(root.structuredText);
                        // Process html...
                        res.render("index",{data:value,provCases,provDeaths,provRecoveries,caseTableHTML:data***REMOVED***);

                  ***REMOVED***)
                    .catch(function (err) {
                        // Crawling failed...
                  ***REMOVED***);
          ***REMOVED***)

      ***REMOVED***)
***REMOVED***)
let getSummary = function() {
    return knex('dates')
        .select('date',"totalCases","totalDeaths","totalTests","totalRecoveries")
        .whereNotNull("totalCases")
        .whereNotNull("totalDeaths")
        .whereNotNull("totalTests")
        .orderBy("date",'desc')
        .limit(1)
        .then(function(res1) {
            if (res1[0].totalRecoveries === null){
                return knex('dates')
                    .select('date','totalRecoveries')
                    .whereNotNull('totalRecoveries')
                    .limit(1)
                    .orderBy('date','desc')
                    .then(value => {
                        res1[0].date2 = value[0].date;
                        res1[0].totalRecoveries = value[0].totalRecoveries;
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
        .then(function(res1) {
            return res1
      ***REMOVED***)
        .catch(reason => {
            console.log("You messed up?",reason)
      ***REMOVED***);
***REMOVED***

module.exports = router;
