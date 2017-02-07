var mongoose= require('mongoose');
var express=require('express');
var bodyParser=require('body-parser');
mongoose.connect('mongodb://localhost:27017/test');
var urlencodedParser=bodyParser.urlencoded({extended:true});
var cors = require('express-cors');
var Employee=require('./js/employee.js');
var app = express();
app.use(urlencodedParser);
var router = express.Router();
var multer=require('multer');
var id;
app.use('/uploads',express.static(__dirname+"/upload"));
var upload=multer({dest:"./uploads/"}).array('name',1);
app.use(cors({
    allowedOrigins: [
        'http://localhost:63342', 'google.com'
    ]
}));
router.get("/employee",function(req,res){
    Employee.find({},function(err,employee){
        if(!err){
            console.log(employee);
            res.json(employee);
        }
    });
    /*Employee.find({},"-_id Name",function(err,employees){
        res.json(employees)
    });*/

});
router.get("/employeename",function(req,res){
    Employee.find({},"-_id Name",function(err,employees){
        res.json(employees)
    })
})


var storage = multer.diskStorage({
 destination: function (req, file, callback) {
 callback(null,'./uploads');
 },
 filename: function (req, file, callback) {
 console.log(file);
 var filename = file.originalname;
 req.body.file = filename;
 callback(null, file.originalname)
 }
 });
var upload = multer({ //multer settings
    storage: storage
}).single('file');
router.post("/employee", upload,function(req,res) {
    console.log("it is here");
    var emp3 = new Employee();
    emp3.Name = req.body.name;
    Employee.findOne({Name:req.body.employee},"_id",function(err,id1){
    id=id1;
})
    emp3.EmployeeId = id;
    emp3.File = req.body.file;
    emp3.save(function (err, emp3) {
        if (err) {
            console.log(err);
        }
        console.log(emp3);
    })
})


/*
router.put();*/

router.delete("/employee/:id",function(req,res){
    Employee.findByIdAndRemove(req.params.id,function(err,emp){console.log(emp);});
});



app.use('/api',router);
app.listen(8001);