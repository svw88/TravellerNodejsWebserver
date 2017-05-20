var mysql = require('mysql');
var connection = mysql.createPool({

	user : 'root',
	password : '',
	database : 'demo',
	dialect : 'mysql',
	socketPath : '/cloudsql/traveller-168120:us-central1:travellerdb'

});
module.exports = connection;
