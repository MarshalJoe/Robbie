// Take care of major dependencies...
var Twit = require('twit');

// Include config information (seperated to prevent commiting API keys)
var twilioKeys = require('./twilioConfig.js');
var data = require('./pullFeed.js');

data.pullDaily();

// var RealtorBot = new Twit(require('./config.js'));

//require the Twilio module and create a REST client
// var client = require('twilio')(twilioKeys.account_SID, twilioKeys.auth_token);

//Send an SMS text message
// client.messages.create({ 
// 	to: "15127883680", 
// 	from: "+15125808257", 
// 	body: "Ahoy hoy!",   
// }, function(err, message) { 
// 	console.log(message.sid); 
// });


// function postUpdate() {
// 	var time = Date.now().toString();
// 	var content = "Test message sent at " + time;
// 	RealtorBot.post('statuses/update', { status: content }, function(err, data, response) {
//   		console.log('Message "' + data.text + '" sent at ' + time);
// 	});
// }

// // Tweet at program launch
// postUpdate();

// // Post the time every three minutes
// setInterval(postUpdate, 1000 * 60 * 3);