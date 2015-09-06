;
(function () {
    'use strict';

    angular
        .module('mapApp.directives')
        .directive('adaptiveMenu', adaptiveMenu);

    adaptiveMenu.$inject = ['$compile', '$rootScope'];
    function adaptiveMenu($compile, $rootScope) {
        return {
            scope: true,
            restrict: 'A',
            link: function (scope, elem) {
                if ($rootScope.isAdaptive) {

                    var hideMenu = function () {
                        elem.addClass('content--adaptive');
                        $compile(el)(scope);
                        elem.prepend(el);
                    };

                    elem.addClass('content--adaptive');

                    var el = angular.element('<button ng-click="toogle()" class="btn btn-default button--toogle-sidebar"><span class="glyphicon glyphicon-th-list"></button>');
                    $compile(el)(scope);
                    elem.prepend(el);

                    scope.toogle = function () {
                        elem.removeClass('content--adaptive');
                        el.remove();
                        angular.element('.buttons--control').hide();
                    };

                    $rootScope.swipeLeft = function () {
                        hideMenu();
                        angular.element('.buttons--control').show();
                    };

                    scope.$watch('showCityList', function () {
                        if ($rootScope.showCityList && elem.hasClass('content--adaptive')) {
                            elem.removeClass('content--adaptive');
                        } else {
                            hideMenu();
                        }
                    });
                }
            }
        }
    }
})();
