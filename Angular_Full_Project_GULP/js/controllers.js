// controller.js
angular
    .module('app')
    .controller('languageCtrl', languageCtrl)
    .controller('addController', addController)
    //.controller('dateRangeCtrl', dateRangeCtrl);

dateRangeCtrl.$inject = ['$scope'];
function dateRangeCtrl($scope) {
    $scope.date = {
        startDate: moment().subtract(5, 'days'),
        endDate: moment()
    };
    $scope.opts = {
        drops: 'up',
        opens: 'left',
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1,'days'), moment().subtract(1,'days')],
            'Last 7 days': [moment().subtract(7,'days'), moment()],
            'Last 30 days': [moment().subtract(30,'days'), moment()],
            'This month': [moment().startOf('month'), moment().endOf('month')]
        }
    };

    //Watch for date changes
    $scope.$watch('date', function(newDate) {
        //console.log('New date set: ', newDate);
    }, false);
}





addController.$inject=['$http','$scope'];
languageCtrl.$inject = ['$translate', '$scope'];
function languageCtrl($translate, $scope) {
    function checkLanguage(languages, langKey) {
        languages.map(function (language) {
            if (language.langKey == langKey) {
                $scope.flag = language.flag;
                $scope.lang = language.lang;
                return language
            } else {

                return null
            }
        });
    }

    var languages = [
        {
            lang: 'Polish',
            langKey: 'pl',
            flag: 'Poland.png'
        },
        {
            lang: 'English',
            langKey: 'en',
            flag: 'United-Kingdom.png'
        },
        {
            lang: 'Español',
            langKey: 'es',
            flag: 'Spain.png'
        }
    ]
    $scope.languages = languages;
    checkLanguage(languages, $translate.use())
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        checkLanguage(languages, langKey)
    };
}

function addController($http,$scope,$filter, moment, uiCalendarConfig) {
    this.array1=[]
    $scope.displayForm = false;
    this.array = ['Gujarat', 'Maharashtra', 'Uttarakhand'];
    this.Myobject = {
        Gujarat: ["Valsad", "Surat", "Baroda", "Rajkot", "Ahmedabad", "Gandhinagar"],
        Maharashtra: ["Mumbai", "pune", "Aurangabad"],
        Uttarakhand: ["Haridwar", "Hrishikesh", "Mussorie"]
    };
    this.getUser=function(){
var API="http://localhost:8001/api/user";
$http.get(API)
    .then(function(response){
       this.array1=response.data;
    })

    };
    this.data={
        call1:function(){
            return{'name':$scope.name,'email':$scope.email,'state':$scope.state,'city':$scope.city,'gender':$scope.gender,'daterange':$scope.date,'active':$scope.active}
        }
    };
    $scope.editItem = function (data) {
        $scope.employee = data;
        $scope.displayForm = true;
    }
    this.addUser = function () {
        var API = "http://localhost:8001/api/user";
        $http.post(API,this.data.call1);
    };
};


