'use strict';

// Declare app level module which depends on filters, and services
var bwertrClientApp = angular.module('bwertrClientApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
