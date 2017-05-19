var mysql=require('mysql');
var connection=mysql.createPool({

host:'localhost',
user:'root',
password:'8888',
database:'demo'


});
module.exports=connection;