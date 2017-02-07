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
        $scope.emp = [];
       $scope.getEmp=function (){
            $http
                .get('http://localhost:8001/api/employee')
                .then(function (d) {
                    $scope.emp= d.data;
                    console.log(d.data);
                    //$scope.emp=d;
    })}})
.controller('ComplexController', [
    '$scope', '$element', 'title','emp', 'close','Upload',
    function($scope, $element, title,emp,close,Upload) {

        $scope.name = null;
        $scope.employee = null;
        $scope.title = title;
        $scope.emp2=emp;
        //  This close function doesn't need to use jQuery or bootstrap, because
        //  the button has the 'data-dismiss' attribute.
        $scope.close = function() {
            var add=function(){
                Upload.upload({
                    url: 'http://localhost:8001/api/employee',
                    method: 'POST',
                    data: {
                        'name': $scope.name,
                        'employee':$scope.employee,
                        'file':$scope.file
                    }
                })
                    .success(function(data){
                        //$scope.newprofile = {};
                        $scope.emp2 = data;

                    })
                    .error(function(data){
                        console.log(data);
                    })
            }
            add();
            close({
                name: $scope.name,
                employee: $scope.employee,
                file:$scope.file
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        //  This cancel function must use the bootstrap, 'modal' function because
        //  the doesn't have the 'data-dismiss' attribute.
        $scope.cancel = function() {

            //  Manually hide the modal.
            $element.modal('hide');

            //  Now call close, returning control to the caller.
            close(
                {
                name: $scope.name,
                employee: $scope.employee,
                file:$scope.file
            }, 500); // close, but give 500ms for bootstrap to animate
        };

    }]
    )
.controller('SampleController', ['$scope', 'ModalService','$http', function($scope, ModalService,$http){
    $scope.getUser1= function() {
        $scope.emp2=[];
        $http
            .get('http://localhost:8001/api/employeename')
            .then(function (d) {
                $scope.emp2 = d.data;
                console.log($scope.emp2)
            })
    }
    $scope.showComplex = function() {
       $scope.getUser1();
        ModalService.showModal({
            templateUrl: "views/modal.html",
            controller: "ComplexController",
            inputs: {
                title: "A More Complex Example",
                emp: $scope.emp2
            }
        }).then(function(modal) {
            modal.close.then(function(result) {
            });
        });

    }
}]);

