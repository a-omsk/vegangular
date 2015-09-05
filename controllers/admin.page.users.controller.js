;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('adminPageUsersController', adminPageUsersController);

    adminPageUsersController.$inject = ['$scope', 'usersService'];

    function adminPageUsersController($scope, usersService) {
        usersService.getUsers().then(function(users){
            $scope.users = users.data;
            console.info(users.data);
        })
    }
})();