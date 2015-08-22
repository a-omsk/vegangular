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
                            mapService.getObject(e.latlng).then(function (r) {
                                console.log(r);
                                $rootScope.address = null;
                                if (r.data.result[0].attributes.street) {
                                    $rootScope.address = r.data.result[0].attributes.street + " " + r.data.result[0].attributes.number;
                                }
                            });
                            DG.popup({minWidth: 500})
                                .setLatLng([e.latlng.lat, e.latlng.lng])
                                .setContent("<div class='baloon-dialog' baloon-dialog></div>")
                                .addTo(map);
                            $compile(angular.element('.baloon-dialog'))($scope);
                            $scope.$apply();
                        });
                    }
                })
            }
        }
    }
})();
