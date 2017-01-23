var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var StepSchema= new Schema({
    Steps:String,
    Todo:{
    type:mongoose.Schema.Types.ObjectId,
        ref: 'Task'
}
});
module.exports=mongoose.model('Step',StepSchema);