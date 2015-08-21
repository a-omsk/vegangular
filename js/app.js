;
(function () {
    'use strict';

    angular
        .module('mapApp', [
            'mapApp.services',
            'mapApp.controllers',
            'ngCookies',
            'ui.router',
            'ngStorage'
        ]);
})();

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers', ['ui.router']);

})();

;
(function () {
    'use strict';

    angular
        .module('mapApp.directives', []);

})();
;
(function () {
    'use strict';

    angular
        .module('mapApp.services', []);

})();

;
(function () {
    'use strict';

    angular
        .module('mapApp')
        .config(configure)
        .run(init);

    init.$inject = ['citiesListService', 'authService', 'mapService', '$location', '$localStorage'];

    function init(citiesListService, authService, mapService, $location, $localStorage) {
        console.log("your token", $localStorage.token);

        if ($localStorage.token) {
            authService.checkLogin().then(function (data) {
                console.info("Your account", data);
            });
        }

        var centroid = [];
        var currentCity = $location.path().substr(11).replace(/\/([^/]*)$/, '');
        citiesListService.saveCurrentCity(currentCity);

        DG.then(function () {
            citiesListService.getCitiesList().then(function (callback) {
                callback.data.result.forEach(function (value) {
                    if (value.code === currentCity) {
                        centroid = DG.Wkt.toLatLngs(value.centroid)[0];
                        var map = DG.map('map', {
                            center: [centroid.lat, centroid.lng],
                            zoom: 14,
                            minZoom: 12,
                            fullscreenControl: false,
                            zoomControl: false,
                            doubleClickZoom: false
                        });

                        mapService.saveMapContainer(map);

                        //Add geolocation of user.
                        DG.control.location({
                            position: 'bottomright'
                        }).addTo(map);
                    }
                });
            });
        });
    }

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {

    }
})();
 

;(function() {
  'use strict';

  angular
    .module('mapApp')
    .constant('API_KEY', 'rudcgu3317'); /* runsbe5363 */
})();
 

;
(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('authService', authService);

    authService.$inject = ['$http', 'API_HOST', '$localStorage'];

    function authService($http, API_HOST, $localStorage) {
        this.loginThis = function (data, success, error) {
            var authUrl = API_HOST + 'authenticate';
            return $http.post(authUrl, data).success(success).error(error);
        };

        this.checkLogin = function () {

            var checkUrl = API_HOST + 'authenticate/user?token=' + $localStorage.token;
            return $http.get(checkUrl).success(function (data) {
                console.log(data)
            }).error(function (data) {
                console.error(data);
                delete $localStorage.token;
            })

        };

        this.logout = function () {
            delete $localStorage.token;
            return console.log("Session cleared");
        };
    }
})();


;
(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('citiesListService', citiesListService);

    citiesListService.$inject = ['$http'];

    function citiesListService($http) {
        var currentCity = null;

        this.getCitiesList = function () {
            return $http.get('data.json', {cache: true}).success(function (data) {
                return data;
            });
        };

        this.saveCurrentCity = function (city) {
            currentCity = city;
        };

        this.getCurrentCity = function () {
            return currentCity;
        }
    }
})();


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
            $http.post(API_HOST + 'locations/post', data).success(function (response) {
                console.log (response);
            })
        }
    }
})();
;(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('mapService', mapService);

    mapService.$inject = ['$http', 'API_HOST'];

    function mapService ($http, API_HOST) {
        var map = null;

        this.cluster = null;

        this.saveMapContainer = function (data) {
            map = data;
        };

        this.getMapContainer = function () {
            return map;
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('mapApp.services')
        .constant('API_HOST', 'http://laravel-joehill.rhcloud.com/');
})();

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$scope', 'authService', '$localStorage'];

    function AuthController($scope, authService, $localStorage) {
        function successAuth (res) {
            $localStorage.token = res.token;
            console.info('Your token:', $localStorage.token);
            vm.showModal = false;
        }

        var vm = this;

        vm.credentials = {};

        vm.showModal = false;

        vm.checkLogin = function () {
            return !!$localStorage.token;
        };

        vm.login = function () {
            console.log(vm.credentials);
            authService.loginThis(vm.credentials, successAuth, function () {
                console.error('Invalid credentials.');
            });
        };

        vm.logout = function () {
            authService.logout();
        };
    }

})();
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

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('locationDetailsController', locationDetailsController);

    locationDetailsController.$inject = ['$scope', '$stateParams', 'locationService', 'commentsService'];

    function locationDetailsController ($scope, $stateParams, locationService, commentsService) {
        locationService.getLocations($stateParams.city, $stateParams.id).then(function (callback) {
            $scope.location = callback.data[0];
        });

        commentsService.getComments($stateParams.city, $stateParams.id).then(function (callback) {
            $scope.comments = callback.data;
        });
    }
})();

