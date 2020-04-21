const express     = require("express");
const scout = require("@scout_apm/scout-apm");
const app         = express();
    // Enable the app-wide scout middleware
    // app.use(scout.expressMiddleware({
    //     config: {
    //         allowShutdown: true, // allow shutting down spawned scout-agent processes from this program
    //         monitor: process.env.SCOUT_MONITOR||false, // enable monitoring
    //         name: process.env.SCOUNT_NAME||null,
    //         key: process.env.SCOUT_KEY || null,
    //   ***REMOVED***
    //     logFn: scout.consoleLogFn,
    // ***REMOVED***));
const bodyParser  = require("body-parser");
const path = require('path');

const indexRoutes = require("./routes/index");

let dbURL = process.env.DATABASEURL || "dbString";

const port = process.env.PORT || 3000;

// Setup Express/App
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
***REMOVED***));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));

// Setup Persistance
app.use(require("express-session")({
    secret: process.env.SECRET || "swag",
    resave: false,
    saveUninitialized: false
***REMOVED***));


// Required Routes
app.use("/",indexRoutes);


app.listen(port, function () {
    console.log(`Rona-Tracker Server running on ${port***REMOVED***`);
***REMOVED***)