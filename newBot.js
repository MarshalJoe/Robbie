// Include Twitter API
var Twitter = require("./tweet.js")

// Include RETS credentials
var retsKeys = require('./retsConfig.js')

// Create RETS client and connect
var client = require('rets-client').getClient(retsKeys.loginURL, retsKeys.user, retsKeys.pass);

// On successful connection...
client.once('connection.success', function() {
	console.log("Connected to RETS server");
	console.log("RETS version: " + client.retsVersion);


	// Get residential fields 
    client.getTable("Property", "RESI");
    var fields;
		var yesterday;
    client.once('metadata.table.success', function(table) {

        fields = table.Fields;


        // Pass resource, class, and DQML query, get all residential homes sold Feb 1-2
        client.query("Property", "RESI", 
        "(StatusChangeTimestamp=2015-02-01-2015-02-02),(Status=S)", function(error, data) {
        	var dailyHomesTotal = [];

            if (error) {
                console.log(error);
                return;
            }

            // iterate through search results, print out the list prices and add 'em up. 
            for(var dataItem = 0; dataItem < data.length; dataItem++) {

                // for(var fieldItem = 0; fieldItem < fields.length; fieldItem++) {
                //     var systemStr = fields[fieldItem].SystemName;
                    var homePrice = parseInt(data[dataItem]["ListPrice"], 10);
                    dailyHomesTotal.push(homePrice);
                // }
            }

            var sum = dailyHomesTotal.reduce(function(a, b) { return a + b });
            var dailyHomesSold = data.length;

            console.log('$' + sum + ' in residential home transactions took place Feb 1-2.');
            console.log(dailyHomesSold + ' homes were sold Feb 1-2');
            //Twitter.postTweet('$' + sum + ' in residential home transactions took place Feb 1-2.');
            //Twitter.postTweet(dailyHomesSold + ' homes were sold Feb 1-2');
        });
            
    });

// end of RETS connection	
});