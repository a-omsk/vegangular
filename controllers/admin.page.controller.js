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
        vm.manageCity = 'all';
        vm.cities = $rootScope.cities;
        vm.editID = null;
        vm.currentCity = citiesListService.getCurrentCity();
        vm.editLocation = editLocation;
        vm.deleteLocation = deleteLocation;
        vm.close = close;
        $scope.showEditForm = false;

        if (!vm.currentCity) {
            vm.currentCity = 'omsk';
        }

        activate();
        $scope.$watch('vm.manageCity', manageCityWatcher);

        function activate () {
            locationService.getAllLocations().then(function (response) {
                $scope.locations = response.data;
                vm.allLocation = angular.copy($scope.locations);
            });
        }

        function editLocation (id) {
            vm.editID = id;
            $scope.showEditForm = true;
        }

        function deleteLocation (city, id) {
            locationService.deleteLocation(city, id).then(function () {
                $scope.locations = $scope.locations.filter(function (value) {
                    return value.id !== id;
                });
            });
        }

        function close () {
            $location.path('/locations/' + vm.currentCity);
        }

        function manageCityWatcher (data) {
            if (data && data === 'all') {
                $scope.locations = vm.allLocation;
            }

            if (data && data !== 'all') {
                $scope.locations = vm.allLocation.filter(function(location){
                    return data === location.city;
                })
            }
        }
    }

})();
