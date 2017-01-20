var express=require('express');
var path=require('path');
var http=require('http');
var routes=require('./routes');
var connection=require('express-myconnection')
var employees=require('./routes/employees');
var app=express();
var mysql=require('mysql');
var db=require("../core/db");
var settings=require("../settings");
app.set('port',process.env.PORT||4300);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname,'public')));
if('development'==app.get('env')){
    app.use(express.errorHandler());
}
app.use(
    connection(mysql,settings.dbConfig,request)
);
app.get('/',routes.index);
app.get('/employees',employees.list);
app.get('/employees/add',employees.add);
app.get('/employees/add',employees.save);
app.get('/employees/edit/:id',employees.edit);
app.get('/employees/delete/:id',routes.delete_customer);
app.get('/employees/edit/:id',employees.save_edit);
app.use(app.router);
http.createServer(app).listen(4300)


// First you need to create a connection to the db

/*con.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
})

con.query('Select * from employees',function(err,rows){
    if(err)
        throw err;
    console.log('Data received from db\n');
    console.log(rows);
    for(var i=0;i<rows.length;i++)
    {
        console.log(rows[i].name);
    }
});
var employee = { name: 'Winnie', location: 'Australia' };
con.query('INSERT INTO employees SET ?', employee, function(err,res){
    if(err) throw err;

    console.log('Last insert ID:', res.insertId);
});
con.query(
    'UPDATE employees SET location = ? Where ID = ?',
    ["South Africa", 5],
    function (err, result) {
        if (err) throw err;

       // console.log('Changed ' + result.changedRows + ' rows');
    }
);
/*con.query(
    'DELETE FROM employees WHERE id = ?',
    [5],
    function (err, result) {
        if (err) throw err;

        console.log('Deleted ' + result.affectedRows + ' rows');
    }
);
con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
});*!/*/



