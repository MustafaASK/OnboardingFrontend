(function () {
    'use strict';
    hrAdminApp.controller('TasksController', tasksController);
    tasksController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'ToastrService'];
    function tasksController($rootScope, $scope, $state, $stateParams, ToastrService) {

        var vm = this;  
        $state.go('MyTasks');
        $scope.currentNavItem = 0;
        
    }
})();