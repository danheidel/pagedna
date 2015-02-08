'use strict';
/*global angular*/

var apiUrl = '/api/';

angular.module('pagednaApp.services', [])

.service('dataServices', function($rootScope, $http){
  function getJsonData(callback){
    $http.get(apiUrl + 'data')
    .success(function(data){
      callback(null, data)
    })
    .error(function(data){
      callback('error getting data', null);
    });
  }

  return {
    getJsonData: getJsonData
  }
});
