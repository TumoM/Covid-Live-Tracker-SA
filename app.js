var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser");
var path = require('path');

var indexRoutes = require("./routes/index");

let dbURL = process.env.DATABASEURL || "dbString";

var port = process.env.PORT || 3000; 

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