var express = require("express");
var router = express.Router();
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'test_user',
        password: 'temp_pass',
        database: 'covid-tracker-sa2'
    }
});


router.get("/", function (req, res) {
    // TODO Load data for the day.
    getSummary()
        .then(value => {
            console.log("Sending this var:",value)
            res.render("index",{data:value});

        })
})
let getSummary = function() {
    return knex('dates')
        .select('date',"totalCases","totalDeaths","totalTests","totalRecoveries")
        .whereNotNull("totalCases")
        .whereNotNull("totalDeaths")
        .whereNotNull("totalTests")
        .orderBy("date",'desc')
        .limit(1)
        .then(function(res1) {
            if (res1[0].totalRecoveries === null){
                return knex('dates')
                    .select('date','totalRecoveries')
                    .whereNotNull('totalRecoveries')
                    .limit(1)
                    .orderBy('date','desc')
                    .then(value => {
                        res1[0].date2 = value[0].date;
                        res1[0].totalRecoveries = value[0].totalRecoveries;
                        return res1[0]
                    })
            }
            else {
                return res1[0];
            }
        })
        .catch(reason => {
            console.log("You messed up?",reason)
        });
}



module.exports = router;
