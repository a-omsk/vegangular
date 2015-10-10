;
(function() {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('locationsListController', locationsListController);

    locationsListController.$inject = ['$rootScope', '$scope', '$stateParams', 'citiesListService', 'locationService', 'mapService'];

    function locationsListController($rootScope, $scope, $stateParams, citiesListService, locationService, mapService) {

        var vm = this;

        $rootScope.$watch('map', function(map) {
            if (map) {

                var currentCity = citiesListService.getCurrentCity();

                locationService.getLocations($stateParams.city).then(function(callback) {
                    vm.locations = callback.data;

                    if (mapService.cluster) {
                        mapService.cluster.clearLayers();
                    }

                    mapService.cluster = DG.featureGroup(callback.data.map(function(value) {
                        return mapService.pushMarker(value);
                    }));

                    mapService.cluster.addTo(map);
                });

                var newCity = $rootScope.cities.filter(function(value) {
                    return value.code === $stateParams.city;
                })[0];

                if (currentCity !== $stateParams.city) {
                    var centroid = DG.Wkt.toLatLngs(newCity.centroid)[0];
                    map.panTo([centroid.lat, centroid.lng]);
                }
                citiesListService.saveCurrentCity(newCity.code);
            }
        });
    }
})();
