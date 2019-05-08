(function () {
    'use strict';
    hrAdminApp.controller('ReportsController', reportsController);
    // TODO - Need to add ReportsService in inject and function
    reportsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$mdDialog', 'ToastrService'];
    function reportsController($rootScope, $scope, $state, $stateParams, $mdDialog, ToastrService) {

        var vm = this; 
        var location;
        
        if (window.location) {
            location = window.location.hash;
            location = location.split('\/');
        }
        if (location[1] == 'reports' && location.length == 2) {
            $scope.currentNavItem = 0;
        }
        
        switch (location[2]) {
            case 'static':
                $scope.currentNavItem = 0;
                break;
            case 'dynamic':
                $scope.currentNavItem = 1;
                break;
            default:
                $scope.currentNavItem = 0;
        }
    }
})();