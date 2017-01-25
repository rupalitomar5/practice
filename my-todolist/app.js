var express = require('express');
var multer=require('multer');
var session = require('cookie-session');
var bodyParser = require('body-parser');// Loads the piece of middleware for managing the settings
var mongoose=require('mongoose');
var validator=require('validator');
var fs= require('fs');
mongoose.connect('mongodb://localhost:27017/test');
var user=require('./model/user');
//nick.save(function(err){console.log('user saved successfully')})
var morgan=require('morgan');
var jwt=require('jsonwebtoken');
var config=require('./config');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var fs = require('fs');
var app = express();
var Task=require('./model/task');
var Step=require('./model/step');
//console.log(Step);
var router=express.Router();
var ObjectId = require('mongodb').ObjectID;
// var buf = new Buffer(1024);
var id,id1=0;
 var arr=[],arr1=[],arr2=[],array1=[],array=[],arr3=[],arr4=[];
 var gfs;
 var token;
 //var myo=new Object();
/* If there is no to do list in the session, 
we create an empty one in the form of an array before continuing */
app.use('/uploads',express.static(__dirname+"/upload"));
var upload=multer({dest:"./uploads/"}).array('name',1);

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
});
function addme(n,m,res)
{
    //var addme=require("./Routes/addme")(n,m,res);
    Task.find({}, "-_id Todo", function (err, task) {
        arr = task;
        for (var i in arr) {
            //console.log(arr[i]);
            var myo = new Object();
            myo = arr[i];
            arr1[i] = myo.Todo;
            //console.log(myo.Todo);
        }
        //console.log(arr[1]);
    }).skip(n).limit(m);
    Task.find({}, "-_id Memberassigned", function (err, task) {
        arr = task;
        for (var i in arr) {
            //console.log(arr[i]);
            var myo = new Object();
            myo = arr[i];
            array1[i] = myo.Memberassigned;
            //console.log(myo.Todo);
        }
        // res.json(task);
        //array1=task
    }).skip(n).limit(m);
    Task.find({}, "_id", function (err, task) {
        arr = task;
        for (var i in arr) {
            //console.log(arr[i]);
            var myo = new Object();
            myo = arr[i];
            array[i] = myo._id;
            //console.log(myo.Todo);
        }
        // res.json(task);
        //array1=task
    });

    Task.find({}, "-_id Priority", function (err, task) {

        arr = task;
        //arr.forEach();
        for (var i in arr) {
            //console.log(arr[i]);
            var myo = new Object();
            myo = arr[i];
            arr2[i] = myo.Priority;
            //console.log(myo.Todo);
        }
    }).sort({KEY: 1}).skip(n).limit(m);
    //var Task=require('');

    Step.find({},"-_id Steps",function(err,step){
        arr=step.Steps;
        //console.log(arr);
        });
    res.render('todo.ejs',{todolist:arr1, priority: array1, member:arr2,index:array});
}
/*
/* The to do list and the form are displayed */
router.get('/todo', function(req, res,next) {
   // var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token)
    {
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'failed to authenticate token'})
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }else
    {}
