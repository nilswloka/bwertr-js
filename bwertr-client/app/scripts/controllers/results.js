'use strict';

bwertrClientApp.controller('ResultsCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.givenRating = $routeParams.givenRating;
}]);