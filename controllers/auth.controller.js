;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$scope', 'authService', '$localStorage'];

    function AuthController($scope, authService, $localStorage) {
        function successAuth (res) {
            $localStorage.token = res.token;
            console.info('Your token:', $localStorage.token);
            vm.showModal = false;
        }

        var vm = this;

        vm.credentials = {};

        vm.showModal = false;

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