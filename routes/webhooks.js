var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const twitter = require("./twitter");

function createCrcResponseToken(crcToken) {
	const hmac = crypto
		.createHmac("sha256", process.env.TWITTER_CONSUMER_SECRET)
		.update(crcToken)
		.digest("base64");
	
	return `sha256=${hmac***REMOVED***`;
***REMOVED***

function getHandler(req, res) {
	const crcToken = req.query.crc_token;
	console.log('crcToken:',crcToken);
	if (crcToken) {
		res.status(200).send({
			response_token: createCrcResponseToken(crcToken)
		***REMOVED***);
	***REMOVED*** else {
		res.status(400).send({
			message: "Error: crc_token missing from request."
		***REMOVED***);
	***REMOVED***
***REMOVED***

function postHandler(req, res) {
	const body = req.body;
	console.log(body);
	res.status(200).json(body);
***REMOVED***


router.get("/", function (req, res) {
	getHandler(req, res);
***REMOVED***)

router.post("/", function (req, res) {
	postHandler(req, res);
***REMOVED***)


router.delete("/", function (req, res) {
	return twitter.getWebhook()
		.then(response => {
			const webhookId = response[0].id;
			twitter
				.deleteWebhook(webhookId)
				.then(response => {
					console.log("Successfully deleted webhook");
					res.status(200).json({message:'Successfully deleted webhook'***REMOVED***)
				***REMOVED***)
				.catch(error => {
					console.log(error.message);
					res.status(404).json({message:'Webook not found.'***REMOVED***)
				***REMOVED***);
		***REMOVED***)
		.catch(error => {
			console.log(error.message);
		***REMOVED***);
***REMOVED***)

router.get("/list",function (req,res) {
	twitter
		.getWebhook()
		.then(response => {
			console.log('Res',response);
			res.status(200).json({res:response***REMOVED***)
		***REMOVED***)
		.catch(error => {
			console.log(error.message);
			res.status(400).json(error)
		***REMOVED***);
***REMOVED***)

router.post("/new",function (req,res) {
	console.log('Adding new hook');
	twitter
		.createWebhook(req.body.url)
		.then(response => {
			console.log('Res',response);
			res.status(200).json({res:response***REMOVED***)
		***REMOVED***)
		.catch(error => {
			console.log(error.message);
			res.status(400).json(error)
		***REMOVED***);
***REMOVED***)

module.exports = router;
