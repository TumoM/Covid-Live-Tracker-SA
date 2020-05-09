require("dotenv").config();
const request = require("request-promise");

const TWITTER_API_URL = process.env.TWITTER_API_URL;
	const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET;
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const TWITTER_WEBHOOK_ENV = process.env.TWITTER_WEBHOOK_ENV;

const oauth = {
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	token: TWITTER_ACCESS_TOKEN,
	token_secret: TWITTER_ACCESS_TOKEN_SECRET
***REMOVED***;

const authorizationHeaders = {
	authorization: `Bearer ${TWITTER_BEARER_TOKEN***REMOVED***`
***REMOVED***;

console.log('OA:',oauth);
console.log('Bearer Header?:',authorizationHeaders);

exports.getBearerToken = function() {
	let user = process.env.TWITTER_CONSUMER_KEY;
	let	pass = process.env.TWITTER_CONSUMER_SECRET;
	console.log('User:',process.env.AWS_DB);
	console.log('Pass:',process.env.T_KEY);
	let basic = Buffer.from(`${user***REMOVED***:${pass***REMOVED***`).toString('base64');
	console.log('Basic:',basic);
	return request.post({
	uri: "https://api.twitter.com/oauth2/token?grant_type=client_credentials",
		headers:{
			"Authorization": 'Basic ' + basic,
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
		***REMOVED***,
		body:JSON.stringify("grant_type=client_credentials"),
	json: true
***REMOVED***);
***REMOVED***;

exports.getWebhook = function() {
	return request.get({
		url: `${TWITTER_API_URL***REMOVED***/account_activity/all/${TWITTER_WEBHOOK_ENV***REMOVED***/webhooks.json`,
		headers: authorizationHeaders,
		json: true
	***REMOVED***);
***REMOVED***;

exports.createWebhook = function(webhookUrl) {
	return request.post({
	url: `${TWITTER_API_URL***REMOVED***/account_activity/all/${TWITTER_WEBHOOK_ENV***REMOVED***/webhooks.json`,
		oauth,
		form: {
		url: webhookUrl
	***REMOVED***,
	json: true
***REMOVED***);
***REMOVED***;

exports.deleteWebhook = function(webhookId) {
	return request.delete({
		url: `${TWITTER_API_URL***REMOVED***/account_activity/all/${TWITTER_WEBHOOK_ENV***REMOVED***/webhooks/${webhookId***REMOVED***.json`,
		oauth
	***REMOVED***);
***REMOVED***;

exports.getSubscription = function() {
	return request.get({
		url: `${TWITTER_API_URL***REMOVED***/account_activity/all/${this.webhookEnv***REMOVED***/subscriptions.json`,
		oauth,
		json: true
	***REMOVED***);
***REMOVED***;

exports.createSubscription = function() {
	return request.post({
		url: `${TWITTER_API_URL***REMOVED***/account_activity/all/${TWITTER_WEBHOOK_ENV***REMOVED***/subscriptions.json`,
		oauth,
		json: true
	***REMOVED***);
***REMOVED***;

exports.deleteSubscription = function(userId) {
	return request.delete({
		url: `${TWITTER_API_URL***REMOVED***/account_activity/all/${this.webhookEnv***REMOVED***/subscriptions/${userId***REMOVED***.json`,
		headers: authorizationHeaders,
		json: true
	***REMOVED***);
***REMOVED***;

