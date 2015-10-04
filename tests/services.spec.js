(function() {
    describe('mapApp', function() {
        beforeEach(function() {
            module('mapApp');
        });

        var service, httpBackend, url, API_HOST;
        beforeEach(function() {
            angular.mock.inject(function($injector) {
                httpBackend = $injector.get('$httpBackend');
                locationService = $injector.get('locationService');
                API_HOST = $injector.get('API_HOST');
                url = API_HOST + 'locations/omsk';

            })
        });

        describe('getLocations', function() {
            var response = [{
                "id": 1, "coordinates": "54.9769240537932, 73.39931488037111", "name": "testetst",
                "type": "restaurant", "specification": "vegetarian", "time": "121221",
                "description": "test", "created_at": "2015-05-28 10:39:39", "updated_at": "2015-08-29 14:20:19", "price": "",
                "address": "", "city": "omsk", "voters": 11, "created_by": "admin@admin.org", "rating": 1.5
            }];

            it("should return a valid name of first location", inject(function() {
                httpBackend.expectGET(url).respond(response);

                locationService.getLocations('omsk').success(function(result) {
                    expect(result[0].name).toEqual('testetst');
                });

                httpBackend.flush();
            }))
        })

    });
})()
