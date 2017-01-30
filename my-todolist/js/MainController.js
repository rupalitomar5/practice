/**
 * Created by lcom64 on 30/1/17.
 */

function MainController($scope){
this.favourites=[{
    title:'the shawshank',
    year:'1994',
    popular:true
},{
    title:'the shawshank',
    year:'1994',
    popular:false

}]
}
angular.module('app1')
    .controller('MainController',MainController)