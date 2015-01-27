var Twit = require('twit');

var data = require('./pullFeed.js');

data.sayHello();

// var RealtorBot = new Twit(require('./config.js'));

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