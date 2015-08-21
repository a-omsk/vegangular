;
(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('citiesListService', citiesListService);

    citiesListService.$inject = ['$http'];

    function citiesListService($http) {
        var currentCity = null;

        this.getCitiesList = function () {
            return $http.get('data.json', {cache: true}).success(function (data) {
                return data;
            });
        };

        this.saveCurrentCity = function (city) {
            currentCity = city;
        };

        this.getCurrentCity = function () {
            return currentCity;
        }
    }
})();

