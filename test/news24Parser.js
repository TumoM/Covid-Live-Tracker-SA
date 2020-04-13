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
    recoveryNumberTotal = 0,
    date;


function updateDaysGood(itemData) {
    let tableName = 'provinceDays';
    let dateData = {
        date: itemData.provDate,
        totalCases,
        totalDeaths,
        maybeValid: false,
        parsed: true
    }
    console.log("Date:",itemData.provDate)
    knex('dates')
    .select()
    .where({date:itemData.provDate})
    .then(rows => {
        console.log(`Working with Row Length ${rows.length}, with Data:\n${JSON.stringify(rows,null,2)}`)
        console.log("date in func",itemData.provDate)
        if (rows.length === 0) {
            knex("dates ").insert(dateData)
                .then(id => {
                    console.log("Updated Dates Table")
                })
                .catch(err => {
                    console.log("Attempted duplicate insert")
                })
        }else{
            console.log("Length too long")
        }
    });
    }

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
        date = templines[0].split('Updated')[1].trim();
        let parsed = false
        knex('dates').where({date}).then(rows => {
            console.log("Row Count:", rows.length);
            if (rows.length > 0 && rows[0].parsed) {
                parsed = true;
                console.log("Skipping");
            } else if (rows.length > 0 && rows[0].maybeValid) {
                // Maybe the format is all wrong. Parse another site/source?
            } else if ((rows.length === 0) || (rows.length > 0 && !rows[0].error)) {
                [totalCases, totalDeaths] = (templines[5].trim().split("."))

                totalCases = getNumber(totalCases)
                totalDeaths = getNumber(totalDeaths)

                console.log(`${date}: Cases:${totalCases}, Deaths:${totalDeaths}`)
                // #######################################################################################

                // TODO 1: Parse info on Recoveries by Province
                let recoveriesLines = soupBody.find('p').getText().split(":"),
                    recoveryDate = recoveriesLines[0].match(/\d+.*/)[0];

                recoveryNumberTotal = getNumber(recoveriesLines[1]);
                console.log(`Total Recovery:${recoveryNumberTotal}\n`)

                let provinceRecoveries = recoveriesLines[2].split(/\),?\.?/)
                let provinceRecoveries2 = []
                provinceRecoveries.forEach(value => {
                    provinceRecoveries2.push(value.split('(')[0].trim())
                })
                provinceRecoveries[provinceRecoveries.length - 1].length === 0 ? provinceRecoveries.pop() : provinceRecoveries // Removes trailing blank index.
                // TODO Loop over list of prov names, insert missing names in provinceRecoveries
                provincesList.forEach(value => { // Adds any missing provinces not mentioned as having any recoveries, and sets them to 0.
                    if (!(provinceRecoveries2.includes(value))){
                        provinceRecoveries.push(`${value} (0`)
                    }
                })
                console.log(`Recovery Counts (${recoveryDate}):`)
                let count = 0;
                provinceRecoveries.forEach(line => {
                    let recoverCount, provinceName;
                    [provinceName, recoverCount] = line.trim().split("(")
                    provinceName = provinceName.trim();
                    const tempProvince = new Province(provinceName)
                    tempProvince.recovered = recoverCount;
                    tempProvince.date = recoveryDate;
                    currentProvincesRecovery[provinceName] = tempProvince;

                    console.log(`${provinceName}: ${recoverCount}`);
                    let tableName = 'provinceDays';
                    let tempDate = recoveryDate.split(" ");
                    const dateFormatted = new Date(recoveryDate);
                    let newTemp = dateFormatted.toLocaleDateString().split("/")
                    let itemData = {
                        provinceName,
                        provDate: `${newTemp[2]}-${newTemp[0]}-${newTemp[1]}`,
                        recovered: recoverCount
                    };

                    knex(tableName).select().where({provDate: itemData.provDate, provinceName})
                        .then(rows => {
                            if (rows.length === 0) {
                                knex(tableName).insert(itemData)
                                    .then(value => {
                                        console.log("Recovered Inserted")
                                    })
                                    .catch(reason => {
                                        console.log("Error inserting Province Recovered", reason)
                                    })
                                    .finally(() => {
                                        count+=1;
                                        if (count === 9){
                                            let dateData = {
                                                totalRecoveries:recoveryNumberTotal,
                                                maybeValid: true,
                                                parsed: true
                                            };

                                            knex('dates')
                                                .update(dateData)
                                                .where('date','=',itemData.provDate)
                                                .then(value => {
                                                    console.log(`Updated Recovery for: ${itemData.provDate}, while parsing for Date: ${date}`)
                                                    console.log("Value",value)
                                                    if (value === 0){
                                                        dateData.date = itemData.provDate;
                                                        dateData.parsed = false;
                                                        knex('dates')
                                                            .insert(dateData)
                                                            .then(value1 => {
                                                            })
                                                            .catch(reason => {
                                                                console.log("Error on Recovery Dates Insert")
                                                            })
                                                    }

                                                })
                                        }
                                    })
                            } else {
                                let valid = true;
                                knex(tableName).update({recovered: recoveryNumberTotal}).where({provDate: recoveryDate})
                                    .then(value => {
                                        console.log("Recovered for single province Updated")
                                        // count+=1;
                                    })
                                    .catch(reason => {
                                        console.log("Error Updating Province Recovered", reason)
                                        valid = false;
                                    })
                                //     .finally(() => {
                                //     count+=1;
                                //     if (count === 9){
                                //         let dateData = {
                                //             totalRecoveries:recoveryNumberTotal,
                                //             maybeValid: true,
                                //             parsed: true
                                //         };
                                //
                                //         knex('dates')
                                //             .update(dateData)
                                //             .where('date','=',itemData.provDate)
                                //             .then(value => {
                                //                 console.log(`Updated Recovery for: ${itemData.provDate}, while parsing for Date: ${date}`)
                                //                 console.log("Value",value)
                                //                 if (value === 0){
                                //                     dateData.date = itemData.provDate;
                                //                     dateData.parsed = false;
                                //                     knex('dates')
                                //                         .insert(dateData)
                                //                         .then(value1 => {
                                //                             console.log("Value1",value1)
                                //                         })
                                //                         .catch(reason => {
                                //                             console.log("Error on Recovery Dates Insert")
                                //                         })
                                //                 }
                                //
                                //             })
                                //     }
                                // })
                            }
                        })
                        .catch(reason => {
                            console.log("Duplicate Province? ", reason)
                        })
                })

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
                            console.log(`${provinceName} - Cases: ${tempProv.sick}, Dead: ${tempProv.totalDead}`)
                            currentProvincesCasesDeaths[provinceName] = tempProv;

                            // TODO Build object to upload to ProvinceDays using insertIgnore funct below
                            let tableName = 'provinceDays';
                            let tempDate = date.split(" ");
                            const dateFormatted = new Date(date);
                            let newTemp = dateFormatted.toLocaleDateString().split("/")
                            let provDate = `${newTemp[2]}-${newTemp[0]}-${newTemp[1]}`
                            let itemData = {
                                provinceName,
                                provDate,
                                caseCount,
                                deathCount
                            };
                            knex(tableName).where({provDate, provinceName})
                                .then(rows => {
                                    if (rows.length === 0) {
                                        knex(tableName).insert(itemData)
                                            .then(value => {
                                                if (index === 9) {

                                                    updateDaysGood(itemData);
                                                }
                                            })
                                            .catch(reason => {
                                                console.log("Error inserting Province ", reason)
                                            })
                                    } else {
                                        console.log("Already in.")
                                        // if (index === 9) {
                                        //     updateDaysGood(itemData);
                                        // }
                                    }
                                })
                                .catch(reason => {
                                    console.log("Duplicate Province? ", reason)
                                })
                        }
                    }
                }
            }
            console.log("Swag 2")
        })
        .catch(function (err) {
            console.log(err)
        });
    })

function getNumber(line){
    let intString = "";
    let total = line.match(/\d[\d+\s]*\d+/)[0].split(" ")
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
function insertIgnore(tableName, itemData) {

    let insertString = knex(tableName).insert(itemData).toString();
    let conflictString = knex.raw(` ON CONFLICT DO NOTHING RETURNING *;`).toString();
    let query = (insertString + conflictString).replace(/\?/g, '\\?');

    return knex.raw(query)
        .then(result => result.rows);
};

function insertUpdateRecovered(tableName, itemData) {

    let insertString = knex(tableName).insert(itemData).toString();
    let conflictString = knex.raw(` ON CONFLICT ON CONSTRAINT provincedays_provincename_date_unique DO UPDATE SET recovered=${itemData.recovered} WHERE provDate='${itemData.date}' RETURNING *;`).toString();
    let query = (insertString + conflictString).replace(/\?/g, '\\?');
    return knex.raw(query)
        .then(result => result.rows);
};

