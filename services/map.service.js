;
(function () {
	'use strict';

	angular
		.module('mapApp.services')
		.service('mapService', mapService);

	mapService.$inject = ['$rootScope', '$http', '$location', 'API_KEY'];

	function mapService($rootScope, $http, $location, API_KEY) {
		var vm = this;

		vm.cluster = null;

		this.filterMarker = function (prop, id) {
			var marker = vm.cluster._layers[prop],
				latlng = [marker._latlng.lat, marker._latlng.lng];

			if (marker.cityId === id) {
				$rootScope.map.panTo(latlng, {animate: true});
			} else {
				vm.cluster.removeLayer(prop);
			}
		};

		this.pushMarker = function (value) {
			var geo = value.geo || value.coordinates.replace(/[\[\]]/g, '').split(','),
				id = value.id || '',

				veganIcon = DG.icon({
					iconUrl: 'resources/icons/marker1.svg',
					iconSize: [56, 56]
				}),

				marker = DG.marker(geo, {
					icon: veganIcon
				});

			marker.cityId = id;

			marker.on('click', function () {
				$rootScope.$apply(function () {
					$location.path('/locations/' + value.city + '/' + id);
				});
			});

			marker.on('dblclick', function(){
				marker.bindPopup('Добавить еще одно заведение в этом месте?').openPopup();
			})

			return marker;
		};

		this.getObject = function (latlng) {
			return $http.get("http://catalog.api.2gis.ru/geo/search?q=" + latlng.lng + ',' + latlng.lat + "&version=1.3&key=" + API_KEY).success(function (data) {
				return data;
			});
		}
	}
})();
