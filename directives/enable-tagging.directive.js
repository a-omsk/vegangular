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
                        map.on('dblclick', function (e) {
                            $rootScope.latlng = e.latlng;
                            var geo = [e.latlng.lat, e.latlng.lng];
                            mapService.getObject(e.latlng).then(function (r) {
                                console.log(r);
                                $rootScope.address = null;
                                if (r.data.result[0].attributes.street) {
                                    $rootScope.address = r.data.result[0].attributes.street + " " + r.data.result[0].attributes.number;
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
