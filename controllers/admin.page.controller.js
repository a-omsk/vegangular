;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('adminPageController', adminPageController);

    adminPageController.$inject = ['$scope', '$location', 'citiesListService', 'locationService', '$localStorage'];

    function adminPageController($scope, $location, citiesListService, locationService, $localStorage) {

        var vm = this;

        $scope.manageCity = null;

        vm.currentCity = citiesListService.getCurrentCity();
        if (!vm.currentCity) {
            currentCity = 'omsk';
        }

        locationService.getAllLocations().then(function(response){
            $scope.locations = response.data;
        });

        citiesListService.getCitiesList().then(function(response){
            $scope.cities = response.data.result
        });

        $scope.$watch('manageCity', function(data){
            if (data && data === 'all') {
                locationService.getAllLocations().then(function(response){
                    $scope.locations = response.data;
                });
            } else if (data) {
                locationService.getLocations(data).then(function(response){
                    $scope.locations = response.data;
                });
            }
        })

        vm.username = $localStorage.user.name;
        vm.email = $localStorage.user.email;

        vm.close = function () {
            $location.path('/locations/' + vm.currentCity);
        }
    }

})();