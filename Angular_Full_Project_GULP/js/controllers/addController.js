function addController($http,$scope,$filter, moment, uiCalendarConfig) {
    this.array = ['gujarat', 'maharashtra', 'uttarakhand'];
    this.Myobject = {
        gujarat: ["Valsad", "Surat", "Baroda", "Rajkot", "Ahmedabad", "Gandhinagar"],
        maharashtra: ["Mumbai", "pune", "Aurangabad"],
        uttarakhand: ["Haridwar", "Hrishikesh", "Mussorie"]
    };
 this.data={
     call1:function(value){
         return{'name':$scope.name,'email':$scope.email,'state':$scope.state,'city':$scope.city,'gender':$scope.gender,'daterange':$scope.daterange,'active':$scope.active}
     }
 }
    this.addUser = function () {
        var API = "/api/user";
        $http.post(API,data.call1);
    };
};
angular.module('app')
        .controller('addController', addController);