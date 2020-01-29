const request = require("request");

var positionGamer;
var positionToReach;
var requestT = {
	LIGHTUP : 0,
	LIGHTDOWN : 0,
	GETPOSITION : 0
}
// requestT = JSON.parse(requestT);

function behaviour(){
	setInterval(async function() {
		//Get positions
		getPosition();
		//Send order
		sendOrder();
	}, 100);
}

async function getPosition(){
	requestT.LIGHTUP = 0;
	requestT.LIGHTDOWN= 0;
	requestT.GETPOSITION = 1;
	
	// Ask serveur for the position min and max of the hole "{\"Y_Gamer\": ,\"Ymin_Hole\": , \"Ymax_Hole\": }" and calculate
	await request.post('http://127.0.0.1:8880', {form:requestT},
		function (error, response, body) {
			// console.log('error:', error); // Print the error if one occurred
			// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			// console.log('body:', body); // Print the HTML for the Google homepage.
			res = JSON.parse(body);
			positionGamer = res.Y_Gamer;
			positionToReach = Math.floor((res.Ymax_Gap - res.Ymin_Gap) / 2);
			// console.log("positionGamer : "+positionGamer);
			// console.log("positionToReach : " +positionToReach);
		});
}

async function sendOrder(){
	requestT.LIGHTUP = 0;
	requestT.LIGHTDOWN= 0;
	requestT.GETPOSITION = 0;
	
	if (positionGamer >= positionToReach){
		requestT.LIGHTUP = 1;
	} else {
		requestT.LIGHTDOWN = 1;		
	}
	
	await request.post('http://127.0.0.1:8880')
				.form(requestT)
				.on('response', function(response) {
					console.log(response.statusCode) // 200
					console.log("SALUT J'AI EU UNE REPONSE")
					});
}

getPosition();