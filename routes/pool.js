var mysql=require('mysql')
var pool=mysql.createPool(
    {
       host:'localhost',port:3307,
       user:'root',password:'@divyaBTS7',
       database:'supplier',connectionLimit:100,
       multipleStatements:true 
    });
    module.exports=pool;
