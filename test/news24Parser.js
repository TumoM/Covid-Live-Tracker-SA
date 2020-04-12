const HTMLParser = require('node-html-parser'),
    rp = require('request-promise'),
    Province = require("../models/provinceModel"),
    Death = require("../models/deathModel"),
    Day = require("../models/dayModel"),
    DbSetup = require("../test/db"),
    JSSoup = require('jssoup').default;;
const url = "https://www.health24.com/Medical/Infectious-diseases/Coronavirus/coronavirus-in-sa-all-the-confirmed-cases-20200312";

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
        // #######################################################################################
        const headHtml = html.match(/<h6.*block datestamp[\s\S]*<\/hgroup>/m) // The Header with total Cases and Deaths.
        const bodyHtml = html.match(/.*those details can be found here/gmiu) // The body with province counts.
        const soupHead = new JSSoup(headHtml);
        const soupBody = new JSSoup(bodyHtml);


        // Parses the 'head' of the page for Case and Death Numbers
        let templines = soupHead.prettify().trim().split(/<\/?\w*\s?\d?[\s\S]?>\n/);
        let date = templines[0].split('Updated')[1].trim(),
            intString = "";
        [totalCases, totalDeaths] = (templines[5].trim().split("."))

        totalCases = getNumber(totalCases)
        totalDeaths = getNumber(totalDeaths)

        console.log(`${date***REMOVED***: Cases:${totalCases***REMOVED***, Deaths:${totalDeaths***REMOVED***`)
        // #######################################################################################

        // TODO 1: Parse info on Recoveries by Province
        let recoveriesLines = soupBody.find('p').getText().split(":")
        let recoveryDate = recoveriesLines[0].match(/\d+.*/)
        let RecoveryNumber = getNumber(recoveriesLines[1])
        let provinceRecoveries = recoveriesLines[2].split(/\),?\.?/)
        provinceRecoveries.pop() // Removes trailing blank index.
        provinceRecoveries.forEach(line => {
            [provinceName, recoverCount] = line.trim().split("(")
            console.log(`${provinceName***REMOVED***:${recoverCount***REMOVED***`)
      ***REMOVED***)
        // TODO 2: Parse info on New Cases by Province

        console.log("Swag 2")
  ***REMOVED***)
    .catch(function (err) {
        console.log(err)
  ***REMOVED***);

function getNumber(line){
    let intString = "";
    let total = line.match(/\d[\d+\s+]*\d+/)[0].split(" ")
    total.forEach(digit => {
        intString += digit
  ***REMOVED***)
    return (+intString)
***REMOVED***
