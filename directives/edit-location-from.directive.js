;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .directive('editLocationForm', editLocationForm);

    function editLocationForm() {
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

                scope.locationData.specification = scope.locationData.specification.split(",");

                scope.addLocation = function () {
                    scope.locationData.specification = scope.locationData.specification.toString();
                    console.log(scope.locationData);
                };

                scope.close = function () {
                    scope.$parent.$parent.showEditForm = false;
                };

                angular.element('div.form-rating-group').hide();
            }
        }
    }

})();
