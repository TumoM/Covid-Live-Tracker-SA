const express = require('express');
const bodyParser = require('body-parser');
const https = require('https')

const app = express();
const PORT = process.env.PORT || 3001

const data = JSON.stringify({
    todo: 'Buy the milk'
})

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const request = require('request')

request.post('http://www.ronatracker.co.za/governmentCheck/twitter', {
    json: {
        todo: 'Buy the milk'
    }
}, (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
})
