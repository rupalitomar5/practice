/**
 * Created by lcom64 on 27/1/17.
 */
angular.module('Todo.services',[]).factory('Todo',function($resource){
    return $resource('http://localhost:8010/api/todo/:id',{ id:'@_id'},{
        update: {
            method: 'PUT'
        }

    })
});