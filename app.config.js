;
(function () {
    'use strict';

    angular
        .module('mapApp')
        .config(configure)
        .run(init);

    init.$inject = ['$window', 'citiesListService', 'authService', 'mapService', '$location', '$localStorage', '$rootScope', '$detection'];

    function init($window, citiesListService, authService, mapService, $location, $localStorage, $rootScope, $detection) {

        var centroid = [],
            minZoom,
            zoom,
            currentCity = $location.path().substr(11).replace(/\/([^/]*)$/, '');

        $rootScope.isAdaptive = false;

        if ($localStorage.token) {
            authService.checkLogin().then(function (data) {
                console.info($localStorage.token, data);
            });
        }

        if (($detection.isAndroid() || $detection.isiOS() || $detection.isWindowsPhone()) && $window.innerWidth < 640) {
            $rootScope.isAdaptive = true;
            minZoom = 14;
            zoom = 15
        }

        else {
            minZoom = 13;
            zoom = 14;
        }

        DG.then(function () {
            citiesListService.getCitiesList().then(function (callback) {

                $rootScope.cities = callback.data.result;

                var cityObj = callback.data.result.filter(function (value) {
                    return value.code === currentCity
                });

                if (cityObj.length > 0) {
                    centroid = DG.Wkt.toLatLngs(cityObj[0].centroid)[0];
                } else {
                    centroid = {
                        lat: 54.981307,
                        lng: 73.380373
                    };
                    currentCity = 'omsk';
                }

                citiesListService.saveCurrentCity(currentCity);

                $rootScope.currentCity = currentCity;

                var map = DG.map('map', {
                    center: [centroid.lat, centroid.lng],
                    zoom: zoom,
                    minZoom: minZoom,
                    fullscreenControl: false,
                    zoomControl: false,
                    doubleClickZoom: false
                });

                $rootScope.map = map;
                $rootScope.markers = {};

                mapService.saveMapContainer(map);

                //Add geolocation of user.
                DG.control.location({
                    position: 'bottomright'
                }).addTo(map);
            });
        });
    }

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {

    }
})();
 
