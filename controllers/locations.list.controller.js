/**
 * TODO: Completely rewrite this controller
 */

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('locationsListController', locationsListController);

    locationsListController.$inject = ['$http', '$scope', '$stateParams', 'citiesListService', 'locationService', 'mapService', '$compile'];

    function locationsListController($http, $scope, $stateParams, citiesListService, locationService, mapService, $compile) {
        /**
         *       Get the map object from a service
         */

        $scope.$watch(function () {
            return mapService.getMapContainer()
        }, function (map) {
            if (map) {

                /**
                 *       Set current city value to a variable
                 */

                var currentCity = citiesListService.getCurrentCity();

                /**
                 *       Get all locations for selected city
                 */

                locationService.getLocations($stateParams.city).then(function (callback) {
                    $scope.locations = callback.data;

                    var markerArray = [],
                        veganIcon = DG.icon({
                            iconUrl: 'resources/icons/marker1.png',
                            iconSize: [48, 48]
                        });

                    /**
                     *       Prepare a marker objects for render on the map
                     */

                    if (mapService.cluster) {
                        mapService.cluster.remove();
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

                        mapService.cluster = DG.featureGroup(markerArray);

                    });


                    $scope.$watch(function () {
                        return mapService.getMapContainer()
                    }, function (map) {

                        mapService.cluster.addTo(map);

                    });
                });

                citiesListService.getCitiesList().then(function (callback) {

                    callback.data.result.forEach(function (value) {
                        if (value.code === $stateParams.city) {
                            if (currentCity !== $stateParams.city) {
                                var centroid = DG.Wkt.toLatLngs(value.centroid)[0];
                                mapService.cluster.remove();
                                map.panTo([centroid.lat, centroid.lng]);
                            }
                            citiesListService.saveCurrentCity(value.code);

                        } else {
                            return false;
                        }
                    });

                });
            }

        });
    }
})();