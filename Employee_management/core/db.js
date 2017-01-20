var sqlDb=require("mysql");
var settings=require("../settings");
exports.executeSql=function(sql,callback){
    var con = mysql.createConnection(settings.dbConfig);
    con.connect(function(err){
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
    }).then(function(){
        var req=new sqlDb.Request(con);
        req.query('Select * from employees').then(function(recordset){
            conn.close();
            callback(recordset);
        }).catch(function(err){
            console.log(err);
            callback(null,err);
        });
    })
};
