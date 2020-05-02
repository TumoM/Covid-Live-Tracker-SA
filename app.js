const express     = require("express");
// Require scout-apm after express, but before all other requires.
// const scout = require("@scout_apm/scout-apm");
const dotenv = require('dotenv');
/*scout.install(
    {
        allowShutdown: true, // allow shutting down spawned scout-agent processes from this program
        monitor: process.env.SCOUT_MONITOR || false, // enable monitoring
        name: process.env.SCOUT_NAME,
        key: process.env.SCOUT_KEY,
    },
);
// Enable the app-wide scout middleware
app.use(scout.expressMiddleware());*/
const app        = express();

const CacheService = require('./models/cacheModel');
// Enable the app-wide scout middleware
const bodyParser  = require("body-parser");
const path = require('path');
const indexRoutes = require("./routes/index");
const NodeCache = require('node-cache');

dotenv.config();

const ttl = 60 * 60 * 1; // cache for 1 Hour
// const cache = new CacheService({
//     checkperiod: 60,
//     maxKeys: 10000,
//     stdTTL: ttl,
//     useClones: false,
// });

const cache = new NodeCache({
    checkperiod: 60,
    maxKeys: 10000,
    stdTTL: ttl,
    useClones: false,
});

const port = process.env.PORT || 3000;

// Setup Express/App
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));

/*// Setup Persistance
app.use(require("express-session")({
    secret: process.env.SECRET || "swag",
    resave: false,
    saveUninitialized: false
}));*/

app.use(bodyParser.json());


let connection;
if (process.env.DBMODE && process.env.DBMODE === "herokuDB"){
    connection = process.env.DATABASE_URL
}
else{
    connection = process.env.AWS_CONNECTIONSTRING || {
        host:process.env.AWS_HOST|| process.env.PG_HOST||'postgres://127.0.0.1',
        user:process.env.AWS_USER|| process.env.PG_USER||'test_user',
        password:process.env.AWS_PASSWORD || process.env.PG_PASS ||'temp_pass',
        database:process.env.AWS_DB ||process.env.DB_NAME ||'covid-tracker-sa2'
    };
}

console.log("Connection:",connection)
const knex = require('knex')({
        client: 'pg',
        debug: true,
        asyncStackTraces: true,
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
const slonik = require('slonik');
const siqc = require("slonik-interceptor-query-cache")
const createQueryCacheInterceptor = siqc.createQueryCacheInterceptor
const createPool = slonik.createPool, sql = slonik.createSqlTag;
const options = {
    interceptors: [
        createQueryCacheInterceptor({
            storage: {
                get: (query) => {
                    // console.log("Returning cached item:",query)
                    return cache.get(hashQuery(query)) || null;
                },
                set: (query, cacheAttributes, queryResult) => {
                    // console.log('Setting cache:',query, queryResult, cacheAttributes.ttl)
                    cache.set(hashQuery(query), queryResult, cacheAttributes.ttl);
                },
            },
        }),
    ]
}
const hashQuery = (query) => {
    return JSON.stringify(query);
};
const unhashQuery = (query) => {
    return JSON.parse(query);
};
const pool = createPool(connection, options);

// Required Routes
app.use(function(req,res, next) {
    res.locals.knex = knex;
    res.locals.cache = cache;
    res.locals.pool = pool;
    res.locals.sql = sql;
    next();
});

app.use("/",indexRoutes);

app.get('/loaderio-7d6b780c491333bbfc06f6c5bdc20309.txt',(req,res) =>{
    res.sendFile("loaderio-7d6b780c491333bbfc06f6c5bdc20309.txt");
})

// Government Notification
app.get('/governmentCheck/:type?',async (req,res) =>{
            return res.status(200).json({ message: 'Get Working' });
    });
app.post('/governmentCheck/:type?',async (req,res) =>{
    let type = req.params.type? req.params.type:
        req.get("type")? req.get("type"): null;
    console.log("##################################################################################")
    console.log("TYPE:",type)
    console.log("Subject:",req.body.subject)
    console.log("Date:",req.body.Date)
    console.log("Content (body-html):",req.body["body-html"])
    console.log("Content (body-plain):",req.body["body-plain"])
    console.log("##################################################################################")

    let text,date,workingText;
    if (req.body["X-Mailgun-Incoming"]){
        console.log("MailGun Hook")
        // type = "mailGun"
    }
    if (type && type === "mailGun"){
        [text,date] = req.body["body-html"].trim().match(/<p.*class[\s\S]*?<\/p>/g);
        console.log("Text BEFORE:",text)
        console.log("Date BEFORE:",date)
        text = text.replace(/(\r\n)/g," ").split('>')[1].split("<")[0].split(':')[1]
        date = date.split('>')[1].split("<")[0].split(':')[1]
        console.log(text,'\n',date)
         workingText = text.match(/today[\s\S]*?number[\s\S]*?covid.?19[\s\S]*?cases[\s\S]*?\d[\s?\d]*/i) || null
        if (workingText){
            workingText = workingText[0]
        }
    }

    else if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }
    else{
        // verify auth credentials
        const base64Credentials =  req.headers.authorization.split(' ')[1];
        const [username, password]  = Buffer.from(base64Credentials, 'base64').toString('ascii').split(":");
        if (username===process.env.ZAPIER_USER && password===process.env.ZAPIER_PASSWORD) {
            // TODO Scheduler : Parser ---> Parser24, until vail OR until xx:xx am?
            text = req.body.text;
            date = req.body.date;
            return res.status(200).json({ message: 'Valid Authentication Credentials' });
        }
        else{
            return res.status(401).json({ message: 'Invalid Authentication Credentials' });
        }
    }
    console.log("workingText:",workingText);
    console.log("SENDING:",{ text, date});
    return res.status(200).json({ text, date});
})


app.listen(port, function () {
    console.log(`Rona-Tracker Server running on ${port}`);
})