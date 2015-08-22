;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$http', '$location', 'citiesListService'];

    function MapController($scope, $http) {

    }
})();
