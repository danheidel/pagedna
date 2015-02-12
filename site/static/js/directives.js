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

      ngModel.$validators.validName = function(modelValue, viewValue){
        var regex = /^(([A-FN-Z])(([-])((\d){1,4}))?)$/;
        var regexCheck = regex.test(modelValue);
        return regexCheck;
      };

      ngModel.$validators.noDuplicates = function(modelValue, viewValue){
        var columns = scope[attribs.columns];
        return duplicateCheck(modelValue, columns);
      };

      function duplicateCheck(input, priorValues){
        var duplicateCheck = true;
        for(var rep=0;rep<priorValues.length;rep++){
          if(priorValues[rep].name === input){
            duplicateCheck = false;
          }
        }
        return duplicateCheck;
      }

      scope.$watch(attribs.columns, function(newVal){
        ngModel.$setValidity("noDuplicates",
          duplicateCheck(ngModel.$modelValue, newVal));
      }, true);
    }
  };
});
