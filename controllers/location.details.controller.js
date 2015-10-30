;
(function() {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('locationDetailsController', locationDetailsController);

    locationDetailsController.$inject = ['$q', '$rootScope', '$scope', '$stateParams', 'mapService', 'locationService', 'commentsService'];

    function locationDetailsController($q, $rootScope, $scope, $stateParams, mapService, locationService, commentsService) {
        var vm = this;
        vm.locations = [];
        vm.selectedLocation = {};
        vm.comments = [];
        vm.changeLocation = changeLocation;

        var getLocation = locationService.getLocations($stateParams.city, $stateParams.id)

        $q.all([getLocation]).then(function(response) {
            vm.markerModel = response[0].data[0];
            vm.selectedLocation = vm.markerModel.locations[0];
            vm.comments = vm.selectedLocation.comments;

            if (mapService.cluster) {
                var prop;

                for (prop in mapService.cluster._layers) {
                    if (mapService.cluster._layers.hasOwnProperty(prop)) {
                        _.memoize(mapService.filterMarker(prop, $stateParams.id));
                    }
                }

            } else {
                $rootScope.$watch('map', function(map) {
                    if (map) {
                        var marker = mapService.pushMarker(vm.markerModel);
                        marker.addTo($rootScope.map);
                        $rootScope.$broadcast('adaptiveLocationSelected');
                        $rootScope.map.panTo([marker._latlng.lat, marker._latlng.lng], {
                            animate: true
                        });
                        $rootScope.mapLoading = false;
                        $scope.$on('$destroy', function() {
                            marker.remove();
                        })
                    }
                });
            }
        });

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
