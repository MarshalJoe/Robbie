var Twit = require('twit');

var RealtorBot = new Twit(require('./config.js'));


//  Tweet 'hello world!'

RealtorBot.post('statuses/update', { status: 'hello world, again!' }, function(err, data, response) {
  console.log(data)
});