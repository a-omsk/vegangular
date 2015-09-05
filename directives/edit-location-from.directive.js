;
(function () {
    'use strict';

    angular
        .module('mapApp.directives')
        .directive('editLocationForm', editLocationForm);

    editLocationForm.$inject = ['locationService'];

    function editLocationForm(locationService) {
        return {
            restrict: 'AE',
            replace: true,
            scope: true,
            templateUrl: 'templates/form-template.html',
            controller: 'adminPageController',
            link: function (scope, elem, attrs) {

                var selectedLocation = scope.locations.filter(function (value) {

                    return value.id == attrs.selectedid;
                });

                scope.locationData = selectedLocation[0];

                scope.valueRange = {};
                scope.valueRange.min = 50;
                scope.valueRange.max = 1000;
                scope.valueRange.step = 10;
                scope.specifications = [
                    {
                        name: 'Вегетарианская',
                        value: 'vegetarian'
                    },
                    {
                        name: 'Веганская',
                        value: 'vegan'
                    }
                ];

                if (scope.locationData.specification) {
                    scope.locationData.specification = scope.locationData.specification.split(",");
                }   

                scope.addLocation = function () {
                    scope.locationData.specification = scope.locationData.specification.toString();
                    console.log(scope.locationData);
                    locationService.updateLocation(scope.locationData.city, scope.locationData.id, scope.locationData).then(function () {
                        scope.locationData.specification = scope.locationData.specification.split(",");
                        scope.$parent.$parent.showEditForm = false;
                    })
                };

                scope.close = function () {
                    scope.$parent.$parent.showEditForm = false;
                };

                angular.element('div.form-rating-group').remove();
            }
        }
    }

})();
