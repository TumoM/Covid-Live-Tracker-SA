const HTMLParser = require('node-html-parser'),
    rp = require('request-promise'),
    Province = require("../models/provinceModel"),
    Death = require("../models/deathModel"),
    Day = require("../models/dayModel"),
    DbSetup = require("../test/db24"),
    JSSoup = require('jssoup').default;
const url = "https://www.health24.com/Medical/Infectious-diseases/Coronavirus/coronavirus-in-sa-all-the-confirmed-cases-20200312";

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'test_user',
        password: 'temp_pass',
        database: 'covid-tracker-sa2'
  ***REMOVED***
***REMOVED***);

let x = function() {
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

