'use strict';
/*global angular*/

angular.module('pagednaApp.controllers', ['pagednaApp.services'])

.controller('mainController', function($scope, $rootScope, dataServices){
  dataServices.getJSONdata(function(err, data){
    console.log(err);
    console.log(data);
  });
});
