;
(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('commentsService', commentsService);

    commentsService.$inject = ['$http', 'API_HOST'];

    function commentsService($http, API_HOST) {
        this.getComments = function (city, id) {

            return $http.get('mock-comments.json').success(function (data) {
                return data;
            });
        };
        
        this.postNewComment = function (data) {
            return $http.post(API_HOST + 'comments/post', data).success(function (data) {
                return data;
            });
        };
    }
})();
