(function() {

    'use strict';

    angular.module('mapApp')
        .directive('customInfiniteScroll', customInfiniteScroll);

    customInfiniteScroll.$inject = ['$window', '$document'];

    function customInfiniteScroll($window, $document) {
        return {
            restrict: 'A',
            scope: {
                scrollCallback: '='
            },
            link: function(scope, elem, attrs) {
                elem.on('scroll', _.debounce(eventHandler, 500));

                function eventHandler() {
                    var a = elem.height() + elem.scrollTop();
                    var b = elem.children().height();

                    if (a - b >= 0) {
                        scope.scrollCallback();
                    }
                }
            }
        };
    }
})();
