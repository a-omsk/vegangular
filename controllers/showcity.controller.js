;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('ShowCityController', ShowCityController);

    ShowCityController.$inject = ['$rootScope', '$scope', 'citiesListService'];

    function ShowCityController($rootScope, $scope, citiesListService) {
        $rootScope.$watch('currentCity', function(city) {
            $scope.currentCity = city;
        });

        citiesListService.getCitiesList().then(function (callback) {
            $scope.cities = callback.data.result;
        });
    }

})();
