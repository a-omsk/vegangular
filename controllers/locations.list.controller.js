;
(function() {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('locationsListController', locationsListController);

    locationsListController.$inject = ['$q', '$rootScope', '$scope', '$stateParams', 'citiesListService', 'locationService', 'mapService'];

    function locationsListController($q, $rootScope, $scope, $stateParams, citiesListService, locationService, mapService) {

        var vm = this;

        vm.currentCity = citiesListService.getCurrentCity();
        vm.stateCity = $stateParams.city;
        vm.markers = [];
        vm.locations = [];
        vm.page = null;
        vm.totalPages = 0;

        $rootScope.$watch('map', function(map) {
            if (map) {
                activate();
                getReadyToPan();
            }
        });

        function activate() {
            var getMarkers = locationService.getMarkers(vm.stateCity),
                getLocations = locationService.getLocations(vm.stateCity);

            $q.all([getMarkers, getLocations]).then(onSuccessLoad);
        }

        function onSuccessLoad(responseArray) {
            vm.markers = responseArray[0];
            vm.locations = responseArray[1].data;
            vm.page = responseArray[1].current_page;
            vm.totalPages = responseArray[1].last_page;

            mapService.cluster = prepareMarkers(vm.markers);

            mapService.cluster.addTo($rootScope.map);

            $rootScope.mapLoading = false;
        }

        function prepareMarkers(coordsArray) {
            if (mapService.cluster) mapService.cluster.clearLayers();

            return DG.featureGroup(vm.markers.map(function(value) {
                return mapService.pushMarker(value);
            }));
        }

        function getReadyToPan() {
                var newCity = $rootScope.cities.filter(function(value) {
                    return value.code === $stateParams.city;
                })[0];

            if (vm.currentCity !== vm.stateCity) {
                var centroid = DG.Wkt.toLatLngs(newCity.centroid)[0];
                $rootScope.mapLoading = true;
                $rootScope.map.panTo([centroid.lat, centroid.lng]);
            }
            citiesListService.saveCurrentCity(newCity.code);
        }

        function addMoreLocations() {
            if ((vm.page + 1) > vm.totalPages) return;

            locationService.getLocations(vm.stateCity, vm.page += 1).then(function(response){
                vm.locations = vm.locations.concat(response.data);
            });
        }

        angular.extend(this, {
            addMoreLocations: addMoreLocations
        });
    }

})();
