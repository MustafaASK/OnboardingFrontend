(function () {
    'use strict';
    hrAdminApp.controller('DocumentsAssociationController', documentsAssociationController);
    documentsAssociationController.$inject = ['$rootScope', '$scope', '$state', '$filter', '$stateParams', '$mdDialog', '$timeout', 'ToastrService', '$window', 'folderAndWfDetails'];

    function documentsAssociationController($rootScope, $scope, $state, $filter, $stateParams, $mdDialog, $timeout, ToastrService, $window, folderAndWfDetails) {
        var vm = this;
        vm.folderAndWfAssociated = folderAndWfDetails;

        vm.hide = function (ev) {
            $mdDialog.hide();
        }

        vm.cancel = function (ev) {
            // $scope.fileThumb = '';
            $mdDialog.cancel();
        }

        vm.answer = function (ev, answer) {
            $mdDialog.hide(answer);
        }
        $scope.browserType = function () {
            if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
                vm.paddingforfooter = '15px';
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                vm.paddingforfooter = '5px';
            }
        }
        $scope.browserType();
    }
})();