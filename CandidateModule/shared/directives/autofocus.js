// delay 300ms instead of 0 to let other async components to load before setting the focus.
candidateApp
  .directive('obAutofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      }, 300);
    }
  }
}]);