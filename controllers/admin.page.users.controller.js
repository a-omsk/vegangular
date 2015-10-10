;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('adminPageUsersController', adminPageUsersController);

    adminPageUsersController.$inject = ['$scope', 'usersService'];

    function adminPageUsersController($scope, usersService) {
        var vm = this;

        activate();

        function VegUser() {
            this.deleteUser = function() {
                usersService.deleteUser(this.name);
            };

            this.updateUser = function() {
                usersService.updateUser(this.name);
            };
        }

        function activate() {
            usersService.getUsers().then(function(users){
                vm.users = [];

                angular.forEach(users.data, function(user){
                    vm.users.push(angular.merge(new VegUser(), user));
                });
            });
        }
    }
})();
