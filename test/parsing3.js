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
        .select()
        .whereNotNull("totalCases")
        .andWhereNot("totalDeaths",'=',null)
        .andWhereNot("totalTests",'=',null)
        .orderBy("date",'desc')
        .limit(1)
            .then(function(res1) {
                console.log(res1)
                return knex('users').where({ 'google_id':profile_id ***REMOVED***).select('id')
                    // ^^^^^^
                    .then(function(uid) {
                        return knex.insert({ 'unit_id':unit, 'user_id':uid ***REMOVED***).into('users_units')
                            // ^^^^^^
                            .then(function(user_units) {
                                return { 'unit_id':unit, 'user_id':uid, 'user_units':user_units ***REMOVED***;
                                // ^^^^^^
                          ***REMOVED***);
                  ***REMOVED***);
          ***REMOVED***);
***REMOVED***

knex('dates')
    .select()
    .whereNotNull("totalCases")
    .andWhereNot("totalDeaths",'=',null)
    .andWhereNot("totalTests",'=',null)
    .orderBy("date",'desc')
    .limit(1)

