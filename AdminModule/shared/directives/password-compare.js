
(function () {
    "use strict";
    hrAdminApp.directive('compareTo', ['$parse', function ($parse) {
        return {
            require: "ngModel",
            scope: {
              otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {
      
              ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
              };
      
              scope.$watch("otherModelValue", function() {
                ngModel.$validate();
              });
            }
        };
    }]);

    hrAdminApp.directive('checkDuplicateNames', ['$parse','$filter', function ($parse, $filter) {
      return {
          require: "ngModel",
          scope: {
            allformfields : '=checkDuplicateNames',
            currntfield:'=currntfield'
          },
          link: function(scope, element, attributes, ngModel) {
    
            ngModel.$validators.checkDuplicateNames = function(modelValue) {
              console.log(scope.currntfield);
              var tempAllList = angular.copy(scope.allformfields);
              // var listAry = $filter('filter')(tempAllList, { 'name': scope.currntfield.name }, true);

              // var indx = tempAllList.findIndex(listAry[0]);
              var i;
              for (i = 0; i < tempAllList.length ; i++) {
                      if (tempAllList[i].name === scope.currntfield.name) {
                          break;
                      }
              }
              tempAllList.splice(i, 1);
              // if(i){

              // }
              
              var ary = $filter('filter')(tempAllList, { 'labelName': modelValue }, true);
              if(ary && ary.length){
                  return false;
              }
              return true;
            };
          }
      };
  }]);
}());