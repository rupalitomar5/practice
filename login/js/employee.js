/**
 * Created by lcom64 on 6/2/17*/
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var EmployeeSchema= new Schema({
    Name:String,
    EmployeeId:[{ type: Schema.Types.ObjectId, ref: 'Employee' }],
    File:String
});
//var mongoose=require('mongoose');
//var Schema=mongoose.Schema;

module.exports=mongoose.model('Employee',EmployeeSchema);