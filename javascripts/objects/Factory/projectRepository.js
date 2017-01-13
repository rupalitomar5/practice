/**
 * Created by lcom64 on 10/1/17.
 */
var repo=function() {
    var db={};
    var get= function(id) {
        console.log("Getting project"+id);
        return{
            name:'project'
        }}
    var save=function(task){
        console.log('saving'+task.name);
    }
    console.log('newing up task repo');
    return{
        get:get,
        save:save
    }
}
module.exports=repo;
