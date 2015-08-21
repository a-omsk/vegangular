;(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('commentsService', commentsService);

    commentsService.$inject = ['$http', 'API_HOST'];

    function commentsService($http, API_HOST) {
        this.getComments = function (city, id) {

            var comments = $http.get(API_HOST + 'locations/' + city + '/' + id + '/comments').success(function (data) {
                return data;
            });
            return comments;
        };
        this.postNewComment = function (data) {
            var comment = $http.post(API_HOST + 'comments/post', data).success(function (data) {
                return data;
            });
            return comment;
        };
    }
})();