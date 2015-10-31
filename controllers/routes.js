(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .config(route);

    route.$inject = ['$stateProvider', '$urlRouterProvider'];

    function route($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/locations/omsk');
        $urlRouterProvider.when('/admin', '/admin/locations');
        $stateProvider
            .state('location', {
                url: '/locations/{city}',
                templateUrl: 'templates/location-info.html',
                controller: 'locationsListController',
                controllerAs: 'vm'
            })

            .state('location-details', {
                url: '/locations/{city}/{id:int}?location',
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
                            auth: ['authService', function (authService) {
                                return authService.checkLogin()
                            }]
                        }
                    }
                }
            })
            .state('admin.locations', {
                url: '/locations',
                templateUrl: 'templates/user/locations.html',
                controller: 'adminPageController',
                controllerAs: 'vm',
                resolve: {
                    auth: ['authService', function (authService) {
                        return authService.checkLogin()
                    }]
                }

            })
            .state('admin.comments', {
                url: '/comments',
                templateUrl: 'templates/user/comments.html',
                controller: 'adminPageCommentsController',
                controllerAs: 'vm',
                resolve: {
                    auth: ['authService', function (authService) {
                        return authService.checkLogin()
                    }]
                }
            })
            .state('admin.users', {
                url: '/users',
                templateUrl: 'templates/user/users.html',
                controller: 'adminPageUsersController',
                controllerAs: 'vm',
                resolve: {
                    auth: ['authService', function (authService) {
                        return authService.checkLogin()
                    }]
                }
            })
            .state('admin.settings', {
                url: '/settings',
                templateUrl: 'templates/user/settings.html',
                controller: 'adminPageSettingsController',
                controllerAs: 'vm',
                resolve: {
                    auth: ['authService', function (authService) {
                        return authService.checkLogin()
                    }]
                }
            })
    }
})();
