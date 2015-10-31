;
(function() {
    'use strict';

    angular
        .module('mapApp.services')
        .service('locationService', locationService);

    locationService.$inject = ['$q', '$http', 'API_HOST'];

    function locationService($q, $http, API_HOST) {

        this.cluster = null;

        this.getAllLocations = function() {
            return $http.get(API_HOST + 'map', {
                cache: true
            }).success(function(data) {
                return data;
            })
        };

        this.getMarkers = function(city) {
            var deferred = $q.defer(),
                _options = {
                    cache: true
                };

            $http.get(API_HOST + 'map/' + city + '/markers', _options).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.status)
                }
            });

            return deferred.promise;
        };

        this.getSpecLocation = function(city, id) {
            var deferred = $q.defer(),
                _options = {
                    cache: true
                };

            $http.get(API_HOST + 'map/' + city + '/' + id).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.status);
                }
            });

            return deferred.promise;
        }

        this.getLocations = function(city, page) {
            var deferred = $q.defer(),
                _options = {
                    cache: true
                };

            $http.get(API_HOST + 'map/' + city + (page ? '/?page=' + page : '')).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.status);
                }
            });

            return deferred.promise;

        };

        this.postLocation = function(data) {
            if (data) {
                return $http.post(API_HOST + 'map', data).success(function(response) {
                    console.log(response);
                })
            }
        };

        this.updateLocation = function(city, id, data) {
            if (city && id && data) {
                return $http.put(API_HOST + 'locations/' + city + '/' + id, data).success(function(response) {
                    return response;
                })
            }
        };

        this.deleteLocation = function(city, id) {
            if (city && id) {
                return $http.delete(API_HOST + 'locations/' + city + '/' + id).success(function(response) {
                    return response;
                })
            }
        }
    }
})();
