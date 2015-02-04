module.exports = {
	postTweet: function (content) {
		var Twit = require('twit');

		var RealtorBot = new Twit(require('./config.js'));;

		RealtorBot.post('statuses/update', { status: content }, function(err, data, response) {
			console.log('Message sent: ' + data.text);
		});
	}
}
