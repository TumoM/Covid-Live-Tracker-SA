const express = require('express');
const bodyParser = require('body-parser');
const https = require('https')

const app = express();
const PORT = process.env.PORT || 3001

const data = JSON.stringify({
    todo: 'Buy the milk'
***REMOVED***)

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
  ***REMOVED***
***REMOVED***


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true ***REMOVED***));

const request = require('request')

request.post('http://www.ronatracker.co.za/governmentCheck/twitter', {
    json: {
        todo: 'Buy the milk'
  ***REMOVED***
***REMOVED***, (error, res, body) => {
    if (error) {
        console.error(error)
        return
  ***REMOVED***
    console.log(`statusCode: ${res.statusCode***REMOVED***`)
    console.log(body)
***REMOVED***)
