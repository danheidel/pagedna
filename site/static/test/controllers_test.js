'use strict';

describe('mainController.controllers', function(){
  beforeEach(module('pagednaApp'));

  var $controller;
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.checkColumnName', function(){
    var $scope, controller;

    beforeEach(function(){
      $scope = {};
      controller = $controller('mainController', {$scope: $scope});
    });

    it('recognizes valid column names', function(){
      expect($scope.checkColumnName('A')).toEqual(true);
      expect($scope.checkColumnName('A-1')).toEqual(true);
      expect($scope.checkColumnName('A-12')).toEqual(true);
      expect($scope.checkColumnName('A-123')).toEqual(true);
      expect($scope.checkColumnName('A-1234')).toEqual(true);
      expect($scope.checkColumnName('F-1234')).toEqual(true);
      expect($scope.checkColumnName('N-1234')).toEqual(true);
    });

    it('rejects invalid column names', function(){
      expect($scope.checkColumnName('')).toEqual(false);
      expect($scope.checkColumnName('a')).toEqual(false);
      expect($scope.checkColumnName('a-1')).toEqual(false);
      expect($scope.checkColumnName('a-1234')).toEqual(false);
      expect($scope.checkColumnName('a1')).toEqual(false);
      expect($scope.checkColumnName('A1')).toEqual(false);
      expect($scope.checkColumnName('1')).toEqual(false);
      expect($scope.checkColumnName('1234')).toEqual(false);
      expect($scope.checkColumnName('A-')).toEqual(false);
      expect($scope.checkColumnName('-1234')).toEqual(false);
      expect($scope.checkColumnName('-1')).toEqual(false);
      expect($scope.checkColumnName('A-12345')).toEqual(false);
      expect($scope.checkColumnName('A-1b234')).toEqual(false);
      expect($scope.checkColumnName('A-1234 A-1234')).toEqual(false);
      expect($scope.checkColumnName('1234')).toEqual(false);
    });
  });
});
