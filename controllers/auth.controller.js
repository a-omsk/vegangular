;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['authService', '$localStorage', '$location'];

    function AuthController(authService, $localStorage, $location) {
        function successAuth (res) {
            $localStorage.token = res.token;
            console.info('Your token:', $localStorage.token);
            vm.showModal = false;
        }

        var vm = this;

        vm.credentials = {};

        vm.showModal = false;

        vm.goAdminRoom = function () {
            $location.path('/admin');
        };

        vm.checkLogin = function () {
            return !!$localStorage.token;
        };

        vm.login = function () {
            console.log(vm.credentials);
            authService.loginThis(vm.credentials, successAuth, function () {
                console.error('Invalid credentials.');
            });
        };

        vm.logout = function () {
            authService.logout();
        };
    }

})();