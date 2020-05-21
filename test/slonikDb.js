const dotenv = require('dotenv');
dotenv.config();
const numeral = require('numeral');

const provinceList = {
    "NORTH WEST": 'ZA-NW',
    "EASTERN CAPE": 'ZA-EC',
    "FREE STATE": 'ZA-FS',
    "MPUMALANGA": 'ZA-MP',
    "NORTHERN CAPE": 'ZA-NC',
    "LIMPOPO": 'ZA-LP',
    "WESTERN CAPE": 'ZA-WC',
    "GAUTENG": 'ZA-GT',
    "KWAZULU-NATAL": 'ZA-NL',
    "UNALLOCATED": 'ZA-UN'
};

let connection;
if (process.env.DBMODE && process.env.DBMODE === "herokuDB"){
    connection = process.env.DATABASE_URL
}
else{
    connection = process.env.AWS_CONNECTIONSTRING || `host=${process.env.AWS_HOST} user=${process.env.AWS_USER} password=${process.env.AWS_PASSWORD} port=5432 dbname=${process.env.AWS_DB} ` || {
        host:process.env.AWS_HOST|| process.env.PG_HOST||'postgres://127.0.0.1',
        user:process.env.AWS_USER|| process.env.PG_USER||'test_user',
        password:process.env.AWS_PASSWORD || process.env.PG_PASS ||'temp_pass',
        database:process.env.AWS_DB ||process.env.DB_NAME ||'covid-tracker-sa2'
    };
}

const slonik = require('slonik');
const createPool = slonik.createPool;
const sql = slonik.sql;
// const sql = require('sql-template-strings')
// const sql = require('sql-tagged-template-literal')
console.log("Connection",connection)
let options = {
    connectionTimeout: 'DISABLE_TIMEOUT'
}
const pool = createPool(connection);

const main = async () => {
    console.log("In Main.")
    let value, value2, value3, value4;
    let provCases = {}, provDeaths = {}, provRecoveries = {};
    const result = await pool.connect(async (connection) => {
        console.log("Got result?")
        let mysql;

        // Start Transaction
        return await connection.transaction(async (transactionConnection) => {
            // 1 - getSummary()
            mysql = sql`select "date", "totalCases", "totalDeaths", "totalTests", "totalRecoveries", "dailyNew", "dailyDeaths", "updateTime" from "dates" where "totalCases" is not null and "totalDeaths" is not null order by "date" desc limit(1)`;
            console.log("Transaction 1");
            value = await transactionConnection.maybeOne(mysql); // Transaction call 1 (Get latest row)
            console.log("Done 1")
            if (value) {
                if (!value.totalTests) {
                    mysql = sql`SELECT "date", "totalTests" FROM "dates" WHERE "totalTests" is not null Order By "date" desc limit 1`;
                    console.log("Transaction 2");
                    value2 = await transactionConnection.maybeOne(mysql); // Transaction call 2 (Get valid Test value)
                    if (value2) {
                        value.date2 = value2.date;
                        value.totalTests = value2.totalTests
                    }
                    console.log("Done 2")
                }
                else{
                    console.log('Done 2 - Skipped')
                }
            }
            if (value){
                // Number formatting:
                value.totalCases = numeral(value.totalCases).format('0,0');
                value.totalDeaths = numeral(value.totalDeaths).format('0,0');
                value.totalRecoveries = numeral(value.totalRecoveries).format('0,0');
                value.totalTests = numeral(value.totalTests).format('0,0');
                value.dailyNew = numeral(value.dailyNew).format('0,0');
                value.dailyDeaths = numeral(value.dailyDeaths).format('0,0');

                // 2 - getProvinces()
                mysql = sql`select "provinceName", "provDate", "caseCount", "deathCount", "recovered" from "provinceDays" order by "provDate" desc limit 10`
                console.log("Transaction 3");
                value3 = await transactionConnection.many(mysql)
                if (value3 && value3.length > 0){
                    value3.forEach(province =>{
                        provCases[provinceList[province.provinceName.toUpperCase()]] = province.caseCount
                        provDeaths[provinceList[province.provinceName.toUpperCase()]] = province.deathCount
                        provRecoveries[provinceList[province.provinceName.toUpperCase()]] = province.recovered
                        // console.log("Province:",province)
                    })
                    console.log('Done 3')
                }
                mysql = sql`select "date", "totalCases", "totalDeaths", "totalRecoveries", "activeCases", "totalTests", "dailyNew", "dailyDeaths" from "dates" order by "date" asc`
                console.log("Transaction 4");
                value4 = await transactionConnection.many(mysql)
                if (value4 && value4.length > 0){
                    console.log('Done 4')
                }

            }
            // End Transaction
            console.log('Returning Value of:', value)
            return {'summary':value,'provinces': {provCases,provDeaths,provRecoveries},'graphs':value4};
        })
    })
    if (result) {
        return Promise.resolve(result)
    }
    else {
        return Promise.reject("Something went down: "+result)
    }
}

main().then(async r => {
    console.log('Done');
    console.log(r);
    await pool.end();

});