addme(0,10,res);
});
router.get('/todo/login',function(req,res) {
    res.render('login.ejs');
});
router.post('/todo/login/', urlencodedParser,
    function(req,res){
    user.findOne({'name':req.body.member},function(err,user){
        console.log(user);
        if(!user)
        {                    res.json({success:false,message:'Authentication failed.user not found'})
        }

        else if(user){
            console.log(user);
            console.log(user.password);
            console.log(req.body.password);
            //req.session.name = user;
            //res.redirect('/todo/member');
            //res.json({success:false,message:'Authentication failed.user not found'});

            if(user.password!=req.body.password)
            {
                res.json({success:false,message:'Authentication failed.Wrong password'})
            }else{
                if(user.admin==true) {


                    var secret = config.secret;
                    console.log(secret);
                    var token1 = jwt.sign(user, app.get('superSecret'), {
                        expiresIn: 1440
                    });
                    token = token1;
                    res.redirect('/api/todo');
                }
                else{
                    res.redirect('/todo/member');
                }
            }
        }

        });
});
router.get('/todo/member',function(req,res){
    Task.find({'Memberassigned':req.session.name},"-_id Priority",function(err,task){
        arr = task;
        for (var i in arr) {
            //console.log(arr[i]);
            var myo = new Object();
            myo = arr[i];
            arr3[i] = myo.Priority;
            //console.log(myo.Todo);
        }
    });
    Task.find({'Memberassigned':req.session.name},"-_id Todo",function(err,task){
        arr = task;
        for (var i in arr) {
            //console.log(arr[i]);
            var myo = new Object();
            myo = arr[i];
            arr4[i] = myo.Todo;
            //console.log(myo.Todo);
        }
    });
    res.render("member.ejs",{prior:arr3,todo:arr4});
});
router.get('/todo/2', function(req, res) {
    addme(10,10,res);
});
router.get('/todo/3', function(req, res) {
    addme(20,10,res);
});
router.get('/todo1', function(req, res) {
        res.render('todo1.ejs');
    });
/* Adding an item to the to do list */
router.post('/todo/add/', urlencodedParser, function(req, res) {

    //console.log(step);
    if (req.body.newtodo != '') {
       // for(var i in req.body.)
        var task = new Task();
        var step= new Step();

        //console.log(req.body.hid);
        for (var i in req.body.hid)
        {
            var a=req.body.Step;
            //console.log(req.body.Step);
            step.Steps=a;
            //step.Todo=task.Todo;
        }
        task.Todo = req.body.newtodo;
        console.log(req.body.newtodo);
        task.File=req.body.name;
        task.Memberassigned = req.body.taskassigned;
        task.Priority = req.body.s1;
        step.Todo=task.Todo;
        step.save(function (err) {
            if (!err) {
                Step.find({})
                    .populate('Todo')
                    .exec(function(error, task) {
                        console.log(JSON.stringify(task, null, "\t"))
                    })
            }
            if (err) {
                console.log(err);
            }
            console.log(step);
        });
        upload(req,res,function(err){
            if(err) {
                return res.end(err);
                //res.end("error uploading file")}
                // res.end("file is uploaded");

            }
        }
        );
        task.save(function (err) {

            if (err) {
                console.log(err);
            }
            console.log(task);
        })
    }
    res.redirect('/api/todo');
});

    router.post('/todo/update/', urlencodedParser, function(req, res) {
        if(validator.isNumeric(req.body.updatedpriority)) {
        Task.findById(id,function(err,task) {
            console.log(id);
            if (err) {
                res.send(err);
            }
            task.Todo = req.body.updatedtodo;
            task.Memberassigned = req.body.updatedmember;
            task.Priority = req.body.updatedpriority;

            task.save(function (err) {
                if (err) {
                    throw err;
                }
                console.log(task);
                //res.json({message:'Bear updated!'});
            });
        }
        );
        res.redirect('/api/todo');
    }
    else
        {
            res.send("sorry no data updated");
            //alert("No data updated");
            res.redirect('/api/todo1')
        }});
router.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
    // load the single view file (angular will handle the page changes on the front-end)
});
/* Deletes an item from the to do list */
router.get('/todo/delete/:id', function(req, res) {

    console.log(req.params.id);
    id=req.params.id;
    Task.findByIdAndRemove(req.params.id,function(err,tasks){console.log(tasks);});

//Task.remove();
        //console.log(a);

    res.redirect('/api/todo');
    });

    router.get('/todo/update/:id', function(req, res) {

            id = req.params.id;
            id1 = 1;

        res.redirect('/api/todo1');
    });
/* Redirects to the to do list if the page requested is not found */
app.use('/api',router);
app.use(function(req, res, next) {
console.log(id1);
if(id1==0)
{
    router.route('/api/todo');
}
else
{
    res.redirect('/api/todo1');
}
//next();
});


app.set('superSecret',config.secret);
app.use(morgan('dev'));
app.listen(8010);