;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('adminPageController', adminPageController);

    adminPageController.$inject = ['$scope', '$location', 'citiesListService', 'locationService', '$localStorage'];

    function adminPageController($scope, $location, citiesListService, locationService, $localStorage) {

        var vm = this;
        var currentCity = citiesListService.getCurrentCity();

        locationService.getAllLocations().then(function(response){
            $scope.locations = response.data;
        });

        vm.username = $localStorage.user.name;
        vm.email = $localStorage.user.email;

        vm.close = function () {
            $location.path('/locations/' + currentCity);
        }
    }

})();