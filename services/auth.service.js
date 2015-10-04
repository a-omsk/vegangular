;
(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('authService', authService);

    authService.$inject = ['$http', 'API_HOST', '$localStorage'];

    function authService($http, API_HOST, $localStorage) {
        this.loginThis = function (data, success, error) {
            var authUrl = API_HOST + 'authenticate';
            return $http.post(authUrl, data).success(success).error(error);
        };

        this.checkLogin = function () {

            var checkUrl = API_HOST + 'authenticate/user?token=' + $localStorage.token;
            return $http.get(checkUrl).success(function (data) {
                $localStorage.user = data.user;
            }).error(function (data) {
                console.error(data);
                delete $localStorage.token;
                delete $localStorage.user;
            })

        };

        this.logout = function () {
            delete $localStorage.token;
            delete $localStorage.user;
            return console.log("Session cleared");
        };
    }
})();

