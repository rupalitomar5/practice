var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser');// Loads the piece of middleware for managing the settings
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var fs = require('fs');
var app = express();
var Task=require('./model/task');
var router=express.Router();
// var buf = new Buffer(1024);
var id,id1=0;
 var arr=[],arr1=[],arr2=[],array1=[];
 var myo=new Object();
/* If there is no to do list in the session, 
we create an empty one in the form of an array before continuing */
app.use(function(req, res, next){
    arr=[];
    arr1=[];
    arr2=[];


    if (typeof(arr2) == 'undefined') {
        arr2 = [];}
        if (typeof(arr) == 'undefined'){
        arr=[];
    }
    if (typeof(arr1) == 'undefined'){
        arr1=[];
    }

    next();
})

/* The to do list and the form are displayed */
router.get('/todo', function(req, res) {
Task.find(function(err,task){myo=JSON.parse(res.json(task));});
    res.render('todo.ejs');
    //, {todolist:arr, priority: arr1, member:arr2});
})
    router.get('/todo1', function(req, res) {
        res.render('todo1.ejs');
    })
/* Adding an item to the to do list */
router.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        var task = new Task();
        task.Todo = req.body.newtodo;
        task.Memberassigned = req.body.taskassigned;
        task.Priority = req.body.s1;
        task.save(function (err) {
            if (err) {
                console.log(err);
            }
            console.log(task);
        })
    }
    res.redirect('/todo');
})
    .post('/todo/update/', urlencodedParser, function(req, res) {
        Task.findById(id,function(err,task)
        {
            console.log(id);
            if(err)
            {
                res.send(err);
            }
            task.Todo=req.body.updatedtodo;
            task.Memberassigned=req.body.updatedmember;
            task.Priority=req.body.updatedpriority;

            task.save(function(err)
            {
                if(err) {
                    throw err;
                }
                console.log(task);
                //res.json({message:'Bear updated!'});
            });
        })
        res.redirect('/todo');
    })
/* Deletes an item from the to do list */
router.get('/todo/delete/:_id', function(req, res) {
    Task.remove(req.params.id);
    res.redirect('/todo');
});
    router.get('/todo/update/:id', function(req, res) {
        id=req.params.id;
        id1=1;
        res.redirect('/todo1');
    })
/* Redirects to the to do list if the page requested is not found */
app.use('/api',router);
app.use(function(req, res, next){

if(id1==0)
{
    res.redirect('/api/todo');
}
else
{
    res.redirect('/api/todo1');
}
})
app.listen(8008);

