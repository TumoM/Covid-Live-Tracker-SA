var express = require("express");
var router = express.Router();
const numeral = require('numeral');


const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.PG_HOST||'127.0.0.1',
        user: process.env.PG_USER||'test_user',
        password: process.env.PG_PASS||'temp_pass',
        database: process.env.DB_NAME||'covid-tracker-sa2'
    }
});

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
                let provCases = {}
                let provDeaths = {}
                let provRecoveries = {}
                value1.forEach(province =>{
                    provCases[provinceList[province.provinceName.toUpperCase()]] = province.caseCount
                    provDeaths[provinceList[province.provinceName.toUpperCase()]] = province.deathCount
                    provRecoveries[provinceList[province.provinceName.toUpperCase()]] = province.recovered
                    // console.log("Province:",province)
                })
                //
                // console.log("Prov Cases:",provCases)
                // console.log("Prov Deaths:",provDeaths)
                // console.log("Prov Recovs:",provRecoveries)
                getGraphData().then(graphData => {
                    // console.log("Graph Data",graphData)
                        res.render("index",{data:value,provCases,provDeaths,provRecoveries,graphData});
                })
            })
            .catch(function (err) {
                // Crawling failed...
            });
        })
})
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
                    })
            }
            else {
                return res1[0];
            }
        })
        .catch(reason => {
            console.log("You messed up?",reason)
        });
}

let getProvinces = function() {
    return knex('provinceDays')
        .select("provinceName","provDate","caseCount","deathCount","recovered")
        .orderBy("provDate",'desc')
        .limit(10)
        .then(function(res) {
            return res
        })
        .catch(reason => {
            console.log("You messed up?",reason)
        });
}

let getGraphData = function() {
    return knex('dates')
        .select("date","totalCases",
            "totalDeaths","totalRecoveries",
            "activeCases","totalTests",
            "dailyNew","dailyDeaths")
        .orderBy("date",'asc')
        .then(function(res) {
            return res
        })
        .catch(reason => {
            console.log("You messed up?",reason)
        });
}

module.exports = router;
