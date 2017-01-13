/**
 * Created by lcom64 on 10/1/17.
 */
var repo1=function() {

    var db={};

        //var save=
    return{
        get:repo1.get,
        save:repo1.save
    }
}

repo1.prototype.get=function(id) {
    console.log("Getting task"+id);
    return{
        name:'new task from db'
    }}
    repo1.prototype.save=function(task){
        console.log('saving '+task.name);
    }

module.exports=new repo1;