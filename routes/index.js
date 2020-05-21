var express = require("express");
var router = express.Router();
const numeral = require('numeral');
const moment = require('moment-timezone');
const sql = require('slonik').sql;
var etag = require('etag')
const minify = require('html-minifier').minify;
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

const minifyOptions = {
    caseSensitive:true,
    html5:true,
    customAttrSurround:true,
    customEventAttributes:true,
    collapseWhitespace:true,
    conservativeCollapse:true,
    minifyJS:true,
    preserveLineBreaks:true,
    preventAttributesEscaping:true,
    removeComments:true,
    removeEmptyElements: true,
    processScripts:['*']
}

moment.tz.setDefault("Africa/Johannesburg")

router.get("/", function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=1');
    const knex = res.locals.knex;
    const cache = res.locals.cache;
    const pool = res.locals.pool;
    const ejs = res.locals.ejs;
    const responseCache = cache.get("data");
    
    if (pool) {
        // TODO Load data for the day.
        if (responseCache) {
            console.log("CACHE FOUND")
            res.setHeader('ETag', etag(responseCache))
            res.render("index", unhashQuery(responseCache));
            return true;
        } else {
            console.log("cache was null, ignoring.")
        }
        getSummarySlonik(pool, responseCache)
          .then(responseData => {
              console.log('Done');
              // console.log('R',r.summary.length);
              // res.render("index", { data: responseData.summary,  graphData: responseData.graphs });
              
              let returnObj = {
                  data:responseData.summary,
                  provincesCurrent: responseData.allProvinces,
                  provincesHistorical:{
                      provCases:responseData.provinces.provCases,
                      provDeaths:responseData.provinces.provDeaths,
                      provRecoveries:responseData.provinces.provRecoveries,
                      provActive:responseData.provinces.provActive
                  },
                  graphData:responseData.graphs
              }
              res.setHeader('ETag', etag(hashQuery(returnObj)))
              ejs.renderFile('views/index.ejs',returnObj, {cache:true }, function(err, html){
                  if (err){
                      console.error("YOYOYO",err);
                      res.status(400).json({message:err}).send()
                      return false
                  }else{
                      res.send(html);
                      console.log("SETTING CACHE")
                      cache.set("data", hashQuery(returnObj));
                      return true;
                  }
                 
    
              })
              })
    
              /*await pool.end(); // ??*/
          
        // If valid cache.

    }
    else{
        console.log("No Pool?")
    }
})
const getSummarySlonik = async (pool,responseCache) => {
    console.log("In Main.")
    

    {
        let value, value2, value3, graphs;
        let provCases = {}, provDeaths = {}, provRecoveries = {}, provActive = {},provName={};
        let allProvinces = []
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
                    value.updateTime = moment(value.updateTime).tz('Africa/Johannesburg').format("dddd, MMMM Do YYYY, HH:mm:ssA");
                    // value.updateTime = (new Date(value.updateTime)).toString();

                    // 2 - getProvinces()
                    mysql = sql`-- @cache-ttl 600 \n select "provinceName", "provDate", "caseCount", "deathCount", "recovered" from "provinceDays" order by "provDate" desc limit 10`
                    console.log("Transaction 3");
                    value3 = await transactionConnection.many(mysql)
                    if (value3 && value3.length > 0) {
                        value3.forEach(province => {
                            console.log("Province",province.recovered);
                            let active = CommaFormatted(province.caseCount-(province.deathCount+province.recovered));
                            provName[provinceList[province.provinceName.toUpperCase()]] = province.provinceName.toUpperCase()
                            provCases[provinceList[province.provinceName.toUpperCase()]] = province.caseCount
                            provDeaths[provinceList[province.provinceName.toUpperCase()]] = province.deathCount
                            provRecoveries[provinceList[province.provinceName.toUpperCase()]] = province.recovered
                            provActive[provinceList[province.provinceName.toUpperCase()]] = (active)
                            console.log(province.provinceName.toUpperCase(),':',active);
                            allProvinces.push({provName:province.provinceName.toUpperCase(),
                                provCases:province.caseCount,
                                provDeaths:province.deathCount,
                                provActive:active,
                                provRecoveries:province.recovered
                            })
                            // console.log("Province:",province)
                        })
                        console.log('Done 3')
                    }
                    mysql = sql`-- @cache-ttl 600 \n select "date", "totalCases", "totalDeaths", "totalRecoveries", "activeCases", "totalTests", "dailyNew", "dailyDeaths" from "dates" order by "date" asc`
                    console.log("Transaction 4");
                    graphs = await transactionConnection.many(mysql)
                    if (graphs && graphs.length > 0) {
                        console.log('Done 4')
                    }

                }
                // End Transaction
                allProvinces.sort(compareValues('provCases'));
                console.log('Returning Value of:', value)
                let provinces = {provName, provCases, provDeaths, provRecoveries,provActive}
                console.log('Returning Provinces: of:', provinces)
    
                
                return {
                    'summary': value,
                    allProvinces,
                    provinces,
                    graphs
                };
            })
        })
        if (result) {
            
            return Promise.resolve(result)
        } else {
            return Promise.reject("Something went down: " + result)
        }
    }
}

function compareValues(key, order = 'desc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }
        
        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key];
        
        let comparison = 0;
        try{
            if ( varA >  varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
        }catch (e) {
            console.log("Error",e);
            console.log("-",varA)
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}


function CommaFormatted(amount) {
    const delimiter = ','; // replace comma if desired
    let i = parseInt(amount);
    if (isNaN(i)) { return 'N/A'; }
    let minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    let n = String(i);
    const a = [];
    while (n.length > 3) {
        const nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    amount = n;
    amount = minus + amount;
    return amount;
}
module.exports = router;
