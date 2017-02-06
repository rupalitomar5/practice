/**
 * Created by lcom64 on 6/2/17.
 */
angular.module('myapp',['ngRoute','ui.bootstrap','angularModalService','ngAnimate','ngFileUpload'])
    .config(function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'views/login.html',
                controller:'mainController'
            })
            .when('/list',{
                templateUrl:'views/list.html',
                controller:'listController'
            })
    })
    .controller('mainController',function($scope,$location){
        $scope.submit=function(){
            $location.path('/list');
        }
    })
    .controller('listController',function($scope,$http){
        $scope.items=['hdhsjhfshf','dshgsjhchb'];
        $scope.status={
            isopen:false
        };
        $scope.toggled=function(open){
           console.log("open");
        };
        $scope.toggleDropDown=function($event){
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
        $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
        $scope.emp = [];
        function getUser(){
            $http
                .get('http://localhost:8000/api/user')
                .then(function (d) {
                    $scope.emp= d.data;
                    //$scope.emp=d;
    })}})
.controller('ComplexController', [
    '$scope', '$element', 'title', 'close',
    function($scope, $element, title, close) {

        $scope.name = null;
        $scope.employee = null;
        $scope.title = title;

        //  This close function doesn't need to use jQuery or bootstrap, because
        //  the button has the 'data-dismiss' attribute.
        $scope.close = function() {
            close({
                name: $scope.name,
                age: $scope.employee,
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        //  This cancel function must use the bootstrap, 'modal' function because
        //  the doesn't have the 'data-dismiss' attribute.
        $scope.cancel = function() {

            //  Manually hide the modal.
            $element.modal('hide');

            //  Now call close, returning control to the caller.
            close({
                name: $scope.name,
                age: $scope.age
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        function add(){
            Upload.upload({
                url: 'http://localhost:8001/api/user',
                method: 'POST',
                data: {
                    'name': $scope.name,
                    'customer':$scope.employee
                }
            })
    }}]
    )
.controller('SampleController', ['$scope', 'ModalService', function($scope, ModalService){
    $scope.showComplex = function() {

        ModalService.showModal({
            templateUrl: "views/modal.html",
            controller: "ComplexController",
            inputs: {
                title: "A More Complex Example"
            }
        }).then(function(modal) {
           // modal.element.modal();
            modal.close.then(function(result) {
                $scope.complexResult  = "Name: " + result.name + ", EmployeeName: " + result.employee;
            });
        });

    }
}]);

