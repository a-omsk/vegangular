/**
 * TODO: Rename this controller to "CommentsController"
 */

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('CommentFormController', CommentFormController);

    CommentFormController.$inject = ['$scope', 'commentsService'];

    function CommentFormController($scope, commentsService) {
        var postComment = {};
        $scope.store = function (comment) {
            postComment = angular.copy(comment);
            postComment.id_location = $scope.location.id;
            commentsService.postNewComment(postComment).then(function () {
                $scope.comments.unshift(postComment);
            });
        };
    }

})();
