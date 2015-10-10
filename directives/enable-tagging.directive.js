;
(function () {
    'use strict';

    angular
        .module('mapApp.directives')
        .directive('enableTagging', enableTagging);

    enableTagging.$inject = ['$compile', '$rootScope', 'mapService', 'citiesListService'];

    function enableTagging($compile, $rootScope, mapService, citiesListService) {
        return {
            restrict: 'A',
            controller: function ($scope) {
                $rootScope.$watch('map', function (map) {
                    if (map) {

                        var location = {},
                            geo,
                            popup,
                            marker;

                        map.on('dblclick', function (event) {

                            $rootScope.latlng = event.latlng;
                            geo = [event.latlng.lat, event.latlng.lng];

                            mapService.getObject(event.latlng).then(function (response) {
                                $rootScope.address = null;
                                if (response.data.result[0].attributes.street) {
                                    $rootScope.address = response.data.result[0].attributes.street + " "
                                        + response.data.result[0].attributes.number;
                                }
                            });

                            popup = DG.popup({minWidth: 500})
                                .setLatLng(geo)
                                .setContent("<div class='baloon-dialog' baloon-dialog></div>");

                            popup.addTo(map);

                            $compile(angular.element('.baloon-dialog'))($scope);
                            $scope.$apply();

                            $rootScope.$on('locationAdded', function () {
                                popup.remove();

                                location.geo = geo;
                                location.city = citiesListService.getCurrentCity();

                                marker = mapService.pushMarker(location);
                                marker.addTo(map);
                            });

                            $scope.$on('$destroy', function () {
                                marker.remove();
                            });
                        });
                    }
                });
            }
        };
    }
})();
