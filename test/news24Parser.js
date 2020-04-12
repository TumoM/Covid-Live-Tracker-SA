const HTMLParser = require('node-html-parser'),
    rp = require('request-promise'),
    Province = require("../models/provinceModel"),
    Death = require("../models/deathModel"),
    Day = require("../models/dayModel"),
    DbSetup = require("../test/db"),
    JSSoup = require('jssoup').default;;
const url = "https://www.health24.com/Medical/Infectious-diseases/Coronavirus/coronavirus-in-sa-all-the-confirmed-cases-20200312";
const linkRegex = /.*\d{4***REMOVED***\/\d{2***REMOVED***\/\d{2***REMOVED***\/update-.*covid-.*20\d{2***REMOVED***\//

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'test_user',
        password: 'temp_pass',
        database: 'covid-tracker-sa'
  ***REMOVED***
***REMOVED***);


const PROVINCES = { // Name, [sick, dead]
    "GAUTENG": Province,
    "WESTERN CAPE": Province,
    "KWAZULU–NATAL": Province,
    "FREE STATE": Province,
    "EASTERN CAPE": Province,
    "LIMPOPO": Province,
    "MPUMALANGA": Province,
    "NORTH WEST": Province,
    "NORTHERN CAPE": Province,
    "UNALLOCATED": Province
***REMOVED***
let provincesList = []
let totalCases = 0, totalDeaths = 0
rp(url)
    .then(function (html) {
        //success!
        const headBody = html.match(/<h6.*block datestamp[\s\S]*<\/hgroup>/m) // The Header with total Cases and Deaths.
        const mainBody = html.match(/.*those details can be found here/gmiu) // The body with province counts.
        const soup = new JSSoup(html);
        console.log(soup.toString())
  ***REMOVED***)
    .catch(function (err) {
        console.log(err)
  ***REMOVED***);
