;(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('mapService', mapService);

    mapService.$inject = ['$http', 'API_HOST'];

    function mapService ($http, API_HOST) {
        var map = null;

        this.cluster = null;

        this.saveMapContainer = function (data) {
            map = data;
        };

        this.getMapContainer = function () {
            return map;
        };
    }
})();
