;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('locationDetailsController', locationDetailsController);

    locationDetailsController.$inject = ['$rootScope', '$scope', '$stateParams', 'mapService', 'locationService', 'commentsService'];

    function locationDetailsController($rootScope, $scope, $stateParams, mapService, locationService, commentsService) {
        locationService.getLocations($stateParams.city, $stateParams.id).then(function (callback) {
            $scope.location = callback.data[0];
            if (mapService.cluster) {
                var prop;
                for (prop in mapService.cluster._layers) {
                    if (mapService.cluster._layers.hasOwnProperty(prop)) {
                        mapService.filterMarker(prop, $stateParams.id);
                    }
                }
            } else {
                $rootScope.$watch('map', function (map) {
                    if (map) {
                        var marker = mapService.pushMarker(callback.data[0]);
                        marker.addTo($rootScope.map);
                        $scope.$on('$destroy', function () {
                            marker.remove();
                        })
                    }
                });

            }
        });

        commentsService.getComments($stateParams.city, $stateParams.id).then(function (callback) {
            $scope.comments = callback.data;
        });
    }
})();
