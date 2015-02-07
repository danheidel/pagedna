'use strict';
/*global angular*/

var apiUrl = '/api/';

angular.module('pagednaApp.services', [])

.service('dataServices', function($rootScope, $http){
  function getJSONdata(callback){
    $http.get(apiUrl + 'data')
    .success(function(data){
      callback(null, data)
    })
    .error(function(data){
      callback(data, null);
    });
  }

  return {
    getJSONdata: getJSONdata
  }
});
