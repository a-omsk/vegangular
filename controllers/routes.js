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
                url: '/locations/{city}',
                templateUrl: 'templates/location-info.html',
                controller: 'locationsListController',
                controllerAs: 'vm'
            })

            .state('location-details', {
                url: '/locations/{city}/{id:int}',
                templateUrl: 'templates/location-details.html',
                controller: 'locationDetailsController',
                controllerAs: 'vm'
            })

            .state('admin', {
                url: '/admin',
                views: {
                    'admin': {
                        templateUrl: 'templates/admin.html',
                        controller: 'adminPageController',
                        controllerAs: 'vm',
                        resolve: {
                            auth: function (authService) {
                                return authService.checkLogin()
                            }
                        }
                    }
                }
            })
    }
})();
