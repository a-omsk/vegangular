;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .directive('raty', raty);

    function raty () {
        return {
            scope: '@',
            restrict: 'AE',
            link: function (scope, elem) {
                if (scope.location) {
                    $(elem).raty({readOnly: true, half: true, number: 5, score: scope.location.rating});
                }
            }
        }
    }
})();
