;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('ShowCityController', ShowCityController);

    ShowCityController.$inject = ['$scope', 'citiesListService'];

    function ShowCityController($scope, citiesListService) {
        citiesListService.getCitiesList().then(function (callback) {
            $scope.cities = callback.data.result;
            console.log(callback.data);
        });
    }

})();
