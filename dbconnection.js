var mysql = require('mysql');
var connection = mysql.createPool('mysql://root:@/demo?unix_socket=/cloudsql/traveller-168120:us-central1:travellerdb');
module.exports = connection;
