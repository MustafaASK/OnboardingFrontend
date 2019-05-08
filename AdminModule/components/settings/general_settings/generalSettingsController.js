(function () {
    'use strict';
    hrAdminApp.controller('GeneralSettingsController', generalSettingsController);
    generalSettingsController.$inject = ['$rootScope', '$state', '$stateParams', 'ToastrService', 'GeneralSettingsService', '$scope'];
    function generalSettingsController($rootScope, $state, $stateParams, ToastrService, GeneralSettingsService, $scope) {

        var vm = this;
        $scope.submitted = false;
        $scope.$parent.currentNavItem = 0;
        vm.addGeneralSettings = addGeneralSettings;
        vm.resetGeneralSettings = resetGeneralSettings;

        if ($rootScope.UserInfo.isAdmin) {
            getGeneralSettings();
        }

        function getGeneralSettings() {
            GeneralSettingsService.getGeneralSettings().then(
                function (response) {
                    vm.generalSettings = response.data;
                    vm.generalSettings.drugPPSLA = Math.round(vm.generalSettings.drugPPSLA * 100) / 100;
                    vm.generalSettings.i9vsla = Math.round(vm.generalSettings.i9vsla * 100) / 100;
                    if (vm.generalSettings.empVyears)
                        vm.generalSettings.empVyears = Math.round(vm.generalSettings.empVyears * 100) / 100;
                    if (vm.generalSettings.eduVyears)
                        vm.generalSettings.eduVyears = Math.round(vm.generalSettings.eduVyears * 100) / 100;
                    if (vm.generalSettings.addVyears)
                        vm.generalSettings.addVyears = Math.round(vm.generalSettings.addVyears * 100) / 100;
                    if (vm.generalSettings.noreferences)
                        vm.generalSettings.noreferences = Math.round(vm.generalSettings.noreferences * 100) / 100;
                    if (vm.generalSettings.offerlettersla)
                        vm.generalSettings.offerlettersla = Math.round(vm.generalSettings.offerlettersla * 100) / 100;
                    if (vm.generalSettings.obprocessSLA)
                        vm.generalSettings.obprocessSLA = Math.round(vm.generalSettings.obprocessSLA * 100) / 100;
                    vm.generalSettingsMetaData = angular.copy(vm.generalSettings);
                    if (vm.generalSettings.empVyears == 0) vm.generalSettings.empVyears = '';
                    if (vm.generalSettings.addVyears == 0) vm.generalSettings.addVyears = '';
                    if (vm.generalSettings.eduVyears == 0) vm.generalSettings.eduVyears = '';
                    if (vm.generalSettings.noreferences == 0) vm.generalSettings.noreferences = '';
                    // if (vm.generalSettings.offerlettersla >= 0) vm.generalSettings.offerlettersla = vm.generalSettings.offerlettersla;
                    //else vm.generalSettings.offerlettersla = '';
                    if (vm.generalSettings.obprocessSLA == 0) vm.generalSettings.obprocessSLA = '';
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG220);
                }
            )
        }

        function addGeneralSettings() {
            $scope.submitted = true;
            if (!vm.generalSettings.drugPPSLA || !vm.generalSettings.i9vsla) {
                ToastrService.error($rootScope.errorMsgs.MSG129);
                return;
            }
            vm.generalSettings.offerlettersla = vm.generalSettings.offerlettersla ? vm.generalSettings.offerlettersla : 0;

            GeneralSettingsService.addGeneralSettings(vm.generalSettings).then(
                function (response) {
                    ToastrService.success(response.data.message);
                    getGeneralSettings();
                },
                function (err) {
                    ToastrService.error($rootScope.errorMsgs.MSG221);
                }
            )
        }

        function resetGeneralSettings() {
            vm.generalSettings = angular.copy(vm.generalSettingsMetaData);
        }

    }
})();