var mysql=require('mysql');
var fs=require('fs');
var connection=mysql.createPool({

username: 'root',
 password: '',
 database: 'demo',
 host: 'localhost',
 dialect: 'mysql',
 dialectOptions: {
 socketPath: '/cloudsql/{projectName}:{zone}:{instance-name}'
 },



});
module.exports=connection;