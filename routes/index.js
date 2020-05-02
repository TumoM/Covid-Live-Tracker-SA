var express = require("express");
var router = express.Router();
const numeral = require('numeral');
const moment = require('moment');
const sql = require('slonik').sql;
// const sql = slonik.sql;




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

const hashQuery = (query) => {
    return JSON.stringify(query);
***REMOVED***;
const unhashQuery = (query) => {
    return JSON.parse(query);
***REMOVED***;
router.get("/", async function (req, res) {
    const knex = res.locals.knex;
    const cache = res.locals.cache;
    const pool = res.locals.pool;
    if (pool){
        console.log("Pool Present")
        // TODO Load data for the day.
        await getSummarySlonik(pool,cache)
            .then(async r => {
                console.log('Done');
                // console.log('R',r.summary.length);
                res.render("index",{data:r.summary,provCases:r.provinces.provCases,provDeaths:r.provinces.provDeaths,provRecoveries:r.provinces.provRecoveries,graphData:r.graphs***REMOVED***);
                /*await pool.end(); // ??*/
          ***REMOVED***);
        // If valid cache.

  ***REMOVED***
    else{
        console.log("No Knex?")
  ***REMOVED***
***REMOVED***)
const getSummarySlonik = async (pool,cache) => {
    console.log("In Main.")
    const responseCache = cache.get("data");

    if (responseCache) {
        console.log("CACHE FOUND")
        // console.log("But ignoring")
        return Promise.resolve(unhashQuery(responseCache));
  ***REMOVED***

    {
        let value, value2, value3, value4;
        let provCases = {***REMOVED***, provDeaths = {***REMOVED***, provRecoveries = {***REMOVED***;
        const result = await pool.connect(async (connection) => {
            console.log("Got result?")
            let mysql;

            // Start Transaction
            return await connection.transaction(async (transactionConnection) => {
                // 1 - getSummary()
                mysql = sql`-- @cache-ttl 600 \n select "date", "totalCases", "totalDeaths", "totalTests", "totalRecoveries", "dailyNew", "dailyDeaths", "updateTime" from "dates" where "totalCases" is not null and "totalDeaths" is not null order by "date" desc limit(1)`;
                console.log("Transaction 1");
                value = await transactionConnection.maybeOne(mysql); // Transaction call 1 (Get latest row)
                console.log("Done 1")
                if (value) {
                    if (!value.totalTests) {
                        mysql = sql`-- @cache-ttl 600 \n SELECT "date", "totalTests" FROM "dates" WHERE "totalTests" is not null Order By "date" desc limit 1`;
                        console.log("Transaction 2");
                        value2 = await transactionConnection.maybeOne(mysql); // Transaction call 2 (Get valid Test value)
                        if (value2) {
                            value.date2 = value2.date;
                            value.totalTests = value2.totalTests
                      ***REMOVED***
                        console.log("Done 2")
                  ***REMOVED*** else {
                        console.log('Done 2 - Skipped')
                  ***REMOVED***
              ***REMOVED***
                if (value) {
                    // Number formatting:
                    value.totalCases = numeral(value.totalCases).format('0,0');
                    value.totalDeaths = numeral(value.totalDeaths).format('0,0');
                    value.totalRecoveries = numeral(value.totalRecoveries).format('0,0');
                    value.totalTests = numeral(value.totalTests).format('0,0');
                    value.dailyNew = numeral(value.dailyNew).format('0,0');
                    value.dailyDeaths = numeral(value.dailyDeaths).format('0,0');
                    value.updateTime = moment(value.updateTime).toDate();

                    // 2 - getProvinces()
                    mysql = sql`-- @cache-ttl 600 \n select "provinceName", "provDate", "caseCount", "deathCount", "recovered" from "provinceDays" order by "provDate" desc limit 10`
                    console.log("Transaction 3");
                    value3 = await transactionConnection.many(mysql)
                    if (value3 && value3.length > 0) {
                        value3.forEach(province => {
                            provCases[provinceList[province.provinceName.toUpperCase()]] = province.caseCount
                            provDeaths[provinceList[province.provinceName.toUpperCase()]] = province.deathCount
                            provRecoveries[provinceList[province.provinceName.toUpperCase()]] = province.recovered
                            // console.log("Province:",province)
                      ***REMOVED***)
                        console.log('Done 3')
                  ***REMOVED***
                    mysql = sql`-- @cache-ttl 600 \n select "date", "totalCases", "totalDeaths", "totalRecoveries", "activeCases", "totalTests", "dailyNew", "dailyDeaths" from "dates" order by "date" asc`
                    console.log("Transaction 4");
                    value4 = await transactionConnection.many(mysql)
                    if (value4 && value4.length > 0) {
                        console.log('Done 4')
                  ***REMOVED***

              ***REMOVED***
                // End Transaction
                console.log('Returning Value of:', value)
                return {'summary': value, 'provinces': {provCases, provDeaths, provRecoveries***REMOVED***, 'graphs': value4***REMOVED***;
          ***REMOVED***)
      ***REMOVED***)
        if (result) {
            console.log("SETTING CACHE")
            cache.set("data", hashQuery(result));
            return Promise.resolve(result)
      ***REMOVED*** else {
            return Promise.reject("Something went down: " + result)
      ***REMOVED***
  ***REMOVED***
***REMOVED***

module.exports = router;
