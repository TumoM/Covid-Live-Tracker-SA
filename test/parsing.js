const HTMLParser = require('node-html-parser'),
    rp = require('request-promise'),
    Province = require("../models/provinceModel"),
    Death = require("../models/deathModel"),
    Day = require("../models/dayModel"),
    DbSetup = require("../test/db");

const url = "https://sacoronavirus.co.za/category/press-releases-and-notices/";
const linkRegex = /.*\d{4***REMOVED***\/\d{2***REMOVED***\/\d{2***REMOVED***\/update-.*covid-.*20\d{2***REMOVED***\//
const regex = RegExp('.*\d{4***REMOVED***\/\d{2***REMOVED***\/\d{2***REMOVED***\/update-.*covid-.*20\d{2***REMOVED***\/', 'g');

const knex = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'test_user',
        password : 'temp_pass',
        database : 'covid-tracker-sa'
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

rp(url)
    .then(function (html) {
        //success!
        console.log("success!!");
        //   console.log(html);
        const root = HTMLParser.parse(html);

        var entries = root.querySelectorAll(".entry-title.fusion-post-title a");
        var links = []

        entries.map((entry) => {
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
                        const rootChild = HTMLParser.parse(html);
                        // pull out the two tables 1st
                        const tables = rootChild.querySelectorAll("table");
                        const [table1, table2] = tables;

                        // Creates a new root from both tables
                        const rootTable1 = HTMLParser.parse(table1.outerHTML);

                        // Extracts the rows from each table
                        const rowsTable1 = rootTable1.querySelectorAll("tr")
                        
                        // console.log(rowsTable1);
                        console.log(DATE); // date
                        let currentProvinces = Object.assign({***REMOVED***, PROVINCES);

                        rowsTable1.forEach((row) =>{
                            row = row.text.split(" ");
                            let name = "";
                            let count = 0;
                            row.forEach((index) =>{
                                if (index.match(/^\d+$/)){ // Checks that index value is a digit
                                    count = Number(index)
                              ***REMOVED***
                                else{
                                    name += index+" " // Appends word and adds a space that was removed from split
                              ***REMOVED***
                          ***REMOVED***)
                            name = name.trim();
                            name = name.match(/(KWAZULU)(\s?)+(.*)+(\s?)+(NATAL)/)? "KWAZULU–NATAL":name;
                            let currentProvince = new Province(name,count);
                            let tempDate = DATE.split(" ");
                            var d = new Date(`${tempDate[0].split(/\D+/)[0]***REMOVED***-${tempDate[1]***REMOVED***-${tempDate[2]***REMOVED***`);
                            currentProvince.date=d;
                            // Adds the province to the list
                            currentProvinces[name] = currentProvince;


                            // console.log(name,"-",count);
                      ***REMOVED***)
                        // pull out paragraph after 1st table
                        const tags = rootChild.querySelector(".post-content").childNodes;

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
                        let testInt = "";
                        let testArray = tests[0].text.match(/\s((\d+\s+)*\d+)/)[0].trim().split(" ");
                        testArray.forEach(digit=>{
                            testInt += digit
                      ***REMOVED***)
                        testInt = parseInt(testInt);
                        const rootTable2 = HTMLParser.parse(table2.outerHTML);
                        const rowsTable2 = rootTable2.querySelectorAll("tr")
                        delete rowsTable2[0]
                        rowsTable2.forEach(row => {
                            row = row.text.split(" ");
                            row.shift();
                            let name = "";
                            let count = 0;
                            let gender = "";
                            row.forEach((index) =>{
                                if (index.match(/^\d+$/)){ // Checks that index value is a digit
                                    count = Number(index);
                              ***REMOVED***
                                else if (index !== "FEMALE" && index !== "MALE"){
                                    name += index+" "; // Appends word and adds a space that was removed from split
                              ***REMOVED***
                                else{
                                    gender = index;
                              ***REMOVED***
                          ***REMOVED***)
                            name = name.trim();
                            name = name.match(/(KWAZULU)(\s?)+(.*)+(\s?)+(NATAL)/)? "KWAZULU–NATAL":name;
                            const death = new Death(name,gender,count);
                            // console.log("Death:",death.toString());
                            currentProvinces[name].dead.push(death);
                            gender === "MALE"? currentProvinces[name].men += 1: gender === "FEMALE"? currentProvinces[name].women += 1: console.log("INVALID GENDER");
                            currentProvinces[name].totalDead = currentProvinces[name].men + currentProvinces[name].women;


                      ***REMOVED***)
                        console.log("Done Table 2");
                        // console.log(currentProvinces);
                        for (const [key, value] of Object.entries(currentProvinces)) {
                            // console.log(key);
                            // console.log("Sick",value.sick);
                            // console.log("Death Count:",value.totalDead);
                            const date = value.date;

                            // Inserts into Provinces table
                            knex("provinces")
                                .insert({provinceName:key,date,
                                sickCount:value.sick,deathCount:value.totalDead,testCount:parseInt(tests[0].text.match(/\s((\d+\s+)*\d+)/)[0].trim())***REMOVED***, ['id','provinceName']).then((id,other)=>{
                                let provinceId = id[0]['id'];
                                // Todo Inserts into sickDates table
                                knex("sickDates")
                                    .insert({provinceId,sickDate:date,
                                        sickCount:value.sick***REMOVED***,"id").then(id =>{
                                    // console.log("ID:",id);
                              ***REMOVED***)
                                knex("deathDates")
                                    .insert({provinceId,deathDate:date,
                                        deathCount:value.totalDead, deathMenCount:value.men, deathWomenCount:value.women***REMOVED***, ['id']).then(id => {
                                    let deathDateId = id[0]['id'];
                                    let parsedValues= [];
                                    value.dead.forEach(deathDetails => {
                                        parsedValues.push({deathDateId,provinceName:deathDetails.province,
                                            sex:deathDetails.sex,deathDate:date,age:deathDetails.age***REMOVED***);
                                  ***REMOVED***);
                                    if (parsedValues.length > 0) {
                                        knex.batchInsert('deathPersons', parsedValues);
                                  ***REMOVED***
                              ***REMOVED*** )
                          ***REMOVED***).catch(err=>{
                                console.log("ERROR\n",err)
                          ***REMOVED***);

                      ***REMOVED***
                        //console.log("PROVINCE LIST:\n",currentProvinces);
                        // console.log(JSON.stringify(currentProvinces,null,2));


                        console.log("TESTS:", (tests[0].text).match(/\s((\d+\s+)*\d+)/)[0].trim()); // Matches the string for for the test cases.
                        // console.log("Found Two!: ", entry.text, "\n");
                        // Todo Update provinces with test count.
                        console.log("\n");
                  ***REMOVED***)
                    .catch(function (err) {
                        //handle error
                  ***REMOVED***);
                return true;
          ***REMOVED*** else {
                return false;
          ***REMOVED***
      ***REMOVED***);
        // Pull the stats off a URL

  ***REMOVED***)
    .catch(function (err) {
        //handle error
  ***REMOVED***);
// console.log("ProvincesList:",JSON.stringify(provincesList,null,2));