/**
 * Created by lcom64 on 10/1/17.
 */
/**
 * Created by lcom64 on 10/1/17.
 */
var repofactory= function(){
    var repos= this;
    var repolist=[
        {name:'task',source:'./taskRepository'},
        {name:'user',source:'./userRepository'},
        {name:'project',source:'./projectRepository'}
    ];
    repolist.forEach(function(repo){
        repos[repo.name]=require(repo.source)()
    });
}
module.exports=new repofactory;