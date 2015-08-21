;
(function () {
    'use strict';

angular
	.module('mapApp.directives')
	.directive('addLocationForm', function() {
    	return {
        	restrict: 'AE',
        	template: 'templates/form-template.html',
        	controller: function($scope, $element, $attrs) {
        		$scope.addLocation = function () {
        			console.log('saved');
        		}
        	}
    };
});
})();
