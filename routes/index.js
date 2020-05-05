var express = require("express");
var router = express.Router();
const numeral = require('numeral');
const moment = require('moment-timezone');
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
};

const hashQuery = (query) => {
    return JSON.stringify(query);
};
const unhashQuery = (query) => {
    return JSON.parse(query);
};

moment.tz.setDefault("Africa/Johannesburg")

router.get("/", function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const knex = res.locals.knex;
    const cache = res.locals.cache;
    const pool = res.locals.pool;
    if (pool){
        // TODO Load data for the day.
        getSummarySlonik(pool,cache)
            .then( r => {
                console.log('Done');
                // console.log('R',r.summary.length);
                res.render("index",{data:r.summary,provCases:r.provinces.provCases,provDeaths:r.provinces.provDeaths,provRecoveries:r.provinces.provRecoveries,graphData:r.graphs});
                /*await pool.end(); // ??*/
            });
        // If valid cache.

    }
    else{
        console.log("No Knex?")
    }
})
const getSummarySlonik = async (pool,cache) => {
    console.log("In Main.")
    const responseCache = cache.get("data");

    if (responseCache) {
        console.log("CACHE FOUND")
        // console.log("But ignoring")
        if (responseCache !== null){
            return Promise.resolve(unhashQuery(responseCache));
        }
        else{
            console.log("cache was null, ignoring.")
            }
    }

    {
        let value, value2, value3, value4;
        let provCases = {}, provDeaths = {}, provRecoveries = {};
        const result = await pool.connect(async (connection) => {
            let mysql;

            // Start Transaction
            return await connection.transaction(async (transactionConnection) => {
                // 1 - getSummary()
                mysql = sql`-- @cache-ttl 600 \n select "date", "totalCases", "totalDeaths", "totalTests", "totalRecoveries", "dailyNew", "dailyDeaths", "updateTime" from "dates" where "totalCases" is not null and "totalDeaths" is not null order by "date" desc limit(1)`;
                console.log("Transaction 1");
                value = await transactionConnection.maybeOne(mysql); // Transaction call 1 (Get latest row)
                // console.log("Done 1")
                if (value) {
                    if (!value.totalTests) {
                        mysql = sql`-- @cache-ttl 600 \n SELECT "date", "totalTests" FROM "dates" WHERE "totalTests" is not null Order By "date" desc limit 1`;
                        console.log("Transaction 2");
                        value2 = await transactionConnection.maybeOne(mysql); // Transaction call 2 (Get valid Test value)
                        if (value2) {
                            value.date2 = value2.date;
                            value.totalTests = value2.totalTests
                        }
                        console.log("Done 2")
                    } else {
                        console.log('Done 2 - Skipped')
                    }
                }
                if (value) {
                    // Number formatting:
                    value.totalCases = numeral(value.totalCases).format('0,0');
                    value.totalDeaths = numeral(value.totalDeaths).format('0,0');
                    value.totalRecoveries = numeral(value.totalRecoveries).format('0,0');
                    value.totalTests = numeral(value.totalTests).format('0,0');
                    value.dailyNew = numeral(value.dailyNew).format('0,0');
                    value.dailyDeaths = numeral(value.dailyDeaths).format('0,0');
                    value.updateTime = moment(value.updateTime).tz('Africa/Johannesburg').toDate()
                    // value.updateTime = (new Date(value.updateTime)).toString();

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
                        })
                        console.log('Done 3')
                    }
                    mysql = sql`-- @cache-ttl 600 \n select "date", "totalCases", "totalDeaths", "totalRecoveries", "activeCases", "totalTests", "dailyNew", "dailyDeaths" from "dates" order by "date" asc`
                    console.log("Transaction 4");
                    value4 = await transactionConnection.many(mysql)
                    if (value4 && value4.length > 0) {
                        console.log('Done 4')
                    }

                }
                // End Transaction
                console.log('Returning Value of:', value)
                return {'summary': value, 'provinces': {provCases, provDeaths, provRecoveries}, 'graphs': value4};
            })
        })
        if (result) {
            console.log("SETTING CACHE")
            cache.set("data", hashQuery(result));
            return Promise.resolve(result)
        } else {
            return Promise.reject("Something went down: " + result)
        }
    }
}

module.exports = router;
