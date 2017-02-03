// controller.js
angular
    .module('app')
    .controller('languageCtrl', languageCtrl)
    .controller('addController', addController)
    .service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })

                .success(function(){
                })

                .error(function(){
                });
        }
    }])

addController.$inject=['$http','$scope','fileUpload'];
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
    checkLanguage(languages, $translate.use());
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        checkLanguage(languages, langKey)
    };
}
function addController($http,$scope,fileUpload) {

    $scope.displayForm = false;
    this.array = ['Gujarat', 'Maharashtra', 'Uttarakhand'];
    this.Myobject = {
        Gujarat: ["Valsad", "Surat", "Baroda", "Rajkot", "Ahmedabad", "Gandhinagar"],
        Maharashtra: ["Mumbai", "pune", "Aurangabad"],
        Uttarakhand: ["Haridwar", "Hrishikesh", "Mussorie"]
    };
    this.getUser = function () {
        $scope.users = [];
        $http.get('http://localhost:8001/api/user').then(function (d) {
                console.log(d);
                for (i in d.data) {
                    $scope.users[i] = d.data[i];
                }

            }, function (err) {
                console.log(err);
            }
        );

    };


    this.editItem = function (data) {
        $scope.user = [];
        $http.get('http://localhost:8001/api/user/' + data).then(function (d) {
                console.log(d);
                $scope.user = d.data;

            }, function (err) {
                console.log(err);
            }
        );
        // $scope.employee = data;
        $scope.displayForm = true;
    };
    this.addUser = function () {
        $http({
            url: 'http://localhost:8001/api/user',
            method: 'POST',
            data: {
                'name': $scope.name,
                'email': $scope.email,
                'state': $scope.state,
                'city': $scope.city,
                'gender': $scope.gender,
                'daterange': $scope.date,
                'active': $scope.active
            }
        });

        $scope.uploadFile = function () {
            var file = $scope.myFile;

            console.log('file is ');
            console.dir(file);

            var uploadUrl = "http://localhost:8001/api/user";
            fileUpload.uploadFileToUrl(file, uploadUrl);
        }
    }
}
    /*.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])*/




        /*this.saveitem=function(data1){
            console.log(data1);
            $http({
                url: 'http://localhost:8001/api/user/'+data1,
                method: 'POST',
                data: {
                    'name': $scope.user.name,
                    'email': $scope.user.email,
                    'state': $scope.user.state,
                    'city': $scope.user.city,
                    'gender': $scope.user.gender,
                    'daterange': $scope.user.date,
                    'active': $scope.active
                    //'dob': $scope.newprofile.dob,
                    //'stateid': $scope.newprofile.stateid,
                    //'cityid': $scope.newprofile.cityid,
                    //'profileimg': $scope.newprofile.profileimg,
                    //'status': $scope.newprofile.status
                }})

        }*/

