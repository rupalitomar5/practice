'use strict';

angular.module('myApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('/', {
        templateUrl: 'app.html',
        controller: 'AppCtrl'
    });
}).run(function () {
});