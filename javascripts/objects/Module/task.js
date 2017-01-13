/**
 * Created by lcom64 on 10/1/17.
 */
/*var task= new Object();
task.title="my Task"
task.description=" My Description"
Object.defineProperty(
    task,'f',{
        value:function ()
        {
            return task.title +''+task.description;
        }

    }
)*/
var Repo=require('./taskRepository');

var Task=function(data) {
    this.name=data.name;
    this.completed=false;
};

Task.prototype.complete=function(){
    console.log('completing task'+this.name);
    this.completed=true;
}
Task.prototype.save=function(){
    console.log('saving task '+this.name);
    Repo.save(this);
};
// var urgent= Object.create(task);
module.exports=Task;
// console.log(urgent);