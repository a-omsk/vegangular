;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .directive('addLocationForm', addLocationForm);

    addLocationForm.$inject = ['$rootScope', 'locationService', 'citiesListService'];

    function addLocationForm($rootScope, locationService, citiesListService) {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'templates/form-template.html',
            link: function (scope) {
                angular.element(".form-rating").raty({
                    click: function (score) {
                        scope.locationData.rating = score;
                    }
                });


            },
            controller: function ($scope) {
                var city = citiesListService.getCurrentCity();
                $scope.locationData = {};
                $scope.locationData.coordinates = $rootScope.latlng.lat + ', ' + $rootScope.latlng.lng;
                $scope.locationData.address = $rootScope.address;
                $scope.locationData.city = city;
                $scope.specifications = [
                    {
                        name: 'Вегетарианская',
                        value: 'vegetarian'
                    },
                    {
                        name: 'Веганская',
                        value: 'vegan'
                    }
                ];

                $scope.valueRange = {};
                $scope.valueRange.min = 50;
                $scope.valueRange.max = 1000;
                $scope.valueRange.step = 10;

                $scope.addLocation = function () {
                    console.log($scope.locationData);
                    $scope.locationData.specification = $scope.locationData.specification.toString();

                    locationService.postLocation($scope.locationData).then(function (data) {
                        $rootScope.$broadcast('locationAdded');
                    });
                    $rootScope.openForm = false;
                };

                $scope.close = function () {
                    $rootScope.openForm = false;
                };
            }
        }
    }

})();
