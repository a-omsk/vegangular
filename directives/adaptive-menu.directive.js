;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .directive('adaptiveMenu', adaptiveMenu);

    adaptiveMenu.$inject = ['$detection', '$compile', '$rootScope'];
    function adaptiveMenu($detection, $compile, $rootScope) {
        return {
            scope: true,
            restrict: 'A',
            link: function (scope, elem) {
                if ($detection.isAndroid() || $detection.isiOS() || $detection.isWindowsPhone()) {
                    $rootScope.isAdaptive = true;

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
                    };

                    $rootScope.swipeLeft = function () {
                        hideMenu();
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