var mongoose= require('mongoose');
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var multer=require('multer');
var connection=require('./core/db');
var user2=require('./Model/user');
var jwt= require('jsonwebtoken');
var urlencodedParser=bodyParser.urlencoded({extended:true});
var router=express.Router();
var user=new user2();
var ang=[];
var cors = require('express-cors');
var ObjectId = require('mongodb').ObjectID;

app.use(cors({
    allowedOrigins: [
        'http://localhost:3000', 'google.com'
    ]
}));
//var server = require('http').Server(app);
var id;
app.use(urlencodedParser);
app.use(bodyParser.json());

/*router.get('/user',function(req,res){
    //console.log("Hi");
});*/

router.get('/user/:id',function(req,res){

   id= req.params.id;
        user2.findById(id,function(err,user) {
                console.log(id);
                if (err) {
                    res.send(err);

                }
                res.json(user);
            }
        );
});
router.post('/user/:id',function(req,res){
    console.log("hi");
     user.name=req.body.name;
     user.email=req.body.email;
     user.state=req.body.state;
     user.city= req.body.city;
     user.Gender=req.body.gender;
     user.IsDeleted=req.body.active;
     user.save(function(err,user2){
     if(err)
     {console.log(err);}
         else{
        console.log("no err");
    }})
    res.sendStatus(200);
})
router.get('/user',function(req,res){

    user2.find({},function(err,users){
        if(!err){
          console.log(users);
          res.json(users)
        }
    });
});
router.delete('',function(req,res){
    id=req.params.id;
    user2.findByIdAndRemove(req.params.id,function(err,tasks){console.log(tasks);});
});

router.post('/user',function(req,res)
{
    console.log("Hi");
        user.name=req.body.name;
        user.email=req.body.email;
        user.state=req.body.state;
        user.city= req.body.city;
        user.Dob=req.body.daterange;
        user.Gender=req.body.gender;
        user.IsDeleted=req.body.active;
        user.save(function(err){
            if(err)
            {
                console.log(err);
            }
            else{
                console.log("no err");
            }
        });
        res.sendStatus(200);
    console.log("Its here");

});
app.use('/api',router);
app.listen(8001);

