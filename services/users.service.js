;
(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('usersService', usersService);

    usersService.$inject = ['$http', 'API_HOST'];

    function usersService($http, API_HOST) {
        this.getUsers = function () {
            return $http.get(API_HOST + 'users', {cache: true}).success(function(data){
                return data;
            })
        };
    }

})();