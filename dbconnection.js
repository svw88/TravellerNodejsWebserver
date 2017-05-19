var mysql=require('mysql');
var fs=require('fs');
var connection=mysql.createPool({

host:'35.184.118.220',
port:'3306',
user:'root',
password:'',
database:'demo',
ssl      : {
        ca   : fs.readFileSync('./ssl/server-ca.pem'), // should be enough for AWS
        key  : fs.readFileSync('./ssl/client-key.pem'), // required for google mysql cloud db
        cert : fs.readFileSync('./ssl/client-cert.pem'), // required for google mysql cloud db
  }


});
module.exports=connection;