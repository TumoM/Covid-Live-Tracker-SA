const dotenv = require('dotenv');
const each = require('async-each');
const async = require('async');

dotenv.config();
const cloudscraper = require('cloudscraper');
const { Builder, By, Key, until, Driver ***REMOVED*** = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const HTMLParser = require('node-html-parser');
const Province = require('../models/provinceModel');
// DbSetup = require("../helpers/db24");
const url = 'https://sacoronavirus.co.za/category/press-releases-and-notices/';
// const url = "http://sacoronavirus.co.za/?s=update";
// const url = "https://www.nicd.ac.za/media/alerts/";
// const url = "https://sacoronavirus.co.za/page/2/?s=update";
// const linkRegex = /.*\d{4***REMOVED***\/\d{2***REMOVED***\/\d{2***REMOVED***\/update-.*covid-.*20\d{2***REMOVED***\//
const linkRegex = /.*\d{4***REMOVED***\/\d{2***REMOVED***\/\d{2***REMOVED***\/update-.*covid[-|_](?:19)?.*\d{2***REMOVED***/i;
const regex = RegExp('.*\d{4***REMOVED***\/\d{2***REMOVED***\/\d{2***REMOVED***\/update-.*covid-.*20\d{2***REMOVED***\/', 'g');


let connection;
console.log('Host: ', process.env.AWS_HOST);
if (process.env.DBMODE && process.env.DBMODE === 'herokuDB') {
    connection = process.env.DATABASE_URL;
***REMOVED*** else {
    connection = {
        host: process.env.AWS_HOST || process.env.PG_HOST || '127.0.0.1',
        user: process.env.AWS_USER || process.env.PG_USER || 'test_user',
        password: process.env.AWS_PASSWORD || process.env.PG_PASS || 'temp_pass',
        database: process.env.AWS_DB || process.env.DB_NAME || 'covid-tracker-sa2'
  ***REMOVED***;
***REMOVED***

console.log('Connection:', connection);
const knex = require('knex')({
      client: 'pg',
      acquireConnectionTimeout: 10000,
      pool: {
          min: 2,
          max: 50,
          idleTimeoutMillis: 10000,
          createTimeoutMillis: 10000,
          acquireTimeoutMillis: 10000,
    ***REMOVED***
      connection
***REMOVED***
);

const PROVINCES = { // Name, [cases, deadArr]
    GAUTENG: Province,
    'WESTERN CAPE': Province,
    'KWAZULU–NATAL': Province,
    'FREE STATE': Province,
    'EASTERN CAPE': Province,
    LIMPOPO: Province,
    MPUMALANGA: Province,
    'NORTH WEST': Province,
    'NORTHERN CAPE': Province,
    UNALLOCATED: Province
***REMOVED***;
const provincesList = [];

const options = new chrome.Options();
// Below arguments are critical for Heroku deployment
options.addArguments('--headless');
options.addArguments('--disable-gpu');
options.addArguments('--no-sandbox');

function parseNumber(number) {
    let testInt = '';
    console.log('FUNC NUMBER:', number);
    const testArray = number.match(/\s?((\d+\s+)*\d+)/)[0].trim().split(' ');
    testArray.forEach((digit) => {
        testInt += digit;
  ***REMOVED***);
    testInt = parseInt(testInt);
    return testInt;
***REMOVED***

async function main() {
        const driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    let valid = false;

    // Navigate to Url
    await driver.get(url);
    await driver.wait(until.elementsLocated(By.css('.entry-title.fusion-post-title a')));
    const html = await driver.getPageSource();
    console.log('success!! Page bag secured.');
    //   console.log(html);
    const root = HTMLParser.parse(html);

    const entries = root.querySelectorAll('.entry-title.fusion-post-title a');
    const links = [];
    const links2 = [];
    let htmls = [];

    console.log('Filtering url');
    await entries.forEach((entry) => {
        if (entry.getAttribute('href').match(linkRegex)) {
            links2.push(entry.getAttribute('href').match(linkRegex)[0]);
  ***REMOVED***
***REMOVED***);

    console.log('Links 2\n ', links2);
    htmls = [];

    const getHtml = async (links) => {
        console.log('starting');
        const loop = true;
  ***REMOVED***;
    // htmls = await getHtml(links2);
    const drivers = [];
    let index = -1;

    htmls = await async.concatSeries(links2, async (link) => {
         // Perform operation on file here.
        console.log(`Processing link: ${link***REMOVED***`);
        let loop = true;
        index += 1;
          const i = index;
          try {
            let counter = 0;
            let html;
            while (loop) {
                await driver.get(link);
                await driver.wait(until.elementLocated(By.css('.post-content')), 10***REMOVED*** 1000);
                const element = await driver.findElement(By.css('article'));
                 html = await element.getAttribute('innerHTML');
                // htmls.push(html);
                /* console.log('R2', html.match(/\d{2***REMOVED***(?:\w{2***REMOVED***)?\s\w{3,9***REMOVED***\s20(\d{2***REMOVED***)?/i)[0])***REMOVED***/
                if (html) {
                    loop = false;
              ***REMOVED***
                counter += 1;
          ***REMOVED***
            return html;
      ***REMOVED*** catch (e) {
            console.log(e);
            return `Some Error Occurred: ${e***REMOVED***`;
      ***REMOVED***
  ***REMOVED***/* , function(err) {
        // if any of the file processing produced an error, err would equal that error
        if( err ) {
            // One of the iterations produced an error.
            // All processing will now stop.
            console.log('Link failed to process');
      ***REMOVED*** else {
            console.log('All links have been processed successfully');
            console.log('done')

            console.log('Returning Promise.');
            loop = false;
            return Promise.resolve(htmls);
      ***REMOVED***
  ***REMOVED******REMOVED***/)
      .then((res) => {
            driver.quit();
            return res;
  ***REMOVED***
    );

    /* console.log("HTMLS DATE 0",htmls[0].match(/\d{1,2***REMOVED***(\w{2***REMOVED***)?\s\w{3,9***REMOVED***\s20(\d{2***REMOVED***)?/i)[0])
    console.log("HTMLS DATE 1",htmls[1].match(/\d{1,2***REMOVED***(\w{2***REMOVED***)?\s\w{3,9***REMOVED***\s20(\d{2***REMOVED***)?/i)[0])
    console.log("HTMLS DATE 2",htmls[2].match(/\d{1,2***REMOVED***(\w{2***REMOVED***)?\s\w{3,9***REMOVED***\s20(\d{2***REMOVED***)?/i)[0])***REMOVED***/

    let fullLoop = 0;
    for (let i = 0; i < htmls.length; i++) {
        let loop = true;
        fullLoop = i;
        while (loop) {
            {
                // console.log('HTMLS',htmls);
                const DATE = htmls[i].match(/\d{1,2***REMOVED***(\w{2***REMOVED***)?\s\w{3,9***REMOVED***\s20(\d{2***REMOVED***)?/i)[0];
                console.log(DATE); // date
                const tempDate = DATE.split(' ');
                const d = new Date(`${tempDate[0].split(/\D+/)[0]***REMOVED***-${tempDate[1]***REMOVED***-${tempDate[2]***REMOVED***`);
                let parsedDate = d.toLocaleDateString().split('/');
                parsedDate = `${parsedDate[2]***REMOVED***-${parsedDate[0]***REMOVED***-${parsedDate[1]***REMOVED***`;
                let rows = await knex('dates')
                    .where({ date: d ***REMOVED***);
                        let totalTests = 0;
                        console.log('Row Count:', rows.length);
                        if (rows.length > 0 && rows[0].parsed && !rows[0].maybeValid) {
                            console.log('Skipping:', d, '\n');
                            loop = false;
                      ***REMOVED*** else if (rows.length > 0 && rows[0].maybeValid) {
                            console.log('\nDate maybe valid:', d);

                            // Maybe the format is all wrong. Parse another site/source?
                            // Make soup.
                            const paragraphs = HTMLParser.parse(htmls[i]);
                            let testPar = paragraphs.text.match(/Tests.*?conducted.*?\d[\s?\d]+/i || /total.*((\d\s?)|(tests))/i)[0];
                            if (testPar) {
                                totalTests = testPar.match(/\s((\d+\s+)*\d+)/);
                          ***REMOVED*** else {
                                testPar = paragraphs.text.match(/total number of.*tests.*\s\d+[\.|\n]/i);
                                totalTests = testPar[0].match(/\s((\d+\s+)*\d+)/);
                          ***REMOVED***
                            if (totalTests) {
                                totalTests = parseNumber(totalTests[0].trim());
                          ***REMOVED***
                            console.log('Value:', totalTests);
                            rows = await knex('dates').select('totalTests')
                                .whereNull('totalTests')
                                .andWhere({ date: parsedDate ***REMOVED***);
                            if (rows.length > 0) {
                                const value = await knex('dates').update({
                                    totalTests,
                                    maybeValid: true
                              ***REMOVED***).where({ date: parsedDate ***REMOVED***)
                                    .returning('date');
                                if (value.length > 0) {
                                    console.log('Updated TTs1:', value);
                                    loop = false;
                                    valid = true;
                                    return true;
                              ***REMOVED***
                                    console.log('TotalTests not updated?');
                                    loop = false;
                                    valid = true;
                                    return false;
                          ***REMOVED***

                                loop = false;
                                valid = true;

                            // Pull off data for update (Total tests)
                      ***REMOVED*** else if ((rows.length === 0) || (rows.length > 0 && !rows[0].parsed)) {
                            console.log('Parsing 1 time:', d.toLocaleDateString(), '\n');
                            const rootChild = HTMLParser.parse(htmls[i]);
                            // pull out the two tables 1st
                            const tables1 = rootChild.querySelector('table');
                            // const [table1] = tables;
                            try {
                               /* if (tables1){
                                    const rootTable1 = HTMLParser.parse(tables1.toString());
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
                              ***REMOVED******REMOVED***/ // Should we pass the tables here? Only gives cases per province.

                                const date = rootChild.text.match(/\d{1,2***REMOVED***(\w{2***REMOVED***)?\s\w{3,9***REMOVED***\s20(\d{2***REMOVED***)?/i)[0];
                                const cases = rootChild.text.match((/total\s{0,10***REMOVED***(?=number)(?=.*confirmed cases).*?\d[\s?\d]+/i))[0]
                                  || rootChild.text.match(/total.*confirmed.*(?:covid-19)? cases.*?\s[\s??\d+]+/i)[0];
                                const tests = rootChild.text.match(/(Testing Data.*total.*?\d[\s?\d]+.*?tests)|(Tests.*?conducted.*?\d[\s?\d]+)/i)[0];
                                let deaths = rootChild.text.match(/total deaths.*?\d[\s\d]+|(total of)[\s\S]{0,20***REMOVED***?related deaths.*?\d[\s\d]+/i);
                                let recoveries = rootChild.text.match(/((\d[\s\d]+ )recoveries)|(recoveries[a-z\s]{0,30***REMOVED***?\d[\s\d]+|total\s{0,10***REMOVED***recoveries.*?\d[\s\d]+(?=[\s.]))/i);
                                let totalDeaths = null;
                                if (!deaths) {
                                    deaths = null;
                              ***REMOVED*** else {
                                    deaths = deaths[0];
                                    totalDeaths = deaths.trim().match(/\s((\d+\s+)*\d+)/);
                                    if (totalDeaths) {
                                        totalDeaths = parseNumber(totalDeaths[0].trim());
                                  ***REMOVED***
                              ***REMOVED***
                                let totalRecoveries = null;
                                if (!recoveries) {
                                    totalRecoveries = null;
                              ***REMOVED*** else {
                                    recoveries = recoveries[0];
                                    totalRecoveries = recoveries.trim().match(/\s((\d+\s+)*\d+)/);
                                    if (totalRecoveries) {
                                        totalRecoveries = parseNumber(totalRecoveries[0].trim());
                                  ***REMOVED***
                              ***REMOVED***
                                console.log('TestPar', tests);
                                let totalTests = tests.match(/\s((\d+\s+)*\d+)/)[0];

                                if (totalTests) {
                                    totalTests = parseNumber(totalTests.trim());
                              ***REMOVED*** else {
                                    totalTests = null;
                              ***REMOVED***
                                let totalCases = cases.trim().match(/\s((\d+\s+)*\d+)/);
                                if (totalCases) {
                                    totalCases = parseNumber(totalCases[0].trim());
                              ***REMOVED***


                                console.log('Total Tests:', totalTests);
                                console.log('Total Cases:', totalCases);
                                console.log('Total Deaths:', totalDeaths);
                                console.log('Total Recoveries:', totalRecoveries);

                                let data = {
                                    date: parsedDate,
                                    parsed: true,
                                    totalTests,
                                    totalCases,
                                    totalDeaths,
                                    maybeValid: true
                              ***REMOVED***;
                                console.log(data);
                                const rows = await knex('dates').select('totalTests')
                                    .whereNull('totalTests')
                                    .andWhere({ date: parsedDate ***REMOVED***);
                                        console.log(rows.length);
                                        const value = await knex('dates').update({
                                            totalTests,
                                            maybeValid: true
                                      ***REMOVED***).where({ date: parsedDate ***REMOVED***);
                                                console.log('Updated TTs2:', value);
                                            if (value === 0) {
                                                await knex('dates').insert(data);
                                                    console.log('Inserted my man');
                                                    const prevVals = await knex.raw('WITH preTable AS (\n'
                                                        + '   SELECT\n'
                                                        + '      date,\n'
                                                        + '      "totalCases",\n'
                                                        + '      "totalDeaths",\n'
                                                        + '        "totalRecoveries",\n'
                                                        + '      LAG("totalCases",1)\n'
                                                        + '          OVER (\n'
                                                        + '            ORDER BY date\n'
                                                        + '            ) prevCases,\n'
                                                        + '      LAG("totalDeaths",1)\n'
                                                        + '          OVER (\n'
                                                        + '            ORDER BY date\n'
                                                        + '            ) prevDeaths,\n'
                                                        + '          LAG("totalRecoveries",1)\n'
                                                        + '            OVER(\n'
                                                        + '                ORDER BY date\n'
                                                        + '                ) prevRecoveries\n'
                                                        + '   FROM dates\n'
                                                        + '   ORDER BY date\n'
                                                        + ')\n'
                                                        + 'select\n'
                                                        + '       date,\n'
                                                        + '       prevDeaths as "prevDeaths",\n'
                                                        + '       prevRecoveries as "prevRecoveries",\n'
                                                        + '    ("totalCases"-prevCases) as "dailyNew",\n'
                                                        + '    ("totalDeaths"-prevDeaths) as "dailyDeaths"\n'
                                                        + 'from preTable\n'
                                                        + 'order by date desc\n'
                                                        + 'limit 1;');

                                                    data.totalDeaths = !data.totalDeaths ? prevVals.rows[0].prevDeaths : data.totalDeaths;
                                                    prevVals.rows[0].dailyDeaths = !prevVals.rows[0].dailyDeaths ? 0 : prevVals.rows[0].dailyDeaths;
                                                    prevVals.rows[0].dailyNew = !prevVals.rows[0].dailyNew ? 0 : prevVals.rows[0].dailyNew;
                                                    data = {
                                                        totalDeaths: data.totalDeaths,
                                                        dailyNew: prevVals.rows[0].dailyNew,
                                                        dailyDeaths: prevVals.rows[0].dailyDeaths,
                                                        totalRecoveries: totalRecoveries || prevVals.rows[0].prevRecoveries,
                                                        ...data
                                                  ***REMOVED***;
                                                    await knex('dates').update(data).where('date', '=', parsedDate);
                                                    loop = false;
                                              ***REMOVED***
                              ***REMOVED*** catch (e) {
                                console.log('SOME ERROR:', e);
                                loop = false;
                                // No table found error
                                knex('dates ').insert({
                                    date: parsedDate,
                                    parsed: false,
                                    maybeValid: true,
                                    error: true
                              ***REMOVED***)
                                    .then((id) => {
                                        // console.log(id)
                                  ***REMOVED***)
                                    .catch((err) => {
                                        console.log('Ignoring duplicates 1', err);
                                  ***REMOVED***);
                              ***REMOVED***
                          ***REMOVED***
                      ***REMOVED***
                  ***REMOVED***
              ***REMOVED***
    if (fullLoop === links2.length - 1 || valid) {
        return Promise.resolve(true);
  ***REMOVED***
    return Promise.resolve(false);
***REMOVED***


/* main().then((res)=>{
    console.log('Res',res)
     return res
        process.exit(0)
  ***REMOVED***
)***REMOVED***/
function bootstrap() {
    main().then((res) => {
        console.log('Res', res);
        return res;
  ***REMOVED***);
***REMOVED***
// bootstrap()


module.exports = main;
// console.log("ProvincesList:",JSON.stringify(provincesList,null,2));
