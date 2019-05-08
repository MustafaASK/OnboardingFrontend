
(function () {
    "use strict";
    candidateApp.directive('compareTo', ['$parse', function ($parse) {
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

}());