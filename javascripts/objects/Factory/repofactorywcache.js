/**
 * Created by lcom64 on 11/1/17.
 */
var repo=function () {
    this.getRepo = function (repotype) {
        if (repotype === 'task') {
            if (!this.taskRepo) {
                this.taskRepo=require('./taskRepository')();
                // config --
                return this.taskRepo;

            }
            else {
                console.log('Retrieving from cache');
                return this.taskRepo;
            }
        }
        else if (repotype === 'user') {
            var userRepo = require('./userRepository')();
            return userRepo;
        }
        else if (repotype === 'project') {
            var projectRepo = require('./projectRepository')();
            return projectRepo;
        }
        else
        {
            console.log('saving tasks');
        }
    }
};
module.exports=new repo;