const api = require("./twitter");

function run() {
	api
		.getBearerToken()
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.log(error.message);
		});
}

run();
