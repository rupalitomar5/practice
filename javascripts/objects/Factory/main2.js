/**
 * Created by lcom64 on 10/1/17.
 */
var Task=require('./task');
var repofactory=require('./repofactory2');
//var userRepo=require('./userRepository');
//var projectRepo=require('./projectRepository');
var task1=new Task(repofactory.task.get(1));
var user=repofactory.user.get(1);
var project=repofactory.project.get(1);
task1.user=user;
task1.project=project;
//console.log(task1);
task1.save();
