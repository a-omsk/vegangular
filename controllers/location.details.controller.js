;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('locationDetailsController', locationDetailsController);

    locationDetailsController.$inject = ['$scope', '$stateParams', 'locationService', 'commentsService'];

    function locationDetailsController ($scope, $stateParams, locationService, commentsService) {
        locationService.getLocations($stateParams.city, $stateParams.id).then(function (callback) {
            $scope.location = callback.data[0];
        });

        commentsService.getComments($stateParams.city, $stateParams.id).then(function (callback) {
            $scope.comments = callback.data;
        });
    }
})();
