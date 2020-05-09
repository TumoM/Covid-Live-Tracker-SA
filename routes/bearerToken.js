const api = require("./twitter");

function run() {
	api
		.getBearerToken()
		.then(response => {
			console.log(response);
		***REMOVED***)
		.catch(error => {
			console.log(error.message);
		***REMOVED***);
***REMOVED***

run();
