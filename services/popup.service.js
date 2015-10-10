;
(function () {
	'use strict';

	angular
		.module('mapApp.services')
		.service('popupService', popupService);

	popupService.$inject = ['ngDialog'];

	function popupService(ngDialog) {

        this.closePopup = function() {
            ngDialog.closeAll();
        }

        this.loginPopup = function() {
            ngDialog.closeAll();
            ngDialog.open({
                template: 'templates/popups/loginPopup.html',
                controller: 'AuthController',
                controllerAs: 'vm'
            });
        }
    }
})();
