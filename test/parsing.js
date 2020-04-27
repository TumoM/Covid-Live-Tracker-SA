async function main() {
const dotenv = require('dotenv');
dotenv.config();
var cloudscraper = require('cloudscraper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
const HTMLParser = require('node-html-parser'),
    rp = require('request-promise'),
    Province = require("../models/provinceModel"),
    Death = require("../models/deathModel"),
    Day = require("../models/dayModel");
    // DbSetup = require("../test/db24");
const url = "https://sacoronavirus.co.za/category/press-releases-and-notices/";
// const url = "http://sacoronavirus.co.za/?s=update";
// const url = "https://www.nicd.ac.za/media/alerts/";
// const url = "https://sacoronavirus.co.za/page/2/?s=update";
// const linkRegex = /.*\d{4}\/\d{2}\/\d{2}\/update-.*covid-.*20\d{2}\//
const linkRegex = /.*\d{4}\/\d{2}\/\d{2}\/update-.*covid-.*20\d{2}/
const regex = RegExp('.*\d{4}\/\d{2}\/\d{2}\/update-.*covid-.*20\d{2}\/', 'g');



    let connection;
console.log("Host: ",process.env.AWS_HOST)
    if (process.env.DBMODE && process.env.DBMODE === "herokuDB"){
        connection = process.env.DATABASE_URL
    }
    else{
        connection = {
            host:process.env.AWS_HOST|| process.env.PG_HOST||'127.0.0.1',
            user:process.env.AWS_USER|| process.env.PG_USER||'test_user',
            password:process.env.AWS_PASSWORD || process.env.PG_PASS ||'temp_pass',
            database:process.env.AWS_DB ||process.env.DB_NAME ||'covid-tracker-sa2'
        };
    }

    console.log("Connection:",connection)
    const knex = require('knex')({
            client: 'pg',
            acquireConnectionTimeout: 10000,
            pool: {
                "min": 2,
                "max":50,
                idleTimeoutMillis: 10000,
                createTimeoutMillis: 10000,
                acquireTimeoutMillis: 10000,
            },
            connection
        }
    )

    const PROVINCES = { // Name, [cases, deadArr]
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
    }
    let provincesList = []

let options = new chrome.Options();
//Below arguments are critical for Heroku deployment
options.addArguments("--headless");
options.addArguments("--disable-gpu");
options.addArguments("--no-sandbox");

function parseNumber(number) {
    let testInt = "";
    console.log("FUNC NUMBER:",number)
    let testArray = number.match(/\s?((\d+\s+)*\d+)/)[0].trim().split(" ");
    testArray.forEach(digit => {
        testInt += digit
    })
    testInt = parseInt(testInt);
    return testInt
}


    let ps = [];
    let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

        // Navigate to Url
        await driver.get(url);
        await driver.wait(until.elementsLocated(By.css('.entry-title.fusion-post-title a')));
        let html = await driver.getPageSource();
        console.log("success!! Page bag secured.");
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
                            totalCase = 0;
                            totalDeath = 0;
                            let tempDate = DATE.split(" ");
                            const d = new Date(`${tempDate[0].split(/\D+/)[0]}-${tempDate[1]}-${tempDate[2]}`);
                            let parsedDate = d.toLocaleDateString().split("/")
                            parsedDate = `${parsedDate[2]}-${parsedDate[0]}-${parsedDate[1]}`
                            knex('dates')
                                .where({date: d})
                                .then(rows => {
                                    let totalTests = 0;
                                    console.log("Row Count:", rows.length);
                                    if (rows.length > 0 && rows[0].parsed && !rows[0].maybeValid) {
                                        console.log("Skipping:",d,"\n")
                                    }
                                    else if (rows.length > 0 && rows[0].maybeValid) {
                                        console.log("Date maybe valid:",d,"\n")

                                        // Maybe the format is all wrong. Parse another site/source?
                                        // Make soup.
                                        const paragraphs = HTMLParser.parse(html)
                                        let testPar = paragraphs.text.match(/Tests.*?conducted.*?\d[\s?\d]+/i || /total.*((\d\s?)|(tests))/i);
                                        if (testPar) {
                                            totalTests = testPar.text.match(/\s((\d+\s+)*\d+)/);
                                        } else {
                                            testPar = paragraphs.text.match(/total number of.*tests.*\s\d+[\.|\n]/i)
                                            totalTests = testPar[0].match(/\s((\d+\s+)*\d+)/);
                                        }
                                        if (totalTests) {
                                            totalTests = parseNumber(totalTests[0].trim());
                                        }
                                        console.log("Value:", totalTests);
                                        rows = await knex('dates').select('totalTests')
                                            .whereNull('totalTests')
                                            .andWhere({date: parsedDate})
                                        if (rows.length > 0){
                                            let value = await knex('dates').update({
                                                totalTests,
                                                maybeValid: false
                                            }).where({date: parsedDate})
                                            if (value.length > 0) {
                                                console.log("Updated TTs1:", value)
                                                return true
                                            }
                                            else{
                                                console.log("Unknown 2:", reason);
                                                return false
                                            }
                                        }
                                        // Pull off data for update (Total tests)
                                    } else if ((rows.length === 0) || (rows.length > 0 && !rows[0].parsed)) {
                                        console.log("Parsing 1 time:", d, "\n")
                                        const rootChild = HTMLParser.parse(html);
                                        // pull out the two tables 1st
                                        const tables = rootChild.querySelectorAll("table");
                                        const [table1, table2] = tables;
                                        try {
                                            if (tables.length === 0) {
                                                throw "No Tables\n"
                                            }
                                            const rootTable1 = HTMLParser.parse(table1.outerHTML);
                                            // Extracts the rows from each table
                                            const rowsTable1 = rootTable1.querySelectorAll("tr")

                                            // console.log(rowsTable1);
                                            let currentProvinces = Object.assign({}, PROVINCES);

                                            rowsTable1.forEach((row) => {
                                                row = row.text.split(" ");
                                                let name = "";
                                                let count = 0;
                                                row.forEach((index) => {
                                                    if (index.match(/^\d+$/)) { // Checks that index value is a digit
                                                        count = Number(index)
                                                    } else {
                                                        name += index + " " // Appends word and adds a space that was removed from split
                                                    }
                                                })
                                                name = name.trim();
                                                name = name.match(/(KWAZULU)(\s?)+(.*)+(\s?)+(NATAL)/) ? "KWAZULU–NATAL" : name;
                                                let currentProvince = new Province(name, count);

                                                currentProvince.date = d;
                                                // Adds the province to the list
                                                currentProvinces[name] = currentProvince;


                                                // console.log(name,"-",count);
                                            })
                                            let tags = null;
                                            try { // pull out paragraph after 1st table
                                                tags = rootChild.querySelector(".post-content").childNodes;
                                                let tableFound = false; // A able has been found in the html.
                                                let parFound = false; // a valid value has been returned.
                                                let tests = tags.filter(tag => { // Filters out the paragraph tag after the 1st table.
                                                    if (!tableFound) {
                                                        if (tag.tagName === "table") {
                                                            tableFound = true;
                                                        }
                                                    } else if (!parFound) {
                                                        if (tag.text === "\n") { // Ignores newlines that may crop up.
                                                            return false;
                                                        }
                                                        parFound = true;
                                                        return tag;
                                                    }
                                                });
                                                parseNumber(tests[0].text);

                                            console.log("TestPar", tests);
                                            let totalTests = tests.match(/\s((\d+\s+)*\d+)/)[0];
                                            if (totalTests) {
                                                totalTests = parseNumber(totalTests.trim());
                                            } else {
                                                totalTests = null;
                                            }
                                            let totalCases = cases.trim().match(/\s((\d+\s+)*\d+)/);
                                            if (totalCases) {
                                                totalCases = parseNumber(totalCases[0].trim());
                                            }
                                                // console.log(currentProvinces);



                                                console.log("TESTS:", (tests[0].text).match(/\s((\d+\s+)*\d+)/)[0].trim()); // Matches the string for for the test cases.
                                                // console.log("SEARCH DATE: ",`${tempDate[0].split(/\D+/)[0]}-${tempDate[1]}-${tempDate[2]}`)
                                                parsedDate = d.toLocaleDateString().split("/")
                                                parsedDate = `${parsedDate[2]}-${parsedDate[0]}-${parsedDate[1]}`
                                                console.log("Parsed Date:",parsedDate)
                                                knex('dates')
                                                    .select()
                                                    .where('date','=',`${parsedDate[2]}-${parsedDate[0]}-${parsedDate[1]}`)
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
                                                                })
                                                                .then(id => {
                                                                    console.log("Inserted Dates:",parsedDate)
                                                                })
                                                                .catch(err => {
                                                                    console.log("Day Error 1",err)
                                                                })
                                                            console.log("\n");
                                                        }
                                                    }).catch(reason => {
                                                    console.log("Unknown error:",reason)
                                                })
                                            } catch (e) {
                                                console.log("ANOOOOTHER ERRROR?:",e)
                                                const paragraphs = HTMLParser.parse(html)
                                                //console.log(html.match(/total number of.*tests.*\s\d+[\.|\n]/i)[0])
                                                // paragraphs.querySelectorAll("p")[2].text.match(/total number of.*tests.*\s\d+[\.|\n]/i)
                                                let testPar = paragraphs.querySelectorAll("p")

                                            let date = rootChild.text.match(/\d{2}\s\w{,9}\s20\d{2}/)
                                            let cases = rootChild.text.match(/total.*confirmed.*(?:covid-19)? cases.*?\s[\s??\d+]+/i)[0];
                                            let tests =  rootChild.text.match(/Tests.*?conducted.*?\d[\s?\d]+/i || /total.*((\d\s?)|(tests))/i)[0];
                                            let death = paragraphs.text.match(/death[s]?[^\.].*?\d[\s?\d]*/)
                                            if (death) {
                                                death = death[0];
                                            } else {
                                                death = null
                                            }

                                            console.log("TestPar", tests);
                                            let totalTests = tests.match(/\s((\d+\s+)*\d+)/)[0];
                                            if (totalTests) {
                                                totalTests = parseNumber(totalTests.trim());
                                            } else {
                                                totalTests = null;
                                            }
                                            let totalCases = cases.trim().match(/\s((\d+\s+)*\d+)/);
                                            if (totalCases) {
                                                totalCases = parseNumber(totalCases[0].trim());
                                            }

                                                console.log("Total Tests:",totalTests);
                                                console.log("Total Cases:",totalCases);
                                                let data = {
                                                    date: parsedDate,
                                                    parsed: true,
                                                    totalTests,
                                                    totalCases,
                                                    maybeValid: true
                                                }
                                                let totalDeaths = death? death.trim().match(/\s((\d+\s+)*\d+)/):null;
                                                if (totalDeaths){
                                                    totalDeaths = parseNumber(totalDeaths[0].trim());
                                                }
                                                console.log("Total Deaths:",totalDeaths);
                                                data.totalDeaths = totalDeaths

                                                console.log(data)
                                                knex('dates').select('totalTests')
                                                    .whereNull('totalTests')
                                                    .andWhere({date:parsedDate})
                                                    .then(rows=>{
                                                        console.log(rows.length)
                                                        knex('dates').update({totalTests,maybeValid:false}).where({date:parsedDate})
                                                            .then(value => {
                                                                console.log("Updated TTs2:",value)
                                                                if (value === 0){
                                                                    knex('dates').insert(data).then(value1 => {
                                                                        console.log("Inserted my man")
                                                                        knex.raw('WITH preTable AS (\n' +
                                                                            '   SELECT\n' +
                                                                            '      date,\n' +
                                                                            '      "totalCases",\n' +
                                                                            '      "totalDeaths",\n' +
                                                                            '        "totalRecoveries",\n' +
                                                                            '      LAG("totalCases",1)\n' +
                                                                            '          OVER (\n' +
                                                                            '            ORDER BY date\n' +
                                                                            '            ) prevCases,\n' +
                                                                            '      LAG("totalDeaths",1)\n' +
                                                                            '          OVER (\n' +
                                                                            '            ORDER BY date\n' +
                                                                            '            ) prevDeaths,\n' +
                                                                            '          LAG("totalRecoveries",1)\n' +
                                                                            '            OVER(\n' +
                                                                            '                ORDER BY date\n' +
                                                                            '                ) prevRecoveries\n' +
                                                                            '   FROM dates\n' +
                                                                            '   ORDER BY date\n' +
                                                                            ')\n' +
                                                                            'select\n' +
                                                                            '       date,\n' +
                                                                            '       prevDeaths as "prevDeaths",\n'+
                                                                            '       prevRecoveries as "prevRecoveries",\n' +
                                                                            '    ("totalCases"-prevCases) as "dailyNew",\n' +
                                                                            '    ("totalDeaths"-prevDeaths) as "dailyDeaths"\n' +
                                                                            'from preTable\n' +
                                                                            'order by date desc\n' +
                                                                            'limit 1;')
                                                                            .then(prevVals=>{
                                                                                data.totalDeaths = !data.totalDeaths?prevVals.rows[0].prevDeaths:data.totalDeaths;
                                                                                prevVals.rows[0].dailyDeaths = !prevVals.rows[0].dailyDeaths?0:prevVals.rows[0].dailyDeaths;
                                                                                prevVals.rows[0].dailyNew = !prevVals.rows[0].dailyNew?0:prevVals.rows[0].dailyNew;
                                                                                data = {
                                                                                    totalDeaths:data.totalDeaths,
                                                                                    dailyNew:prevVals.rows[0].dailyNew,
                                                                                    dailyDeaths:prevVals.rows[0].dailyDeaths,
                                                                                    totalRecoveries:prevVals.rows[0].prevRecoveries
                                                                                }
                                                                                knex('dates').update(data).where('date','=',parsedDate)
                                                                                    .catch(reason => {
                                                                                        log('WHAAAAAT?',reason)
                                                                                    })
                                                                            })
                                                                    }).catch(reason => {
                                                                        console.log("Some errrr:",reason)
                                                                    })
                                                                }
                                                            })
                                                            .catch(reason => {
                                                                console.log("Unknown 2:",reason);
                                                            })
                                                    })
                                                    .catch(reason => {
                                                        console.log("Error putting in Total Tests?",reason)
                                                    })

                                            }
                                        } catch (e) {
                                            console.log("SOME ERROR:",e)
                                            // No table found error
                                            knex("dates ").insert({
                                                date: d,
                                                parsed: false,
                                                maybeValid: false,
                                                error: true
                                            })
                                                .then(id => {
                                                    //console.log(id)
                                                })
                                                .catch(err => {
                                                    console.log("Ignoring duplicates 1",err)
                                                })
                                        }
                                    }

                                }).catch((e) => {
                                console.log(e)
                            })


                        }).catch(err => {
                        console.log('Some error:', err)
                    });
                }
            // Pull the stats off a URL
        })
        .catch(function (err) {
            console.log("WOOOOW",err)
        });
    const upsert = (params) => {
        const {table, object} = params;
        const insert = knex(table).insert(object);
        const update = knex.queryBuilder().update(object);
        return knex.raw(`? ON CONFLICT ignore returning *`, [insert]).get('rows').get(0);
    };
// console.log("ProvincesList:",JSON.stringify(provincesList,null,2));
