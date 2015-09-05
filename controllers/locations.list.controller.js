;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('locationsListController', locationsListController);

    locationsListController.$inject = ['$rootScope', '$scope', '$stateParams', 'citiesListService', 'locationService', 'mapService'];

    function locationsListController($rootScope, $scope, $stateParams, citiesListService, locationService, mapService) {

        /**
         *       Get the map object from a root scope
         */

        $rootScope.$watch('map', function (map) {
            if (map) {

                /**
                 *       Save current city value to a variable
                 */

                var currentCity = citiesListService.getCurrentCity();

                /**
                 *       Get all locations for selected city and render on map
                 */

                locationService.getLocations($stateParams.city).then(function (callback) {
                    $scope.locations = callback.data;

                    var markerArray = [];

                    if (mapService.cluster) {
                        mapService.cluster.clearLayers();
                    }

                    angular.forEach(callback.data, function(value){

                        markerArray.push(mapService.pushMarker(value));

                    });

                    mapService.cluster = DG.featureGroup(markerArray);

                    $rootScope.$watch('map', function (map) {

                        mapService.cluster.addTo(map);

                    });
                });

                /**
                 *       Pan the map, if controller launched for a new city
                 */

                var newCity = $rootScope.cities.filter(function (value) {
                    return value.code === $stateParams.city;
                });

                if (currentCity !== $stateParams.city) {
                    var centroid = DG.Wkt.toLatLngs(newCity[0].centroid)[0];
                    map.panTo([centroid.lat, centroid.lng]);
                }
                citiesListService.saveCurrentCity(newCity[0].code);

            }

        });
    }
})();