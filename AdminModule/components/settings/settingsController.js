(function () {
    'use strict';
    hrAdminApp.controller('SettingsController', settingsController);
    settingsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'ToastrService'];
    function settingsController($rootScope, $scope, $state, $stateParams, ToastrService) {

        var vm = this;
        var location;

        vm.isAdmin = $rootScope.UserInfo.isAdmin;
        $scope.currentNavItem = 0;
        if (!vm.isAdmin) {
            $state.go('Settings.Documents');
             if (window.location) {
                location = window.location.hash;
                location = location.split('\/');
            }
             if (location[1] == 'settings' && location.length == 2) {
                $scope.currentNavItem = 0;
            }
             switch (location[2]) {
                case 'documents':
                    $scope.currentNavItem = 0;
                    break;
                case 'folders':
                    $scope.currentNavItem = 1;
                    $state.go('Settings.Folders');
                    break;
                case 'email_templates':
                    $scope.currentNavItem = 2;
                    $state.go('Settings.EmailTemplates');
                    break;
                case 'intro-pages':
                    $scope.currentNavItem = 3;
                    $state.go('Settings.IntroPage');
                    break;
                default:
                    $scope.currentNavItem = 0;
            }
        }
        else {
            if (window.location) {
                location = window.location.hash;
                location = location.split('\/');
            }
             if (location[1] == 'settings' && location.length == 2) {
                $scope.currentNavItem = 0;
            }
             switch (location[2]) {
                case 'general-settings':
                    $scope.currentNavItem = 0;
                    break;
                case 'users':
                    $scope.currentNavItem = 1;
                    break;
                case 'documents':
                    $scope.currentNavItem = 2;
                    break;
                case 'webform':
                    $scope.currentNavItem = 2;
                    break;
                case 'folders':
                    $scope.currentNavItem = 3;
                    break;
                case 'email_templates':
                    $scope.currentNavItem = 4;
                    break;
                case 'intro-pages':
                    $scope.currentNavItem = 5;
                    break;
                case 'branding':
                    $scope.currentNavItem = 6;
                    break;
                case 'design-webforms':
                    $scope.currentNavItem = 7;
                    break;
                default:
                    $scope.currentNavItem = 0;
            }
        }

        // if (location[2] == 'general-settings') {
        //     $scope.currentNavItem = 0;
        // }
        // else if (location[2] == 'users') {
        //     $scope.currentNavItem = 1;
        // }
        // else if (location[2] == 'documents') {
        //     $scope.currentNavItem = 2;
        // }
        // else if (location[2] == 'folders') {
        //     $scope.currentNavItem = 3;
        // }
        // else if (location[2] == 'email_templates') {
        //     $scope.currentNavItem = 4;
        // }
        // else if (location[2] == 'intro-pages') {
        //     $scope.currentNavItem = 5;
        // }
        // else if (location[2] == 'branding') {
        //     $scope.currentNavItem = 6;
        // }
        // else{
        //     $state.go('GeneralSettings');
        // }
    }
})();