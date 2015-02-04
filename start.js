var Bot = require("./newBot.js")
var schedule = require('node-schedule');
 
var rule = new schedule.RecurrenceRule();
rule.minute = 55;
 
var j = schedule.scheduleJob(rule, function(){
    Bot.runBot();
});

