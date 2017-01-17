var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
    if (typeof(req.session.member) == 'undefined'){
        req.session.member=[];
    }
    next();
})

/* The to do list and the form are displayed */
.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist, priority: req.session.priority, member:req.session.member});
})
    .get('/todo1', function(req, res) {
        res.render('todo1.ejs');
    })
/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '')
    {
        req.session.todolist.push(req.body.newtodo);
        req.session.priority.push(req.body.s1);
        req.session.member.push(req.body.taskassigned);

    }
    res.redirect('/todo');
})
    .post('/todo/update/', urlencodedParser, function(req, res) {
        req.session.todolist[id]=req.body.updatedtodo;
        res.redirect('/todo');
    })
/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})
    .get('/todo/update/:id', function(req, res) {
        id=req.params.id;
        id1=1;
        res.redirect('/todo1');
    })
/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    if(id1==0) {
        //req.session.todolist = [];
        res.redirect('/todo');
    }
    else
    {
        res.redirect('/todo1');


    }
})
.listen(8008);