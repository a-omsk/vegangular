;
(function() {
    'use strict';

    angular
        .module('mapApp.directives')
        .directive('adaptiveMenu', adaptiveMenu);

    adaptiveMenu.$inject = ['$compile', '$rootScope', '$state', '$stateParams'];

    function adaptiveMenu($compile, $rootScope, $state, $stateParams) {
        return {
            scope: true,
            restrict: 'A',
            link: function(scope, elem) {
                var el = angular.element('<button ng-click="toggle()" class="btn btn-default button--toogle-sidebar"><span class="glyphicon glyphicon-th-list"></button>');

                if ($rootScope.isAdaptive) {

                    scope.toggle = toggle;
                    $rootScope.swipeLeft = swipeLeft;
                    scope.$watch('showCityList', showCityList);
                    scope.$on('adaptiveLocationSelected', showSidebar);

                    addToggleButton();
                }

                function addToggleButton() {
                    elem.addClass('content--adaptive');
                    $compile(el)(scope);
                    elem.prepend(el);
                }

                function toggle() {
                    elem.removeClass('content--adaptive');
                    el.remove();
                    angular.element('.buttons--control').hide();
                }

                function showSidebar() {
                    if (elem.hasClass('content--adaptive')) {
                        toggle();
                    }
                }

                function hideSidebar() {
                    if ($state.current.name === 'location-details') {
                        $state.go('location', {
                            city: $state.params.city
                        });
                    }
                    addToggleButton();
                }

                function swipeLeft() {
                    hideSidebar();
                    angular.element('.buttons--control').show();
                }

                function showCityList() {
                    if ($rootScope.showCityList) {
                        showSidebar();
                    } else {
                        hideSidebar();
                        angular.element('.buttons--control').show();
                    }
                }
            }
        };
    }
})();
