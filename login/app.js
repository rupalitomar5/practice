var mongoose= require('mongoose');
var express=require('express');
var bodyParser=require('body-parser');
mongoose.connect('mongodb://localhost:27017/test');
var urlencodedParser=bodyParser.urlencoded({extended:true});
var Employee=require('./js/employee.js');
var app=express();
var router=express.Router();
var multer=require('multer');
router.get("/employee",function(){
    Employee.find({},function(err,employee){
        if(!err){
            console.log(employee);
            res.json(employee)
        }
    });

});
router.get("/employee/name",function(){
    Employee.find({},"-_id Name",function(err,employee){
        res.json(employee)
    })
})


router.post();
router.put();
router.delete();

app.use(urlencodedParser);
app.use('/api',router);
