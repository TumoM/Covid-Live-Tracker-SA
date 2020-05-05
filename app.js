const express = require('express');
const dotenv = require('dotenv');
const compression = require('compression');

const app = express();
const { CronJob ***REMOVED*** = require('cron');
const Sentry = require('@sentry/node');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCache = require('node-cache');
const moment = require('moment');
const http = require('http');
const https = require('https');

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

Sentry.init({ dsn: 'https://58ae4a8b4ff545d0bb1449730d6b2762@o386838.ingest.sentry.io/5221539' ***REMOVED***);

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
dotenv.config();

const ttl = 60***REMOVED*** 60***REMOVED*** 1; // cache for 1 Hour
// const cache = new CacheService({
//     checkperiod: 60,
//     maxKeys: 10000,
//     stdTTL: ttl,
//     useClones: false,
// ***REMOVED***);
const cache = new NodeCache({
    checkperiod: 60,
    maxKeys: 10000,
    stdTTL: ttl,
    useClones: false,
***REMOVED***);
cache.set('data', null);
const port = process.env.PORT || 5000;

// Setup Express/App
app.set('view engine', 'ejs');
app.set('view cache', true);
app.use(bodyParser.urlencoded({
    extended: true
***REMOVED***));

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
  ***REMOVED***

    // fallback to standard filter function
    return compression.filter(req, res);
***REMOVED***
app.use(compression({ filter: shouldCompress ***REMOVED***));

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.json());

let connection;
if (process.env.DBMODE && process.env.DBMODE === 'herokuDB') {
    connection = process.env.DATABASE_URL;
***REMOVED*** else {
    connection = process.env.AWS_CONNECTIONSTRING || {
        host: process.env.AWS_HOST || process.env.PG_HOST || 'postgres://127.0.0.1',
        user: process.env.AWS_USER || process.env.PG_USER || 'test_user',
        password: process.env.AWS_PASSWORD || process.env.PG_PASS || 'temp_pass',
        database: process.env.AWS_DB || process.env.DB_NAME || 'covid-tracker-sa2'
  ***REMOVED***;
***REMOVED***

console.log('Connection:', connection);
const knex = require('knex')({
        client: 'pg',
        debug: true,
        asyncStackTraces: true,
        acquireConnectionTimeout: 10000,
        pool: {
            min: 2,
            max: 50,
            idleTimeoutMillis: 10000,
            createTimeoutMillis: 10000,
            acquireTimeoutMillis: 10000,
***REMOVED*****REMOVED*****REMOVED***
        connection
  ***REMOVED***
);
const slonik = require('slonik');
const siqc = require('slonik-interceptor-query-cache');
const parsing24 = require('./test/news24Parser');
const parsing = require('./test/parsing');
const aboutRoutes = require('./routes/about');
const indexRoutes = require('./routes/index');
const CacheService = require('./models/cacheModel');

const { createQueryCacheInterceptor ***REMOVED*** = siqc;
const { createPool ***REMOVED*** = slonik;
const sql = slonik.createSqlTag;
const options = {
    interceptors: [
        createQueryCacheInterceptor({
            storage: {
                get: (query) =>
                    // console.log("Returning cached item:",query)
                     cache.get(hashQuery(query)) || null,
                set: (query, cacheAttributes, queryResult) => {
                    // console.log('Setting cache:',query, queryResult, cacheAttributes.ttl)
                    cache.set(hashQuery(query), queryResult, cacheAttributes.ttl);
    ***REMOVED*****REMOVED*****REMOVED***
***REMOVED*****REMOVED*****REMOVED***
      ***REMOVED***),
***REMOVED***
***REMOVED***;
const hashQuery = (query) => JSON.stringify(query);
const pool = createPool(connection, options);

// Required Routes
app.use((req, res, next) => {
    res.locals.knex = knex;
    res.locals.cache = cache;
    res.locals.pool = pool;
    res.locals.sql = sql;
    next();
***REMOVED***);

console.log('DELETING OLD CACHE');
cache.del('data');
cache.flushAll();

app.use('/', indexRoutes);
app.use('/about', aboutRoutes);

app.get('/loaderio-7d6b780c491333bbfc06f6c5bdc20309.txt', (req, res) => {
    res.sendFile('loaderio-7d6b780c491333bbfc06f6c5bdc20309.txt');
***REMOVED***);

// Government Notification
app.get('/governmentCheck/:type?', async (req, res) => res.status(200).json({ message: 'Get Working' ***REMOVED***));
app.post('/governmentCheck/:type?', async (req, res) => {
    const type = req.params.type ? req.params.type
        : req.get('type') ? req.get('type') : null;

//     console.log("TYPE:",type)
//     console.log("Subject:",req.body.subject)
//     console.log("Date:",req.body.Date)
//     console.log("Content (body-html):",req.body["body-html"])
//     console.log("Content (body-plain):",req.body["body-plain"])


    let text; let date; let workingText;
    if (req.body['X-Mailgun-Incoming']) {
        console.log('MailGun Hook');
        console.log('Type:', type);
        // type = "mailGun"
  ***REMOVED***
    if ((type && type === 'mailGun') || req.body['X-Mailgun-Incoming']) {
        [text, date] = req.body['body-html'].trim().match(/<p.*?class[\s\S]*?<\/p>/g);

        console.log('Text BEFORE:', text);
        console.log('Date BEFORE:', date);
        text = text.replace(/(\r\n)/g, ' ').split('>')[1].split('<')[0].split(':')[1];
        date = date.split('>')[1].split('<')[0].split(':')[1];
        console.log(text, '\n', date);
         workingText = text.match(/today[\s\S]*?number[\s\S]*?covid.*?19[\s\S]*?cases[\s\S]*?\d[\s?\d]*/i) || null;
        if (workingText) {
            workingText = workingText[0];

            console.log('Sending Response:', { response: { text, date ***REMOVED*** ***REMOVED***);
            res.status(200).json({ message: 'Good Respons', response: { text, date ***REMOVED*** ***REMOVED***);
      ***REMOVED***
  ***REMOVED*** else if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' ***REMOVED***);
  ***REMOVED*** else {
        // verify auth credentials
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const [username, password] = Buffer.from(base64Credentials, 'base64').toString('ascii').split(':');
        if (username === process.env.ZAPIER_USER && password === process.env.ZAPIER_PASSWORD) {
            // TODO Scheduler : Parser ---> Parser24, until vail OR until xx:xx am?
            text = req.body.text;
            date = req.body.date;
            return res.status(200).json({ message: 'Valid Authentication Credentials', response: { text, date ***REMOVED*** ***REMOVED***);
      ***REMOVED***
            return res.status(401).json({ message: 'Invalid Authentication Credentials' ***REMOVED***);
  ***REMOVED***
    console.log('NOT SENDING?:', { response: { text, date ***REMOVED*** ***REMOVED***);
    return res.status(200).json({
        response: { text, date ***REMOVED***
***REMOVED***);
***REMOVED***);

app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => {
    console.log(`Rona-Tracker Server running on ${port***REMOVED***`);
***REMOVED***);

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code***REMOVED***`);
***REMOVED***);

const job2 = new CronJob('0***REMOVED***/5 19-23***REMOVED******REMOVED******REMOVED***', async function () {
    const d = moment();
    const daddy24 = this;
    console.log('CronJob 2 - Calling Parsing24:', d.toString());
    await parsing24().then((res) => {
        console.log('Res 2', res);
        if (res === true) {
            console.log('Stopping Cron 2?');
            daddy24.stop();
            console.log('Done Cron 2');
      ***REMOVED*** else {
            console.log('Continue with Cron 2');
      ***REMOVED***
  ***REMOVED***);
***REMOVED***);
const mainJob = new CronJob('0***REMOVED***/15 17-23***REMOVED******REMOVED******REMOVED***', (() => {
    const d2 = moment();

    const job1 = new CronJob('0***REMOVED***/5 19-23***REMOVED******REMOVED******REMOVED***', async function () {
        const d = moment();
        const daddy = this;
        console.log('CronJob 1 - Calling Parsing:', d.toString());
        await parsing()
            .then(async (res) => {
                console.log('Res', res);
                if (res === true) {
                    console.log('Stopping Cron 1?');
                    daddy.stop();
                    console.log('Done Cron 1');
                    console.log('Staring Job 2');
                    job2.start();
                    const res = await parsing24();
                    if (res === true) {
                        console.log('Stopping Job 2');
                        job2.stop();
                        console.log('Stopped Job 2');
                  ***REMOVED***
              ***REMOVED*** else {
                    console.log('Continue with Cron');
              ***REMOVED***
          ***REMOVED***
        );
  ***REMOVED***);
    job1.start();
    console.log('Job 1 Set at:', d2.toString());
***REMOVED***), () => console.log('Done Setting Jobs.'), true, 'Africa/Johannesburg');
