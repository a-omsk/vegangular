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
                $(elem).raty({readOnly: true, score: 5, number: scope.location.rating});
            }
        }
    }
})();
