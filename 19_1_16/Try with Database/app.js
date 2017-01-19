/**
 * Created by lcom64 on 19/1/17.
 */
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var Bear=require('./model/bear');
// var User=require('./model/user');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var port=process.env.PORT||8080;
var router=express.Router();
//router.route('/bears')
    router.get('/bears',function(req,res){
       // var bear=new Bear();
        //bear.name='Polar';
       /* bear.save(function (err){
            if(err)
            {
                console.log(err);
            }
            console.log(bear);
        });*/
        /*var myDocument = Bear.find();

       // var myDocument = myCursor.hasNext() ? myCursor.next() : null;
        if (myDocument) {
            var myName =myDocument.name;
           res.json(myName);
        }*/
           Bear.find(function(err,bears){
                if(err) {
                    res.send(err);
                }
                res.json(bears);
            })

    });

router.get('/bears/:_id',function(req,res){
    // var bear=new Bear();
    //bear.name='Polar';
console.log("oops its here");
    Bear.findById("58808c05a5c7742801347da9",function(err,bears){
        if(err) {
            res.send(err);
        }
        res.json(bears);
    });

});
router.get('/bears/update/:_id',function(req,res){
    // var bear=new Bear();
    //bear.name='Polar';

    Bear.findById("58808c05a5c7742801347da9",function(err,bear){
        if(err) {
            res.send(err);
        }
       bear.name='P1';
        bear.save(function(err)
        {
            if(err)
                throw err;
            res.json({message:'Bear updated!'});
        });
    });
});
router.get('/bears/delete/:_id',function(req,res){
    Bear.remove({
        _id:"58808c05a5c7742801347da9"
    },function(err,bear){
        if(err)
            res.send(err);
        res.json({message:'successfully deleted'})
    })
})
router.use(function(req,res,next)
{
    console.log('Something is Happening');
    next();
});
/*var chris= new User({
    name:'Chris',
    username:'sevilayha',
    password:'password',
    admin:true
});
var chris1= new User({
    name:'Senior',
    username:'siron',
    password:'password',
    admin:true
});
chris1.save(function(err){
    console.log('User saved successfully');
});*/
// get the date 1 month ago
/*
var monthAgo=new Date();
monthAgo.setMonth(monthAgo.getMonth()-1);
User.findOneAndRemove({username:'siron'});
User.find({admin:true}).where('created_at').gt(monthAgo).exec(function(err,users){console.log(users);});
User.find({username:'sevilayha'},function(err,users){console.log(users);});
*/
// chris.dudify(function(err,name){console.log('Your new name is'+name);})
// chris.save(function(err){console.log('User saved successfully');});

router.get('/',function(req,res)
{
    //res.render('todo.ejs');
    console.log('messagee');
     res.json({message:'hooray! welcome to our api'});
});
app.use('/api',router);
app.listen(port);
console.log('Magic happens on port'+port);