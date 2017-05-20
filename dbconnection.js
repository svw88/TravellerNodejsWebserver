var mysql=require('mysql');
var fs=require('fs');
var connection=mysql.createPool({

 user: 'root',
 password: '',
 database: 'demo',
 dialect: 'mysql',
 dialectOptions: {
 socketPath: '/cloudsql/traveller-168120:us-central1:travellerdb'
 },



});
module.exports=connection;