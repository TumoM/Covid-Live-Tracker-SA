const HTMLParser = require('node-html-parser'),
    rp = require('request-promise'),
    Province = require("../models/provinceModel"),
    Death = require("../models/deathModel"),
    Day = require("../models/dayModel"),
    DbSetup = require("../test/db24");
const url = "https://sacoronavirus.co.za/category/press-releases-and-notices/";
const linkRegex = /.*\d{4***REMOVED***\/\d{2***REMOVED***\/\d{2***REMOVED***\/update-.*covid-.*20\d{2***REMOVED***\//
const regex = RegExp('.*\d{4***REMOVED***\/\d{2***REMOVED***\/\d{2***REMOVED***\/update-.*covid-.*20\d{2***REMOVED***\/', 'g');

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

function parseNumber(number) {
    let testInt = "";
    console.log("FUNC NUMBER:",number)
    let testArray = number.match(/\s?((\d+\s+)*\d+)/)[0].trim().split(" ");
    testArray.forEach(digit => {
        testInt += digit
  ***REMOVED***)
    testInt = parseInt(testInt);
    return testInt
***REMOVED***

rp(url)
    .then(function (html) {
        //success!
        console.log("success!!");
        //   console.log(html);
        const root = HTMLParser.parse(html);

        var entries = root.querySelectorAll(".entry-title.fusion-post-title a");
        var links = []

        entries.map((entry) => {
            let badString;
            // return entry.getAttribute("href").match(linkRegex)
            if (entry.getAttribute("href").match(linkRegex)) {
                // console.log("Found One!\n", entry.text);
                // console.log("Outer: ", entry.outerHTML);
                // console.log("Inner: ", entry.innerHTML);
                // console.log("Href: ", entry.getAttribute("href"), "\n");

                const DATE = entry.text.split("(")[1].split(")")[0];
                links.push(entry.getAttribute("href"))
                rp(entry.getAttribute("href"))
                    .then(function (html) {
                        console.log(DATE); // date
                        let totalCase = 0;
                        let totalDeath = 0;
                        let tempDate = DATE.split(" ");
                        const d = new Date(`${tempDate[0].split(/\D+/)[0]***REMOVED***-${tempDate[1]***REMOVED***-${tempDate[2]***REMOVED***`);
                        let parsedDate = d.toLocaleDateString().split("/")
                        parsedDate = `${parsedDate[2]***REMOVED***-${parsedDate[0]***REMOVED***-${parsedDate[1]***REMOVED***`
                        knex('dates')
                            .where({date: d***REMOVED***)
                            .then(rows => {
                                console.log("Row Count:", rows.length);
                                if (rows.length > 0 && rows[0].parsed && !rows[0].maybeValid) {

                              ***REMOVED***
                                else if (rows.length > 0 && rows[0].maybeValid) {
                                    // Maybe the format is all wrong. Parse another site/source?
                                    // Make soup.
                                    const paragraphs = HTMLParser.parse(html)
                                    //console.log(html.match(/total number of.*tests.*\s\d+[\.|\n]/i)[0])
                                    // paragraphs.querySelectorAll("p")[2].text.match(/total number of.*tests.*\s\d+[\.|\n]/i)
                                    let testPar = paragraphs.querySelectorAll("p").find((currentVal,index,arr)=>{
                                        let paragraph = currentVal.text.match(/total number of.*tests.*\s\d+[\.|\n]/i)
                                        if (!paragraph){
                                            return false;
                                      ***REMOVED***
                                        else{
                                            return true
                                      ***REMOVED***
                                  ***REMOVED***)
                                    console.log("TestPar",testPar.text);
                                    let totalTests = testPar.text.match(/\s((\d+\s+)*\d+)/);
                                    if (totalTests){
                                        totalTests = parseNumber(totalTests[0].trim());
                                  ***REMOVED***
                                    console.log("Value:",totalTests);
                                    knex('dates').select('totalTests')
                                        .whereNull('totalTests')
                                        .andWhere({date:parsedDate***REMOVED***)
                                        .then(rows=>{
                                            knex('dates').update({totalTests,maybeValid:false***REMOVED***).where({date:parsedDate***REMOVED***)
                                                .then(value => {
                                                    console.log("Updated TTs:",value)
                                              ***REMOVED***)
                                                .catch(reason => {
                                                    console.log("Unknown 2:",reason);
                                              ***REMOVED***)
                                      ***REMOVED***)
                                        .catch(reason => {
                                            console.log("Error putting in Total Tests?",reason)
                                      ***REMOVED***)
                                    // Pull off data for update (Total tests)
                              ***REMOVED***
                                else if ((rows.length === 0) || (rows.length > 0 && !rows[0].error)) {
                                    const rootChild = HTMLParser.parse(html);
                                    // pull out the two tables 1st
                                    const tables = rootChild.querySelectorAll("table");
                                    const [table1, table2] = tables;
                                    try {
                                        if (tables.length === 0) {
                                            throw "No Tables\n"
                                      ***REMOVED***
                                        const rootTable1 = HTMLParser.parse(table1.outerHTML);
                                        // Extracts the rows from each table
                                        const rowsTable1 = rootTable1.querySelectorAll("tr")

                                        // console.log(rowsTable1);
                                        let currentProvinces = Object.assign({***REMOVED***, PROVINCES);

                                        rowsTable1.forEach((row) => {
                                            row = row.text.split(" ");
                                            let name = "";
                                            let count = 0;
                                            row.forEach((index) => {
                                                if (index.match(/^\d+$/)) { // Checks that index value is a digit
                                                    count = Number(index)
                                              ***REMOVED*** else {
                                                    name += index + " " // Appends word and adds a space that was removed from split
                                              ***REMOVED***
                                          ***REMOVED***)
                                            name = name.trim();
                                            name = name.match(/(KWAZULU)(\s?)+(.*)+(\s?)+(NATAL)/) ? "KWAZULU–NATAL" : name;
                                            let currentProvince = new Province(name, count);

                                            currentProvince.date = d;
                                            // Adds the province to the list
                                            currentProvinces[name] = currentProvince;


                                            // console.log(name,"-",count);
                                      ***REMOVED***)
                                        let tags = null;
                                        try { // pull out paragraph after 1st table
                                            tags = rootChild.querySelector(".post-content").childNodes;
                                            let tableFound = false; // A able has been found in the html.
                                            let parFound = false; // a valid value has been returned.
                                            let tests = tags.filter(tag => { // Filters out the paragraph tag after the 1st table.
                                                if (!tableFound) {
                                                    if (tag.tagName === "table") {
                                                        tableFound = true;
                                                  ***REMOVED***
                                              ***REMOVED*** else if (!parFound) {
                                                    if (tag.text === "\n") { // Ignores newlines that may crop up.
                                                        return false;
                                                  ***REMOVED***
                                                    parFound = true;
                                                    return tag;
                                              ***REMOVED***
                                          ***REMOVED***);
                                            parseNumber(tests[0].text);
                                            const rootTable2 = HTMLParser.parse(table2.outerHTML);
                                            const rowsTable2 = rootTable2.querySelectorAll("tr")
                                            delete rowsTable2[0]
                                            rowsTable2.forEach(row => {
                                                row = row.text.split(" ");
                                                row.shift();
                                                let name = "";
                                                let count = 0;
                                                let gender = "";
                                                row.forEach((index) => {
                                                    if (index.match(/^\d+$/)) { // Checks that index value is a digit
                                                        count = Number(index);
                                                  ***REMOVED*** else if (index !== "FEMALE" && index !== "MALE") {
                                                        name += index + " "; // Appends word and adds a space that was removed from split
                                                  ***REMOVED*** else {
                                                        gender = index;
                                                  ***REMOVED***
                                              ***REMOVED***)
                                                name = name.trim();
                                                name = name.match(/(KWAZULU)(\s?)+(.*)+(\s?)+(NATAL)/) ? "KWAZULU–NATAL" : name;
                                                const death = new Death(name, gender, count);
                                                // console.log("Death:",death.toString());
                                                currentProvinces[name].dead.push(death);
                                                gender === "MALE" ? currentProvinces[name].men += 1 : gender === "FEMALE" ? currentProvinces[name].women += 1 : console.log("INVALID GENDER");
                                                currentProvinces[name].totalDead = currentProvinces[name].men + currentProvinces[name].women;


                                          ***REMOVED***)
                                            console.log("Done Table 2");
                                            // console.log(currentProvinces);
                                            for (const [key, value] of Object.entries(currentProvinces)) {
                                                // console.log(key);
                                                // console.log("Sick",value.sick);
                                                // console.log("Death Count:",value.totalDead);
                                                const date = value.date;

                                                let testNum = 0;
                                                badString = "";
                                                tests[0].text
                                                    .match(/\s((\d+\s+)*\d+)/)[0]
                                                    .trim()
                                                    .split(" ")
                                                    .forEach(word => {
                                                        badString += word
                                                  ***REMOVED***)
                                                totalCase += value.sick;
                                                totalDeath += value.totalDead;
                                                // Inserts into Provinces table
                                                knex("provinceDays")
                                                    .insert({
                                                            provinceName: key, provDate:date,
                                                            caseCount: value.sick, deathCount: value.totalDead,

                                            ***REMOVED*****REMOVED*****REMOVED***
                                                        'id')
                                                    .then((id) => {
                                                        let provinceId = id[0];
                                                        // Todo Inserts into caseDates table
                                                        knex("caseDates")
                                                            .insert({
                                                                provinceId, caseDate: date,
                                                                caseCount: value.sick
                                                ***REMOVED*****REMOVED*****REMOVED*** "id")
                                                            .then(id => {
                                                                // console.log("ID:",id);
                                                          ***REMOVED***).catch(err => {
                                                            console.log("Error with caseDates\n", err);
                                                      ***REMOVED***)
                                                        knex("deathDates")
                                                            .insert({
                                                                provinceId,
                                                                deathDate: date,
                                                                deathCount: value.totalDead,
                                                                deathMenCount: value.men,
                                                                deathWomenCount: value.women
                                                ***REMOVED*****REMOVED*****REMOVED*** ['id']).then(id => {
                                                            let deathDateId = id[0];
                                                            let parsedValues = [];
                                                            value.dead.forEach(deathDetails => {
                                                                parsedValues.push({
                                                                    deathDateId,
                                                                    provinceName: deathDetails.province,
                                                                    sex: deathDetails.sex,
                                                                    deathDate: date,
                                                                    age: deathDetails.age
                                                              ***REMOVED***);
                                                          ***REMOVED***);
                                                            if (parsedValues.length > 0) {
                                                                knex.batchInsert('deathPersons', parsedValues).catch(err => {

                                                              ***REMOVED***)
                                                          ***REMOVED***
                                                      ***REMOVED***).catch(err => {
                                                            console.log("Error with deathDates:\n", err)
                                                      ***REMOVED***)
                                                  ***REMOVED***)
                                                    .catch(err => {
                                                    // console.log("Passing: Province Day already inserted")
                                              ***REMOVED***);

                                          ***REMOVED***


                                            console.log("TESTS:", (tests[0].text).match(/\s((\d+\s+)*\d+)/)[0].trim()); // Matches the string for for the test cases.
                                            // console.log("SEARCH DATE: ",`${tempDate[0].split(/\D+/)[0]***REMOVED***-${tempDate[1]***REMOVED***-${tempDate[2]***REMOVED***`)
                                            parsedDate = d.toLocaleDateString().split("/")
                                            parsedDate = `${parsedDate[2]***REMOVED***-${parsedDate[0]***REMOVED***-${parsedDate[1]***REMOVED***`
                                            console.log("Parsed Date:",parsedDate)
                                            knex('dates')
                                                .select()
                                                .where('date','=',`${parsedDate[2]***REMOVED***-${parsedDate[0]***REMOVED***-${parsedDate[1]***REMOVED***`)
                                                .then(value => {
                                                    if (value.length === 0){
                                                        knex("dates ")
                                                        .insert({
                                                            date: parsedDate,
                                                            parsed: true,
                                                            totalTests: parseInt(badString),
                                                            totalCases: totalCase,
                                                            totalDeaths: totalDeath,
                                                            maybeValid: true
                                                      ***REMOVED***)
                                                        .then(id => {
                                                                console.log("Inserted Dates:",parsedDate)
                                                          ***REMOVED***)
                                                        .catch(err => {
                                                                console.log("Day Error 1",err)
                                                          ***REMOVED***)
                                                        console.log("\n");
                                                  ***REMOVED***
                                              ***REMOVED***).catch(reason => {
                                                console.log("Unknown error:",reason)
                                          ***REMOVED***)
                                      ***REMOVED*** catch (e) {
                                            console.log("ANOOOOTHER ERRROR?:",e)
                                            knex("dates ").insert({date: d, parsed: false***REMOVED***)
                                                .then(id => {
                                                    //console.log(id)
                                              ***REMOVED***)
                                                .catch(err => {
                                                    console.log("Day Error 2")
                                              ***REMOVED***)
                                            throw 'No posts?\n'
                                      ***REMOVED***
                                  ***REMOVED*** catch (e) {
                                        console.log("SOME ERROR:",e)
                                        // No table found error
                                        knex("dates ").insert({
                                            date: d,
                                            parsed: false,
                                            maybeValid: false,
                                            error: true
                                      ***REMOVED***)
                                            .then(id => {
                                                //console.log(id)
                                          ***REMOVED***)
                                            .catch(err => {
                                                console.log("Ignoring duplicates 1",err)
                                          ***REMOVED***)
                                  ***REMOVED***
                              ***REMOVED***

                          ***REMOVED***).catch((e) => {
                            console.log(e)
                      ***REMOVED***)


                  ***REMOVED***).catch(err => {
                    console.log('Some error:', err)
              ***REMOVED***);
          ***REMOVED***
      ***REMOVED***)
        // Pull the stats off a URL
  ***REMOVED***)
    .catch(function (err) {
        console.log(err)
  ***REMOVED***);
const upsert = (params) => {
    const {table, object***REMOVED*** = params;
    const insert = knex(table).insert(object);
    const update = knex.queryBuilder().update(object);
    return knex.raw(`? ON CONFLICT ignore returning***REMOVED***`, [insert]).get('rows').get(0);
***REMOVED***;
// console.log("ProvincesList:",JSON.stringify(provincesList,null,2));