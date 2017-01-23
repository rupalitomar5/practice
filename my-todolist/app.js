var express = require('express');
var multer=require('multer');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser');// Loads the piece of middleware for managing the settings
var mongoose=require('mongoose');
var validator=require('validator');
var fs= require('fs');
mongoose.connect('mongodb://localhost:27017/test');
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
 var arr=[],arr1=[],arr2=[],array1=[],array=[];
 var gfs;
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
    Task.find({},"-_id Todo",function(err,task){
        arr=task;
        for (var i in arr)
        {
            //console.log(arr[i]);
            var myo=new Object();
            myo=arr[i];
            arr1[i]=myo.Todo;
            //console.log(myo.Todo);
        }
        //console.log(arr[1]);
    }).skip(n).limit(m);
    Task.find({},"-_id Memberassigned",function(err,task){
        arr=task;
        for (var i in arr)
        {
            //console.log(arr[i]);
            var myo=new Object();
            myo=arr[i];
            array1[i]=myo.Memberassigned;
            //console.log(myo.Todo);
        }
        // res.json(task);
        //array1=task
    }).skip(n).limit(m);
    Task.find({},"_id",function(err,task){
        arr=task;
        for (var i in arr)
        {
            //console.log(arr[i]);
            var myo=new Object();
            myo=arr[i];
            array[i]=myo._id;
            //console.log(myo.Todo);
        }
        // res.json(task);
        //array1=task
    });

    Task.find({},"-_id Priority",function(err,task){

        arr=task;
        for (var i in arr)
        {
            //console.log(arr[i]);
            var myo=new Object();
            myo=arr[i];
            arr2[i]=myo.Priority;
            //console.log(myo.Todo);
        }
    }).sort({KEY:1}).skip(n).limit(m);

    Step.find({},"-_id Steps",function(err,step){
        arr=step.Steps;
        //console.log(arr);
        });
    res.render('todo.ejs',{todolist:arr1, priority: array1, member:arr2,index:array});
}
/*router.get('/file/:id',function(req,res){
    var pic_id = req.param('id');
    var gfs = req.gfs;

    gfs.files.find({filename: pic_id}).toArray(function (err, files) {

        if (err) {
            res.json(err);
        }
        if (files.length > 0) {
            var mime = 'image/jpeg';
            res.set('Content-Type', mime);
            var read_stream = gfs.createReadStream({filename: pic_id});
            read_stream.pipe(res);
        } else {
            res.json('File Not Found');
        }
    });
});*/
// router.all('/upload',function(req,res){
//     var dirname=require('path').dirname(__dirname);
//     var filename=req.files.file.name;
//     var type=req.files.file.mimetype;
//     var read_stream=fs.creeateReadStream(dirname+'/'+path);
//     var conn=req.conn;
//     var Grid=require('gridfs-stream');
//     Grid.mongo=mongoose.mongo;
//     gfs=Grid(conn.db);
//     var writestream=gfs.createWriteStream({
//         filename:filename
//     });
//     read_stream.pipe(writestream);
// });
/* The to do list and the form are displayed */
router.get('/todo', function(req, res) {
addme(0,10,res);
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
            if(err){return res.end("error uploading file")}
            res.end("file is uploaded");

        })
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
app.use(function(req, res, next){

if(id1==0)
{
    res.redirect('/api/todo');
}
else
{
    res.redirect('/api/todo1');
}
});

app.listen(8010);