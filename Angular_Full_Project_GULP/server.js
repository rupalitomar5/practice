var mongoose= require('mongoose');
var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var connection=require('./core/db');
var user=require('./Model/user');
var jwt= require('jsonwebtoken');
var urlencodedParser=bodyParser.urlencoded({extended:false});
var router=express.Router();
app.use(function(req,res,next){
   //validations
});

router.get('/user',function(req,res){
    res.render('add.html');
});
router.post('/user',data,function(req,res){

var user=new User();
user.name=req.body.name;
       // user.password=req.body.password;
        user.email=req.body.email;
        user.state=req.body.state;
        user.city= req.body.city;
            //user.File=req.body.
        //user.Dob=req.body.daterange
        user.Gender=req.body.gender;
        user.IsDeleted=req.body.active;
        user.save(function(err){
            if(!err)
            {console.log(err);}
        })
});
app.use('/dashboard',router);

app.use(function(req,res,next)
{
    res.redirect('/dashboard/user')
});
app.listen(3000);