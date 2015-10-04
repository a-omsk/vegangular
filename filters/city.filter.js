;
(function () {
    'use strict';

    angular
        .module('mapApp.filters')
        .filter('city', city);
        
    city.$inject = ['$rootScope'];

    function city($rootScope) {
        return function (input) {
            if (input && angular.isString(input))
            var arr = $rootScope.cities.filter(function (value) {
                return input === value.code;
            });
            return arr[0].name;
        };
    }
})();
