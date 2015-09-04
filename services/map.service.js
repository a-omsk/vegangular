;
(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('mapService', mapService);

    mapService.$inject = ['$rootScope', '$http', '$location', 'API_KEY'];

    function mapService($rootScope, $http, $location, API_KEY) {
        var map = null,
            vm = this;

        vm.cluster = null;
        vm.markerArray = [];

        this.saveMapContainer = function (data) {
            map = data;
        };

        this.getMapContainer = function () {
            return map;
        };

        this.filterMarker = function (prop, id) {
            var marker = vm.cluster._layers[prop];
            if (marker.cityId !== id) {
                vm.cluster.removeLayer(prop);
            }
        };

        this.pushMarker = function (value) {

            var veganIcon = DG.icon({
                iconUrl: 'resources/icons/marker1.svg',
                iconSize: [56, 56]
            });

            var geo = value.coordinates.replace(/[\[\]]/g, '').split(','),
                id = value.id;
            var marker = DG.marker(geo, {
                icon: veganIcon
            });
            marker.on('click', function () {
                $rootScope.$apply(function () {
                    $location.path('/locations/' + value.city + '/' + id);
                });
            });
            marker.cityId = id;

            vm.markerArray.push(marker);

            return marker;
        };

        this.getObject = function (latlng) {
            return $http.get("http://catalog.api.2gis.ru/geo/search?q=" + latlng.lng + ',' + latlng.lat + "&version=1.3&key=" + API_KEY).success(function (data) {
                return data;
            });
        }
    }
})();
