require("dotenv").config();
const request = require("request-promise");
var Twit = require('twit')

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
};
var T = new Twit({
	consumer_key:         TWITTER_CONSUMER_KEY,
	consumer_secret:      TWITTER_CONSUMER_SECRET,
	access_token:         TWITTER_ACCESS_TOKEN,
	access_token_secret:  TWITTER_ACCESS_TOKEN_SECRET,
	timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
	strictSSL:            false,     // optional - requires SSL certificates to be valid.
})

const authorizationHeaders = {
	authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
};

exports.getBearerToken = function() {
	let user = process.env.TWITTER_CONSUMER_KEY;
	let	pass = process.env.TWITTER_CONSUMER_SECRET;
	console.log('User:',process.env.AWS_DB);
	console.log('Pass:',process.env.T_KEY);
	let basic = Buffer.from(`${user}:${pass}`).toString('base64');
	console.log('Basic:',basic);
	return request.post({
	uri: "https://api.twitter.com/oauth2/token?grant_type=client_credentials",
		headers:{
			"Authorization": 'Basic ' + basic,
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
		},
		body:JSON.stringify("grant_type=client_credentials"),
	json: true
});
};

exports.getWebhook = function() {
	return request.get({
		url: `${TWITTER_API_URL}/account_activity/all/${TWITTER_WEBHOOK_ENV}/webhooks.json`,
		headers: authorizationHeaders,
		json: true
	});
};

exports.createWebhook = function(webhookUrl) {
	return request.post({
	url: `${TWITTER_API_URL}/account_activity/all/${TWITTER_WEBHOOK_ENV}/webhooks.json`,
		oauth,
		form: {
		url: webhookUrl
	},
	json: true
});
};

exports.deleteWebhook = function(webhookId) {
	return request.delete({
		url: `${TWITTER_API_URL}/account_activity/all/${TWITTER_WEBHOOK_ENV}/webhooks/${webhookId}.json`,
		oauth
	});
};

exports.getSubscription = function() {
	return request.get({
		url: `${TWITTER_API_URL}/account_activity/all/${this.webhookEnv}/subscriptions.json`,
		oauth,
		json: true
	});
};

exports.createSubscription = function() {
	return request.post({
		url: `${TWITTER_API_URL}/account_activity/all/${TWITTER_WEBHOOK_ENV}/subscriptions.json`,
		oauth,
		json: true
	});
};

exports.deleteSubscription = function(userId) {
	return request.delete({
		url: `${TWITTER_API_URL}/account_activity/all/${this.webhookEnv}/subscriptions/${userId}.json`,
		headers: authorizationHeaders,
		json: true
	});
};

exports.newStream = function(userId,keywords){
	//
	//  filter the twitter public stream by the word 'mango'.
	//
	let params = { follow:userId,track: keywords};
	console.log('params:',params);
	var stream = T.stream('statuses/filter', params)
	stream.on('connected', function (response) {
		console.log('Twitter stream connected:');
	})
	
	stream.on('tweet', function (tweet) {
		let text = tweet.text;
		// console.log(tweet);
		// console.log(tweet.retweeted_status.extended_tweet.full_text);
		let found = text.match(/today[\s\S]*?number[\s\S]*?covid.*?19[\s\S]*?cases[\s\S]*?\d[\s?\d]*/i) || false; // The text is valid?
		console.log("\nNEW TWEET - Text Match:",found);
		console.log(text,'\n-',tweet.created_at)
		console.log('-',tweet.user.name,'- User Name Match:',tweet.user.name ==="Dr Zweli Mkhize", // User Names Match?
			'\n-',tweet.user.screen_name,'- Screen Name Match:',tweet.user.screen_name==="DrZweliMkhize") // Screen Names Match?
		if (tweet.user.screen_name==="DrZweliMkhize" || tweet.id==="844486678324658176"){ // Check the Username or UserId to make sure.
			console.log('########################################');
			console.log('We found it boys?',text);
			console.log('########################################');
		}
		// console.log(tweet);
	})
	stream.on('error', function (error) {
		console.log("\nNEW TWEET ERROR",error);

	})
	return Promise.resolve(stream);
}
