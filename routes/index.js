var express = require("express");
var router = express.Router();
const numeral = require('numeral');


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
    const knex = res.locals.knex;
    if (knex){
        console.log("found KNEX")
        // TODO Load data for the day.
        getSummary(knex)
            .then(value => {
                value.totalCases = numeral(value.totalCases).format('0,0');
                value.totalDeaths = numeral(value.totalDeaths).format('0,0');
                value.totalRecoveries = numeral(value.totalRecoveries).format('0,0');
                value.totalTests = numeral(value.totalTests).format('0,0');
                value.dailyNew = numeral(value.dailyNew).format('0,0');
                value.dailyDeaths = numeral(value.dailyDeaths).format('0,0');
                // console.log("Sending these stats:",value)
                getProvinces(knex).then(value1 => {
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
                    getGraphData(knex).then(graphData => {
                        // console.log("Graph Data",graphData)

                        res.render("index",{data:value,provCases,provDeaths,provRecoveries,graphData***REMOVED***);
                  ***REMOVED***)
              ***REMOVED***)
                    .catch(function (err) {
                        // Crawling failed...
                  ***REMOVED***);
          ***REMOVED***)

  ***REMOVED***
    else{
        console.log("No Knex?")
  ***REMOVED***
***REMOVED***)
let getSummary = function(knex) {

    return knex.transaction((trx) =>{
        return knex('dates')
            .select('date',"totalCases","totalDeaths","totalTests","totalRecoveries","dailyNew","dailyDeaths","updateTime")
            .whereNotNull("totalCases")
            .whereNotNull("totalDeaths")
            .orderBy("date",'desc')
            .limit(1)
            .transacting(trx)
            .then(function(res1) {
                console.log("Done Summary 1")

                if (res1[0].totalTests === null){
                    return knex('dates')
                        .select('date','totalTests')
                        .whereNotNull('totalTests')
                        .limit(1)
                        .orderBy('date','desc')
                        .transacting(trx)
                        .then(value => {
                            res1[0].date2 = value[0].date;
                            res1[0].totalTests = value[0].totalTests;
                            console.log("Done Summary")
                            // return res1[0];
                            let promise = res1[0];
                            return promise ;
                      ***REMOVED***)
                        .then(trx.commit)
                        .catch(trx.rollback);
              ***REMOVED***
                else {
                    console.log("Done Summary 3")
                    trx.commit
                    let promise = res1[0];
                    return promise
              ***REMOVED***
          ***REMOVED***)
            .then(trx.commit)
            .catch(reason => {
                console.log("You messed up 1?",reason)
                trx.rollback
          ***REMOVED***);
  ***REMOVED***)


***REMOVED***

let getProvinces = function(knex) {
    return knex.transaction((trx) => {
        return knex('provinceDays')
            .select("provinceName", "provDate", "caseCount", "deathCount", "recovered")
            .orderBy("provDate", 'desc')
            .limit(10)
            .transacting(trx)
            .then(function (res) {
                return res
          ***REMOVED***)
            .then(trx.commit)
            .catch(reason => {
                console.log("You messed up 2?", reason)
                trx.rollback
          ***REMOVED***);
  ***REMOVED***)
***REMOVED***

let getGraphData = function(knex) {
    return knex.transaction((trx) => {
        return knex('dates')
            .select("date", "totalCases",
                "totalDeaths", "totalRecoveries",
                "activeCases", "totalTests",
                "dailyNew", "dailyDeaths")
            .orderBy("date", 'asc')
            .then(function (res) {
                return res
          ***REMOVED***)
            .then(trx.commit)
            .catch(reason => {
                console.log("You messed up 3?", reason)
                trx.rollback
          ***REMOVED***);
  ***REMOVED***)
***REMOVED***

module.exports = router;
