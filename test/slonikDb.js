const dotenv = require('dotenv');
dotenv.config();

let connection;
if (process.env.DBMODE && process.env.DBMODE === "herokuDB"){
    connection = process.env.DATABASE_URL
***REMOVED***
else{
    connection = process.env.AWS_CONNECTIONSTRING || {
        host:process.env.AWS_HOST|| process.env.PG_HOST||'postgres://127.0.0.1',
        user:process.env.AWS_USER|| process.env.PG_USER||'test_user',
        password:process.env.AWS_PASSWORD || process.env.PG_PASS ||'temp_pass',
        database:process.env.AWS_DB ||process.env.DB_NAME ||'covid-tracker-sa2'
  ***REMOVED***;
***REMOVED***

const slonik = require('slonik');
const createPool = slonik.createPool, sql = slonik.createSqlTag;
const pool = createPool(connection);

const main = async () => {
    const result = await pool.connect(async (connection) => {
        let dates = await connection.query(sql`SELECT***REMOVED*** from "dates"`);
        console.log(dates)
        await connection.query(sql`SELECT 2`);

        return 'foo';
  ***REMOVED***);

    await pool.end();
***REMOVED***;

main();