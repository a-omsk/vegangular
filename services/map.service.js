;
(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('mapService', mapService);

    mapService.$inject = ['$http', 'API_HOST', 'API_KEY'];

    function mapService($http, API_HOST, API_KEY) {
        var map = null;

        this.cluster = null;

        this.saveMapContainer = function (data) {
            map = data;
        };

        this.getMapContainer = function () {
            return map;
        };

        this.getObject = function (latlng) {
            return $http.get("http://catalog.api.2gis.ru/geo/search?q=" + latlng.lng + ',' + latlng.lat + "&version=1.3&key=" + API_KEY).success(function (data) {
                return data;
            });
        }
    }
})();
