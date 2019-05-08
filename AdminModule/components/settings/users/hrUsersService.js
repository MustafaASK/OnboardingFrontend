(function () {
    'use strict';
    hrAdminApp.factory('HrUsersService', hrUsersService);
    hrUsersService.$inject = ['$rootScope', '$http'];

    function hrUsersService($rootScope, $http) {

        var clientslistUrl = $rootScope.APIURL + 'clientslist';
        var permissionsMasterUrl = $rootScope.APIURL + 'permissionsmasterlist';
        var hrUserslistUrl = $rootScope.APIURL + 'list';
        var addHrUserUrl = $rootScope.APIURL + 'newHrUser';
        var delHrUserUrl = $rootScope.APIURL + 'deleteUser';
        var getHrUserUrl = $rootScope.APIURL + 'hrlist';
        var editHrUserUrl = $rootScope.APIURL + 'editUser';
        var validateHrUserUrl = $rootScope.APIURL + 'validemailid';

        var objHrUsersService = {};
        objHrUsersService.clients = getClientList;
        objHrUsersService.permissionsMasterList = getPermissionsMasterList;
        objHrUsersService.hrUsers = getHrUsersList;
        objHrUsersService.addHrUser = addHrUser;
        objHrUsersService.deleteHrUser = deleteHrUser;
        objHrUsersService.getHrUserData = getHrUserData;
        objHrUsersService.editHrUser = editHrUser;
        objHrUsersService.validateHrUser = validateHrUser;
        return objHrUsersService;
        
        function getClientList() {
            return $http.get(clientslistUrl);
        }

        function getPermissionsMasterList() {
            return $http.get(permissionsMasterUrl);
        }

        function addHrUser(objUser) {
            return $http.post(addHrUserUrl, objUser);
        }

        function getHrUsersList(isMainApi) {
            return $http.get(hrUserslistUrl +'/'+ isMainApi);
        }

        function deleteHrUser(userid) {
            return $http({
                method: 'DELETE',
                url: delHrUserUrl + "/" + userid,
                data: null,
                headers: {'Content-type': 'application/json'}
            });
        }

        function getHrUserData(userid) {
            return $http.get(getHrUserUrl + "/" + userid);
        }

        function editHrUser(objUser, isReactivation) {
            return $http.post(editHrUserUrl + "/" + isReactivation, objUser);
        }

        function validateHrUser(objEmailId) {
            return $http.post(validateHrUserUrl, objEmailId);
        }

    }
})();
