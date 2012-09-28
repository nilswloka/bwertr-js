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

bwertrClientApp.factory('Ratings', ['$http', function ($http) {
    return {
        add: function (rating) {
            $http.post('http://localhost:3000/ratings', {rating: rating});
        }
    };
}]);

bwertrClientApp.controller('MainCtrl', ['$scope', '$location', 'Socket', 'Ratings', function ($scope, $location, Socket, Ratings) {
    Socket.on('numberOfRatingsChanged', function (data) {
        $scope.numberOfRatings = data.numberOfRatings;
    });

    $scope.possibleRatings = ['Poor', 'Average', 'Excellent'];

    $scope.rate = function (rating) {
        Ratings.add(rating);
        $location.path('/thankYou/' + rating);
    };
}]);