/**
 * Created by lcom64 on 30/1/17.
 */

function MainController($scope){
    this.likelist=[];
    this.myAmount=209.82;
    this.myDate=1288323623006;
    this.text="the text is here";
    this.myarray=[
        "angular","app"
    ];
    this.addMovie=function(){
        this.favourites.unshift({
                title:this.newtitle,
                year:this.release
            }
        )
    };
    this.unlike= function(index){
        this.likelist.splice(index,1);
    };
    this.myObject={
        one:"key1",
        two:"key2"
    };
    this.addToLikes=function(movie)
    {
// in function
        this.likelist.push(movie);
    };
this.favourites=[{
    title:'the shawshank',
    year:'1994',
    popular:true
},{
    title:'excorcist',
    year:'1995',
    popular:false

}]
}
function UserController($http){
var API='/api/todo';
this.userId='';
this.chosenUser={};
this.getUser=function(){
    if(!this.userId){
        return;
    }
    $http.get(API+this.userId);
    $http.then(function(response){
        this.chosenUser=response.data;
        console.log(this.chosenUser)
    },function(reason){
console.log(reason)
    });
    $http.post()
}
}


angular.module('app1')
    .controller('MainController',MainController)
angular.module('app2')
    .controller('UserController',UserController)