(function () {
    'use strict';
    hrAdminApp.controller('WebFormSettingsController', WebFormSettingsController);
    WebFormSettingsController.$inject = ['$rootScope', '$scope', 'settingchanges'];
    function WebFormSettingsController($rootScope, $scope,settingchanges) {
          var dialogCtrl = this;
                    dialogCtrl.current_field_setting = angular.copy(settingchanges);
                    

                    dialogCtrl.hide =function (ev) {
                        $mdDialog.hide();
                    }

                    dialogCtrl.cancel = function(ev) {
                        // dialogCtrl.fileThumb = '';
                        $mdDialog.cancel();
                    }

                    dialogCtrl.answer = function(ev, answer) {
                        $mdDialog.hide(answer);
                    }

    }
})();
