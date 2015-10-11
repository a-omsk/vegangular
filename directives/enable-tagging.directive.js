;
(function() {
    'use strict';

    angular
        .module('mapApp.directives')
        .directive('enableTagging', enableTagging);

    enableTagging.$inject = ['$compile', '$rootScope', '$timeout', 'mapService', 'citiesListService'];

    function enableTagging($compile, $rootScope, $timeout, mapService, citiesListService) {
        return {
            restrict: 'A',
            controller: ['$scope', function($scope) {
                $rootScope.$watch('map', function(map) {
                    var location = {},
                        geo,
                        popup,
                        marker;

                        if (map && $rootScope.isAdaptive) {

                            map.on('mousedown', function(event) {
                                var coords = event.latlng,
                                    waitingForPopup = $timeout(function() {
                                    popup = compileBaloon([coords.lat, coords.lng]);
                                    $rootScope.latlng = coords;
                                    getGeoData(coords);
                                }, 700);

                                map.on('mouseup', function() {
                                    $timeout.cancel(waitingForPopup);
                                });
                                $rootScope.$on('locationAdded', function() {
                                    addNewMarker(coords);
                                });
                                $scope.$on('$destroy', function() {
                                    marker.remove();
                                });
                            });
                        } else if (map && !$rootScope.isAdaptive) {

                            map.on('dblclick', function(event) {
                                var coords = event.latlng;

                                $rootScope.latlng = coords;
                                getGeoData(coords);
                                popup = compileBaloon([coords.lat, coords.lng]);

                                $rootScope.$on('locationAdded', function() {
                                    addNewMarker(coords);
                                });
                                $scope.$on('$destroy', function() {
                                    marker.remove();
                                });
                            });
                        }

                        function compileBaloon(coords) {
                            var baloon = DG.popup({
                                    minWidth: 500
                                })
                                .setLatLng(coords)
                                .setContent("<div class='baloon-dialog' baloon-dialog></div>");

                            baloon.addTo(map);
                            compileBaloonContent('.baloon-dialog');
                            return baloon;
                        }

                        function compileBaloonContent(className) {
                            $compile(angular.element(className))($scope);
                            $scope.$apply();
                        }

                        function getGeoData(coords) {
                            var geo = [coords.lat, coords.lng];
                            mapService.getObject(coords).then(function(response) {
                                $rootScope.address = null;
                                if (response.data.result[0].attributes.street) {
                                    $rootScope.address = response.data.result[0].attributes.street + " " + response.data.result[0].attributes.number;
                                }
                            });
                        }

                        function addNewMarker(coords) {
                            popup.remove();
                            location.geo = [coords.lat, coords.lng];
                            location.city = citiesListService.getCurrentCity();
                            marker = mapService.pushMarker(location);
                            marker.addTo(map);
                        }
                });
            }]
        };
    }
})();
