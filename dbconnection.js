var mysql = require('mysql');
var fs = require('fs');

var config = {
	user : 'root',
	password : '',
	database : 'demo'
};

config.socketPath = '/cloudsql/traveller-168120:us-central1:travellerdb';

var connection = mysql.createPool(config);
module.exports = connection; 