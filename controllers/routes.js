(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .config(route);

    route.$inject = ['$stateProvider', '$urlRouterProvider'];

    function route($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/locations/omsk');
        $stateProvider
            .state('location', {
                url: '/locations/:city',
                templateUrl: 'templates/location-info.html',
                controller: 'locationsListController',
                controllerAs: 'vm'
            })

            .state('location-details', {
                url: '/locations/:city/:id',
                templateUrl: 'templates/location-details.html',
                controller: 'locationDetailsController',
                controllerAs: 'vm'
            })

    }
})();
