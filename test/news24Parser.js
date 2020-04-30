async function main() {
    const HTMLParser = require('node-html-parser'),
        rp = require('request-promise'),
        Province = require("../models/provinceModel"),
        Death = require("../models/deathModel"),
        Day = require("../models/dayModel"),
        DbSetup = require("../test/db24"),
        JSSoup = require('jssoup').default;
    const url = "https://www.health24.com/Medical/Infectious-diseases/Coronavirus/coronavirus-in-sa-all-the-confirmed-cases-20200312";
// const url = "http://127.0.0.1:5500/Coronavirus%20in%20SA%20%20All%20the%20confirmed%20cases%20%20%20Health24-1.html";

    const dotenv = require('dotenv');
    dotenv.config();
    let connection;
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
            debug: false,
            asyncStackTraces: true,
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
        totalRecoveries = 0,
        date;


    let ps = [];
    let recoveryDate;
    try {
        let status = await rp(url)
        let html = status
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
        let rows = await knex('dates').where({date});

        console.log("Row Count:", rows.length);
        if (rows.length > 0 && rows[0].parsed && !rows[0].maybeValid) {
            parsed = true;
            console.log("Skipping");
        }
            // else if (rows.length > 0 && rows[0].maybeValid) {
            //     // Maybe the format is all wrong. Parse another site/source?
        // }
        else if ((rows.length === 0) || rows[0].maybeValid || (rows.length > 0 && !rows[0].error)) {
            [totalCases, totalDeaths] = (templines[5].trim().split("."))

            totalCases = getNumber(totalCases)
            totalDeaths = getNumber(totalDeaths)

            console.log(`${date}: Cases:${totalCases}, Deaths:${totalDeaths}`)
            // #######################################################################################

            // TODO 1: Parse info on Recoveries by Province
            let recoveriesLines = soupBody.text.match(/(?:recoveries?.*)?[\d*\s?]*recoveries?/)
            /*recoveriesLines.length === 2 ? recoveriesLines.unshift(date) : recoveriesLines;
            recoveryDate = recoveriesLines[0].match(/\d+.*!/)[0];
*/
            totalRecoveries = getNumber(recoveriesLines[0]);
            console.log(`Total Recovery:${totalRecoveries}\n`)

            let provinceRecoveries = soupBody.text.match(/provincial breakdown.*?:.*?\./)[0].split(':')[1].split(',')
            let provinceRecoveries2 = []
            provinceRecoveries.forEach(value => {
                provinceRecoveries2.push(value.split('(')[0].trim())
            })
            // provinceRecoveries[provinceRecoveries.length - 1].length === 0 ? provinceRecoveries.pop() : provinceRecoveries // Removes trailing blank index.
            // Loop over list of prov names, insert missing names in provinceRecoveries
            provincesList.forEach(value => { // Adds any missing provinces not mentioned as having any recoveries, and sets them to 0.
                if (!(provinceRecoveries2.includes(value))) {
                    provinceRecoveries.push(`${value} (0`)
                }
            })

            // Parse info on New Cases by Province
            console.log('\nCase Counts:')
            let p = soupBody.find('p'),
                breakdown = false,
                caseCount = 0,
                deathCount = 0,
                provinceName = '';

            while (!breakdown) {
                p = p.findNextSibling('p');
                if (p.text.match(/PROVINCIAL BREAKDOWN:/i)) {
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
                        let caseInt = "", deathInt = ""
                        caseCount.split(/\s/).forEach(digit => {
                            caseInt += digit
                        })
                        caseInt = parseInt(caseInt)
                        if (deathCount.length > 0) {
                            deathCount.split(/\s/).forEach(digit => {
                                deathInt += digit
                            })
                            deathInt = parseInt(deathInt)
                        } else {
                            deathInt = 0
                        }
                        let tempProv = new Province(provinceName, caseInt);
                        tempProv.deaths = deathInt;
                        tempProv.date = date;
                        // console.log(`${provinceName} - Cases: ${tempProv.cases}, Dead: ${tempProv.deaths}`)
                        currentProvincesCasesDeaths[provinceName] = tempProv;

                        // Build object to upload to ProvinceDays using insertIgnore funct below
                        let tableName = 'provinceDays';
                        const dateFormatted = new Date(date);
                        let newTemp = dateFormatted.toLocaleDateString().split("/") // TODO What's up bro?, lol check this.
                        let provDate = `${newTemp[2]}-${newTemp[0]}-${newTemp[1]}`
                        let itemData = {
                            provinceName,
                            provDate,
                            caseCount: caseInt,
                            deathCount: deathInt
                        };
                        let rows = await knex(tableName).where({provDate, provinceName});
                        if (rows.length === 0) {
                            await knex(tableName).insert(itemData)
                        }
                        // console.log("Already in.")
                        if (index === 9) {
                            await updateDaysGood(itemData);
                        }
                    }
                }
            }

            console.log(`Recovery Counts (${recoveryDate}):`)
            let count = 0;
            console.log('Starting the parsing of province Recoveries.')
            for (let index = 0; index < provinceRecoveries.length; index++) {
                let loop = true;
                while (loop){
                    let recoverCount, provinceName;
                    [provinceName, recoverCount] = provinceRecoveries[index].trim().split("(")
                    recoverCount = recoverCount.split(')')[0]
                    recoveryDate=date
                    provinceName = provinceName.trim();
                    const tempProvince = new Province(provinceName)
                    tempProvince.recoveries = getNumber(recoverCount.split('.')[0]);
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

                    let rows = await knex(tableName).select().where({provDate: itemData.provDate, provinceName});
                    if (rows.length === 1) { // Update the recoveries column
                        console.log("Error inserting Province Recovered, attempting to Update")
                        let row = await knex(tableName)
                            .update({recovered: itemData.recovered})
                            .where('provinceName', '=', itemData.provinceName)
                            .andWhere('provDate','=',itemData.provDate)
                        if (row && row >0){
                            console.log("Province Recoveries Updated")
                            loop = false;
                            
                        }
                        else {
                            console.log("Error Updating Province Recovered", reason1)
                        }
                        count += 1;
                        if (count === 9) {
                            let dateData = {
                                totalRecoveries: totalRecoveries,
                                maybeValid: false,
                                parsed: true
                            };
                            let value = await knex('dates')
                                .update(dateData)
                                .where('date', '=', itemData.provDate)
                            if (value && value > 0){
                                console.log(`Updated Recovery for: ${itemData.provDate}, while parsing for Date: ${date}`)
                                console.log("Value", value)
                                dateData.date = itemData.provDate;
                                if (value === 0) {
                                    dateData.parsed = true;
                                    let value = await knex('dates')
                                        .insert(dateData)
                                        .returning('date')
                                    if (!value){
                                        console.log("Error on Recovery Dates Insert", reason)
                                        loop = false;
                                    }
                                    else {
                                        console.log("Inserted.")
                                        loop = false;
                                    }
                                }
                            }
                            else {
                                console.log("Should we do something here?, Recoveries already set?")
                            }
                            loop = false;
                            
                        }
                        loop = false;
                        
                    }
                    else { // Inserting a fresh record mate.
                        let valid = true;
                        let day, month, year;
                        [day, month, year] = (new Date(date).toLocaleDateString().split('/', 3))
                        let value = await knex(tableName).update({recovered: itemData.recovered})
                            .where({provDate: recoveryDate, provinceName: itemData.provinceName})
                            .orWhere({
                                provDate: ([year, day, month].join("-")),
                                provinceName: itemData.provinceName
                            })
                        if (value && value > 0) {
                            console.log("Recovered for single province Updated")
                        }
                        else{
                            console.log("Error Updating Province Recovered", reason)
                            valid = false;

                        }
                        count += 1;
                        if (count === 9) {
                            let dateData = {
                                totalRecoveries: totalRecoveries,
                                maybeValid: false,
                                parsed: true
                            };

                            let value = await knex('dates')
                                .update(dateData)
                                .where('date', '=', itemData.provDate)
                            if (value && value > 0) {
                                console.log(`Updated Recovery for: ${itemData.provDate}, while parsing for Date: ${date}`)
                                console.log("Value", value)
                                dateData.date = itemData.provDate;
                            }
                            else {
                                console.log('Error doing things G.')
                                /*dateData.parsed = true;
                                knex('dates')
                                    .insert(dateData)
                                    .then(value1 => {
                                        console.log("Value1", value1)
                                    })
                                    .catch(reason => {
                                        console.log("Error on Recovery Dates Insert")
                                    })*/
                            }
                            loop = false;
                            
                        }
                        loop = false;
                        

                    }


                }
            }
            /*await provinceRecoveries.map(async line => )*/
            console.log('Ending the parsing of province Recoveries.')
        }
        console.log("Swag 2")
        // return 200
        // process.exit(200);
        console.log('Done map?')
        return Promise.resolve(true)
    } catch (e) {
        console.log("Error Bro", e);
        return (-1)
    }
    function getNumber(line) {
        let intString = "";
        let total = line.match(/\d?[\d+\s?]*\d+/)[0].split(" ")
        total.forEach(digit => {
            intString += digit
        })
        return (+intString)
    }

    async function updateDaysGood(itemData) {
        console.log('Updating Day Function:')

        let dateData = {
            totalCases,
            totalDeaths,
            totalRecoveries,
            maybeValid: true,
            parsed: true
        }
        console.log("Date:", itemData.provDate)
        let rows = await knex('dates')
            .select()
            .where({date: itemData.provDate})
        // console.log(`Working with Row Length ${rows.length}, with Data:\n${JSON.stringify(rows,null,2)}`)
        console.log("date in func", itemData.provDate)
        if (rows && rows.length === 0) {
            dateData.date = itemData.provDate;
            let id = await knex("dates").insert(dateData).returning('date');
            if (id && id.length > 0) {
                console.log("Inserted into Dates Table")
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
                    '       prevRecoveries as "prevRecoveries",\n' +
                    '    ("totalCases"-prevCases) as "dailyNew",\n' +
                    '    ("totalDeaths"-prevDeaths) as "dailyDeaths"\n' +
                    'from preTable\n' +
                    'order by date desc\n' +
                    'limit 1;')
                let val = await knex('dates').update({
                    dailyNew: prevVals.rows[0].dailyNew,
                    dailyDeaths: prevVals.rows[0].dailyDeaths,
                    totalRecoveries: prevVals.rows[0].prevRecoveries
                }).where('date', '=', itemData.provDate);
                if (!val || val === 0){
                    log('WHAAAAAT?', reason)
                }
            }
        }
        else {
            let id = await knex("dates ")
                .update(dateData)
                .where('date', "=", itemData.provDate)
            if (id && id > 0){
                console.log("Updated Dates Table")
            }
            else{
                console.log("Attempted duplicate update?", err)
            }
        }
    }
}



main()
    .then(result=>{
        console.log("main result:",result);
    })
    .catch(err=> console.log('Your Err',err));
