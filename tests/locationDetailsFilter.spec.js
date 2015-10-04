(function() {
    describe('mapApp', function() {
        beforeEach(function() {
            module('mapApp');
        });

        it('has a location details filter', inject(function($filter) {
            expect($filter('locationDetails')).not.toBeNull();
        }));

        it("should return 'Веганская' if i put 'vegan'", inject(function(locationDetailsFilter) {
            expect(locationDetailsFilter('vegan')).toBe('Веганская');
        }));

        it("should return 'Кофейня' if i put 'coffee'", inject(function(locationDetailsFilter) {
            expect(locationDetailsFilter('coffee')).toBe('Кофейня');
        }))
    });
})()
