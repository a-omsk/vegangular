;
(function () {
    'use strict';

    angular
        .module('mapApp.directives')
        .directive('adaptiveStyle', adaptiveStyle);

    adaptiveStyle.$inject = ['$rootScope'];

    function adaptiveStyle ($rootScope) {
        return {
            scope: '@',
            restrict: 'A',
            link: function (scope, elem) {
                if ($rootScope.isAdaptive) {
                    elem.addClass('adaptive-width');
                }
            }
        }
    }
})();