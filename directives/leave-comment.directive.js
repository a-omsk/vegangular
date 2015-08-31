;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .directive('leaveComment', leaveComment);

    leaveComment.$inject = ['commentsService', '$localStorage'];

    function leaveComment(commentsService, $localStorage) {
        return {
            scope: '@',
            restrict: 'AE',
            templateUrl: 'templates/leave-comment.html',
            link: function (scope) {
                scope.$watch('location', function (location) {
                    if (location) {
                        scope.comment = {};
                        scope.comment.author = $localStorage.user.name;
                        $('.comment-rating').raty({
                            number: 5, click: function (score) {
                                scope.comment.rating = score;
                            }
                        });

                        scope.store = function () {
                            if (scope.comment.rating) {
                                var postComment = angular.copy(scope.comment);
                                postComment.id_location = scope.location.id;
                                commentsService.postNewComment(postComment).then(function (data) {
                                    postComment.created_at = Date.now();
                                    scope.comments.push(postComment);
                                });
                            }
                        };
                    }
                });
            }
        }
    }
})();