var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TaskSchema= new Schema({
    Todo:String,
    Memberassigned:String,
    Priority:Number
});

module.exports=mongoose.model('Task',TaskSchema);