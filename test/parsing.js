const HTMLParser = require('node-html-parser'),
    rp = require('request-promise'),
    Province = require("../models/provinceModel"),
    Death = require("../models/deathModel"),
    Day = require("../models/dayModel"),
    DbSetup = require("../test/db24");
const url = "https://sacoronavirus.co.za/category/press-releases-and-notices/";
const linkRegex = /.*\d{4}\/\d{2}\/\d{2}\/update-.*covid-.*20\d{2}\//
const regex = RegExp('.*\d{4}\/\d{2}\/\d{2}\/update-.*covid-.*20\d{2}\/', 'g');

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'test_user',
        password: 'temp_pass',
        database: 'covid-tracker-sa2'
    }
});


const PROVINCES = { // Name, [sick, dead]
    "GAUTENG": Province,
    "WESTERN CAPE": Province,
    "KWAZULU–NATAL": Province,
    "FREE STATE": Province,
    "EASTERN CAPE": Province,
    "LIMPOPO": Province,
    "MPUMALANGA": Province,
    "NORTH WEST": Province,
    "NORTHERN CAPE": Province,
    "UNALLOCATED": Province
}
let provincesList = []

rp(url)
    .then(function (html) {
        //success!
        console.log("success!!");
        //   console.log(html);
        const root = HTMLParser.parse(html);

        var entries = root.querySelectorAll(".entry-title.fusion-post-title a");
        var links = []

        entries.map((entry) => {
            let badString;
            // return entry.getAttribute("href").match(linkRegex)
            if (entry.getAttribute("href").match(linkRegex)) {
                // console.log("Found One!\n", entry.text);
                // console.log("Outer: ", entry.outerHTML);
                // console.log("Inner: ", entry.innerHTML);
                // console.log("Href: ", entry.getAttribute("href"), "\n");

                const DATE = entry.text.split("(")[1].split(")")[0];
                links.push(entry.getAttribute("href"))
                rp(entry.getAttribute("href"))
                    .then(function (html) {
                        console.log(DATE); // date
                        let tempDate = DATE.split(" ");
                        const d = new Date(`${tempDate[0].split(/\D+/)[0]}-${tempDate[1]}-${tempDate[2]}`);
                        knex('dates')
                            .where({date: d})
                            .then(rows => {
                                console.log("Row Count:", rows.length);
                                if (rows.length > 0 && rows[0].parsed) {

                                } else if (rows.length > 0 && rows[0].maybeValid) {
                                    // Maybe the format is all wrong. Parse another site/source?
                                } else if ((rows.length === 0) || (rows.length > 0 && !rows[0].error)) {
                                    const rootChild = HTMLParser.parse(html);
                                    // pull out the two tables 1st
                                    const tables = rootChild.querySelectorAll("table");
                                    const [table1, table2] = tables;
                                    try {
                                        if (tables.length === 0) {
                                            throw "No Tables\n"
                                        }
                                        const rootTable1 = HTMLParser.parse(table1.outerHTML);
                                        // Extracts the rows from each table
                                        const rowsTable1 = rootTable1.querySelectorAll("tr")

                                        // console.log(rowsTable1);
                                        let currentProvinces = Object.assign({}, PROVINCES);

                                        rowsTable1.forEach((row) => {
                                            row = row.text.split(" ");
                                            let name = "";
                                            let count = 0;
                                            row.forEach((index) => {
                                                if (index.match(/^\d+$/)) { // Checks that index value is a digit
                                                    count = Number(index)
                                                } else {
                                                    name += index + " " // Appends word and adds a space that was removed from split
                                                }
                                            })
                                            name = name.trim();
                                            name = name.match(/(KWAZULU)(\s?)+(.*)+(\s?)+(NATAL)/) ? "KWAZULU–NATAL" : name;
                                            let currentProvince = new Province(name, count);

                                            currentProvince.date = d;
                                            // Adds the province to the list
                                            currentProvinces[name] = currentProvince;


                                            // console.log(name,"-",count);
                                        })
                                        let tags = null;
                                        try { // pull out paragraph after 1st table
                                            tags = rootChild.querySelector(".post-content").childNodes;
                                            let tableFound = false; // A able has been found in the html.
                                            let parFound = false; // a valid value has been returned.
                                            let tests = tags.filter(tag => { // Filters out the paragraph tag after the 1st table.
                                                if (!tableFound) {
                                                    if (tag.tagName === "table") {
                                                        tableFound = true;
                                                    }
                                                } else if (!parFound) {
                                                    if (tag.text === "\n") { // Ignores newlines that may crop up.
                                                        return false;
                                                    }
                                                    parFound = true;
                                                    return tag;
                                                }
                                            });
                                            let testInt = "";
                                            let testArray = tests[0].text.match(/\s((\d+\s+)*\d+)/)[0].trim().split(" ");
                                            testArray.forEach(digit => {
                                                testInt += digit
                                            })
                                            testInt = parseInt(testInt);
                                            const rootTable2 = HTMLParser.parse(table2.outerHTML);
                                            const rowsTable2 = rootTable2.querySelectorAll("tr")
                                            delete rowsTable2[0]
                                            rowsTable2.forEach(row => {
                                                row = row.text.split(" ");
                                                row.shift();
                                                let name = "";
                                                let count = 0;
                                                let gender = "";
                                                row.forEach((index) => {
                                                    if (index.match(/^\d+$/)) { // Checks that index value is a digit
                                                        count = Number(index);
                                                    } else if (index !== "FEMALE" && index !== "MALE") {
                                                        name += index + " "; // Appends word and adds a space that was removed from split
                                                    } else {
                                                        gender = index;
                                                    }
                                                })
                                                name = name.trim();
                                                name = name.match(/(KWAZULU)(\s?)+(.*)+(\s?)+(NATAL)/) ? "KWAZULU–NATAL" : name;
                                                const death = new Death(name, gender, count);
                                                // console.log("Death:",death.toString());
                                                currentProvinces[name].dead.push(death);
                                                gender === "MALE" ? currentProvinces[name].men += 1 : gender === "FEMALE" ? currentProvinces[name].women += 1 : console.log("INVALID GENDER");
                                                currentProvinces[name].totalDead = currentProvinces[name].men + currentProvinces[name].women;


                                            })
                                            console.log("Done Table 2");
                                            // console.log(currentProvinces);
                                            for (const [key, value] of Object.entries(currentProvinces)) {
                                                // console.log(key);
                                                // console.log("Sick",value.sick);
                                                // console.log("Death Count:",value.totalDead);
                                                const date = value.date;

                                                let testNum = 0;
                                                badString = "";
                                                tests[0].text
                                                    .match(/\s((\d+\s+)*\d+)/)[0]
                                                    .trim()
                                                    .split(" ")
                                                    .forEach(word => {
                                                        badString += word
                                                    })
                                                // Inserts into Provinces table
                                                knex("provinceDays")
                                                    .insert({
                                                            provinceName: key, provDate:date,
                                                            caseCount: value.sick, deathCount: value.totalDead,

                                                        },
                                                        'id')
                                                    .then((id) => {
                                                        let provinceId = id[0];
                                                        // Todo Inserts into caseDates table
                                                        knex("caseDates")
                                                            .insert({
                                                                provinceId, caseDate: date,
                                                                caseCount: value.sick
                                                            }, "id")
                                                            .then(id => {
                                                                // console.log("ID:",id);
                                                            }).catch(err => {
                                                            console.log("Error with caseDates\n", err);
                                                        })
                                                        knex("deathDates")
                                                            .insert({
                                                                provinceId,
                                                                deathDate: date,
                                                                deathCount: value.totalDead,
                                                                deathMenCount: value.men,
                                                                deathWomenCount: value.women
                                                            }, ['id']).then(id => {
                                                            let deathDateId = id[0];
                                                            let parsedValues = [];
                                                            value.dead.forEach(deathDetails => {
                                                                parsedValues.push({
                                                                    deathDateId,
                                                                    provinceName: deathDetails.province,
                                                                    sex: deathDetails.sex,
                                                                    deathDate: date,
                                                                    age: deathDetails.age
                                                                });
                                                            });
                                                            if (parsedValues.length > 0) {
                                                                knex.batchInsert('deathPersons', parsedValues).catch(err => {

                                                                })
                                                            }
                                                        }).catch(err => {
                                                            console.log("Error with deathDates:\n", err)
                                                        })
                                                    })
                                                    .catch(err => {
                                                    // console.log("Passing: Province Day already inserted")
                                                });

                                            }


                                            console.log("TESTS:", (tests[0].text).match(/\s((\d+\s+)*\d+)/)[0].trim()); // Matches the string for for the test cases.
                                            // console.log("SEARCH DATE: ",`${tempDate[0].split(/\D+/)[0]}-${tempDate[1]}-${tempDate[2]}`)
                                            let parsedDate = d.toLocaleDateString().split("/")
                                            parsedDate = `${parsedDate[2]}-${parsedDate[0]}-${parsedDate[1]}`
                                            console.log("Parsed Date:",parsedDate)
                                            knex('dates')
                                                .select()
                                                .where('date','=',`${parsedDate[2]}-${parsedDate[0]}-${parsedDate[1]}`)
                                                .then(value => {
                                                    if (value.length === 0){
                                                        knex("dates ")
                                                        .insert({
                                                            date: parsedDate,
                                                            parsed: true,
                                                            totalTests: parseInt(badString),
                                                            maybeValid: false
                                                        })
                                                        .then(id => {
                                                                console.log("Inserted Dates:",parsedDate)
                                                            })
                                                        .catch(err => {
                                                                console.log("Day Error 1",err)
                                                            })
                                                        console.log("\n");
                                                    }
                                                }).catch(reason => {
                                                console.log("Unknown error:",reason)
                                            })
                                        } catch (e) {
                                            knex("dates ").insert({date: d, parsed: false})
                                                .then(id => {
                                                    //console.log(id)
                                                })
                                                .catch(err => {
                                                    console.log("Day Error 2")
                                                })
                                            throw 'No post?\n'
                                        }
                                    } catch (e) {
                                        console.log(e)
                                        // No table found error
                                        knex("dates ").insert({
                                            date: d,
                                            parsed: false,
                                            maybeValid: false,
                                            error: true
                                        })
                                            .then(id => {
                                                //console.log(id)
                                            })
                                            .catch(err => {
                                                console.log("Ignoring duplicates 1",err)
                                            })
                                    }
                                }

                            }).catch((e) => {
                            console.log(e)
                        })


                    }).catch(err => {
                    console.log('Some error:', err)
                });
            }
        })
        // Pull the stats off a URL
    })
    .catch(function (err) {
        console.log(err)
    });
const upsert = (params) => {
    const {table, object} = params;
    const insert = knex(table).insert(object);
    const update = knex.queryBuilder().update(object);
    return knex.raw(`? ON CONFLICT ignore returning *`, [insert]).get('rows').get(0);
};
// console.log("ProvincesList:",JSON.stringify(provincesList,null,2));