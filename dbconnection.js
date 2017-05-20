var mysql=require('mysql');
var fs=require('fs');
var connection=mysql.createPool({

username: 'root',
 password: '',
 database: 'demo',



});
module.exports=connection;