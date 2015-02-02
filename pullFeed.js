module.exports = {
	pullDaily: function () {
		console.log("Pulling daily feed...");
		// Include RETS keys
		var retsKeys = require('./retsConfig.js')

		// Create RETS client
    	var client = require('rets-client').getClient(retsKeys.loginURL, retsKeys.user, retsKeys.pass);

    	// Connection success event
    	client.once('connection.success', function() {
        	console.log("RETS Server connection success!");
        	console.log("RETS version: " + client.retsVersion);
        	
    	});

	    // Connection failure event
	    client.once('connection.failure', function(error) {
	        console.log("connection to RETS server failed ~ %s", error);
	    });


	},
	pullWeekly: function () {
		console.log("Pulling weekly feed...");
	} 






}