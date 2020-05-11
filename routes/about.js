var express = require("express");
var router = express.Router();


const hashQuery = (query) => {
    return JSON.stringify(query);
};
const unhashQuery = (query) => {
    return JSON.parse(query);
};
router.get("/", async function (req, res) {
    const knex = res.locals.knex;
    const cache = res.locals.cache;
    const pool = res.locals.pool;
    res.json({message:"Welcome to the about page."})

})

module.exports = router;
