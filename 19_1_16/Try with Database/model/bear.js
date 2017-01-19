/**
 * Created by lcom64 on 19/1/17.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var BearSchema= new Schema({
    name:String
});

module.exports=mongoose.model('Bear',BearSchema);