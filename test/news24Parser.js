const HTMLParser = require('node-html-parser'),
    rp = require('request-promise'),
    Province = require("../models/provinceModel"),
    Death = require("../models/deathModel"),
    Day = require("../models/dayModel"),
    DbSetup = require("../test/db24"),
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
        let date = templines[0].split('Updated')[1].trim();
        let parsed = false
        knex('dates').where({date}).then(rows => {
            console.log("Row Count:", rows.length);
            if (rows.length > 0 && rows[0].parsed) {
                parsed = true;
                return true
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
                    recoveryDate = recoveriesLines[0].match(/\d+.*/)[0],
                    recoveryNumberTotal = getNumber(recoveriesLines[1]);
                console.log(`Total Recovery:${recoveryNumberTotal}\n`)

                let provinceRecoveries = recoveriesLines[2].split(/\),?\.?/)
                provinceRecoveries[provinceRecoveries.length - 1].length === 0 ? provinceRecoveries.pop() : provinceRecoveries // Removes trailing blank index.
                console.log(`Recovery Counts (${recoveryDate}):`)
                provinceRecoveries.forEach(line => {
                    let  recoverCount, provinceName;
                    [provinceName, recoverCount] = line.trim().split("(")
                    provinceName = provinceName.trim();
                    const tempProvince = new Province(provinceName)
                    tempProvince.recovered = recoverCount;
                    tempProvince.date = recoveryDate;
                    currentProvincesRecovery[provinceName] = tempProvince;
                    // console.log(currentProvincesRecovery[provinceName])
                    console.log(`${provinceName}: ${recoverCount}`);
                    let tableName = 'provinceDays';
                    let tempDate = recoveryDate.split(" ");
                    const dateFormatted = new Date(recoveryDate);
                    let newTemp = dateFormatted.toLocaleDateString().split("/")
                    let itemData = {
                        provinceName,
                        provDate:`${newTemp[2]}-${newTemp[0]}-${newTemp[1]}`,
                        recovered:recoverCount
                    };

                    knex(tableName).select().where({provDate:itemData.provDate,provinceName})
                        .then(rows => {
                            if (rows.length === 0){
                                knex(tableName).insert(itemData)
                                    .then(value => {
                                        console.log("Recovered Inserted")
                                    })
                                    .catch(reason => {
                                        console.log("Error inserting Province Recovered",reason)
                                    })
                            }
                            else{
                                knex(tableName).update({recovered:recoveryNumberTotal}).where({provDate:recoveryDate})
                                    .then(value => {
                                        console.log("Recovered Updated")
                                    })
                                    .catch(reason => {
                                        console.log("Error Updating Province Recovered",reason)
                                    })
                            }
                        })
                        .catch(reason => {
                            console.log("Duplicate Province? ",reason)
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
                            provinceName = vars[1].trim() == "KwaZulu" ? "KwaZulu-Natal" : vars[1].trim();
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
                            const dateFormatted = new Date(`${tempDate[0].split(/\D+/)[0]}-${tempDate[1]}-${tempDate[2]}`);
                            let itemData = {
                                provinceName,
                                provDate:dateFormatted.toISOString().split("T")[0],
                                caseCount,
                                deathCount
                            };
                            knex(tableName).where({provDate:dateFormatted.toISOString().split("T")[0],provinceName})
                            .then(rows => {
                                if (rows.length === 0){
                                    knex(tableName).insert(itemData)
                                    .catch(reason => {
                                        console.log("Error inserting Province ",reason)
                                    })
                                }
                                else{
                                    console.log("Already in.")
                                }
                            })
                                .catch(reason => {
                                    console.log("Duplicate Province? ",reason)
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
    let total = line.match(/\d[\d+\s+]*\d+/)[0].split(" ")
    total.forEach(digit => {
        intString += digit
    })
    return (+intString)
}
