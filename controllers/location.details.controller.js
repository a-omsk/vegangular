;
(function () {
	'use strict';

	angular
		.module('mapApp.controllers')
		.controller('locationDetailsController', locationDetailsController);

	locationDetailsController.$inject = ['$q', '$rootScope', '$scope', '$stateParams', 'mapService', 'locationService', 'commentsService'];

	function locationDetailsController($q, $rootScope, $scope, $stateParams, mapService, locationService, commentsService) {

		var getLocation = locationService.getLocations($stateParams.city, $stateParams.id),
			getComments = commentsService.getComments($stateParams.city, $stateParams.id);

		$q.all([getLocation, getComments]).then(function (response) {
			$scope.location = response[0].data[0];
			$scope.comments = response[1].data;

			if (mapService.cluster) {
				var prop;

				for (prop in mapService.cluster._layers) {
					if (mapService.cluster._layers.hasOwnProperty(prop)) {
						_.memoize(mapService.filterMarker(prop, $stateParams.id));
					}
				}

			} else {
				$rootScope.$watch('map', function (map) {
					if (map) {
						var marker = mapService.pushMarker($scope.location);
						marker.addTo($rootScope.map);
						$rootScope.$broadcast('adaptiveLocationSelected');
						$rootScope.map.panTo([marker._latlng.lat, marker._latlng.lng], {animate: true});
						$rootScope.mapLoading = false;
						$scope.$on('$destroy', function () {
							marker.remove();
						})
					}
				});
			}
		});
	}
})();
