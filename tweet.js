module.exports = {
	postTweet: function (content) {
		var Twit = require('twit');

		var RealtorBot = new Twit(require('./config.js'));;

		RealtorBot.post('statuses/update', { status: content }, function(err, data, response) {
			//console.log('Message sent: ' + data.text);
		});
	},
	streamTweets: function () {
		var Twit = require('twit');

		var T = new Twit(require('./config.js'));;
		var stream = T.stream('statuses/filter', { track: '@ABoR_MLSstats' })

		stream.on('tweet', function (tweet) {
  			// greetings to respond to (in order to prevent spamming mentions)
  			var greetings = ["Hi", "hi", "Hello", "hello", "Hey", "hey"];

			for (index in greetings) {
			    if (tweet.text.indexOf(greetings[index]) !=-1) {
			        var content = greetings[index] + " @" + tweet.user.screen_name;
			    	T.post('statuses/update', { status: content }, function(err, data, response) {
						if (err) {
							console.log(err);
							return
						} else {
							console.log(data.text);
							return
						}	
					});
			    }
			}

			console.log(tweet.text);

		})
	}
}
