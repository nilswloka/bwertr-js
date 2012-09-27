'use strict';

bwertrClientApp.factory('Socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect('http://localhost:3000');
    return {
        on: function (eventName, fn) {
            socket.on(eventName, function (data) {
                $rootScope.$apply(function () {
                    fn(data);
                });
            });
        },
        emit: socket.emit
    };
}]);

bwertrClientApp.controller('MainCtrl', ['$scope', 'Socket', function ($scope, Socket) {
    Socket.on('numberOfRatingsChanged', function (data) {
        $scope.numberOfRatings = data.numberOfRatings;
    });
}]);