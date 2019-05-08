(function () {
    'use strict';
    candidateApp.factory('NavigationService', NavigationService);
    NavigationService.$inject = ['$rootScope', '$http'];
    function NavigationService($rootScope, $http) {

        var objNavigationService = {};
        objNavigationService.GetNavigationDetails = getNavigationDetails;
        objNavigationService.GetAllPageDetails = getAllPageDetails;
        objNavigationService.UpdatePermissions = updatePermissions;
        objNavigationService.logout = logout;
        objNavigationService.getBrandingDetails = getBrandingDetails;
        objNavigationService.logoandimagepath = logoandimagepath;
        objNavigationService.candiLogoandimagepath = candiLogoandimagepath;

        return objNavigationService;
        
        function logoandimagepath(){
            return $http.get($rootScope.APIURL + 'logoandimagepath');
        }
        function candiLogoandimagepath(){
            return $http.get($rootScope.CandidateAPIURL + 'logoandimagepath');
        }

        function getBrandingDetails(isMainApi){
            return $http.get($rootScope.APIURL + 'brandinglist' + '/' +isMainApi);
        }

        function getNavigationDetails() {
            return $http.post($rootScope.APIURL + 'Navigation', $rootScope.UserRoles);
        }
        function getAllPageDetails() {
            return $http.get($rootScope.APIURL + 'Navigation/getAllPageDetails');
        }
        function updatePermissions(lstPageDetails) {
            return $http.put($rootScope.APIURL + 'Navigation', lstPageDetails);
        }

        function logout() {
            return $http.post($rootScope.APIURL + 'logout');
        }
    }
})();