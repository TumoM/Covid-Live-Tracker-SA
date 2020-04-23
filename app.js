const express     = require("express");
const app         = express();
// Enable the app-wide scout middleware

const dotenv = require('dotenv');
dotenv.config();
const bodyParser  = require("body-parser");
const path = require('path');

const indexRoutes = require("./routes/index");

let dbURL = process.env.DATABASEURL || "dbString";

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


let connection = process.env.DATABASE_URLL || {
    host: process.env.PG_HOST||'127.0.0.1',
    user: process.env.PG_USER||'test_user',
    password: process.env.PG_PASS||'temp_pass',
    database: process.env.DB_NAME||'covid-tracker-sa2',
    ssl:process.env.PORT?true:false
}

console.log("Connection:",connection)
const knex = require('knex')({
        client: 'pg',
        debug: true,
        asyncStackTraces: true,
    ssl:true,
        connection
    }
)

// Required Routes
app.set('knex', knex);
app.use(function(req,res, next) {
    res.locals.knex = knex;
    next();
});

app.use("/",indexRoutes);

app.get('/loaderio-7d6b780c491333bbfc06f6c5bdc20309.txt',(req,res) =>{
    res.sendFile("loaderio-7d6b780c491333bbfc06f6c5bdc20309.txt");
})

// Government Notification
app.post('/governmentCheck/:type?',async (req,res) =>{
    let type = req.params.type? req.params.type:
        req.get("type")? req.get("type"): null;
    console.log("##################################################################################")
    console.log("TYPE:",type)
    console.log("Auth:",req.headers.authorization)
    console.log("Data:",req.data)
    console.log("Body:",req.body)
    console.log("##################################################################################")
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const [username, password]  = Buffer.from(base64Credentials, 'base64').toString('ascii').split(":");
    if (username===process.env.ZAPIER_USER && password===process.env.ZAPIER_PASSWORD) {
        return res.status(200).json({ message: 'Valid Authentication Credentials' });
    }
    else{
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }

})


app.listen(port, function () {
    console.log(`Rona-Tracker Server running on ${port}`);
})