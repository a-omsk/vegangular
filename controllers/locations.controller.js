/**
 * TODO: Rename this controller to "???"
 */

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('LocationFormController', LocationFormController);

    LocationFormController.$inject = ['$scope', 'locationService'];

    function LocationFormController($scope, locationService) {
        var vm = this;
        vm.locationData = {};

        vm.addLocation = function () {
            //locationService.postLocation(vm.locationData);
            console.log('posted!');
        }
    }

})();