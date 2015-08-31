/**
 * TODO: Completely rewrite this controller
 */

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('locationsListController', locationsListController);

    locationsListController.$inject = ['$rootScope', '$scope', '$stateParams', 'citiesListService', 'locationService', 'mapService'];

    function locationsListController($rootScope, $scope, $stateParams, citiesListService, locationService, mapService) {
        /**
         *       Get the map object from a service
         */

        $rootScope.$watch('map', function (map) {
            if (map) {

                /**
                 *       Set current city value to a variable
                 */

                var currentCity = citiesListService.getCurrentCity();

                /**
                 *       Get all locations for selected city
                 */

                locationService.getLocations($stateParams.city).then(function (callback) {
                    $scope.markerArray = [];
                    $scope.locations = callback.data;

                    var markerArray = [],
                        veganIcon = DG.icon({
                            iconUrl: 'resources/icons/marker1.svg',
                            iconSize: [56, 56]
                        });

                    /**
                     *       Prepare a marker objects for render on the map
                     */

                    if (mapService.cluster) {
                        mapService.cluster.clearLayers();
                    }

                    callback.data.forEach(function (value) {
                        var geo = value.coordinates.replace(/[\[\]]/g, '').split(','),
                            name = value.name,
                            id = value.id;

                        var marker = DG.marker(geo, {
                            icon: veganIcon
                        }).bindPopup(name, {
                            closeButton: false
                        });
                        marker.on('click', function () {
                            window.location.href = '/#/locations/' + $stateParams.city + '/' + id;
                        });

                        markerArray.push(marker);
                        $scope.markerArray = markerArray;

                        mapService.cluster = DG.featureGroup(markerArray);
                    });

                    $rootScope.$watch('map', function (map) {
                           mapService.cluster.addTo(map);

                    });
                });

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