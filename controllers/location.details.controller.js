;
(function() {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('locationDetailsController', locationDetailsController);

    locationDetailsController.$inject = ['$rootScope', '$scope', '$stateParams', 'mapService', 'locationService', 'commentsService'];

    function locationDetailsController($rootScope, $scope, $stateParams, mapService, locationService, commentsService) {
        var vm = this;

        vm.markerModel = [];
        vm.selectedLocation = {};
        vm.comments = [];
        vm.changeLocation = changeLocation;

        getLocations();

        function getLocations() {
            locationService.getSpecLocation($stateParams.city, $stateParams.id).then(function(response) {
                    vm.markerModel = response[0];
                    vm.selectedLocation = _.first(vm.markerModel.locations);
                    vm.comments = vm.selectedLocation.comments;

                    renderMarker(_.pick(vm.markerModel, 'id', 'coordinates'));
                    });
            }

            function renderMarker(coords) {
                var _coords = coords;

                if (mapService.cluster) {
                    filterMarker();
                } else {
                    prepareMarker(_coords);
                }
            }

            function filterMarker() {
                var prop;

                for (prop in mapService.cluster._layers) {
                    if (mapService.cluster._layers.hasOwnProperty(prop)) {
                        _.memoize(mapService.filterMarker(prop, $stateParams.id));
                    }
                }
            }

            function prepareMarker(coords) {
                $rootScope.$watch('map', function(map) {
                    if (map) {
                        var marker = mapService.pushMarker(coords);
                        marker.addTo($rootScope.map);
                        $rootScope.$broadcast('adaptiveLocationSelected');

                        $rootScope.map.panTo([marker._latlng.lat, marker._latlng.lng], {
                            animate: true
                        });
                        $rootScope.mapLoading = false;
                        $scope.$on('$destroy', function() {
                            marker.remove();
                        });
                    }
                });
            }

        function changeLocation(location) {
            var index = _.indexOf(vm.markerModel.locations, location);

            if (vm.markerModel.locations.length - 2 < index) {
                vm.selectedLocation = vm.markerModel.locations[0];
            } else {
                vm.selectedLocation = vm.markerModel.locations[index + 1];
            }
        }
    }
})();
