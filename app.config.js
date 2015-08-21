;
(function () {
    'use strict';

    angular
        .module('mapApp')
        .config(configure)
        .run(init);

    init.$inject = ['citiesListService', 'authService', 'mapService', '$location', '$localStorage'];

    function init(citiesListService, authService, mapService, $location, $localStorage) {
        console.log("your token", $localStorage.token);

        if ($localStorage.token) {
            authService.checkLogin().then(function (data) {
                console.info("Your account", data);
            });
        }

        var centroid = [];
        var currentCity = $location.path().substr(11).replace(/\/([^/]*)$/, '');
        citiesListService.saveCurrentCity(currentCity);

        DG.then(function () {
            citiesListService.getCitiesList().then(function (callback) {
                callback.data.result.forEach(function (value) {
                    if (value.code === currentCity) {
                        centroid = DG.Wkt.toLatLngs(value.centroid)[0];
                        var map = DG.map('map', {
                            center: [centroid.lat, centroid.lng],
                            zoom: 14,
                            minZoom: 12,
                            fullscreenControl: false,
                            zoomControl: false,
                            doubleClickZoom: false
                        });

                        mapService.saveMapContainer(map);

                        //Add geolocation of user.
                        DG.control.location({
                            position: 'bottomright'
                        }).addTo(map);
                    }
                });
            });
        });
    }

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {

    }
})();
 
