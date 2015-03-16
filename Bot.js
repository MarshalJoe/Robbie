module.exports = {
    searchMLS: function (typeOfHouse, dateRange, asker) {
        // include Twitter
        var twitter = require('./tweet.js');

        // util number function
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // rets date parser
        function parseRetsDate (date) {
            var rawMonth = date.getMonth() + 1
            var rawDay = date.getDate();
            var year = date.getFullYear();
            var month;
            var day;

            if (rawMonth < 10) {
                month = '0' + rawMonth;
            } else {
                month = rawMonth;
            }

            if (rawDay < 10) {
                day = '0' + rawDay;
            } else {
                day = rawDay;
            }

            formattedDate = year + '-' + month + '-' + day;
            return formattedDate;
        }

        // set up RETS connection
        var retsKeys = require('./retsConfig.js')
        var client = require('rets-client').getClient(retsKeys.loginURL, retsKeys.user, retsKeys.pass);
        var retsDate;
        var retsDateSearch;
        var retsYesterday;
        var retsToday;

        // Grab the appropriate date...
        if (dateRange == "today") {
            var rawDate = new Date;
            retsDate = parseRetsDate(rawDate);
            retsDateSearch = retsDate + '+';
            var twitterDate = retsDate;
        } else if (dateRange == "yesterday") {
            var today = new Date;
            var todayCopy = new Date;
            var yesterday = todayCopy.setDate(todayCopy.getDate() - 1);
            var someDate = new Date(yesterday);
            retsYesterday = parseRetsDate(someDate);
            retsToday = parseRetsDate(today);
            retsDateSearch = retsYesterday + '-' + retsToday;
            var twitterDate = retsYesterday;
        } else if (dateRange == "lastWeek" ) {
            var today = new Date;
            var todayCopy = new Date;
            var lastWeek = todayCopy.setDate(todayCopy.getDate() - 7);
            var someDate = new Date(lastWeek);
            retsLastWeek = parseRetsDate(someDate);
            retsToday = parseRetsDate(today);
            retsDateSearch = retsLastWeek + '-' + retsToday;
            var twitterDate = retsLastWeek + ' to ' + retsToday;
        }

        // ... and create a query that accurately reflects the housing type 
        if (typeOfHouse == "sold") {
            var houseTypeDesc = "sold for";
            var query = "(StatusChangeTimestamp=" + retsDateSearch + "),(Status=S)"; 
        } else if (typeOfHouse == "listed") {
            var houseTypeDesc = "listed at";
            var query = "(OriginalEntryTimestamp=" + retsDateSearch + ")"
        }

        // On successful RETS connection...
        client.once('connection.success', function() {

            // Get residential property fields 
            client.getTable("Property", "RESI");
            var fields;

            client.once('metadata.table.success', function(table) {

                fields = table.Fields;

                // Pass resource, class, and DQML query, get all residential homes sold today
                client.query("Property", "RESI", query, function(error, data) {
                    var dailyHomesTotal = [];

                    if (error) {
                        console.log(error);
                        return;
                    }

                    // Iterate through search results, print out the prices and add 'em up. 
                    for(var dataItem = 0; dataItem < data.length; dataItem++) {
                        var homePrice = parseInt(data[dataItem]["CurrentPrice"], 10);
                        dailyHomesTotal.push(homePrice);
                    }

                    // Calculate desired Metrics
                    var sum = dailyHomesTotal.reduce(function(a, b) { return a + b });
                    var dailyHomesSold = data.length;

                    // Post to Twitter
                    var content = '.@' + asker + ' ' + dailyHomesSold + ' res homes ' + houseTypeDesc + ' $' + numberWithCommas(sum) + ' ' +  twitterDate;
                    twitter.postTweet(content);
                    console.log(content)
                });


            });

          
        }); // end of RETS connection

    } // end of searchMLS()


} //end of export