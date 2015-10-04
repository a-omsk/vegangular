;(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('locationService', locationService);

    locationService.$inject = ['$http', 'API_HOST'];

    function locationService ($http, API_HOST) {
        var map = null;

        this.cluster = null;

        this.saveMapContainer = function (data) {
            map = data;
        };

        this.getMapContainer = function () {
            return map;
        };

        this.getAllLocations = function () {
            return $http.get(API_HOST + 'locations', {cache: true}).success(function(data){
                return data;
            })
        };

        this.getLocations = function (city, id) {
            if (!id) {
                return $http.get(API_HOST + 'locations/' + city, {cache: true}).success(function (data) {
                    return data;
                });

            }
            else if (id) {
                return $http.get(API_HOST + 'locations/' + city + '/' + id).success(function (data) {
                    return data;
                });
            }
        };

        this.postLocation = function (data) {
            if (data) {
                return $http.post(API_HOST + 'locations/post', data).success(function (response) {
                    console.log(response);
                })
            }
        };

        this.updateLocation = function(city, id, data) {
            if (city && id && data) {
                return $http.put(API_HOST + 'locations/' + city + '/' + id, data).success(function (response) {
                    return response;
                })
            }
        };

        this.deleteLocation = function (city, id) {
            if (city && id) {
                return $http.delete(API_HOST + 'locations/' + city + '/' + id).success(function (response) {
                    return response;
                })
            }
        }
    }
})();