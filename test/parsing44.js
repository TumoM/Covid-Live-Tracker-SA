 // request is a peer dependency.
var rp = require("request-promise")
 const knex = require('knex')({
     client: 'pg',
     connection: {
         host : '127.0.0.1',
         user : 'test_user',
         password : 'temp_pass',
         database : 'covid-tracker-sa2'
     }
 });
const HTMLParser = require('node-html-parser')
let urlSA = "https://www.worldometers.info/coronavirus/country/south-africa/"
// let urlSA = "http://localhost:63343/Corvid-Live-Tracker-SA/test/graphs.html?_ijt=vr8qfhscqegh261ci8bd8la3eq"
let dict = {
    Feb:'02',
    Mar:'03',
    Apr:'04'
}
let answers = [];
rp(urlSA)
    .then(function (data) {
        /*
        const root = HTMLParser.parse(data);
        const table1 = root.querySelector(".col-md-12")
        table1.outerHTML;
        [title,style,div,script] = table1.childNodes
        // console.log(root.structuredText);*/
        // Process html...
        let date,totalCases,dailyNew,activeCases,totalDeaths, dailyDeaths,a,b
        [totalCases,a,dailyNew,activeCases,totalDeaths,b,dailyDeaths] = data.match(/data:.*?\[.*?]/g)
        dailyNew = dailyNew.replace(/null/g,0)
        let dateDates,totalCasesDates,dailyNewDates,activeCasesDates,totalDeathsDates, dailyDathsDates
        date = data.match(/categories:.*?\[.*?]/g)[0].replace(/"/g,"").match(/[A-Z][a-z]{2}\s.*\d{2}/)[0].split(',').reverse()
        a="",b="";
        totalCases = totalCases.match(/\d[\d,?]*/)[0].split(',').reverse()
        totalDeaths = totalDeaths.match(/\d[\d,?]*/)[0].split(',').reverse()
        activeCases = activeCases.match(/\d[\d,?]*/)[0].split(',').reverse()
        dailyNew = dailyNew.match(/\d[\d,?]*/)[0].split(',').reverse()
        dailyDeaths = dailyDeaths.match(/\d[\d,?]*/)[0].split(',').reverse()

        for (let i = 0; i < date.length; i++) {
            dates = date[i].split(" ");
            dates[0] = dict[dates[0]];
            dates.push(2020)
            date[i] = `${dates[2]}-${dates[0]}-${dates[1]}`
            answers.push({
                [date[i]]: {
                    date:date[i],
                        totalCases:totalCases[i],
                    totalDeaths:totalDeaths[i],
                    dailyNew:dailyNew[i],
                    dailyDeaths:dailyDeaths[i],
                    totalRecoveries:(totalCases[i]-activeCases[i]-totalDeaths[i]),
                    parsed:false,
                    maybeValid:false
                }
            }
            )
        }
        found = false;
        let answers2=[]
        let key;
        answers.forEach(k=> {
            key = Object.keys(k)[0]
            if (!found) {
                if (key === "2020-04-09") {
                    found = true
                }

                console.log(k)
            }
            else{
                console.log("pass")
            }
            answers2.push(k[key])
        })
        // knex.batchInsert('dates',answers2)
        answers2.forEach(row=>{
            knex('dates').insert(row)
                .then(value => {
                    console.log('Clean insert for',row['date'])
                })
                .catch(reason => {
                    knex('dates')
                        .update({dailyNew:row.dailyNew,dailyDeaths:row.dailyDeaths})
                        .where('date','=',row.date)
                        .then(value => {
                            console.log("Had to update daily:",row['date'])
                        })
                        .catch(reason1 => {
                            console.log("Some sort of error for:",row['date'])
                            console.log(reason1)
                        })
                })
        })
        console.log("swag")
    })
    .catch(function (err) {
        // Crawling failed...
        console.log(err)
    });