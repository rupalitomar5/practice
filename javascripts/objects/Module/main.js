/**
 * Created by lcom64 on 10/1/17.
 */
var Task=require('./task');
var Repo=require('./taskRepository');
var task2= new Task(Repo.get(1));

var task1= new Task({name:"create a demo"});
task1.complete();
task1.save();

task2.complete();
task2.save();
