module.exports = {
	pullDaily: function () {
		console.log("Pulling daily feed...");
		// Create RETS client
		var RETS = require('rets');
		var retsKeys = require('./retsConfig.js')

		// Open RETS connection
		var client = RETS.createConnection({
		  host: retsKeys.host,
		  path: retsKeys.path,
		  user: retsKeys.user,
		  pass: retsKeys.pass
		});

		// Trigger on successful connection. 
		client.once( 'connection.success', function connected( client ) {
		  console.log( 'Connected to RETS as %s.', client.get( 'provider.name' ) )
		 
		});

		// Return an error on successful connection
		client.once( 'connection.error', function connection_error( error, client ) {
		  console.error( 'Connection failed: %s.', error.message );
		});



	},
	pullWeekly: function () {
		console.log("Pulling weekly feed...");
	} 






}