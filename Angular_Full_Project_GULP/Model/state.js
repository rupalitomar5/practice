/**
 * Created by lcom64 on 1/2/17.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var stateSchema=new Schema({
    states:String,
    cities:[String]
});
module.exports=mongoose.model('state',stateSchema);
