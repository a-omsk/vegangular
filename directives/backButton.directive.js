;
(function() {
    'use strict';

    angular
        .module('mapApp.directives')
        .directive('backButton', backButton);

    backButton.$inject = ['$state', '$stateParams'];

    function backButton($state, $stateParams) {
        return {
            restrict: 'AE',
            link: function(scope, elem, attrs) {

                scope.$on('$stateChangeStart',
                    function(event, toState, ff) {
                        var method = (toState.name === 'location-details') ? 'removeClass' : 'addClass';
                        elem[method]('ng-hide');
                    });

                elem.on('click', function() {
                    $state.go('location', { 'city': $stateParams.city });
                });
            }
        }
    };

})();
