;
(function () {
    'use strict';

    angular
        .module('mapApp.filters')
        .filter('locationDetails', locationDetails);

    function locationDetails() {
        return function (input) {
            var output = "";
            if (input && angular.isString(input)) {
                switch (input) {
                    case 'vegan':
                        output = "Веганская";
                        break;
                    case 'vegetarian':
                        output = "Вегетарианская";
                        break;
                    case 'vegan,vegetarian':
                    case 'vegetarian,vegan':
                        output = "Веганская и вегетарианская";
                        break;
                    case 'eatery':
                        output = "Столовая";
                        break;
                    case 'cafe':
                        output = 'Кафе';
                        break;
                    case 'restaurant':
                        output = "Ресторан";
                        break;
                    case 'coffee':
                        output = "Кофейня";
                        break;
                    case 'other':
                        output = "Другое заведение";
                        break;
                }
            } else {
                output = 'Нет данных';
            }
            return output
        };
    }
})();
