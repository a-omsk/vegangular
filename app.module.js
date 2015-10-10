;
(function () {
    'use strict';

    angular
        .module('mapApp', [
            'mapApp.services',
            'mapApp.controllers',
            'mapApp.directives',
            'mapApp.filters',
            'ui.router',
            'ngTouch',
            'ngDialog',
            'ngStorage',
            'checklist-model',
            'ui.bootstrap-slider',
            'adaptive.detection'
        ]);
})();
