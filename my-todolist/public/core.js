var todo=angular.module('todo',[]);
function mainController($scope, $http) {
    $scope.formData = {};
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

}