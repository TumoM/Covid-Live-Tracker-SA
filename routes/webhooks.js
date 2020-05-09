var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const twitter = require("./twitter");

function createCrcResponseToken(crcToken) {
	const hmac = crypto
		.createHmac("sha256", process.env.TWITTER_CONSUMER_SECRET)
		.update(crcToken)
		.digest("base64");
	
	return `sha256=${hmac}`;
}

function getHandler(req, res) {
	const crcToken = req.query.crc_token;
	console.log('crcToken:',crcToken);
	if (crcToken) {
		res.status(200).send({
			response_token: createCrcResponseToken(crcToken)
		});
	} else {
		res.status(400).send({
			message: "Error: crc_token missing from request."
		});
	}
}

function postHandler(req, res) {
	const body = req.body;
	console.log(body);
	res.status(200).json(body);
}


router.get("/", function (req, res) {
	getHandler(req, res);
})

router.post("/", function (req, res) {
	postHandler(req, res);
})


router.delete("/", function (req, res) {
	return twitter.getWebhook()
		.then(response => {
			const webhookId = response[0].id;
			twitter
				.deleteWebhook(webhookId)
				.then(response => {
					console.log("Successfully deleted webhook");
					res.status(200).json({message:'Successfully deleted webhook'})
				})
				.catch(error => {
					console.log(error.message);
					res.status(404).json({message:'Webook not found.'})
				});
		})
		.catch(error => {
			console.log(error.message);
		});
})

router.get("/list",function (req,res) {
	twitter
		.getWebhook()
		.then(response => {
			console.log('Res',response);
			res.status(200).json({res:response})
		})
		.catch(error => {
			console.log(error.message);
			res.status(400).json(error)
		});
})

router.post("/new",function (req,res) {
	console.log('Adding new hook');
	twitter
		.createWebhook(req.body.url)
		.then(response => {
			console.log('Res',response);
			res.status(200).json({res:response})
		})
		.catch(error => {
			console.log(error.message);
			res.status(400).json(error)
		});
})

module.exports = router;
