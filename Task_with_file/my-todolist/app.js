var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');
var app = express();
// var buf = new Buffer(1024);
var id,id1=0;
 var arr=[],arr1=[],arr2=[],array1=[];
/* Using the sessions */
app.use(session({secret: 'todotopsecret'}))

/* If there is no to do list in the session, 
we create an empty one in the form of an array before continuing */
.use(function(req, res, next){
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
    if(fs.existsSync('input.txt'))
    {
        fs.open('input.txt','r+',function(err,fd){
            if(err){console.error(err);
        }
            this.fd=fd;})
    }
    next();
})

/* The to do list and the form are displayed */
.get('/todo', function(req, res) {
    if(fs.existsSync('input.txt'))
    {
     //   console.log(buf.slice(data.toString()));

        /*fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }
            console.log(bytes + " bytes read");
// Print only read bytes to avoid junk.
            if (bytes > 0) {

                console.log(buf.slice(0, bytes).toString());*/
//var data=fs.readFileSync('input.txt');
            var array = fs.readFileSync('input.txt').toString().split("\n");
            console.log(array.length);
                console.log("data of file");
                //array1=array;
                if(array.length>0)
                {
                for(var i=0;i<array.length-1;i++) {
                     var cells=array[i].split(",");
                        console.log(i+","+cells[0]+","+cells[1]+","+cells[2]);
                        arr.push(cells[0]);
                        arr1.push(cells[1]);
                        arr2.push(cells[2]);
                }}
//console.log("changes");
//console.log(data[1].toString());

//console.log("changes");
                //for (var i = 0; i < arr.length - 1; i++) {
                    //console.log(arr[0]);
                   /* if(arr[1]!=undefined) {
                        console.log(arr[1]);
                    }*/
                //}
            }
        // });
    // }
    res.render('todo.ejs', {todolist:arr, priority: arr1, member:arr2});
})
    .get('/todo1', function(req, res) {
        res.render('todo1.ejs');
    })
/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '')
    {

        fs.appendFile('input.txt',req.body.newtodo+","+req.body.s1+","+req.body.taskassigned+"\n",function (err) {
            if(err)
            {
                console.error(err);
            }

        })
        //req.session.todolist.push(req.body.newtodo);
        //req.session.priority.push(req.body.s1);
        //req.session.member.push(req.body.taskassigned);

    }
    res.redirect('/todo');
})
    .post('/todo/update/', urlencodedParser, function(req, res) {
        var array = fs.readFileSync('input.txt').toString().split("\n");
        array1=array;
        array1[id]=req.body.updatedtodo+","+req.body.updatedpriority+","+req.body.updatedmember;
        fs.writeFile('input.txt',array1.join("\n"),function(err){console.log(err);});
        res.redirect('/todo');
    })
/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    var array = fs.readFileSync('input.txt').toString().split("\n");
    console.log(array.length);
    console.log("data of file");
    array1=array;
    if(array.length>0)
    {
        for(var i=0;i<array.length-1;i++) {
            var cells=array[i].split(",");
            console.log(i+","+cells[0]+","+cells[1]+","+cells[2]);
        }}
    if (req.params.id != '') {
        array1.splice(req.params.id,1);
    }
   /* for (var i in arr)
    {

        array1.push(arr[i]+","+arr1[i]+","+arr2[i]+"\n");
    }
    for (var i in array1)
    {
        console.log("the data of array1 is"+array1[i]);
    }*/
    fs.writeFile('input.txt',array1.join("\n"),function(err){console.log(err);});
    res.redirect('/todo');
})
    .get('/todo/update/:id', function(req, res) {
        id=req.params.id;
        id1=1;
        res.redirect('/todo1');
    })
/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){

if(id1==0)
{
    //req.session.todolist = [];
    res.redirect('/todo');
}
else
{
    res.redirect('/todo1');
}
})
.listen(8008);

