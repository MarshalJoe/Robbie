// util modules
var schedule = require('node-schedule');
var util = require('util');
var natural = require('natural'),
  tokenizer = new natural.WordTokenizer();

// app logic
var bot = require("./bot.js")
var twitter = require('./tweet.js');
var asker = "JoeCharMar";

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

var text = "blah blah food yeah stats listed yesterday";

// RegExes
var statsRE = /^stats/;
var statisticsRE = /statistics/;
var soldRE = /^sold$/;
var listedRE = /^listed$/;
var todayRE = /^today$/;
var yesterdayRE = /^yesterday$/;
var sxswRE = /sxsw/;
var SXSWRE = /SXSW/;



if (matchRE(statisticsRE, text) || matchRE(statsRE, text)) {
	if (matchRE(soldRE, text)) {
		if (matchRE(todayRE, text)) {
			bot.searchMLS("sold", "today", asker);
		} else if (matchRE(yesterdayRE, text)) {
			bot.searchMLS("sold", "yesterday", asker);
		} else {
			console.log("Please include time range.")
		}
	} else if (matchRE(listedRE, text)) {
		if (matchRE(todayRE, text)) {
			bot.searchMLS("listed", "today", asker);
		} else if (matchRE(yesterdayRE, text)) {
			bot.searchMLS("listed", "yesterday", asker);
		} else {
			console.log("Please include time range.")
		}
	} else {
		console.log("What kind of statistic would you like?");
	}
} else if (matchRE(sxswRE, text)|| matchRE(SXSWRE, text)) {
	console.log("party rec");
} else {

}













