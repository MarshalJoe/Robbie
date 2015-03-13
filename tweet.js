module.exports = {
	postTweet: function (content) {
		var Twit = require('twit');

		var RealtorBot = new Twit(require('./config.js'));;

		RealtorBot.post('statuses/update', { status: content }, function(err, data, response) {
			if (err) {
				console.log(err);
				return;
			}
		});
	},
	streamTweets: function () {
		// util functions
		function matchRE (re, text) {
			var wordArray = tokenizer.tokenize(text);
			for(var i=0;i < wordArray.length;i++) {
				if (re.test(wordArray[i])) {
					return true;
				}
			}
			return false; 
		}

		function postTweet (content) {
			twitter.post('statuses/update', { status: content }, function(err, data, response) {
				if (err) {
					console.log(err);
					return;
				}
			});
		}

		var bot = require("./Bot.js")
		var Twit = require('twit');
		var twitInfo = require('./config.js');
		var twitter = new Twit(twitInfo);
		var natural = require('natural'),
		  tokenizer = new natural.WordTokenizer();

		

		var stream = twitter.stream('statuses/filter', { track: '@ABoR_MLSstats' })

		stream.on('tweet', function (tweet) {
			var asker = tweet.user.screen_name;
			var text = tweet.text;

			console.log(asker);
			console.log(text);

			// RegExes
			var greetinghiRE = /^hi$/;
			var greetingheyRE = /^hey$/;
			var statsRE = /^stats/;
			var statisticsRE = /statistics/;
			var soldRE = /^sold$/;
			var listedRE = /^listed$/;
			var todayRE = /^today$/;
			var yesterdayRE = /^yesterday$/;
			var weekRE = /^week$/;


			if (matchRE(statisticsRE, text) || matchRE(statsRE, text)) {
				if (matchRE(soldRE, text)) {
					if (matchRE(todayRE, text)) {
						bot.searchMLS("sold", "today", asker);
					} else if (matchRE(yesterdayRE, text)) {
						bot.searchMLS("sold", "yesterday", asker);
					} else if (matchRE(weekRE, text)) {
						bot.searchMLS("sold", "lastWeek", asker);
					} else {
						postTweet("@" + asker + " please include a time keyword [stats + today/yesterday/last week].")
					}
				} else if (matchRE(listedRE, text)) {
					if (matchRE(todayRE, text)) {
						bot.searchMLS("listed", "today", asker);
					} else if (matchRE(yesterdayRE, text)) {
						bot.searchMLS("listed", "yesterday", asker);
					} else if (matchRE(weekRE, text)) {
						bot.searchMLS("listed", "lastWeek", asker);
					} else {
						postTweet("@" + asker + " please include a time keyword [stats + today/yesterday/last week].")
					}
				} else {
					postTweet("@" + asker + " what kind of housing statistics would you like [sold, listed]?");
				}
			} else if (matchRE(greetinghiRE, text)|| matchRE(greetingheyRE, text)) {
				postTweet("Hi @" + asker + " ! Ask me a question (ex: What are the stats for houses sold yesterday?)")
			} else {

			}

		}) //end of stream
	} // end of function
} // end of export
