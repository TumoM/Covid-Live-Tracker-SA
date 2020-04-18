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


const PROVINCES = { // Name, [cases, deadArr]
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
let totalCases = 0,
    totalDeaths = 0,
    totalRecoveries = 0,
    date;


function updateDaysGood(itemData) {
    console.log('Updating Day Function:')
    let dateData = {
        totalCases,
        totalDeaths,
        totalRecoveries,
        maybeValid: false,
        parsed: true
  ***REMOVED***
    console.log("Date:",itemData.provDate)
    knex('dates')
    .select()
    .where({date:itemData.provDate***REMOVED***)
    .then(rows => {
        // console.log(`Working with Row Length ${rows.length***REMOVED***, with Data:\n${JSON.stringify(rows,null,2)***REMOVED***`)
        console.log("date in func",itemData.provDate)
        if (rows.length === 0) {
            dateData.date = itemData.provDate,
            knex("dates ").insert(dateData)
                .then(id => {
                    console.log("Inserted into Dates Table")
              ***REMOVED***)
                .catch(err => {
                    console.log("Attempted duplicate insert?",err)
              ***REMOVED***)
      ***REMOVED***else{
            knex("dates ")
            .update(dateData)
            .where('date',"=",itemData.provDate)
                .then(id => {
                    console.log("Updated Dates Table")
              ***REMOVED***)
                .catch(err => {
                    console.log("Attempted duplicate update?",err)
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
        date = templines[0].split('Updated')[1].trim();
        let parsed = false
        knex('dates').where({date***REMOVED***).then(rows => {
            console.log("Row Count:", rows.length);
            if (rows.length > 0 && rows[0].parsed && !rows[0].maybeValid) {
                parsed = true;
                console.log("Skipping");
          ***REMOVED***
            // else if (rows.length > 0 && rows[0].maybeValid) {
            //     // Maybe the format is all wrong. Parse another site/source?
            // ***REMOVED***
            else if ((rows.length === 0)  || rows[0].maybeValid || (rows.length > 0 && !rows[0].error)) {
                [totalCases, totalDeaths] = (templines[5].trim().split("."))

                totalCases = getNumber(totalCases)
                totalDeaths = getNumber(totalDeaths)

                console.log(`${date***REMOVED***: Cases:${totalCases***REMOVED***, Deaths:${totalDeaths***REMOVED***`)
                // #######################################################################################

                // TODO 1: Parse info on Recoveries by Province
                let recoveriesLines = soupBody.find('p').getText().split(":"),
                    recoveryDate = recoveriesLines[0].match(/\d+.*/)[0];

                totalRecoveries = getNumber(recoveriesLines[1]);
                console.log(`Total Recovery:${totalRecoveries***REMOVED***\n`)

                let provinceRecoveries = recoveriesLines[2].split(/\),?\.?/)
                let provinceRecoveries2 = []
                provinceRecoveries.forEach(value => {
                    provinceRecoveries2.push(value.split('(')[0].trim())
              ***REMOVED***)
                provinceRecoveries[provinceRecoveries.length - 1].length === 0 ? provinceRecoveries.pop() : provinceRecoveries // Removes trailing blank index.
                // TODO Loop over list of prov names, insert missing names in provinceRecoveries
                provincesList.forEach(value => { // Adds any missing provinces not mentioned as having any recoveries, and sets them to 0.
                    if (!(provinceRecoveries2.includes(value))){
                        provinceRecoveries.push(`${value***REMOVED*** (0`)
                  ***REMOVED***
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
                            let vars = p.text.replace(/&nbsp;/g, '  ').split(/[\s+]?-[\s+]?/)
                            p = p.findNextSibling('p');
                            provinceName = vars[1].trim() === "KwaZulu" ? "KwaZulu-Natal" : vars[1].trim();
                            caseCount = vars[0].trim();
                            deathCount = vars.length === 3 ? vars[2].trim().split(/\s+/)[0].trim()
                                : vars.length === 4 ? vars[3].split(/\s+/)[0].trim()
                                    : 0;
                            let caseInt="", deathInt = ""
                            caseCount.split(/\s/).forEach(digit => {
                                caseInt += digit
                          ***REMOVED***)
                            caseInt = parseInt(caseInt)
                            if (deathCount.length > 0) {
                                deathCount.split(/\s/).forEach(digit => {
                                    deathInt += digit
                              ***REMOVED***)
                                deathInt = parseInt(deathInt)
                          ***REMOVED***
                            else{
                                deathInt = 0
                              ***REMOVED***
                            let tempProv = new Province(provinceName, caseInt);
                            tempProv.deaths = deathInt;
                            tempProv.date = date;
                            console.log(`${provinceName***REMOVED*** - Cases: ${tempProv.cases***REMOVED***, Dead: ${tempProv.deaths***REMOVED***`)
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
                                caseCount:caseInt,
                                deathCount:deathInt
                          ***REMOVED***;
                            knex(tableName).where({provDate, provinceName***REMOVED***)
                                .then(rows => {
                                    if (rows.length === 0) {
                                        knex(tableName).insert(itemData)
                                            .then(value => {
                                                if (index === 9) {
                                                    updateDaysGood(itemData);
                                              ***REMOVED***
                                          ***REMOVED***)
                                            .catch(reason => {
                                                console.log("Error inserting Province ", reason)
                                          ***REMOVED***)
                                  ***REMOVED*** else {
                                        // console.log("Already in.")
                                        if (index === 9) {
                                            updateDaysGood(itemData);
                                      ***REMOVED***
                                  ***REMOVED***
                              ***REMOVED***)
                                .catch(reason => {
                                    console.log("Duplicate Province? ", reason)
                              ***REMOVED***)
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***

                console.log(`Recovery Counts (${recoveryDate***REMOVED***):`)
                let count = 0;
                provinceRecoveries.forEach(line => {
                    let recoverCount, provinceName;
                    [provinceName, recoverCount] = line.trim().split("(")
                    provinceName = provinceName.trim();
                    const tempProvince = new Province(provinceName)
                    tempProvince.recovories = recoverCount;
                    tempProvince.date = recoveryDate;
                    currentProvincesRecovery[provinceName] = tempProvince;

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
                                        console.log("Error inserting Province Recovered, attempting to Update")
                                        knex(tableName)
                                        .update({recovered:itemData.recovered***REMOVED***)
                                        .where('provinceName','=',itemData.provinceName)
                                            .then(value => {
                                                console.log("Province Recoveries Updated")
                                          ***REMOVED***)
                                            .catch(reason1 => {
                                                console.log("Error Updating Province Recovered", reason1)
                                          ***REMOVED***)
                                  ***REMOVED***)
                                    .finally(() => {
                                        count+=1;
                                        if (count === 9){
                                            let dateData = {
                                                totalRecoveries:totalRecoveries,
                                                maybeValid: false,
                                                parsed: true
                                          ***REMOVED***;

                                            knex('dates')
                                                .update(dateData)
                                                .where('date','=',itemData.provDate)
                                                .then(value => {
                                                    console.log(`Updated Recovery for: ${itemData.provDate***REMOVED***, while parsing for Date: ${date***REMOVED***`)
                                                    console.log("Value",value)
                                                    dateData.date = itemData.provDate;
                                                    if (value === 0){
                                                        dateData.parsed = true;
                                                        knex('dates')
                                                            .insert(dateData)
                                                            .then(value1 => {
                                                          ***REMOVED***)
                                                            .catch(reason => {
                                                                console.log("Error on Recovery Dates Insert")
                                                          ***REMOVED***)
                                                  ***REMOVED***
                                                    else{
                                                        console.log("Should we do something here?")
                                                  ***REMOVED***

                                              ***REMOVED***)
                                      ***REMOVED***
                                  ***REMOVED***)
                          ***REMOVED*** else {
                                let valid = true;
                                let day,month,year;
                                [day,month,year]= (new Date(date).toLocaleDateString().split('/',3))
                                knex(tableName).update({recovered: itemData.recovered***REMOVED***)
                                    .where({provDate: recoveryDate,provinceName:itemData.provinceName***REMOVED***)
                                    .orWhere({provDate: ([year,day,month].join("-")),provinceName:itemData.provinceName***REMOVED***)
                                    .then(value => {
                                        console.log("Recovered for single province Updated")
                                        // count+=1;
                                  ***REMOVED***)
                                    .catch(reason => {
                                        console.log("Error Updating Province Recovered", reason)
                                        valid = false;
                                  ***REMOVED***)
                                    .finally(() => {
                                        count+=1;
                                        if (count === 9){
                                            let dateData = {
                                                totalRecoveries:totalRecoveries,
                                                maybeValid: false,
                                                parsed: true
                                          ***REMOVED***;

                                            knex('dates')
                                                .update(dateData)
                                                .where('date','=',itemData.provDate)
                                                .then(value => {
                                                    console.log(`Updated Recovery for: ${itemData.provDate***REMOVED***, while parsing for Date: ${date***REMOVED***`)
                                                    console.log("Value",value)
                                                    dateData.date = itemData.provDate;
                                                    if (value === 0){
                                                        dateData.parsed = true;
                                                        knex('dates')
                                                            .insert(dateData)
                                                            .then(value1 => {
                                                                console.log("Value1",value1)
                                                          ***REMOVED***)
                                                            .catch(reason => {
                                                                console.log("Error on Recovery Dates Insert")
                                                          ***REMOVED***)
                                                  ***REMOVED***
                                              ***REMOVED***)
                                      ***REMOVED***
                                  ***REMOVED***)
                          ***REMOVED***
                      ***REMOVED***)
                        .catch(reason => {
                            console.log("Duplicate Province? ", reason)
                      ***REMOVED***)
              ***REMOVED***)
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


***REMOVED***
***REMOVED*** Perform an "Upsert" using the "INSERT ... ON CONFLICT ... " syntax in PostgreSQL 9.5
***REMOVED*** @param {string***REMOVED*** tableName - The name of the database table
***REMOVED*** @param {string***REMOVED*** conflictTarget - The column in the table which has a unique index constraint
***REMOVED*** @param {Object***REMOVED*** itemData - a hash of properties to be inserted/updated into the row
***REMOVED*** @returns {Promise***REMOVED*** - A Promise which resolves to the inserted/updated row
***REMOVED***/
function insertIgnore(tableName, itemData) {

    let insertString = knex(tableName).insert(itemData).toString();
    let conflictString = knex.raw(` ON CONFLICT DO NOTHING RETURNING***REMOVED***;`).toString();
    let query = (insertString + conflictString).replace(/\?/g, '\\?');

    return knex.raw(query)
        .then(result => result.rows);
***REMOVED***;

function insertUpdateRecovered(tableName, itemData) {

    let insertString = knex(tableName).insert(itemData).toString();
    let conflictString = knex.raw(` ON CONFLICT ON CONSTRAINT provincedays_provincename_date_unique DO UPDATE SET recovered=${itemData.recovered***REMOVED*** WHERE provDate='${itemData.date***REMOVED***' RETURNING***REMOVED***;`).toString();
    let query = (insertString + conflictString).replace(/\?/g, '\\?');
    return knex.raw(query)
        .then(result => result.rows);
***REMOVED***;

