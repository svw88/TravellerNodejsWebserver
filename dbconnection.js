var mysql = require('mysql');
var connection = mysql.createPool({

	user : 'root',
	database : 'demo',
	socketPath : '/cloudsql/traveller-168120:us-central1:travellerdb'

});
module.exports = connection;
