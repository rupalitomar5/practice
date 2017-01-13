/**
 * Created by lcom64 on 10/1/17.
 */
var repo= function(){
    this.getRepo= function (repotype){
        if(repotype==='task'){
            var taskRepo=require('./taskRepository')();
            return taskRepo;
        }
        else if(repotype==='user'){
            var userRepo=require('./userRepository')();
            return userRepo;
        }
        else if(repotype==='project'){
            var projectRepo=require('./projectRepository')();
            return projectRepo;
        }
    }
}
module.exports=new repo;