'use strict';
/*global angular*/

var app = angular.module('pagednaApp', ['ngRoute', 'pagednaApp.services', 'pagednaApp.controllers',
  'pagednaApp.directives']);

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'templates/content.html',
    controller: 'mainController'
  });
});
