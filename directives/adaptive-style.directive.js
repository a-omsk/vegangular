;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .directive('adaptiveStyle', adaptiveStyle);

    adaptiveStyle.$inject = ['$rootScope'];

    function adaptiveStyle ($rootScope) {
        return {
            scope: '@',
            restrict: 'A',
            link: function (scope, elem, attrs) {
                if ($rootScope.isAdaptive) {
                    elem.addClass('adaptive-width');
                }
            }
        }
    }
})();