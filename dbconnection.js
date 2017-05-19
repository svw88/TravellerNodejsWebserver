var mysql=require('mysql');
var fs=require('fs');
var connection=mysql.createPool({

username: 'root',
 password: '',
 database: 'demo',
 host: '35.184.118.220',
 port: '3306',
 dialect: 'mysql',
 dialectOptions: {
 socketPath: '/cloudsql/traveller-168120:us-central1:travellerdb'
 },



});
module.exports=connection;