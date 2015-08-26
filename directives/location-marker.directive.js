;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .directive('locationMarker', locationMarker);

    locationMarker.$inject = ['$rootScope', '$location'];
    function locationMarker($rootScope, $location) {
        return {
            scope: true,
            restrict: 'E',
            controller: 'locationsListController',
            link: function (scope) {
                /*var veganIcon = DG.icon({
                    iconUrl: 'resources/icons/marker1.svg',
                    iconSize: [48, 48]
                });
                var geo = scope.location.coordinates.replace(/[\[\]]/g, '').split(','),
                    name = scope.location.name,
                    id = scope.location.id;

                var marker = DG.marker(geo, {
                    icon: veganIcon
                }).bindPopup(name, {
                    closeButton: false
                });

                marker.on('click', function () {
                    $location.path('locations/' + scope.location.city + '/' + id);
                });

                $rootScope.markerArray.push(marker);

                marker.addTo($rootScope.map);*/
            }
        }
    }
})();
