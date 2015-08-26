;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .directive('baloonDialog', baloonDialog);

    baloonDialog.$inject = ['$rootScope', '$localStorage'];

    function baloonDialog($rootScope, $localStorage) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/baloon-dialog.html',
            controller: function ($scope) {
                console.log($rootScope.openForm);
                $scope.authorized = !!$localStorage.token;
                $scope.openForm = function () {
                    console.log("i'am worked'");
                    $rootScope.openForm = true;
                };
            }
        }
    }

})();
