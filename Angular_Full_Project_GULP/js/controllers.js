// controller.js
function userService($http){
   this.getUser=function (){
    return $http
        .get('http://localhost:8001/api/user')
        .then(function (d) {
            console.log(d);
            return d.data;
        }, function (err) {
            console.log(err);
        }
    );}
}
angular.module('app'/*,['ui.bootstrap']*/)
    .controller('languageCtrl', languageCtrl)
    .service('userService',userService)
    .service('modalService', ['$uibModal',
// NB: For Angular-bootstrap 0.14.0 or later, use $uibModal above instead of $modal
        function ($uibModal) {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'views/modal.html'
            };

            var modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'OK',
                headerText: 'Proceed?',
                bodyText: 'Perform this action?'
            };

            this.showModal = function (customModalDefaults, customModalOptions) {
                if (!customModalDefaults) customModalDefaults = {};
                customModalDefaults.backdrop = 'static';
                return this.show(customModalDefaults, customModalOptions);
            };

            this.show = function (customModalDefaults, customModalOptions) {
                //Create temp objects to work with since we're in a singleton service
                var tempModalDefaults = {};
                var tempModalOptions = {};

                //Map angular-ui modal custom defaults to modal defaults defined in service
                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

                //Map modal.html $scope custom properties to defaults defined in service
                angular.extend(tempModalOptions, modalOptions, customModalOptions);

                if (!tempModalDefaults.controller) {
                    tempModalDefaults.controller = function ($scope, $modalInstance) {
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function (result) {
                            $modalInstance.close(result);
                        };
                        $scope.modalOptions.close = function (result) {
                            $modalInstance.dismiss('cancel');
                        };
                    };
                }

                return $uibModal.open(tempModalDefaults).result;
            };

        }])
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
    .controller('addController', addController)



addController.$inject=['$http','$scope','fileUpload','userService'];
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
/*function ModalDemoCtrl($rootScope, $scope, $log, $uibModal){
    $scope.open = function(size, template) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: template || 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size
        });
}
    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}*/
/*
ModalInstanceCtrl.$inject=['$scope', '$uibModalInstance', 'modalFactory']
function ModalInstanceCtrl($scope, $uibModalInstance, modalFactory) {

    //$scope.searchTerm = term;

    $scope.ok = function() {
        modalFactory.open('lg', 'result.html', {searchTerm: $scope.searchTerm});
        //$uibModalInstance.close($scope.searchTerm);
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}
*/

function addController($http,$scope,fileUpload,userService) {
//var users=[]
    $scope.displayForm = false;
    this.array = ['Gujarat', 'Maharashtra', 'Uttarakhand'];
    this.Myobject = {
        Gujarat: ["Valsad", "Surat", "Baroda", "Rajkot", "Ahmedabad", "Gandhinagar"],
        Maharashtra: ["Mumbai", "pune", "Aurangabad"],
        Uttarakhand: ["Haridwar", "Hrishikesh", "Mussorie"]
    };

    this.getUser = function () {
        $scope.users = [];
        userService.getUser()
            .then(function(d){
               $scope.users= angular.copy[d];
                $scope.users=d;
            });

    };

    $scope.deleteItem = function (data) {


        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Delete the user',
            headerText: 'Delete ',
            bodyText: 'Are you sure you want to delete'
        };

        modalService.showModal({}, modalOptions)
            .then(function (result) {
                //your-custom-logic
            });
    }
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

    this.deleteitem=function(data){
        $http
            .delete("http://localhost:8001/api/user/"+data);
        this.getUser()
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




        this.saveitem=function(data){
            console.log(data);
            $http({
                url: 'http://localhost:8001/api/user/'+data,
                method: 'POST',
                data: {
                    'name': $scope.user.name,
                    'email': $scope.user.email,
                    'state': $scope.user.state,
                    'city': $scope.user.city,
                    'gender': $scope.user.gender,
                    'daterange': $scope.user.Dob,
                    'active': $scope.active
                }});
            $scope.users = [];
            userService.getUser()
                .then(function(d){
                    $scope.users=d;
                });

        }}

/*
angular.module('app1', ['ui.bootstrap'])*/



/*var modalController = function ($scope, $uibModalInstance) {
    $scope.yes = function() {
        $uibModalInstance.close();
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
};

modalController.$inject = ['$scope', '$uibModalInstance'];*/
/*
function MyModalController($uibModalInstance, items) {
    var vm = this;
    vm.content = items;
    vm.confirm = $uibModalInstance.close;
    vm.cancel = $uibModalInstance.dismiss;
};

function modalTriggerDirective($myModal) {
    function postLink(scope, iElement, iAttrs) {
        function onClick() {
            var size = scope.$eval(iAttrs.size) || 'lg'; // default to large size
            var title = scope.$eval(iAttrs.title) || 'Default Title';
            var message = scope.$eval(iAttrs.message) || 'Default Message';
            $myModal.open(size, title, message);
        }
        iElement.on('click', onClick);
        scope.$on('$destroy', function() {
            iElement.off('click', onClick);
        });
    }

    return {
        link: postLink
    };
}

function myModalFactory($uibModal) {
    var open = function (size, title, message) {
        return $uibModal.open({
            controller: 'MyModalController',
            controllerAs: 'vm',
            templateUrl: 'templates/CustomModal.html',
            size: size,
            resolve: {
                items: function () {
                    return {
                        title: title,
                        message: message
                    };
                }
            }
        });
    }};
var modalScope = $scope.$new();

/!*
var modalInstance = $uibModal.open({
    templateUrl: 'foo-as-modal.html',
    controller: 'fooController',
    scope: modalScope
});
*!/

modalScope.modalInstance = modalInstance;
/!*var modalInstance = $uibModal.open({
    animation: true,
    templateUrl: '../Template/ConfirmForm.tpl.html',
    controller: modalController,
});*!/

*/
