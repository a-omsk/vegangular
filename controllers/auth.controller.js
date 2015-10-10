;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['authService', '$scope', '$localStorage', '$location', 'popupService'];

    function AuthController(authService, $scope, $localStorage, $location, popupService) {

        var vm = this;

        vm.credentials = {};
        vm.showPopup = showPopup;
        vm.goAdminRoom = goAdminRoom;
        vm.checkLogin = checkLogin;
        vm.login = login;
        vm.logout = logout;

        function logout () {
            authService.logout();
        }

        function login () {
            authService.loginThis(vm.credentials, successAuth, function () {
                console.error('Invalid credentials.');
            });
        }

        function successAuth (res) {
            $localStorage.token = res.token;
            $scope.$emit('userLoginSuccess');
            popupService.closePopup();
        }

        function showPopup() {
            popupService.loginPopup();
        }

        function goAdminRoom () {
            $location.path('/admin/locations');
        }

        function checkLogin () {
            return !!$localStorage.token;
        }
    }

})();
