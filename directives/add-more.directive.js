;
(function () {
    'use strict';

    angular
        .module('mapApp.directives')
        .directive('addMore', addMore);

    addMore.$inject = ['$rootScope', '$localStorage', 'popupService'];

    function addMore($rootScope, $localStorage, popupService) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/baloon-add-more.html',
            scope: {
                location: '@'
            },
            controller: function ($scope) {
                console.log($scope);
            }
        };
    }

})();
