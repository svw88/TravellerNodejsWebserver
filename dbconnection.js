var mysql = require('mysql');
var connection = mysql.createPool({

	username : 'root',
	password : '',
	database : 'demo',
	socketPath : '/cloudsql/Traveller:us-central1:travellerdb'

});
module.exports = connection;
