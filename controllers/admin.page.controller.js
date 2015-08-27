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

        $scope.showEditForm = false;

        vm.editID = null;

        $scope.editLocation = function (id) {
            vm.editID = id;
            $scope.showEditForm = true;

        };

        $scope.deleteLocation = function (city, id) {
            locationService.deleteLocation(city, id).then(function(){
                $scope.locations = $scope.locations.filter(function(value){
                    return value.id !== id;
                });
            });
        };

        vm.currentCity = citiesListService.getCurrentCity();
        if (!vm.currentCity) {
            vm.currentCity = 'omsk';
        }

        locationService.getAllLocations().then(function(response){
            $scope.locations = response.data;
        });

        citiesListService.getCitiesList().then(function(response){
            $scope.cities = response.data.result
        });

        $scope.$watch('manageCity', function(data){
            console.log(data);
            if (data && data === 'all') {
                locationService.getAllLocations().then(function(response){
                    $scope.locations = response.data;
                });
            } else if (data) {
                locationService.getLocations(data).then(function(response){
                    $scope.locations = response.data;
                });
            }
        });

        vm.username = $localStorage.user.name;
        vm.email = $localStorage.user.email;

        vm.close = function () {
            $location.path('/locations/' + vm.currentCity);
        }


    }

})();