var mysql = require('mysql');
var config = {
	user : process.env.MYSQL_USER,
	database : process.env.MYSQL_DATABASE
};

if (process.env.INSTANCE_CONNECTION_NAME) {
	config.socketPath = '/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}';
}
var connection = mysql.createPool(config);
module.exports = connection;
