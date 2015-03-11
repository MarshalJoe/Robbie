var Bot = require("./Bot.js")
var schedule = require('node-schedule');
var util = require('util');
var Tweet = require('./tweet.js');

// Create a rule so that the Bot posts every day at 5pm 
// var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [new schedule.Range(0, 6)];
// rule.hour = 17;
// rule.minute = 0;

// Schedule Bot job 
// var j = schedule.scheduleJob(rule, function(){
//     Bot.runBot();
// });

// Start listening for mentions
// Tweet.streamTweets();

console.log("Running...");