/**
 * TODO: Rename this controller to "???"
 */

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('LocationFormController', LocationFormController);

    LocationFormController.$inject = ['$scope', 'locationService'];

    function LocationFormController($scope, locationService) {
        var vm = this;
        vm.locationData = {};

        vm.addLocation = function () {
            //locationService.postLocation(vm.locationData);
            console.log('posted!');
        }
    }

})();
/**
 * TODO: Completely rewrite this controller
 */

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('locationsListController', locationsListController);

    locationsListController.$inject = ['$scope', '$stateParams', 'citiesListService', 'locationService', 'mapService'];

    function locationsListController($scope, $stateParams, citiesListService, locationService, mapService) {
        var map = null;
        /**
         *       Get the map object from a service
         */

        $scope.$watch(function () {
            return mapService.getMapContainer()
        }, function (data) {
            if (data) {
                map = data;
                $scope.$broadcast('Map initializated');
            }

        });

        $scope.$on("Map initializated", function () {

            /**
             *       Set current city value to a variable
             */

            var currentCity = citiesListService.getCurrentCity();

            /**
             *       Get all locations for selected city
             */

            locationService.getLocations($stateParams.city).then(function (callback) {
                $scope.locations = callback.data;

                var markerArray = [],
                    veganIcon = DG.icon({
                        iconUrl: 'resources/icons/marker1.png',
                        iconSize: [48, 48]
                    });

                /**
                 *       Prepare a marker objects for render on the map
                 */

                if (mapService.cluster) {
                    mapService.cluster.remove();
                }

                callback.data.forEach(function (value) {
                    var geo = value.coordinates.replace(/[\[\]]/g, '').split(','),
                        name = value.name,
                        id = value.id;

                    var marker = DG.marker(geo, {
                        icon: veganIcon
                    }).bindPopup(name, {
                        closeButton: false
                    });
                    marker.on('click', function () {
                        window.location.href = '/#/locations/' + $stateParams.city + '/' + id;
                    });

                    markerArray.push(marker);

                    mapService.cluster = DG.featureGroup(markerArray);

                });


                $scope.$watch(function () {
                    return mapService.getMapContainer()
                }, function (map) {

                    mapService.cluster.addTo(map);

                });
            });

            citiesListService.getCitiesList().then(function (callback) {

                callback.data.result.forEach(function (value) {
                    if (value.code === $stateParams.city) {
                        if (currentCity !== $stateParams.city) {
                            var centroid = DG.Wkt.toLatLngs(value.centroid)[0];
                            mapService.cluster.remove();
                            map.panTo([centroid.lat, centroid.lng]);
                        }
                        citiesListService.saveCurrentCity(value.code);

                    } else {
                        return false;
                    }
                });

            });
        });
    }
})();
;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$http', '$location', 'citiesListService'];

    function MapController($scope, $http) {

        //$http.get('form-template.html').success(function (data) {
        //   map.on('dblclick', function (e) {
        //        DG.popup()
        //            .setLatLng([e.latlng.lat, e.latlng.lng])
        //            .setContent(data)
        //            .addTo(map);
        //    });
        //});
    }
})();

(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .config(route);

    route.$inject = ['$stateProvider', '$urlRouterProvider'];

    function route($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/locations/omsk');
        $stateProvider
            .state('location', {
                url: '/locations/:city',
                templateUrl: 'templates/location-info.html',
                controller: 'locationsListController',
                controllerAs: 'vm'
            })

            .state('location-details', {
                url: '/locations/:city/:id',
                templateUrl: 'templates/location-details.html',
                controller: 'locationDetailsController',
                controllerAs: 'vm'
            })

    }
})();

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .controller('ShowCityController', ShowCityController);

    ShowCityController.$inject = ['$scope', 'citiesListService'];

    function ShowCityController($scope, citiesListService) {
        citiesListService.getCitiesList().then(function (callback) {
            $scope.cities = callback.data.result;
            console.log(callback.data);
        });
    }

})();

/**
 * Created by diskrouk on 19.08.15.
 */

;
(function () {
    'use strict';

angular
	.module('mapApp.directives')
	.directive('addLocationForm', function() {
    	return {
        	restrict: 'AE',
        	template: 'templates/form-template.html',
        	controller: function($scope, $element, $attrs) {
        		$scope.addLocation = function () {
        			console.log('saved');
        		}
        	}
    };
});
})();

$(document).ready(function() {
    function changeMapHeight() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var sidebarHeight = $('div.sidebar').height();
        var controlPanelHeight = $('div.control-panel').height();
        $('.location-container').height(sidebarHeight - controlPanelHeight);     
        $('#map').height(windowHeight);
        $('#map').width(windowWidth);       
    }
    $(window).resize(function() {
        changeMapHeight();
    });
    changeMapHeight();
});

 //$(".add-location-form").on("submit", function (event) {
//    event.preventDefault();
//
//    var geoAddress, formData;
//    var url = "http://catalog.api.2gis.ru/geo/search?q=" + e.latlng.lng + ',' + e.latlng.lat + "&version=1.3&key=" + apiKey;
//
//    $.getJSON(url, function (data) {
//        var geoAddress = [data.result[0].attributes.street, data.result[0].attributes.number];
//
//        formData = {
//            'coordinates': e.latlng.lat + ', ' + e.latlng.lng,
//            'address': geoAddress.join(', '),
//            'type': $('select[name=type]').val(),
//            'name': $('input[name=name]').val(),
//            'time': $('input[name=time]').val(),
//            'specification': $('input[name=specification]').val(),
//            'rating': $('input[name=rating]').val(),
//            'description': $('textarea[name=description]').val(),
//            'city': currentCity
//        };
//
//        $.ajax({
//            type: 'POST',
//            url: 'http://api.lara.dev/locations/post',
//            data: formData,
//            dataType: 'json',
//            encode: true
//        }).done(function () {
//            $("<h3 class='form--submitted'>Ваша форма отправлена</h1>").replaceAll($('.add-location-form'));
//            DG.marker([e.latlng.lat, e.latlng.lng], {
//                icon: veganIcon
//            }).addTo(map);
//        });
//    });
//});