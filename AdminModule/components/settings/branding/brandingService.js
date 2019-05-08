(function () {
    'use strict';
    hrAdminApp.factory('BrandingService', brandingService);
    brandingService.$inject = ['$rootScope', '$http'];

    function brandingService($rootScope, $http) {

        var saveBrandingURL = $rootScope.APIURL + 'brandingupload';
        var getBrandingURL = $rootScope.APIURL + 'brandinglist';

        var objBranding = {};
        objBranding.saveBranding = saveBranding;
        objBranding.getBrandingDetails = getBrandingDetails;
        return objBranding;

        function saveBranding(objBrandingDetails) {
            return $http({
                url: saveBrandingURL,
                method: 'POST',
                data: objBrandingDetails,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
        }

        function getBrandingDetails(isMainApi){
            return $http.get(getBrandingURL + '/' + isMainApi);
        }

    }
})();