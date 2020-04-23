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

// Setup Persistance
app.use(require("express-session")({
    secret: process.env.SECRET || "swag",
    resave: false,
    saveUninitialized: false
}));


// Required Routes
app.use("/",indexRoutes);

app.get('/loaderio-7d6b780c491333bbfc06f6c5bdc20309.txt',(req,res) =>{
    res.sendFile("loaderio-7d6b780c491333bbfc06f6c5bdc20309.txt");
})

app.listen(port, function () {
    console.log(`Rona-Tracker Server running on ${port}`);
})