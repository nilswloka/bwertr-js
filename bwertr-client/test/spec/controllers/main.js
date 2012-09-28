'use strict';

describe('Controller: MainCtrl', function () {

    var MainCtrl, Socket, Ratings, scope;

    beforeEach(function () {
        module('bwertrClientApp', function ($provide) {
            Socket = {
                on: jasmine.createSpy()
            };
            Ratings = {
                add: jasmine.createSpy()
            };
            $provide.value('Socket', Socket);
            $provide.value('Ratings', Ratings);
        });

        inject(function ($controller) {
            scope = {};
            MainCtrl = $controller('MainCtrl', {
                $scope: scope
            });
        });
    });

    it('should register a listener with Socket service', function () {
        expect(Socket.on).toHaveBeenCalledWith('numberOfRatingsChanged', jasmine.any(Function) );
    });

    it('should add possible ratings to scope', function () {
        expect(scope.possibleRatings).toEqual(['Poor', 'Average', 'Excellent']);
    });

    it('should save givenRating via Ratings service', function () {
        var rating = 'Poor';
        scope.rate(rating);
        expect(Ratings.add).toHaveBeenCalledWith('Poor');
    });
});
