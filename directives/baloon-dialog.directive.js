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
                $scope.authorized = !!$localStorage.token;
                $scope.openForm = function () {
                    $rootScope.openForm = true;
                };
            }
        }
    }

})();
