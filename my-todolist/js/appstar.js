angular.module('movieApp',['uirouter','ngResource','TodoApp.controllers','TodoApp.services']);

angular.module('TodoApp').config(function($stateProvider){
    $stateProvider.state('Todo',{
        url:'/todo',
        templateurl:'views/todo.ejs',
        controller:'TodoController'
    })
        .state('viewTodo',{
            url:'/todo/delete/:id',
            templateurl:'views/todo.ejs',
            controller:'TodoViewController'
        })
        .state('AddTodo',{
            url:'/todo/add',
            templateurl:'views/todo.ejs',
            controller:'TodoCreateController'
        })
        .state('editTodo',{
            url:'/todo/update/',
            templateurl:'views/todo1.ejs',
            controller:'TodoEditController'
        });
}).run(function ($state) {
    $state.go('Todo');
});