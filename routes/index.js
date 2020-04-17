var express = require("express");
var router = express.Router();


router.get("/", function (req, res) {
    // TODO Load data for the day.
    res.render("index",{data:"Tumo Was Here"});
})



module.exports = router;
