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


const PROVINCES = { // Name, [sick, dead]
    "GAUTENG": new Province("GAUTENG"),
    "WESTERN CAPE": new Province("WESTERN CAPE"),
    "KWAZULU–NATAL": new Province("KWAZULU–NATAL"),
    "FREE STATE": new Province("FREE STATE"),
    "EASTERN CAPE": new Province("EASTERN CAPE"),
    "LIMPOPO": new Province("LIMPOPO"),
    "MPUMALANGA": new Province("MPUMALANGA"),
    "NORTH WEST": new Province("NORTH WEST"),
    "NORTHERN CAPE": new Province("NORTHERN CAPE"),
    "UNALLOCATED": new Province("UNALLOCATED")
***REMOVED***
let provincesList = [
    "Gauteng",
    "Western Cape",
    "KwaZulu-Natal",
    "Free State",
    "Eastern Cape",
    "Limpopo",
    "Mpumalanga",
    "North West",
    "Northern Cape",
    "Unallocated"
]
let totalCases = 0, totalDeaths = 0, recoveryNumberTotal = 0;


function updateDaysGood(itemData) {
    let dateData = {
        date: itemData.provDate,
        totalCases,
        totalDeaths,
        totalRecoveries:recoveryNumberTotal,
        maybeValid: false,
        parsed: true
  ***REMOVED***
    knex('dates')
    .select()
    .where({date:itemData.provDate***REMOVED***)
    .then(rows => {
        if (rows.length === 0) {
            knex("dates ").insert(dateData)
                .then(id => {
                    console.log("Updated Dates Table")
              ***REMOVED***)
                .catch(err => {
                    console.log("Attempted duplicate insert")
              ***REMOVED***)
      ***REMOVED***
  ***REMOVED***);
  ***REMOVED***

rp(url)
    .then(function (html) {
        //success!
        let currentProvincesRecovery = Object.assign({***REMOVED***, PROVINCES);
        let currentProvincesCasesDeaths = Object.assign({***REMOVED***, PROVINCES);

        // #######################################################################################
        const headHtml = html.match(/<h6.*block datestamp[\s\S]*<\/hgroup>/m), // The Header with total Cases and Deaths.
            bodyHtml = html.match(/.*those details can be found here/m), // The body with province counts.
            soupHead = new JSSoup(headHtml),
            soupBody = new JSSoup(bodyHtml);


        // Parses the 'head' of the page for Case and Death Numbers
        let templines = soupHead.prettify().trim().split(/<\/?\w*\s?\d?[\s\S]?>\n/);
        let date = templines[0].split('Updated')[1].trim();
        let parsed = false
        knex('dates').where({date***REMOVED***).then(rows => {
            console.log("Row Count:", rows.length);
            if (rows.length > 0 && rows[0].parsed) {
                parsed = true;
                console.log("Skipping");
          ***REMOVED*** else if (rows.length > 0 && rows[0].maybeValid) {
                // Maybe the format is all wrong. Parse another site/source?
          ***REMOVED*** else if ((rows.length === 0) || (rows.length > 0 && !rows[0].error)) {
                [totalCases, totalDeaths] = (templines[5].trim().split("."))

                totalCases = getNumber(totalCases)
                totalDeaths = getNumber(totalDeaths)

                console.log(`${date***REMOVED***: Cases:${totalCases***REMOVED***, Deaths:${totalDeaths***REMOVED***`)
                // #######################################################################################

                // TODO 1: Parse info on Recoveries by Province
                let recoveriesLines = soupBody.find('p').getText().split(":"),
                    recoveryDate = recoveriesLines[0].match(/\d+.*/)[0];

                recoveryNumberTotal = getNumber(recoveriesLines[1]);
                console.log(`Total Recovery:${recoveryNumberTotal***REMOVED***\n`)

                let provinceRecoveries = recoveriesLines[2].split(/\),?\.?/)
                let provinceRecoveries2 = []
                provinceRecoveries.forEach(value => {
                    provinceRecoveries2.push(value.split('(')[0].trim())
              ***REMOVED***)
                provinceRecoveries[provinceRecoveries.length - 1].length === 0 ? provinceRecoveries.pop() : provinceRecoveries // Removes trailing blank index.
                // TODO Loop over list of prov names, insert missing names in provinceRecoveries
                provincesList.forEach(value => {
                    if (!(provinceRecoveries2.includes(value))){
                        provinceRecoveries.push(`${value***REMOVED*** (0`)
                  ***REMOVED***
              ***REMOVED***)
                console.log(`Recovery Counts (${recoveryDate***REMOVED***):`)
                provinceRecoveries.forEach(line => {
                    let recoverCount, provinceName;
                    [provinceName, recoverCount] = line.trim().split("(")
                    provinceName = provinceName.trim();
                    const tempProvince = new Province(provinceName)
                    tempProvince.recovered = recoverCount;
                    tempProvince.date = recoveryDate;
                    currentProvincesRecovery[provinceName] = tempProvince;
                    // console.log(currentProvincesRecovery[provinceName])
                    console.log(`${provinceName***REMOVED***: ${recoverCount***REMOVED***`);
                    let tableName = 'provinceDays';
                    let tempDate = recoveryDate.split(" ");
                    const dateFormatted = new Date(recoveryDate);
                    let newTemp = dateFormatted.toLocaleDateString().split("/")
                    let itemData = {
                        provinceName,
                        provDate: `${newTemp[2]***REMOVED***-${newTemp[0]***REMOVED***-${newTemp[1]***REMOVED***`,
                        recovered: recoverCount
                  ***REMOVED***;

                    knex(tableName).select().where({provDate: itemData.provDate, provinceName***REMOVED***)
                        .then(rows => {
                            if (rows.length === 0) {
                                knex(tableName).insert(itemData)
                                    .then(value => {
                                        console.log("Recovered Inserted")
                                  ***REMOVED***)
                                    .catch(reason => {
                                        console.log("Error inserting Province Recovered", reason)
                                  ***REMOVED***)
                          ***REMOVED*** else {
                                knex(tableName).update({recovered: recoveryNumberTotal***REMOVED***).where({provDate: recoveryDate***REMOVED***)
                                    .then(value => {
                                        console.log("Recovered Updated")
                                  ***REMOVED***)
                                    .catch(reason => {
                                        console.log("Error Updating Province Recovered", reason)
                                  ***REMOVED***)
                          ***REMOVED***
                      ***REMOVED***)
                        .catch(reason => {
                            console.log("Duplicate Province? ", reason)
                      ***REMOVED***)
              ***REMOVED***)
                // TODO 2: Parse info on New Cases by Province
                console.log('\nCase Counts:')
                let p = soupBody.find('p'),
                    breakdown = false,
                    caseCount = 0,
                    deathCount = 0,
                    provinceName = '';

                while (!breakdown) {
                    p = p.findNextSibling('p');
                    if (p.text === 'PROVINCIAL BREAKDOWN:') {
                        breakdown = true;
                        p = p.findNextSibling('p');
                        for (let index = 0; index < 10; index++) {
                            let vars = p.text.replace(/&nbsp;/g, '  ').split("-")
                            p = p.findNextSibling('p');
                            provinceName = vars[1].trim() === "KwaZulu" ? "KwaZulu-Natal" : vars[1].trim();
                            caseCount = vars[0].trim();
                            deathCount = vars.length === 3 ? vars[2].split('  ')[0].trim()
                                : vars.length === 4 ? vars[3].split('  ')[0].trim()
                                    : 0;
                            let tempProv = new Province(provinceName, caseCount);
                            tempProv.totalDead = deathCount;
                            tempProv.date = date;
                            console.log(`${provinceName***REMOVED*** - Cases: ${tempProv.sick***REMOVED***, Dead: ${tempProv.totalDead***REMOVED***`)
                            currentProvincesCasesDeaths[provinceName] = tempProv;

                            // TODO Build object to upload to ProvinceDays using insertIgnore funct below
                            let tableName = 'provinceDays';
                            let tempDate = date.split(" ");
                            const dateFormatted = new Date(date);
                            let newTemp = dateFormatted.toLocaleDateString().split("/")
                            let provDate = `${newTemp[2]***REMOVED***-${newTemp[0]***REMOVED***-${newTemp[1]***REMOVED***`
                            let itemData = {
                                provinceName,
                                provDate,
                                caseCount,
                                deathCount
                          ***REMOVED***;
                            knex(tableName).where({provDate, provinceName***REMOVED***)
                                .then(rows => {
                                    if (rows.length === 0) {
                                        knex(tableName).insert(itemData)
                                            .then(value => {
                                                updateDaysGood(itemData);
                                          ***REMOVED***)
                                            .catch(reason => {
                                                console.log("Error inserting Province ", reason)
                                          ***REMOVED***)
                                  ***REMOVED*** else {
                                        console.log("Already in.")
                                        //updateDaysGood(itemData);

                                  ***REMOVED***
                              ***REMOVED***)
                                .catch(reason => {
                                    console.log("Duplicate Province? ", reason)
                              ***REMOVED***)
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***
          ***REMOVED***
            console.log("Swag 2")
      ***REMOVED***)
        .catch(function (err) {
            console.log(err)
      ***REMOVED***);
  ***REMOVED***)

function getNumber(line){
    let intString = "";
    let total = line.match(/\d[\d+\s]*\d+/)[0].split(" ")
    total.forEach(digit => {
        intString += digit
  ***REMOVED***)
    return (+intString)
***REMOVED***
