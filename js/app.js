;
(function () {
    'use strict';

    angular
        .module('mapApp', [
            'mapApp.services',
            'mapApp.controllers',
            'ngCookies',
            'ui.router',
            'ngStorage',
            'checklist-model'
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
    .constant('API_KEY', 'rubnkm7490'); /* runsbe5363 rudcgu3317 */
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
            if (data) {
                return $http.post(API_HOST + 'locations/post', data).success(function (response) {
                    console.log(response);
                })
            }
        }
    }
})();
;
(function () {
    'use strict';

    angular
        .module('mapApp.services')
        .service('mapService', mapService);

    mapService.$inject = ['$http', 'API_HOST', 'API_KEY'];

    function mapService($http, API_HOST, API_KEY) {
        var map = null;

        this.cluster = null;

        this.saveMapContainer = function (data) {
            map = data;
        };

        this.getMapContainer = function () {
            return map;
        };

        this.getObject = function (latlng) {
            return $http.get("http://catalog.api.2gis.ru/geo/search?q=" + latlng.lng + ',' + latlng.lat + "&version=1.3&key=" + API_KEY).success(function (data) {
                return data;
            });
        }
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

    locationsListController.$inject = ['$http', '$scope', '$stateParams', 'citiesListService', 'locationService', 'mapService', '$compile'];

    function locationsListController($http, $scope, $stateParams, citiesListService, locationService, mapService, $compile) {
        /**
         *       Get the map object from a service
         */

        $scope.$watch(function () {
            return mapService.getMapContainer()
        }, function (map) {
            if (map) {

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
            }

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
        .module('mapApp.controllers')
        .directive('addLocationForm', addLocationForm);

    addLocationForm.$inject = ['$rootScope', 'locationService', 'citiesListService'];

    function addLocationForm($rootScope, locationService, citiesListService) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/form-template.html',
            link: function (scope, elem, attrs) {
                $(".form-rating").raty({score: attrs.score, number: attrs.number}).on('click', function(value){
                    console.log(attrs.score);
                })


            },
            controller: function ($scope) {
                var city = citiesListService.getCurrentCity();
                $scope.locationData = {};
                $scope.locationData.coordinates = $rootScope.latlng.lat + ', ' + $rootScope.latlng.lng;
                $scope.locationData.address = $rootScope.address;
                $scope.locationData.city = city;

                $scope.addLocation = function () {
                    console.log($scope.locationData);
                    $scope.locationData.specification = $scope.locationData.specification.toString();

                    locationService.postLocation($scope.locationData).then(function (data) {
                        console.log(data);
                        $rootScope.$broadcast('locationAdded');
                    });
                    $rootScope.openForm = false;
                };

                $scope.close = function () {
                    $rootScope.openForm = false;
                };
            }
        }
    }

})();

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .directive('baloonDialog', baloonDialog);

    baloonDialog.$inject = ['$rootScope', '$localStorage'];

    function baloonDialog($rootScope, $localStorage) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/baloon-dialog.html',
            controller: function ($scope) {
                $scope.authorized = !!$localStorage.token;
                $scope.openForm = function () {
                    $rootScope.openForm = true;
                };
            }
        }
    }

})();

;
(function () {
    'use strict';

    angular
        .module('mapApp.controllers')
        .directive('enableTagging', enableTagging);

    enableTagging.$inject = ['mapService', '$compile', '$rootScope'];

    function enableTagging(mapService, $compile, $rootScope) {
        return {
            restrict: 'A',
            controller: function ($scope) {
                $scope.$watch(function () {
                    return mapService.getMapContainer()
                }, function (map) {
                    if (map) {
                        map.on('dblclick', function (e) {
                            $rootScope.latlng = e.latlng;
                            var geo = [e.latlng.lat, e.latlng.lng];
                            mapService.getObject(e.latlng).then(function (r) {
                                console.log(r);
                                $rootScope.address = null;
                                if (r.data.result[0].attributes.street) {
                                    $rootScope.address = r.data.result[0].attributes.street + " " + r.data.result[0].attributes.number;
                                }
                            });
                            var popup = DG.popup({minWidth: 500})
                                .setLatLng(geo)
                                .setContent("<div class='baloon-dialog' baloon-dialog></div>");
                            popup.addTo(map);
                            $compile(angular.element('.baloon-dialog'))($scope);
                            $scope.$apply();
                            $rootScope.$on('locationAdded', function () {
                                popup.remove();

                                var veganIcon = DG.icon({
                                    iconUrl: 'resources/icons/marker1.png',
                                    iconSize: [48, 48]
                                });
                                var marker = DG.marker(geo, {
                                    icon: veganIcon
                                }).bindPopup(name, {
                                    closeButton: false
                                });

                                marker.on('click', function () {
                                    window.location.href = '/#/locations/' + $stateParams.city + '/' + id;
                                });

                                marker.addTo(map)
                            });

                        });
                    }
                })
            }
        }
    }
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
