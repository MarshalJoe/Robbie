// Include Twitter API
var Twitter = require("./tweet.js")

// Include RETS credentials
var retsKeys = require('./retsConfig.js')

// Create RETS client and connect
var client = require('rets-client').getClient(retsKeys.loginURL, retsKeys.user, retsKeys.pass);

// On successful connection...
client.once('connection.success', function() {
    client.getTable("Property", "RESI");

    client.once('metadata.table.success', function(data) {
        console.log(data.Version);
        console.log(data.Date);
        console.log(data.Resource);
        console.log(data.Class);

        for(var tableItem = 0; tableItem < data.Fields.length; tableItem++) {
            console.log(data.Fields[tableItem].MetadataEntryID);
            console.log(data.Fields[tableItem].SystemName);
            console.log(data.Fields[tableItem].ShortName);
            console.log(data.Fields[tableItem].LongName);
            console.log(data.Fields[tableItem].DataType);
        }

    });
});