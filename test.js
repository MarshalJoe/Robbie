// util modules
var schedule = require('node-schedule');
var util = require('util');
var natural = require('natural'),
  tokenizer = new natural.WordTokenizer();

// app logic
var bot = require("./bot.js")
var twitter = require('./tweet.js');

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

var text = "blah blah food yeah sxsw";

// RegExes
var statsRE = /^stats/;
var statisticsRE = /statistics/;
var priceRE = /^price$/;
var numberRE = /^number$/;
var todayRE = /^today$/;
var yesterdayRE = /^yesterday$/;
var sxswRE = /sxsw/;
var SXSWRE = /SXSW/;

bot.searchMLS();

// if (matchRE(statisticsRE, text) || matchRE(statsRE, text)) {
// 	if (matchRE(priceRE, text)) {
// 		console.log("price hit");
// 		if (matchRE(todayRE, text)) {
// 			console.log("today hit");
// 		} else if (matchRE(yesterdayRE, text)) {
// 			console.log("yesterday hit");
// 		} else {
// 			console.log("What time range?")
// 		}
// 	} else if (matchRE(numberRE, text)) {
// 		console.log("number hit");
// 		if (matchRE(todayRE, text)) {
// 			console.log("today hit");
// 		} else if (matchRE(yesterdayRE, text)) {
// 			console.log("yesterday hit");
// 		} else {
// 			console.log("What time range?")
// 		}
// 	} else {
// 		console.log("What kind of stat would you like?");
// 	}
// } else if (matchRE(sxswRE, text)|| matchRE(SXSWRE, text)) {
// 	console.log("party rec");
// } else {

// }













