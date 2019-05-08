(function () {
    'use strict';
    hrAdminApp.factory('MyAccountService', MyAccountService);
    MyAccountService.$inject = ['$rootScope', '$http'];
    function MyAccountService($rootScope, $http) {

        var objMyAccountService = {};
        objMyAccountService.getClientsList = getClientsList;
        objMyAccountService.getPermissionsList = getPermissionsList;
        objMyAccountService.getUserInfo = getUserInfo;
        objMyAccountService.updateHrUser = updateHrUser;

        return objMyAccountService;

        function getPermissionsList() {
            return $http.get($rootScope.APIURL + 'permissionsmasterlist');
        }
        function getClientsList() {
            return $http.get($rootScope.APIURL + 'clientslist');
        }
        function getUserInfo(id) {
            return $http.get($rootScope.APIURL + 'hrlist/'+id, {
                headers: {"ask-auth-token": localStorage.getItem('ask-auth-token')}
          });
        }
        function updateHrUser(hrDetails) {
            return $http({
                method: 'POST',
                url: $rootScope.APIURL + 'updateHrUser',
                data: hrDetails,
                headers: {
                    'ask-auth-token': localStorage.getItem('ask-auth-token'),
                'Content-type': undefined
                },
                transformRequest: angular.identity
            });
        }
    }
})();