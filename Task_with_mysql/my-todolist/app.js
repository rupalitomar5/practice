var express = require('express');
var session = require('cookie-session');
var mysql = require('mysql');

// Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connection  = require('express-myconnection');
var app = express();

var id,id1=0;
/* Using the sessions */
app.use(session({secret: 'todotopsecret'}))


/* If there is no to do list in the session, 
we create an empty one in the form of an array before continuing */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];}
        if (typeof(req.session.priority) == 'undefined'){
        req.session.priority=[];
    }
    next();
})
    app.use(
        connection(mysql,{
            host:'localhost',
            user:'root',
            password:'root',
            database:'mydb'
        },'pool')
    )

/* The to do list and the form are displayed */
.get('/todo', function(req, res) {
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM Task ORDER BY Priority',function(err,rows)
    {

        if(err)
            console.log("Error Selecting : %s ",err );

        res.render('todo.ejs',{data:rows});


    });
    });
   // res.render('todo.ejs');
})
    .get('/todo1', function(req, res) {
        res.render('todo1.ejs');
    })
/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
        req.session.priority.push(req.body.s1);

        req.getConnection(function (err, connection) {

            var data = {

                Todo: req.body.newtodo,
                priority: req.body.s1,
                Memberassigned:req.body.assigned

            };

            var query = connection.query("INSERT INTO Task set ? ", data, function (err, rows) {

                if (err)
                    console.log("Error inserting : %s ", err);

                res.redirect('/todo');

            });

            // console.log(query.sql); get raw query

        });

    }
})
    .post('/todo/update/', urlencodedParser, function(req, res) {
        req.getConnection(function (err, connection) {

            var data = {
                Todo: req.body.updatedtodo,
                Memberassigned: req.body.updatedmember,
                Priority: req.body.updtprior
            };
            connection.query("UPDATE Task set ? WHERE id = ? ",[data,id], function(err, rows)
            {

                if (err)
                    console.log("Error Updating : %s ",err );

                res.redirect('/todo');

            });


            // console.log(query.sql); get raw query

        });
       // req.session.todolist[id]=req.body.updatedtodo;
        //res.redirect('/todo');
    })
/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    var id2 = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM Task  WHERE id = ? ",[id2], function(err, rows)
        {

            if(err)
                console.log("Error deleting : %s ",err );

            res.redirect('/todo');

        });

    });
    //res.redirect('/todo');
})
    .get('/todo/update/:id', function(req, res) {
        id=req.params.id;
        id1=1;
        res.redirect('/todo1');
    })
/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    if(id1==0) {
        res.redirect('/todo');
    }
    else
    {
        res.redirect('/todo1');
    }
})
.listen(8001);