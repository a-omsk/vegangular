;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('adminPageController', adminPageController);

    adminPageController.$inject = ['$rootScope', '$scope', '$location', 'citiesListService', 'locationService', '$localStorage'];

    function adminPageController($rootScope, $scope, $location, citiesListService, locationService, $localStorage) {

        var vm = this;

        vm.username = $localStorage.user.name;

        vm.email = $localStorage.user.email;

        $scope.manageCity = null;

        $scope.showEditForm = false;

        $scope.cities = $rootScope.cities;

        vm.editID = null;

        vm.currentCity = citiesListService.getCurrentCity();
        if (!vm.currentCity) {
            vm.currentCity = 'omsk';
        }

        $scope.editLocation = function (id) {
            vm.editID = id;
            $scope.showEditForm = true;

        };

        $scope.deleteLocation = function (city, id) {
            locationService.deleteLocation(city, id).then(function () {
                $scope.locations = $scope.locations.filter(function (value) {
                    return value.id !== id;
                });
            });
        };

        locationService.getAllLocations().then(function (response) {
            $scope.locations = response.data;
        });

        /*$scope.$watch('manageCity', function (data) {
            console.log(data);
            if (data && data === 'all') {
                locationService.getAllLocations().then(function (response) {
                    $scope.locations = response.data;
                });
            } else if (data) {
                locationService.getLocations(data).then(function (response) {
                    $scope.locations = response.data;
                });
            }
        });*/

        vm.close = function () {
            $location.path('/locations/' + vm.currentCity);
        }


    }

})();