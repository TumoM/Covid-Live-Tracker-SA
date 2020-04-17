var express = require("express");
var router = express.Router();
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
***REMOVED***


router.get("/", function (req, res) {
    // TODO Load data for the day.
    getSummary()
        .then(value => {
            console.log("Sending these stats:",value)
            getProvinces().then(value1 => {
                let provCases = {***REMOVED***
                let provDeaths = {***REMOVED***
                value1.forEach(province =>{
                    provCases[provinceList[province.provinceName.toUpperCase()]] = province.caseCount
                    provDeaths[provinceList[province.provinceName.toUpperCase()]] = province.deathCount
              ***REMOVED***)
                console.log("Prov Cases:",provCases)
                console.log("Prov Deaths:",provDeaths)
                res.render("index",{data:value,provCases:provCases,provDeaths:provDeaths***REMOVED***);
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
        .select("provinceName","provDate","caseCount","deathCount")
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
