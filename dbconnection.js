var mysql=require('mysql');
var fs=require('fs');
var connection=mysql.createPool({

username: 'root',
 password: '',
 database: 'demo',
 host: 'traveller-168120:us-central1:travellerdb'



});
module.exports=connection;