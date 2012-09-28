'use strict';

var bwertrClientApp = angular.module('bwertrClientApp', [])
    .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/thankYou/:givenRating', {
            templateUrl: 'views/thankYou.html',
            controller: 'ResultsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
