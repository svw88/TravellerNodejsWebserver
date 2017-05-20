var mysql = require('mysql');
var connection = mysql.createPool({

	user : 'root',
	password : '',
	database : 'demo'

});
module.exports = connection;
