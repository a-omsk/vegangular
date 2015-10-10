;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('adminPageUsersController', adminPageUsersController);

    adminPageUsersController.$inject = ['$scope', 'usersService'];

    function adminPageUsersController($scope, usersService) {
        var vm = this;

        vm.users = [];

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
                vm.users = users.data.map(function(user){
                    return angular.extend(new VegUser(), user);
                })
            });
        }
    }
})();
