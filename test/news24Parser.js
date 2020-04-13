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
        database: 'covid-tracker-sa2'
    }
});


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
}
let provincesList = []
let totalCases = 0, totalDeaths = 0
rp(url)
    .then(function (html) {
        //success!
        let currentProvincesRecovery = Object.assign({}, PROVINCES);
        let currentProvincesCasesDeaths = Object.assign({}, PROVINCES);

        // #######################################################################################
        const headHtml = html.match(/<h6.*block datestamp[\s\S]*<\/hgroup>/m), // The Header with total Cases and Deaths.
            bodyHtml = html.match(/.*those details can be found here/m), // The body with province counts.
            soupHead = new JSSoup(headHtml),
            soupBody = new JSSoup(bodyHtml);


        // Parses the 'head' of the page for Case and Death Numbers
        let templines = soupHead.prettify().trim().split(/<\/?\w*\s?\d?[\s\S]?>\n/);
        let date = templines[0].split('Updated')[1].trim(),
            intString = "";
        [totalCases, totalDeaths] = (templines[5].trim().split("."))

        totalCases = getNumber(totalCases)
        totalDeaths = getNumber(totalDeaths)

        console.log(`${date}: Cases:${totalCases}, Deaths:${totalDeaths}`)
        // #######################################################################################

        // TODO 1: Parse info on Recoveries by Province
        let recoveriesLines = soupBody.find('p').getText().split(":"),
            recoveryDate = recoveriesLines[0].match(/\d+.*/),
            recoveryNumberTotal = getNumber(recoveriesLines[1]);
        console.log(`Total Recovery:${recoveryNumberTotal}\n`)

        let provinceRecoveries = recoveriesLines[2].split(/\),?\.?/)
        provinceRecoveries[provinceRecoveries.length-1].length === 0? provinceRecoveries.pop():provinceRecoveries // Removes trailing blank index.
        console.log(`Recovery Counts (${recoveryDate}):`)
        provinceRecoveries.forEach(line => {
            let recoverCount,provinceName;
            [provinceName, recoverCount] = line.trim().split("(")
            provinceName = provinceName.trim();
             const tempProvince = new Province(provinceName)
            tempProvince.recovered=recoverCount;
            tempProvince.date=recoveryDate;
            currentProvincesRecovery[provinceName] = tempProvince;
            // console.log(currentProvincesRecovery[provinceName])
            console.log(`${provinceName}: ${recoverCount}`);
        })
        // TODO 2: Parse info on New Cases by Province
        console.log('\nCase Counts:')
        let p = soupBody.find('p'),
            breakdown = false,
            caseCount = 0,
            deathCount = 0,
            provinceName = '';

        while (!breakdown){
            p = p.findNextSibling('p');
            if (p.text === 'PROVINCIAL BREAKDOWN:'){
                breakdown = true;
                p = p.findNextSibling('p');
                for (let index=0;index<10;index++){
                    let vars = p.text.replace(/&nbsp;/g,'  ').split("-")
                    p = p.findNextSibling('p');
                    provinceName = vars[1].trim() == "KwaZulu"? "KwaZulu-Natal": vars[1].trim();
                    caseCount = vars[0].trim();
                    deathCount = vars.length === 3 ? vars[2].split('  ')[0].trim()
                        : vars.length === 4 ? vars[3].split('  ')[0].trim()
                            : 0;
                    let tempProv = new Province(provinceName,caseCount);
                    tempProv.totalDead = deathCount;
                    tempProv.date = date;
                    console.log(`${provinceName} - Cases: ${tempProv.sick}, Dead: ${tempProv.totalDead}`)
                    currentProvincesCasesDeaths[provinceName] = tempProv;
                }
            }
        }

        let tableName = 'user_meta';
        let conflictTarget = 'login';
        let itemData = {
            login: 'plurch',
            user_id: 3332519
        };
        console.log("Swag 2")
    })
    .catch(function (err) {
        console.log(err)
    });

function getNumber(line){
    let intString = "";
    let total = line.match(/\d[\d+\s+]*\d+/)[0].split(" ")
    total.forEach(digit => {
        intString += digit
    })
    return (+intString)
}

/**
 * Perform an "Upsert" using the "INSERT ... ON CONFLICT ... " syntax in PostgreSQL 9.5
 * @param {string} tableName - The name of the database table
 * @param {string} conflictTarget - The column in the table which has a unique index constraint
 * @param {Object} itemData - a hash of properties to be inserted/updated into the row
 * @returns {Promise} - A Promise which resolves to the inserted/updated row
 */
function upsertItems(tableName, conflictTarget, itemData) {
    let firstObjectIfArray = Array.isArray(itemData) ? itemData[0] : itemData;
    let exclusions = Object.keys(firstObjectIfArray)
        .filter(c => c !== conflictTarget)
        .map(c => knex.raw('?? = EXCLUDED.??', [c, c]).toString())
        .join(",\n");

    let insertString = knex(tableName).insert(itemData).toString();
    let conflictString = knex.raw(` ON CONFLICT DO NOTHING RETURNING *;`).toString();
    let query = (insertString + conflictString).replace(/\?/g, '\\?');

    return knex.raw(query)
        .on('query', data => console.log('Knex: ' + data.sql))
        .then(result => result.rows);
};
