(function () {
    'use strict';
    hrAdminApp.factory('GeneralSettingsService', generalSettingsService);
    generalSettingsService.$inject = ['$rootScope', '$http'];

    function generalSettingsService($rootScope, $http) {

        var generalSettingsUrl = $rootScope.APIURL + 'generalsettings';
        var addGeneralSettingsUrl = $rootScope.APIURL + 'addgeneralsettings';

        var objGeneralSettings = {};
        objGeneralSettings.getGeneralSettings = getGeneralSettings;
        objGeneralSettings.addGeneralSettings = addGeneralSettings;
        return objGeneralSettings;

        function getGeneralSettings() {
            return $http.get(generalSettingsUrl);
        }

        function addGeneralSettings(objGeneralSettingDetails) {
            return $http.post(addGeneralSettingsUrl, objGeneralSettingDetails);
        }

    }
})();