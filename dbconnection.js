var mysql=require('mysql');
var fs=require('fs');
var connection=mysql.createPool({

socketPath:'traveller-168120:us-central1:travellerdb',
user:'root',
password:'',
database:'demo',



});
module.exports=connection;