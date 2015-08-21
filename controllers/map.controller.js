;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$http', '$location', 'citiesListService'];

    function MapController($scope, $http) {

        //$http.get('form-template.html').success(function (data) {
        //   map.on('dblclick', function (e) {
        //        DG.popup()
        //            .setLatLng([e.latlng.lat, e.latlng.lng])
        //            .setContent(data)
        //            .addTo(map);
        //    });
        //});
    }
})();
