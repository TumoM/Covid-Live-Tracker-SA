async function main() {
    const dotenv = require('dotenv');
    dotenv.config();
    var cloudscraper = require('cloudscraper');
    const {Builder, By, Key, until, Driver} = require('selenium-webdriver');
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
    const linkRegex = /.*\d{4}\/\d{2}\/\d{2}\/update-.*covid[-|_](?:19)?.*\d{2}/i
    const regex = RegExp('.*\d{4}\/\d{2}\/\d{2}\/update-.*covid-.*20\d{2}\/', 'g');


    let connection;
    console.log("Host: ", process.env.AWS_HOST)
    if (process.env.DBMODE && process.env.DBMODE === "herokuDB") {
        connection = process.env.DATABASE_URL
    } else {
        connection = {
            host: process.env.AWS_HOST || process.env.PG_HOST || '127.0.0.1',
            user: process.env.AWS_USER || process.env.PG_USER || 'test_user',
            password: process.env.AWS_PASSWORD || process.env.PG_PASS || 'temp_pass',
            database: process.env.AWS_DB || process.env.DB_NAME || 'covid-tracker-sa2'
        };
    }

    console.log("Connection:", connection)
    const knex = require('knex')({
            client: 'pg',
            acquireConnectionTimeout: 10000,
            pool: {
                "min": 2,
                "max": 50,
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
        console.log("FUNC NUMBER:", number)
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
    var links = [];
    let links2 = []
    let htmls = [];

    console.log('Filtering url')
    await entries.forEach(entry => {
        if (entry.getAttribute("href").match(linkRegex)) {
            links2.push(entry.getAttribute("href").match(linkRegex)[0])
    }})

    console.log('Links 2\n ',links2);
    let getHtml = async (links)=>{
        htmls = [];
        console.log('Building (Headless) Driver')
        let driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        console.log('Starting Driver loop')
        for (let i = 0;i<links.length;i++){
            let loop = true;
            while (loop) {
                await driver.get(links[i])
                await driver.wait(until.elementLocated(By.css('.post-content')), 10 * 1000)
                const element = await driver.findElement(By.css('article'))
                const html = await element.getAttribute('innerHTML');
                htmls.push(html)
               /* console.log('R2', html.match(/\d{2}(?:\w{2})?\s\w{3,9}\s20(\d{2})?/i)[0])*/
                if (html){
                    loop = false;
                }
            }
        }
        console.log('Quitting Driver.')
        await driver.quit();
        console.log('Returning Promise.')
        return Promise.resolve(htmls);
    }
    htmls = await getHtml(links2)

    console.log("HTMLS DATE 0",htmls[0].match(/\d{2}(\w{2})?\s\w{3,9}\s20(\d{2})?/i)[0])
    console.log("HTMLS DATE 1",htmls[1].match(/\d{2}(\w{2})?\s\w{3,9}\s20(\d{2})?/i)[0])
    console.log("HTMLS DATE 2",htmls[2].match(/\d{2}(\w{2})?\s\w{3,9}\s20(\d{2})?/i)[0])

    console.log('Swag')
    for (let i = 0; i < links2.length; i++) {
        let loop = true;
        while (loop){
            {
                let DATE = htmls[i].match(/\d{2}(\w{2})?\s\w{3,9}\s20(\d{2})?/i)[0]
                console.log(DATE); // date
                let totalCase = 0;
                let totalDeath = 0;
                let tempDate = DATE.split(" ");
                const d = new Date(`${tempDate[0].split(/\D+/)[0]}-${tempDate[1]}-${tempDate[2]}`);
                let parsedDate = d.toLocaleDateString().split("/")
                parsedDate = `${parsedDate[2]}-${parsedDate[0]}-${parsedDate[1]}`
                let rows = await knex('dates')
                    .where({date: d})
                        let totalTests = 0;
                        console.log("Row Count:", rows.length);
                        if (rows.length > 0 && rows[0].parsed && !rows[0].maybeValid) {
                            console.log("Skipping:", d, "\n")
                            loop = false;

                        } else if (rows.length > 0 && rows[0].maybeValid) {
                            console.log("Date maybe valid:", d, "\n")

                            // Maybe the format is all wrong. Parse another site/source?
                            // Make soup.
                            const paragraphs = HTMLParser.parse(htmls[i])
                            let testPar = paragraphs.text.match(/Tests.*?conducted.*?\d[\s?\d]+/i || /total.*((\d\s?)|(tests))/i)[0];
                            if (testPar) {
                                totalTests = testPar.match(/\s((\d+\s+)*\d+)/);
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
                            if (rows.length > 0) {
                                let value = await knex('dates').update({
                                    totalTests,
                                    maybeValid: false
                                }).where({date: parsedDate})
                                    .returning('date')
                                if (value.length > 0) {
                                    console.log("Updated TTs1:", value)
                                    loop = false;
                                    return true
                                } else {
                                    console.log("TotalTests not updated?");
                                    loop = false;
                                    return false
                                }
                            }
                            // Pull off data for update (Total tests)
                        } else if ((rows.length === 0) || (rows.length > 0 && !rows[0].parsed)) {
                            console.log("Parsing 1 time:", d.toLocaleDateString(), "\n")
                            const rootChild = HTMLParser.parse(htmls[i]);
                            // pull out the two tables 1st
                            const tables1 = rootChild.querySelector("table");
                            // const [table1] = tables;
                            try {
                               /* if (tables1){
                                    const rootTable1 = HTMLParser.parse(tables1.toString());
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
                                }*/ // Should we pass the tables here? Only gives cases per province.

                                let date = rootChild.text.match(/\d{2}(\w{2})?\s\w{3,9}\s20(\d{2})?/i)[0]
                                let cases = rootChild.text.match(/total.*confirmed.*(?:covid-19)? cases.*?\s[\s??\d+]+/i)[0];
                                let tests = rootChild.text.match(/Tests.*?conducted.*?\d[\s?\d]+/i || /total.*((\d\s?)|(tests))/i)[0];
                                let deaths = rootChild.text.match(/death[s]?[^\.].*?\d[\s?\d\s]*.*?\./)
                                let totalDeaths = null;
                                if (!deaths){
                                    deaths = null
                                }
                                else{
                                    deaths = deaths[0]
                                    let totalDeaths = deaths.trim().match(/\s((\d+\s+)*\d+)/);
                                    if (totalDeaths) {
                                        totalDeaths = parseNumber(totalDeaths[0].trim());
                                    }
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


                                console.log("Total Tests:", totalTests);
                                console.log("Total Cases:", totalCases);
                                console.log("Total Deaths:", totalDeaths);

                                let data = {
                                    date: parsedDate,
                                    parsed: true,
                                    totalTests,
                                    totalCases,
                                    totalDeaths,
                                    maybeValid: false
                                }
                                console.log(data)
                                let rows = await knex('dates').select('totalTests')
                                    .whereNull('totalTests')
                                    .andWhere({date: parsedDate})
                                        console.log(rows.length)
                                        let value = await knex('dates').update({
                                            totalTests,
                                            maybeValid: false
                                        }).where({date: parsedDate})
                                                console.log("Updated TTs2:", value)
                                            if (value === 0) {
                                                await knex('dates').insert(data)
                                                    console.log("Inserted my man")
                                                    let prevVals = await knex.raw('WITH preTable AS (\n' +
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
                                                        '       prevDeaths as "prevDeaths",\n' +
                                                        '       prevRecoveries as "prevRecoveries",\n' +
                                                        '    ("totalCases"-prevCases) as "dailyNew",\n' +
                                                        '    ("totalDeaths"-prevDeaths) as "dailyDeaths"\n' +
                                                        'from preTable\n' +
                                                        'order by date desc\n' +
                                                        'limit 1;')

                                                    data.totalDeaths = !data.totalDeaths ? prevVals.rows[0].prevDeaths : data.totalDeaths;
                                                    prevVals.rows[0].dailyDeaths = !prevVals.rows[0].dailyDeaths ? 0 : prevVals.rows[0].dailyDeaths;
                                                    prevVals.rows[0].dailyNew = !prevVals.rows[0].dailyNew ? 0 : prevVals.rows[0].dailyNew;
                                                    data = {
                                                        totalDeaths: data.totalDeaths,
                                                        dailyNew: prevVals.rows[0].dailyNew,
                                                        dailyDeaths: prevVals.rows[0].dailyDeaths,
                                                        totalRecoveries: prevVals.rows[0].prevRecoveries,
                                                        ...data
                                                    }
                                                    await knex('dates').update(data).where('date', '=', parsedDate)
                                                    loop=false;
                                                }


                                } catch (e) {
                                console.log("SOME ERROR:", e)
                                loop = false;
                                // No table found error
                                knex("dates ").insert({
                                    date: parsedDate,
                                    parsed: false,
                                    maybeValid: false,
                                    error: true
                                })
                                    .then(id => {
                                        //console.log(id)
                                    })
                                    .catch(err => {
                                        console.log("Ignoring duplicates 1", err)
                                    })
                            }
                            }
                        }
                    }
            }
    console.log("We done?")
    return Promise.resolve(true)

}


main().then((res)=>{
    console.log('Res',res)
        process.exit(0)
    }
)

// console.log("ProvincesList:",JSON.stringify(provincesList,null,2));
