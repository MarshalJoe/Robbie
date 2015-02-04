module.exports = {
    runBot: function () {
        // Include Twitter module
        var Twitter = require("./tweet.js")

        // Include RETS credentials
        var retsKeys = require('./retsConfig.js')

        // Create RETS client and connect
        var client = require('rets-client').getClient(retsKeys.loginURL, retsKeys.user, retsKeys.pass);

        // Grab current date...
        var rawDate = new Date;

        // ... and parse into a RETS-friendly format...
        var rawMonth = rawDate.getMonth() + 1;
        var rawDay = rawDate.getDay() + 1;
        var year = rawDate.getFullYear();

        if (rawMonth < 10) {
            var month = '0' + rawMonth;
        } else {
            var month = rawMonth;
        }

        if (rawDay < 10) {
            var day = '0' + rawDay;
        } else {
            var day = rawDay;
        }

        var retsDate = year + '-' + month + '-' + day
        console.log(retsDate);

        // ... and a Twitter-friendly one.
        var twitterDate = month + '/' + day + '/' + year;
        console.log(twitterDate);

        // On successful RETS connection...
        client.once('connection.success', function() {
            console.log("Connected to RETS server");
            console.log("RETS version: " + client.retsVersion);


            // Get residential property fields 
            client.getTable("Property", "RESI");
            var fields;

            // Format DMQL query for listings sold today
            var soldQuery = "(StatusChangeTimestamp=" + retsDate + "+),(Status=S)";    

            // Format DMQL query for listings posted today
            var listedQuery = "(OriginalEntryTimestamp=" + retsDate + "+)";

            client.once('metadata.table.success', function(table) {

                fields = table.Fields;

                // Pass resource, class, and DQML query, get all residential homes sold today
                client.query("Property", "RESI", soldQuery, function(error, data) {
                    var dailyHomesTotal = [];

                    if (error) {
                        console.log(error);
                        return;
                    }

                    // Iterate through search results, print out the list prices and add 'em up. 
                    for(var dataItem = 0; dataItem < data.length; dataItem++) {
                        var homePrice = parseInt(data[dataItem]["CurrentPrice"], 10);
                        dailyHomesTotal.push(homePrice);
                    }

                    // Calculate desired Metrics
                    var sum = dailyHomesTotal.reduce(function(a, b) { return a + b });
                    var dailyHomesSold = data.length;

                    // Post to Twitter
                    Twitter.postTweet('$' + sum + ' in residential home sales took place today, ' + twitterDate + '.');
                    Twitter.postTweet(dailyHomesSold + ' residential homes were sold today, ' + twitterDate + '.');
                });
                
                // Pass resource, class, and DQML query, get all residential homes added to the MLS today
                client.query("Property", "RESI", listedQuery, function(error, data) {
                    var dailyHomesTotal = [];

                    if (error) {
                        console.log(error);
                        return;
                    }

                    // Iterate through search results, print out the list prices and add 'em up. 
                    for(var dataItem = 0; dataItem < data.length; dataItem++) {
                        var homePrice = parseInt(data[dataItem]["CurrentPrice"], 10);
                        dailyHomesTotal.push(homePrice);
                    }

                    // Calculate desired metrics
                    var sum = dailyHomesTotal.reduce(function(a, b) { return a + b });
                    var dailyHomesAdded = data.length;

                    // Post to Twitter
                    Twitter.postTweet('$' + sum + ' in residential listings were added today, ' + twitterDate + '.');
                    Twitter.postTweet(dailyHomesAdded + ' homes were added today, ' + twitterDate + '.');
                });


            });

        // end of RETS connection   
        });
    // end of bot
    }

//end of export
}