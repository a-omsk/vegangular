;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .directive('enableTagging', enableTagging);

    enableTagging.$inject = ['mapService', '$compile', '$rootScope'];

    function enableTagging(mapService, $compile, $rootScope) {
        return {
            restrict: 'A',
            controller: function ($scope) {
                $scope.$watch(function () {
                    return mapService.getMapContainer()
                }, function (map) {
                    if (map) {
                        map.on('dblclick', function (event) {
                            $rootScope.latlng = event.latlng;
                            var geo = [event.latlng.lat, event.latlng.lng];
                            mapService.getObject(event.latlng).then(function (response) {
                                $rootScope.address = null;
                                if (response.data.result[0].attributes.street) {
                                    $rootScope.address = response.data.result[0].attributes.street + " "
                                        + response.data.result[0].attributes.number;
                                }
                            });
                            var popup = DG.popup({minWidth: 500})
                                .setLatLng(geo)
                                .setContent("<div class='baloon-dialog' baloon-dialog></div>");
                            popup.addTo(map);
                            $compile(angular.element('.baloon-dialog'))($scope);
                            $scope.$apply();
                            $rootScope.$on('locationAdded', function () {
                                popup.remove();

                                var veganIcon = DG.icon({
                                    iconUrl: 'resources/icons/marker1.png',
                                    iconSize: [48, 48]
                                });
                                var marker = DG.marker(geo, {
                                    icon: veganIcon
                                }).bindPopup(name, {
                                    closeButton: false
                                });
                                marker.on('click', function () {
                                    window.location.href = '/#/locations/' + $stateParams.city + '/' + id;
                                });

                                marker.addTo(map)
                            });

                        });
                    }
                })
            }
        }
    }
})();
