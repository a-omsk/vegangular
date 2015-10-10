;
(function () {
    'use strict';

    angular
        .module('mapApp.directives')
        .directive('baloonDialog', baloonDialog);

    baloonDialog.$inject = ['$rootScope', '$localStorage', 'popupService'];

    function baloonDialog($rootScope, $localStorage, popupService) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/baloon-dialog.html',
            controller: function ($scope) {
                $scope.authorized = !!$localStorage.token;
                $scope.openForm = openForm;
                $scope.openLoginPopup = openLoginPopup;

                $rootScope.$on('userLoginSuccess', function(){
                    $scope.authorized = true;
                })

                function openForm () {
                    $rootScope.openForm = true;
                }

                function openLoginPopup () {
                    popupService.loginPopup();
                }
            }
        }
    }

})();
