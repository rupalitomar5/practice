var mongoose= require('mongoose');
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var connection=require('./core/db');
var user2=require('./Model/user');
var jwt= require('jsonwebtoken');
var urlencodedParser=bodyParser.urlencoded({extended:true});
var router=express.Router();
var user=new user2();
//var server = require('http').Server(app);
var id;
app.use(urlencodedParser);
app.use(bodyParser.json());
/*app.use(function(req,res,next){
   //validations
});*/
//console.log("Hi");
router.get('/user',function(req,res){
    console.log("Hi");
});
/*router.get('/user',function(req,res){
    res.render('add.html');
});*/

router.put('/user',function(req,res){
   // console.log("Hi");
   // if(validator.isNumeric(req.body.updatedpriority)) {
        User.findById(id,function(err,user) {
                console.log(id);
                if (err) {
                    res.send(err);
                }
            user.name=req.body.updatedname;
            // user.password=req.body.password;
            user.email=req.body.updatedemail;
            user.state=req.body.updatedstate;
            user.city= req.body.updatedcity;
            //user.File=req.body.
            //user.Dob=req.body.daterange
            user.Gender=req.body.updatedgender;
            user.IsDeleted=req.body.updatedactive;
            user.save(function(err,user2){
                if(!err)
                {console.log(err);}
            })
            }
        );
});
router.get('/',function(req,res){

res.json({message:'my scratch'});
});
router.delete('',function(req,res){
    id=req.params.id;
    Task.findByIdAndRemove(req.params.id,function(err,tasks){console.log(tasks);});
});

router.post('/user',function(req,res)
{
    console.log("Hi");
    //var user=new User();
        user.name=req.body.name;
        user.password=req.body.password;
        user.email=req.body.email;
        user.state=req.body.state;
        user.city= req.body.city;
        user.File=req.body.File;
        user.Dob=req.body.daterange
        user.Gender=req.body.gender;
        user.IsDeleted=req.body.active;
        user.save(function(err){
            if(err)
            {
                console.log(err);
            }
            else{
                res.json("done");
            }
        })
});
app.use('/api',router);

app.use(function(req,res,next)
{
    res.redirect('/user')
});
app.listen(8001);

