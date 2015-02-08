'use strict';
/*global angular*/

angular.module('pagednaApp.directives', [])

.directive('validColumn', function(){
  //whoever decided that directive names autoconvert from camel to snake case needs to be beaten
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attribs, ngModel){
      if(!ngModel) return;
      if(!attribs.columns) return;

      ngModel.$validators.validColumn = function(modelValue, viewValue){
        var regex = /^(([A-FN-Z])(([-])((\d){1,4}))?)$/;
        var regexCheck = regex.test(modelValue);
        scope.invalidColumnName = !regexCheck;

        var duplicateCheck = true
        var columns = scope[attribs.columns];
        for(var rep=0;rep<columns.length;rep++){
          if(columns[rep].name === modelValue){
            duplicateCheck = false;
          }
        }

        scope.duplicateColumnName = !duplicateCheck;

        return regexCheck && duplicateCheck;
      }
    }
  };
});
