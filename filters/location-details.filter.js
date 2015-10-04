;
(function () {
	'use strict';

	angular
		.module('mapApp.filters')
		.filter('locationDetails', locationDetails);

	function locationDetails() {
		return function (input) {
			if (input && angular.isString(input)) {
				return {
					'vegan': "Веганская",
					'vegetarian': "Вегетарианская",
					'vegan,vegetarian': 'Веганская и вегетарианская',
					'vegetarian,vegan': 'Веганская и вегетарианская',
					'eatery': 'Столовая',
					'cafe': 'Кафе',
					'restaurant': 'Ресторан',
					'coffee': 'Кофейня',
					'other': 'Другое заведение'
				}[input];
			}
		};
	}
})();
