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
            templateUrl: 'templates/form-template.html',
            link: function (scope, elem, attrs) {
                $(".form-rating").raty({score: attrs.score, number: attrs.number}).on('click', function(value){
                    console.log(attrs.score);
                })


            },
            controller: function ($scope) {
                var city = citiesListService.getCurrentCity();
                $scope.locationData = {};
                $scope.locationData.coordinates = $rootScope.latlng.lat + ', ' + $rootScope.latlng.lng;
                $scope.locationData.address = $rootScope.address;
                $scope.locationData.city = city;

                $scope.addLocation = function () {
                    console.log($scope.locationData);
                    $scope.locationData.specification = $scope.locationData.specification.toString();

                    locationService.postLocation($scope.locationData).then(function (data) {
                        console.log(data);
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
