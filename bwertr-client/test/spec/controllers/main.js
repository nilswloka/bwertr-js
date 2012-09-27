'use strict';

describe('Controller: MainCtrl', function () {

    var MainCtrl, Socket, scope;

    beforeEach(function () {
        module('bwertrClientApp', function ($provide) {
            Socket = {
                on: jasmine.createSpy()
            };
            $provide.value('Socket', Socket);
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
});
